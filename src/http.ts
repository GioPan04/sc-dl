import axios from 'axios';
import parse from 'node-html-parser';
import IAuth from './models/IAuth';
import IEpisode from './models/IEpisode';
import IStream, { IVideo } from './models/IStream';

export const getEpisodeStream = async (id: number) => (await axios.get<IVideo>('https://scws.xyz/videos/' + id)).data; 

export const getMaster = async (id: number, auth: IAuth, resolution = '480p.m3u8') => {
  const params = {
    type: 'video',
    rendition: resolution,
    token: auth.token,
    expires: `${auth.expire}`
  };
  const uri = axios.getUri({ url: `https://scws.xyz/master/${id}`, params });
  
  return (await axios.get<string>(uri)).data;
}; 

export const buildStreamUrl = (video: IVideo) => `https://sc-${video.cdn.type}${video.cdn.number}-01.${video.host}/hls/${video.storage.number}/${video.folder_id}/`;

export const getEpisode = async (title_id: number | string, episode_id?: number | string) => {
  const uri = axios.getUri({ url: 'https://streamingcommunity.blog/watch/' + title_id, params: { e: episode_id } });
  const { data: page } = await axios.get(uri);
  const dom = parse(page);
  const element = dom.querySelector('video-player')!;
  
  return JSON.parse(element.attributes.response) as IStream;
}