// Data awal galeri. Foto diambil dari Wikimedia Commons (lisensi bebas, lihat halaman sumbernya).
// Warna dipakai untuk ilustrasi cadangan jika foto gagal dimuat.
const foto = (file) => `https://commons.wikimedia.org/wiki/Special:FilePath/${file}?width=640`;
const halaman = (file) => `https://commons.wikimedia.org/wiki/File:${file}`;

export const seed = [
  { id: 1, gambar: foto('Betta_Half_Moon.jpg'), sumberFoto: halaman('Betta_Half_Moon.jpg'), nama: 'Halfmoon Super Red', jenis: 'Halfmoon', warna: 'Merah', hex: '#d62839', asal: 'Thailand',
    harga: 150000, deskripsi: 'Sirip ekor membuka hingga 180 derajat membentuk setengah lingkaran. Warna merah pekat tanpa belang.', suka: 12 },
  { id: 2, gambar: foto('Betta_plakat.jpg'), sumberFoto: halaman('Betta_plakat.jpg'), nama: 'Plakat Blue Rim', jenis: 'Plakat', warna: 'Biru', hex: '#1d4ed8', asal: 'Indonesia',
    harga: 85000, deskripsi: 'Sirip pendek dan kokoh, lincah, dan dulunya dipakai sebagai ikan aduan. Tepi sirip biru terang.', suka: 8 },
  { id: 3, gambar: foto('Betta_splendens_male_crowntail.png'), sumberFoto: halaman('Betta_splendens_male_crowntail.png'), nama: 'Crowntail Black Orchid', jenis: 'Crowntail', warna: 'Hitam', hex: '#3b1f4a', asal: 'Indonesia',
    harga: 120000, deskripsi: 'Ujung sirip berbentuk jari-jari seperti mahkota. Ras ini pertama kali dikembangkan di Indonesia.', suka: 15 },
  { id: 4, gambar: foto('Betta_splendens_male_doubletail.jpg'), sumberFoto: halaman('Betta_splendens_male_doubletail.jpg'), nama: 'Double Tail Lavender', jenis: 'Double Tail', warna: 'Ungu', hex: '#8b5cf6', asal: 'Thailand',
    harga: 175000, deskripsi: 'Ekor terbelah dua dan sirip punggung lebar. Warna lavender lembut dengan kilau metalik.', suka: 6 },
  { id: 5, gambar: foto('CTPK_Multi_M_-_Betta-online.jpg'), sumberFoto: halaman('CTPK_Multi_M_-_Betta-online.jpg'), nama: 'Nemo Koi Galaxy', jenis: 'Plakat', warna: 'Multiwarna', hex: '#f97316', asal: 'Thailand',
    harga: 250000, deskripsi: 'Corak acak oranye, hitam, dan putih seperti ikan koi. Warna bisa berubah seiring umur.', suka: 21 },
  { id: 6, gambar: foto('Yellow_halfmoon_Betta_splendens.jpg'), sumberFoto: halaman('Yellow_halfmoon_Betta_splendens.jpg'), nama: 'Giant Yellow', jenis: 'Giant', warna: 'Kuning', hex: '#eab308', asal: 'Thailand',
    harga: 300000, deskripsi: 'Ukuran tubuh bisa mencapai 7 cm, hampir dua kali betta biasa. Warna kuning cerah.', suka: 9 },
  { id: 7, gambar: foto('Hector_betta_splendens.jpg'), sumberFoto: halaman('Hector_betta_splendens.jpg'), nama: 'Veiltail Turquoise', jenis: 'Veiltail', warna: 'Hijau', hex: '#14b8a6', asal: 'Indonesia',
    harga: 50000, deskripsi: 'Ekor panjang menjuntai seperti kerudung. Jenis paling umum dan cocok untuk pemula.', suka: 4 },
  { id: 8, gambar: foto('Betta_hmpk.jpg'), sumberFoto: halaman('Betta_hmpk.jpg'), nama: 'Avatar Gold', jenis: 'Halfmoon', warna: 'Emas', hex: '#ca8a04', asal: 'Indonesia',
    harga: 400000, deskripsi: 'Sisik keemasan berkilau penuh menutupi tubuh. Salah satu varian paling dicari kolektor.', suka: 18 },
];
