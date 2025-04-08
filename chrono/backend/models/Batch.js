const mongoose = require("mongoose");

const batchSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true, // Each batch should have a unique name like "Batch A", "Batch B"
  },
  code: {
    type: String,
    required: true,
    unique: true, // This will be the joining code for students & teachers
  },
});

const Batch = mongoose.model("Batch", batchSchema);

module.exports = Batch;
