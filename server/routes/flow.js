const { Router } = require('express');
const flowRouter = Router();

const { build } = require('../helpers/build');


flowRouter.post('/', (req, res) => {
  const { id } = req.user.dataValues;
  const { length, bodyParts } = req.body.data;

  build(length, bodyParts, id)
    .then(flow => {
      res.status(200).send(flow);
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(404);
    })
});


module.exports = flowRouter;