import { useState } from 'react';
import BettaSvg from './BettaSvg.jsx';

// Menampilkan foto ikan. Jika foto tidak ada atau gagal dimuat, pakai ilustrasi SVG.
export default function FotoIkan({ ikan }) {
  const [gagal, setGagal] = useState(false);
  if (!ikan.gambar || gagal) return <BettaSvg hex={ikan.hex} jenis={ikan.jenis} />;
  return <img src={ikan.gambar} alt={ikan.nama} loading="lazy" onError={() => setGagal(true)} />;
}
