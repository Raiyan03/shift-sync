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

export async function getShiftData(userId: string) {
  const docQuery = doc(db, `Organizations`, userId);

  try {
    const docSnap = await getDoc(docQuery);
    if (docSnap.exists()) {
      if (
        docSnap.data().shifts !== undefined ||
        docSnap.data().hour_bank !== undefined
      ) {
        return {
          shifts: docSnap.data()?.shifts,
          hour_bank: docSnap.data()?.hour_bank,
          flex_hours: docSnap.data()?.flex_hours,
        };
        return docSnap.data();
      } else {
        return null;
      }
    } else {
      const collQuery = query(collection(db, `Organizations`));
      const collSnaps = await getDocs(collQuery);

      if (!collSnaps.empty) {
        for (const docData of collSnaps.docs) {
          if (docData.data().id.includes(userId.slice(0, 4))) {
            if (
              docData.data().shifts !== undefined ||
              docData.data().hour_bank !== undefined
            ) {
              return {
                shifts: docData.data()?.shifts,
                hour_bank: docData.data()?.hour_bank,
                flex_hours: docData.data()?.flex_hours,
              };
            }
          }
        }
      }
    }
  } catch (error) {
    console.log("Shift Data Not Found", error);
  }
}


export async function storeShiftToDB(collectionId: string, data: object) {
  try {
    await setDoc(doc(db, `Organizations/${collectionId}/schedule`, "Monday"), {
      day: 0,
      shifts: data.schedule[0].shifts,
    });
    await setDoc(doc(db, `Organizations/${collectionId}/schedule`, "Tuesday"), {
      day: 1,
      shifts: data.schedule[1].shifts,
    });
    await setDoc(
      doc(db, `Organizations/${collectionId}/schedule`, "Wednesday"),
      {
        day: 2,
        shifts: data.schedule[2].shifts,
      }
    );
    await setDoc(
      doc(db, `Organizations/${collectionId}/schedule`, "Thursday"),
      {
        day: 3,
        shifts: data.schedule[3].shifts,
      }
    );
    await setDoc(doc(db, `Organizations/${collectionId}/schedule`, "Friday"), {
      day: 4,
      shifts: data.schedule[4].shifts,
    });
    await setDoc(
      doc(db, `Organizations/${collectionId}/schedule`, "Saturday"),
      {
        day: 5,
        shifts: data.schedule[5].shifts,
      }
    );
    await setDoc(doc(db, `Organizations/${collectionId}/schedule`, "Sunday"), {
      day: 6,
      shifts: data.schedule[6].shifts,
    });
    await setDoc(doc(db, `Organizations/${collectionId}/schedule`, "data"), {
      remaining_hour_bank: data.remaining_hour_bank,
      total_hours_per_employee: data.total_hours_per_employee,
    });
  } catch (error) {
    throw new Error(error);
  }
}

export async function getShiftDataFromDB(collectionId: string) {
  let data = {
    schedule: [],
    total_hours_per_employee: {},
    remaining_hour_bank: "",
  };
  const collQuery = query(
    collection(db, `Organizations/${collectionId}/schedule`)
  );
  try {
    const docSnaps = await getDocs(collQuery);
    if (!docSnaps.empty) {
      for (const docData of docSnaps.docs) {
        switch (docData.id) {
          case "data":
            data.remaining_hour_bank = docData.data().remaining_hour_bank;
            data.total_hours_per_employee =
              docData.data().total_hours_per_employee;
            break;

          case "Monday":
            data.schedule[0] = docData.data();
            break;
          case "Tuesday":
            data.schedule[1] = docData.data();
            break;
          case "Wednesday":
            data.schedule[2] = docData.data();
            break;
          case "Thursday":
            data.schedule[3] = docData.data();
            break;
          case "Friday":
            data.schedule[4] = docData.data();
            break;
          case "Saturday":
            data.schedule[5] = docData.data();
            break;
          case "Sunday":
            data.schedule[6] = docData.data();
            break;

          default:
            return null;
        }
      }
    } else {
      return null;
    }
  } catch (error) {
    throw new Error(error);
  }

  return data;
}

export async function getShiftDataForTheUser(userId: string) {
  const data = [];
  const userReference = collection(db, "Organizations");
  const totalDataSnap = await getDocs(query(userReference));
  if (!totalDataSnap.empty) {
    for (const docData of totalDataSnap.docs) {
      if (docData.data().id.includes(userId.slice(0, 4))) {
        const scheduleQuery = collection(
          db,
          `Organizations/${docData.data().id}/schedule`
        );
        const scheduleDocs = await getDocs(query(scheduleQuery));

        if (!scheduleDocs.empty) {
          for (const schedule of scheduleDocs.docs) {
            if (schedule.id != "data") {
              schedule.data().shifts.map((val, index) => {
                if (val.id === userId) {
                  data.push({
                    day: schedule.data().day,
                    shift: val,
                  });
                }
              });
            }
          }
        }
      }
    }
  }
  return data;
}

export const deleteScheduleData = async (collectionId: string) => {
  const itemsRef = collection(db, `Organizations/${collectionId}/schedule`);
  const deleteQuery = query(itemsRef);

  try {
    const querySnapshot = await getDocs(deleteQuery);
    if (!querySnapshot.empty) {
      querySnapshot.forEach(async (document) => {
        await deleteDoc(document.ref);
      });
    } else {
      console.log("No document matches the specified id.");
    }
  } catch (error) {
    throw new Error(error);
  }
};
