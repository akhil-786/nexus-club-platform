const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    venue: {
      type: String,
      required: true,
      trim: true,
    },

    eventDate: {
      type: Date,
      required: true,
    },

    clubId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Club",
      required: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    attendance: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    collegeId: {
    type: String,
    required: true,
},

    banner: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: [
        "upcoming",
        "completed",
        "cancelled",
      ],
      default: "upcoming",
    },

  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model(
  "Event",
  eventSchema
);

module.exports = Event;