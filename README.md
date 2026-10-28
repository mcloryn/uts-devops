# Galeri Ikan Cupang

Aplikasi web galeri ikan cupang (Betta splendens): menampilkan koleksi jenis cupang,
pencarian, filter berdasarkan jenis, detail ikan, tombol suka, serta menambah dan
menghapus ikan. Dibuat untuk UTS Pengembangan dan Operasi (IF-B Pagi).

- **Frontend:** React 18 + Vite
- **Backend:** Node.js 22 + Express (REST API, data JSON di volume `/data`)
- **Container:** Docker (multi-stage build)
- **CI/CD:** GitHub Actions → Docker Hub → deploy ke mesin Docker (self-hosted runner)

## Menjalankan dengan Docker

```bash
docker build -t galeri-cupang .
docker run -d --name galeri-cupang -p 8080:3000 -v cupang-data:/data galeri-cupang
# buka http://localhost:8080
```

Atau dengan Docker Compose:

```bash
docker compose up -d --build
```

## Menjalankan tanpa Docker (development)

```bash
cd server && npm install && npm run dev      # API di http://localhost:3000
cd client && npm install && npm run dev      # React di http://localhost:5173
```

Test API: `cd server && npm test`

## API

| Method | Path | Fungsi |
|---|---|---|
| GET | `/api/health` | Status aplikasi dan versi |
| GET | `/api/jenis` | Daftar jenis cupang |
| GET | `/api/ikan?q=&jenis=` | Daftar ikan (cari dan filter) |
| GET | `/api/ikan/:id` | Detail satu ikan |
| POST | `/api/ikan` | Tambah ikan |
| POST | `/api/ikan/:id/suka` | Tambah jumlah suka |
| DELETE | `/api/ikan/:id` | Hapus ikan |

## CI/CD

Workflow: `.github/workflows/ci-cd.yml`, berjalan saat push / pull request ke `main`.

1. **Test & Build Kode** – `npm test` (8 test API) dan `npm run build` (React).
2. **Build & Push Image Docker** – build image, smoke test container, push ke Docker Hub
   dengan tag `latest` dan short SHA commit.
3. **Deploy Container** – di self-hosted runner: pull image terbaru, ganti container lama,
   cek status `healthy`.

### Persiapan sekali saja

1. Buat akun Docker Hub, lalu buat Access Token (Account Settings → Personal access tokens).
2. Di repo GitHub: Settings → Secrets and variables → Actions, tambahkan
   `DOCKERHUB_USERNAME` dan `DOCKERHUB_TOKEN`.
3. Di laptop/PC yang sudah terpasang Docker: Settings → Actions → Runners → **New self-hosted runner**,
   ikuti perintah yang ditampilkan (`./config.sh ...` lalu `./run.sh`). Runner inilah yang
   menjalankan job deploy.
