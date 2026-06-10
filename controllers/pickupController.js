const PickupRequest = require("../models/PickupRequest");

const createPickupRequest = async (req, res) => {
  try {
    const {
      wasteType,
      weight,
      address,
      pickupDate,
    } = req.body;

    const request = await PickupRequest.create({
      userId: req.user.id,
      wasteType,
      weight,
      address,
      pickupDate,
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

module.exports = {
  createPickupRequest,
};