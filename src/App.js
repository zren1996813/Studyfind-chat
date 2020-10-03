import React, { useState, useEffect } from 'react';
import firebase from "firebase";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory
} from  'react-router-dom';

import Chat from './Pages/Chat/Chat';
import Signup from './Pages/Signup/Signup';
import Login from './Pages/Login/Login';

function App() {
  const history = useHistory();
  const [data, setData] = useState();

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        const userRef = firebase.database().ref('users/' + user.uid);
        userRef.on('value', data => {
          setData(data.val());
        });
        history.push('/chat');
      } else {
        setData({});
        history.push('/login');
      }
    });
  }, [])

  return data ? (
    <Router>
      <Switch>
        <Route exact path="/"><Signup /></Route>
        <Route path="/login"><Login /></Route>
        <Route path="/signup"><Signup /></Route>
        <Route path="/chat"><Chat /></Route>
      </Switch>
    </Router>
  ) : <div> Loading... </div>
}

export default App
