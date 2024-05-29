// const crypto = require("crypto");

// // Function to generate a public and private key pair
// function generateKeyPair() {
//   const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
//     modulusLength: 2048, // the length of your key in bits
//     publicKeyEncoding: {
//       type: "spki", // recommended to be 'spki' by the Node.js docs
//       format: "pem",
//     },
//     privateKeyEncoding: {
//       type: "pkcs8", // recommended to be 'pkcs8' by the Node.js docs
//       format: "pem",
//     },
//   });
//   return { publicKey, privateKey };
// }

// // Function to encrypt a vector of numbers using the public key
// function encryptVector(vector, publicKey) {
//   return vector.map((element) => {
//     const buffer = Buffer.from(element.toString());
//     const encrypted = crypto.publicEncrypt(
//       {
//         key: publicKey,
//         padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
//       },
//       buffer
//     );
//     return encrypted.toString("base64");
//   });
// }

// // Function to decrypt an encrypted vector using the private key
// function decryptVector(encryptedVector, privateKey) {
//   return encryptedVector.map((encryptedElement) => {
//     const buffer = Buffer.from(encryptedElement, "base64");
//     const decrypted = crypto.privateDecrypt(
//       {
//         key: privateKey,
//         padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
//       },
//       buffer
//     );
//     return decrypted.toString("utf8");
//   });
// }

// // Generate public and private keys
// const { publicKey, privateKey } = generateKeyPair();

// // Example vector to encrypt
// const X = [5, 6, 7];

// // Encrypt the vector
// const encryptedVector = encryptVector(X, publicKey);
// console.log('Encrypted Vector:', encryptedVector);

// // Decrypt the vector
// const decryptedVector = decryptVector(encryptedVector, privateKey);
// console.log('Decrypted Vector:', decryptedVector);


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

function calculateDistance(vec1, vec2) {
  return vec1.reduce((acc, cur, idx) => {
    // Convert both current elements of vec1 and vec2 to numbers
    const num1 = parseFloat(cur);
    const num2 = parseFloat(vec2[idx]);
    // Calculate squared difference
    return acc + Math.pow(num1 - num2, 2);
  }, 0);
}

function findClosestVector(data, targetVector, privateKey) {
  let minDistance = Infinity;
  let closestVector = null;

  data.forEach(([Cs, ELmsp]) => {
    const decryptedVector = decryptVector(ELmsp, privateKey);
    const distance = calculateDistance(decryptedVector, targetVector);
    if (distance < minDistance) {
      minDistance = distance;
      closestVector = Cs;
    }
  });

  return closestVector;
}

const { publicKey, privateKey } = generateKeyPair();

// Define some sample vectors and a target vector
const vectors = [
  [10, 3, 1],
  [1, 2, 3],
  [4, 5, 6],
];
const targetVector = [4, 3, 2];

// Encrypt the vectors
const encryptedVectors = vectors.map((vec) => encryptVector(vec, publicKey));

// Prepare data in the required format [{Cs, ELmsp}, ...]
const data = encryptedVectors.map((ELmsp, index) => [index, ELmsp]);
console.log(data);
// Find the closest vector
const closestVectorIndex = findClosestVector(data, targetVector, privateKey);
console.log(
  `The closest vector is at index: ${closestVectorIndex}, Original vector:`,
  vectors[closestVectorIndex]
);
