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
});

favoritesRouter.post('/', (req, res) => {
  const { id } = req.user.dataValues;
  const { name } = req.body.data;

  Flow.findAll({ where: { name }})
    .then(flow => {
      Favorite.create({ userId: id, flowId: flow[0].dataValues.id })
        .then(() => {
          res.sendStatus(201)
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

favoritesRouter.delete('/:name', (req, res) => {
  const { id } = req.user.dataValues;
  const { name } = req.params;

  Flow.findAll({ where: { name }})
    .then(flow => {
      Favorite.destroy({
        where: {
          userId: id,
          flowId: flow[0].dataValues.id
        }})
        .then(() => {
          res.sendStatus(200);
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