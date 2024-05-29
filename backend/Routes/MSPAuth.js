const MSP = require("../models/MSP"); // Assuming this path is correct
const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { log } = require("console");
const UserMSP = require('../models/userMSP');

// Middleware to parse JSON bodies
router.use(express.json());
// Middleware to parse JSON bodies explicitly
const bodyParser = require('body-parser').json();

router.post('/login', bodyParser, (req, res) => {
  let {username, password} = req.body;
  console.log(req.body);
  if (username === "" || password === "") {
    req.loginResponse = {
      status: "FAILURE",
      message: "Input fields are empty"
    };
    res.json(req.loginResponse);
  } else {
    MSP.find({username}).then(result => {
      if (result.length) {
        const hashedpass = result[0].password;
        bcrypt.compare(password, hashedpass).then(data => {
          if (data) {
            req.loginResponse = {
              status: "Successfull",
              message: "Logged In Successfully!!",
              data: result,
            };
            console.log(result)
            res.json(req.loginResponse);
          } else {
            req.loginResponse = {
              status: "FAILURE",
              message: "Incorrect Password. Enter Again !!",
            };
            res.json(req.loginResponse);
          }
        }).catch(err => {
          console.log(err);
          req.loginResponse = {
            status: "FAILED",
            message: "Error occurred while checking user password",
          };
          res.json(req.loginResponse);
        });
      }
    }).catch(err => {
      console.log(err);
      req.loginResponse = {
        status: "FAILED",
        message: "MSP with this mail does not exist",
      };
      res.json(req.loginResponse);
    });
  }
});

router.post("/signup", bodyParser, async (req, res) => {
  function generateKeyPair() {
    const {publicKey, privateKey} = crypto.generateKeyPairSync("rsa", {
      modulusLength: 2048,
      publicKeyEncoding: {
        type: "spki",
        format: "pem",
      },
      privateKeyEncoding: {
        type: "pkcs8",
        format: "pem",
      },
    });
    return {publicKey, privateKey};
  }

  const {publicKey, privateKey} = generateKeyPair();
  
  try {
    const {username, email, password, phone, address, x, y, z} = req.body;

    if (username === "" || email === "" || password === "" || phone === "" || address === "" || x === "" || y === "" || z === "") {
      req.signupResponse = {
        status: "FAILURE",
        message: "Input fields are empty",
      };
      res.json(req.signupResponse);
    } else {
      MSP.find({email}).then((result) => {
        if (result.length) {
          req.signupResponse = {
            status: "FAILED",
            message: "User with this mail already exists!!",
          };
          res.json(req.signupResponse);
        } else {
          const saltRounds = 10;
          bcrypt.hash(password, saltRounds).then((hashedpass) => {
            const newMSP = new MSP({
              username: username,
              email: email,
              password: hashedpass,
              phone: phone,
              address: address,
              x: x,
              y: y,
              z: z,
              PublicKey: publicKey,
              PrivateKey: privateKey,
            });
            newMSP.save()
              .then((result) => {
                req.signupResponse = {
                  status: "Successfull",
                  message: "New MSP Created",
                  data: result,
                };
                res.json(req.signupResponse);
              })
              .catch((err) => {
                console.log(err);
                req.signupResponse = {
                  status: "FAILED",
                  message: "error occurred while hashing password!!",
                };
                res.json(req.signupResponse);
              });
          });
        }
      });
    }
  } catch (error) {
    console.error(error);
    req.signupResponse = {
      status: "FAILED",
      message: "error occurred while checking of existing MSP!!",
    };
    res.json(req.signupResponse);
  }
});

router.post("/senddata", bodyParser,(req, res) => {
  // Check if there's any response available from either login or signup
  console.log(req.loginResponse)
  console.log(req.signupResponse)
  if (req.loginResponse) {
    res.json(req.loginResponse);
  } else if (req.signupResponse) {
    res.json(req.signupResponse);
  } else {
    res.json({
      status: "FAILED",
      message: "No response available",
    });
  }
});

router.post('/userMSP', bodyParser, async (req, res) => {

  const { y1, y2, y3, publickey, privatekey } = req.body;
  console.log(req.body)
  console.log("backend")
  try {
    console.log({ y1: y1 })
    console.log({ y2: y2 })
    console.log({ y3: y3 })
    console.log({ publicKey :publickey})
    console.log({ privateKey :privatekey})
    // Query the userMSP collection for matching documents
    const matchingDocs = await UserMSP.find({ y1, y2, y3 });

    // Extract y1, y2, y3 from matching documents
    console.log(matchingDocs)
    console.log({privateKey: privatekey})
    // Extract y1, y2, y3 from matching documents
    const extractedData = matchingDocs.map(doc => ({
      x1: decryptValue(doc.x1,privatekey),
      x2: decryptValue(doc.x2,privatekey),
      x3: decryptValue(doc.x3,privatekey)
    }));

    // Send the extracted data in the response
    res.json(extractedData);
  } catch (error) {
    // Handle errors
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

function decryptValue(encryptedValue, privateKey) {
  console.log({ encryptedValue: encryptedValue, privateKey: privateKey})
  const buffer = Buffer.from(encryptedValue, 'base64');
  const decrypted = crypto.privateDecrypt(
    {
      key: privateKey,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: "sha256",
    },
    buffer
  );
  console.log(decrypted.toString());
  return decrypted.toString('utf8');
}

module.exports = router;
