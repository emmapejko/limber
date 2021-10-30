import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';


import pieChart from '../images/pieChart.png';



const GifImg = styled.img`
    display: block;
    width: 100%;
    height: 100%;
`;
function DashBoardCard() {
  return (
    <div>
    <Box>
     
      <GifImg src={pieChart} />
    </Box>
  </div>
  );
}

export default DashBoardCard;
