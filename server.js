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
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>OBS Live Ticker Hub</title>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap');
            
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            
            body {
                font-family: 'Orbitron', monospace;
                background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%);
                color: #4da6ff;
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
                overflow: hidden;
            }
            
            .container {
                text-align: center;
                padding: 40px;
                background: rgba(17, 17, 17, 0.9);
                border-radius: 20px;
                border: 2px solid #4da6ff;
                box-shadow: 0 0 50px rgba(77, 166, 255, 0.3);
                backdrop-filter: blur(10px);
                max-width: 600px;
                width: 90%;
                position: relative;
                overflow: hidden;
            }
            
            .container::before {
                content: '';
                position: absolute;
                top: -50%;
                left: -50%;
                width: 200%;
                height: 200%;
                background: conic-gradient(transparent, rgba(77, 166, 255, 0.1), transparent 30%);
                animation: rotate 4s linear infinite;
                z-index: -1;
            }
            
            @keyframes rotate {
                100% { transform: rotate(360deg); }
            }
            
            h1 {
                font-size: 2.5rem;
                margin-bottom: 20px;
                text-shadow: 0 0 20px #4da6ff;
                animation: pulse 2s ease-in-out infinite;
            }
            
            @keyframes pulse {
                0%, 100% { text-shadow: 0 0 20px #4da6ff; }
                50% { text-shadow: 0 0 30px #4da6ff, 0 0 40px #4da6ff; }
            }
            
            .subtitle {
                font-size: 1.1rem;
                margin-bottom: 30px;
                color: #ccc;
                font-weight: 300;
            }
            
            .links {
                display: flex;
                gap: 20px;
                margin: 30px 0;
                flex-wrap: wrap;
                justify-content: center;
            }
            
            .link-card {
                background: linear-gradient(45deg, #1a1a2e, #16213e);
                padding: 20px;
                border-radius: 15px;
                border: 1px solid #333;
                text-decoration: none;
                color: #4da6ff;
                transition: all 0.3s ease;
                flex: 1;
                min-width: 200px;
                position: relative;
                overflow: hidden;
            }
            
            .link-card:hover {
                transform: translateY(-5px);
                box-shadow: 0 10px 30px rgba(77, 166, 255, 0.3);
                border-color: #4da6ff;
            }
            
            .link-card::before {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(77, 166, 255, 0.1), transparent);
                transition: left 0.5s;
            }
            
            .link-card:hover::before {
                left: 100%;
            }
            
            .link-title {
                font-size: 1.2rem;
                font-weight: bold;
                margin-bottom: 8px;
            }
            
            .link-desc {
                font-size: 0.9rem;
                color: #888;
                line-height: 1.4;
            }
            
            .room-info {
                background: #0f0f0f;
                padding: 20px;
                border-radius: 10px;
                margin: 20px 0;
                border-left: 4px solid #4da6ff;
            }
            
            .room-id {
                font-family: 'Courier New', monospace;
                font-size: 1.1rem;
                color: #4da6ff;
                background: #1a1a1a;
                padding: 8px 12px;
                border-radius: 5px;
                display: inline-block;
                margin: 5px 0;
            }
            
            .features {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                gap: 15px;
                margin: 20px 0;
            }
            
            .feature {
                background: rgba(77, 166, 255, 0.1);
                padding: 15px;
                border-radius: 10px;
                border: 1px solid rgba(77, 166, 255, 0.3);
            }
            
            .feature-icon {
                font-size: 1.5rem;
                margin-bottom: 5px;
            }
            
            .note {
                font-size: 0.9rem;
                color: #888;
                margin-top: 20px;
                font-style: italic;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>🎬 OBS Live Ticker</h1>
            <p class="subtitle">Professional streaming overlay system</p>
            
            <div class="room-info">
                <h3>🏠 Your Room</h3>
                <div class="room-id">${id}</div>
                <p style="font-size: 0.9rem; color: #ccc;">This unique room ID connects your control panel to the overlay</p>
            </div>
            
            <div class="links">
                <a href="/control.html?room=${id}" target="_blank" class="link-card">
                    <div class="link-title">🎛️ Control Panel</div>
                    <div class="link-desc">Manage your ticker text, styling, animations, and chat with viewers</div>
                </a>
                
                <a href="/overlay.html?room=${id}" target="_blank" class="link-card">
                    <div class="link-title">📺 OBS Overlay</div>
                    <div class="link-desc">Transparent overlay for OBS Browser Source integration</div>
                </a>
            </div>
            
            <div class="features">
                <div class="feature">
                    <div class="feature-icon">🎨</div>
                    <div>Advanced Styling</div>
                </div>
                <div class="feature">
                    <div class="feature-icon">⚡</div>
                    <div>Real-time Updates</div>
                </div>
                <div class="feature">
                    <div class="feature-icon">🔄</div>
                    <div>Smooth Animations</div>
                </div>
                <div class="feature">
                    <div class="feature-icon">💬</div>
                    <div>Live Chat</div>
                </div>
            </div>
            
            <p class="note">
                💡 Tip: Bookmark these links or create a custom room ID in the URL
            </p>
        </div>
        
        <script>
            // Add some interactive particles
            function createParticle() {
                const particle = document.createElement('div');
                particle.style.position = 'fixed';
                particle.style.width = '2px';
                particle.style.height = '2px';
                particle.style.background = '#4da6ff';
                particle.style.pointerEvents = 'none';
                particle.style.opacity = Math.random();
                particle.style.left = Math.random() * window.innerWidth + 'px';
                particle.style.top = window.innerHeight + 'px';
                particle.style.zIndex = '-1';
                
                document.body.appendChild(particle);
                
                const animation = particle.animate([
                    { transform: 'translateY(0px)', opacity: particle.style.opacity },
                    { transform: 'translateY(-' + (window.innerHeight + 100) + 'px)', opacity: 0 }
                ], {
                    duration: Math.random() * 3000 + 2000,
                    easing: 'linear'
                });
                
                animation.onfinish = () => particle.remove();
            }
            
            setInterval(createParticle, 300);
        </script>
    </body>
    </html>
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

  // handle chat messages
  socket.on('chatMessage', (data) => {
    const { room, message } = data;
    if (!room) return;
    io.to(room).emit('chatMessage', message);
  });

  // handle voice chat events
  socket.on('voiceStart', (data) => {
    const { room } = data;
    if (!room) return;
    socket.to(room).emit('voiceStart', { streamer: true });
  });

  socket.on('voiceStop', (data) => {
    const { room } = data;
    if (!room) return;
    socket.to(room).emit('voiceStop', { streamer: true });
  });

  socket.on('disconnect', () => {});
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, '0.0.0.0', () => console.log(`Server running on http://0.0.0.0:${PORT}`));
