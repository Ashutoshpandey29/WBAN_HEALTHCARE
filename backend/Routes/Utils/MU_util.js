const crypto = require("crypto");
const math = require("mathjs");
const N = 1024;
function generateInvertibleMatrix(size = 3) {
  let matrix, det;
  do {
    matrix = math.randomInt([size, size], 1, 100);
    det = math.det(matrix);
  } while (det === 0);
  return matrix;
}

function calculateInverse(matrix) {
  try {
    return math.inv(matrix);
  } catch (error) {
    console.error("Failed to calculate inverse:", error);
    return null;
  }
}

function matrixMultiply(matrix, vector) {
  return matrix.map((row) =>
    row.map((element, index) => element * vector[index])
  );
}

function generateKeys() {
  const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
    modulusLength: 2048,
    publicKeyEncoding: { type: "spki", format: "pem" },
    privateKeyEncoding: { type: "pkcs8", format: "pem" },
  });
  return { publicKey, privateKey };
}

function encryptData(data, publicKey) {
  const buffer = Buffer.from(data.toString());
  const encrypted = crypto.publicEncrypt(publicKey, buffer);
  return encrypted.toString("base64");
}

function generateSignature(data, privateKey) {
  const sign = crypto.createSign("SHA256");
  sign.update(data.toString());
  sign.end();
  return sign.sign(privateKey, "base64");
}
function encryptDet(data, publicKey) {
  const buffer = Buffer.from(data.toString());
  const encrypted = crypto.publicEncrypt(
    {
      key: publicKey,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: "sha256",
    },
    buffer
  );
  return encrypted.toString("base64");
}

function encryptVector(vector, privateKey) {
  return vector.map((element) => {
    const buffer = Buffer.from(element.toString());
    const encrypted = crypto.privateEncrypt(
      {
        key: privateKey,
        padding: crypto.constants.RSA_PKCS1_PADDING,
      },
      buffer
    );
    return encrypted.toString("base64");
  });
}

function decryptloc(encryptedVector, privateKey) {
  // Decrypt each base64-encoded string in the vector
  // console.log(encryptedVector);
  const decryptedVector = encryptedVector.map((encryptedElement) => {
    const buffer = Buffer.from(encryptedElement, "base64"); // Convert from base64 to Buffer
    const decrypted = crypto.privateDecrypt(
      {
        key: privateKey,
        padding: crypto.constants.RSA_PKCS1_PADDING,
      },
      buffer
    );
    return decrypted.toString("utf8"); // Convert the decrypted Buffer back to a string
  });
  return decryptedVector;
}

function decryptValue(encryptedValue, privateKey) {
  // console.log(encryptedValue);
  const buffer = Buffer.from(encryptedValue, "base64");
  const decrypted = crypto.privateDecrypt(
    {
      key: privateKey,
      padding: crypto.constants.RSA_PKCS1_PADDING,
    },
    buffer
  );
  return decrypted.toString("utf8");
}

module.exports = {
  generateInvertibleMatrix,
  calculateInverse,
  matrixMultiply,
  generateKeys,
  encryptData,
  generateSignature,
  N,
  encryptDet,
  encryptVector,
  decryptloc,
  decryptValue,
};
