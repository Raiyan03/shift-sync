//Expected imports
import React, {useEffect, useState} from 'react';
import {auth} from '@\action\actions.ts';

//Session manager for employee, should allow to see who is logged in
// and subsequently pull the appropriate information
const EmpSession = () => {
    const [currentEmployee, setCurrentEmployee] = useState(null);


    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if(user) {
                setCurrentEmployee(user);
                //User is signed in
            } else {
                setCurrentEmployee(null);
                //No user signed in, potential error
            }
        });
        
        return () => unsubscribe(); //To unsubscribe from the current listener when component unmounts
    }, []);

    //Rendered component and internal logic
    return (
        <div>
            <h1>Employee Side</h1>
            {currentUser ? (
                <p>Logged in as: {currentEmployee.email}</p>
                //Should be able to see logged employee information here!
                //Note: Potentially redundant, will have to verify
                // this session manager and informational query doesn't exist elsewhere!
                //Should always be referenceable with {currentUser.field_of_choice}
            ) : (
                <p>Login error</p>
            )}
        </div>
    );
};

export default EmpSession;
