import BettaSvg from './BettaSvg.jsx';
import { rupiah } from '../api.js';

export default function DetailModal({ ikan, onTutup, onHapus }) {
  if (!ikan) return null;
  return (
    <div className="overlay" onClick={onTutup}>
      <div className="modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <button className="tutup" onClick={onTutup} aria-label="Tutup">×</button>
        <div className="modal-gambar">
          {ikan.gambar ? <img src={ikan.gambar} alt={ikan.nama} /> : <BettaSvg hex={ikan.hex} jenis={ikan.jenis} />}
        </div>
        <span className="badge">{ikan.jenis}</span>
        <h2>{ikan.nama}</h2>
        <p>{ikan.deskripsi || 'Belum ada deskripsi.'}</p>
        <dl>
          <dt>Warna</dt><dd>{ikan.warna}</dd>
          <dt>Asal</dt><dd>{ikan.asal}</dd>
          <dt>Harga</dt><dd>{rupiah(ikan.harga)}</dd>
          <dt>Disukai</dt><dd>{ikan.suka} kali</dd>
        </dl>
        <button className="hapus" onClick={() => onHapus(ikan.id)}>Hapus dari galeri</button>
      </div>
    </div>
  );
}
