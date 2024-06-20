import React from 'react';
import { getShifts } from '../../../../ui/users/preferences/shifts/shifts';
import { MAX_SHIFTS_PER_EMPLOYEE } from './config';
import { calculateEmployeeAvailability, assignShifts } from './utils';

/**
 * Calculate shifts per week for employees.
 * @param {Array} employees
 * @param {Array} shifts
 * @returns {Object}
 */
function calculateShifts(employees, shifts) {
    const availability = calculateEmployeeAvailability(employees, shifts);
    const assignedShifts = assignShifts(availability, shifts, MAX_SHIFTS_PER_EMPLOYEE);

    return assignedShifts;
}

export default calculateShifts;
