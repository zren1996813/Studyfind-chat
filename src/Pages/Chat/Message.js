import React from 'react';
import styled from 'styled-components';

const colors = {
  green: 'rgb(40, 162, 111)',
  blue: 'rgb(117, 150, 209)',
  red: 'rgb(227, 119, 129)',
  purple: 'rgb(108, 55, 214)',
  yellow: 'rgb(239, 131, 23)',
}

function Message({ theme, time, text, user }) {
  return (
    <Box you={user === 'weihfuihewufiuh'}>
      <Text theme={theme} you={user === 'weihfuihewufiuh'}>{ text }</Text>
      <Time>{ time }</Time>
    </Box>
  )
}

const Box = styled.div`
  max-width: 80%;
  align-self: ${props => props.you ? 'flex-end' : 'flex-start'};
`;

const Text = styled.div`
  font-weight: 1rem;
  line-height: 1.5;
  font-size: 0.9rem;
  padding: 8px 10px;
  border-radius: 5px;

  color: ${props => colors[props.theme]};

  background: ${props => {
    switch(props.theme) {
      case 'green': return 'rgb(187, 248, 223)'
      case 'blue': return 'rgb(223, 235, 255)'
      case 'red': return 'rgb(255, 231, 237)'
      case 'purple': return 'rgb(236, 229, 251)'
      case 'yellow': return 'rgb(255, 233, 194)'
    }
  }};

  color: ${props => !props.you && 'rgb(120, 120, 120)'};
  background: ${props => !props.you && 'rgb(245, 245, 245)'};
`

const User = styled.div`

`;

const Time = styled.div`
  font-size: 0.7rem;
  margin-bottom: 10px;
  color: gray;
  font-weight: 500;
  text-align: right;
`;

export default Message
