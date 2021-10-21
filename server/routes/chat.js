const { Router } = require('express');
const Users = Router();
const { User } = require('../db/sequelize');

Users.get('/full_name', (req, res) => {
  User.findOne({ where: { id: req.user.dataValues.id } })
  .then((user) => {
    console.log(user)
      res.status(200)
      res.send(user.dataValues)
  })
  .catch(err => res.status(err))
  });

  
  module.exports = {
    Users,
  };