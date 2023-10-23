// src/App.js
import React from "react";
import "./App.css";
import HitungPajak from "./components/HitungPajak";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="text-2xl font-semibold mb-4 text-blue-500">Hitung Pajak</h1>
        <HitungPajak />
      </header>
    </div>
  );
}

export default App;
