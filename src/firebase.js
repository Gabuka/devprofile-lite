import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDjY4cIOQhmIANSkIhzE3Pojcny2L-CmZ8",
  authDomain: "devprofile-lite.firebaseapp.com",
  projectId: "devprofile-lite",
  storageBucket: "devprofile-lite.firebasestorage.app",
  messagingSenderId: "1054711507295",
  appId: "1:1054711507295:web:709096ae73d75cf60b6eea"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);