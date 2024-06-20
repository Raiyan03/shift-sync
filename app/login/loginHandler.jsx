"use client"
import React, { useState } from "react";
import "firebase/auth";
import "firebase/firestore";
//import { TextInput } from 'react-native'
import { redirect } from "next/navigation";
import Link from "next/link";
import { useHistory } from 'react-router-dom';

//const firebaseConfig = {
    //Requires initialization
//}

//const app = initializeApp(firebaseConfig);


export default function SignUpScreen() {
    //const auth = firebase.auth;
    //const firestore = firebase.firestore;

    //const history = useHistory();

    const [role, setRole] = useState("");
    const [values, setValues] = useState({
        name: "",
        role: "",
        email: "",
        pwd: "",
        pwd2: ""
    })

    const id = Math.floor(Math.random() * 100000);

    //const empData = getEmployeeData("Employees");
    //const manaData = getEmployeeData("Managers");

    
    function handleChange(text, eventName) {
        setValues(prev => {
            return {
                ...prev,
                [eventName]: text
            }
        })
    }

    const handleRole = (event) => {
        setRole(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        SignUp;
        //history.push('dashboard');
    }

    function SignUp() {
        const {email, pwd, pwd2, name, role} = values

        /*
        empData.forEach((emp) => {
            if(emp.name == name) {
                alert("User already exists!");
            }
        })
        */

        if (pwd == pwd2) {
            auth.createUserWithEmailAndPassword(email,pwd)
            .then(() => {
                firestore.collection("Users").doc(auth().currentUser.uid).set({
                    uid: auth().currentUser.uid,
                    name,
                    role,
                    email
                })
            })
            .catch((error) => {
                alert(error.message)
            });

        } else {
            alert("Passwords are different!")
        }
    }

    return (
        <div className="w-full h-screen flex items-center justify-center">
        <form onSubmit={handleSubmit} className="bg-bgSoft p-12 rounded-lg w-1/3 h-auto flex flex-col justify-center gap-8">
          <h1 className="text-3xl font-bold text-center">Sign Up</h1>
          <input
            type="text" 
            name="username" 
            className="p-8 border-2 border-teal-600 bg-inherit bg-bg text-text" 
            placeholder="Name"
            onChangeText={text => handleChange(text, "name")}
            />
          <input
            type="text" 
            name="email" 
            className="p-8 border-2 border-teal-600 bg-inherit bg-bg text-text" 
            placeholder="Email Address"
            onChangeText={text => handleChange(text, "email")}
            />
          <input
            type="password" 
            name="pwd" 
            className="p-8 border-2 border-teal-600 bg-inherit bg-bg text-text" 
            placeholder="Password"
            onChangeText={text => handleChange(text, "pwd")}
            />
          <input
            type="password" 
            name="pwd2" 
            className="p-8 border-2 border-teal-600 bg-inherit bg-bg text-text" 
            placeholder="Confirm Password"
            onChangeText={text => handleChange(text, "pwd")}
            />
          <select
            name="role"
            value={role}
            onChange={handleRole}
          >
            <option value="Employee">Employee</option>
            <option value="Manager">Manager</option>
          </select>
            
          <button 
            type="submit" 
            //onClick={() => SignUp()}
            className='bg-red-600 p-5 rounded-sm'>Confirm</button>
        </form>
      </div>
    );
}