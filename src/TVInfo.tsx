import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import ky from "ky";

import { TvInfoContext } from "./TvInfoContext";
import "./TVInfo.scss";

import type { ApiSearchResponse, TvContextType, TvDetailedInfo } from "./types";

const TVInfo = () => {
  const [searchResults, setSearchResults] = useState<ApiSearchResponse>();
  const [searchTitle, setSearchTitle] = useState("");
  const { detailedTvId, setDetailedTvId }: TvContextType =
    useContext(TvInfoContext);
  const navigate = useNavigate();

  useEffect(() => {
    const searchTitleInputHandler = async () => {
      const tvSearchInfo: ApiSearchResponse = await ky
        .get(
          `https://api.themoviedb.org/3/search/tv?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1&query=${searchTitle}&include_adult=true`
        )
        .json();
      setSearchResults(tvSearchInfo);
    };
    searchTitleInputHandler();
  }, [searchTitle]);

  useEffect(() => {
    if (!!detailedTvId) navigate("./details", { replace: true });
  }, [detailedTvId, navigate]);

  const tvShowDetailsHandler = (id: number) => {
    setDetailedTvId(id);
  };

  // useEffect(() => {
  // const tvShowDetailsHandler = async (searchId: number) => {
  //   const tvDetailedInfo: TvDetailedInfo = await ky
  //     .get(
  //       `https://api.themoviedb.org/3/tv/${searchId}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`
  //     )
  //     .json();
  //   setDetailedTvInfo(tvDetailedInfo);
  //   console.log(tvDetailedInfo.id);
  // };
  // tvShowDetailsHandler();
  // }, [searchId, setDetailedTvInfo]);

  return (
    <div className="moviePageWrapper">
      <input type="text" onChange={(e) => setSearchTitle(e.target.value)} />
      <div className="totalListWrapper">
        <ul className="uListWrapper">
          {searchResults?.results.map((searchResult) => (
            // <Link to="/details" className="tvDetailsLinks">
            <li
              key={searchResult.id}
              onClick={() => tvShowDetailsHandler(searchResult.id)}
            >
              {searchResult.name}{" "}
            </li>
            // </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TVInfo;
