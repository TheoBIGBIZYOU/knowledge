import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCHDs2Lvuhy9qm946ZxwrIQgL4tbqgV4eA',
  authDomain: 'your-auth-domain-b1234.firebaseapp.com',
  databaseURL: 'https://your-database-name.firebaseio.com',
  projectId: 'knowledge-cf905',
  storageBucket: 'knowledge-cf905.appspot.com',
  messagingSenderId: '12345-insert-yourse',
  appId: '1:535836127704:ios:df23801dcc1242c73942ad',
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };