// src/firebase.js

// Import modular functions from Firebase
import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyC4l7dTaNdf9MW46ZsHzNAhVuYs1bpiOhY',
  authDomain: 'ats-auth-e96fe.firebaseapp.com',
  projectId: 'ats-auth-e96fe',
  storageBucket: 'ats-auth-e96fe.appspot.com', // ← diperbaiki (.app menjadi .com)
  messagingSenderId: '775949750826',
  appId: '1:775949750826:web:d36565f49fd6334cbb2953',
  measurementId: 'G-NPP6N2BP5L',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {auth, db};
