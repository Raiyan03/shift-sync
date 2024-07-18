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

export async function getUserFromDB(email, password) {
  let user = [];
  const userReference = collection(db, "Organizations");
  const q = query(userReference, where("email", "==", email));
  try {
    const userSnapshots = await getDocs(q);
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
    } else {
      const totalDataSnap = await getDocs(query(userReference));
      if (!totalDataSnap.empty) {
        for(const docData of totalDataSnap.docs){
          if (docData.data().id.includes(email.slice(0, 4))) {
            const adminColQuery = doc(
              db,
              `Organizations/${docData.data().id}/employees`,
              email
            );
            const employeeSnapshot = await getDoc(adminColQuery);

            if (employeeSnapshot.exists()) {
              const match = comparePass(password, employeeSnapshot.data().password);
              if(match){
              user.push({
                name: employeeSnapshot.data().name,
                id: employeeSnapshot.data().Id,
                role: "employee",
              })
              }
            }
          }
        };
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

export const comparePass = async (rawPass, hashedPassword) => {
  const isMatched = await compare(rawPass, hashedPassword);
  if (isMatched) {
    return true;
  }
  return false;
};
