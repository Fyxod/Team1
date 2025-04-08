const mongoose = require("mongoose");

const classSchema = new mongoose.Schema(
  {
    subject: {
      type: String,
      required: true,
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // refers to a teacher
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    // day: {
    //   type: String,
    //   required: true, // example: "Monday"
    // },
    // date: {
    //   type: Date,
    //   required: true, // specific calendar date
    // },
    timeSlot: {
      type: String,
      required: true, // example: "10:00 AM - 11:00 AM"
    },
    durationMinutes: {
      type: Number,
      required: true, // example: 60
    },
    batch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Batch", // refers to the batch
      required: true,
    },
  },
  { timestamps: true }
);

const Class = mongoose.model("Class", classSchema);

module.exports = Class;
