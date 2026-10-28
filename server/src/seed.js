// Data awal galeri. Foto diambil dari Wikimedia Commons (lisensi bebas, lihat halaman sumbernya).
// Warna dipakai untuk ilustrasi cadangan jika foto gagal dimuat.
const foto = (file) => `https://commons.wikimedia.org/wiki/Special:FilePath/${file}?width=640`;
const halaman = (file) => `https://commons.wikimedia.org/wiki/File:${file}`;

export const seed = [
  { id: 1, gambar: foto('Betta_Half_Moon.jpg'), sumberFoto: halaman('Betta_Half_Moon.jpg'), nama: 'Halfmoon Red Butterfly', jenis: 'Halfmoon', warna: 'Merah Putih', hex: '#d62839', asal: 'Thailand',
    harga: 150000, deskripsi: 'Sirip ekor membuka hingga 180 derajat membentuk setengah lingkaran. Tubuh merah dengan tepi sirip putih seperti sayap kupu-kupu.', suka: 12 },
  { id: 2, gambar: foto('Betta_plakat.jpg'), sumberFoto: halaman('Betta_plakat.jpg'), nama: 'Plakat Blue Rim', jenis: 'Plakat', warna: 'Biru', hex: '#3b82f6', asal: 'Indonesia',
    harga: 85000, deskripsi: 'Sirip pendek dan kokoh, lincah, dan dulunya dipakai sebagai ikan aduan. Sisik biru muda mengilap.', suka: 8 },
  { id: 3, gambar: foto('Betta_splendens_male_crowntail.png'), sumberFoto: halaman('Betta_splendens_male_crowntail.png'), nama: 'Crowntail Red Blue', jenis: 'Crowntail', warna: 'Merah Biru', hex: '#b91c1c', asal: 'Indonesia',
    harga: 120000, deskripsi: 'Ujung sirip berbentuk jari-jari seperti mahkota. Tubuh biru dengan sirip merah menyala. Ras ini pertama kali dikembangkan di Indonesia.', suka: 15 },
  { id: 4, gambar: foto('Betta_splendens_male_doubletail.jpg'), sumberFoto: halaman('Betta_splendens_male_doubletail.jpg'), nama: 'Double Tail Green Red', jenis: 'Double Tail', warna: 'Hijau Merah', hex: '#4d7c0f', asal: 'Thailand',
    harga: 175000, deskripsi: 'Ekor terbelah dua dan sirip punggung lebar. Sisik hijau metalik dengan sirip bergaris merah.', suka: 6 },
  { id: 5, gambar: foto('CTPK_Multi_M_-_Betta-online.jpg'), sumberFoto: halaman('CTPK_Multi_M_-_Betta-online.jpg'), nama: 'Crowntail Plakat Emerald', jenis: 'Crowntail', warna: 'Hijau Tosca', hex: '#14b8a6', asal: 'Thailand',
    harga: 200000, deskripsi: 'Perpaduan sirip pendek plakat dengan ujung sirip berduri seperti crowntail. Warna hijau tosca berkilau.', suka: 21 },
  { id: 6, gambar: foto('Yellow_halfmoon_Betta_splendens.jpg'), sumberFoto: halaman('Yellow_halfmoon_Betta_splendens.jpg'), nama: 'Halfmoon Super Yellow', jenis: 'Halfmoon', warna: 'Kuning', hex: '#eab308', asal: 'Thailand',
    harga: 300000, deskripsi: 'Halfmoon dengan warna kuning cerah merata dari tubuh sampai ujung sirip. Termasuk warna yang sulit didapat.', suka: 9 },
  { id: 7, gambar: foto('Hector_betta_splendens.jpg'), sumberFoto: halaman('Hector_betta_splendens.jpg'), nama: 'Veiltail Dark Red', jenis: 'Veiltail', warna: 'Merah Gelap', hex: '#7f1d1d', asal: 'Indonesia',
    harga: 50000, deskripsi: 'Ekor panjang menjuntai seperti kerudung dengan warna merah gelap kebiruan. Jenis paling umum dan cocok untuk pemula.', suka: 4 },
  { id: 8, gambar: foto('Betta_hmpk.jpg'), sumberFoto: halaman('Betta_hmpk.jpg'), nama: 'Nemo Koi Galaxy', jenis: 'Plakat', warna: 'Multiwarna', hex: '#f97316', asal: 'Indonesia',
    harga: 400000, deskripsi: 'Halfmoon plakat dengan corak acak merah, biru, dan putih seperti ikan koi. Warnanya bisa berubah seiring umur.', suka: 18 },
];
