const PickupRequest = require("../models/PickupRequest");

const getPendingRequests = async (req, res) => {
  try {
    const requests = await PickupRequest.find({
      status: "pending",
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
  getPendingRequests,
};