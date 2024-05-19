// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY, // API key for accessing Firebase services
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN, // Domain for Firebase authentication
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID, // ID of the Firebase project
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET, // Storage bucket for Firebase storage service
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID, // Sender ID for Firebase messaging
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID, // App ID for the Firebase application
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initializing Firebase authentication service and exporting it.
// 'auth' is an instance of Firebase Auth service, used for handling user authentication.
export const auth = getAuth(app);
