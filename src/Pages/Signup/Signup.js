import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import "./Signup.css";
import firebase from "../../Services/firebase";
import {Card} from 'react-bootstrap'

import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import LoginString from '../Login/LoginString';
import Header from '../../Components/Header';
export default class Signup extends Component{
    constructor(){
        super();
        this.state = {
            email:"",
            password:"",
            name:"",
            error:null
        }
        this.handlechange = this.handlechange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handlechange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    async handleSubmit(event) {
        const {name,password,email} = this.state;
        event.preventDefault();
        try{
            firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(async result =>{
                firebase.firestore().collection('users')
                .add({
                    name,
                    id:result.user.uid,
                    email,
                    password,
                    URL:'',
                    messages:[{notificationId:"", number:0}]
                }).then((docRef)=>{
                    localStorage.setItem(LoginString.ID,result.user.uid);
                    localStorage.setItem(LoginString.Name, name);
                    localStorage.setItem(LoginString.Email, email);
                    localStorage.setItem(LoginString.Password, password);
                    localStorage.setItem(LoginString.PhotoUrl,"");
                    localStorage.setItem(LoginString.UPLOAD_CHANGED, "state_changed");
                    localStorage.setItem(LoginString.Description, "");
                    localStorage.setItem(LoginString.FirebaseDocumentID, docRef.id);
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