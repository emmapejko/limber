import React from 'react';
import Box from '@mui/material/Box';
import styled from 'styled-components';

import progress from '../images/progress.jpg';



const GifImg = styled.img`
    display: flex;
    width: 80%;
    height: 80%;
    justify-content: center;
    align-items: center;
    margin: auto;
`;

const DashBoardCard = () => {
  return (
    <div>
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      m="10%"
    >
      <GifImg src={progress} />
    </Box>
  </div>
  );
}

export default DashBoardCard;
