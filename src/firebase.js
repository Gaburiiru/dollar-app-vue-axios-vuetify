import firebase from "firebase/app";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDspYOv14Jm4NjBmx3WmRxuOaPx-iZIxk4",
  authDomain: "vue-auth-569e3.firebaseapp.com",
  projectId: "vue-auth-569e3",
  storageBucket: "vue-auth-569e3.appspot.com",
  messagingSenderId: "623062368751",
  appId: "1:623062368751:web:5b0ef67472762817a4361a",
};

// Initialize Firebase
firebase.initializeApp(config);
const auth = firebase.auth();

export { firebase, auth};
