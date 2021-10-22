const {
  Pose, AfterPose, PoseBodyPart, User, UserPose, Flow, BodyPart, PoseFlow,
} = require('../db/sequelize');

const build = async (length, bodyparts) => {
  // bps: array of objects (bodyparts) { id: #, name: name }
  const bps = Promise.all(bodyparts.map((part) => BodyPart.findOne({ where: { name: part } })));
  // now get all poses that have an associate with bps[i].id
  const possiblePosesRows = Promise.all((await bps).map((bp) => PoseBodyPart.findAll({ where: { bodypart_id: bp.id } })));
  // now get all poses from those pose ids, array of arrays of objects
  const bodyPartPoses = (await Promise.all((await possiblePosesRows).map((p) => Promise.all(p.map((item) => Pose.findByPk(item.poseId)))))).flat();
  //get just the names
  const bodyPartPosesNames = (await bodyPartPoses).map(p => p.name);

  const finalArr = [];
  //start with one of a few poses
  finalArr.push(await Pose.findOne({ where: { name: random(start) } }));

  while (finalArr.length <= length) {
    const nextList = Promise.all((await findNextPoseIds(finalArr[finalArr.length - 1])).map(obj => getPoseFromNextListIds(obj.after_pose_id)));
    const nextAndBody = (await nextList).filter(pose => bodyPartPosesNames.includes(pose.name));
      if ((await nextAndBody).length) {
        const rando = random(await nextAndBody);
        if (finalArr[finalArr.length - 1].name !== rando.name) {
          finalArr.push(await Pose.findByPk(rando.id));
        } else {
          continue;
        }
      }
    else if ((await nextList).length) {
      const rando = await (random(await nextList));
      console.log('RANDO', rando);
      if (finalArr[finalArr.length - 1].name !== rando.name) {
        console.log('rando 2');
        finalArr.push(await Pose.findByPk(rando.id));
      } else {
        continue;
      }
    } else {
      const rando = random(start);
      if (finalArr[finalArr.length - 1].name !== rando) {
        finalArr.push(await Pose.findOne({ where: { name: rando } }));
      } else {
        const another = random(start.filter(el => el !== rando));
        finalArr.push(await Pose.findOne({ where: { name: another } }));
      }
    }
  }

  finalArr.push(await Pose.findOne({ where: { name: 'Corpse' } }));

  return finalArr;
};

const findNextPoseIds = (curr) => AfterPose.findAll({ where: { pose_id: curr.id } });

const getPoseFromNextListIds = (id) => Pose.findByPk(id);

const random = (arr) => arr[Math.floor(Math.random() * arr.length)];

const start = ['Mountain', 'Childs Pose', 'Downward Facing Dog'];

module.exports = {
  build,
};
