import ky from "ky";
import { useEffect, useState } from "react";
import type { TvDetailedInfo, ApiSearchResponse } from "./types";
import { Link, useParams } from "react-router-dom";
import placeHolder from "./assets/noPhoto.jpg";
import { formatDistanceToNow, parseISO } from "date-fns";
import "./TvDetailsPage.scss";
import TvShowCard from "./TvShowCard";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import particlesOptions from "./particles.json";
import { ISourceOptions } from "tsparticles-engine";

const TvDetailsPage = () => {
  const [generaSearchResults, setGeneraSearchResults] =
    useState<ApiSearchResponse>();
  const [detailedTvInfo, setDetailedTvInfo] = useState<TvDetailedInfo>();

  const { tvId } = useParams();

  let roundedVoteAverage = 0;

  const particlesInit = async (main: any) => {
    await loadFull(main);
  };

  useEffect(() => {
    const getTvShowDetails = async () => {
      const tvDetailedInfo: TvDetailedInfo = await ky
        .get(
          `https://api.themoviedb.org/3/tv/${tvId}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`
        )
        .json();
      setDetailedTvInfo(tvDetailedInfo);
    };

    getTvShowDetails();
  }, [tvId]);

  useEffect(() => {
    const getTvShowRecommendations = async () => {
      const tvRecommendationsShows: ApiSearchResponse = await ky
        .get(
          `https://api.themoviedb.org/3/tv/${tvId}/recommendations?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1`
        )
        .json();
      setGeneraSearchResults(tvRecommendationsShows);
    };
    getTvShowRecommendations();
  }, [tvId]);

  useEffect(() => {
    const getCurrentlyAiringShows = async () => {};
    getCurrentlyAiringShows();
  });

  // this is to get the rounded vote average for the series so it looks cleaner
  if (!!detailedTvInfo)
    roundedVoteAverage = Math.round(detailedTvInfo?.vote_average * 10) / 10;

  return (
    <div className="pageWrapper">
      {/* the particles work but not quiet right */}
      {/* <Particles
        className="particlesAffect"
        options={particlesOptions as ISourceOptions}
        init={particlesInit}
      /> */}
      <Link to={"/"} className="linkClass">
        Look for another series?
      </Link>
      <div className="detailsWrapper">
        <h1 className="detailedCardTitle">{detailedTvInfo?.name}</h1>
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
          <div className="">
            <p className="overviewContent">{detailedTvInfo?.overview}</p>
            {!!detailedTvInfo?.next_episode_to_air ? (
              <p className="nextReleaseInfo">
                Next release:{" "}
                {formatDistanceToNow(
                  parseISO(detailedTvInfo?.next_episode_to_air.air_date)
                )}
              </p>
            ) : (
              <p className="nextReleaseInfo">Next episode is unavailable</p>
            )}
          </div>
        </div>
        <div className="subInfo">
          <p>{`Initial air date ${detailedTvInfo?.first_air_date}`}</p>
          <p>{`${roundedVoteAverage}/10`}</p>
          <p>{`Number of seasons ${detailedTvInfo?.number_of_seasons}`}</p>
          <p>{`Status: ${detailedTvInfo?.status}`}</p>
        </div>
        {!!generaSearchResults?.results &&
        generaSearchResults?.results.length > 0 ? (
          <div className="generaSearchSeparator" />
        ) : (
          ""
        )}

        <div className="recommendedShowsWrapper">
          {generaSearchResults?.results
            .map((searchResult) => (
              <TvShowCard
                searchResult={searchResult}
                cardSize={false}
              ></TvShowCard>
            ))
            .slice(0, 4)}
        </div>
      </div>
    </div>
  );
};

export default TvDetailsPage;
