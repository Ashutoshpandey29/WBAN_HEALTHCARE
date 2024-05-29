const crypto = require("crypto");

function hashAll(...args) {
  const crypto = require("crypto");
  const hash = crypto.createHash("sha256");
  args.forEach((arg) => hash.update(arg.toString()));
  return hash.digest("hex");
}
// Check integrity function
function checkIntegrity(ePK, publicKey, N, signatureH, hash1, Pcs) {
  const hash2 = hashAll(ePK, publicKey, signatureH, N);
  return hash1 === hash2;
}

// Generate key pair function
function generateKeys() {
  const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: "pkcs1",
      format: "pem",
    },
    privateKeyEncoding: {
      type: "pkcs1",
      format: "pem",
    },
  });
  return { publicKey, privateKey };
}

// Matrix multiply function
function matrixMultiply(matrix, vector) {
  return matrix.map((row) => row.map((val, index) => val * vector[index]));
}

// Function to encrypt data
// function encryptData(data, Pcs) {
//   return data.map((val) => Pcs.encrypt(val.toString()));
// }
function encryptData(data, publicKey) {
  return data.map((val) => {
    // Convert each value to a string and encrypt it
    const buffer = Buffer.from(val.toString(), "utf8");
    const encrypted = crypto.publicEncrypt(publicKey, buffer);
    return encrypted.toString("base64"); // Convert encrypted data to base64 string for easy handling
  });
}

function encryptVector(vector, publicKey) {
  return vector.map((element) => {
    const buffer = Buffer.from(element.toString());
    const encrypted = crypto.publicEncrypt(
      {
        key: publicKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
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
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
    },
    buffer
  );
  return encrypted.toString("base64");
}


function rsaEncrypt(data, publicKeyPem) {
  const buffer = Buffer.from(data.toString());
  const encrypted = crypto.publicEncrypt(
    {
      key: publicKeyPem,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: "sha256",
    },
    buffer
  );
  return encrypted.toString("base64");
}

module.exports = {
  checkIntegrity,
  generateKeys,
  matrixMultiply,
  encryptData,
  hashAll,
  rsaEncrypt,
  encryptVector,
  encryptValue
};
