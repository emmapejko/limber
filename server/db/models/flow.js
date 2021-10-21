const { Sequelize } = require('sequelize');

const Flow = {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
  },
  length: {
    type: Sequelize.INTEGER,
  },
  difficulty: {
    type: Sequelize.STRING,
  },
  // userId is added as FK with relationship
};

module.exports = Flow;
