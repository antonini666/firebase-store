import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCetJqqbRr06iEo_SuKWi2BDOdZakBy4o0",
  authDomain: "store-firebase-cdbd5.firebaseapp.com",
  databaseURL: "https://store-firebase-cdbd5.firebaseio.com",
  projectId: "store-firebase-cdbd5",
  storageBucket: "store-firebase-cdbd5.appspot.com",
  messagingSenderId: "836851863494",
  appId: "1:836851863494:web:543ac3d7a3d985a10d2cc7",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const database = firebase.database();
export const storage = firebase.storage();
