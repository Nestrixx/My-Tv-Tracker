import "./App.scss";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import TvInfo from "./TVInfo";
import TvDetailsPage from "./TvDetailsPage";
import { TvInfoContext } from "./TvInfoContext.js";
import React, { useState } from "react";
import { TvDetailedInfo } from "./types/TvDetailedInfo";

function App() {
  const [detailedTvId, setDetailedTvId] = useState<TvDetailedInfo>();

  return (
    <Router>
      <TvInfoContext.Provider value={{ detailedTvId, setDetailedTvId }}>
        <Routes>
          <Route path="/" element={<TvInfo />}></Route>
          <Route path="/details" element={<TvDetailsPage />}></Route>
        </Routes>
      </TvInfoContext.Provider>
    </Router>
  );
}

export default App;
