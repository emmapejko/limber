import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import GoogleIcon from '@mui/icons-material/Google';

function Login() {
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center'}}>
        <Typography sx={{ minWidth: 100 }} style={{ flex: 1 }}>LIMBER</Typography>
        <Typography sx={{ minWidth: 100 }} sx={{ alignItems: 'center' }}><a href='/google'>Log In</a></Typography>
      </Box>
      <hr />
    </>
  );
}
export default Login;
