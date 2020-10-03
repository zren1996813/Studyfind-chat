import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// import { database, auth } from "../../firebase";

import Message from './Message';

const colors = {
  green: 'rgb(40, 162, 111)',
  blue: 'rgb(117, 150, 209)',
  red: 'rgb(227, 119, 129)',
  purple: 'rgb(108, 55, 214)',
  yellow: 'rgb(239, 131, 23)',
}

function Conversation({ data, selected }) {
  const [theme, setTheme] = useState('purple');
  const [message, setMessage] = useState('');
  const messages = Object.values(data.chats['DigxM2I1dQbcL8yzfxGAK8y7quA2'].messages);

  useEffect(() => {
    setTheme(selected.theme);
  }, [selected])

  useEffect(() => {
    const objDiv = document.getElementById("messages");
    objDiv.scrollTop = objDiv.scrollHeight;
  }, [])

  const handleSendMessage = () => {
    const uid1 = 'DigxM2I1dQbcL8yzfxGAK8y7quA2';
    const uid2 = 'siAX25BafRXTFbQiIKsdoWHk9gB3';

    // database.ref(`users/${uid1}/chats/${uid2}/messages`).push({
    //   user: uid2,
    //   text: message,
    //   time: new Date()
    // })
    //
    // database.ref(`users/${uid2}/chats/${uid1}/messages`).push({
    //   user: uid2,
    //   text: message,
    //   time: new Date()
    // })
  }

  const colors = ['purple', 'blue', 'green', 'yellow', 'red']

  return (
    <Convo>
      <Header>
        <Contact>
          <Flag src={require('./../../img/flags/us.svg')} alt="logo" />
          <Name>{ selected.name }</Name>
        </Contact>
        <Theme>
          { colors.map(color => <Color name={color} selected={color === theme} onClick={() => setTheme(color)} />) }
        </Theme>
      </Header>
      <Messages id="messages" theme={theme}>
        { messages.map(message => <Message theme={theme} {...message} />) }
      </Messages>
      <Footer>
        <Type placeholder="Type your message here..." value={message} onChange={e => setMessage(e.target.value)} />
        <Send theme={theme} className="fa fa-paper-plane" onClick={() => handleSendMessage()} />
      </Footer>
    </Convo>
  )
}

const Convo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  grid-template-rows: 57px 1fr 81px;
  border-left: 1px solid rgb(238, 238, 243);
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
  height: calc(100vh - 80px - 57px - 81px);
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
  height: 41px;
  width: 41px;
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
  }

  position: absolute;
  right: 25px;
`

const Type = styled.input`
  width: 100%;
  font-size: 0.9rem;
  padding: 10px 15px;
  padding-right: 25px;
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
