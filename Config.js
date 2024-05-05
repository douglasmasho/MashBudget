import { initializeApp } from "firebase/app";
import {
  initializeFirestore,
  collection,
  getDocs,
  addDoc,
  onSnapshot,
  doc,
  deleteDoc,
  updateDoc,
  query,
  where,
  setDoc,
  getDoc,
  orderBy
} from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCe1ySGiZHNP2yuGh9Smvq0uAA078CaIP8",
  authDomain: "taskr-c6280.firebaseapp.com",
  databaseURL: "https://taskr-c6280-default-rtdb.firebaseio.com",
  projectId: "taskr-c6280",
  storageBucket: "taskr-c6280.appspot.com",
  messagingSenderId: "921826051079",
  appId: "1:921826051079:web:3ef3e0cc303e48ca9e16a2",
  measurementId: "G-3N76PSFRMF"
};
const app = initializeApp(firebaseConfig);
const db = initializeFirestore(app, { experimentalAutoDetectLongPolling: true, });

export {
  db,
  collection,
  getDoc,
  addDoc,
  onSnapshot,
  doc,
  deleteDoc,
  getDocs,
  updateDoc,
  query,
  where,
  setDoc,
  orderBy
};
