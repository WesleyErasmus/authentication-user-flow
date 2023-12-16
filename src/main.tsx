import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

// Bootstrap Import
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAWSKM27YuT4DCcps3X7MRGde9kzQvUoEo",
  authDomain: "authentication-user-flow-1b6c9.firebaseapp.com",
  projectId: "authentication-user-flow-1b6c9",
  storageBucket: "authentication-user-flow-1b6c9.appspot.com",
  messagingSenderId: "624135977711",
  appId: "1:624135977711:web:f662880480f1b41cdc791a",
  measurementId: "G-07RKP3BKQ4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase analytics
const analytics = getAnalytics(app);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
