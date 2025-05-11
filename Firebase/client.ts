// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase-admin/auth"; 
import { getFirestore } from "firebase-admin/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCfY2O6yM_0mIaWx6LZAH6Y9-1Nrq67Q-U",
  authDomain: "prepwise-ebf61.firebaseapp.com",
  projectId: "prepwise-ebf61",
  storageBucket: "prepwise-ebf61.firebasestorage.app",
  messagingSenderId: "931074593304",
  appId: "1:931074593304:web:b777e4ff1cd99a1d51296d",
  measurementId: "G-Z66KR616G5"
};

// Initialize Firebase
const app = !getApp.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
