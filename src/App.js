import React from "react";
import Header from "./components/Header";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <div style={{ padding: "50px" }}>
        <h3>Content</h3>
      </div>
    </div>
  );
}

export default App;
