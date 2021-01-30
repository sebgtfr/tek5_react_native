import './fix';

import * as firebase from 'firebase/app';
import '@firebase/auth';
import '@firebase/firestore';

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyC1HsKJlW84I_9acGQojnnEw7PdjasOhbo',
  authDomain: 'emercure-119c1.firebaseapp.com',
  projectId: 'emercure-119c1',
  storageBucket: 'emercure-119c1.appspot.com',
  messagingSenderId: '206552085467',
  appId: '1:206552085467:web:bd5db5d76d24b280302dfe',
  measurementId: 'G-T40VJEB8RL',
};

const App = firebase.initializeApp(firebaseConfig);

export const Firestore = firebase.firestore(App);

export default firebase;
