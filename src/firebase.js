 import firebase from 'firebase/app'
 import 'firebase/firestore';
 // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyChn9WCbz8kxOedlRtBXheYm98UZpSfOeM",
    authDomain: "react-a77be.firebaseapp.com",
    projectId: "react-a77be",
    storageBucket: "react-a77be.appspot.com",
    messagingSenderId: "854546999325",
    appId: "1:854546999325:web:81dea9e2897697f7ad3ef4",
    measurementId: "G-HDGHFFXN6Z"
  };
  // Initialize Firebase
  const fb=firebase.initializeApp(firebaseConfig);
  export const db=fb.firestore();

