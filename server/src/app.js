const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const authRoutes =
require("./modules/auth/routes/auth.routes");

const clubRoutes =
require("./modules/clubs/routes/club.routes");

const eventRoutes =
require("./modules/events/routes/event.routes");

const app = express();


// CORS

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://nexus-club-platform.vercel.app",
    ],

    credentials: true,
  })
);


// Core Middleware

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);


// Security Middleware

app.use(helmet());


// Logging Middleware

app.use(morgan("dev"));


// Cookie Parser

app.use(cookieParser());


// Routes

app.use("/api/auth", authRoutes);

app.use("/api/clubs", clubRoutes);

app.use("/api/events", eventRoutes);


// Health Check

app.get("/", (req, res) => {

  res.status(200).json({

    success: true,

    message:
      "Nexus Club API is running...",

  });
});


module.exports = app;