import { useState } from "react";
import { SearchResponse } from "./types/SearchTvResponse";
import placeHolder from "./assets/noPhoto.jpg";
import "./TvShowCard.scss";
import { useNavigate } from "react-router-dom";

type Props = {
  searchResult: SearchResponse;
  cardSize: boolean;
};

const TvShowCard = ({ searchResult, cardSize }: Props) => {
  const [isTextHover, setIsTextHover] = useState(false);
  const navigate = useNavigate();
  const posterSizeHandler = () => {
    const hasPoster = !!searchResult.poster_path;
    return (
      <div
        className={
          cardSize ? "searchResultsWrapper" : "smallerSearchResultsWrapper"
        }
      >
        <div className="filterWrapper">
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
          ></img>
          {!hasPoster ? (
            <div className="cardHoverFilter">
              <h1 className="searchResultsTitle">{searchResult.name}</h1>
              <p className="searchResultsOverview">{searchResult.overview}</p>
            </div>
          ) : (
            ""
          )}
          {cardSize && isTextHover && (
            <div className="cardHoverFilter">
              <h1 className="searchResultsTitle">{searchResult.name}</h1>
              <p className="searchResultsOverview">{searchResult.overview}</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <li
      onMouseEnter={() => setIsTextHover(true)}
      onMouseLeave={() => setIsTextHover(false)}
      className={`searchResultsCard ${!cardSize && "-small"}`}
      key={searchResult.id}
      onClick={() => navigate(`../details/${searchResult.id}`)}
    >
      {posterSizeHandler()}
    </li>
  );
};

export default TvShowCard;
