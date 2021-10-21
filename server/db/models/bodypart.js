const { Sequelize } = require('sequelize');

const Bodypart = {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING
  }
};

module.exports = Bodypart;
