"use Server";
import { db } from "@/lib/firebase";

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

export async function getUserData(userId:string) {
    const collQuery = query(collection(db, `Organizations`))

    try{
        const docSnap = await getDocs(collQuery)
        if(!docSnap.empty){
            for(const docData of docSnap.docs){
                if(docData.data().id.includes(userId.slice(0,4))){
                    const userQuery = doc(db, `Organizations/${docData.data().id}/employees`, userId)
                    const userSnap = await getDoc(userQuery)

                    if(userSnap.exists()){
                        return userSnap.data()
                    }
                }
            }
        }

    }catch(err){
        console.log("User Data Not Found", err)
    }

}
