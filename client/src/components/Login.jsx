import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';

import skelly from '../images/skelly.gif';

const BackgroungImg = styled.img`
    display: block;
    width: 100%;
    height: 100%;
`;

function Login(props) {
  
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center'}}>
        <Typography sx={{ minWidth: 100 }} style={{ flex: 1 }} style={props.style}>LIMBER</Typography>
        <Typography sx={{ minWidth: 100 }} sx={{ alignItems: 'center' }} style={props.style}><a href='/google'>Log In</a></Typography>
      </Box>
      <hr />
      <div>
        <BackgroungImg src={skelly} />
      </div>
    </>
  );
}
export default Login;
