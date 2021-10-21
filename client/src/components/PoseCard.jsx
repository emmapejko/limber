import React, { useState, useEffect } from "react";
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

const PoseCard = ({ pose }) => {
  const [img, setImg] = useState('');

  const getPoseImage = () => {
    axios.get(`/images/${pose.name.split(' ').join('')}`)
      .then(({ data }) => {
        //console.log(data);
        setImg(data);
      })
  }

  useEffect(() => {
    getPoseImage();
  }, []);

  return (
    <Grid item xs={4}>
      <Box>
        <img src={img}
          height='100px'
          // objectFit='cover'
          alt={pose.name}
        />
        <div>{pose.name}</div>
        <div>{pose.sanskrit}</div>
      </Box>
    </Grid>
  )
}

export default PoseCard;