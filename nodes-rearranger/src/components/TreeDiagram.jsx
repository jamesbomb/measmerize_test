import React, { useEffect, useRef, useState } from "react";

import { Tree } from "react-d3-tree";

const TreeDiagram = ({ treeData }) => {
  const containerRef = useRef();

  const treeWrapper = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "500px",
    overflow: "visible",
  };

  return (
    <div style={treeWrapper} ref={containerRef}>
      <Tree
        data={treeData}
        rootNodeClassName="node__root"
        branchNodeClassName="node__branch"
        leafNodeClassName="node__leaf"
        translate={{ x: 50, y: 50 }}
        orientation="vertical"
        pathFunc="straight"
      />
    </div>
  );
};

export default TreeDiagram;
