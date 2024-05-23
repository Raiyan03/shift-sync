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