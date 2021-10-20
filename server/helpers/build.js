const { Pose, AfterPose, PoseBodyPart, User, UserPose, Flow, BodyPart, PoseFlow } = require('../db/sequelize');

const build = async (length, bodyparts, user_id) => {
  // create the flow
  //const flow = await Flow.create({ name: `${user_id}`, length: length });

  // bps: array of objects (bodyparts) { id: #, name: name }
  const bps = Promise.all(bodyparts.map((part) => BodyPart.findOne({ where: { name: part }})));

  // now get all poses that have an associate with bps[i].id
  //const possiblePosesRows = Promise.all((await bps).map(bp => PoseBodyPart.findAll({ where: { }})));

  //return Promise.all()
 return Pose.findOne({ where : { name: 'Flying Splits'}});
}


module.exports = {
  build,
}