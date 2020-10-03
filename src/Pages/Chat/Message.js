import React from 'react';
import styled from 'styled-components';

function Message({ theme, name, text, user }) {
  return (
    <Box>
      <User>{ user }</User>
      {text}
      <Time>{ time }</Time>
    </Box>
  )
}
