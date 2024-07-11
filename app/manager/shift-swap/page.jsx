// "use client";
// import { useState } from "react";
// import './scheduleData.json'

// export default function ShiftSwap() {
//   const [employee1, setEmployee1] = useState("");
//   const [employee2, setEmployee2] = useState("");
  
//   const handleSwap = () => {
//     if (employee1 && employee2 && employee1 !== employee2) {
//       const newSchedule = JSON.parse(JSON.stringify(scheduleData));
//       const employee1Shifts = [];
//       const employee2Shifts = [];

//       // Gather shifts for both employees
//       newSchedule.schedule.forEach(day => {
//         day.shifts.forEach(shift => {
//           if (shift.employee === employee1) {
//             employee1Shifts.push(shift);
//           } else if (shift.employee === employee2) {
//             employee2Shifts.push(shift);
//           }
//         });
//       });

//       // Swap shifts
//       newSchedule.schedule.forEach(day => {
//         day.shifts.forEach(shift => {
//           if (shift.employee === employee1) {
//             shift.employee = employee2;
//           } else if (shift.employee === employee2) {
//             shift.employee = employee1;
//           }
//         });
//       });

//       console.log("New Schedule:", newSchedule);
//       alert("Shifts swapped successfully!");
//     } else {
//       alert("Please select two different employees.");
//     }
//   };

//   const employees = Array.from(
//     new Set(scheduleData.schedule.flatMap(day => day.shifts.map(shift => shift.employee)))
//   );

//   return (
//     <div className="flex flex-col justify-center items-center h-screen bg-black-100 p-8 text-white">
//       <h1 className="text-2xl mb-4">Shift Swap</h1>
      
//       <div className="flex mb-4">
//         <div className="mr-4">
//           <label htmlFor="employee1" className="block mb-2">Employee 1:</label>
//           <select
//             id="employee1"
//             value={employee1}
//             onChange={(e) => setEmployee1(e.target.value)}
//             className="p-2 bg-gray-800"
//           >
//             <option value="">Select Employee</option>
//             {employees.map((employee) => (
//               <option key={employee} value={employee}>{employee}</option>
//             ))}
//           </select>
//         </div>
        
//         <div>
//           <label htmlFor="employee2" className="block mb-2">Employee 2:</label>
//           <select
//             id="employee2"
//             value={employee2}
//             onChange={(e) => setEmployee2(e.target.value)}
//             className="p-2 bg-gray-800"
//           >
//             <option value="">Select Employee</option>
//             {employees.map((employee) => (
//               <option key={employee} value={employee}>{employee}</option>
//             ))}
//           </select>
//         </div>
//       </div>
      
//       <button
//         onClick={handleSwap}
//         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//       >
//         Swap Shifts
//       </button>

//       <div className="mt-8 w-full max-w-4xl">
//         {scheduleData.schedule.map((day, dayIndex) => (
//           <div key={dayIndex} className="mb-4">
//             <h2 className="text-xl">Day {dayIndex}:</h2>
//             {day.shifts.length > 0 ? (
//               <ul>
//                 {day.shifts.map((shift, shiftIndex) => (
//                   <li key={shiftIndex}>
//                     {shift.employee}: {new Date(shift.shift[0]).toLocaleString()} - {new Date(shift.shift[1]).toLocaleString()}
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <p>No shifts scheduled.</p>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
