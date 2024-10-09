import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, doc, updateDoc, deleteDoc, getDocs, query, where, getDoc } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBqmkUhfS3fj2NV3UcMphtynGqeuRURzuE",
  authDomain: "hondatien-54b00.firebaseapp.com",
  projectId: "hondatien-54b00",
  storageBucket: "hondatien-54b00.appspot.com",
  messagingSenderId: "694459820163",
  appId: "1:694459820163:web:bf640d33641be99f3a53b6"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db, collection, addDoc, doc, updateDoc, deleteDoc, getDocs, query, where, getDoc };