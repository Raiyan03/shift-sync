const Table = ({scheduleData}) => {
    return scheduleData.result.map((employee, index) => {
        return (
            <tr key={index} className=" border-2 border-solid">
                <td className="p-2 w-2/12 border-x-2">{employee.name}</td>
                {employee.shifts.map((shift, index) => {
                    return (
                        shift.requested ? (<td key={index} className="p-2 border-x-2 bg-green-500 text-white">{shift?.shift || shift}</td>) 
                                        :
                                        (<td key={index} className="p-2 border-x-2">{shift?.shift || shift}</td>)
                    )
                })}
                <td className="p-2 w-2/12 text-center border-x-2">{employee.total_hours}</td>
            </tr>
        )
    })
}

export default Table;