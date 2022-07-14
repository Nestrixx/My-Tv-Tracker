export type TvDetailedInfo = {
  adult: boolean;
  backdrop_path: string;
  created_by: Array<string>;
  first_air_date: string;
  genres: Array<GeneraInfo>;
  homepage: string;
  id: number;
  in_production: boolean;
  languages: Array<string>;
  last_air_date: string;
  last_episode_to_air: Array<LastEpisodeInfo>;
  name: string;
  networks: Array<NetworkInfo>;
  next_episode_to_air: {
    air_date: string;
    episode_number: number;
    id: number;
    name: string;
    overview: string;
    production_code: string;
    runtime: number;
    season_number: number;
    show_id: number;
    still_path: number | null;
    vote_average: number;
    vote_count: number;
  };
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: Array<string>;
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: Array<ProductionCompaniesInfo>;
  production_countries: Array<ProductionCountries>;
  seasons: Array<SeasonsInfo>;
  spoken_languages: Array<Languages>;
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
};

export type GeneraInfo = {
  id: number;
  name: string;
};

export type LastEpisodeInfo = {
  air_date: string;
  episode_number: number;
  id: number;
  name: string;
  overview: string;
  production_code: string;
  runtime: number;
  season_number: number;
  still_path: string;
  vote_average: number;
  vote_count: number;
};

export type NetworkInfo = {
  name: string;
  id: number;
  logo_path: string;
  origin_country: string;
};

export type ProductionCompaniesInfo = {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
};

export type ProductionCountries = {
  iso_3166_1: string;
  name: string;
};

export type SeasonsInfo = {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
};

export type Languages = {
  english_name: string;
  iso_639_1: string;
  name: string;
};
