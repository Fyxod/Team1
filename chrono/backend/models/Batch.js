const mongoose = require("mongoose");

const batchSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true, 
  },
  code: {
    type: String,
    required: true,
    unique: true, 
  },
});

const Batch = mongoose.model("Batch", batchSchema);

module.exports = Batch;
