import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createApp } from './app.js';

const here = path.dirname(fileURLToPath(import.meta.url));
const port = Number(process.env.PORT || 3000);

const app = createApp({
  dataFile: process.env.DATA_FILE || path.join(here, '..', 'data', 'ikan.json'),
  publicDir: process.env.PUBLIC_DIR || path.join(here, '..', 'public'),
  version: process.env.APP_VERSION || 'dev',
});

app.listen(port, () => console.log(`Galeri Cupang berjalan di port ${port}`));
