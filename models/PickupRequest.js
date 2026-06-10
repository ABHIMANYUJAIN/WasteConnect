const mongoose = require("mongoose");

const pickupRequestSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    wasteType: {
      type: String,
      required: true,
    },

    weight: {
      type: Number,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    pickupDate: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "assigned", "completed", "cancelled"],
      default: "pending",
    },

    collectorId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  default: null,
},

completedAt: {
  type: Date,
  default: null,
},
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "PickupRequest",
  pickupRequestSchema
);