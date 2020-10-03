import React, { useState } from 'react';
import styled from 'styled-components';

import { database, auth, facebookProvider, googleProvider } from "../../firebase";

import { Link, useHistory } from 'react-router-dom';

import Header from '../../Components/Header';

function Login() {
  const history = useHistory();

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
    <Box>
      <Form>
        <Heading> Log in </Heading>
        <Input
          id="email"
          type="text"
          placeholder="Email"
          value={inputs.email}
          onChange={handleInput}
        />
        <Input
          id="password"
          type="password"
          placeholder="Password"
          value={inputs.password}
          onChange={handleInput}
        />
        <Button theme="normal" onClick={handleSubmit}> Create Account </Button>
        <Button theme="google" onClick={signInWithGoogle}> Sign in with Google</Button>
        <Button theme="facebook" onClick={signInWithFacebook}>Sign in with Facebook</Button>
      </Form>
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

const Form = styled.div`
  width: 400px;
  display: grid;
  grid-gap: 10px;
  padding: 40px;
  border: 1px solid rgb(0, 0, 0, 0.1);
  border-radius: 0.25rem;
  background: rgb(0, 0, 0, 0.02);
`;

const Heading = styled.h1`
  margin-top: 0;
  margin-bottom: 5px;
`;

const Input = styled.input`
  font-size: 1rem;
  padding: 10px 15px;
  border: 1px solid rgb(0, 0, 0, 0.2);
  border-radius: 0.25rem;
`;

const Button = styled.button`
  // border: none;
  // color: grey;
  padding: 10px;
  font-size: 1rem;
  border-radius: 0.25rem;
  // background: white;
`;

export default Login;
