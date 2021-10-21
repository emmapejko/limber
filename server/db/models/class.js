const { Sequelize } = require('sequelize');
//const User = require('./user');

const Class = {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING
  },
  // user_id: {
  //   type: Sequelize.INTEGER,
  //   references: {
  //     model: User,
  //     key: 'id'
  //   }
  // }
};

module.exports = Class;
