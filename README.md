# Thank You Experience

A cinematic, emotional, and deeply personal "Thank You" website experience. This is a full-stack application built with React (frontend) and Node.js/Express with MongoDB (backend).

## Features

- **Cinematic UI**: Dark, soft color palette with smooth animations and transitions
- **Multi-layer Experience**: 
  - Entry screen with poetic introduction
  - Interactive discovery section
  - Typewriter-style storytelling
  - Final thank you reveal
- **Interactive Elements**: Particle background, parallax effects, mouse-responsive animations
- **Message System**: Users can leave messages that are stored permanently and displayed as floating elements
- **Privacy**: Token-based access control

## Tech Stack

### Frontend
- React 18
- Framer Motion (animations)
- React Particles (background effects)
- Axios (API calls)

### Backend
- Node.js
- Express
- MongoDB (Mongoose)
- CORS
- Rate limiting

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)

### Installation

1. **Install all dependencies:**
   ```bash
   npm run install-all
   ```

2. **Set up environment variables:**
   
   Create a `.env` file in the `server` directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/thankyou
   ACCESS_TOKEN=special-moment-2024
   ```
   
   You can change the `ACCESS_TOKEN` to any value you prefer for privacy.

3. **Start MongoDB:**
   
   Make sure MongoDB is running on your system. If using MongoDB Atlas, use your connection string in `MONGODB_URI`.

4. **Run the application:**
   
   ```bash
   npm run dev
   ```
   
   This will start both the backend server (port 5000) and the React frontend (port 3000).

   Or run them separately:
   ```bash
   # Terminal 1 - Backend
   npm run server
   
   # Terminal 2 - Frontend
   npm run client
   ```

5. **Access the application:**
   
   Open your browser and navigate to `http://localhost:3000`

## Configuration

### Changing the Access Token

Edit the `ACCESS_TOKEN` in:
- `server/.env` (backend validation)
- `client/src/App.js` (frontend API calls)

Make sure both match for the application to work correctly.

### Customizing Content

You can customize the poetic lines and messages in:
- `client/src/components/EntryScreen.js` - Entry line
- `client/src/components/DiscoverySection.js` - Discovery cards
- `client/src/components/StorytellingSection.js` - Typewriter text
- `client/src/components/FinalReveal.js` - Final message

## Project Structure

```
.
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── server/                 # Express backend
│   ├── index.js           # Server entry point
│   ├── .env               # Environment variables
│   └── package.json
├── package.json           # Root package.json
└── README.md
```

## API Endpoints

- `GET /api/health` - Health check
- `GET /api/messages` - Get all messages (requires token in header: `x-access-token`)
- `POST /api/messages` - Submit a new message (rate limited: 5 per 15 minutes)

## Notes

- The application is designed to be personal and private
- Messages are stored permanently in MongoDB
- Rate limiting prevents spam on the message endpoint
- All animations are smooth and performant
- The design is optimized for desktop viewing but responsive

## License

This is a personal project. Feel free to modify and use as needed.
