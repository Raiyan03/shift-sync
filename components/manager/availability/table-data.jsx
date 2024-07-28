import { convertTimeStamp } from "@/lib/utilities";

//Need to investigate the convertTimeStamp Function
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
