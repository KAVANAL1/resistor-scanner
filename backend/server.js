const express = require("express");
const scanRouter = require("./routes/scan");
const path = require("path");
const fs = require("fs");
const cors = require("cors");

const app = express();

// Enable CORS
app.use(cors());

// JSON and form support
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =========================
// ⭐ MODEL FILE CHECK
// =========================
const modelPath = path.join(__dirname, "model", "model.tflite");

try {
  const exists = fs.existsSync(modelPath);
  console.log("MODEL_PATH:", modelPath);
  console.log("MODEL_EXISTS:", exists);

  if (exists) {
    const size = fs.statSync(modelPath).size;
    console.log("MODEL_SIZE:", size, "bytes");
  } else {
    console.error("❌ MODEL FILE MISSING — inference will FAIL");
  }
} catch (err) {
  console.error("MODEL_CHECK_ERROR:", err);
}

// =========================
// Ensure uploads folder exists
// =========================
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log("Created uploads directory");
}

// ROUTES
app.use("/api/scan", scanRouter);

// Debug serve for uploads (optional)
app.use("/uploads", express.static(uploadDir));

// =========================
// Start server
// =========================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend listening on ${PORT}`);
});
