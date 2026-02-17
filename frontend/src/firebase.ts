import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCFVSQDxbPqH-vQlQ9yUePJWM0bYUReisY",
  authDomain: "trustora-6cf79.firebaseapp.com",
  projectId: "trustora-6cf79",
  storageBucket: "trustora-6cf79.firebasestorage.app",
  messagingSenderId: "276306839035",
  appId: "1:276306839035:web:1bd7dfd475f3d9a09bf75e",
  measurementId: "G-E5Y6PLM5BG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);
