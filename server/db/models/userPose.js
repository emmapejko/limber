const { Sequelize } = require('sequelize');

const userPose = {
  pose_rank: {
    type: Sequelize.INTEGER
  }
  // poseId & userId is added to this model through the belongsToMany relationship
};

module.exports = userPose;
