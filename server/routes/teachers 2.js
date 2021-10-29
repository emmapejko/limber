const { Router } = require('express');

const teachersRouter = Router();

const { Pose, AfterPose, PoseBodyPart, User, UserPose, Flow, BodyPart, PoseFlow, Following } = require('../db/sequelize');

teachersRouter.get('/', (req, res) => {
  User.findAll({ where: { is_teacher: true }})
    .then(users => {
      res.status(200).send(users);
    })
    .catch(err => {
      console.warn(err);
      res.sendStatus(404);
    })
});

teachersRouter.get('/:id', (req, res) => {
  const { id } = req.params;

  Flow.findAll({ where: { userId: id, is_public: true }})
    .then(flows => {
      res.status(200).send(flows);
    })
    .catch(err => {
      console.warn(err);
      res.sendStatus(404);
    })
})


module.exports = teachersRouter;