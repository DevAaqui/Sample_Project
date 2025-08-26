const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const db = require("./models");

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet());

// CORS configuration
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: true,
  })
);

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});
app.use(limiter);

// Body parsing middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));
app.use("/api/guests", require("./routes/guests"));
app.use("/api/rides", require("./routes/rides"));
app.use("/api/activity-tracking", require("./routes/activityTrack"));

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    error: "Route not found",
    path: req.originalUrl,
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Error:", err);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    error: message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

// Database connection and server startup
async function startServer() {
  try {
    // Test database connection
    await db.sequelize.authenticate();
    console.log("✅ Database connection established successfully.");

    // Sync database (in development)
    if (process.env.NODE_ENV === "development") {
      try {
        // First try to sync without force
        await db.sequelize.sync();
        console.log("✅ Database synchronized (safe mode).");
      } catch (syncError) {
        console.error("❌ Database sync error:", syncError);
        console.log("⚠️  Some tables may need manual migration.");
      }
    }

    // Start server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📊 Environment: ${process.env.NODE_ENV || "development"}`);
      console.log(`🔗 Health check: http://localhost:${PORT}/health`);
    });
  } catch (error) {
    console.error("❌ Unable to start server:", error);
    process.exit(1);
  }
}

// Graceful shutdown
process.on("SIGTERM", async () => {
  console.log("SIGTERM received, shutting down gracefully...");
  await db.sequelize.close();
  process.exit(0);
});

process.on("SIGINT", async () => {
  console.log("SIGINT received, shutting down gracefully...");
  await db.sequelize.close();
  process.exit(0);
});

startServer();
