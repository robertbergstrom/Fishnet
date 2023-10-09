// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB7L2oaiuNB6iIML6DibX2jkUNTgDpGexU",
  authDomain: "fishnet-348012.firebaseapp.com",
  projectId: "fishnet-348012",
  storageBucket: "fishnet-348012.appspot.com",
  messagingSenderId: "152462436663",
  appId: "1:152462436663:web:20b92f092c5d0334f692b2",
  measurementId: "G-RGVEE8D4QF",
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = initializeApp(FIREBASE_APP);
