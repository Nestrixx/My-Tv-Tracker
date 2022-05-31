import ky from "ky";
import { SetStateAction, useState } from "react";
import "./TVInfo.css";

const TVInfo = () => {
  const [searchTitle, setSearchTitle] = useState("");

  const searchTitleInputHandler = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setSearchTitle(event.target.value);
    console.log(searchTitle);
  };

  const getTVSearchInfo = async () => {
    const tvSearchInfo = await ky
      .get(
        `
    https://api.themoviedb.org/3/search/company?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=${searchTitle}`
      )
      .json();
    // return console.log(tvSearchInfo);
  };
  getTVSearchInfo();

  return (
    <div className="Movie_Page_Wrapper">
      <input type="text" onChange={searchTitleInputHandler} />
    </div>
  );
};

export default TVInfo;
