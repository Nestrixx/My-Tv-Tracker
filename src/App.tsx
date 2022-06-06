import React from "react";
import "./App.css";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import TvInfo from "./TVInfo";
import TvDetailsPage from "./TvDetailesPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TvInfo />}></Route>
        <Route path="/details" element={<TvDetailsPage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
