const crypto = require("crypto");

function generateKeyPair() {
  const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
    modulusLength: 2048, // the length of your key in bits
    publicKeyEncoding: {
      type: "spki", // recommended to be 'spki' by the Node.js docs
      format: "pem",
    },
    privateKeyEncoding: {
      type: "pkcs8", // recommended to be 'pkcs8' by the Node.js docs
      format: "pem",
    },
  });
  return { publicKey, privateKey };
}

function decryptVector(encryptedVector, privateKey) {
  return encryptedVector.map((encryptedElement) => {
    const buffer = Buffer.from(encryptedElement, "base64");
    const decrypted = crypto.privateDecrypt(
      {
        key: privateKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      },
      buffer
    );
    return decrypted.toString("utf8"); // Assumes the original data was strings; parse if necessary
  });
}

function decryptValue(encryptedValue, privateKey) {
  const buffer = Buffer.from(encryptedValue, "base64");
  const decrypted = crypto.privateDecrypt(
    {
      key: privateKey,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
    },
    buffer
  );
  return decrypted.toString("utf8");
}

function calculateDistance(vec1, vec2) {
  return vec1.reduce((acc, cur, idx) => {
    // Convert both current elements of vec1 and vec2 to numbers
    const num1 = parseFloat(cur);
    const num2 = parseFloat(vec2[idx]);
    // Calculate squared difference
    return acc + Math.pow(num1 - num2, 2);
  }, 0);
}

// function findClosestVector(data, targetVector, privateKey) {
//   let minDistance = Infinity;
//   let closestVector = null;

//   data.forEach(([Cs, ELmsp]) => {
//     const decryptedVector = decryptVector(ELmsp, privateKey);
//     const distance = calculateDistance(decryptedVector, targetVector);
//     if (distance < minDistance) {
//       minDistance = distance;
//       closestVector = decryptedVector;
//     }
//   });

//   return closestVector;
// }

function findClosestVector(data, targetVector, privateKey) {
  let minDistance = Infinity;
  let closestVector = null;
  let closestPhone = null;
  let closestAddress = null;
  let PK = null;

  data.forEach(([Cs, ELmsp, encryptedPhone, encryptedAddress, PKmsp]) => {
    const decryptedVector = decryptVector(ELmsp, privateKey);
    const distance = calculateDistance(decryptedVector, targetVector);
    if (distance < minDistance) {
      minDistance = distance;
      closestVector = decryptedVector;
      closestPhone = decryptValue(encryptedPhone, privateKey);
      closestAddress = decryptValue(encryptedAddress, privateKey);
      PK = PKmsp;
      // closestPhone = encryptedPhone;
      // closestAddress = encryptedAddress;
    }
  });

  return { closestVector, closestPhone, closestAddress, minDistance , PK};
}


function hashAll(...args) {
  const hash = crypto.createHash("sha256");
  args.forEach((arg) => hash.update(arg.toString()));
  return hash.digest("hex");
}
function decryptloc(encryptedVector, publicKey) {
  return encryptedVector.map((encryptedElement) => {
    const buffer = Buffer.from(encryptedElement, "base64");
    const decrypted = crypto.publicDecrypt(
      {
        key: publicKey,
        padding: crypto.constants.RSA_PKCS1_PADDING,
      },
      buffer
    );
    return decrypted.toString("utf8"); // Assuming the original data was in string format
  });
}

function encryptloc(vector, publicKey) {
  return vector.map((element) => {
    const buffer = Buffer.from(element.toString());
    const encrypted = crypto.publicEncrypt(
      {
        key: publicKey,
        padding: crypto.constants.RSA_PKCS1_PADDING,
      },
      buffer
    );
    return encrypted.toString("base64");
  });
}

function encryptValue(value, publicKey) {
  const buffer = Buffer.from(value.toString());
  const encrypted = crypto.publicEncrypt(
    {
      key: publicKey,
      padding: crypto.constants.RSA_PKCS1_PADDING,
    },
    buffer
  );
  return encrypted.toString("base64");
}

module.exports = {
  generateKeyPair,
  decryptVector,
  calculateDistance,
  findClosestVector,
  hashAll,
  decryptloc,
  encryptloc,
  encryptValue,
};
