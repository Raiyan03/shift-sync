import { db } from "../components/Firebase";
import { auth } from "../components/Firebase";

import { addDoc, collection, doc, setDoc, getDoc, query, getDocs } from "firebase/firestore";

export async function addOrganization(orgName, managerName, emailAddr){
    await setDoc(doc(db, "Organizations", orgName),{ 
        manager: managerName,
        email: emailAddr,
    });
}

export async function addEmployee(organization, employee){
    await setDoc(doc(db, `Organizations/${organization}/employees`, "employees"),{shifts: ["9 - 5", "5 - 12"],})

}

export async function getOrganization(){
    // const docRef = doc(db, "Organizations", organization);
    const colRef = query(collection(db, "Organizations"))
    const docSnap = await getDocs(colRef);
    const orgs = [];
    docSnap.forEach((doc) => {
        const data = doc.data();
        orgs.push(data);
    })
    return orgs;
}

export async function getScheduleData(organization) {
    let employees = [];
    const colRef = query(
      collection(db, `Organizations/${organization}/employees`)
    );
    const docSnap = await getDocs(colRef);
    const docRef = doc(db, `Organizations`, organization);
    const docSnapShifts = await getDoc(docRef);
  
    docSnap.forEach((doc) => {
      employees.push({
        name: doc.data().name,
        shiftPref: {
          Mon: doc.data().Mon,
          Tue: doc.data().Tue,
          Wed: doc.data().Wed,
          Thu: doc.data().Thu,
          Fri: doc.data().Fri,
          Sat: doc.data().Sat,
          Sun: doc.data().Sun,
        },
      });
    });
  
    const data = {
      employees,
      shifts: docSnapShifts.data().shifts,
    };
  
    return data;
  }

  export function filterShifts(scheduleData){
    const daysOfWeek = 7;
    const employees = {};

    scheduleData.schedule.forEach(day => {
        day.shifts.forEach(shift => {
            if (!employees[shift.employee]){
                employees[shift.employee] = new Array(daysOfWeek).fill(" ");
            }
            employees[shift.employee][day.day] ={ 
                shift: shift.shift,
                requested: shift.requested,
            }
        })
    })

    const result = Object.keys(employees).map(employeeName => {
        return {
            name: employeeName,
            shifts: employees[employeeName],
        }
    })

    return result;
  }