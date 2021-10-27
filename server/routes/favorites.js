const { Router } = require('express');

const favoritesRouter = Router();

const { Pose, AfterPose, PoseBodyPart, User, UserPose, Flow, BodyPart, PoseFlow, Following, Favorite } = require('../db/sequelize');

favoritesRouter.get('/', (req, res) => {
  const { id } = req.user.dataValues;

  Favorite.findAll({ where: { userId: id }})
    .then(rows => {
      Promise.all(rows.map(row => Flow.findByPk(row.flowId)))
        .then(flows => {
          res.status(200).send(flows);
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
})

module.exports = favoritesRouter;