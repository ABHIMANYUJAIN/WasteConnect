const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const {
  getDashboardStats,
  autoAssignRequest,
  getCollectorLeaderboard,
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

module.exports = router;