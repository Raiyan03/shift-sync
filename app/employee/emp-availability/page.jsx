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
        
    }
    
    const fetchShiftData = async() => {
        const netData = await getShiftData(userData?.id)
        console.log("Raw awaited data: ")
        console.log(netData.shifts)
        console.log(JSON.stringify(netData))
        setShiftData(netData.shifts)
        //console.log("Shift data imported: ")
        //console.log(JSON.stringify(shiftData))
        
    }
    
    useEffect(()=>{fetch()},[])
    
    //Constants
    const days = Array(7)

    const rowsData = [
        { id: 0, day: 'Mon', selectedOption: '0' },
        { id: 1, day: 'Tue', selectedOption: '0' },
        { id: 2, day: 'Wed', selectedOption: '0' },
        { id: 3, day: 'Thu', selectedOption: '0' },
        { id: 4, day: 'Fri', selectedOption: '0' },
        { id: 5, day: 'Sat', selectedOption: '0' },
        { id: 6, day: 'Sun', selectedOption: '0' }
    ]

    //Each available shift, converted from {unixStart, unixEnd} to a simple Timestamp
    const availableShiftOptions = []
    //Each timestamp shift, now held instead as {dayInt, timestamp}
    //const options = []

    //For each UNIX set of shifts, convert to timestamp
    //Store each in a list of actual times
    shiftData?.forEach((shift) => {
        availableShiftOptions.push(convertTimeStamp(shift))
        console.log("Shift pushed to options: ")
        console.log(shift)
        console.log(convertTimeStamp(shift))
    })
    
    /*
    for (const shift in shiftData) {
        console.log("Individual shift:")
        console.log(shift)
    }
    */

    //Log for validation
    console.log("Full list of shifts in timestamp form: ")
    console.log(availableShiftOptions)
    
    //For each stored timestamp, turn into option for selector
    //Value should be the 'int' corresponding to shift chosen
    //Label will be actual timestamp
    //Store each in list of options
    //Each "shift" object is NOT the requested array, but instead a string, so conversion is needed
    /*
    let counter = 0
    availableShiftOptions.forEach((convertedShift) => {
        const newVal = {value: "shift" + counter, label: convertedShift}
        counter++
        options.push(newVal)
        console.log("New option pushed to options: ")
        console.log(newVal)
    })
        
    */
   const options = [
    {value: "0", label: "08:00AM - 01:00PM"},
    {value: "1", label: "11:00PM - 03:00PM"},
    {value: "2", label: "01:00PM - 05:00PM"}
   ]
   
   

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
    //
    //Includes temporary button to remove shift information retrieval
    return (
        <div>
            <h1> Availability Selector</h1>
            <p> Some information goes here </p>
            <div>
                {userData && (
                <button onClick={fetchShiftData}>GetShiftData</button>
                 )}
            </div>
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