const mongoose = require("mongoose");
const User = require("../models/User");
const fetchMSPDetails = async () => {
  try {
    // const MSP = mongoose.model("MSPvalues"); // Assuming the model is already defined

    const msps = await User.find({ name: "Vasu Pandey" })
    console.log(msps);

  } catch (error) {
    console.error(error);
  }
};

fetchMSPDetails();
