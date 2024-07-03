const Table = ({ scheduleData }) => {
    return scheduleData.result.map((employee, index) => {
        return (
            <tr key={index} className="bg-white">
                <td className="px-3 py-2">{employee.name}</td>
                {employee.shifts.map((shift, index) => {
                    return (
                        shift.requested ? (
                            // Applying larger margins and a subtle shadow for separation and emphasis
                            <td key={index} className="px-3 m-1  text-white ">
                                <div className="p-2 bg-[#50C878] rounded">
                                    {shift?.shift || shift}
                                </div>
                            </td>
                        ) : (
                            // Consistent padding and margin for non-working cells
                            <td key={index} className="px-3 py-2 m-1">
                                <div className="p-2">
                                    {shift?.shift || shift}
                                </div>
                            </td>
                        )
                    )
                })}
                <td className="px-3 py-2 text-center">{employee.total_hours}</td>
            </tr>
        )
    })
}

export default Table;
