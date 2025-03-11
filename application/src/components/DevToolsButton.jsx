import React from "react";

const DevToolsButton = () => {
  const openDevTools = () => {
    // This will only work in Electron or similar environments
    if (window.require) {
      const { remote } = window.require("electron");
      remote.getCurrentWindow().toggleDevTools();
    } else {
      alert("DevTools can only be opened in Electron or similar environments.");
    }
  };

  return (
    <button onClick={openDevTools}>
      Open Dev Tools
    </button>
  );
};

export default DevToolsButton;
