import React, { useState } from 'react';
import firebase from "../../Services/firebase";
import {Card} from 'react-bootstrap';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from '../../Components/Header';
import { auth } from 'firebase'

function Login({ history }) {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    name: ''
  });
  const signInWithFacebook = () => {
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider)
    .then(data => {
        alert('Sign in successful!')
        history.push('/chat');
      })
      .catch(error => {
          alert("Eroor occured: " + error.message);
      })

  }
  const signInWithGoogle= () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
    .then(data => {
        alert('Sign in successful!')
        history.push('/chat');
      })
      .catch(error => {
          alert("Eroor occured: " + error.message);
      })
  }

  const [error, setError] = useState('');

  const handleInput = event => {
    setInputs({ ...inputs, [event.target.id]: event.target.value });
  }

  const handleSubmit = event => {
    event.preventDefault();

    firebase.auth().signInWithEmailAndPassword(inputs.email, inputs.password)
    .then(data => {
      console.log(data.user);
      console.log('Sign in successful!')
      history.push('/chat');
    })
    .catch(error => {
        alert("Eroor occured: " + error.message);
    })
  }

  return(
    <div>
     <Header/>
            <CssBaseline/>
            <Card className='formacontrooutside'>
                <form className = "customform">
      <div>
        <label className='signUpText'> Email </label>
        <input
          id="email"
          type="text"
          value={inputs.email}
          onChange={handleInput}
        />
      </div>
      <div>
        <label className='passwordField'> Password </label>
        <input
          id="password"
          type="password"
          value={inputs.password}
          onChange={handleInput}
        />
      </div>
      <div>
      <button onClick={handleSubmit}>Submit!</button>
      </div>
      <div>
      <button onClick={signInWithGoogle}> Sign in with Google</button>
      </div>
      <div>
      <button onClick={signInWithFacebook}>Sign in with Facebook</button>
      </div>
      <div>
      <button onClick={() => auth.signOut()}>Sign out</button>
      </div>
    </form>
    </Card>
    </div>
  )
}

export default Login;