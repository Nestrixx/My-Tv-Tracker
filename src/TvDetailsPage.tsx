import ky from "ky";
import { useContext, useEffect, useState } from "react";
import { TvInfoContext } from "./TvInfoContext";
import type { TvContextType, TvDetailedInfo } from "./types";
import { Link, useNavigate } from "react-router-dom";

import "./TvDetailsPage.scss";

const TvDetailsPage = () => {
  const { detailedTvId }: TvContextType = useContext(TvInfoContext);
  const [detailedTvInfo, setDetailedTvInfo] = useState<TvDetailedInfo>();

  // const navigate = useNavigate();

  useEffect(() => {
    const getTvShowDetails = async () => {
      console.log("this is just a test");
      const tvDetailedInfo: TvDetailedInfo = await ky
        .get(
          `https://api.themoviedb.org/3/tv/${detailedTvId}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`
        )
        .json();
      setDetailedTvInfo(tvDetailedInfo);
      console.log(tvDetailedInfo);
      // if (tvDetailedInfo !== undefined) {
      // }
    };
    getTvShowDetails();
  }, [detailedTvId]);
  console.log(detailedTvInfo?.type);

  useEffect(() => {
    const getCurrentlyAiringShows = async () => {};
    getCurrentlyAiringShows();
  });

  return (
    <div className="pageWrapper">
      <div className="detailsWrapper">
        <h1>{detailedTvInfo?.name}</h1>
        <div className="imageOverviewWrapper">
          <img
            src={`https://image.tmdb.org/t/p/w185${detailedTvInfo?.poster_path}`}
            alt="selected Tv poster"
          />
          <p>{detailedTvInfo?.overview}</p>
        </div>
        <div className="subInfo">
          <p>{`Initial air date ${detailedTvInfo?.first_air_date}`}</p>
          <p>{`${detailedTvInfo?.vote_average}/10`}</p>
          <p>{`Number of seasons ${detailedTvInfo?.number_of_seasons}`}</p>
          <p>{`Current status: ${detailedTvInfo?.status}`}</p>
        </div>
      </div>
      <Link to={"/"} className="linkClass">
        Search Again
      </Link>
    </div>
  );
};

export default TvDetailsPage;
