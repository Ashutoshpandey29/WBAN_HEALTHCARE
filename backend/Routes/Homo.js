const express = require("express");
const User = require("../models/User");
const TA = require("../models/TAvalues");
const MSP = require("../models/MSP");
const paillier = require("paillier-bigint");
const router = express.Router();
const bodyParser = require("body-parser").json();

router.post("/detection", bodyParser, async (req, res) => {
  const data = req.body;

  const len = Object.keys(data).length;


  const user = await User.findOne({ _id: data.userId });
  const TAvalues = await TA.findOne({ parameter: data.parameter });

  // try {
  const key = user.publicKey;

  const pubStr = atob(key)
    const pubJSON = JSON.parse(pubStr)
    const publicKey = new paillier.PublicKey(BigInt(pubJSON.n), BigInt(pubJSON.g))



  // const n = BigInt(key.n);
  // const g = BigInt(key.g);
  // const publicKey = new paillier.PublicKey(n, g);
  // let diff;

  // // if (len === 3) {
    const encInpVal = publicKey.encrypt(BigInt(data.value1));
    const encTaVal = publicKey.encrypt(BigInt(TAvalues.value1));
    // res.status(200).send({"inp":encInpVal.toString(), "ta":encTaVal.toString()})
    const negInp = publicKey.multiply(encInpVal, -1);
    diff = publicKey.addition(encTaVal, negInp);



  return res.json({"diff":diff.toString()})
  // return res.send({ diff: diff.toString() });
  // } else {
  //   for (let i = 2; i < Object.keys(data).length; i++) {}
  //   const inpVal1 = publicKey.encrypt(data.value1);
  //   const inpVal2 = publicKey.encrypt(data.value2);
  //   const taVal1 = publicKey.encrypt(TAvalues.value1);
  //   const taVal2 = publicKey.encrypt(TAvalues.value2);
  //   const negInp1 = publicKey.multiply(inpVal1);
  //   const negInp2 = publicKey.multiply(inpVal2);
  //   const diff1 = publicKey.addition(taVal1, negInp1);
  //   const diff2 = publicKey.addition(taVal2, negInp2);
  //   return res.send({ diff1: diff1.toString(), diff2: diff2.toString() });
  // }

  // } catch (error) {
  //   res.send(error);
  // }
});

router.post("/msp/search", bodyParser, async (req, res) => {
  try {
    if (req.body.emergency === false) {
      return res.send("MSP can be searched only in case of emergency");
    }
    const user = await User.findOne({ _id: req.body.userId });
    const msps = await MSP.find({ parameter: req.body.parameter });

    const key = user.publicKey;
    const n = BigInt(key.n);
    const g = BigInt(key.g);
    const publicKey = new paillier.PublicKey(n, g);

    const encInpVal = publicKey.encrypt(req.body.value);
    const negInp = publicKey.multiply(encInpVal, -1);

    let mspValues = [];

    msps.forEach((msp) => {
      let val = publicKey.encrypt(msp.value1);
      mspValues.push(val);
      // console.log(mspValues);
    });

    let diff = [];

    mspValues.forEach((val) => {
      let d = publicKey.addition(val, negInp);
      diff.push(d.toString());
      // console.log(diff);
    });

    let ref = [];
    for (let i = 0; i <= 20; i++) {
      let val = publicKey.encrypt(i);
      ref.push(val.toString());
    }

    res.send(diff);
  } catch (error) {
    res.send(error);
  }
});

const test = async (a) => {
  const pub =
    "eyJuIjoiMTE4NDQxMTk2MjM0NDE2NTg5NDciLCJfbjIiOiIxNDAyODMxNjk2NTQzOTU3ODQ5MzA4Njc0OTY1ODc0NjUxNDg4MDkiLCJnIjoiODMzOTkxNDgxNTA1ODAzNDE0NDM4ODMzOTQyNTEyMDc2MTI3NjkifQ==";

  const pvt =
    "eyJsYW1iZGEiOiI1OTIyMDU5ODA3OTkxNjg1MTQ4IiwibXUiOiIxMjY1NDI2MDA3OTgyODQ5NjQiLCJfcCI6IjUxNjUyNDkzOTkiLCJfcSI6IjIyOTMwMzkyNTMiLCJwdWJsaWNLZXkiOnsibiI6IjExODQ0MTE5NjIzNDQxNjU4OTQ3IiwiX24yIjoiMTQwMjgzMTY5NjU0Mzk1Nzg0OTMwODY3NDk2NTg3NDY1MTQ4ODA5IiwiZyI6IjgzMzk5MTQ4MTUwNTgwMzQxNDQzODgzMzk0MjUxMjA3NjEyNzY5In19";

    const pubStr = atob(pub)
    const pubJSON = JSON.parse(pubStr)
    const publicKey = new paillier.PublicKey(BigInt(pubJSON.n), BigInt(pubJSON.g))
    const pvtStr = atob(pvt)
    const pvtJSON = JSON.parse(pvtStr)
    // const publicKey = new paillier.PublicKey(BigInt(pvtJSON.publicKey.n), BigInt(pvtJSON.publicKey.g))
    const privateKey = new paillier.PrivateKey(BigInt(pvtJSON.lambda),BigInt(pvtJSON.mu),publicKey, BigInt(pvtJSON._p), BigInt(pvtJSON._q))
    // console.log(pvtJSON)
    // console.log(publicKey.encrypt(a))
    console.log(privateKey.decrypt(a))
};
test(88533400932603216925711766000324919052n)

module.exports = router;
