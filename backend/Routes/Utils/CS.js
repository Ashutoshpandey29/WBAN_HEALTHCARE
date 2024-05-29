const {
  signatureH,
  concealedLocation,
  encryptedLocationSquare,
  N,
  ePK,
  publicKey,
} = require("./MU.js");
const paillier = require("paillier-bigint");

//generate a hash of all imported values
function hashAll(...args) {
  const crypto = require("crypto");
  const hash = crypto.createHash("sha256");
  args.forEach((arg) => hash.update(arg.toString()));
  return hash.digest("hex");
}

var mspVector = [
  [1, 2, 3],
  [50, 51, 52],
];

var muvector = [10, 10, 10];

function generateKeys() {
  const p = BigInt(47);
  const q = BigInt(79);
  const publicKey = new paillier.PublicKey(p, q);
  const privateKey = new paillier.PrivateKey(p, q, publicKey);
  return { publicKey, privateKey };
}

//function call to generate public key as Pcs and private key as PRcs
const { publicKey: Pcs, privateKey: PRcs } = generateKeys();

console.log("Public Key:", Pcs);
console.log("Private Key:", PRcs);

//function call
const hash1 = hashAll(ePK, publicKey, signatureH, N);

console.log("Hash of all imported values:", hash1);
console.log("Broadcasted values:", ePK, publicKey, N, signatureH, hash1);
module.exports = { Pcs, PRcs, hash1, hashAll };

// Appended Code Blocks
const Cs = require("./medical_service_provider.js");

function decryptCs(Cs, privateKeyCS) {
  const decrypted = Cs.map((val) => privateKeyCS.decrypt(val));
  return decrypted;
}

// Function to compare N received from MU with the N received from MSP
function compareN(NfromMU, NfromMSP) {
  if (NfromMU !== NfromMSP) {
    return false; // Discard MSP response
  }
  return true;
}

// Function to compute EPKmu (d^2)
function computeEPKmuD2(vector1, vector2) {
  let result = 0;
  for (let i = 0; i < vector1.length; i++) {
    result += (vector1[i] - vector2[i]) ** 2;
  }

  const Epkmud2 = PKmu.encrypt(result);
  return Epkmud2;
}

function computeEpkmud2For2DVector(vector, vectors2D, PKmu) {
  const Epkmud2Values = vectors2D.map((vector2) =>
    computeEPKmuD2(vector, vector2, PKmu)
  );
  return Epkmud2Values;
}

const Epkmud2Values = computeEpkmud2For2DVector(muvector, mspVector, PKmu);

function computeEPKmufs(values, PKmu) {
  const minValue = Math.min(...values);
  const epkmufs = PKmu.encrypt(minValue);
  return epkmufs;
}

const epkmufs = computeEPKmufs(Epkmud2Values, PKmu);

module.exports = {
  Epkmud2Values,
  epkmufs,
};
