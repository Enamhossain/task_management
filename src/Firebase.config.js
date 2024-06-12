// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyCMrqkjt1KKvEHaZOPkN1AdcFa3D9I5x-c",
  authDomain: "task-management-73b31.firebaseapp.com",
  projectId: "task-management-73b31",
  storageBucket: "task-management-73b31.appspot.com",
  messagingSenderId: "1021732268880",
  appId: "1:1021732268880:web:26d2c9b44353cc40d81a55",
  measurementId: "G-WW8TW5N9Q1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app