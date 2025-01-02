// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
//adaugat nou
// import 'firebase/auth';
// import 'firebase/firestore';
// import 'firebase/storage';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDnpqs1G50NUd_l-S9O9AKYDVVQRZSLE8c",
  authDomain: "artera2709.firebaseapp.com",
  projectId: "artera2709",
  storageBucket: "artera2709.appspot.com",
  messagingSenderId: "893747033134",
  appId: "1:893747033134:web:da36ced20ca331dfc49bbf",
  measurementId: "G-32NTRQ9FZE"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export {app, auth, db, storage };