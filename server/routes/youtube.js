const { Router } = require('express');

const youTubeRouter = Router();

const { searchYouTube } = require('../helpers/youtube');


youTubeRouter.put('/', (req, res) => {
  const { query } = req.body.data;

  searchYouTube(query)
    .then(({ data }) => {
      res.status(200).send(data);
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(404);
    })
})

module.exports = youTubeRouter;
