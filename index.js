const http = require("http");
const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");

// Load .env file
require("dotenv").config();
const config = require("./config");

// App Initialize
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Morgan Logger
app.use(require("morgan")("dev"));

// Database
const { sequelize } = require("./models");
sequelize
    .validate()
    .then(() => console.log("Connected to database"))
    .catch(() => console.error("Database connection failed"));

// CORS Policy Setting
app.use(cors(config.cors));

// JSON Body Handler
app.use(express.json());

// Routers
app.use("/api", require("./routes/files"));
app.use("/dashboard/api", require("./routes/dashboard"));
app.use("/api", require("./routes/client"));

// 404 Handler
app.use((req, res, next) =>
    next({ status: 404, msgs: ["المحتوى الذي تحاول الدخول عليه غير موجود"] })
);

// Server Error Handler
app.use(({ status = 500, msgs = ["حدث خطأ ما"] }, req, res, next) => {
    res.status(status).json({ success: false, status, msgs });
});

// Socket Handlers
require("./sockets")(io);

// Serve App
server.listen(config.port, () =>
    console.log("API Service working on port " + config.port)
);
