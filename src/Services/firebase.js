import React from 'react';
import * as firebase from 'firebase';
var firebaseConfig = {
    apiKey: "AIzaSyDnykWYSIsAmNZyL2ud2Y-gClJGu-gebiU",
    authDomain: "chat-app-new-8caac.firebaseapp.com",
    databaseURL: "https://chat-app-new-8caac.firebaseio.com",
    projectId: "chat-app-new-8caac",
    storageBucket: "chat-app-new-8caac.appspot.com",
    messagingSenderId: "382031410537",
    appId: "1:382031410537:web:25705abb7962f1fd11f9f8"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
export default firebase;