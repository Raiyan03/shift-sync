import React, {useEffect, useState} from 'react';
import {auth} from '@\action\actions.ts';

const empSession = () => {
    const [currentEmployee, setCurrentEmployee] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if(user) {
                setCurrentEmployee(user);
            } else {
                setCurrentEmployee(null);
            }
        });
        
        return () => unsubscribe(); 
    }, []);

    return (
        <div>
            <h1>Employee Side</h1>
            {currentUser ? (
                <p>Logged in as: {currentEmployee.email}</p>
            ) : (
                <p>Login error</p>
            )}
        </div>
    );
};

export default empSession;
