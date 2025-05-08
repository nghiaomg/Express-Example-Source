const express = require("express");
const { createServer } = require("http");
require("dotenv").config();

const { connectDB } = require("./app/config/database");
const setupMiddleware = require("./app/config/middleware");
const setupRoutes = require("./app/config/routes");
const initSocket = require("./app/config/socket");
const initCronJobs = require("./app/config/cronJob");
const app = express();
const httpServer = createServer(app);

// Connect to database
connectDB()
  .then(() => {
    // Setup middleware
    setupMiddleware(app);

    // Setup routes
    setupRoutes(app);

    // Initialize scheduled jobs
    initCronJobs();

    // Initialize socket.io
    const io = initSocket(httpServer);

    const port = process.env.PORT || 2222;
    const base_url = process.env.BASE_URL || "http://localhost";

    httpServer.listen(port, () => {
      console.log(`Server is running at ${base_url}:${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to start server:", error);
    process.exit(1);
  });

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  process.exit(1);
});

process.on("unhandledRejection", (error) => {
  console.error("Unhandled Rejection:", error);
  process.exit(1);
});
