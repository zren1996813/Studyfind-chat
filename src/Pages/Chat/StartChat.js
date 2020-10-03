import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

// import { database, auth } from "../../firebase";

// const colors = {
//   green: 'rgb(40, 162, 111)',
//   blue: 'rgb(117, 150, 209)',
//   red: 'rgb(227, 119, 129)',
//   purple: 'rgb(108, 55, 214)',
//   yellow: 'rgb(239, 131, 23)',
// }

function StartChat() {
  const [active, setActive] = useState(false);
  const [email, setEmail] = useState('');


  useEffect(() => {
    if(active) document.getElementById("new").focus();
  }, [active])

  const handleNew = email => {
    const uid1 = 'DigxM2I1dQbcL8yzfxGAK8y7quA2';
    const uid2 = 'siAX25BafRXTFbQiIKsdoWHk9gB3';

    // database.ref(`users/${uid1}/chats/${uid2}`).set({
    //   language: 'english',
    //   theme: 'blue',
    //   messages: [0]
    // })
    //
    // database.ref(`users/${uid2}/chats/${uid1}`).set({
    //   language: 'english',
    //   theme: 'blue',
    //   messages: [0]
    // })
  }

  return (
    <Box onClick={() => setActive(true)}>
      <Icon><i className="fa fa-plus" /></Icon>
      {
        active
        ? (
          <>
            <Input id="new" placeholder="Type email here..." value={email} onChange={e => setEmail(e.target.value)} />
            <Button onClick={handleNew}>Add</Button>
          </>
        )
        : (
          <>
            <Info>
              <Name>New Chat</Name>
              <Last>Find users by their email</Last>
            </Info>
          </>
        )
      }
    </Box>
  )
}

const Box = styled.div`
  cursor: pointer;
  height: 80px;
  background: white;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 20px;
  background: white;
  border-bottom: 1px solid rgb(238, 238, 243);
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none;

  ${props => props.current && `background: rgb(0, 0, 0, 0.03);`}
`

const Info = styled.div`
  padding: 10px;
  width: 100%;
`

const Last = styled.div`
  color: grey;
  font-size: 0.9rem;
  margin-top: 4px;
  overflow: hidden;
  width: 220px;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;

  font-weight: ${props => props.unread && '600'};
`

const Name = styled.div`
  font-size: 1rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`

const Unread = styled.span`
  color: #377dff;
  font-size: 0.5rem;
  margin: 0 5px;
`

const Date = styled.span`
  margin-left: auto;
  font-size: 0.75rem;
  color: darkgrey;
`

const Icon = styled.div`
  min-height: 45px;
  min-width: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  font-size: 1rem;
  color: rgb(0, 0, 0, 0.4);
  background: rgb(0, 0, 0, 0.1);
  border-radius: 100px;
`

const Input = styled.input`
  border: none;
  padding: 10px;
  font-size: 1rem;
  outline: none;

  ::placeholder {
    font-weight: 500;
  }
`;

const Button = styled.button`
  cursor: pointer;
  color: rgb(0, 0, 0, 0.5);
  background: rgb(0, 0, 0, 0.1);
  border: none;
  font-size: 0.9rem;
  font-weight: 500;
  padding: 5px 10px;
  border-radius: 5px;

`;

export default StartChat
