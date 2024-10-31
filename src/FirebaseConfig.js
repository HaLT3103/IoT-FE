// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBxE-dHOGJSC_eNwxxLhT4bx5dZlaT2LMk",
  authDomain: "iotdb-cd8e7.firebaseapp.com",
  databaseURL:
    "https://iotdb-cd8e7-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "iotdb-cd8e7",
  storageBucket: "iotdb-cd8e7.appspot.com",
  messagingSenderId: "598976371783",
  appId: "1:598976371783:web:749035ef321e2f3dfea562",
  measurementId: "G-QML4ZDM3BF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { auth, app };
