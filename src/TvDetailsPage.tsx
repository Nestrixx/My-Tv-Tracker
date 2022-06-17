import ky from "ky";
import { useContext, useEffect, useState } from "react";
import { TvInfoContext } from "./TvInfoContext";
import type { TvContextType, TvDetailedInfo } from "./types";

const TvDetailsPage = () => {
  const { detailedTvId }: TvContextType = useContext(TvInfoContext);
  const [detailedTvInfo, setDetailedTvInfo] = useState<TvDetailedInfo>();

  useEffect(() => {
    const getTvShowDetails = async () => {
      console.log("this is just a test");
      const tvDetailedInfo: TvDetailedInfo = await ky
        .get(
          `https://api.themoviedb.org/3/tv/${detailedTvId}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`
        )
        .json();
      setDetailedTvInfo(tvDetailedInfo);
      // console.log(tvDetailedInfo.poster_path);
      // if (tvDetailedInfo !== undefined) {
      // }
    };
    getTvShowDetails();
  }, [detailedTvId]);
  return (
    <div>
      <img src={detailedTvInfo?.poster_path} alt="selected Tv poster" />
      <p>help yourself</p>
      {/* <button onClick={getTvShowDetails()}>click me for the poster</button> */}
    </div>
  );
};

export default TvDetailsPage;
