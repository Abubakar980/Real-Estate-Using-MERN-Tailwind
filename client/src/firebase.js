// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-mern-3b59e.firebaseapp.com",
  projectId: "real-estate-mern-3b59e",
  storageBucket: "real-estate-mern-3b59e.firebasestorage.app",
  messagingSenderId: "212398789317",
  appId: "1:212398789317:web:e912c7efa19f9c41b296ac",
  measurementId: "G-JGLPGRLJXT"
};

console.log(import.meta.env.VITE_FIREBASE_API_KEY);


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
