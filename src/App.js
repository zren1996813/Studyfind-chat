import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import Chat from './Pages/Chat/Chat';
import Login from './Pages/Login/Login';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

firebase.initializeApp({
  apiKey: "AIzaSyDnykWYSIsAmNZyL2ud2Y-gClJGu-gebiU",
  authDomain: "chat-app-new-8caac.firebaseapp.com",
  databaseURL: "https://chat-app-new-8caac.firebaseio.com",
  projectId: "chat-app-new-8caac",
  storageBucket: "chat-app-new-8caac.appspot.com",
  messagingSenderId: "382031410537",
  appId: "1:382031410537:web:25705abb7962f1fd11f9f8"
})

const auth = firebase.auth();
const database = firebase.database();

const googleProvider = new firebase.auth.GoogleAuthProvider();
const facebookProvider = new firebase.auth.FacebookAuthProvider();

function App() {
  const [user, loading] = useAuthState(auth);
  const [data, setData] = useState();

  useEffect(() => {
    if(user) {
      const userRef = database.ref('users/' + user.uid).on('value', data => {
        setData(data.val());
      });
    }
  }, [user])

  return loading || !data
  ? <div> Loading... </div>
  : data
    ? <Chat data={data} auth={auth} database={database} />
    : <Login auth={auth} database={database} googleProvider={googleProvider} facebookProvider={facebookProvider} />
}

export default App
