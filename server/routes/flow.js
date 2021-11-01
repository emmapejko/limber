const { Router } = require('express');

const flowRouter = Router();

const { build } = require('../helpers/build');
const { Pose, AfterPose, PoseBodyPart, User, UserPose, Flow, BodyPart, PoseFlow, Favorite } = require('../db/sequelize');

flowRouter.post('/', (req, res) => {
  //const { id } = req.user.dataValues;
  const { length, bodyParts } = req.body.data;

  build(length, bodyParts)
    .then(flow => {
      //console.log(flow);
      res.status(201).send(flow);
    })
    .catch((err) => {
      console.warn(err);
      res.sendStatus(404);
    });
});

flowRouter.post('/saveFlow', (req, res) => {
  const { id } = req.user.dataValues;
  const { length, flow, flowName, is_public, difficulty } = req.body.data;

  Flow.create({ name: flowName, length, userId: id, is_public, difficulty })
    .then(response => {
      const flowId = response.dataValues.id;
      Promise.all(flow.map((pose, i) => PoseFlow.create({ pose_index: i, poseId: pose.id, flowId })))
        .then(() => {
          res.sendStatus(201);
        })
        .catch((err) => {
          console.warn(err);
        });
    })
    .catch((err) => {
      console.warn(err);
    });
});

flowRouter.get('/getSavedFlow/:id', (req, res) => {
 const { id } = req.params;

 PoseFlow.findAll({ where: { flowId: id }})
  .then(async response => {
      response.sort((a,b) => a.pose_index - b.pose_index);
      const poses = await Promise.all(response.map(el => Pose.findByPk(el.poseId)));
      res.status(200).send(poses);
  })
  .catch(err => {
    console.warn(err);
    res.sendStatus(404);
  })
})

flowRouter.delete('/:name', (req, res) => {
  const { name } = req.params;

  Flow.findOne({ where: { name }})
    .then(flow => {
      PoseFlow.destroy({ where: { flowId: flow.id }})
        .then(() => {
          Favorite.destroy({ where: { flowId: flow.id }})
            .then(() => {
              Flow.destroy({ where: { id: flow.id }})
                .then(() => {
                  res.sendStatus(200);
                })
            })
        })
    })
    .catch(err => {
      console.warn(err);
      res.sendStatus(404);
    })
})

flowRouter.get('/user/:id', (req, res) => {
  const { id } = req.params;

  User.findByPk(id)
    .then(user => {
      res.status(200).send(user);
    })
    .catch(err => {
      console.warn(err);
      res.sendStatus(404);
    })
})


module.exports = flowRouter;
