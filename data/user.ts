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

export async function getEmployeeScheduleData(organization) {
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