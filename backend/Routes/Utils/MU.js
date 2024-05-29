// const paillier = require("paillier-bigint");
// const N = 1024;

// // function generateInvertibleMatrix() {
// //   let matrix;
// //   do {
// //     matrix = [
// //       [
// //         BigInt(Math.floor(Math.random() * N)),
// //         BigInt(Math.floor(Math.random() * N)),
// //         BigInt(Math.floor(Math.random() * N)),
// //       ],
// //       [
// //         BigInt(Math.floor(Math.random() * N)),
// //         BigInt(Math.floor(Math.random() * N)),
// //         BigInt(Math.floor(Math.random() * N)),
// //       ],
// //       [
// //         BigInt(Math.floor(Math.random() * N)),
// //         BigInt(Math.floor(Math.random() * N)),
// //         BigInt(Math.floor(Math.random() * N)),
// //       ],
// //     ];
// //   } while (matrixDeterminant(matrix) == BigInt(0));
// //   return matrix;
// // }

// // function calculateAdjugate(matrix) {
// //   const [a, b, c] = matrix[0];
// //   const [d, e, f] = matrix[1];
// //   const [g, h, i] = matrix[2];

// //   return [
// //     [e * i - f * h, c * h - b * i, b * f - c * e],
// //     [f * g - d * i, a * i - c * g, c * d - a * f],
// //     [d * h - e * g, b * g - a * h, a * e - b * d],
// //   ];
// // }

// // function scalarMultiply(matrix, scalar) {
// //   return matrix.map((row) => row.map((element) => element * scalar));
// // }

// // function matrixInverse(matrix) {
// //   const detInv = BigInt(1) / matrixDeterminant(matrix);
// //   const adjugate = calculateAdjugate(matrix);
// //   const inverse = scalarMultiply(adjugate, detInv);
// //   return inverse;
// // }

// // function matrixDeterminant(matrix) {
// //   const [a, b, c] = matrix[0];
// //   const [d, e, f] = matrix[1];
// //   const [g, h, i] = matrix[2];

// //   return a * (e * i - f * h) - b * (d * i - f * g) + c * (d * h - e * g);
// // }
  
// const MODULUS = BigInt(101); // Using a prime number for modular arithmetic

// function generateInvertibleMatrix() {
//   let matrix, det;
//   do {
//     matrix = [
//       [
//         BigInt(Math.floor(Math.random() * 100)),
//         BigInt(Math.floor(Math.random() * 100)),
//         BigInt(Math.floor(Math.random() * 100)),
//       ],
//       [
//         BigInt(Math.floor(Math.random() * 100)),
//         BigInt(Math.floor(Math.random() * 100)),
//         BigInt(Math.floor(Math.random() * 100)),
//       ],
//       [
//         BigInt(Math.floor(Math.random() * 100)),
//         BigInt(Math.floor(Math.random() * 100)),
//         BigInt(Math.floor(Math.random() * 100)),
//       ],
//     ];
//     det = matrixDeterminant(matrix) % MODULUS;
//   } while (gcd(det, MODULUS) !== BigInt(1));
//   return matrix;
// }

// function gcd(a, b) {
//   if (b == 0) return a;
//   return gcd(b, a % b);
// }

// function matrixDeterminant(matrix) {
//   const [a, b, c] = matrix[0];
//   const [d, e, f] = matrix[1];
//   const [g, h, i] = matrix[2];
//   return a * (e * i - f * h) - b * (d * i - f * g) + c * (d * h - e * g);
// }

// function calculateAdjugate(matrix) {
//   const [a, b, c] = matrix[0];
//   const [d, e, f] = matrix[1];
//   const [g, h, i] = matrix[2];
//   return [
//     [
//       (e * i - f * h) % MODULUS,
//       (c * h - b * i) % MODULUS,
//       (b * f - c * e) % MODULUS,
//     ],
//     [
//       (f * g - d * i) % MODULUS,
//       (a * i - c * g) % MODULUS,
//       (c * d - a * f) % MODULUS,
//     ],
//     [
//       (d * h - e * g) % MODULUS,
//       (b * g - a * h) % MODULUS,
//       (a * e - b * d) % MODULUS,
//     ],
//   ].map((row) => row.map((val) => (val < 0 ? val + MODULUS : val)));
// }

// function scalarMultiply(matrix, scalar) {
//   scalar = scalar % MODULUS;
//   return matrix.map((row) =>
//     row.map((element) => (element * scalar) % MODULUS)
//   );
// }

// function matrixInverse(matrix) {
//   let det = matrixDeterminant(matrix) % MODULUS;
//   if (det < 0) det += MODULUS;
//   const detInv = modularInverse(det, MODULUS);
//   const adjugate = calculateAdjugate(matrix);
//   return scalarMultiply(adjugate, detInv);
// }

// function modularInverse(a, modulus) {
//   a = a % modulus;
//   for (let x = 1n; x < modulus; x++) {
//     if ((a * x) % modulus == 1n) return x;
//   }
//   return 1n; // Should not happen if matrix is invertible
// }

// function matrixMultiply(matrix, vector) {
//   return matrix.map((row) =>
//     row.map((element, index) => element * vector[index])
//   );
// }

// function generateKeys() {
//   const p = BigInt(23);
//   const q = BigInt(29);
//   const publicKey = new paillier.PublicKey(p, q);
//   const privateKey = new paillier.PrivateKey(p, q, publicKey);

//   return { publicKey, privateKey };
// }

// // Function to encrypt the value (x1^2 + x2^2 + x3^2) using Paillier encryption
// function encryptLocationSquare(locationSquare, publicKey) {
//   return publicKey.encrypt(locationSquare);
// }

// // Function to generate the signature H using a hash function
// function generateSignature(P, N, publicKey) {
//   const hashInput = publicKey.encrypt(matrixDeterminant(P));
//   return hash(hashInput, N, publicKey);
// }

// // Hash function
// function hash(...args) {
//   const crypto = require("crypto");
//   const hash = crypto.createHash("sha256");
//   args.forEach((arg) => hash.update(arg.toString()));
//   return hash.digest("hex");
// }

// // Generate MU location---->cannot use floating point val
// const muLocation = [BigInt(22), BigInt(33), BigInt(25)];
// console.log("MU Location:", muLocation);

// // Step 1: Generate invertible matrix P
// const P = generateInvertibleMatrix();

// // Step 2: Conceal location in C_lu
// const PInverse = matrixInverse(P, N);
// const concealedLocation = matrixMultiply(PInverse, muLocation);
// console.log("Concealed Location:", concealedLocation);

// // Step 3: Encrypt location in E_lu
// const { publicKey, privateKey } = generateKeys();
// const locationSquare = muLocation.reduce((sum, val) => sum + val ** 2n, 0n);
// const encryptedLocationSquare = encryptLocationSquare(
//   locationSquare,
//   publicKey
// );
// console.log("Encrypted Location Square:", encryptedLocationSquare);

// // Step 4: Generate signature H
// const signatureH = generateSignature(P, N, publicKey);
// console.log("Signature H:", signatureH);

// //ePK MU encrypt each value of the matrix
// const ePK = publicKey.encrypt(P);
// console.log("Encrypted P:", ePK);

// module.exports = {
//   signatureH,
//   concealedLocation,
//   encryptedLocationSquare,
//   N,
//   ePK,
//   publicKey,
//   P,
// };

// // const { Epkmud2Values, EpkmuFs } = require("./CS.js");

// // function matchFs(Epkmud2Values, EpkmuFs, privateKey) {
// //   const Fs = privateKey.decrypt(EpkmuFs);
// //   const decryptedValues = Epkmud2Values.map((val) => privateKey.decrypt(val));

// //   for (let i = 0; i < decryptedValues.length; i++) {
// //     if (decryptedValues[i] === Fs) {
// //       return i;
// //     }
// //   }

// //   return -1;
// // }

// // const selectedMSP = matchFs(Epkmud2Values, EpkmuFs, privateKey);
// // console.log(selectedMSP);
