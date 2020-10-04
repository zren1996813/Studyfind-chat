import React, { useState } from 'react';
import styled from 'styled-components';

import { auth, firestore, googleProvider } from './../../firebase';

import Header from '../../Components/Header';

function Login() {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    name: ''
  });

  const [error, setError] = useState('');

  const handleInput = event => {
    setInputs({ ...inputs, [event.target.id]: event.target.value });
  }

  const signInWithGoogle = event => {
    event.preventDefault();
    auth.signInWithPopup(googleProvider)
    .then(data => {
      const { isNewUser, profile } = data.additionalUserInfo;
      const { name, email } = profile;
      if(isNewUser) {
        firestore.collection("users").doc(data.user.uid).set({ name, email })
        .then(function() {
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
      }
    })
    .catch(error => {
      alert("Error occured: " + error.message);
    })
  }

  return(
    <Box>
      <Button theme="google" onClick={signInWithGoogle}><i className="fa fa-google" /> Sign in with Google </Button>
    </Box>
  )
}

const Box = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  border: none;
  color: white;
  padding: 10px;
  font-size: 1rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  grid-gap: 6px;
  border-radius: 0.25rem;
  background: #DB4437;
`;

export default Login;
