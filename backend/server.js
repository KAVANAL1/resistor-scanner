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
const scanRouter = require("./routes/scan");
const path = require("path");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Log every request
app.use((req, res, next) => {
    console.log("REQUEST:", req.method, req.url);
    next();
});

app.use("/api/scan", scanRouter);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Backend listening on ${PORT}`);
});