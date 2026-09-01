const PickupRequest = require("../models/PickupRequest");
const User = require("../models/User");

const createPickupRequest = async (req, res) => {
  try {
    const {
  wasteType,
  weight,
  address,
  pickupDate,
} = req.body;

const location = req.body.location
  ? JSON.parse(req.body.location)
  : null;

    const image = req.file
  ? `/uploads/${req.file.filename}`
  : null;

    const request =
await PickupRequest.create({

  userId: req.user.id,
  wasteType,
  weight,
  address,
  location,
  pickupDate,
  image,

});

    res.status(201).json({
      message: "Pickup request created",
      request,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const getMyPickupRequests = async (req, res) => {
  try {
    const requests = await PickupRequest.find({
      userId: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      count: requests.length,
      requests,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const cancelPickupRequest = async (req, res) => {
  try {
    const request = await PickupRequest.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!request) {
      return res.status(404).json({
        message: "Pickup request not found",
      });
    }

    if (request.status !== "pending") {
      return res.status(400).json({
        message: "Only pending requests can be cancelled",
      });
    }

    request.status = "cancelled";

    await request.save();

    res.status(200).json({
      message: "Pickup request cancelled",
      request,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getMyGreenPoints = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(
      "greenPoints"
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      greenPoints: user.greenPoints || 0,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createPickupRequest,
  getMyPickupRequests,
  cancelPickupRequest,
  getMyGreenPoints,
};