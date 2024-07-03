// export default function TableData({ scheduleData }) {
//   return scheduleData.map((employee, index) => {
//     return (
//       <tr className=" border-2 border-solid">
//         <td className="p-2 border-x-2">{employee.name}</td>
//         {/* {employee.shifts.map((shift, index) => {
//           return shift.requested ? (
//             <td className="p-2 w-2/12 border-x-2 bg-green-500 text-white">
//               {shift?.shift || shift}
//             </td>
//           ) : (
//             <td className="p-2 w-2/12 border-x-2">{shift?.shift || shift}</td>
//           );
//         })} */}
//       </tr>
//     );
//   });
// }

import { convertTimeStamp } from "@/lib/utilities";

const TableData = ({scheduleData}) =>{
    return scheduleData.employees.map((data, index)=>{
        return (
            <tr key={index}>
                <td className="p-2">{data.name}</td>
                <td className="p-2">{convertTimeStamp(scheduleData.shifts[data.shiftPref.Mon]) || "Any Shift"}</td>
                <td className="p-2">{convertTimeStamp(scheduleData.shifts[data.shiftPref.Tue]) || "Any Shift"}</td>
                <td className="p-2">{convertTimeStamp(scheduleData.shifts[data.shiftPref.Wed]) || "Any Shift"}</td>
                <td className="p-2">{convertTimeStamp(scheduleData.shifts[data.shiftPref.Thu]) || "Any Shift"}</td>
                <td className="p-2">{convertTimeStamp(scheduleData.shifts[data.shiftPref.Fri]) || "Any Shift"}</td>
                <td className="p-2">{convertTimeStamp(scheduleData.shifts[data.shiftPref.Sat]) || "Any Shift"}</td>
                <td className="p-2">{convertTimeStamp(scheduleData.shifts[data.shiftPref.Sun]) || "Any Shift"}</td>
            </tr>
        );
    })
}

export default TableData;
