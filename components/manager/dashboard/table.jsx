import ShiftSwapCard from "./shiftSwapCard"
const Table = ({ scheduleData, options, shiftData}) => {
    return scheduleData.result.map((employee, index) => {
        return (
            <tr key={index} className="bg-white">
                <td className="px-3 py-2">{employee.name}</td>
                {employee?.shifts?.map((shift, index) => {
                    return (
                        shift.requested ? (
                            // Applying larger margins and a subtle shadow for separation and emphasis
                            <td key={index} className=" m-1 ">
                                <ShiftSwapCard shift={shift} required={shift.requested} scheduleData={options} id={shift?.id} day={index} shiftData={shiftData}/>
                            </td>
                        ) : (
                            // Consistent padding and margin for non-working cells
                            <td key={index} className=" py-2 m-1">
                                <ShiftSwapCard shift={shift} required={shift.requested} scheduleData={options} id={shift?.id} day={index} shiftData={shiftData}/>
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
