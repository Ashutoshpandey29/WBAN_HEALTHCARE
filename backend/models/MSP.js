const mongoose = require("mongoose");
const { PublicKey, PrivateKey } = require("paillier-bigint");
// const validator = require("validator");
const Schema = mongoose.Schema;

const MSPSchema = new Schema({
  username: {
    type: String,
    // required: true,
  },
  email: {
    type: String,
    // required: true,
    // unique: true,
  },
  password: {
    type: String,
    // required: true,
  },
  phone: {
    type: Number,
    // required: true,
  },
  address: {
    type: String,
    // required: true,
  },
  x: {
    type: Number,
    required: true,
  },
  y: {
    type: Number,
    required: true,
  },
  z: {
    type: Number,
    required: true,
  },
  PublicKey: {
    type: String,
    // required: true,
  },
  PrivateKey: {
    type: String,
    // required: true,
  },
});

const MSP = mongoose.model("MSPvalues", MSPSchema);
module.exports = MSP;
