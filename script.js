const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const socket = io();

let players = {};

socket.on('updatePlayers', (serverPlayers) => {
  players = serverPlayers;
});

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (const id in players) {
    const player = players[id];
    ctx.fillStyle = 'white';
    ctx.fillRect(player.x, player.y, 10, 10);
  }
}

function gameLoop() {
  draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();

document.addEventListener('keydown', (event) => {
  const movement = { up: false, down: false, left: false, right: false };
  if (event.key === 'w') movement.up = true;
  if (event.key === 's') movement.down = true;
  if (event.key === 'a') movement.left = true;
  if (event.key === 'd') movement.right = true;
  socket.emit('move', movement);
});
