const collectorOnly = (req, res, next) => {
  if (req.user.role !== "collector") {
    return res.status(403).json({
      message: "Collector access only",
    });
  }

  next();
};

module.exports = collectorOnly;