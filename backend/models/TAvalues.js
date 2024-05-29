const mongoose = require("mongoose");
// const validator = require("validator");
const Schema = mongoose.Schema;

const TASchema = new Schema({
  parameter: {
    type: String,
    required: true,
    trim: true,
  },
  value1: {
    type: Number,
    required: true,
  },
  value2: {
    type: Number,
    required: true,
  }
});

const TA = mongoose.model("TAvalues", TASchema);
module.exports = TA;
