import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import styled from 'styled-components';

const GifImg = styled.img`
    display: flex;
    width: 80%;
    height: 80%;
    justify-content: center;
    align-items: center;
    margin: auto;
`;

const DashBoardCard = () => {
  const [img, setImg] = useState('');

  useEffect(() => {
    axios.get('/images/otherImages/progress.jpg')
      .then(({ data }) => {
        setImg(data);
      })
      .catch(err => {
        console.warn('error getting image: ', err);
      })
  })

  return (
    <div>
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      m="10%"
    >
      {
        img.length ?
        <GifImg src={img} />
        : <CircularProgress />
      }
    </Box>
  </div>
  );
}

export default DashBoardCard;
