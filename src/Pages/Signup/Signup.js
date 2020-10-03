import React, {useState, Component} from 'react';
import { auth, database } from "../../firebase";
import styled from 'styled-components';

import { Link, useHistory } from 'react-router-dom';

import Header from '../../Components/Header';

function Signup(){
  const history = useHistory();

  const [inputs,setInputs] = useState({
    email: '',
    password: '',
    name: '',
  });

  const handleInput = event => {
    setInputs({...inputs, [event.target.id]: event.target.value});
  }

  const handleSubmit = event => {
    event.preventDefault()
    auth.createUserWithEmailAndPassword(inputs.email, inputs.password)
    .then(data => {
      const { name, email } = inputs;
      database.ref('users/' + data.user.uid)
      .set({ name, email })
      .then(() => history.push('/chat'));
    })
    .catch(error => {
      alert("Eroor occured: " + error.message);
    })
  }


  return(
    <Box>
      <Form>
        <Heading> Sign up </Heading>
        <Input
          id="name"
          type="text"
          placeholder="Name"
          value={inputs.name}
          onChange={handleInput}
        />
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
        <Button onClick={handleSubmit}> Sign Up </Button>
        <span>Already have an account?</span>
        <Link to="/login"> Log In </Link>
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

export default Signup;
