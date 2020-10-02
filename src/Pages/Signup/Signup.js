import React, {useState, Component} from 'react';
import "./Signup.css";
import firebase from "../../Services/firebase";
import {Card} from 'react-bootstrap';
import {
    Link
  } from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LoginString from '../Login/LoginString';
import Header from '../../Components/Header';
export default function Signup({history}){

    const [inputs,setInputs] = useState({
        email: '',
        password: '',
        name: '',
    });

    const handleInput = event => {
        setInputs({...inputs, [event.target.id]: event.target.value});
    }
    const handleSubmit = event => {
        firebase.auth().createUserWithEmailAndPassword(inputs.email, inputs.password)
            .then(data => {
                alert("Sign up successful!");
                const uid = data.user.uid;
                firebase.firestore().collection('users')
                .add({
                    name: inputs.name,
                    id: uid,
                    URL:'',
                    messages:[{notificationId:"", number:0}]
                }).then((docRef)=>{
                    history.push("/chat")
                })
                .catch((error)=>{
                    console.error("Error adding document",error);
                    console.log(error);
                })
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
                    <label className='signUpText'> Email: </label>
                        <input
                        id="email"
                        type="text"
                        value={inputs.email}
                        onChange={handleInput}
                        />
                </div>
                <div>
                    <label className='passwordField'> Password: </label>
                        <input
                        id="password"
                        type="password"
                        value={inputs.password}
                        onChange={handleInput}
                        />
                </div>
                <div>
                    <label className='signUpText'> Name: </label>
                        <input
                        id="name"
                        type="text"
                        value={inputs.name}
                        onChange={handleInput}
                        />
                </div>
                <div className="CenterAlignItems">
                    <button onClick={handleSubmit}>
                        <span>Sign Up</span>
                    </button>
                </div>
                <div>
                    <p style={{color:'grey'}}>Already have an account?</p>
                    <Link to="/login">
                        Log In
                    </Link>
                </div>
                </form> 
            </Card>
        </div>
    )
}
