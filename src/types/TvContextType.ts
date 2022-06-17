import { TvDetailedInfo } from "./TvDetailedInfo";

export type TvContextType = {
  detailedTvId: number;
  setDetailedTvId: (value: React.SetStateAction<number | undefined>) => void;
};
