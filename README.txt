OBS Live Ticker - README

Setup:
1. Install Node.js (https://nodejs.org/) LTS version.
2. Open terminal/cmd and run:
   npm install
   npm start

3. Open http://localhost:3000
   - Use the generated control and overlay links.
   - Paste the overlay link into OBS as a Browser Source.

Notes:
- If hosting publicly, deploy to a Node host and use the public URL.
- The control panel updates overlays in real-time using socket.io.