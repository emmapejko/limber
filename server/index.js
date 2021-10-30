require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const session = require('express-session');
const { Server } = require('socket.io');
const server = require('http').Server(app);
const io = require('socket.io')(server)
const passport = require('passport');
const auth = require('./auth');

const PORT = 3000;
const DIST_DIR = path.resolve(__dirname, '..', 'client/dist');

const { Users } = require('./routes/chat');
const { Poses } = require('./routes/profile');
const followersRouter = require('./routes/followers');
const teachersRouter = require('./routes/teachers');
const favoritesRouter = require('./routes/favorites');
const flowRouter = require('./routes/flow');
const imageRouter = require('./routes/images');
const youTubeRouter = require('./routes/youtube');

const { ExpressPeerServer } = require("peer");
const peerServer = ExpressPeerServer(server, {
  debug: true
})

io.on('connection', (socket) => {
  console.info(`User Connected: ${socket.id}`);

  socket.on('join-room', (roomId, userId) => {
    socket.join(roomId);
    console.info(`User with ID: ${userId} joined room: ${roomId}`);
    socket.broadcast.to(roomId).emit('user-connected', userId);
    socket.on('send_message', message => {
      io.to(roomId).emit('createMessage', message)
    })
  });

  socket.on('disconnect', () => {
    console.info('User Disconnected', socket.id);
  });
});

server.listen(PORT, () => {
  console.info('SERVER RUNNING');
});

app.use(express.json());
app.use(express.static(DIST_DIR));

app.use('/peerjs', peerServer);

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

// routes
app.use('/flow', flowRouter);
app.use('/profile', Poses);
app.use('/images', imageRouter);
app.use('/chat', Users);
app.use('/youtube', youTubeRouter);
app.use('/followers', followersRouter);
app.use('/teachers', teachersRouter);
app.use('/favorites', favoritesRouter);

// client authentication for oauth2.0 -->
app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/loggedin');
  });

const authCheck = (req, res, next) => {
  if (!req.user) {
    res.redirect('/loggedin');
  } else {
    next();
  }
};

app.get('/loggedin', authCheck, (req, res) => {
  const userPath = req.user.dataValues.full_name.split(' ').join('');
  res.redirect(`/${userPath}`);
});

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(DIST_DIR, 'index.html'));
});

module.exports = app;
