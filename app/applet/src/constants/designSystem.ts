/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.
 * 
 * DESIGN SYSTEM & PERMANENT RULES FOR GUBER SMART:
 * - Prinsip: minimalis, bersih, ringkas, dan jelas, tampil seperti produk jadi yang profesional.
 * - Tanpa teks panjang: dilarang paragraf instruksi, tips, teks bantuan, atau penjelasan fungsi di seluruh tampilan.
 * - Teks hanya label singkat 1-3 kata. Placeholder dikosongkan atau berisi contoh isi murni, bukan instruksi.
 * - Tombol aksi (Simpan, Hapus, Kosongkan) tegas, langsung, dan fungsional, dengan label kata kerja singkat.
 * - Setiap kolom gambar selalu punya tombol "Hapus Gambar" berikon tempat sampah di samping pratinjau.
 * - Semua kolom edit atau input teks otomatis membesar ke bawah mengikuti isinya, tanpa bilah gulir internal.
 * - Tidak ada gambar bawaan yang ditulis mati di kode; semua gambar dari pengaturan atau kerangka netral.
 * - Tidak ada tombol pengalih tema terang/gelap. Notifikasi hasil aksi tampil hanya 0,5 detik lalu hilang sendiri.
 * - Di HP: header hanya berisi logo atau nama; menu berupa sidebar tersembunyi yang dibuka tombol 120x25 berikon hamburger di tepi kiri tengah layar.
 * - Dilarang pill badge, chip, atau kotak berbingkai yang menyerupai tombol tetapi tidak bisa diklik; dilarang ikon dekoratif tanpa fungsi.
 */

export const DESIGN_SYSTEM = {
  colors: {
    navyDark: '#07142b',
    navy: '#0b1c38',
    navyLight: '#12284a',
    navyAccent: '#1b365f',
    gold: '#c9a35a',
    goldLight: '#e8cd8f',
    goldDark: '#a77d36',
    cream: '#f8f5ef',
    creamAlt: '#f1ece2',
    textMain: '#1b2433',
    textMuted: '#4b5565',
    textLight: '#6b7280',
    border: '#e7e1d5',
    white: '#ffffff',
    whatsapp: '#16a34a',
  },
  borderRadius: {
    card: '18px',
    button: '9999px',
    input: '12px',
  },
  shadows: {
    soft: '0 10px 25px -5px rgba(7, 20, 43, 0.08), 0 8px 10px -6px rgba(7, 20, 43, 0.05)',
    cardHover: '0 20px 35px -10px rgba(7, 20, 43, 0.12)',
  }
};
