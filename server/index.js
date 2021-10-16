require('dotenv').config();
const path = require('path');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const auth = require('./auth');
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


// client authentication for oauth2.0 --> 
app.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}));

app.get('/google/callback', passport.authenticate('google', {failureRedirect: '/login'}),
  (req, res) => {
    res.redirect('/home');
  });

  app.get('/logout', (req, res) => {
    //req.session = null; ?? maybe not needed
    req.logout();
    res.redirect('/login');
  })

app.get('*', (req, res) => {
  res.sendFile(path.resolve(DIST_DIR, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`server is listening at port ${PORT}`);
});