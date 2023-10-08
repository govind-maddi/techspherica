// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD9G2Ej-iPv1LNV5Z7X0kYSciL0ii-9mhE",
  authDomain: "tech-spherica.firebaseapp.com",
  projectId: "tech-spherica",
  storageBucket: "tech-spherica.appspot.com",
  messagingSenderId: "291759277804",
  appId: "1:291759277804:web:e0a5c98ef42b137855c7c9",
  measurementId: "G-RCY1T2VHBQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
