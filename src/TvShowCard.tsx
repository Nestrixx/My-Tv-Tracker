import { useState } from "react";
import { SearchResponse } from "./types/SearchTvResponse";
import placeHolder from "./assets/noPhoto.jpg";
import "./TvShowCard.scss";

type Props = {
  //this is a prop type it is a function as indicated by arrows that takes a paramater of id and returns false.
  tvShowDetailsHandler: (id: number) => void;
  searchResult: SearchResponse;
  cardSize: boolean;
};

const TvShowCard = ({
  tvShowDetailsHandler,
  searchResult,
  cardSize,
}: Props) => {
  const [isTextHover, setIsTextHover] = useState(false);

  const posterSizeHandler = () => {
    const hasPoster = !!searchResult.poster_path;
    return (
      <div>
        <img
          className={
            cardSize ? "searchResultsImage" : "smallerSearchResultsImage"
          }
          src={
            hasPoster
              ? `https://image.tmdb.org/t/p/w154${searchResult?.poster_path}`
              : placeHolder
          }
          alt={
            hasPoster
              ? "search results posters"
              : "missing search results posters"
          }
        />
        {cardSize && isTextHover && (
          <div>
            <h1 className="searchResultsTitle">{searchResult.name}</h1>
            <p className="searchResultsOverview">{searchResult.overview}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <li
      onMouseEnter={() => setIsTextHover(true)}
      onMouseLeave={() => setIsTextHover(false)}
      className="searchResultsCard"
      key={searchResult.id}
      onClick={() => tvShowDetailsHandler(searchResult.id)}
    >
      {posterSizeHandler()}
    </li>
  );
};

export default TvShowCard;
