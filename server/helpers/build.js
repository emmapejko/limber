const { Pose, AfterPose, PoseBodyPart, User, UserPose, Flow, BodyPart, PoseFlow } = require('../db/sequelize');

const build = (length, bodyparts, user_id) => {
  return Pose.findOne({ name: 'Downward Facing Dog'});
}


module.exports = {
  build,
}