// // backend/server.js
// const express = require("express");
// const scanRouter = require("./routes/scan");
// const path = require("path");
// const app = express();
// const cors = require("cors");

// app.use(cors()); // allow all origins while testing
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use("/api/scan", scanRouter);

// // optional: serve uploads (for debugging) - comment out in production
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, "0.0.0.0", () => {
//   console.log(`Backend listening on ${PORT}`);
// });



const express = require("express");
const cors = require("cors");
const path = require("path");

const scanRouter = require("./routes/scan");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logger
app.use((req, res, next) => {
  console.log("=================================");
  console.log("REQUEST:", req.method, req.url);
  console.log("TIME:", new Date().toISOString());
  console.log("=================================");
  next();
});

// Simple health check
app.get("/", (req, res) => {
  console.log("Health check received");
  res.json({
    status: "Backend is running",
    message: "Resistor Scanner API"
  });
});

// Scan route
app.use("/api/scan", scanRouter);

// Serve uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Error handler
app.use((err, req, res, next) => {
  console.error("========== SERVER ERROR ==========");
  console.error(err);
  console.error("==================================");

  res.status(500).json({
    error: "Server error",
    message: err.message
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("=================================");
  console.log(`Backend listening on ${PORT}`);
  console.log("=================================");
});