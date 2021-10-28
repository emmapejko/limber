import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
    <div>
      <img src={img} style={{maxHeight: '80px', maxWidth: '80px'}}/>
    </div>
  )

}

export default PoseItem;
