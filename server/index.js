require('dotenv').config();
const path = require('path');
const cors = require('cors'); 
const http = require('http');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const {Server} = require('socket.io');
const auth = require('./auth');
const PORT = 3000;
const DIST_DIR = path.resolve(__dirname, '..', 'client/dist');
const app = express();

app.use(express.json());
app.use(express.static(DIST_DIR));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
}));


const server = http.createServer(app);

//cors origin tells socket.io it's ok to accept requests from localhost
//methods specify what type of requests socket.io can make
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ["GET", "POST"],
  }
}) 

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
})

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