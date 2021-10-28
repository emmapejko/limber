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
  is_public: {
    type: Sequelize.BOOLEAN,
    default: false,
  },
};

module.exports = Flow;
