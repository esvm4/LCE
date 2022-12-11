// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDbDp9jpApYADWS4vSf9scMJRHHV9DaiPM",
  authDomain: "my-project-1663599749497.firebaseapp.com",
  projectId: "my-project-1663599749497",
  storageBucket: "my-project-1663599749497.appspot.com",
  messagingSenderId: "920157565773",
  appId: "1:920157565773:web:8756171a6aa419a839fd04",
  measurementId: "G-YP2BS1LR3E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
