import React from "react";

//import DownwardFacingDog from '../images/DownwardFacingDog.jpeg';

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('../', '')] = r(item); });
  return images;
}

const images = importAll(require.context('../images', false, /\.(png|jpe?g|svg)$/));

const PoseCard = ({ pose }) => {
  return (
    <div>
      <div>{pose.name}</div>
      <div>{pose.sanskrit}</div>
      <div>{pose.demo}</div>
      <img src={images['DownwardFacingDog.jpeg']} />
    </div>
  )
}

export default PoseCard;