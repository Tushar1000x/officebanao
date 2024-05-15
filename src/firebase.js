// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCFyb2YIQQIsnXkkpPD7YOBHd2bQiaiGVY",
  authDomain: "editphoto-5c221.firebaseapp.com",
  projectId: "editphoto-5c221",
  storageBucket: "editphoto-5c221.appspot.com",
  messagingSenderId: "343139165406",
  appId: "1:343139165406:web:2fc82a5904b9d7858c0e4f",
  measurementId: "G-Q2VMVT4L2P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const storage=getStorage(app);