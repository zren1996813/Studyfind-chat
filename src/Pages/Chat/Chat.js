import React, { useState } from 'react'
import styled from 'styled-components'

import Conversation from './Conversation'
import ChatList from './ChatList'

import { auth, firestore } from 'fire';

function Chat({ data }) {
  const [current, setCurrent] = useState((data && data.chats && data.chats[0]) ? data.chats[0].user : ' ');

  return (
    <Body>
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

const Main = styled.div`
  height: 100vh;
  border-top: 1px solid rgb(238, 238, 243);
  display: flex;
`

export default Chat
