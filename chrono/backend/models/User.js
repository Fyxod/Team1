const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {type: String, required:true, unique: true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["student", "teacher", "admin"],
      default: "student",
    },
    batch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Batch",
    }, 
    batches: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Batch",
      },
    ], 
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
