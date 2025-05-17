// src/firebase.ts
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAO2ytoHv94HL6TasdaHdXA3z9qAYyhKtA",
  authDomain: "pfe-app-df97d.firebaseapp.com",
  projectId: "pfe-app-df97d",
  storageBucket: "pfe-app-df97d.appspot.com",
  messagingSenderId: "877772826760",
  appId: "1:877772826760:web:d601633abc12c00ad1173d",
  measurementId: "G-S5PFC1T9YJ"
};

// 👇 Ceci évite d'initialiser Firebase plusieurs fois
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// 👇 Auth et Firestore pour Web
export const auth = getAuth(app);
export const db = getFirestore(app);
