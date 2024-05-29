const jwt = require("jsonwebtoken");

class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
  createChildren() {
    this.left = new TreeNode(this.value + "0");
    this.right = new TreeNode(this.value + "1");
    return [this.left, this.right];
  }
}

function constructTree(level) {
  const root = new TreeNode("");
  let currentLevel = 0;
  const queue = [root];
  while (currentLevel < level) {
    const nodesAtCurrentLevel = queue.length;
    for (let i = 0; i < nodesAtCurrentLevel; i++) {
      const currentNode = queue.shift();
      const children = currentNode.createChildren();
      queue.push(...children);
    }
    currentLevel++;
  }
  return root;
}

function findNodesInPath(root, targetValue) {
  const nodesInPath = [];
  let current = root;
  while (current) {
    nodesInPath.push(current);
    if (current.value === targetValue) break;
    // current = targetValue.startsWith(current.value + "0")
    //   ? current.left
    //   : current.right;
    else if (targetValue.startsWith(current.value + "0") && current.left)
      current = current.left;
    else if (targetValue.startsWith(current.value + "1") && current.right)
      current = current.right;
    else return [];
  }
  return nodesInPath;
}

// function generateSetInRange(root, rangeStart, rangeEnd) {
//   const resultSet = new Set();
//   function traverse(node) {
//     if (!node) return;
//     const leftChildInRange =
//       node.left && node.left.value >= rangeStart && node.left.value <= rangeEnd;
//     const rightChildInRange =
//       node.right &&
//       node.right.value >= rangeStart &&
//       node.right.value <= rangeEnd;
//     if (leftChildInRange) resultSet.add(node.left.value);
//     if (rightChildInRange) resultSet.add(node.right.value);
//     traverse(node.left);
//     traverse(node.right);
//   }
//   traverse(root);
//   return Array.from(resultSet);
// }
// *****************************************************************
const helper = (a, b) => {
  if (!a || !b || !a.length || !b.length) {
    return false;
  }

  if (a.length != b.length) {
    return false;
  }
  // Check if the last element is not equal and rest are equal
  for (let i = 0; i < a.length - 1; i++) {
    if (a[i] != b[i]) {
      return false;
    }
  }
  return true;
};

function selectItemsInRange(start, end) {
  // 1. Create a list of all the nodes between start and end
  let k = end.toString(2);
  let len = k.length;
  const list = [];
  for (let i = start; i <= end; i++) {
    let a = i.toString(2);
    //append 0s and make all the elements of the same length as os start and end
    while (a.length < len) {
      a = "0" + a;
    }
    list.push(a);
  }

  // 2. Create the answer list
  const ans = [list[0]];

  // 3. Push each item of the list to the answer list
  //    and pop both if the last element is not equal and rest are equal
  for (let i = 1; i < list.length; i++) {
    ans.push(list[i]);

    if (ans.length < 2) {
      continue;
    }
    let siblings = helper(ans[ans.length - 1], ans[ans.length - 2]); // Check if they are siblings
    while (siblings) {
      let a = ans.pop();
      ans.pop();
      ans.push(a.slice(0, -1)); // Add the parent

      // Check for siblings again after popping
      siblings = helper(ans[ans.length - 1], ans[ans.length - 2]);
    }
  }
  return ans;
}


// *****************************************************************
function encodeArrayToTokens(stringArray, secretKey) {
  return stringArray.map((str) => jwt.sign({ data: str }, secretKey));
}

function xorStringMatch(constant, str1, str2) {
  if (str1.length != str2.length) {
    return false;
  }
  const diff = str1.length - constant.length;
  const nullChars = "\0".repeat(diff);
  const modConstant = constant + nullChars;
  const charCodes1 = str1.split("").map((char) => char.charCodeAt(0));
  const charCodes2 = str2.split("").map((char) => char.charCodeAt(0));
  const constCodes = modConstant.split("").map((char) => char.charCodeAt(0));
  const xorResults = charCodes1.map(
    (charCode, index) =>
      charCodes1[index] ^ charCodes2[index] ^ constCodes[index]
  );
  const result = String.fromCharCode(...xorResults);
  return result === modConstant;
}

function findMatchingPair(array1, array2, constant) {
  for (let i = 0; i < array1.length; i++) {
    for (let j = 0; j < array2.length; j++) {
      if (xorStringMatch(constant, array1[i], array2[j])) {
        return { str1: array1[i], str2: array2[j] };
      }
    }
  }
  return null;
}

module.exports = {
  TreeNode,
  constructTree,
  findNodesInPath,
  helper,
  selectItemsInRange,
  encodeArrayToTokens,
  xorStringMatch,
  findMatchingPair,
};
