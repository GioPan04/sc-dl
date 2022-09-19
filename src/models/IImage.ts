import IProxy from './IProxy';
import IServer from './IServer';

export default interface IImage {
  imageable_id: number;
  imageable_type: string;
  server_id: number;
  proxy_id: number;
  url: string;
  type: string;
  original_url: string;
  sc_url: string;
  proxy: IProxy;
  server: IServer;
}