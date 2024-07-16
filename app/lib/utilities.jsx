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
// import { redirect } from "next/navigation";
// import { redirect, useRouter } from "next/navigation";
// import { NextResponse } from "next/server";

export async function addOrganization(orgName, managerName, emailAddr) {
  await setDoc(doc(db, "Organizations", orgName), {
    manager: managerName,
    email: emailAddr,
  });
}

// export async function addEmployee(organization, employee) {
//   await setDoc(
//     doc(db, `Organizations/${organization}/employees`, "employees"),
//     { shifts: ["9 - 5", "5 - 12"] }
//   );
// }

export async function getOrganization() {
  const colRef = query(collection(db, "Organizations"));
  const docSnap = await getDocs(colRef);
  const orgs = [];
  docSnap.forEach((doc) => {
    const data = doc.data();
    orgs.push(data);
  });
  return orgs;
}

//Request exporter WIP


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
        });
      });

      const data = {
        employees,
        shifts: shiftsData,
        hour_bank: docSnapShifts.data().hour_bank,
      };

      return data;
    }else{
      return {employees: []}
    }
  } catch (error) {
    throw new Error(error)
  }
}

export function filterShifts(scheduleData) {
  const daysOfWeek = 7;
  const employees = {};
  const total_hours = [];

  scheduleData.schedule.forEach((day) => {
    day.shifts.forEach((shift) => {
      if (!employees[shift.employee]) {
        employees[shift.employee] = new Array(daysOfWeek).fill("Not Working");
      }
      employees[shift.employee][day.day] = {
        shift: convertTimeStamp(shift.shift),
        requested: shift.requested,
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

  return {result,
    remaining_hours: scheduleData.remaining_hour_bank
    
  };
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
      Id: doc.data().Id,
    });
  });

  // const data = {
  //   employees
  // };

  return employees;
}

//Request retrieval
export async function RequestData(organization) {
  let requests = [];
  const colRef = query(
    collection(db, `Organizations/${organization}/requests`)
  );
  const docSnap = await getDocs(colRef);

  docSnap.forEach((doc) => {
    requests.push({
      reqID: doc.data().reqID,
      reqSource: doc.data().reqSource,
      reqType: doc.data().reqType,
      reqStatus: doc.data().reqStatus,
    });
  });


  return requests;
}

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
      return true;
    } else {
      return "User Already Exists";
    }
  } catch (err) {
    console.log(err);
  }

  console.log(employeeData);
  // const docRef = await addDoc(collection(db, `Organizations/${organization}/employees`), employeeData);

  // console.log(docRef.id)
}

//Request modifier
export async function modifyRequest(organization, reqData, reqID) {
  const ItemRef = collection(db, `Organizations/${organization}/requests`);
  const q = query(ItemRef, where("reqID", "==", reqData.reqID));

  try {
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      await setDoc(
        doc(db, `Organizations/${organization}/requests`, reqID),
        reqData
      );
      return true;
    } else {
      return "Request error";
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
        console.log(`Document deleted successfully`);
      });
    } else {
      console.log("No document matches the specified id.");
    }
  } catch (err) {
    console.error("Error deleting document by id:", err);
  }
}

export async function updateShifts(organization, data, hours) {
  const itemsRef = doc(db, `Organizations/${organization}`);
  const q = query(itemsRef);

  try {
    const snapShot = await getDoc(q);
    if (snapShot) {
      // await setDoc(itemsRef, {shifts: []}, {merge: true})
      await setDoc(
        itemsRef,
        { shifts: data, hour_bank: hours },
        { merge: true }
      );
      return "Shifts Updated Successfully";
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


// Legacy Code

// export async function getUserFromDB(email, password) {
//   let user = [];
//   const userReference = collection(db, "Organizations");
//   const q = query(userReference, where("email", "==", email));
//   let userSnapshots;
//   try {
//     userSnapshots = await getDocs(q);
//   } catch (error) {
//     throw new Error(error);
//   }
//   if (!userSnapshots.empty) {
//     userSnapshots.forEach((doc) => {
//       const match = comparePass(password, doc.data().password);
//       if (match) {
//         user.push({
//           name: doc.data().name,
//           email: doc.data().email,
//           id: doc.data().id,
//           role: doc.data().role,
//         });
//       }
//     });
//   }
//   console.log(user[0]);
//   return user[0];
// }

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
