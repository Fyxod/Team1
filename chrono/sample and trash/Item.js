// sample for how i will make a schema basically this is just for test purposes


const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Item", ItemSchema);
