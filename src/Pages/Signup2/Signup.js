import React, { useState } from 'react';
import firebase from "../../Services/firebase";

function Signup({ history }) {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    name: ''
  });

  const handleInput = event => {
    setInputs({ ...inputs, [event.target.id]: event.target.value });
  }

  const handleSubmit = event => {
    event.preventDefault();

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
          history.push("/chat");
      })
      .catch((error)=>{
        alert("Error adding document", error);
        console.log(error);
      })

    })
    .catch(error => {
      alert("Error occurred: " + error.message);
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
      <div>
        <label> Name </label>
        <input
          id="name"
          type="text"
          value={inputs.name}
          onChange={handleInput}
        />
      </div>
      <button onClick={handleSubmit}>Submit!</button>
    </form>
  );
}

export default Signup;
