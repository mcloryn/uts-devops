import { useEffect, useState } from 'react';
import { api } from './api.js';
import IkanCard from './components/IkanCard.jsx';
import DetailModal from './components/DetailModal.jsx';
import FormTambah from './components/FormTambah.jsx';

export default function App() {
  const [ikan, setIkan] = useState([]);
  const [daftarJenis, setDaftarJenis] = useState([]);
  const [q, setQ] = useState('');
  const [jenis, setJenis] = useState('');
  const [dipilih, setDipilih] = useState(null);
  const [tambah, setTambah] = useState(false);
  const [versi, setVersi] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    api.jenis().then(setDaftarJenis).catch((e) => setError(e.message));
    api.health().then((h) => setVersi(h.version)).catch(() => {});
  }, []);

  useEffect(() => {
    const t = setTimeout(() => api.daftar(q, jenis).then(setIkan).catch((e) => setError(e.message)), 200);
    return () => clearTimeout(t);
  }, [q, jenis]);

  const muatUlang = () => api.daftar(q, jenis).then(setIkan);

  async function suka(id) {
    const baru = await api.suka(id);
    setIkan((list) => list.map((i) => (i.id === id ? baru : i)));
    if (dipilih?.id === id) setDipilih(baru);
  }

  async function simpan(data) {
    await api.tambah(data);
    setTambah(false);
    await muatUlang();
  }

  async function hapus(id) {
    if (!confirm('Hapus ikan ini dari galeri?')) return;
    await api.hapus(id);
    setDipilih(null);
    await muatUlang();
  }

  return (
    <>
      <header className="hero">
        <div className="wrap">
          <p className="eyebrow">Koleksi Betta splendens</p>
          <h1>Galeri Ikan Cupang</h1>
          <p className="sub">Kenali jenis-jenis cupang hias, dari Halfmoon sampai Crowntail asli Indonesia.</p>
        </div>
      </header>

      <main className="wrap">
        <div className="toolbar">
          <input type="search" placeholder="Cari nama, warna, atau asal..." value={q} onChange={(e) => setQ(e.target.value)} />
          <button onClick={() => setTambah((v) => !v)}>{tambah ? 'Tutup form' : '+ Tambah ikan'}</button>
        </div>
        <div className="chips">
          {['', ...daftarJenis].map((j) => (
            <button key={j || 'semua'} className={jenis === j ? 'chip aktif' : 'chip'} onClick={() => setJenis(j)}>
              {j || 'Semua'}
            </button>
          ))}
        </div>

        {tambah && <FormTambah daftarJenis={daftarJenis} onSimpan={simpan} onBatal={() => setTambah(false)} />}
        {error && <p className="error">{error}</p>}

        <section className="grid">
          {ikan.map((i) => <IkanCard key={i.id} ikan={i} onBuka={setDipilih} onSuka={suka} />)}
        </section>
        {ikan.length === 0 && <p className="kosong">Tidak ada ikan yang cocok dengan pencarian.</p>}
      </main>

      <footer className="wrap footer">Galeri Ikan Cupang · versi {versi || '-'} · UTS DevOps IF-B · Foto: Wikimedia Commons</footer>

      <DetailModal ikan={dipilih} onTutup={() => setDipilih(null)} onHapus={hapus} />
    </>
  );
}
