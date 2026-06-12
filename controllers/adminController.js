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

const autoAssignRequest = async (req, res) => {
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
        message: "Request is not pending",
      });
    }

    const collectors = await User.find({
      role: "collector",
    });

    if (collectors.length === 0) {
      return res.status(400).json({
        message: "No collectors available",
      });
    }

    let selectedCollector = null;
    let minWorkload = Infinity;

    for (const collector of collectors) {
      const workload =
        await PickupRequest.countDocuments({
          collectorId: collector._id,
          status: "assigned",
        });

      if (workload < minWorkload) {
        minWorkload = workload;
        selectedCollector = collector;
      }
    }

    request.collectorId = selectedCollector._id;
    request.status = "assigned";

    await request.save();

    res.status(200).json({
      message: "Request auto-assigned",
      collector: selectedCollector.name,
      request,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getCollectorLeaderboard = async (req, res) => {
  try {
    const collectors = await User.find({
      role: "collector",
    });

    const leaderboard = [];

    for (const collector of collectors) {
      const assigned =
        await PickupRequest.countDocuments({
          collectorId: collector._id,
          status: "assigned",
        });

      const completed =
        await PickupRequest.countDocuments({
          collectorId: collector._id,
          status: "completed",
        });

      const totalHandled =
  assigned + completed;

const completionRate =
  totalHandled === 0
    ? 0
    : (
        (completed / totalHandled) *
        100
      ).toFixed(1);

leaderboard.push({
  name: collector.name,
  email: collector.email,
  assigned,
  completed,
  completionRate,
});
    }

    leaderboard.sort(
      (a, b) => b.completed - a.completed
    );

    res.status(200).json({
      leaderboard,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
  autoAssignRequest,
  getCollectorLeaderboard,
};