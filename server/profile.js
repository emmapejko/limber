const { Router } = require('express');

const Poses = Router();

const { UserPose, Pose } = require('./db/sequelize');
/*
knows pose list: select all rows from table user_poses where userPoses.userId === req.user.id && userPoses.pose_rank === 1. -----> for each row returned, find row from Poses tables where Poses.id === returned row.poseId

10:50
working on pose list: select all rows from table userPoses where userPoses.userId === req.user.id && userPoses.pose_rank === 0. -----> for each row returned, find row from Poses tables where Poses.id === returned row.poseId
*/

Poses.get('/', (req, res) => {
  

  UserPose.findAll().then((data) => {
    res.status(200).send(data);
  })
    .catch(() => {
      res.status(404).send('Error!');
    });
});

// finish this table request where user_id matches pose_id
Poses.get('/userPosesId', (req, res) => {
  
  //req.body.user_id
  UserPose.findAll({where: {id: req.body.user_id}}).then((data) => {
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

// post request for user_pose
Poses.post('/userPoses', (req, res) => {
  console.log('req.body:', req.body.data);
  console.log('user:', req.user.dataValues.id);

  UserPose.create({ pose_rank: 1, userId: req.user.dataValues.id, poseId: req.body.data.id })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.error(err);
    });
});

Poses.post('/userPosesDontKnow', (req, res) => {
  console.log(req.user.dataValues);
  const { selectedOptions } = req.body;
  UserPose.create({ poseId: req.body.data.id, pose_rank: 0, userId: req.user.dataValues.id })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.error(err);
    });
});

// export the api calls
module.exports = {
  Poses,
};
