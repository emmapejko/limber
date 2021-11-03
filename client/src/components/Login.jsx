import React from 'react';
import {
  Box,
  Typography,
  Chip
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

import Chakras from './Chakras.jsx';

function Login({ style }) {
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center'}}>
        <Typography sx={{ minWidth: 100 }} style={{ flex: 1, style }}>LIMBER</Typography>
        <Chip icon={<GoogleIcon />} label="Log In" variant="outlined" component="a" href="/google" clickable />
      </Box>
      <hr />
      <Chakras />
    </>
  );
}
export default Login;
