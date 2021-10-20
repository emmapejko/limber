// const express = require('express');
// const http = require('http');
// const {Server} = require('socket.io');
// const cors = require('cors'); 

// const app = require('./index'); //this is coming from the server index.js where app is being exported
// const PORT = 3000;
// // server.use(cors());


// const server = http.createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: 'http://localhost:3000',
//     method: ["GET", "POST"]
//   }
// }); 

// io.on("connection", (socket) => {
//   console.log(`User connected: ${socket.id}`);

//   socket.on("join_room", (data) => {
//     socket.join(data);
//     console.log(`User with ID: ${socket.id} joined room: ${database}`)
//   });

//   socket.on('disconnect', () => {
//     console.log(`User disconnected: ${socket.id}`);
//   });
// })

// server.listen(PORT, () => {
//   console.log(`SOCKET.IO server is listening on ${PORT}`);
// });
