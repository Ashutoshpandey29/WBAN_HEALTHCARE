require("dotenv").config();
const axios = require("axios");
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser").json();
const crypto = require("crypto");
const MSP = require("../models/MSP");

const {
  checkIntegrity,
  generateKeys,
  matrixMultiply,
  encryptData,
  hashAll,
  rsaEncrypt,
  encryptVector,
  encryptValue,
} = require("./Utils/MSP_util.js");

router.post("/recCS", bodyParser, async (req, res) => {
  const { Pcs, hash1, N, H, EpkmuP, publicKey, P } = req.body;
  console.log("Content received in MSP");
  const integrity = checkIntegrity(EpkmuP, publicKey, N, H, hash1, Pcs);
  if (!integrity) {
    return res.status(400).json({ error: "Integrity check failed" });
  }

  try {
    const msps = await MSP.find({});
    // console.log(msps);
    const encryptedData = [];

    for (let msp of msps) {
      const mspLocation = [msp.x, msp.y, msp.z];
      // console.log(mspLocation);

      // Use keys from database
      const PKmsp = msp.PublicKey;
      const PRmsp = msp.PrivateKey;
      // console.log(PKmsp);

      const CLs = matrixMultiply(P, mspLocation);
      const encryptedCLs = CLs.map((row) =>
        row.map((val) => rsaEncrypt(val.toString(), PKmsp))
      );
      const locationSquare = mspLocation.reduce(
        (sum, val) => sum + val ** 2,
        0
      );
      const ELS = rsaEncrypt(locationSquare.toString(), PKmsp);

      const ELmsp = encryptVector(mspLocation, Pcs);
      const Cs = encryptData([N], Pcs);

      // Include address and phone in the encrypted data
      const encryptedPhone = encryptValue(msp.phone, Pcs);
      const encryptedAddress = encryptValue(msp.address, Pcs);

      encryptedData.push([Cs, ELmsp, encryptedPhone, encryptedAddress, PKmsp]);
    }
    // console.log(encryptedData);
    res.json(encryptedData);
  } catch (error) {
    console.error("Failed to fetch MSP data:", error);
    res.status(500).json({ error: "Failed to fetch data from database" });
  }
});

module.exports = router;
