import { filterCurrentPreferences } from "@/lib/employeeHelper";
import { formatTimeRange } from "@/lib/employeeHelper";
const DayCard = ({day, preferences, shiftList, handlePreferenceChange}) => {
    const curPref = filterCurrentPreferences(preferences, day, shiftList);
    return (
    <div key={day} className="border m-3 p-3 rounded shadow transition duration-200 ease-in-out hover:bg-gray-200 hover:shadow-xl">
        <h2 className="font-bold mb-3 capitalize">{day}</h2>
        <label className="block">
            <span className="text-gray-700">Preferred Time:</span>
            <select
                className="form-select mt-1 block w-full rounded border py-2 px-3 shadow outline-none cursor-pointer"
                value={curPref}
                onChange={e => handlePreferenceChange(day, e.target.value)}
            >
                {
                    shiftList?.map((shift, index) => (
                        <option key={index} value={shift}>{formatTimeRange(shift)}</option>
                    ))
                }
                <option value={"any"}>Any</option>
            </select>
        </label>
    </div>
    )
}

export default DayCard;