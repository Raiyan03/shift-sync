import { getDayName, formatTime} from "@/lib/employeeHelper"

const ShiftTable = ({ schedule }) => {
    console.log(schedule)
    return (
      <div className="bg-secondary p-2 border rounded-lg">
        <h1 className="text-xl text-accent1">Schedule</h1>
        <table className="w-full">
          <thead>
            <tr>
              <th className="p-2" >Day</th>
              <th className="p-2">Time</th>
              <th className="p-2">Shift Length (hours)</th>
              <th>Request</th>
            </tr>
          </thead>
          <tbody>
            {schedule.map((item, index) => (
              <tr key={index}>
                <td className="p-2 text-center">{getDayName(item.day)}</td>
                <td className="p-2 text-center">{`${formatTime(item.shift.shift[0])} - ${formatTime(item.shift.shift[1])}`}</td>
                <td className="p-2 text-center">{item.shift.hours}hr</td>
                <td className="p-2 text-center">{item.shift.requested ? "Requested" : "Not Requested"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  export default ShiftTable;