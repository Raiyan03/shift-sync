import { logOutUser } from "@/action/actions"
import EmpSession from "../../components/employee/emp-session/emp-session-monitor";
import EmployeeUpdateForm from "./update/update-employee";

const page = () => {
  return (
    <div>
        <div>
            <EmpSession />
        </div>
        <div>
          <EmployeeUpdateForm />
        </div>
        <form action={logOutUser}>
            <button type="submit">
                Logout
            </button>
        </form>
        {/* <button onClick={logOutUser}>Logout</button> */}
    </div>
  )
}

export default page;

/*
//Alternative code for displaying logged in user information
// Uses 'currentUser' state or react Context
// TODO: Clean this up

import React, { useContext } from 'react';
import { AuthContext } from './AuthContext'; // Assume you have an AuthContext for managing authentication state

const EmployeeProfile = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div>
      <h2>Employee Profile</h2>
      {currentUser ? (
        <div>
          <p>Name: {currentUser.displayName}</p>
          <p>Email: {currentUser.email}</p>
          // { Display more employee details as needed }
        </div>
      ) : (
        <p>No employee logged in</p>
      )}
    </div>
  );
};

export default EmployeeProfile;
*/ 