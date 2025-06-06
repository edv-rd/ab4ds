require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const antibioticRoutes = require('./routes/antibiotics');
const bacteriaRoutes = require('./routes/bacteria');


const app = express();
const PORT = process.env.PORT || 5000;
const DB_URL = process.env.DB_URL 

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use('/api/antibiotics', antibioticRoutes);
app.use('/api/bacteria', bacteriaRoutes);

// MongoDB connection
mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch(err => {
    console.error('MongoDB connection error:', err);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});