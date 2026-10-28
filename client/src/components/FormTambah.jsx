import { useState } from 'react';
import BettaSvg from './BettaSvg.jsx';

const KOSONG = { nama: '', jenis: 'Halfmoon', warna: '', hex: '#d62839', asal: '', harga: '', deskripsi: '', gambar: '' };

export default function FormTambah({ daftarJenis, onSimpan, onBatal }) {
  const [form, setForm] = useState(KOSONG);
  const [error, setError] = useState('');
  const ubah = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  async function submit(e) {
    e.preventDefault();
    try {
      await onSimpan({ ...form, harga: Number(form.harga || 0) });
      setForm(KOSONG);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <form className="form" onSubmit={submit}>
      <div className="form-preview"><BettaSvg hex={form.hex} jenis={form.jenis} /></div>
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
        <label className="lebar">URL foto (opsional)<input name="gambar" value={form.gambar} onChange={ubah} placeholder="https://..." /></label>
        <label className="lebar">Deskripsi<textarea name="deskripsi" rows="3" value={form.deskripsi} onChange={ubah} /></label>
      </div>
      {error && <p className="error">{error}</p>}
      <div className="form-aksi">
        <button type="button" className="sekunder" onClick={onBatal}>Batal</button>
        <button type="submit">Simpan ke galeri</button>
      </div>
    </form>
  );
}
