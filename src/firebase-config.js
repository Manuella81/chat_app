// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDFasarDjJDO1JrTblke8Ceb0-89zeR0bM",
  authDomain: "react-chat-app-100b9.firebaseapp.com",
  projectId: "react-chat-app-100b9",
  storageBucket: "react-chat-app-100b9.appspot.com",
  messagingSenderId: "119233570725",
  appId: "1:119233570725:web:b5befcf10dc04e4c296a4c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app)
const provider = new GoogleAuthProvider();

export {db, auth, provider}