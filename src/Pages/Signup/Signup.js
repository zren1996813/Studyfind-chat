import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import "./Signup.css";
import firebase from "../../Services/firebase";
import {Card} from 'react-bootstrap'

import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LoginString from '../Login/LoginString';
import Header from '../../Components/Header';
export default class Signup extends Component{

    state = {
            email:"",
            password:"",
            name:"",
            error:null
    }

    handlechange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    handleSubmit = async (event) => {
        const {name,password,email} = this.state;
        event.preventDefault();
        try{
            firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(async result =>{
                firebase.firestore().collection('users')
                .add({
                    name,
                    id:result.user.uid,
                    URL:'',
                    messages:[{notificationId:"", number:0}]
                }).then((docRef)=>{
                    this.setState({
                        name:'',
                        password:'',
                        url:'',
                    });
                    this.props.history.push("/chat")
                })
                .catch((error)=>{
                    console.error("Error adding document",error)
                })
            })
        }
        catch(error){
            document.getElementyByID('1').innerHTML = "Error in signing up please try again"
        }
    }
    render(){
        const Signinsee = {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: 'White',
            backgroundColor: '#1ebea5',
            width: '100%',
            boxShadow: '0 5px 5px #808888',
            height: '10rem',
            paddingTop: '48px',
            opacity: '0.5',
            borderBottom: '5px solid green',
        }

        return(
            
            <div>
                <Header/>
                <CssBaseline/>
                {/* <Card style = {Signinsee}>
                    <div>
                        <Typography component = "h1" variant = "h5">
                            Sign up
                            To
                        </Typography>
                    </div>
                    <div>

                    </div>
                </Card> */}
                <Card className='formacontrooutside'>
                    <form className = "customform" noValidate onSubmit={this.handleSubmit}>
                        
                        <TextField
                        variant='outlined'
                        margin='normal'
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={this.handlechange}
                        value={this.state.email}
                        />  
                    
                    <TextField
                        variant='outlined'
                        margin='normal'
                        required
                        fullWidth
                        id="password"
                        label="Password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        autoFocus
                        onChange={this.handlechange}
                        value={this.state.password}
                    />
                    <TextField
                        variant='outlined'
                        margin='normal'
                        required
                        fullWidth
                        id="name"
                        label="Your Name"
                        name="name"
                        autoComplete="name"
                        autoFocus
                        onChange={this.handlechange}
                        value={this.state.name}
                    />
                    <div className="CenterAlignItems">
                        <button class="button1" type="submit">
                            <span>Sign Up</span>
                        </button>
                    </div>
                    <div>
                        <p style={{color:'grey'}}>Already have an account?</p>
                        <Link to="/login">
                            Log In
                        </Link>
                    </div>
                    <div className="error">
                        <p id='1' style={{color:'red'}}>

                        </p>
                    </div>
                    </form> 
                </Card>
            </div>
        )
    }
}