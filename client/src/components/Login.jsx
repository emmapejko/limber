import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';

import skelly from '../images/skelly.gif';
import Chakras from './Chakras.jsx';

const BackgroungImg = styled.img`
    display: block;
    width: 100%;
    height: 100%;
`;

function Login({ style }) {
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center'}}>
        <Typography sx={{ minWidth: 100 }} style={{ flex: 1, style }}>LIMBER</Typography>
        <Typography sx={{ minWidth: 100 }} sx={{ alignItems: 'center' }} style={style}><a href='/google' style={{textDecoration: 'none', color:"inherit"}}>Log In</a></Typography>
      </Box>
      <hr />
      <Chakras />
    </>
  );
}
export default Login;
