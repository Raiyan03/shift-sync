import React from "react";
import { convertTimeStamp } from "../lib/utilities";

const TimeStampComp = ({ shiftStamp }) => {

    const fullStamp = convertTimeStamp(shiftStamp);

    return (

        <td>{fullStamp}</td>

    )
}

export default TimeStampComp;