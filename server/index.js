require('dotenv').config();
const path = require('path');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const auth = require('./auth');
const { Poses } = require('./profile');
const PORT = 3000;
const DIST_DIR = path.resolve(__dirname, '..', 'client/dist');

const app = express();

app.use(express.json());
app.use(express.static(DIST_DIR));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/profile', Poses);

// client authentication for oauth2.0 -->
app.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}));

app.get('/google/callback', passport.authenticate('google', {failureRedirect: '/'}),
  (req, res) => {
    //let userPath = req.user.dataValues.full_name.split(' ').join('');
    //res.redirect(`/${userPath}`);
    res.redirect('/loggedin');
  });

const authCheck = (req, res, next) => {
  if (!req.user) {
    res.redirect('/loggedin');
  } else {
    next();
  }
}

app.get('/loggedin', authCheck, (req, res) => {
  let userPath = req.user.dataValues.full_name.split(' ').join('');
  res.redirect(`/${userPath}`);
})

app.get('/logout', (req, res) => {
  //req.session = null; ?? maybe not needed
  req.logout();
  res.redirect('/');
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(DIST_DIR, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`server is listening at port ${PORT}`);
});