import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { FIREBASE_CONFIG } from "../const";

// Initialize Firebase
initializeApp(FIREBASE_CONFIG);

export const auth = getAuth();

export const logout = () => {
  auth.signOut();
};
