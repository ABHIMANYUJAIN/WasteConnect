const express = require("express");
const router = express.Router();
const upload = require("../config/multer");

const protect = require("../middleware/authMiddleware");

const {
  createPickupRequest,
  getMyPickupRequests,
  cancelPickupRequest,
} = require("../controllers/pickupController");

router.post(
  "/create",
  protect,
  upload.single("image"),
  createPickupRequest
);

router.get(
  "/my",
  protect,
  getMyPickupRequests
);

router.patch(
  "/cancel/:id",
  protect,
  cancelPickupRequest
);

module.exports = router;