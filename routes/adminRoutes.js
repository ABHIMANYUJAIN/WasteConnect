const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const {
  getDashboardStats,
  autoAssignRequest,
  getCollectorLeaderboard,
  getWasteAnalytics,
  getPendingRequests,
} = require("../controllers/adminController");

router.get(
  "/dashboard",
  protect,
  adminOnly,
  getDashboardStats
);

router.patch(
  "/auto-assign/:id",
  protect,
  adminOnly,
  autoAssignRequest
);

router.get(
  "/leaderboard",
  protect,
  adminOnly,
  getCollectorLeaderboard
);

router.get(
  "/waste-analytics",
  protect,
  adminOnly,
  getWasteAnalytics
);

router.get(
  "/pending",
  protect,
  adminOnly,
  getPendingRequests
);

module.exports = router;