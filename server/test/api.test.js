import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { createApp } from '../src/app.js';

let server;
let base;

before(async () => {
  server = createApp({ version: 'test' }).listen(0);
  await new Promise((r) => server.once('listening', r));
  base = `http://127.0.0.1:${server.address().port}`;
});
after(() => server.close());

test('health check mengembalikan status ok', async () => {
  const res = await fetch(`${base}/api/health`);
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), { status: 'ok', version: 'test' });
});

test('daftar ikan berisi data awal', async () => {
  const data = await (await fetch(`${base}/api/ikan`)).json();
  assert.ok(data.length >= 8);
});

test('filter berdasarkan jenis', async () => {
  const data = await (await fetch(`${base}/api/ikan?jenis=Plakat`)).json();
  assert.ok(data.length > 0);
  assert.ok(data.every((i) => i.jenis === 'Plakat'));
});

test('pencarian berdasarkan kata kunci', async () => {
  const data = await (await fetch(`${base}/api/ikan?q=gold`)).json();
  assert.equal(data[0].nama, 'Avatar Gold');
});

test('menambah ikan baru', async () => {
  const res = await fetch(`${base}/api/ikan`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nama: 'Plakat Hellboy', jenis: 'Plakat', warna: 'Merah', hex: '#b91c1c', harga: 90000 }),
  });
  assert.equal(res.status, 201);
  const ikan = await res.json();
  assert.equal(ikan.suka, 0);
  assert.equal((await (await fetch(`${base}/api/ikan/${ikan.id}`)).json()).nama, 'Plakat Hellboy');
});

test('input tidak valid ditolak', async () => {
  const res = await fetch(`${base}/api/ikan`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nama: '', jenis: 'Lele', warna: 'Merah' }),
  });
  assert.equal(res.status, 400);
});

test('tombol suka menambah jumlah suka', async () => {
  const awal = (await (await fetch(`${base}/api/ikan/1`)).json()).suka;
  const res = await fetch(`${base}/api/ikan/1/suka`, { method: 'POST' });
  assert.equal((await res.json()).suka, awal + 1);
});

test('ikan yang tidak ada menghasilkan 404', async () => {
  assert.equal((await fetch(`${base}/api/ikan/999`)).status, 404);
});
