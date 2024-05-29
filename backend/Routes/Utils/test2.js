// const paillier = require("paillier-bigint");
// const N = 1024;


// function generateInvertibleMatrix() {
//   let matrix;
//   do {
//     matrix = [
//       [
//         BigInt(Math.floor(Math.random() * N)),
//         BigInt(Math.floor(Math.random() * N)),
//         BigInt(Math.floor(Math.random() * N)),
//       ],
//       [
//         BigInt(Math.floor(Math.random() * N)),
//         BigInt(Math.floor(Math.random() * N)),
//         BigInt(Math.floor(Math.random() * N)),
//       ],
//       [
//         BigInt(Math.floor(Math.random() * N)),
//         BigInt(Math.floor(Math.random() * N)),
//         BigInt(Math.floor(Math.random() * N)),
//       ],
//     ];
//   } while (matrixDeterminant(matrix)==(BigInt(0)));
//   return matrix;
// }

// function calculateAdjugate(matrix) {
//   const [a, b, c] = matrix[0];
//   const [d, e, f] = matrix[1];
//   const [g, h, i] = matrix[2];

//   return [
//     [e * i - f * h, c * h - b * i, b * f - c * e],
//     [f * g - d * i, a * i - c * g, c * d - a * f],
//     [d * h - e * g, b * g - a * h, a * e - b * d],
//   ];
// }

// function scalarMultiply(matrix, scalar) {
//   return matrix.map((row) => row.map((element) => element * scalar));
// }

// function matrixInverse(matrix) {
//   const detInv = BigInt(1) / matrixDeterminant(matrix);
//   const adjugate = calculateAdjugate(matrix);
//   const inverse = scalarMultiply(adjugate, detInv);
//   return inverse;
// }

// function matrixDeterminant(matrix) {
//    const [a, b, c] = matrix[0];
//    const [d, e, f] = matrix[1];
//    const [g, h, i] = matrix[2];

//    return a * (e * i - f * h) - b * (d * i - f * g) + c * (d * h - e * g);
// }

// function matrixMultiply(matrix, vector) {
//   return [
//     matrix[0][0] * vector[0] +
//       matrix[0][1] * vector[1] +
//       matrix[0][2] * vector[2],
//     matrix[1][0] * vector[0] +
//       matrix[1][1] * vector[1] +
//       matrix[1][2] * vector[2],
//     matrix[2][0] * vector[0] +
//       matrix[2][1] * vector[1] +
//       matrix[2][2] * vector[2],
//   ];
// }

// function generateKeys() {
// //   const p = generateRandomPrime(512);
// //   const q = generateRandomPrime(512); 
//     const p = BigInt(23);
//     const q = BigInt(29);
//   const publicKey = new paillier.PublicKey(p, q);
//   const privateKey = new paillier.PrivateKey(p, q, publicKey);

//   return { publicKey, privateKey };
// }

// function encryptLocationSquare(locationSquare, publicKey) {
//   return publicKey.encrypt(locationSquare);
// }

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

// // Generate MU location
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