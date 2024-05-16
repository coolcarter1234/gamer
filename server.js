const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const players = {};

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
  players[socket.id] = { x: 400, y: 300 };

  socket.on('move', (movement) => {
    const player = players[socket.id];
    if (movement.up) player.y -= 5;
    if (movement.down) player.y += 5;
    if (movement.left) player.x -= 5;
    if (movement.right) player.x += 5;
    io.emit('updatePlayers', players);
  });

  socket.on('disconnect', () => {
    delete players[socket.id];
    io.emit('updatePlayers', players);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
