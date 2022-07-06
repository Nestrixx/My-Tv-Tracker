import { useState } from "react";
import { SearchResponse } from "./types/SearchTvResponse";
import placeHolder from "./assets/noPhoto.jpg";

type Props = {
  //this is a prop type it is a function as indicated by arrows that takes a paramater of id and returns false.
  tvShowDetailsHandler: (id: number) => void;
  searchResult: SearchResponse;
};

const TvShowCard = ({ tvShowDetailsHandler, searchResult }: Props) => {
  const [isTextHover, setIsTextHover] = useState(false);

  return (
    <li
      onMouseEnter={() => setIsTextHover(true)}
      onMouseLeave={() => setIsTextHover(false)}
      className="searchResultsCard"
      key={searchResult.id}
      onClick={() => tvShowDetailsHandler(searchResult.id)}
    >
      {!!searchResult.poster_path ? (
        <img
          className="searchResultsImage"
          src={`https://image.tmdb.org/t/p/w154${searchResult?.poster_path}`}
          alt="search results posters"
          height={255}
        />
      ) : (
        <img
          className="searchResultsImage"
          src={placeHolder}
          alt="missing search results posters"
          height={255}
        />
      )}
      {isTextHover ? (
        <div>
          <h1 className="searchResultsTitle">{searchResult.name}</h1>
          <p className="searchResultsOverview">{searchResult.overview}</p>
        </div>
      ) : null}
    </li>
  );
};

export default TvShowCard;
