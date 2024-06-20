const Table = ({scheduleData}) => {
    return scheduleData.map((employee, index) => {
        return (
            <tr className=" border-2 border-solid">
                <td className="p-2 w-2/12 border-x-2">{employee.name}</td>
                {employee.shifts.map((shift, index) => {
                    return (
                        shift.requested ? (<td className="p-2 border-x-2 bg-green-500 text-white">{shift?.shift || shift}</td>) 
                                        :
                                        (<td className="p-2 border-x-2">{shift?.shift || shift}</td>)
                    )
                })}
            </tr>
        )
    })
}

export default Table;