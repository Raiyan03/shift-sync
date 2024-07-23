//Standard imports
"use client"
import { getUser, logOutUser } from "@/action/actions"
import { getShiftData } from "@/data/shift"
import TableRow from "./availability-row"
import { convertTimeStamp } from "../../lib/utilities.jsx"
import { useEffect, useState } from "react"

const page = () => {
    //Fetches
    const [userData, setUserData] = useState()
    const [shiftData, setShiftData] = useState()

    const fetch = async ()=>{
        const token = await getUser()
        if(token){
          setUserData(token)
          console.log(userData)
          console.log(token)
          console.log("Got to fetch, userData is set")
        }
        const netData = await getShiftData(userData?.id)
        setShiftData(netData)
        console.log("Shift data imported: ")
        console.log(netData)
        console.log(shiftData)
    }
    
    useEffect(()=>{fetch()},[])
    
    //Constants
    //const preferences = Array(7)

    const rowsData = [
        { id: 1, day: 'Mon', selectedOption: '0' },
        { id: 2, day: 'Tue', selectedOption: '0' },
        { id: 3, day: 'Wed', selectedOption: '0' },
        { id: 4, day: 'Thu', selectedOption: '0' },
        { id: 5, day: 'Fri', selectedOption: '0' },
        { id: 6, day: 'Sat', selectedOption: '0' },
        { id: 7, day: 'Sun', selectedOption: '0' }
    ]

    const availableShifts = []
    const options = []

    //For each UNIX set of shifts, convert to timestamp
    //Store each in a list of actual times
    shiftData?.forEach((shift) => {
        availableShifts.push(convertTimeStamp(shift))
        console.log("Shift pushed to options: ")
        console.log(converTimeStamp(shift)) 
    })
    
    //Log for validation
    console.log("Full list of shifts in timestamp form: ")
    console.log(availableShifts)
    
    //For each stored timestamp, turn into option for selector
    //Value should be the 'int' corresponding to shift chosen
    //Label will be actual timestamp
    //Store each in list of options
    let counter = 0
    availableShifts.forEach((convertedShift) => {
        const newVal = {value: counter, label: convertedShift}
        counter++
        options.push(newVal)
        console.log("New option pushed to options: ")
        console.log(newVal)
    })

    const [rows, setRows] = useState(rowsData);

    const handleSelectChange = (id, selectedValue) => {
      const updatedRows = rows.map(row => {
        if (row.id === id) {
          return { ...row, selectedOption: selectedValue };
        }
        return row;
      });
      setRows(updatedRows);
    };

    //Page render
    return (
        <div>
            <h1> Availability Selector</h1>
            <p> Some information goes here </p>
            
            <table>
              <thead>
                <tr>
                 <th>Day of week: </th>
                 <th>Options: </th>
                </tr>
              </thead>
            <tbody>
              {rows.map(row => (
                <TableRow
                   key={row.id}
                   rowData={row}
                   options={options}
                 onSelectChange={handleSelectChange}
                />
                ))}
            </tbody>
            </table>
        </div>
    )

}

export default page
//Page declaration
//Table head
//Row for
// - Day of week
// - Preference selected
//
//for all seven days
// option select for that day
//  value = int of choice
// 
// button to
// 1. store all values to array
// 2. call function to publish values to database