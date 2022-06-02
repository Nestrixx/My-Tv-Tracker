import ky from "ky";
import React, { useState, ChangeEvent } from "react";
import "./TVInfo.scss";
import { ApiSearchResponse } from "./types/SearchTvResponse";

const TVInfo = () => {
  const [searchTitle, setSearchTitle] = useState("");
  const [searchResults, setSearchResults] = useState<ApiSearchResponse>();

  const searchTitleInputHandler = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setSearchTitle(event.target.value);
    const tvSearchInfo: ApiSearchResponse = await ky
      .get(
        `https://api.themoviedb.org/3/search/tv?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1&query=${searchTitle}&include_adult=false`
      )
      .json();

    setSearchResults(tvSearchInfo);
  };

  const tvSearchList = () => {
    return (
      <div className="listWrapper">
        <ul>
          {searchResults?.results.map((searchResult, index) => (
            <li key={searchResult.id}>{searchResult.name}</li>
          ))}
        </ul>
      </div>
    );
  };

  console.log(searchResults);

  return (
    <div className="moviePageWrapper">
      <input type="text" onChange={searchTitleInputHandler} />
      {tvSearchList()}
    </div>
  );
};

export default TVInfo;
