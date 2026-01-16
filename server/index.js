const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Rate limiting for message submission
const messageLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: 'Too many messages, please try again later.'
});

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/thankyou', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Message Schema
const messageSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    maxlength: 500
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Message = mongoose.model('Message', messageSchema);

// Token validation middleware (simple token check)
const validateToken = (req, res, next) => {
  const token = req.headers['x-access-token'] || req.query.token;
  const validToken = process.env.ACCESS_TOKEN || 'special-moment-2024';
  
  if (token === validToken) {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized access' });
  }
};

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Get all messages (protected)
app.get('/api/messages', validateToken, async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 }).limit(10);
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

// Submit a message (rate limited)
app.post('/api/messages', messageLimiter, async (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text || text.trim().length === 0) {
      return res.status(400).json({ error: 'Message cannot be empty' });
    }
    
    if (text.length > 500) {
      return res.status(400).json({ error: 'Message too long' });
    }
    
    const message = new Message({ text: text.trim() });
    await message.save();
    
    res.status(201).json({ 
      success: true, 
      message: 'Message saved',
      data: message 
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save message' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
