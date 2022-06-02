import ky from "ky";
import React, { useState, ChangeEvent } from "react";
import "./TVInfo.scss";
import { ApiSearchResponse } from "./types/SearchTvResponse";

const TVInfo = () => {
  const [searchTitle, setSearchTitle] = useState("");
  const [searchResults, setSearchResults] = useState<ApiSearchResponse>();

  const searchTitleInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTitle(event.target.value);
    console.log(searchTitle);
  };

  const getTVSearchInfo = async () => {
    const tvSearchInfo: ApiSearchResponse = await ky
      .get(
        `https://api.themoviedb.org/3/search/tv?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1&query=${searchTitle}&include_adult=false`
      )
      .json();
    console.log(tvSearchInfo.results[0].id);

    // setSearchResults(tvSearchInfo);
  };
  console.log(searchResults);
  getTVSearchInfo();

  return (
    <div className="moviePageWrapper">
      <input type="text" onChange={searchTitleInputHandler} />
    </div>
  );
};

export default TVInfo;
