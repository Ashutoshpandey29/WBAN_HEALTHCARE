// const P = require("./MU.js");

// const { Pcs, hash1, hashAll, N, signatureH, ePK, publicKey, } = require("./CS.js");
// // const mspLocation = [[42, 63, 65], [12, 13, 14], [1, 2, 3], [50, 51, 52]];
// const mspLocation = [42, 63, 65];
// //-----------------------------------------------------------------------

// //msp checks the integrity of ePK, publicKey, N, signatureH and hash1 using Pcs
// function checkIntegrity(ePK, publicKey, N, signatureH, hash1, Pcs) {
//   const hash2 = hashAll(ePK, publicKey, signatureH, N);
//   if (hash1 === hash2) {
//     return true; //we can even decypt the signature
//   }
//   return false;
// }

// //function call
// const integrity = checkIntegrity(ePK, publicKey, N, signatureH, hash1, Pcs);
// console.log("Integrity:", integrity);

// if(!integrity)
//   console.log("Integrity check failed");
// //stop the process if integrity check fails

// //-----------------------------------------------------------------------------
// //generate public and private key pair for MSP
// const crypto = require('crypto');

// function generateKeys() {
//   const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
//     modulusLength: 2048,
//     publicKeyEncoding: {
//       type: 'pkcs1',
//       format: 'pem'
//     },
//     privateKeyEncoding: {
//       type: 'pkcs1',
//       format: 'pem'
//     }
//   });

//   return { publicKey, privateKey };
// }

// //function call to generate public key as PK and private key as PR
// const { publicKey: PKmsp, privateKey: PRmsp } = generateKeys();

// console.log("Public Key:", PKmsp);
// console.log("Private Key:", PRmsp);


// //--------------------------------------------------------------------------


// console.log("MSP Location:", mspLocation);

// //function to multiply the vector mspLocation with
// function matrixMultiply(matrix, vector) {
//   const result = [];
//   for (let i = 0; i < matrix.length; i++) {
//     const rowResult = [];
//     for (let j = 0; j < matrix[i].length; j++) {
//       rowResult.push(matrix[i][j] * vector[j]);
//     }
//     result.push(rowResult);
//   }
//   return result;
// }


// //function to encrypt the genrated matrix using public key
// function concealLocation(matrix, publicKey) {
//   const Concealed_location = matrixMultiply(matrix, mspLocation);
//   return publicKey.encrypt(Concealed_location);
// }

// //function call
// const CLs = concealLocation(P, publicKey);
// console.log("Concealed Location:", CLs);

// //-----------------------------------------------------------------------
// //encrypting the location square using public key
// function encryptLocationSquare(locationSquare, publicKey) {
//   return publicKey.encrypt(locationSquare);
// }

// //function for location square
// const locationSquare = mspLocation.reduce((sum, val) => sum + val ** 2n, 0n);

// //function call
// const ELS = encryptLocationSquare(locationSquare, publicKey);
// console.log("Encrypted Location Square:", ELS);

// //-----------------------------------------------------------------------
// // CIPHERTEXT
// // Compute the sum of the vector mspLocation
// function sumVector(vector) {
//   return vector.reduce((sum, val) => sum + val, 0n);
// }

// //compute the sum of squares of the vector mspLocation
// function sumSquares(vector) {
//   return vector.reduce((sum, val) => sum + val ** 2n, 0n);
// }

// //append the sumVector and sumSquares to PK
// const sumV = sumVector(mspLocation);
// const sumS = sumSquares(mspLocation);
// const T = publicKey.encrypt(PKmsp + sumV + sumS);

// console.log("T:", T);

// //-----------------------------------------------------------------------

// //msp encrypts (CLs, ELs, N, T) using Pcs and store in Cs and send to Cs
// function encryptData(CLs, ELS, N, T, Pcs) {
//   const data = [CLs, ELS, N, T];
//   return data.map((val) => Pcs.encrypt(val));
// }

// // Function call
// const Cs = encryptData(CLs, ELS, N, T, Pcs);
// console.log("Encrypted Data:", Cs);
// // it returns a list should it return a value

// //function to encrypt location of the msp
// function encryptLocation(location, Pcs) {
//   return publicKey.encrypt(location);
// }

// //function call
// const ELmsp = encryptLocation(mspLocation, Pcs);

// //-----------------------------------------------------------------------
// module.exports = {Cs, ELmsp};
// //call the function in CS
