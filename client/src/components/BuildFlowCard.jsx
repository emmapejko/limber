import React from 'react';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import sunSal from '../images/sunSal.gif';

const GifImg = styled.img`
    display: block;
    width: 100%;
    height: 100%;
`;

const BuildFlowCard = () => {
  return (
    <div>
      <Box>
        <GifImg src={sunSal} />
      </Box>
    </div>
  );
};

export default BuildFlowCard;
