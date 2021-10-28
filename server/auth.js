const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { User } = require('./db/sequelize.js');
// add schema model(e.g. Users) and connect to DB to authenticate
require('dotenv').config();

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findOne({
    where: {
      id,
    },
  }).then((user) => {
    done(null, user);
  }).catch((err) => {
    console.warn('Error deserial:', err);
  });
});

passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: '/google/callback',
}, (accessToken, refreshToken, profile, done) => {
  const {
    sub, name, picture, email,
  } = profile._json;

  User.findOne({
    where: {
      email,
    },
  }).then((user) => {
    if (user) {
      return done(null, user);
    }
    User.create({
      full_name: name,
      email,
      picture,
      google_id: sub,
      is_teacher: false,

    })
      .then((newUser) => done(null, newUser))
      .catch((err) => console.warn(err));
  }).catch((err) => console.warn('finderr', err));
}));
