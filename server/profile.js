const { Router } = require('express');
const Poses = Router();


const { UserPose, Pose } = require('./db/sequelize');
/*
knows pose list: select all rows from table user_poses where userPoses.userId === req.user.id && userPoses.pose_rank === 1. -----> for each row returned, find row from Poses tables where Poses.id === returned row.poseId

10:50
working on pose list: select all rows from table userPoses where userPoses.userId === req.user.id && userPoses.pose_rank === 0. -----> for each row returned, find row from Poses tables where Poses.id === returned row.poseId
*/


Poses.get('/', (req, res) => {
  //how to handle errors here?
  
  UserPose.findAll().then((data) => {
    
    res.status(200).send(data);
  })
    .catch(() => {
      res.status(404).send('Error!');
    }); 
});

Poses.get('/allPoses', (req, res) => {
 
  Pose.findAll().then((data) => {
    
    res.status(200).send(data);
  })
  .catch(() => {
    res.status(404).send('Error!');
  });
});


//post request for user_pose






//export the api calls
module.exports = {
  Poses,
};