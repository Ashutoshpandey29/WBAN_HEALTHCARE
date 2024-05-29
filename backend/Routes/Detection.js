const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const bodyParser = require("body-parser").json();

const {
  TreeNode,
  constructTree,
  findNodesInPath,
  helper,
  selectItemsInRange,
  encodeArrayToTokens,
  findMatchingPair,
} = require("./Utils/Detection_util.js");

const Parameters = require("./TAentry.js");

router.post("/detect", bodyParser, (req, res) => {
  const secretKey = process.env.SECRET_KEY;
  const normal = process.env.NORMAL;
  const n = 16;
  let results = {};

  try {
    Parameters.forEach((param) => {
      const targetValue = req.body[param.text];
      if (targetValue !== undefined) {
        const targetValueBinary = targetValue.toString(2);
        const rangeStartBinary = param.min.toString(2);
        const rangeEndBinary = param.max.toString(2);

        const root = constructTree(n);
        const nodesInPath = findNodesInPath(root, targetValueBinary);
        const valuesInPath = nodesInPath.map((node) => node.value);
        const resultSet = selectItemsInRange(
          rangeStartBinary,
          rangeEndBinary
        );

        const pathSet = encodeArrayToTokens(valuesInPath, secretKey);
        const rangeSet = encodeArrayToTokens(resultSet, secretKey);

        const matchingPair = findMatchingPair(pathSet, rangeSet, normal);

        if (matchingPair) {
          results[param.text] = "Normal";
        } else {
          results[param.text] = "Critical";
        }
      } else {
        results[param.text] = "Not Provided";
      }
    });
    console.log(results);
    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.toString());
  }
});

const points = [
  [9, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [-1, -2, -3],
];

function distance(vector1, vector2) {
  let result = 0;
  for (let i = 0; i < vector1.length; i++) {
    result += (vector1[i] - vector2[i]) ** 2;
  }
  return result;
}

router.post("/search", bodyParser, (req, res) => {
  const x = req.body.x;
  const y = req.body.y;
  const z = req.body.z;
  const vector = [x, y, z];

  if (!vector || vector.length !== 3) {
    return res.status(400).send("Invalid input vector");
  }

  let minDistanceSquared = Infinity;
  let closestPoint = [];
  let closestIndex = -1;

  // Calculate the squared distance from the input vector to each point in the set
  points.forEach((point, index) => {
    const distanceSquared = distance(vector, point);
    if (distanceSquared < minDistanceSquared) {
      minDistanceSquared = distanceSquared;
      closestPoint = point;
      closestIndex = index;
    }
  });

  res.status(200).json({
    closestPoint,
    closestIndex,
  });
});

module.exports = router;