import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import Chat from './Pages/Chat/Chat';
import Login from './Pages/Login/Login';

import { auth, firestore } from './firebase';

function App() {
  const [user, loading] = useAuthState(auth);
  const [data, setData] = useState();

  // auth.signOut()

  useEffect(() => {
    if(user) {
      firestore.collection("users").doc(user.uid)
      .onSnapshot(async doc => {
        const snapshot = await firestore.collection("users").doc(user.uid).collection("chats").get()
        const chats = []
        snapshot.forEach(doc => chats.push({ id: doc.id, ...doc.data() }));
        setData({ uid: user.uid, ...doc.data(), chats });
      });
    }
  }, [user])

  return loading || (user && !data)
  ? <div> Loading... </div>
  : data
    ? <Chat data={data} />
    : <Login />
}

export default App
