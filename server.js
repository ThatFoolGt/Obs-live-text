const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { nanoid } = require('nanoid');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files from public/
app.use(express.static(__dirname + '/public'));

// Simple index that issues a random room id and links to control/overlay
app.get('/', (req, res) => {
  const id = nanoid(8);
  res.send(`
    <h2>OBS Live Ticker</h2>
    <p>Use these links:</p>
    <ul>
      <li>Overlay: <a href="/overlay.html?room=${id}" target="_blank">/overlay.html?room=${id}</a></li>
      <li>Control: <a href="/control.html?room=${id}" target="_blank">/control.html?room=${id}</a></li>
    </ul>
    <p>Or create your own room by editing the room param.</p>
  `);
});

io.on('connection', (socket) => {
  // room join
  socket.on('join', (room) => {
    socket.join(room);
  });

  // control emits update -> broadcast to room
  socket.on('update', (data) => {
    const { room, payload } = data;
    // validate minimally
    if (!room) return;
    io.to(room).emit('update', payload);
  });

  socket.on('disconnect', () => {});
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, '0.0.0.0', () => console.log(`Server running on http://0.0.0.0:${PORT}`));
