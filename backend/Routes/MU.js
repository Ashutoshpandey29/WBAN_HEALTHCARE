require("dotenv").config();
const express = require("express");
const axios = require("axios");
// const jwt = require("jsonwebtoken");
const math = require("mathjs");
const router = express.Router();
const bodyParser = require("body-parser").json();
const crypto = require("crypto");
const userMSP = require("../models/userMSP.js");

const {
  matrixMultiply,
  generateInvertibleMatrix,
  calculateInverse,
  generateKeys,
  encryptData,
  generateSignature,
  N,
  encryptDet,
  encryptVector,
  decryptloc,
  decryptValue,
} = require("./Utils/MU_util.js");

function insertVectorValues(y1, y2, y3, x1, x2, x3) {
  const newUserMSP = new userMSP({
    y1: y1,
    y2: y2,
    y3: y3,
    x1: x1,
    x2: x2,
    x3: x3,
  });

  newUserMSP
    .save()
    .then((doc) => {
      console.log("Document saved successfully:", doc);
    })
    .catch((err) => {
      console.error("Error saving document:", err);
    });
}

function encryptVectorMSP(vector, publicKey) {
  return vector.map((element) => {
    const buffer = Buffer.from(element.toString());
    const encrypted = crypto.publicEncrypt(
      {
        key: publicKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING, // More secure padding
        oaepHash: "sha256", // Defines hash algorithm used with OAEP
      },
      buffer
    );
    return encrypted.toString("base64");
  });
}

router.post("/processLocation", bodyParser, async (req, res) => {
  const { x1, x2, x3 } = req.body;

  if ([x1, x2, x3].some((num) => typeof num !== "number")) {
    return res.status(400).send("All coordinates must be numbers.");
  }

  const locationVector = [x1, x2, x3];
  const P = generateInvertibleMatrix(3);
  const PInv = calculateInverse(P);

  if (!PInv) {
    return res.status(500).send("Failed to compute the inverse of the matrix.");
  }

  const Clu = matrixMultiply(PInv, locationVector);
  const { publicKey, privateKey } = generateKeys();
  const locationSquare = locationVector.reduce((acc, val) => acc + val ** 2, 0);
  const Elu = encryptData(locationSquare.toString(), publicKey);
  const detP = math.det(P);
  const EpkmuP = encryptDet(detP, publicKey);
  const signatureData = JSON.stringify(P);
  const H = generateSignature(signatureData, privateKey);
  const encryptedLocation = encryptVector(locationVector, privateKey);

  var selLoc, selPhone, selAddress, PKmsp;
  const dataToSend = {
    encrloc: encryptedLocation,
    Clu,
    Elu,
    H,
    EpkmuP,
    P,
    N,
    publicKey,
  };
  try {
    // Specify the URL of the external API
    const apiUrl = "http://127.0.0.1:4000/api/cs/recmu";
    const response = await axios.post(apiUrl, dataToSend);
    const selectedMSP = response.data;
    // console.log(selectedMSP);
    const PKmsp = selectedMSP.PKmsp;
    console.log(PKmsp);
    // console.log(selectedMSP.closestLoc);

    selLoc = decryptloc(selectedMSP.closestLoc, privateKey);
    selPhone = decryptValue(selectedMSP.closestPhone, privateKey);
    selAddress = decryptValue(selectedMSP.closestAddress, privateKey);

    // console.log(PKmsp);
    const encrSel = encryptVectorMSP(locationVector, PKmsp);
    insertVectorValues(
      selLoc[0],
      selLoc[1],
      selLoc[2],
      encrSel[0],
      encrSel[1],
      encrSel[2]
    );
    // const decryptedVector =
  } catch (error) {
    console.error("Error sending data to external API (MU)", error);
  }
  res.json({
    selLoc,
    selPhone,
    selAddress,
  });
});

module.exports = router;
