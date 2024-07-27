//Standard imports
"use client"
import { getUser, logOutUser } from "@/action/actions"
import { getShiftData } from "@/data/shift"
import TableRow from "./availability-row"
import { convertTimeStamp, updateShiftForUser } from "../../lib/utilities.jsx"
import { useEffect, useState } from "react"

const page = () => {
    //Fetches
    const [userData, setUserData] = useState()
    const [shiftData, setShiftData] = useState()

    //Placeholder preferences list
    const newPreferences = {
      fri: "0",
      mon: "0",
      sat: "0",
      sun: "0",
      thu: "0",
      tue: "0",
      wed: "0"
    }

    //Gathers user data for token, will use token later to capture shift data from org
    const fetch = async ()=>{
        const token = await getUser()
        if(token){
          setUserData(token)
          console.log(userData)
          console.log(token)
          console.log("Got to fetch, userData is set")
        }
        
    }

    //Gathers shift data, includes
    // - Shift timesets
    // - Hour Bank
    // - Flex hours
    //We are only concerned with shift times here, however
    //they are given in the form of string, when they need 
    //to be in the form of an array of two strings.
    //First, shift data is fetched and shifts are stored
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
    
    //Standard rows data
    const rowsData = [
        { id: 0, day: 'Mon', selectedOption: 'any' },
        { id: 1, day: 'Tue', selectedOption: 'any' },
        { id: 2, day: 'Wed', selectedOption: 'any' },
        { id: 3, day: 'Thu', selectedOption: 'any' },
        { id: 4, day: 'Fri', selectedOption: 'any' },
        { id: 5, day: 'Sat', selectedOption: 'any' },
        { id: 6, day: 'Sun', selectedOption: 'any' }
    ]

    //Each available shift, converted from {unixStart, unixEnd} to a simple Timestamp
    const availableShiftOptions = []
    //Each timestamp shift, now held instead as {dayInt, timestamp}
    const options = []

    //For each UNIX set of shifts in one string, convert
    //first to array, then to timestamp
    //Store each in a list of actual times
    shiftData?.forEach((shift) => {
      const splicer = [];
      splicer.push(shift.substring(1,13))
      //console.log("Substring of shift 1-13")
      //console.log(shift.substring(1,13))
      splicer.push(shift.substring(15,shift.length))
      //console.log("Substring of shift 15-length")
      //console.log(shift.substring(15,shift.length))
      availableShiftOptions.push(convertTimeStamp(splicer))
      //console.log("Shift pushed to options: ")
      //console.log(convertTimeStamp(splicer))
    })
    
   
    //Log for validation
    //console.log("Full list of shifts in timestamp form: ")
    //console.log(availableShiftOptions)
    
    //For each stored timestamp, turn into option for selector
    //Value should be the 'int' corresponding to shift chosen
    //Label will be actual timestamp
    //Store each in list of options
    //Each "shift" object is NOT the requested array, but instead a string, so conversion is needed
    
    //Adding in the 'any' option
    options.push({value: "any", label: "Any"})   
    let counter = 0
    availableShiftOptions.forEach((convertedShift) => {
        const newVal = {value: counter, label: convertedShift}
        counter++
        options.push(newVal)
        console.log("New option pushed to options: ")
        console.log(newVal)
    })
    

   //Row calculations
    const [rows, setRows] = useState(rowsData);
    
    //Updating preferences (selection changes)
    const handleSelectChange = (id, selectedValue) => {
      console.log("Select changed, ID and Value: ")
      console.log(id)
      console.log(selectedValue)
      
      //Convoluted shift swapper, changing row value
      const updatedRows = rows.map(row => {
        if (row.id === id) {
          return { ...row, selectedOption: selectedValue };
        }
        return row;
      });
      setRows(updatedRows);
      console.log(rows)
    };

    //"Submit" button actions
    const sendNewPreferences = () => {
      newPreferences.mon = rows[0].selectedOption
      newPreferences.tue = rows[1].selectedOption
      newPreferences.wed = rows[2].selectedOption
      newPreferences.thu = rows [3].selectedOption
      newPreferences.fri = rows[4].selectedOption
      newPreferences.sat = rows[5].selectedOption
      newPreferences.sun = rows[6].selectedOption
      console.log("New preferences: ")
      console.log(newPreferences)
      alert("New preferences have been submitted!")
      updateShiftForUser(userData?.id, newPreferences)
    }
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
            <button onClick={sendNewPreferences}>Submit preferences</button>
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