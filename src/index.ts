import { downloadEpisode } from './downloader';
import { getEpisode } from './http';
import ISeason from './models/ISeason';

const data: ISeason[] = require("../seasons.json");
const season = data[2];
for (const episode of season.episodes) {
  console.log(`${episode.number}) ${episode.name} (${episode.id})`);
}

(async () => {
  try {
    for (const e of season.episodes) {
      const episode = await getEpisode(season.title_id, e.id);
      await downloadEpisode(episode);
    }

  } catch (e) {
    console.error(e);
  }
})();