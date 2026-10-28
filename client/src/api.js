async function request(url, options) {
  const res = await fetch(url, options);
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request gagal (${res.status})`);
  }
  return res.status === 204 ? null : res.json();
}

const json = (method, body) => ({
  method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
});

export const api = {
  health: () => request('/api/health'),
  jenis: () => request('/api/jenis'),
  daftar: (q, jenis) => request(`/api/ikan?${new URLSearchParams({ q, jenis })}`),
  tambah: (data) => request('/api/ikan', json('POST', data)),
  suka: (id) => request(`/api/ikan/${id}/suka`, { method: 'POST' }),
  hapus: (id) => request(`/api/ikan/${id}`, { method: 'DELETE' }),
};

export const rupiah = (n) => `Rp ${Number(n).toLocaleString('id-ID')}`;
