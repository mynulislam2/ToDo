// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAIb_xl5RQvBfvsHBxHBAnlH07UsQnskgs",
  authDomain: "todo-43f41.firebaseapp.com",
  projectId: "todo-43f41",
  storageBucket: "todo-43f41.appspot.com",
  messagingSenderId: "123071769001",
  appId: "1:123071769001:web:48e6c8455bd7f63a92fcb8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app)
export default auth