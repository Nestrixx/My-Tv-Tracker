import React from "react";
import "./App.css";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

import ky from "ky";
import MovieInfo from "./TVInfo";

function App() {
  // const releaseDateMorbius = async () => {
  //   const json = await ky
  //     .get(
  //       `https://api.themoviedb.org/3/movie/526896/release_dates?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
  //     )
  //     .json();
  //   console.log(json);
  //   return json;
  // };

  // const;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MovieInfo />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
