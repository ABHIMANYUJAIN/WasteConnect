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

const acceptPickupRequest = async (req, res) => {
  try {
    const request = await PickupRequest.findById(
      req.params.id
    );

    if (!request) {
      return res.status(404).json({
        message: "Request not found",
      });
    }

    if (request.status !== "pending") {
      return res.status(400).json({
        message: "Request already assigned",
      });
    }

    request.status = "assigned";
    request.collectorId = req.user.id;

    await request.save();

    res.status(200).json({
      message: "Pickup request accepted",
      request,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getMyAssignments = async (req, res) => {
  try {
    const requests = await PickupRequest.find({
      collectorId: req.user.id,
      status: "assigned",
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

const completePickupRequest = async (req, res) => {
  try {
    const request = await PickupRequest.findById(
      req.params.id
    );

    if (!request) {
      return res.status(404).json({
        message: "Request not found",
      });
    }

    if (
      request.collectorId?.toString() !== req.user.id
    ) {
      return res.status(403).json({
        message: "Not your assigned request",
      });
    }

    request.status = "completed";
    request.completedAt = new Date();

    await request.save();

    res.status(200).json({
      message: "Pickup completed",
      request,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getPendingRequests,
  acceptPickupRequest,
  getMyAssignments,
  completePickupRequest,
};