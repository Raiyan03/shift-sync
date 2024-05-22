"use client"
import { initializeAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "./Firebase";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function useAuth(){
    return useContext(AuthContext);
}

export const AuthProvider = ({children}) =>{

    const[currentUser, setCurrentUser ] = useState(null);
    const[userLoggedIn, setUserLoggedIn ] = useState(false);
    const[loading, setLoading ] = useState(true);


    useEffect(()=>{

        const unsubscribe = onAuthStateChanged(auth, initializeUser);
        return unsubscribe;

    },[])

    async function initializeUser(user){
        if(user){
            setCurrentUser({...user});
            setUserLoggedIn(true);
        }else{
            setCurrentUser(null);
            setUserLoggedIn(false);
        }
        setLoading(false);
    }

    const value = {
        currentUser,
        userLoggedIn,
        loading
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )

}