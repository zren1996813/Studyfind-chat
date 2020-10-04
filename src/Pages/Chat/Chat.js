import React, { useState } from 'react'
import styled from 'styled-components'

import Conversation from './Conversation'
import ChatList from './ChatList'

import { auth, firestore } from './../../firebase';

function Chat({ data }) {
  const [current, setCurrent] = useState(data.chats[0] ? data.chats[0].id : ' ');

  // const list = [
  //   { id: 'fieuwhguiherghl', name: 'Andrew Garcia', time: '2:07pm', last: 'What\'s the status on the advisory board?', theme: 'purple', unread: true },
  //   { id: 'ghrewhguiwhelue', name: 'Jeremy Webb', time: '1:13pm', last: 'Good job on the app design!', theme: 'red', unread: false },
  //   { id: 'weihfuihewufiuh', name: 'Yohan Jhaveri', time: 'Mon', last: 'What feature are we developing next?', theme: 'blue', unread: false },
  //   { id: 'gehguerwhiehrgh', name: 'Vir Mittal', time: 'Mon', last: 'I need to email the Georgia Tech Capstone team', theme: 'yellow', unread: true },
  //   { id: 'iewfhiuhweuifhg', name: 'Zeil Ren', time: 'Sat', last: 'What is your progress on the courses so far?', theme: 'green', unread: false }
  // ]

  return (
    <Body>
      <Header>
        <Logo> Fireside </Logo>
      </Header>
      <Main>
        <ChatList data={data} current={current} setCurrent={setCurrent} />
        <Conversation current={current} data={data} />
      </Main>
    </Body>
  )
}

const Body = styled.div`

`

const Header = styled.header`
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Logo = styled.h1`
  margin: 0;
  font-size: 1.8rem;
`

const New = styled.button`

`

const Main = styled.div`
  height: calc(100vh - 74px);
  border-top: 1px solid rgb(238, 238, 243);
  display: flex;
`

export default Chat
