import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ky from "ky";

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
      if (searchTitle !== "") {
        const tvSearchInfo: ApiSearchResponse = await ky
          .get(
            `https://api.themoviedb.org/3/search/tv?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1&query=${searchTitle}`
          )
          .json();
        setSearchResults(tvSearchInfo);
      }
    };
    searchTitleInputHandler();
  }, [searchTitle]);

  useEffect(() => {
    if (!!detailedTvId) navigate(`./details/${detailedTvId}`);
  }, [detailedTvId, navigate]);

  const tvShowDetailsHandler = (id: number) => {
    setDetailedTvId(id);
  };

  return (
    <div className="tvPageWrapper">
      <input
        className="tvSearchInput"
        type="text"
        onChange={(e) => setSearchTitle(e.target.value)}
        placeholder="search your favorite series here"
      />
      <div className="totalListWrapper">
        <ul className="uListWrapper">
          {searchResults?.results.map((searchResult) => (
            <TvShowCard
              tvShowDetailsHandler={tvShowDetailsHandler}
              searchResult={searchResult}
              cardSize={true}
            ></TvShowCard>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TVInfo;
