const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
// importing Server fro socket.io
const { Server } = require("socket.io");
const io = new Server(server);

// creating a new websocket connection
io.on('connection', (socket) => {
  console.log('a user connected');

  // if it disconnecting
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  // if a "message" events occurs
  socket.on("message", msg => {
    console.log("a user sent:" + msg);

    // send a "new message" event for all connected clients
    io.emit("new message", msg);
  })
});

server.listen(8081, () => {
  console.log('listening on *:8081');
});