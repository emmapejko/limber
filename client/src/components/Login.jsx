import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function Login() {

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Typography sx={{ minWidth: 100 }}>LIMBER</Typography>
        <Typography sx={{ minWidth: 100 }}><a className="oauth-container btn darken-4 white black-text" href='/google'>Log In</a></Typography>
      </Box>
    </React.Fragment>
  );

}
export default Login;
