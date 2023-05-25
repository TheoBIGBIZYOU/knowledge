import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"
import "firebase/compat/storage"

const firebaseConfig = {
  apiKey: "AIzaSyBw_fsIjdXIWcyABUV96i0_psh7nXThBDY",
  authDomain: "knowledge-bis.firebaseapp.com",
  projectId: "knowledge-bis",
  storageBucket: "knowledge-bis.appspot.com",
  messagingSenderId: "257377423444",
  appId: "1:257377423444:web:972c90d1ebe60c73411dc1"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase }