const DayCard = ({day, preferences}) => {
    return (
    <div key={day} className="border m-5 p-3 rounded shadow">
        <h2 className="font-bold mb-3 capitalize">{day}</h2>
        <label className="block">
            <span className="text-gray-700">Preferred Time:</span>
            <select
                className="form-select mt-1 block w-full rounded border py-2 px-3 shadow outline-none"
                value={"morning"}
                onChange={e => handlePreferenceChange(day, e.target.value)}
            >
                <option className="rounded-full" value="">Select...</option>
                <option value="morning">sunday</option>
                <option value="afternoon">Afternoon</option>
                <option value="evening">Evening</option>
            </select>
        </label>
    </div>
    )
}

export default DayCard;