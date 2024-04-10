import { initializeApp } from "firebase/app";
import {getFirestore, collection} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: "filmystash.firebaseapp.com",
  projectId: "filmystash",
  storageBucket: "filmystash.appspot.com",
  messagingSenderId: "441460901743",
  appId: "1:441460901743:web:1c5b605e41059bd9dfca9a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const moviesRef = collection(db, "Movies");
export const reviewRef = collection(db, "Reviews");
export const userRef = collection(db, "Users");
export const auth = getAuth(app);


export default app;