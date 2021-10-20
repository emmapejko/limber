import React from "react";

function importAll(r) {
  let images = {};
  r.keys().map((item) => { images[item.replace('./', '')] = r(item); });
  return images;
}
const images = importAll(require.context('../images', false, /\.(png|jpe?g|svg)$/));


const PoseCard = ({ pose }) => {
  return (
    <div>
      <div>{pose.name}</div>
      <div>{pose.sanskrit}</div>
      <div>{pose.demo}</div>
      <img src={images[`${pose.name.split(' ').join('')}.jpeg`].default} />
    </div>
  )
}

export default PoseCard;