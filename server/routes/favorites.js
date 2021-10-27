const { Router } = require('express');

const favoritesRouter = Router();

const { Pose, AfterPose, PoseBodyPart, User, UserPose, Flow, BodyPart, PoseFlow, Following, Favorite } = require('../db/sequelize');



module.exports = favoritesRouter;