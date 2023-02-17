import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyC-GNn0n8pkKa2G_ZQrYGNUPxgSBHKVr6k",
  authDomain: "iotsmarthome-5d008.firebaseapp.com",
  projectId: "iotsmarthome-5d008",
  storageBucket: "iotsmarthome-5d008.appspot.com",
  messagingSenderId: "402123706438",
  appId: "1:402123706438:web:b2d4fcece32533ea8efa47",
  measurementId: "G-QHQHE1L7YX",
  databaseURL: "https://iotsmarthome-5d008-default-rtdb.firebaseio.com",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const database = getDatabase(app);
export const storage = getStorage(app);
