import React, { Component } from 'react';

import firebase from "./Services/firebase";

import {
  Route,
  BrowserRouter as Router,
  Switch,
} from  'react-router-dom';
import './App.css'
import Home from './Pages/Home/Home';
import Chat from './Pages/Chat/Chat';
import Profile from './Pages/Profile/Profile';
import Signup from './Pages/Signup2/Signup';
import Login from './Pages/Login/Login';
import {toast, ToastContainer} from 'react-toastify';

class App extends Component{
  state = {
    userData: undefined
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        history.push("/chat");

        var docRef = db.collection("users").doc("");

        docRef.get().then(doc => {
            if (doc.exists) {
              const userData = doc.data();
              this.setState({ userData })
            } else {
              console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
      } else {
        history.push("/signup");
        this.setState({ userData: {} })
      }
    });
  }

  showToast = (type, message) =>{
    switch (type) {
      case 0:
        toast.warning(message)
        break;
      case 1:
        toast.success(message)
      default:
        break;
    }
  }

  constructor() {
    super();
  }

  render(){
    if(this.state.userData === undefined) {
      return (
        <div>Loading...</div>
      )
    } else {
      return (
        <Router>
          <ToastContainer
            autoClose = {2000}
            hideProgressBar = {true}
            position = {toast.POSITION.BOTTOM_CENTER}
          />
          <Switch>
            <Route
            exact
            path = "/"
            render = { props => <Home {...props}/>}/>

            <Route
            path = "/login"
            render = {props => <Login showToast={this.showToast}{...props}/>}
            />

            <Route
            path = "/Profile"
            render = {props => <Profile showToast={this.showToast}{...props}/>}
            />

            <Route
            path = "/signup"
            render = {props => <Signup showToast={this.showToast}{...props}/>}
            />

            <Route
            path = "/chat"
            render = {props => <Chat userData={userData} showToast={this.showToast}{...props}/>}
            />


          </Switch>
        </Router>
      )
    }
  }
}
export default App
