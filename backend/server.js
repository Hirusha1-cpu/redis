const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');
const bookRoutes = require('./routes/bookRoutes');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/books', bookRoutes);

const PORT = process.env.PORT || 5005;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});