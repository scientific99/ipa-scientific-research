import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./screens/Home";
import Translate from "./components/Translate";
import Header from "./components/Header";
import Document from "./components/Document";
import About from "./components/About";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/document" element={<Document />} />
        <Route path="/about" element={<About />} />
        <Route path="/translate" element={<Translate />} />
      </Routes>
    </Router>
  );
}

export default App;
