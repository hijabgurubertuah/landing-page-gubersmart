/**
 * ATURAN BAKU DESAIN SISTEM GUBER SMART
 * 
 * Aturan ini bersifat permanen dan mengikat seluruh komponen antarmuka:
 * 1. PRINSIP: Minimalis, bersih, ringkas, dan jelas, tampil seperti produk jadi profesional.
 * 2. TANPA TEKS PANJANG: Dilarang paragraf instruksi, tips, teks bantuan, atau penjelasan fungsi
 *    di seluruh tampilan, formulir, dan pengaturan CMS, termasuk penjelasan teknis (Drive, Apps Script,
 *    spreadsheet, format dan batas file).
 * 3. TEKS HANYA LABEL SINGKAT 1-3 KATA. Placeholder dikosongkan atau berisi contoh isi murni, bukan instruksi.
 * 4. TOMBOL AKSI: Tegas, langsung, fungsional (Simpan, Hapus, Kosongkan, Daftar, Pilih Gambar).
 * 5. KOLOM GAMBAR: Selalu punya tombol "Hapus Gambar" dengan pratinjau. Gambar bawaan tidak ditulis mati;
 *    bila kosong tampilkan kerangka netral navy-emas.
 * 6. JUDUL/SUBJUDUL BANNER: Boleh dikosongkan (ada tombol "Kosongkan"). Jika kosong, tampilkan gambar murni.
 * 7. AUTO-RESIZE: Semua kolom edit atau textarea otomatis membesar ke bawah mengikuti isi tanpa bilah gulir internal.
 * 8. SATU TEMA: Tidak ada pengalih tema terang/gelap. Tema navy & emas konsisten.
 * 9. NOTIFIKASI: Tampil tepat 0,5 detik (500ms) lalu hilang otomatis tanpa tombol tutup.
 * 10. TAMPILAN HP:
 *     - Header HP HANYA berisi logo/nama. Tidak ada tombol menu/hamburger di header HP.
 *     - Menu berupa sidebar tersembunyi dibuka oleh tombol 120x25 berikon hamburger di tepi kiri tengah layar,
 *       tidak ikut ter-scroll, latar terkunci saat terbuka, ketuk luar untuk menutup.
 *     - Area sentuh minimal 44-48px.
 * 11. LARANGAN MUTLAK:
 *     - Dilarang pill badge, chip, atau kotak berbingkai yang menyerupai tombol tapi tak bisa diklik.
 *     - Dilarang ikon dekoratif tanpa fungsi. Ikon HANYA untuk kontrol interaktif fungsional.
 *     - Teks status adalah teks biasa tanpa bingkai (misal: "Offline", "Belum aktif").
 */

export const DESIGN_SYSTEM = {
  colors: {
    navy: {
      darkest: '#07142b',
      deep: '#0b1c38',
      medium: '#12284a',
      light: '#1b365f',
    },
    gold: {
      main: '#c9a35a',
      light: '#e8cd8f',
      dark: '#a77d36',
    },
    cream: {
      main: '#f8f5ef',
      alternate: '#f1ece2',
    },
    text: {
      primary: '#1b2433',
      secondary: '#4b5565',
      muted: '#6b7280',
    },
    border: '#e7e1d5',
    white: '#ffffff',
    whatsapp: '#16a34a',
  },
  typography: {
    heading: "'Lora', Georgia, serif",
    body: "'Inter', system-ui, sans-serif",
  },
  layout: {
    maxWidth: '1200px',
    maxWidthWide: '1320px',
    cardRadius: '18px',
    buttonRadius: '9999px',
  },
  toastDurationMs: 500,
  sessionTimeoutMs: 30 * 60 * 1000,
  adminPasswords: {
    admin: 'admin123',
    superadmin: 'superadmin123',
  },
} as const;
