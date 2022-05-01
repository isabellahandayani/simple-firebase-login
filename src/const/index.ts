import { GoogleAuthProvider } from "firebase/auth";

export const FIREBASE_CONFIG = {
  apiKey: "AIzaSyCzJOZQeZuoJ2snYBruIXf1H8zxMtewW8A",
  authDomain: "test-app-53abc.firebaseapp.com",
  projectId: "test-app-53abc",
  storageBucket: "test-app-53abc.appspot.com",
  messagingSenderId: "170526674201",
  appId: "1:170526674201:web:5359669583527db2938988",
};

export const UI_CONFIG = {
  signInFlow: "popup",
  signInOptions: [GoogleAuthProvider.PROVIDER_ID],
};
