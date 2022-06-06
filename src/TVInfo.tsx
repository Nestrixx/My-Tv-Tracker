import ky from "ky";
import React, { useState, useEffect } from "react";
import "./TVInfo.scss";
import { ApiSearchResponse } from "./types/SearchTvResponse";
import { TvDetailedInfo } from "./types/TvDetailedInfo";

const TVInfo = () => {
  const [searchTitle, setSearchTitle] = useState("");
  const [searchResults, setSearchResults] = useState<ApiSearchResponse>();

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
  const tvShowDetailsHandler = async (ID: number) => {
    console.log(ID);
    const tvDetailedInfo: TvDetailedInfo = await ky
      .get(
        `https://api.themoviedb.org/3/tv/${ID}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`
      )
      .json();

    console.log(tvDetailedInfo.name);
  };

  return (
    <div className="moviePageWrapper">
      <input type="text" onChange={(e) => setSearchTitle(e.target.value)} />
      <div className="listWrapper">
        <ul>
          {searchResults?.results.map((searchResult) => (
            <li
              key={searchResult.id}
              onClick={() => {
                tvShowDetailsHandler(searchResult.id);
              }}
            >
              {searchResult.name}{" "}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TVInfo;
