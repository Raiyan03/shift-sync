"use client";
import { useState } from "react";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import Link from "next/link";
import { useAuth } from "./Auth-Context";
import { doSignInWithEmailAndPassword } from "./auth";
import { redirect } from "next/navigation";
import Router from "next/router";
import { getOrganization } from "../lib/util";

const LoginForm = () => {
  const { userLoggedIn } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const organizations = await getOrganization();

    organizations.forEach((doc) =>{
      if(doc.data().manager == name && doc.data().email == email){
          doSignInWithEmailAndPassword(email, password);
      }else if(doc.data().manager != name){
        setError(true);
        setErrorMsg("The user email or name is incorrect")
      }else if(doc.data().email != email){
        setError(true);
        setErrorMsg("The user email or name is incorrect")
      }else if(doc.data().email != email && doc.data().manager != name){
        setError(true);
        setErrorMsg("The user email and name is incorrect")
      }
    })


  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-96">
      {userLoggedIn && redirect("/pages/Manager/")}
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Shift Sync
      </h2>
      <form onSubmit={handleSubmit}>
      <div className="mb-6">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Name
          </label>
          <div className="relative">
            <FaUser className="absolute top-3 left-3 text-gray-400" />
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full text-gray-800 px-10 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your name"
              required
            />
          </div>
        </div>
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Email
          </label>
          <div className="relative">
          <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full text-gray-800 px-10 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your email"
              required
            />
          </div>
        </div>

        <div className="mb-8">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Password
          </label>
          <div className="relative">
            <FaLock className="absolute top-3 left-3 text-gray-400" />
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full text-gray-800 px-10 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your password"
              required
            />
          </div>
        </div>

        {
            error &&

            <label
            className="block text-sm font-medium text-red-500 mb-8 text-center"
          > 
          {errorMsg}
          </label>

          }

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-transform transform hover:scale-105"
        >
          Login
        </button>
        <label className="text-black flex text-center justify-center align-middle m-auto">
          Not a user Register&nbsp;
          <Link className="text-blue-400" href="/pages/RegisterForm/">
            Here
          </Link>
        </label>
      </form>
    </div>
  );
};

export default LoginForm;
