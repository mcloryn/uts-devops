import BettaSvg from './BettaSvg.jsx';
import { rupiah } from '../api.js';

export default function IkanCard({ ikan, onBuka, onSuka }) {
  return (
    <article className="card">
      <button className="card-gambar" onClick={() => onBuka(ikan)} aria-label={`Lihat detail ${ikan.nama}`}>
        {ikan.gambar ? <img src={ikan.gambar} alt={ikan.nama} /> : <BettaSvg hex={ikan.hex} jenis={ikan.jenis} />}
      </button>
      <div className="card-isi">
        <span className="badge">{ikan.jenis}</span>
        <h3>{ikan.nama}</h3>
        <p className="meta">{ikan.warna} · {ikan.asal}</p>
        <div className="card-bawah">
          <strong>{rupiah(ikan.harga)}</strong>
          <button className="suka" onClick={() => onSuka(ikan.id)} aria-label="Suka">♥ {ikan.suka}</button>
        </div>
      </div>
    </article>
  );
}
