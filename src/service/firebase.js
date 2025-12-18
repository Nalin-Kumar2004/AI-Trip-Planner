// Firebase Configuration
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAWN7OMzq-kaS-j31NQzjFV9CBxi1i9sBU",
  authDomain: "gen-lang-client-0264151250.firebaseapp.com",
  projectId: "gen-lang-client-0264151250",
  storageBucket: "gen-lang-client-0264151250.firebasestorage.app",
  messagingSenderId: "518399811610",
  appId: "1:518399811610:web:82081822463d6b3ba971a3"
};

// Initialize Firebase app instance
const app = initializeApp(firebaseConfig);

// Initialize and export Firestore database
// This 'db' is used in firebaseService.js for all database operations
export const db = getFirestore(app);
