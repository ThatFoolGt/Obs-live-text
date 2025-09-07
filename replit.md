# OBS Live Ticker

## Overview
Real-time, customizable live ticker overlay for OBS streaming using Node.js, Express, and Socket.io. The application provides a control panel for managing ticker content and a transparent overlay for OBS Browser Source integration.

## Current State
- ✅ Fully configured for Replit environment
- ✅ Running on port 5000 with proper host binding (0.0.0.0)
- ✅ Real-time communication via Socket.io
- ✅ Control panel and overlay working properly
- ✅ Deployment configuration set up

## Project Architecture

### Backend (`server.js`)
- Express.js web server
- Socket.io for real-time communication
- Room-based messaging system
- Serves static files from `/public`
- Generates random room IDs using nanoid

### Frontend
- **Control Panel** (`/public/control.html`): Interface for managing ticker text, styling, and room management
- **Overlay** (`/public/overlay.html`): Transparent scrolling ticker for OBS Browser Source

### Key Features
- Real-time text updates
- Customizable fonts, colors, and sizing
- Scrolling speed control
- Room-based isolation for multiple streams
- Transparent overlay for OBS integration

## Recent Changes (Sept 7, 2025)
- Migrated from GitHub import to Replit environment
- Updated server to bind to 0.0.0.0:5000 for Replit compatibility
- Added missing dependencies: socket.io and nanoid
- Fixed overlay.html to use Socket.io instead of raw WebSocket
- Configured proper deployment settings (VM mode for persistent state)
- Set up automated workflow for easy development

## Usage
1. Visit the root URL to get generated room links
2. Use the control panel link to manage ticker content
3. Use the overlay link as OBS Browser Source
4. Multiple rooms can operate independently

## Dependencies
- express: Web server framework
- socket.io: Real-time bidirectional communication
- nanoid: Compact URL-safe unique ID generator
- ws: WebSocket library (legacy, but kept for compatibility)