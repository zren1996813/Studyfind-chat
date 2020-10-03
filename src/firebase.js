import React from 'react';
import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyDnykWYSIsAmNZyL2ud2Y-gClJGu-gebiU",
  authDomain: "chat-app-new-8caac.firebaseapp.com",
  databaseURL: "https://chat-app-new-8caac.firebaseio.com",
  projectId: "chat-app-new-8caac",
  storageBucket: "chat-app-new-8caac.appspot.com",
  messagingSenderId: "382031410537",
  appId: "1:382031410537:web:25705abb7962f1fd11f9f8"
};

const app = firebase.initializeApp(config);

const database = app.database();
const auth = app.auth();

const googleProvider = new firebase.auth.GoogleAuthProvider();
const facebookProvider = new firebase.auth.FacebookAuthProvider();

export { database, auth, facebookProvider, googleProvider };
