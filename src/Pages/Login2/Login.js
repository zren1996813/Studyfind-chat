import React, { useState } from 'react';
import firebase from "../../Services/firebase";

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

  const handleSubmit = event => {
    event.preventDefault();

    firebase.auth().signInWithEmailAndPassword(inputs.email, inputs.password)
    .then(data => {
      console.log(data.user);
      console.log('Sign in successful!')
      history.push('/chat');
    })
    .catch(error => {
      setError(error.message);
    })
  }

  return(
    <form>
      <div>
        <label> Email </label>
        <input
          id="email"
          type="text"
          value={inputs.email}
          onChange={handleInput}
        />
      </div>
      <div>
        <label> Password </label>
        <input
          id="password"
          type="password"
          value={inputs.password}
          onChange={handleInput}
        />
      </div>
      <button onClick={handleSubmit}>Submit!</button>
      {error && <div style={{ color: 'red' }}>{ error }</div>}
    </form>
  );
}

export default Login;
