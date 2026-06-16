const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const collectorOnly = require("../middleware/collectorMiddleware");

const {
  getPendingRequests,
  acceptPickupRequest,
  getMyAssignments,
  completePickupRequest,
  getOptimizedRoute,
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

router.get(
  "/optimized-route",
  protect,
  collectorOnly,
  getOptimizedRoute
);

module.exports = router;