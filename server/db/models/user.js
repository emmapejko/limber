const { Sequelize } = require('sequelize');



const User = {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: Sequelize.STRING
  },
  full_name: {
    type: Sequelize.STRING
  },
  picture: {
    type: Sequelize.STRING
  },
  google_id: {
    type: Sequelize.STRING
  },
  is_teacher: {
    type: Sequelize.BOOLEAN,
    default: false,
  }
}

module.exports = User;