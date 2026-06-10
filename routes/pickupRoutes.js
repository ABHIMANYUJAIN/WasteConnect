const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createPickupRequest,
  getMyPickupRequests,
} = require("../controllers/pickupController");

router.post(
  "/create",
  protect,
  createPickupRequest
);

router.get(
  "/my",
  protect,
  getMyPickupRequests
);

module.exports = router;