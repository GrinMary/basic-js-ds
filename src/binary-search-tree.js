const { NotImplementedError } = require('../lib');
const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.treeRoot = null;
  }

  root() {
    return this.treeRoot;
  }

  add(data) {
    const insert = (node) => {
      if (data < node.data) {
        if (node.left === null) {
          node.left = new Node(data);
        } else {
          insert(node.left);
        }
      } else if (data > node.data) {
        if (node.right === null) {
          node.right = new Node(data);
        } else {
          insert(node.right);
        }
      }
    };

    if (this.treeRoot === null) {
      this.treeRoot = new Node(data);
    } else {
      insert(this.treeRoot);
    }
  }

  find(data) {
    let current = this.treeRoot;
    while (current !== null) {
      if (data === current.data) {
        return current;
      }
      current = data < current.data ? current.left : current.right;
    }
    return null;
  }

  has(data) {
    return this.find(data) !== null;
  }

  remove(data) {
    const removeNode = (node, data) => {
      if (node === null) {
        return null;
      }
      if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
      } else if (data > node.data) {
        node.right = removeNode(node.right, data);
        return node;
      } else {
        if (node.left === null && node.right === null) {
          return null;
        }
        if (node.left === null) {
          return node.right;
        }
        if (node.right === null) {
          return node.left;
        }
        let minRight = node.right;
        while (minRight.left !== null) {
          minRight = minRight.left;
        }
        node.data = minRight.data;
        node.right = removeNode(node.right, minRight.data);
        return node;
      }
    };
    this.treeRoot = removeNode(this.treeRoot, data);
  }

  min() {
    if (this.treeRoot === null) return null;
    let current = this.treeRoot;
    while (current.left !== null) {
      current = current.left;
    }
    return current.data;
  }

  max() {
    if (this.treeRoot === null) return null;
    let current = this.treeRoot;
    while (current.right !== null) {
      current = current.right;
    }
  return current.data;
  }
}

module.exports = {
  BinarySearchTree
};
