"use Server";
import { db } from "@/lib/firebase";
import { hash, compare } from "bcryptjs";

import {
  addDoc,
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  where,
  deleteDoc,
  query,
} from "firebase/firestore";

//Done For the route
export async function getScheduleData(organization) {
  let employees = [];
  const colRef = query(
    collection(db, `Organizations/${organization}/employees`)
  );
  const docRef = doc(db, `Organizations`, organization);

  const convert = (data) => {
    let [first, last] = data.split(",");
    return [parseInt(first, 10), parseInt(last, 10)];
  };
  try {
    var docSnap = await getDocs(colRef);
    var docSnapShifts = await getDoc(docRef);
    if (!docSnapShifts.empty && !docSnap.empty) {
      const shiftsData = docSnapShifts
        .data()
        .shifts.map((value, index) => convert(value));

      docSnap.forEach((doc) => {
        employees.push({
          name: doc.data().name,
          id: doc.data().Id,
          shiftPref: {
            Mon: doc.data().mon,
            Tue: doc.data().tue,
            Wed: doc.data().wed,
            Thu: doc.data().thu,
            Fri: doc.data().fri,
            Sat: doc.data().sat,
            Sun: doc.data().sun,
          },
          status: doc.data().status ? "fulltime" : "parttime",
          role: doc.data().role,
        });
      });

      const data = {
        employees,
        shifts: shiftsData,
        hour_bank: parseInt(docSnapShifts.data().hour_bank),
        flex_hours: parseInt(docSnapShifts.data().flex_hours),
        // flex_hours: 20,
      };

      return data;
    } else {
      return { employees: [] };
    }
  } catch (error) {
    throw new Error(error);
  }
}

export function filterShifts(scheduleData) {
  const daysOfWeek = 7;
  const employees = {};
  const total_hours = [];

  scheduleData.schedule.forEach((day) => {
    day.shifts.map((shift, index) => {
      if (!employees[shift.employee]) {
        employees[shift.employee] = new Array(daysOfWeek).fill({
          ["id"]: shift.id,
          ["shift"]: "Not Working",
          ["requested"]: false,
          ["hours"]: 0,
        });
        // employees[shift.employee] = new Array(daysOfWeek).fill("Not Working");
      }
      employees[shift.employee][day.day] = {
        day: day.day,
        id: shift.id,
        shift: convertTimeStamp(shift.shift),
        requested: shift.requested,
        hours: shift.hours,
      };
    });
  });

  const result = Object.keys(employees).map((employeeName) => {
    return {
      name: employeeName,
      shifts: employees[employeeName],
      total_hours: scheduleData.total_hours_per_employee[employeeName],
    };
  });

  return { result, remaining_hours: scheduleData.remaining_hour_bank };
}

export function convertTimeStamp(data) {
  if (!data) {
    return;
  }
  let [start, end] = [data[0], data[1]];
  const startDate = new Date(parseInt(start, 10));

  let startHours = startDate.getHours();
  let startMin = parseInt("0" + startDate.getMinutes(), 10);

  const period = startHours <= 12 ? "AM" : "PM";

  // Adjust the hours for 12-hour format
  startHours = startHours % 12;
  startHours = startHours ? startHours : 12; // If hours is 0, set it to 12

  // Format the hours and minutes to be always two digits
  const startformattedHours = startHours < 10 ? "0" + startHours : startHours;
  const startformattedMinutes = startMin < 10 ? "0" + startMin : startMin;

  const endDate = new Date(parseInt(end, 10));

  let endHours = endDate.getHours();
  let endMins = parseInt("0" + endDate.getMinutes(), 10);

  const period2 = endHours <= 12 ? "AM" : "PM";

  // Adjust the hours for 12-hour format
  endHours = endHours % 12;
  endHours = endHours ? endHours : 12; // If hours is 0, set it to 12

  // Format the hours and minutes to be always two digits
  const endformattedHours = endHours < 10 ? "0" + endHours : endHours;
  const endformattedMinutes = endMins < 10 ? "0" + endMins : endMins;

  // Return the formatted time
  return `${startformattedHours}:${startformattedMinutes} ${period} - ${endformattedHours}:${endformattedMinutes} ${period2}`;
}


//Done for api route
export async function getEmployeeData(organization) {
  let employees = [];
  const colRef = query(
    collection(db, `Organizations/${organization}/employees`)
  );
  const docSnap = await getDocs(colRef);
  docSnap.forEach((doc) => {
    employees.push({
      name: doc.data().name,
      email: doc.data().email,
      status: doc.data().status,
      id: doc.data().Id,
      role: doc.data().role,
    });
  });
  return employees;
}

//Done
export async function setEmployeeData(organization, employeeData, id) {
  const ItemRef = collection(db, `Organizations/${organization}/employees`);
  const q = query(ItemRef, where("email", "==", employeeData.email));

  try {
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      await setDoc(
        doc(db, `Organizations/${organization}/employees`, id),
        employeeData
      );
      return {message: "User Added To DataBase", status: true};
    } else {
      return {message: "User Already Exists", status: false};
    }
  } catch (err) {
    console.log(err);
  }
}



export async function deleteEmployee(organization, employeeId) {
  const itemsRef = collection(db, `Organizations/${organization}/employees`);
  const deleteQuery = query(itemsRef, where("Id", "==", employeeId));

  try {
    const querySnapshot = await getDocs(deleteQuery);
    if (!querySnapshot.empty) {
      querySnapshot.forEach(async (document) => {
        await deleteDoc(document.ref);
        return {message: "Document deleted successfully"};
      });
    } else {
      return {message: "No document matches the specified id."};
    }
  } catch (err) {
    console.error("Error deleting document by id:", err);
  }
}

export async function updateShifts(organization, data, hours, flex) {
  const itemsRef = doc(db, `Organizations/${organization}`);
  const q = query(itemsRef);

  try {
    const snapShot = await getDoc(q);
    if (snapShot) {
      // await setDoc(itemsRef, {shifts: []}, {merge: true})
      await setDoc(
        itemsRef,
        { shifts: data, hour_bank: hours, flex_hours: flex },
        { merge: true }
      );
      return true;
    }
  } catch (error) {
    console.log("User Not Found:", error);
  }
}

export async function addingLeaderAndTeam(teamName, data) {
  const itemRef = doc(db, teamName);
  const q = query(itemRef, where("Id", "==", teamName));

  try {
    const snap = await getDoc(q);
    if (snap.empty) {
    }
  } catch (err) {
    console.log("Error: ", err);
  }
}

export async function getUserFromDB(email, password) {
  let user = [];
  const userReference = collection(db, "Organizations");
  const q = query(userReference, where("email", "==", email));
  let userSnapshots;
  try {
    userSnapshots = await getDocs(q);
  } catch (error) {
    throw new Error(error);
  }
  if (!userSnapshots.empty) {
    userSnapshots.forEach((doc) => {
      const match = comparePass(password, doc.data().password);
      if (match) {
        user.push({
          name: doc.data().name,
          email: doc.data().email,
          id: doc.data().id,
          role: doc.data().role,
        });
      }
    });
  }
  console.log(user[0]);
  return user[0];
}

export const saltAndHashPassword = async (rawPass) => {
  const salt = 10;
  const hashedPassword = await hash(rawPass, salt);

  return hashedPassword;
};

export const comparePass = async (rawPass, hashedPassword) => {
  const isMatched = await compare(rawPass, hashedPassword);
  if (isMatched) {
    return true;
  }
  return false;
};

export const timeStampConversion = (data) => {
  if (!data) {
    return;
  }
  let [start, end] = [data[0], data[1]];

  const startDate = new Date(parseInt(start, 10));

  let startHours = startDate.getHours();
  let startMin = parseInt("0" + startDate.getMinutes(), 10);

  const period = startHours <= 12 ? "AM" : "PM";

  // Adjust the hours for 12-hour format
  startHours = startHours % 12;
  startHours = startHours ? startHours : 12; // If hours is 0, set it to 12

  // Format the hours and minutes to be always two digits
  const startformattedHours = startHours < 10 ? "0" + startHours : startHours;
  const startformattedMinutes = startMin < 10 ? "0" + startMin : startMin;

  const endDate = new Date(parseInt(end, 10));

  let endHours = endDate.getHours();
  let endMins = parseInt("0" + endDate.getMinutes(), 10);

  const period2 = endHours <= 12 ? "AM" : "PM";

  // Adjust the hours for 12-hour format
  endHours = endHours % 12;
  endHours = endHours ? endHours : 12; // If hours is 0, set it to 12

  // Format the hours and minutes to be always two digits
  const endformattedHours = endHours < 10 ? "0" + endHours : endHours;
  const endformattedMinutes = endMins < 10 ? "0" + endMins : endMins;

  // Return the formatted time
  return `${startformattedHours}:${startformattedMinutes} ${period} - ${endformattedHours}:${endformattedMinutes} ${period2}`;
};

export const stringToTime = (timeString) => {
  const [startTime, endTime] = timeString.split(' - ');
  let [startHour, startMinute] = startTime.split(':');
  let [endHour, endMinute] = endTime.split(':');

  if (startTime.includes('AM') || startTime.includes('PM')) {
    const startAmPm = startTime.includes('PM')? 'PM' : 'AM';
    startHour = parseInt(startHour);
    if (startAmPm === 'PM' && startHour!== 12) {
      startHour += 12;
    }
  } else {
    startHour = parseInt(startHour);
  }

  if (endTime.includes('AM') || endTime.includes('PM')) {
    const endAmPm = endTime.includes('PM')? 'PM' : 'AM';
    endHour = parseInt(endHour);
    if (endAmPm === 'PM' && endHour!== 12) {
      endHour += 12;
    }
  } else {
    endHour = parseInt(endHour);
  }

  const startDate = new Date();
  startDate.setHours(startHour);
  startDate.setMinutes(parseInt(startMinute));
  startDate.setSeconds(0);

  const endDate = new Date();
  endDate.setHours(endHour);
  endDate.setMinutes(parseInt(endMinute));
  endDate.setSeconds(0);

  return [startDate.getTime(), endDate.getTime()];
};

export function newConvertTimeStamp(data) {
  if (!data) {
    return;
  }
  let [start, end] = data.split(",");
  const startDate = new Date(parseInt(start, 10));

  let startHours = startDate.getHours();
  let startMin = parseInt("0" + startDate.getMinutes(), 10);

  const period = startHours <= 12 ? "AM" : "PM";

  // Adjust the hours for 12-hour format
  startHours = startHours % 12;
  startHours = startHours ? startHours : 12; // If hours is 0, set it to 12

  // Format the hours and minutes to be always two digits
  const startformattedHours = startHours < 10 ? "0" + startHours : startHours;
  const startformattedMinutes = startMin < 10 ? "0" + startMin : startMin;

  const endDate = new Date(parseInt(end, 10));

  let endHours = endDate.getHours();
  let endMins = parseInt("0" + endDate.getMinutes(), 10);

  const period2 = endHours <= 12 ? "AM" : "PM";

  // Adjust the hours for 12-hour format
  endHours = endHours % 12;
  endHours = endHours ? endHours : 12; // If hours is 0, set it to 12

  // Format the hours and minutes to be always two digits
  const endformattedHours = endHours < 10 ? "0" + endHours : endHours;
  const endformattedMinutes = endMins < 10 ? "0" + endMins : endMins;

  // Return the formatted time
  return `${startformattedHours}:${startformattedMinutes} ${period} - ${endformattedHours}:${endformattedMinutes} ${period2}`;
}

/*
  @author: Amrit Singh Dhillon
  @function: updateShiftForUser
  @params: userId, data
  @Description: This function is used to update the shiftPref of a particular user
                after they are signed in into their dashboard
  @Usage: The userId is the employee id for whom the shiftPref is needed to be updated
          data is the shiftPrefs required for the updation
          structure:
          {
          fri:"any",
          mon:"2",
          sat:"1",
          sun:"0",
          thu:"any",
          tue:"1",
          wed:"any",
          }
          where the index 0,1,2 is the respective index for shifts, that you can 
          get by using the getShiftData Function located in shift.ts that shall provide you
          with the shifts of a particular organization by passing in the userId of emp or 
          manager
  @ContactDetails: https://www.dhillonsaab.xyz/
*/
export const updateShiftForUser = async (userId, data) => {
  const userReference = collection(db, "Organizations");
  const totalDataSnap = await getDocs(query(userReference));
  if (!totalDataSnap.empty) {
    for (const docData of totalDataSnap.docs) {
      if (docData.data().id.includes(userId.slice(0, 4))) {
        const employeeQ = collection(
          db,
          `Organizations/${docData.data().id}/employees`
        );
        const empDocs = await getDocs(
          query(employeeQ),
          where("Id", "==", userId)
        );
        if (!empDocs.empty) {
          await setDoc(
            doc(db, `Organizations/${docData.data().id}/employees`, userId),
            data,
            { merge: true }
          );
          return true;
        }
      }
    }
  }
};