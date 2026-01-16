# Quick Setup Guide

## Step 1: Install Dependencies

Run this command in the root directory:

```bash
npm run install-all
```

This will install dependencies for the root, server, and client.

## Step 2: Set Up MongoDB

### Option A: Local MongoDB
1. Install MongoDB on your system
2. Start MongoDB service
3. Use connection string: `mongodb://localhost:27017/thankyou`

### Option B: MongoDB Atlas (Cloud)
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get your connection string
4. Replace the `MONGODB_URI` in `server/.env`

## Step 3: Configure Environment

1. Create a file named `.env` in the `server` directory
2. Copy the contents from `server/.env.example` (if it exists) or add:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/thankyou
ACCESS_TOKEN=special-moment-2024
```

3. **Important**: Change `ACCESS_TOKEN` to something personal and secure
4. Update the same token in `client/src/App.js` (line 12)

## Step 4: Start the Application

### Development Mode (Both servers at once):

```bash
npm run dev
```

### Or Start Separately:

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd client
npm start
```

## Step 5: Access the Website

Open your browser and go to: `http://localhost:3000`

## Troubleshooting

### MongoDB Connection Error
- Make sure MongoDB is running
- Check your connection string in `server/.env`
- For MongoDB Atlas, ensure your IP is whitelisted

### Port Already in Use
- Backend uses port 5000 (change in `server/.env`)
- Frontend uses port 3000 (React will prompt to use another port)

### API Calls Failing
- Ensure backend is running on port 5000
- Check that the `ACCESS_TOKEN` matches in both `server/.env` and `client/src/App.js`
- Check browser console for errors

## Customization

### Change the Access Token
1. Update `ACCESS_TOKEN` in `server/.env`
2. Update `ACCESS_TOKEN` constant in `client/src/App.js` (line 12)

### Customize Messages
Edit the component files in `client/src/components/`:
- `EntryScreen.js` - Opening line
- `DiscoverySection.js` - Discovery cards
- `StorytellingSection.js` - Typewriter text
- `FinalReveal.js` - Final message

## Production Deployment

For production:
1. Build the React app: `cd client && npm run build`
2. Set `NODE_ENV=production` in server environment
3. Update `REACT_APP_API_URL` in client environment to your production API URL
4. Deploy backend and serve the built React app
