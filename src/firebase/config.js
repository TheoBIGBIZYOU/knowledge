import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyCHDs2Lvuhy9qm946ZxwrIQgL4tbqgV4eA',
  authDomain: 'knowledge-cf905.firebaseapp.com',
  databaseURL: 'https://your-database-name.firebaseio.com',
  projectId: 'knowledge-cf905',
  storageBucket: 'knowledge-cf905.appspot.com',
  messagingSenderId: '535836127704',
  appId: '1:535836127704:web:9bd62198c3b4cbac3942ad',
};
let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app();
}
const auth = firebase.auth();

export { firebase };