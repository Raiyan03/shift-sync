import React from "react";
import { convertTimeStamp } from "../lib/utilities";

const TimeStampComp = ({ shiftStamp }) => {

    const fullStamp = convertTimeStamp(shiftStamp);

    return (
        <td className="p-2">{fullStamp}</td>
    )
}

export default TimeStampComp;