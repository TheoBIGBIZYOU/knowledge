import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"
import "firebase/compat/storage"

const firebaseConfig = {
  apiKey: 'AIzaSyCHDs2Lvuhy9qm946ZxwrIQgL4tbqgV4eA',
  authDomain: 'knowledge-cf905.firebaseapp.com',
  projectId: 'knowledge-cf905',
  storageBucket: 'knowledge-cf905.appspot.com',
  messagingSenderId: '535836127704',
  appId: '1:535836127704:web:9bd62198c3b4cbac3942ad',
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase }