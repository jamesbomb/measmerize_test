import "./App.css";

import React, { useEffect, useState } from "react";

import FileInput from "./components/FileInput";
import TreeDiagram from "./components/TreeDiagram";
import { createTree } from "./utils/treeFunctions";
import { saveAs } from "file-saver";

function App() {
  const [inputFile, setInputFile] = useState(null);
  const [tree, setTree] = useState([]);
  const [isFileLoaded, setIsFileLoaded] = useState(false);

  // This effect will run whenever inputFile changes, meaning a new file has been selected
  // It reads the selected file, tries to parse it as JSON, and creates a tree data structure from it
  useEffect(() => {
    if (inputFile) {
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        try {
          const inputJson = JSON.parse(fileReader.result);
          const outputTree = createTree(inputJson);
          setIsFileLoaded(true);
          setTree(outputTree);
        } catch (error) {
          setIsFileLoaded(false);
          alert(
            "Error loading JSON file. Please ensure the file is in the correct format."
          );
        }
      };
      fileReader.readAsText(inputFile);
    }
  }, [inputFile]);

  // This function updates the inputFile state and resets the isFileLoaded flag when a new file is selected
  const onInputFileChange = (event) => {
    setInputFile(event.target.files[0]);
    setIsFileLoaded(false);
  };

  // This function creates a JSON string from the tree data and saves it as a file using the FileSaver library
  const onSaveJsonFile = () => {
    const outputJson = JSON.stringify(tree, null, 2);
    const blob = new Blob([outputJson], {
      type: "application/json;charset=utf-8",
    });
    saveAs(blob, "output.json");
  };

  // This function takes a node and returns a new object with the required properties for the TreeDiagram component
  // It also recursively formats the children nodes
  const formatNode = (node) => ({
    name: `${node.name} (Id: ${node.nodeId})`,
    children: node.children.map(formatNode),
  });

  // The TreeDiagram component expects a single root node, so we create a new root node with the original tree data as its children
  const treeData = [
    {
      name: "Root",
      children: tree.map(formatNode),
    },
  ];

  return (
    <div className="App">
      <header>
        <h1>Tree Structure Rearranger</h1>
      </header>
      <FileInput
        onFileChange={onInputFileChange}
        onSaveJsonFile={onSaveJsonFile}
        saveButtonDisabled={!inputFile}
      />
      {isFileLoaded && tree && <TreeDiagram treeData={treeData} />}
    </div>
  );
}

export default App;
