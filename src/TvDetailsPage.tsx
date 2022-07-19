import ky from "ky";
import { useContext, useEffect, useState } from "react";
import { TvInfoContext } from "./TvInfoContext";
import type { TvContextType, TvDetailedInfo, ApiSearchResponse } from "./types";
import { Link, useParams } from "react-router-dom";
import placeHolder from "./assets/noPhoto.jpg";
import { parseISO } from "date-fns";
import "./TvDetailsPage.scss";
import TvShowCard from "./TvShowCard";

const TvDetailsPage = () => {
  const [generaSearchResults, setGeneraSearchResults] =
    useState<ApiSearchResponse>();
  const { detailedTvId, setDetailedTvId }: TvContextType =
    useContext(TvInfoContext);
  const [detailedTvInfo, setDetailedTvInfo] = useState<TvDetailedInfo>();
  const { tvId } = useParams();
  console.log(tvId);
  console.log(detailedTvId);

  useEffect(() => {
    return () => {
      setDetailedTvId(undefined);
    };
  }, [setDetailedTvId]);

  useEffect(() => {
    const getTvShowDetails = async () => {
      const tvDetailedInfo: TvDetailedInfo = await ky
        .get(
          `https://api.themoviedb.org/3/tv/${
            detailedTvId ? detailedTvId : tvId
          }?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`
        )
        .json();
      setDetailedTvInfo(tvDetailedInfo);
    }; // console.log(tvDetailedInfo);

    getTvShowDetails();
  }, [detailedTvId, tvId]);

  useEffect(() => {
    const getTvShowRecommendations = async () => {
      const tvRecommendationsShows: ApiSearchResponse = await ky
        .get(
          `https://api.themoviedb.org/3/tv/${
            detailedTvId ? detailedTvId : tvId
          }/recommendations?api_key=${
            process.env.REACT_APP_TMDB_API_KEY
          }&language=en-US&page=1`
        )
        .json();
      setGeneraSearchResults(tvRecommendationsShows);
    };
    getTvShowRecommendations();
  }, [detailedTvId, tvId]);

  useEffect(() => {
    const getCurrentlyAiringShows = async () => {};
    getCurrentlyAiringShows();
  });

  const tvShowDetailsHandler = (id: number) => {
    setDetailedTvId(id);
  };

  console.log(
    detailedTvInfo?.next_episode_to_air?.air_date
      ? parseISO(detailedTvInfo?.next_episode_to_air?.air_date)
      : "no"
  );
  !!detailedTvInfo?.next_episode_to_air?.air_date
    ? console.log(parseISO(detailedTvInfo?.next_episode_to_air.air_date))
    : console.log("not work");

  return (
    <div className="pageWrapper">
      <Link to={"/"} className="linkClass">
        Look for another series?
      </Link>
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
          <div className="">
            <p className="overviewContent">{detailedTvInfo?.overview}</p>
            {!!detailedTvInfo?.next_episode_to_air ? (
              <p>{detailedTvInfo.next_episode_to_air.air_date}</p>
            ) : (
              <p>Next episode is unavailable</p>
            )}
          </div>
        </div>
        <div className="subInfo">
          <p>{`Initial air date ${detailedTvInfo?.first_air_date}`}</p>
          <p>{`${detailedTvInfo?.vote_average}/10`}</p>
          <p>{`Number of seasons ${detailedTvInfo?.number_of_seasons}`}</p>
          <p>{`Status: ${detailedTvInfo?.status}`}</p>
        </div>

        <div className="recommendedShowsWrapper">
          {generaSearchResults?.results
            .map((searchResult) => (
              <TvShowCard
                tvShowDetailsHandler={tvShowDetailsHandler}
                searchResult={searchResult}
                cardSize={false}
              ></TvShowCard>
            ))
            .slice(0, 5)}
        </div>
      </div>
    </div>
  );
};

export default TvDetailsPage;
