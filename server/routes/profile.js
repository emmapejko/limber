const { Router } = require('express');

const Poses = Router();

const { UserPose, Pose, Flow, Following, User } = require('../db/sequelize');
/*
knows pose list: select all rows from table user_poses where userPoses.userId === req.user.id && userPoses.pose_rank === 1. -----> for each row returned, find row from Poses tables where Poses.id === returned row.poseId

10:50
working on pose list: select all rows from table userPoses where userPoses.userId === req.user.id && userPoses.pose_rank === 0. -----> for each row returned, find row from Poses tables where Poses.id === returned row.poseId
*/

// Get all poses
Poses.get('/', (req, res) => {
  UserPose.findAll().then((data) => {
    res.status(200).send(data);
  })
    .catch(() => {
      res.status(404).send('Error!');
    });
});

// UserPose table request checks if user_id matches pose_id
Poses.get('/userPosesWorkingOn', (req, res) => {
  const { id } = req.user.dataValues;

  UserPose.findAll({ where: {userId: id, pose_rank: 0 }})
    .then(async (response) =>  {
      Promise.all(response.map(row => Pose.findByPk(row.poseId)))
        .then(poses => {
          res.status(200).send(poses);
        })
        .catch(err => {
          console.warn(err);
        })
    }).catch((err) => {
      console.warn("userPose:", err);
    })
})

Poses.get('/userPosesKnown', (req, res) => {
  const { id } = req.user.dataValues;

  UserPose.findAll({ where: {userId: id, pose_rank: 1 }})
    .then(async (response) =>  {
      Promise.all(response.map(row => Pose.findByPk(row.poseId)))
        .then(poses => {
          res.status(200).send(poses);
        })
        .catch(err => {
          console.warn(err);
        })
    }).catch((err) => {
      console.warn("userPose:", err);
    });
})

//Get all Poses from Pose table
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
  // console.log('req.body:', req.body.data);
  // console.log('user:', req.user.dataValues.id);

  UserPose.create({ pose_rank: 1, userId: req.user.dataValues.id, poseId: req.body.data.id })
    .then((data) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.warn(err);
      res.status(404).send('Error!');
    });
});

// create poses that user is still working on
Poses.post('/userPosesDontKnow', (req, res) => {
  const { selectedOptions } = req.body;
  UserPose.create({ poseId: req.body.data.id, pose_rank: 0, userId: req.user.dataValues.id })
    .then((data) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.warn(err);
      res.status(404).send('Error!');
    });
});

// Get all the users' saved
Poses.get('/savedFlows', (req, res) => {
  const { id } = req.user.dataValues;

  Flow.findAll({ where: { userId: id }}).then((data) => {
    res.status(200).send(data);
  })
    .catch(() => {
      res.status(404).send('Error!');
    });
});

Poses.get('/sharedFlows', (req, res) => {
  const { id } = req.user.dataValues;

  Following.findAll({ where: { follower_id: id }})
    .then(rows => {
      Promise.all(rows.map(row => Flow.findAll({ where: { userId: row.followee_id, is_public: true }})))
        .then(flows => {
          res.status(200).send(flows.flat());
        })
        .catch(err => {
          console.warn(err);
          res.sendStatus(404);
        })
    })
    .catch(err => {
      console.warn(err);
      res.sendStatus(404);
    })
});

Poses.put('/changeTeacherStatus', (req, res) => {
  const { id } = req.user.dataValues;
  const { is_teacher } = req.body.data;

  User.update({ is_teacher }, {
    where: {
      id
    }
  })
  .then(() => {
    res.sendStatus(201);
  })
  .catch(err => {
    console.warn(err);
    res.sendStatus(404);
  })
})

Poses.delete('/userPosesWorkingOn/:id', (req, res) => { 
 
  UserPose.destroy({
    where: {
      pose_id: req.params.id, 
      user_id: req.user.dataValues.id
    }
  }) // --> {id: req.params.id}
    //.then(id => res.json({ mgs: 'Pose removed' })) 
    .then((id) => {
      res.sendStatus(200);
    })
    .catch(err => res.status(404).json({ error: 'No such pose' }));
});

// export the api calls
module.exports = {
  Poses,
};
