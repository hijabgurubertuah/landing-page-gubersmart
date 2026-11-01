import { ClassItem, CurriculumMeeting, ClassFAQ } from '../types';

/**
 * Normalisasi URL pendaftaran (Lynk.id / WhatsApp / http).
 * Mengubah "lynk.id/..." -> "https://lynk.id/...", "08..." -> "https://wa.me/62...", dll.
 */
export function formatClassUrl(url: any): string {
  if (!url || typeof url !== 'string') return 'https://lynk.id';
  let trimmed = url.trim();
  if (!trimmed) return 'https://lynk.id';

  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }

  if (/^(www\.)?lynk\.id/i.test(trimmed)) {
    return 'https://' + trimmed.replace(/^www\./i, '');
  }

  if (/^(www\.)?wa\.me/i.test(trimmed)) {
    return 'https://' + trimmed.replace(/^www\./i, '');
  }

  // Jika berupa nomor telepon WhatsApp (misal 0812... atau 62812...)
  const digits = trimmed.replace(/[^0-9]/g, '');
  if (digits.length >= 9) {
    let cleanPhone = digits;
    if (cleanPhone.startsWith('0')) {
      cleanPhone = '62' + cleanPhone.slice(1);
    }
    return `https://wa.me/${cleanPhone}`;
  }

  return 'https://' + trimmed;
}

/**
 * Pembuat slug ramah SEO dari nama kelas.
 */
export function generateSlug(name: any): string {
  if (!name || typeof name !== 'string') return 'kelas-' + Date.now().toString().slice(-4);
  const clean = name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return clean || 'kelas-' + Date.now().toString().slice(-4);
}

/**
 * Konversi teks/angka menjadi angka bulat Rupiah non-negatif.
 */
export function parseRupiah(val: any): number {
  if (typeof val === 'number') {
    return isNaN(val) || val < 0 ? 0 : Math.floor(val);
  }
  if (!val || typeof val !== 'string') return 0;
  const digitsOnly = val.replace(/[^0-9]/g, '');
  if (!digitsOnly) return 0;
  const parsed = parseInt(digitsOnly, 10);
  return isNaN(parsed) || parsed < 0 ? 0 : parsed;
}

/**
 * Format angka ke format Rupiah tampilan (misal: "Rp199.000").
 */
export function formatRupiah(val: number): string {
  if (isNaN(val) || val < 0) return 'Rp0';
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(val);
}

/**
 * Normalisasi satu objek kelas aman dari segala jenis data/format.
 * TIDAK PERNAH MELEMPAR ERROR / CRASH.
 */
export function normalizeClassItem(raw: any): ClassItem | null {
  if (!raw || typeof raw !== 'object') return null;

  try {
    const id = String(raw.id || raw.ID || '').trim() || 'class_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6);
    const name = String(raw.name || raw.nama || raw.Nama || '').trim();

    // Jika tidak ada nama dan id tidak valid, batalkan
    if (!name && !raw.id && !raw.ID) return null;

    const rawSlug = String(raw.slug || raw.Slug || '').trim();
    const slug = rawSlug ? generateSlug(rawSlug) : generateSlug(name || 'kelas');

    let image = String(raw.image || raw.gambar || raw.Gambar || '').trim();
    // Hapus data: base64 image strings agar tidak melebihi sel Google Sheets
    if (image.toLowerCase().startsWith('data:')) {
      image = '';
    }

    const normalPrice = parseRupiah(raw.normalPrice ?? raw.hargaNormal);
    const currentPrice = parseRupiah(raw.currentPrice ?? raw.hargaSekarang);

    let status: 'active' | 'inactive' = 'active';
    const rawStatus = String(raw.status || raw.Status || '').toLowerCase().trim();
    if (rawStatus === 'inactive' || rawStatus === 'nonaktif' || rawStatus === 'false' || rawStatus === '0') {
      status = 'inactive';
    } else {
      status = 'active';
    }

    const lynkidUrl = formatClassUrl(raw.lynkidUrl || raw.tautan || raw.Tautan || raw.url);
    const shortDesc = String(raw.shortDesc || raw.deskripsiSingkat || raw.DeskripsiSingkat || '').trim();
    const fullDesc = String(raw.fullDesc || raw.deskripsiLengkap || raw.DeskripsiLengkap || '').trim();

    // Normalisasi Kurikulum
    let curriculum: CurriculumMeeting[] = [];
    let rawCurr = raw.curriculum || raw.kurikulum || raw.Kurikulum;
    if (typeof rawCurr === 'string' && rawCurr.trim()) {
      try {
        rawCurr = JSON.parse(rawCurr);
      } catch {
        rawCurr = [];
      }
    }
    if (Array.isArray(rawCurr)) {
      curriculum = rawCurr
        .filter((c) => c && typeof c === 'object')
        .map((c, idx) => ({
          meeting: idx + 1,
          title: String(c.title || c.judul || `Pertemuan ${idx + 1}`).trim(),
          content: String(c.content || c.ringkasan || '').trim(),
        }))
        .filter((c) => c.title || c.content);
    }

    // Normalisasi FAQ
    let faqs: ClassFAQ[] = [];
    let rawFaq = raw.faqs || raw.faq || raw.FAQ;
    if (typeof rawFaq === 'string' && rawFaq.trim()) {
      try {
        rawFaq = JSON.parse(rawFaq);
      } catch {
        rawFaq = [];
      }
    }
    if (Array.isArray(rawFaq)) {
      faqs = rawFaq
        .filter((f) => f && typeof f === 'object')
        .map((f) => ({
          q: String(f.q || f.pertanyaan || '').trim(),
          a: String(f.a || f.jawaban || '').trim(),
        }))
        .filter((f) => f.q || f.a);
    }

    const clicksCount = Math.max(0, parseInt(String(raw.clicksCount ?? raw.klik ?? 0), 10) || 0);
    const order = Math.max(1, parseInt(String(raw.order ?? 1), 10) || 1);
    const dibuat = parseInt(String(raw.dibuat || raw.createdAt || Date.now()), 10) || Date.now();
    const diubah = parseInt(String(raw.diubah || raw.updatedAt || Date.now()), 10) || Date.now();
    const dihapus = Boolean(raw.dihapus || raw.isDeleted);

    return {
      id,
      name: name || 'Kelas Guber Smart',
      slug,
      image,
      normalPrice,
      currentPrice,
      status,
      lynkidUrl,
      shortDesc,
      fullDesc,
      curriculum,
      faqs,
      clicksCount,
      order,
      quota: String(raw.quota || ''),
      schedule: String(raw.schedule || ''),
      outcome: String(raw.outcome || ''),
      targetAudience: String(raw.targetAudience || ''),
      dibuat,
      diubah,
      dihapus,
    };
  } catch {
    return null;
  }
}

/**
 * Normalisasi daftar kelas aman, menggabungkan ID ganda, dan menjamin slug unik.
 */
export function normalizeClassList(raw: any): ClassItem[] {
  if (!raw) return [];

  let list: any[] = [];
  if (typeof raw === 'string') {
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) list = parsed;
    } catch {
      list = [];
    }
  } else if (Array.isArray(raw)) {
    list = raw;
  } else if (typeof raw === 'object') {
    if (Array.isArray(raw.data)) list = raw.data;
    else if (Array.isArray(raw.records)) list = raw.records;
    else if (Array.isArray(raw.classes)) list = raw.classes;
    else if (Array.isArray(raw.Kelas)) list = raw.Kelas;
  }

  const mapById = new Map<string, ClassItem>();

  for (const item of list) {
    const normalized = normalizeClassItem(item);
    if (!normalized) continue;

    const existing = mapById.get(normalized.id);
    if (!existing) {
      mapById.set(normalized.id, normalized);
    } else {
      // Jika id sama, ambil yang diubah-nya lebih baru
      if ((normalized.diubah || 0) >= (existing.diubah || 0)) {
        mapById.set(normalized.id, normalized);
      }
    }
  }

  const results = Array.from(mapById.values());

  // Pastikan slug unik untuk kelas-kelas yang tidak dihapus
  const usedSlugs = new Set<string>();
  results.forEach((c) => {
    if (c.dihapus) return;
    let baseSlug = c.slug || generateSlug(c.name);
    let currentSlug = baseSlug;
    let counter = 1;
    while (usedSlugs.has(currentSlug)) {
      currentSlug = `${baseSlug}-${counter}`;
      counter++;
    }
    usedSlugs.add(currentSlug);
    c.slug = currentSlug;
  });

  // Urutkan kelas terbaru di atas (dibuat descending)
  return results.sort((a, b) => (b.dibuat || 0) - (a.dibuat || 0));
}
