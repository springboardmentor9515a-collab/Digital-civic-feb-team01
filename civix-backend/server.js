const dotenv = require('dotenv');
// Load env vars immediately
dotenv.config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Re-enable cors package
const authRoutes = require('./src/routes/authRoutes');
const cookieParser = require('cookie-parser');

const app = express();

// CORS Middleware
const corsOptions = {
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin']
};

app.use(cors(corsOptions));
// Handle preflight requests for all routes using Express 5 format
app.options(/(.*)/, cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

// Debugging Middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} - Origin: ${req.headers.origin}`);
  next();
});

// Routes
app.use('/api/auth', authRoutes);

// Health Check - server updated to port 5001 (AirPlay conflict on 5000)
app.get('/', (req, res) => {
  res.send('Civix Backend is running');
});

// Database Connection
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/civix';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((err) => {
    console.error('Database connection error:', err);
  });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
