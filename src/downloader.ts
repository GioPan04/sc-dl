import { generateToken } from './auth';
import { buildStreamUrl, getEpisodeStream, getMaster } from './http';
import IStream from './models/IStream';
import fs from 'fs/promises';
import ffmpeg from 'fluent-ffmpeg';
import chalk from 'chalk';

export const downloadEpisode = async (episode: IStream) => {
  const stream = await getEpisodeStream(episode.scws_id);
  const auth = generateToken(stream.client_ip);
  const url = buildStreamUrl(stream);
  const master = await getMaster(episode.scws_id, auth);
  const select = /^(?!(#)).+/gm;
  const out = master.replace(select, url + '$&');
  const fileName = `${episode.title.name} - S${String(episode.season.number).padStart(2, '0')}E${String(episode.episode.number).padStart(2, '0')} - ${episode.episode.name}`;

  await fs.writeFile(`${fileName}.m3u8`, out);

  await new Promise((resolve, reject) => {
    ffmpeg()
      .input(`${fileName}.m3u8`)
      .inputOptions('-protocol_whitelist file,http,https,tcp,tls,crypto')
      .on('progress', (data) => logProgress(fileName, data.frames, data.currentFps, data.timemark))
      .on('error', reject)
      .on('end', resolve)
      .save((process.env.SAVE_PATH ?? '.') + `/${fileName}.mp4`)
    });
  process.stdout.write(chalk.bold.strikethrough(fileName) + ': ' + chalk.bold.green(' DONE\r\n'));

};

const logProgress = (name: string, frames: number, fps: number, timemark: string) => {
  process.stdout.clearLine(0);
  process.stdout.cursorTo(0);
  process.stdout.write(`${chalk.bold(name)}: ${frames} frames, ${fps} fps, ${timemark}`)
};