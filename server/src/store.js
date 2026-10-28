import fs from 'node:fs';
import path from 'node:path';
import { seed } from './seed.js';

// Penyimpanan sederhana berbasis file JSON. Di container, file ini berada di volume /data.
export function createStore(filePath) {
  let data;
  if (filePath && fs.existsSync(filePath)) {
    data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    // Data lama (dari versi sebelumnya) belum punya foto: lengkapi dari data awal.
    for (const ikan of data) {
      const asal = seed.find((s) => s.id === ikan.id && s.nama === ikan.nama);
      if (asal && !ikan.gambar) ikan.gambar = asal.gambar;
    }
  } else {
    data = structuredClone(seed);
    save();
  }

  function save() {
    if (!filePath) return;
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  }

  return {
    all: () => data,
    get: (id) => data.find((ikan) => ikan.id === id),
    add(ikan) {
      const id = data.reduce((max, i) => Math.max(max, i.id), 0) + 1;
      const baru = { id, suka: 0, ...ikan };
      data.push(baru);
      save();
      return baru;
    },
    like(id) {
      const ikan = data.find((i) => i.id === id);
      if (!ikan) return null;
      ikan.suka += 1;
      save();
      return ikan;
    },
    remove(id) {
      const before = data.length;
      data = data.filter((i) => i.id !== id);
      save();
      return data.length < before;
    },
  };
}
