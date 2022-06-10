import { TvDetailedInfo } from "./TvDetailedInfo";

export type TvContextType = {
  detailedTvInfo: TvDetailedInfo;
  setDetailedTvInfo: React.Dispatch<React.SetStateAction<TvDetailedInfo>>;
};
