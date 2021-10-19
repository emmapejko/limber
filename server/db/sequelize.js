require('dotenv').config();
const { Sequelize } = require('sequelize');

const { userModel, poseModel, flowModel, classModel, bodypartModel, poseFlowModel, userPoseModel, followingModel, afterPoseModel } = require('./models/index');
const db = new Sequelize('limber', process.env.POSTGRES_USERNAME, process.env.POSTGRES_PASSWORD, {
  host: 'localhost',
  dialect: 'postgres',
});

const User = db.define('user', userModel, { timestamps: false });
const Pose = db.define('pose', poseModel, { timestamps: false });
const Flow = db.define('flow', flowModel);
const Class = db.define('class', classModel);
const BodyPart = db.define('bodypart', bodypartModel, { timestamps: false });
const PoseFlow = db.define('poseFlow', poseFlowModel, { timestamps: false });
const UserPose = db.define('userPose', userPoseModel, { timestamps: false });
const Following = db.define('following', {}, { timestamps: false });
const AfterPose = db.define('afterPose', {}, { timestamps: false });
const PoseBodyPart = db.define('poseBodyPart', {}, { timestamps: false });

User.hasMany(Flow);
Flow.belongsTo(User);

User.belongsToMany(Pose, { through: UserPose});
Pose.belongsToMany(User, { through: UserPose});

Pose.belongsToMany(Flow, { through: PoseFlow});
Flow.belongsToMany(Pose, { through: PoseFlow});

Pose.belongsToMany(BodyPart, { through: PoseBodyPart});
BodyPart.belongsToMany(Pose, { through: PoseBodyPart});

Following.belongsTo(User, { foreignKey: 'followerId'});
Following.belongsTo(User, { foreignKey: 'followeeId'});

AfterPose.belongsTo(Pose, { foreignKey: 'poseId'});
AfterPose.belongsTo(Pose, {foreignKey: 'afterPoseId'});

User.hasMany(Class);
Class.belongsTo(User);


User.sync()
  .then(() => {
    // console.log('User connected to DB.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
Flow.sync()
  .then(() => {
    // console.log('Flow connected to DB.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

Pose.sync()
  .then(() => {
    // console.log('Pose connected to DB.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

UserPose.sync()
  .then(() => {
    // console.log('UserPose connected to DB.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
PoseFlow.sync()
  .then(() => {
    // console.log('PoseFlow connected to DB.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
BodyPart.sync()
  .then(() => {
    // console.log('BodyPart connected to DB.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
PoseBodyPart.sync()
  .then(() => {
    // console.log('PoseBodyPart connected to DB.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
Following.sync()
  .then(() => {
    // console.log('Following connected to DB.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
AfterPose.sync()
  .then(() => {
    // console.log('AfterPose connected to DB.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
Class.sync()
  .then(() => {
    // console.log('AfterPose connected to DB.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });


module.exports = {User, Flow, Pose, UserPose, PoseFlow, BodyPart, PoseBodyPart, Following, AfterPose, Class, db};

