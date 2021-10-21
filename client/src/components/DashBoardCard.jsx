import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function DashBoardCard () {

  

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Typography sx={{ minWidth: 100 }}>
          What do we want in here?
        </Typography>
        
      </Box>
    </React.Fragment>
  );
}

export default DashBoardCard;
