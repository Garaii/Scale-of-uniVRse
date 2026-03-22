import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBzZtjU9B4E87viNfWBIvgu8FbJ7UrciuA",
  authDomain: "scale-of-the-univrse.firebaseapp.com",
  databaseURL: "https://scale-of-the-univrse-default-rtdb.firebaseio.com",
  projectId: "scale-of-the-univrse",
  storageBucket: "scale-of-the-univrse.firebasestorage.app",
  messagingSenderId: "447028819659",
  appId: "1:447028819659:web:c66a9202076698b26c4d4e",
  measurementId: "G-R6T68SJ22C"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);