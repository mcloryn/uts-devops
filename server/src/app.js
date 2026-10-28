import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { createStore } from './store.js';

const JENIS = ['Halfmoon', 'Plakat', 'Crowntail', 'Double Tail', 'Giant', 'Veiltail'];

export function createApp({ dataFile, publicDir, version = 'dev' } = {}) {
  const store = createStore(dataFile);
  const app = express();
  app.use(express.json());

  app.get('/api/health', (_req, res) => res.json({ status: 'ok', version }));

  app.get('/api/jenis', (_req, res) => res.json(JENIS));

  app.get('/api/ikan', (req, res) => {
    const { q = '', jenis = '' } = req.query;
    const kata = String(q).toLowerCase();
    const hasil = store.all().filter((i) =>
      (!jenis || i.jenis === jenis) &&
      (!kata || `${i.nama} ${i.warna} ${i.asal}`.toLowerCase().includes(kata)));
    res.json(hasil);
  });

  app.get('/api/ikan/:id', (req, res) => {
    const ikan = store.get(Number(req.params.id));
    if (!ikan) return res.status(404).json({ error: 'Ikan tidak ditemukan' });
    res.json(ikan);
  });

  app.post('/api/ikan', (req, res) => {
    const { nama, jenis, warna, hex = '#d62839', asal = '-', harga = 0, deskripsi = '', gambar = '' } = req.body || {};
    if (!nama || !String(nama).trim() || !JENIS.includes(jenis) || !warna) {
      return res.status(400).json({ error: 'Nama, jenis, dan warna wajib diisi dengan benar' });
    }
    if (!/^#[0-9a-fA-F]{6}$/.test(hex) || Number(harga) < 0) {
      return res.status(400).json({ error: 'Format warna atau harga tidak valid' });
    }
    const baru = store.add({
      nama: String(nama).trim(), jenis, warna, hex, asal,
      harga: Number(harga), deskripsi, gambar,
    });
    res.status(201).json(baru);
  });

  app.post('/api/ikan/:id/suka', (req, res) => {
    const ikan = store.like(Number(req.params.id));
    if (!ikan) return res.status(404).json({ error: 'Ikan tidak ditemukan' });
    res.json(ikan);
  });

  app.delete('/api/ikan/:id', (req, res) => {
    if (!store.remove(Number(req.params.id))) return res.status(404).json({ error: 'Ikan tidak ditemukan' });
    res.status(204).end();
  });

  // Di produksi, hasil build React disajikan dari folder public oleh server yang sama.
  if (publicDir && fs.existsSync(publicDir)) {
    app.use(express.static(publicDir));
    app.get('*', (_req, res) => res.sendFile(path.join(publicDir, 'index.html')));
  }

  return app;
}
