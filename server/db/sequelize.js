require('dotenv').config();
const { Sequelize } = require('sequelize');

const { userModel, poseModel, flowModel, classModel, bodypartModel, poseFlowModel, userPoseModel, followingModel, afterPoseModel } = require('./models/index');
const db = new Sequelize('limber', process.env.POSTGRES_USERNAME, process.env.POSTGRES_PASSWORD, {
  host: 'localhost',
  dialect: 'postgres',
});

const User = db.define('user', userModel, { timestamps: false, underscored: true });
const Pose = db.define('pose', poseModel, { timestamps: false, underscored: true });
const Flow = db.define('flow', flowModel, { underscored: true });
const Class = db.define('class', classModel, { underscored: true });
const BodyPart = db.define('bodypart', bodypartModel, { timestamps: false, underscored: true });
const PoseFlow = db.define('pose_flow', poseFlowModel, { timestamps: false, underscored: true });
const UserPose = db.define('user_pose', userPoseModel, { timestamps: false, underscored: true });
const Following = db.define('following', {}, { timestamps: false, underscored: true });
const AfterPose = db.define('after_pose', {}, { timestamps: false, underscored: true });
const PoseBodyPart = db.define('pose_bodypart', {}, { timestamps: false, underscored: true });

User.hasMany(Flow);
Flow.belongsTo(User);

User.belongsToMany(Pose, { through: UserPose});
Pose.belongsToMany(User, { through: UserPose});

Pose.belongsToMany(Flow, { through: PoseFlow});
Flow.belongsToMany(Pose, { through: PoseFlow});

Pose.belongsToMany(BodyPart, { through: PoseBodyPart});
BodyPart.belongsToMany(Pose, { through: PoseBodyPart});

Following.belongsTo(User, { foreignKey: 'follower_id'});
Following.belongsTo(User, { foreignKey: 'followee_id'});

AfterPose.belongsTo(Pose, { foreignKey: 'pose_id'});
AfterPose.belongsTo(Pose, {foreignKey: 'after_pose_id'});

User.hasMany(Class);
Class.belongsTo(User);


User.sync()
  .then(() => {
    console.log('user connected to DB.');
    Flow.sync()
      .then(() => {
        console.log('flow connected to DB.');
        Pose.sync()
          .then(() => {
            console.log('pose connected to DB.');
            BodyPart.sync()
              .then(() => {
                console.log('body_part connected to DB.');
                UserPose.sync()
                  .then(() => {
                    console.log('user_pose connected to DB.');
                    PoseFlow.sync()
                      .then(() => {
                        console.log('pose_flow connected to DB.');
                        PoseBodyPart.sync()
                          .then(() => {
                            console.log('pose_body_part connected to DB.');
                            Following.sync()
                              .then(() => {
                                console.log('following connected to DB.');
                                AfterPose.sync()
                                  .then(() => {
                                    console.log('after_pose connected to DB.');
                                    Class.sync()
                                      .then(() => {
                                        console.log('class connected to DB.');
                                      })
                                  })
                              })
                          })
                      })
                  })
              })
          })
      })
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });


module.exports = {User, Flow, Pose, UserPose, PoseFlow, BodyPart, PoseBodyPart, Following, AfterPose, Class, db};

