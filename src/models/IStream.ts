import IEpisode from './IEpisode';
import ISeason from './ISeason';

export default interface IStream {
  title: {
    id: number;
    name: string;
  }
  scws_id: number;
  season: ISeason;
  episode: IEpisode;
}

export interface IVideo {
  name: string;
  client_ip: string;
  folder_id: string;
  legacy: number;
  quality: number;
  storage: {
    id: number;
    number: number;
  }
  storage_download: {
    number: number;
  }
  host: string;
  proxy_index: number;
  proxy_download: number;
  cdn: {
    id: number;
    number: number;
    type: string;
    proxies: {
      id: number;
      number: number;
    }[]
  }
}