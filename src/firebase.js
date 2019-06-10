import firebase from 'firebase/app';
import 'firebase/firebase-auth';

import 'firebase/firebase-firestore';
import 'firebase/firebase-storage';

// Initalize and export Firebase.

var config = {
  apiKey: "AIzaSyDQ6PU3FQfvKjINJE1B3zFxomxVsEDc96w",
  authDomain: "betpeople-a64b6.firebaseapp.com",
  databaseURL: "https://betpeople-a64b6.firebaseio.com",
  projectId: "betpeople-a64b6",
  storageBucket: "betpeople-a64b6.appspot.com",
  messagingSenderId: "677152084316"
};
 

export default firebase.initializeApp(config);