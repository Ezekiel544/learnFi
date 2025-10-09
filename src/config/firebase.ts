// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
// Replace these with your own Firebase config values
const firebaseConfig = {
  apiKey: "AIzaSyAm_gGJ_4kSKLh7lu6kkWvlHBbcp0PUxgE",
  authDomain: "learnfi-b2a16.firebaseapp.com",
  projectId: "learnfi-b2a16",
  storageBucket: "learnfi-b2a16.firebasestorage.app",
  messagingSenderId: "232099689773",
  appId: "1:232099689773:web:909b6c5042a05a7d6d4fa4"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;