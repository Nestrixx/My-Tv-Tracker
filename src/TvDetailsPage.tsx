import ky from "ky";
import { useContext, useEffect, useState } from "react";
import { TvInfoContext } from "./TvInfoContext";
import type { TvContextType, TvDetailedInfo, ApiSearchResponse } from "./types";
import { Link, useNavigate } from "react-router-dom";
import placeHolder from "./assets/noPhoto.jpg";

import "./TvDetailsPage.scss";
import TvShowCard from "./TvShowCard";

const TvDetailsPage = () => {
  const [generaSearchResults, setGeneraSearchResults] =
    useState<ApiSearchResponse>();
  const { detailedTvId, setDetailedTvId }: TvContextType =
    useContext(TvInfoContext);
  const [detailedTvInfo, setDetailedTvInfo] = useState<TvDetailedInfo>();

  // const navigate = useNavigate();

  useEffect(() => {
    const getTvShowDetails = async () => {
      const tvDetailedInfo: TvDetailedInfo = await ky
        .get(
          `https://api.themoviedb.org/3/tv/${detailedTvId}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`
        )
        .json();
      setDetailedTvInfo(tvDetailedInfo);
    }; // console.log(tvDetailedInfo);

    getTvShowDetails();
  }, [detailedTvId]);

  useEffect(() => {
    const getTvShowRecommendations = async () => {
      const tvRecommendationsShows: ApiSearchResponse = await ky
        .get(
          `https://api.themoviedb.org/3/tv/${detailedTvId}/recommendations?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1`
        )
        .json();
      setGeneraSearchResults(tvRecommendationsShows);
    };
    getTvShowRecommendations();
  }, [detailedTvId]);

  useEffect(() => {
    const getCurrentlyAiringShows = async () => {};
    getCurrentlyAiringShows();
  });

  const tvShowDetailsHandler = (id: number) => {
    setDetailedTvId(id);
  };
  return (
    <div className="pageWrapper">
      <div className="detailsWrapper">
        <h1>{detailedTvInfo?.name}</h1>
        <div className="imageOverviewWrapper">
          {!!detailedTvInfo?.poster_path ? (
            <img
              className="detailedPagePoster"
              src={`https://image.tmdb.org/t/p/w154${detailedTvInfo?.poster_path}`}
              alt="search results posters"
              height={255}
            />
          ) : (
            <img
              className="detailedPagePoster"
              src={placeHolder}
              alt="missing search results posters"
              height={255}
            />
          )}
          <p>{detailedTvInfo?.overview}</p>
        </div>
        <div className="subInfo">
          <p>{`Initial air date ${detailedTvInfo?.first_air_date}`}</p>
          <p>{`${detailedTvInfo?.vote_average}/10`}</p>
          <p>{`Number of seasons ${detailedTvInfo?.number_of_seasons}`}</p>
          <p>{`Current status: ${detailedTvInfo?.status}`}</p>
        </div>
      </div>
      <Link
        to={"/"}
        className="linkClass"
        onClick={() => setDetailedTvId(undefined)}
      >
        Look for another series?
      </Link>
      <div>
        {generaSearchResults?.results
          .map((searchResult) => (
            <TvShowCard
              tvShowDetailsHandler={tvShowDetailsHandler}
              searchResult={searchResult}
            ></TvShowCard>
          ))
          .slice(0, 5)}
      </div>
    </div>
  );
};

export default TvDetailsPage;
