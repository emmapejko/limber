import React from 'react';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import sunSal from '../images/sunSal.gif';

const GifImg = styled.img`
    display: flex;
    width: 80%;
    height: 80%;
    justify-content: center;
    align-items: center;
    margin: auto;
`;

const BuildFlowCard = () => {
  return (
    <div>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        m="15%"
      >
        <GifImg src={sunSal} />
      </Box>
    </div>
  );
};

export default BuildFlowCard;
