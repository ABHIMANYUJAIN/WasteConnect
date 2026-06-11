const User = require("../models/User");
const PickupRequest = require("../models/PickupRequest");

const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    const totalCollectors =
      await User.countDocuments({
        role: "collector",
      });

    const totalRequests =
      await PickupRequest.countDocuments();

    const pendingRequests =
      await PickupRequest.countDocuments({
        status: "pending",
      });

    const assignedRequests =
      await PickupRequest.countDocuments({
        status: "assigned",
      });

    const completedRequests =
      await PickupRequest.countDocuments({
        status: "completed",
      });

    res.status(200).json({
      totalUsers,
      totalCollectors,
      totalRequests,
      pendingRequests,
      assignedRequests,
      completedRequests,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
};