const getDayName = (day) => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    return days[day];
  };
  
  // Function to convert timestamp to time string
const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };


const ShiftTable = ({ schedule }) => {
    return (
      <div className="bg-secondary p-2 border rounded-lg">
        <h1 className="text-xl">Schedule</h1>
        <table>
          <thead>
            <tr>
              <th className="p-2" >Day</th>
              <th className="p-2">Time</th>
              <th className="p-2">Shift Length (hours)</th>
            </tr>
          </thead>
          <tbody>
            {schedule.map((item, index) => (
              <tr key={index}>
                <td className="p-2">{getDayName(item.day)}</td>
                <td className="p-2">{`${formatTime(item.shift.shift[0])} - ${formatTime(item.shift.shift[1])}`}</td>
                <td className="p-2 text-center">{item.shift.hours}hr</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  export default ShiftTable;