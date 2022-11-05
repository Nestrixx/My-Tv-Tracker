import { useState, useEffect, useMemo } from "react";
import ky from "ky";
import { debounce } from "lodash-es";

import "./TVInfo.scss";

import type { ApiSearchResponse } from "./types";
import TvShowCard from "./TvShowCard";

const TVInfo = () => {
  const [searchResults, setSearchResults] = useState<ApiSearchResponse>();
  const [searchTitle, setSearchTitle] = useState("");
  const [popularSearchResults, setPopularSearchResults] =
    useState<ApiSearchResponse>();
  const [showsAiringTodayResults, getShowsAiringTodayResults] =
    useState<ApiSearchResponse>();
  // const { detailedTvId, setDetailedTvId }: TvContextType =
  // useContext(TvInfoContext);
  // const navigate = useNavigate();

  useEffect(() => {
    const searchTitleInputHandler = async () => {
      if (searchTitle === "") {
        setSearchResults(undefined);
        return;
      }

      const tvSearchInfo: ApiSearchResponse = await ky
        .get(
          `https://api.themoviedb.org/3/search/tv?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1&query=${searchTitle}`
        )
        .json();
      setSearchResults(tvSearchInfo);
    };
    searchTitleInputHandler();
  }, [searchTitle]);

  useEffect(() => {
    const getPopularAiringShows = async () => {
      const popularTvSearchInfo: ApiSearchResponse = await ky
        .get(
          `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1`
        )
        .json();
      setPopularSearchResults(popularTvSearchInfo);
    };
    getPopularAiringShows();
  }, []);

  useEffect(() => {
    const getShowsAiringToday = async () => {
      const showsAiringToday: ApiSearchResponse = await ky
        .get(
          `https://api.themoviedb.org/3/tv/airing_today?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1`
        )
        .json();
      getShowsAiringTodayResults(showsAiringToday);
    };
    getShowsAiringToday();
  }, []);

  const titleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTitle(event.target.value);
  };

  const debounceChangeHandler = useMemo(() => debounce(titleHandler, 300), []);

  return (
    <div className="tvPageWrapper">
      <div className="searchInputWrapper">
        <input
          className="tvSearchInput"
          type="text"
          onChange={debounceChangeHandler}
          placeholder="Find the next airdate for currently airing shows"
        />
      </div>
      <div className="totalListWrapper">
        {!searchResults ? (
          <p className="popularShowsList"> Popular Airing Shows</p>
        ) : (
          ""
        )}
        <ul className="uPopularShowListWrapper">
          {!searchResults
            ? popularSearchResults?.results.map((searchResult) => (
                <TvShowCard
                  key={searchResult.id}
                  searchResult={searchResult}
                  cardSize={true}
                />
              ))
            : null}
        </ul>
        {!searchResults ? (
          <p className="popularShowsList"> Shows Airing today</p>
        ) : (
          ""
        )}
        <ul className="uPopularShowListWrapper">
          {!searchResults
            ? showsAiringTodayResults?.results.map((searchResult) => (
                <TvShowCard
                  key={searchResult.id}
                  searchResult={searchResult}
                  cardSize={true}
                />
              ))
            : null}
        </ul>
        <ul className="uListWrapper">
          {searchResults?.results.map((searchResult) => (
            <TvShowCard
              key={searchResult.id}
              searchResult={searchResult}
              cardSize={true}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TVInfo;
