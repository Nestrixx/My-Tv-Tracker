import { useState, useEffect, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import ky from "ky";
import { debounce } from "lodash-es";

import { TvInfoContext } from "./TvInfoContext";
import "./TVInfo.scss";

import type { ApiSearchResponse, TvContextType } from "./types";
import TvShowCard from "./TvShowCard";

const TVInfo = () => {
  const [searchResults, setSearchResults] = useState<ApiSearchResponse>();
  const [searchTitle, setSearchTitle] = useState("");
  const { detailedTvId, setDetailedTvId }: TvContextType =
    useContext(TvInfoContext);
  const navigate = useNavigate();

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
    if (!!detailedTvId) navigate(`./details/${detailedTvId}`);
  }, [detailedTvId, navigate]);

  const tvShowDetailsHandler = (id: number) => {
    setDetailedTvId(id);
  };

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
          placeholder="search your favorite series here"
        />
      </div>
      <div className="totalListWrapper">
        <ul className="uListWrapper">
          {searchResults?.results.map((searchResult) => (
            <TvShowCard
              tvShowDetailsHandler={tvShowDetailsHandler}
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
