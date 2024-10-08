"use Server";
import { db } from "@/app/lib/firebase";
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

export async function getEmployeeScheduleData(organization: string) {
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
    if (docSnapShifts.exists() && !docSnap.empty) {
      const shiftsData = docSnapShifts
        .data()
        .shifts.map((value: any, index: any) => convert(value));

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
          role: "employee",
        });
      });

      const data = {
        employees,
        shifts: shiftsData,
        hour_bank: docSnapShifts.data().hour_bank,
      };

      return data;
    } else {
      return { employees: [] };
    }
  } catch (error) {
    throw new Error(error);
  }
}

export async function getUserFromDB(email: string, password: string) {
  let user = [];

  // const userRef = doc(db, 'Organizations', email)

  // try{
  //   const userDoc = await getDoc(userRef);
  //   if(userDoc.exists){
  //     console.log(userDoc.data())
  //   }

  // }catch(err)
  // {
  //   console.log(err)
  // }

  const userReference = collection(db, "Organizations");
  const q = query(userReference, where("email", "==", email));
  try {
    const userSnapshots = await getDocs(q);
    if (!userSnapshots.empty) {
      for (const docData of userSnapshots.docs) {
        // if(docData.data().password === password){
        //   console.log("matched")
        //   user.push({
        //     name: docData.data().name,
        //     email: docData.data().email,
        //     id: docData.data().id,
        //     role: docData.data().role,
        //   });
        // }
        const match = await comparePass(password, docData.data().password);
        if (match) {
          user.push({
            name: docData.data().name,
            email: docData.data().email,
            id: docData.data().id,
            role: docData.data().role,
          });
        }
      }
    } else {
      const totalDataSnap = await getDocs(query(userReference));
      if (!totalDataSnap.empty) {
        for (const docData of totalDataSnap.docs) {
          if (docData.data().id.includes(email.slice(0, 4))) {
            const adminColQuery = doc(
              db,
              `Organizations/${docData.data().id}/employees`,
              email
            );
            const employeeSnapshot = await getDoc(adminColQuery);

            if (employeeSnapshot.exists()) {
              // if(password === employeeSnapshot.data().password){
              //   user.push({
              //     name: employeeSnapshot.data().name,
              //     id: employeeSnapshot.data().Id,
              //     role: "employee",
              //   });
              // }
              const match = await comparePass(
                password,
                employeeSnapshot.data().password
              );
              if (match) {
                user.push({
                  name: employeeSnapshot.data().name,
                  id: employeeSnapshot.data().Id,
                  role: "employee",
                });
              }
            }
          }
        }
      }
    }
  } catch (error) {
    throw new Error(error);
  }
  return user[0];
}

export const saltAndHashPassword = async (rawPass) => {
  const salt = 10;
  const hashedPassword = await hash(rawPass, salt);

  return hashedPassword;
};

export const comparePass = async (rawPass: string, hashedPassword: string) => {
  const isMatched = await compare(rawPass, hashedPassword);
  if (isMatched) {
    return true;
  }
  return false;
};

export async function getUserData(userId: string) {
  const collQuery = query(collection(db, `Organizations`));

  try {
    const docSnap = await getDocs(collQuery);
    if (!docSnap.empty) {
      for (const docData of docSnap.docs) {
        if (docData.data().id.includes(userId.slice(0, 4))) {
          const userQuery = doc(
            db,
            `Organizations/${docData.data().id}/employees`,
            userId
          );
          const userSnap = await getDoc(userQuery);

          if (userSnap.exists()) {
            return {
              name: userSnap?.data()?.name,
              email: userSnap?.data()?.email,
              role: userSnap?.data()?.role,
              status: userSnap?.data()?.status ? "full time" : "part time",
              shiftPref: {
                mon: userSnap?.data()?.mon,
                tue: userSnap?.data()?.tue,
                wed: userSnap?.data()?.wed,
                thu: userSnap?.data()?.thu,
                fri: userSnap?.data()?.fri,
                sat: userSnap?.data()?.sat,
                sun: userSnap?.data()?.sun,
              },
            };
          }
        }
      }
    } else {
      return null;
    }
  } catch (err) {
    console.log("User Data Not Found", err);
  }
}

export async function updateUserDataInDB(id: string,data: any) {
  const collQuery = query(collection(db, `Organizations`));

  try {
    const docSnap = await getDocs(collQuery);
    if (!docSnap.empty) {
      for (const docData of docSnap.docs) {
        if (docData.data().id.includes(id.slice(0, 4))) {
          const userQuery = doc(
            db,
            `Organizations/${docData.data().id}/employees`,
            id
          );
          const userSnap = await getDoc(userQuery);

          if (userSnap.exists()) {
            await setDoc(
              doc(db, `Organizations/${docData.data().id}/employees`, id),
              data,
              { merge: true }
            );
            return true
          }
        }
      }
    } else {
      return null;
    }
  } catch (err) {
    console.log("User Data Not Found", err);
  }
}