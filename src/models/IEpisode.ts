import IImage from './IImage';

export default interface IEpisode {
  id: number;
  number: number;
  name: string;
  plot: string;
  season_id: number;
  images: IImage[];
}