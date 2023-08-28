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

require('./models');

// CORS Policy Setting
app.use(cors(config.cors));

// JSON Body Handler
app.use(express.json());

// Routers
app.use('/api', require('./routes/client'));
app.use('/dashboard/api', require('./routes/dashboard'));

// Server Error Handler
app.use(({ status = 500, msgs = ["حدث خطأ ما"] }, req, res, next) => {
    res.status(status).json({ status, msgs });
})

// Serve App
app.listen(config.port, () => console.log("API Service working on port " + config.port));