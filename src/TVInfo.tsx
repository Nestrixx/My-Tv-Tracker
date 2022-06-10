import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import ky from "ky";

import { TvInfoContext } from "./TvInfoContext";
import "./TVInfo.scss";

import type { ApiSearchResponse, TvContextType, TvDetailedInfo } from "./types";

const TVInfo = () => {
  const [searchResults, setSearchResults] = useState<ApiSearchResponse>();
  const [searchTitle, setSearchTitle] = useState("");
  const { detailedTvInfo, setDetailedTvInfo }: TvContextType =
    useContext(TvInfoContext);

  useEffect(() => {
    const searchTitleInputHandler = async () => {
      const tvSearchInfo: ApiSearchResponse = await ky
        .get(
          `https://api.themoviedb.org/3/search/tv?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1&query=${searchTitle}&include_adult=false`
        )
        .json();
      setSearchResults(tvSearchInfo);
    };
    searchTitleInputHandler();
  }, [searchTitle]);

  // this code will handler the list item api call.
  const tvShowDetailsHandler = async (id: number) => {
    console.log(id);
    const tvDetailedInfo: TvDetailedInfo = await ky
      .get(
        `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`
      )
      .json();

    setDetailedTvInfo(tvDetailedInfo);
    console.log(detailedTvInfo);
  };

  return (
    <div className="moviePageWrapper">
      <input type="text" onChange={(e) => setSearchTitle(e.target.value)} />
      <div className="totalListWrapper">
        <ul className="uListWrapper">
          {searchResults?.results.map((searchResult) => (
            <Link to="/details" className="tvDetailsLinks">
              <li
                key={searchResult.id}
                onClick={() => {
                  tvShowDetailsHandler(searchResult.id);
                }}
              >
                {searchResult.name}{" "}
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TVInfo;
