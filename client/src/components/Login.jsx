import React from 'react';
import {
  Box,
  Chip
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

import Chakras from './Chakras.jsx';
import Logo from './Logo.jsx';

const Login = ({ style }) => {
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center'}}>
        <div style={{ flex: 1 }}>
          <Logo />
        </div>
        <Chip icon={<GoogleIcon />} label="Log In" variant="outlined" component="a" href="/google" clickable />
      </Box>
      <hr />
      <Box
        alignItems="center"
        justifyContent="center"
        m="auto"
      >
        <Chakras />
      </Box>
    </>
  );
}

export default Login;
