import { useState } from 'react';
import BettaSvg from './BettaSvg.jsx';

const KOSONG = { nama: '', jenis: 'Halfmoon', warna: '', hex: '#d62839', asal: '', harga: '', deskripsi: '' };

// Mengecilkan foto di browser (maks. 1000 px, JPEG) supaya upload cepat dan hemat penyimpanan.
function kecilkanFoto(file) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const skala = Math.min(1, 1000 / Math.max(img.width, img.height));
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(img.width * skala);
      canvas.height = Math.round(img.height * skala);
      canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(img.src);
      resolve(canvas.toDataURL('image/jpeg', 0.85));
    };
    img.onerror = () => reject(new Error('File yang dipilih bukan gambar'));
    img.src = URL.createObjectURL(file);
  });
}

export default function FormTambah({ daftarJenis, onSimpan, onBatal }) {
  const [form, setForm] = useState(KOSONG);
  const [foto, setFoto] = useState('');
  const [error, setError] = useState('');
  const [menyimpan, setMenyimpan] = useState(false);
  const ubah = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  async function pilihFoto(e) {
    const file = e.target.files[0];
    setError('');
    if (!file) return setFoto('');
    try {
      setFoto(await kecilkanFoto(file));
    } catch (err) {
      setError(err.message);
      e.target.value = '';
    }
  }

  async function submit(e) {
    e.preventDefault();
    setMenyimpan(true);
    try {
      await onSimpan({ ...form, harga: Number(form.harga || 0), fotoData: foto });
      setForm(KOSONG);
      setFoto('');
    } catch (err) {
      setError(err.message);
    } finally {
      setMenyimpan(false);
    }
  }

  return (
    <form className="form" onSubmit={submit}>
      <div className="form-preview">
        {foto ? <img src={foto} alt="Pratinjau foto ikan" /> : <BettaSvg hex={form.hex} jenis={form.jenis} />}
      </div>
      <div className="form-grid">
        <label>Nama ikan<input name="nama" value={form.nama} onChange={ubah} required placeholder="mis. Plakat Fancy" /></label>
        <label>Jenis
          <select name="jenis" value={form.jenis} onChange={ubah}>
            {daftarJenis.map((j) => <option key={j}>{j}</option>)}
          </select>
        </label>
        <label>Warna<input name="warna" value={form.warna} onChange={ubah} required placeholder="mis. Merah" /></label>
        <label>Warna ilustrasi<input type="color" name="hex" value={form.hex} onChange={ubah} /></label>
        <label>Asal<input name="asal" value={form.asal} onChange={ubah} placeholder="mis. Indonesia" /></label>
        <label>Harga (Rp)<input type="number" min="0" name="harga" value={form.harga} onChange={ubah} /></label>
        <label className="lebar">Foto ikan (opsional, dari penyimpanan)
          <input type="file" accept="image/png, image/jpeg, image/webp" onChange={pilihFoto} />
        </label>
        <label className="lebar">Deskripsi<textarea name="deskripsi" rows="3" value={form.deskripsi} onChange={ubah} /></label>
      </div>
      {error && <p className="error">{error}</p>}
      <div className="form-aksi">
        <button type="button" className="sekunder" onClick={onBatal}>Batal</button>
        <button type="submit" disabled={menyimpan}>{menyimpan ? 'Menyimpan...' : 'Simpan ke galeri'}</button>
      </div>
    </form>
  );
}
