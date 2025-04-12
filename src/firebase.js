/* eslint-disable prettier/prettier */
// src/firebase.js

// Import modular functions from Firebase
import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

// Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCxbZ2J1WrokOKie2zLqU_nAS2pcNmZIGM',
  authDomain: 'ats-database-c766e.firebaseapp.com',
  projectId: 'ats-database-c766e',
  storageBucket: 'ats-database-c766e.firebasestorage.app',
  messagingSenderId: '957560849453',
  appId: '1:957560849453:web:024b62f21562c1c98a24a4',
  measurementId: 'G-KT59VF7Q8F',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export {auth, db, storage};
