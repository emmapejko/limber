import React, { useState, useEffect } from "react";
import axios from 'axios';


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
    <div>
      <div>{pose.name}</div>
      <div>{pose.sanskrit}</div>
      <div>{pose.demo}</div>
      <img src={img}/>
    </div>
  )
}

export default PoseCard;