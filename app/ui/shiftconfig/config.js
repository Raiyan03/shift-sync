import React from "react";

//manually add the data for the schedule

const MAX_SHIFTS_PER_EMPLOYEE = 5;
const SHIFT_HOURS = {
    morning: '08:00-12:00',
    afternoon: '12:00-16:00',
    evening: '16:00-20:00',
};

module.exports = {
    MAX_SHIFTS_PER_EMPLOYEE,
    SHIFT_HOURS,
};