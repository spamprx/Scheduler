// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBYhrCTI9Y2ehmM8lJ85WZ_3KDpyQ4Cr3A",
    authDomain: "scheduler-5f538.firebaseapp.com",
    projectId: "scheduler-5f538",
    storageBucket: "scheduler-5f538.appspot.com",
    messagingSenderId: "47510391520",
    appId: "1:47510391520:web:169c211d04d59370699e85",
    measurementId: "G-65X0HTVZQF"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);