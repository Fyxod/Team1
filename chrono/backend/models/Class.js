const mongoose = require("mongoose");

const classSchema = new mongoose.Schema(
  {
    subject: {
      type: String,
      required: true,
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    day: {
      type: String,
      required: true, 
    },
    date: {
      type: Date,
      required: true, 
    },
    timeSlot: {
      type: String,
      required: true, 
    },
    durationMinutes: {
      type: Number,
      required: true, 
    },
    batch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Batch", 
      required: true,
    },
  },
  { timestamps: true }
);

const Class = mongoose.model("Class", classSchema);

module.exports = Class;
