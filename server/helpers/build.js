const { Pose, AfterPose, PoseBodyPart, User, UserPose, Flow, BodyPart, PoseFlow } = require('../db/sequelize');

const build = async (length, bodyparts, user_id) => {
  // create the flow
  //const flow = await Flow.create({ name: `${user_id}`, length: length });

  // bps: array of objects (bodyparts) { id: #, name: name }
  const bps = Promise.all(bodyparts.map((part) => BodyPart.findOne({ where: { name: part }})));

  // now get all poses that have an associate with bps[i].id
  const possiblePosesRows = Promise.all((await bps).map(bp => PoseBodyPart.findAll({ where: { bodypart_id: bp.id}})));

  // now get all poses from those pose ids, array of arrays of objects
  const bodyPartPoses = Promise.all((await possiblePosesRows).map(p =>  Promise.all(p.map(item => Pose.findByPk(item.poseId)))));

  const finalArr = [];
  finalArr.push(await Pose.findOne({ where: { name: 'Mountain'}}));

  while(finalArr.length <= length) {
    let nextList = await findNextPoseIds(finalArr[finalArr.length - 1]);
    finalArr.push(await Pose.findByPk(random(nextList).after_pose_id));
  }



  return finalArr;
  //return Promise.all()
 //return Pose.findOne({ where : { name: 'Flying Splits'}});
}

const findNextPoseIds = async (curr) => {
  return await AfterPose.findAll({ where: { pose_id: curr.id }})
};

const random = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

module.exports = {
  build,
}