const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const collectorOnly = require("../middleware/collectorMiddleware");

const {
  getPendingRequests,
  acceptPickupRequest,
} = require("../controllers/collectorController");

router.get(
  "/pending",
  protect,
  collectorOnly,
  getPendingRequests
);

router.patch(
  "/accept/:id",
  protect,
  collectorOnly,
  acceptPickupRequest
);

module.exports = router;