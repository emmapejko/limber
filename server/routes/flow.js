const { Router } = require('express');

const flowRouter = Router();

const { build } = require('../helpers/build');
const { Pose, AfterPose, PoseBodyPart, User, UserPose, Flow, BodyPart, PoseFlow } = require('../db/sequelize');

flowRouter.post('/', (req, res) => {
  //const { id } = req.user.dataValues;
  const { length, bodyParts } = req.body.data;

  build(length, bodyParts)
    .then(flow => {
      //console.log(flow);
      res.status(201).send(flow);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(404);
    });
});

flowRouter.post('/saveFlow', (req, res) => {
  const { id } = req.user.dataValues;
  const { length, flow, flowName } = req.body.data;

  Flow.create({ name: flowName, length, userId: id })
    .then(response => {
      const flowId = response.dataValues.id;
      Promise.all(flow.map((pose, i) => PoseFlow.create({ pose_index: i, poseId: pose.id, flowId })))
        .then(() => {
          res.sendStatus(201);
        })
        .catch((err) => {
          console.log(err);
        })
    })
    .catch((err) => {
      console.error(err);
    })
})


module.exports = flowRouter;
