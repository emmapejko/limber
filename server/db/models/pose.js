const { Sequelize } = require('sequelize');

const Pose = {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING
  },
  sanskrit: {
    type: Sequelize.STRING
  },
  demo: {
    type: Sequelize.STRING
  },
  difficulty: {
    type: Sequelize.STRING
  }
};

module.exports = Pose;
