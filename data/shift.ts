"use Server";
import { db } from "@/app/lib/firebase";

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

export async function getShiftConfig(id:string) {
    const docRef = doc(db, `Organizations`, id)

    try{
        const docSnap = await getDoc(docRef)
        if(docSnap.exists){
            return docSnap.data();
        }

    }catch(err){
        console.log("Shift Data Not Found", err)
    }

}