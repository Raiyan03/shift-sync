import React from 'react';
import { getShifts } from './shifts.js';
import { MAX_SHIFTS_PER_EMPLOYEE } from './config';
import { calculateEmployeeAvailability, assignShifts } from './utils';

const { MAX_SHIFTS_PER_EMPLOYEE } = require('./config');
const { calculateEmployeeAvailability, assignShifts } = require('./utils');

/**
 * GPT arrays of employees and shifts
 * Calculates shifts per week for employees.
 * @param {Array} employees
 * @param {Array} shifts
 * @returns {Object}
 */

// calculate shifts
function calculateShifts(employees, shifts) {
    const availability = calculateEmployeeAvailability(employees, shifts);
    const assignedShifts = assignShifts(availability, shifts, MAX_SHIFTS_PER_EMPLOYEE);

    return assignedShifts;
    //
}

module.exports = calculateShifts;