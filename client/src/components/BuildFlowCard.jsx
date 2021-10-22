import React from 'react';
import Box from '@mui/material/Box';
import sunSal from '../images/sunSal.gif';

//maybe center the image in the card.

const BuildFlowCard = () => {
  return (
    <div>
      <Box>
        <svg>
          <image 
            width="150" 
            height="150" 
            xlinkHref={sunSal}>  
          </image>
        </svg>
      </Box>
    </div>
  );
};

export default BuildFlowCard;
