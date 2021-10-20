const { Router } = require('express');
const Poses = Router();


const { UserPose } = require('./db/sequelize');



Poses.get('/profile', (req, res) => {
  //how to handle errors here?
  UserPose.findOnethen(({ data }) => {
    console.log(data);
    res.status(200).send(data);
  })
    .catch(() => {
      res.status(404).send('Error!');
    });
  

  
});









//export the api calls
module.exports = {
  Poses,
};