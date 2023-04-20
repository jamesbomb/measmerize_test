export function createTree(nodes) {
  const nodeMap = new Map();
  const roots = [];

  nodes.forEach((node) => {
    node.children = [];
    nodeMap.set(node.nodeId, node);
  });

  nodes.forEach((node) => {
    if (node.parentId === null) {
      roots.push(node);
    } else {
      const parentNode = nodeMap.get(node.parentId);
      parentNode.children.push(node);
    }
  });

  roots.forEach((root) => {
    sortChildren(root);
  });

  return roots;
}

export function sortChildren(parentNode) {
  const children = parentNode.children;
  parentNode.children = [];

  while (children.length > 0) {
    let previousSiblingId =
      parentNode.children.length === 0
        ? null
        : parentNode.children[parentNode.children.length - 1].nodeId;
    const childIndex = children.findIndex(
      (child) => child.previousSiblingId === previousSiblingId
    );

    if (childIndex !== -1) {
      const childNode = children[childIndex];
      parentNode.children.push(childNode);
      children.splice(childIndex, 1);
      sortChildren(childNode);
    } else {
      break;
    }
  }
}
