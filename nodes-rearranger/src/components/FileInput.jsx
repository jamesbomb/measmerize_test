import React from "react";

const FileInput = ({ onFileChange, onSaveJsonFile, saveButtonDisabled }) => {
  return (
    <div>
      <input type="file" accept=".json" onChange={onFileChange} />
      <button onClick={onSaveJsonFile} disabled={saveButtonDisabled}>
        Save JSON File
      </button>
    </div>
  );
};

export default FileInput;
