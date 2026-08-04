const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const protect = require("./middleware/authMiddleware");
const pickupRoutes = require("./routes/pickupRoutes");
const collectorRoutes = require("./routes/collectorRoutes");
const adminRoutes = require("./routes/adminRoutes");
const path = require("path");


dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "uploads")
  )
);
app.use("/api/auth", authRoutes);
app.use("/api/pickups", pickupRoutes);
app.use("/api/collector", collectorRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("WasteConnect API Running");
});
app.get("/profile", protect, (req, res) => {
  res.json({
    message: "Protected Route Accessed",
    user: req.user,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});