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
  enum: [
    "Plastic",
    "Paper",
    "Metal",
    "Glass",
    "E-Waste",
    "Cardboard"
  ],
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

location: {
  latitude: {
    type: Number,
    required: false,
  },
  longitude: {
    type: Number,
    required: false,
  },
},

    pickupDate: {
      type: Date,
      required: true,
    },

    image: {
  type: String,
  default: null,
},

completedImage: {
  type: String,
  default: null,
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