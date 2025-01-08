// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBCAFP4AFWF5p_pFRXDDPOMyYG1j9aF6vc",
  authDomain: "task-management-6378f.firebaseapp.com",
  projectId: "task-management-6378f",
  storageBucket: "task-management-6378f.firebasestorage.app",
  messagingSenderId: "327153499964",
  appId: "1:327153499964:web:ba22408cd1a80f38642839",
  measurementId: "G-PENG387H5R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db  = getFirestore(app)

export {auth, db, app}