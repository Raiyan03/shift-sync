import { getShifts } from './shifts.js';
import React from 'react';

/**
 * GPT arrays of employees and shifts
 * Calculates the availability of each employee based on their preferences.
 * @param {Array} employees 
 * @param {Array} shifts
 * @returns {Array}
 * 
 * 
 */
// creat the availability and map the employees to the shifts
function calculateEmployeeAvailability(employees, shifts) {
    const availability = employees.map(employee => {
        return {
            employeeId: employee.id,
            availableShifts: shifts.filter(shift => employee.preferences.includes(shift.day)),
        };
    });
    return availability;
}

/**
 * GPT arrays of employee availability and shifts
 * Assigns shifts to employees based on their availability and constraints.
 * @param {Array} availability 
 * @param {Array} shifts
 * @param {Number} maxShiftsPerEmployee 
 * @returns {Object} 
 * 
 */

// assign the shifts to the employees based on their availability and constraints
function assignShifts(availability, shifts, maxShiftsPerEmployee) {
    const assignedShifts = {};
    availability.forEach(employee => {
        assignedShifts[employee.employeeId] = employee.availableShifts.slice(0, maxShiftsPerEmployee);
    });
    return assignedShifts;
}

module.exports = {
    calculateEmployeeAvailability,
    assignShifts,
};