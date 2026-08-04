const PickupRequest = require("../models/PickupRequest");

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

module.exports = {
  createPickupRequest,
  getMyPickupRequests,
};