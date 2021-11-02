import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';
import DashTable from './DashTable.jsx'

import progress from '../images/progress.jpg';



const GifImg = styled.img`
    display: block;
    width: 100%;
    height: 100%;
`;
function DashBoardCard() {
  return (
    <div>
    <Box>
     {/* <DashTable /> */}
      <GifImg src={progress} />
    </Box>
  </div>
  );
}

export default DashBoardCard;
