const mongoose = require("mongoose");
const validator = require("validator");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    // required: true,
    trim: true,
  },
  email: {
    type: String,
    // required: true,
    trim: true,
    unique: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Enter a valid email");
      }
    },
  },
  password: {
    type: String,
    // required: true,
    trim: true,
    // minLength: 6,
  },
  publicKey: {
    type:String
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;