const express = require('express');
const cors = require('cors');
const config = require('./config');

// Load .env file
require('dotenv').config();

// App Initialize
const app = express();

// Database
config.sequelize.validate()
    .then(() => console.log('Connected to database'))
    .catch(() => console.error('Database connection failed'));

/** @TODO Implement Models */

// CORS Policy Setting
app.use(cors(config.cors));

// JSON Body Handler
app.use(express.json());

// Routers
/** @TODO Implement routes for Client and Dashboard APIs */

// Server Error Handler
/** @TODO Implement error middleware */

// Serve App
app.listen(config.port, () => console.log("API Service working on port " + config.port));