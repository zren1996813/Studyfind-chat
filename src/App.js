import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import Chat from 'Pages/Chat/Chat';
import Login from 'Pages/Login/Login';

import { auth, firestore } from 'fire';

function App() {
  const [user, loading] = useAuthState(auth);
  const [data, setData] = useState();

  useEffect(() => {
    if(user) {
      firestore.collection("users").doc(user.email)
      .onSnapshot(userData => {
        firestore.collection("users").doc(user.email).collection("chats")
        .onSnapshot(chatData => {

          const chats = []
          chatData.forEach(doc => chats.push({ user: doc.id, ...doc.data() }));
          setData({ email: userData.id, ...userData.data(), chats });

        });

      });
    }
  }, [user])

  // auth.signOut();

  console.log(data)

  return loading || (user && !data)
  ? <div> Loading... </div>
  : data
    ? <Chat data={data} />
    : <Login />
}

export default App
