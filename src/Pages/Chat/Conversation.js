import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { firestore } from 'fire';
import * as firebase from 'firebase/app'

import Message from './Message';

const colors = {
  green: 'rgb(40, 162, 111)',
  blue: 'rgb(117, 150, 209)',
  red: 'rgb(227, 119, 129)',
  purple: 'rgb(108, 55, 214)',
  yellow: 'rgb(239, 131, 23)',
}

function Conversation({ data, current }) {
  const [theme, setTheme] = useState('red');
  const [input, setInput] = useState('');
  const [chat, setChat] = useState();

  useEffect(() => {
    firestore.collection("users").doc(data.email).collection("chats").doc(current).collection("messages").orderBy("time")
    .onSnapshot(async messageData => {

      const messages = []
      messageData.forEach(doc => messages.push(doc.data()));
      setChat({ ...data.chats[current], messages });

    });
  }, [])

  useEffect(() => {
    if(chat) {
      setTheme(chat.theme || 'purple');
      const messagesDiv = document.getElementById("messages");
      if(messagesDiv) messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }
  }, [chat])

  const handleSendMessage = () => {
    if(!input) return;

    const message = {
      text: input.trim(),
      time: firebase.firestore.Timestamp.fromDate(new Date()),
      user: data.name,
    }

    firestore.collection("users").doc(current).collection("chats").doc(data.email).update({
      unread: true,
      last: message,
      messages: []
    })

    firestore.collection("users").doc(data.email).collection("chats").doc(current).set({
      unread: true,
      last: message,
      messages: []
    })

    firestore.collection("users").doc(current).collection("chats").doc(data.email).collection("messages").add(message);
    firestore.collection("users").doc(data.email).collection("chats").doc(current).collection("messages").add(message);

    setInput('')
  }

  const colors = ['purple', 'blue', 'green', 'yellow', 'red']

  return current.trim() ? chat ? (
    <Convo>
      <Header>
        <Contact>
          <Flag src={require('./../../img/flags/us.svg')} alt="logo" />
          <Name>{ chat.name }</Name>
        </Contact>
        <Theme>
          { colors.map(color => <Color name={color} selected={color === theme} onClick={() => setTheme(color)} />) }
        </Theme>
      </Header>
      <Messages id="messages" theme={theme}>
        { chat.messages.map(message => <Message theme={theme} data={data} {...message} />) }
      </Messages>
      <Footer>
        <Type placeholder="Type your message here..." value={input} onChange={e => setInput(e.target.value)} />
        <Send theme={theme} className="fa fa-paper-plane" onClick={() => handleSendMessage()} />
      </Footer>
    </Convo>
  ) : <div>Loading...</div> : <Default><h1>Chat with anyone</h1> <Image src={require('img/analysis.svg')} /></Default>
}

const Default = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-left: 1px solid rgb(238, 238, 243);
`;

const Image = styled.img`
  width: 50%;
`;

const Convo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  grid-template-rows: 57px 1fr 81px;
  border-left: 1px solid rgb(238, 238, 243);
  width: 100%;
`

const Header = styled.div`
  padding: 15px 25px;
  background: rgb(253, 253, 253);
  border-bottom: 1px solid rgb(238, 238, 243);
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Contact = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

const Theme = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  grid-gap: 6px;
`

const Color = styled.div`
  ${props => {
    return props.selected
    ? `
      background: ${colors[props.name]};
      border: 4px solid ${colors[props.name]};
    `
    : `
      border: 4px solid ${colors[props.name]};
    `
  }}

  cursor: pointer;
  border-radius: 100px;
  height: 20px;
  width: 20px;
`

const Name = styled.div`
  font-size: 1.2rem;
  font-weight: 500;
`

const Flag = styled.img`
  height: 25px;
  margin-right: 15px;
`

const Messages = styled.div`
  height: 100%;
  padding: 0 10px;
  display: flex;
  flex-direction: column;
  grid-gap: 5px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }

  background: ${props => colors[props.theme]};

  background: white;
`

const Time = styled.span`
  text-transform: uppercase;
  font-size: 0.75rem;
  font-weight: 600;
  // position: absolute;
  float: right;
  right: 4px;
  bottom: 4px;
`

const Footer = styled.div`
  padding: 19.5px;
  background: rgb(253, 253, 253);
  border-top: 1px solid rgb(238, 238, 243);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
`

const Send = styled.button`
  border: none;
  font-size: 0.9rem;
  height: 30px;
  width: 30px;
  outline: none;
  border-radius: 100px;
  margin-left: 10px;
  display: flex;
  justify-content: center;
  align-items: center;

  &::before {
    margin-top: 2px;
    margin-right: 2px;
  }

  color: grey;
  background: transparent;

  &:hover {
    color: #377dff;
    background: rgb(55, 125, 255, 0.2);
  }

  position: absolute;
  right: 23px;
`

const Type = styled.input`
  width: 100%;
  font-size: 0.9rem;
  padding: 10px 15px;
  padding-right: 40px;
  background: rgb(245, 245, 245);
  border: none;
  border-radius: 100px;
  border: 1px solid rgb(238, 238, 243);
  outline: none;
  ::placeholder {
    color: grey;
  }

  &:focus {
    // border-color: #377dff;
  }

  &:focus + ${Send} {
    color: #377dff;
  }
`


export default Conversation;
