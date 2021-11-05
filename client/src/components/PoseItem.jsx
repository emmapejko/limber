import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';

const PoseItem = ({ pose }, props) => {
  const [img, setImg] = useState('');

  const getPoseImage = () => {
    axios.get(`/images/${pose.name.split(' ').join('')}`)
      .then(({ data }) => {
        setImg(data);
      })
      .catch((err) => {
        console.warn('getPoseImage:', err);
      });
  };

  useEffect(() => {
    if (pose.name) {
      getPoseImage();
    }
  })

  return (
    <div style={{ display: 'flex', alignItems:"center", justifyContent:"center", height:"100%"}} >
      {
        img.length ?
        <img src={img} style={{maxHeight: '80px', maxWidth: '80px' }}/>
        : <CircularProgress />
      }
    </div>
  )

}

export default PoseItem;
