const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const collectorOnly = require("../middleware/collectorMiddleware");

const {
  getPendingRequests,
} = require("../controllers/collectorController");

router.get(
  "/pending",
  protect,
  collectorOnly,
  getPendingRequests
);

module.exports = router;