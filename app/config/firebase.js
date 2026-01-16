// AUTH: import { getAuth, GoogleAuthProvider } from "firebase/auth";
// DB: import { getFirestore } from "firebase/firestore";

// AUTH: initialize auth(getAuth(app)) & googleProvider(new GoogleAuthProvider())
// DB: initialize db(getFirestore(app))

// export auth, googleProvider, db
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBpbND2c94qgjrNzoUXC8IN4RuT4QYLuz0",
  authDomain: "workshop-e8bdf.firebaseapp.com",
  projectId: "workshop-e8bdf",
  storageBucket: "workshop-e8bdf.firebasestorage.app",
  messagingSenderId: "1066187595452",
  appId: "1:1066187595452:web:3c89c1c7b13117ab09bab9",
  measurementId: "G-1LNX6DYQQV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, googleProvider, db };