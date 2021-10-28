const { Router } = require('express');
const Users = Router();
const { User } = require('../db/sequelize');

Users.get('/full_name', (req, res) => {
  User.findOne({ where: { id: req.user.dataValues.id } })
    .then((user) => {
      res.status(200).send(user.dataValues)
    })
    .catch((err) => res.sendStatus(404))
});

module.exports = {
  Users,
};
