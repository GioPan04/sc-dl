import IEpisode from './IEpisode';

export default interface ISeason {
  id: number;
  name?: string;
  plot?: string;
  date?: string;
  number: number;
  title_id: number;
  created_at: string;
  updated_at: string;
  episodes: IEpisode[];
}