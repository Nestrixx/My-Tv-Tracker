import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TvInfo from "./TVInfo";
import TvDetailsPage from "./TvDetailsPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TvInfo />}></Route>
        <Route path="/details/:tvId" element={<TvDetailsPage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
