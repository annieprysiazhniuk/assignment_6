import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js'

import {getDatabase, ref, set, child, get, remove} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyA89TfC8BGtr9Z8Chw777G_ZmegUJ_Ig0w",
    authDomain: "assignment-6-450cb.firebaseapp.com",
    projectId: "assignment-6-450cb",
    storageBucket: "assignment-6-450cb.appspot.com",
    messagingSenderId: "368088469238",
    appId: "1:368088469238:web:f39e36aefb34a7692e26d7",
    measurementId: "G-QCBENWD22X",
    databaseURL: 'https://assignment-6-450cb-default-rtdb.firebaseio.com/'
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth();
  const db = getDatabase(app);

  
  export {auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, db, ref, set, child, get, remove, onAuthStateChanged}