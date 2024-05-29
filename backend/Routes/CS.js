const express = require("express");
const jwt = require("jsonwebtoken");
const { publicKey } = require("./Utils/MU");
const crypto = require("crypto");
const router = express.Router();
const bodyParser = require("body-parser").json();
const axios = require("axios");

const {
  generateKeyPair,
  decryptVector,
  calculateDistance,
  findClosestVector,
  hashAll,
  decryptloc,
  encryptloc,
  encryptValue,
} = require("./Utils/CS_util.js");

const { publicKey: Pcs, privateKey: PRcs } = generateKeyPair();

router.post("/recmu", bodyParser, async (req, res) => {
  const { encrloc, Clu, Elu, H, EpkmuP, P, N, publicKey } = await req.body;
  const location = decryptloc(encrloc, publicKey);
  if (!location || !Clu || !Elu || !H || !EpkmuP || !P) {
    return res.status(400).send("Missing one or more of the required fields");
  }

  const hash1 = hashAll(EpkmuP, publicKey, H, N);
  var closestLoc, closestPhone, closestAddress, PKmsp;
  const dataToSend = {
    hash1,
    H,
    N,
    publicKey,
    EpkmuP,
    P,
    Pcs,
  };
  console.log({ msg: "Data Received" });
  try {
    const apiUrl = "http://127.0.0.1:4000/api/msp/recCS";
    const response = await axios.post(apiUrl, dataToSend);
    const mspdata = response.data;

    const encrRes = findClosestVector(mspdata, location, PRcs);
    closestLoc = encryptloc(encrRes.closestVector, publicKey);
    closestPhone = encryptValue(encrRes.closestPhone, publicKey);
    closestAddress = encryptValue(encrRes.closestAddress, publicKey);
    PKmsp = encrRes.PK;

    // console.log(PKmsp);
  } catch (error) {
    console.error("Error sending data to external API (CS)");
  }
  res.json({
    closestLoc,
    closestPhone,
    closestAddress,
    PKmsp,
  });
});

module.exports = router;
