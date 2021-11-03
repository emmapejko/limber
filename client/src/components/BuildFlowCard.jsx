import React from 'react';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import sunSal from '../images/sunSal.gif';

const GifImg = styled.img`
    display: block;
    width: 80%;
    height: 80%;
`;

const BuildFlowCard = () => {
  return (
    <div>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        m="auto"
      >
        <GifImg src={sunSal} />
      </Box>
    </div>
  );
};

export default BuildFlowCard;
