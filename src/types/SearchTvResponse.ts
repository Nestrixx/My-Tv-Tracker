export type ApiSearchResponse = {
  page: number;
  results: Array<SearchResponse>;
  total_pages: number;
  total_results: number;
};

export type SearchResponse = {
  backdrop_path: string | null;
  first_air_date: string;
  genre_ids: Array<number>;
  id: number;
  name: string;
  origin_country: Array<string>;
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
};
