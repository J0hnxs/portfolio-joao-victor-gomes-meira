import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// User provided config for jimin-machine
const firebaseConfig = {
    apiKey: "AIzaSyC5SI3_KbZ_x4zHa1uo_Ln8V057doA65zQ",
    authDomain: "jimin-machine.firebaseapp.com",
    projectId: "jimin-machine",
    storageBucket: "jimin-machine.firebasestorage.app",
    messagingSenderId: "511063447708",
    appId: "1:511063447708:web:651cfffcf7d6720b657559",
    measurementId: "G-JFSMBLVK5S"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
