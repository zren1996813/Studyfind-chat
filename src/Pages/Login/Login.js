import React, { useState } from 'react';
import { database, auth, facebookProvider, googleProvider } from "../../Services/firebase";

import Header from '../../Components/Header';

function Login({ history }) {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    name: ''
  });

  const [error, setError] = useState('');

  const handleInput = event => {
    setInputs({ ...inputs, [event.target.id]: event.target.value });
  }

  const signInWithFacebook = event => {
    event.preventDefault();
    auth.signInWithPopup(facebookProvider)
    .then(data => {
      const { name, email } = data.additionalUserInfo.profile;
      if(data.additionalUserInfo.isNewUser){
        database.ref('users/' + data.user.uid)
        .set({ name, email })
        .then(() => history.push('/chat'));
      }
    })
    .catch(error => {
      alert("Error occured: " + error.message);
    })
  }

  const signInWithGoogle = event => {
    event.preventDefault();
    auth.signInWithPopup(googleProvider)
    .then(data => {
      const { name, email } = data.additionalUserInfo.profile;
      if (data.additionalUserInfo.isNewUser){
        database.ref('users/' + data.user.uid)
        .set({ name, email })
        .then(() => history.push('/chat'));
      }
      history.push('/chat');
    })
    .catch(error => {
      alert("Error occured: " + error.message);
    })
  }

  const handleSubmit = event => {
    auth.signInWithEmailAndPassword(inputs.email, inputs.password)
    .then(data => {
      console.log(data.user);
      console.log('Sign in successful!')
      history.push('/chat');
    })
    .catch(error => {
      alert("Error occured: " + error.message);
    })
  }

  return(
    <div>
     <Header/>
      <div className="formacontrooutside">
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
    </div>
      </div>
  )
}

export default Login;
