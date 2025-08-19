// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCav9IcwBcGMY53Y1i6puyqN__uF2VK7ws",
  authDomain: "travelog-31419.firebaseapp.com",
  databaseURL: "https://travelog-31419-default-rtdb.firebaseio.com",
  projectId: "travelog-31419",
  storageBucket: "travelog-31419.firebasestorage.app",
  messagingSenderId: "817363884839",
  appId: "1:817363884839:web:a32cde4421fdab8c55a702"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence);
const db = getDatabase(app);

export { app, db, auth };
