const mongoose = require("mongoose");
// const validator = require("validator");
const Schema = mongoose.Schema;

const userMSPSchema = new Schema({
  y1: {
    type: String,
    required: true,
  },
  y2: {
    type: String,
    required: true,
  },
  y3: {
    type: String,
    required: true,
  },
  x1: {
    type: String,
    required: true,
  },
  x2: {
    type: String,
    required: true,
  },
  x3: {
    type: String,
    required: true,
  },
});

const userMSP = mongoose.model("userMSP", userMSPSchema);
module.exports = userMSP;
