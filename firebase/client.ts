// Import the functions you need from the SDKs you need
import { initializeApp , getApps , getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyAGqOVCpOjdESJVxdw0okrM1mYbVUBBNiY",
  authDomain: "prepwise-a5e2b.firebaseapp.com",
  projectId: "prepwise-a5e2b",
  storageBucket: "prepwise-a5e2b.firebasestorage.app",
  messagingSenderId: "337902446655",
  appId: "1:337902446655:web:2e24208c11e62a0106b08a",
  measurementId: "G-BRQHY30G05"
};

// Initialize Firebase
const app = !getApps.length ?  initializeApp(firebaseConfig) : getApp();
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);