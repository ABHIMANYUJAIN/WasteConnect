const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const collectorOnly = require("../middleware/collectorMiddleware");

const {
  getPendingRequests,
  acceptPickupRequest,
  getMyAssignments,
  completePickupRequest,
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

router.get(
  "/my-assignments",
  protect,
  collectorOnly,
  getMyAssignments
);

router.patch(
  "/complete/:id",
  protect,
  collectorOnly,
  completePickupRequest
);

module.exports = router;