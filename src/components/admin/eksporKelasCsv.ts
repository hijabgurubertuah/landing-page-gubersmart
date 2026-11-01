import { ClassItem } from '../../types';

export function exportClassesToCsv(classes: ClassItem[]): void {
  const headers = [
    'Nama',
    'Slug',
    'Status',
    'Harga Normal',
    'Harga Sekarang',
    'Tautan Pendaftaran',
    'Klik',
    'Deskripsi Singkat',
    'Jumlah Pertemuan',
  ];

  const escapeCsv = (val: any): string => {
    if (val === null || val === undefined) return '""';
    const str = String(val).replace(/"/g, '""');
    return `"${str}"`;
  };

  const rows = classes.map((c) => [
    escapeCsv(c.name),
    escapeCsv(c.slug),
    escapeCsv(c.status === 'active' ? 'Aktif' : 'Nonaktif'),
    c.normalPrice || 0,
    c.currentPrice || 0,
    escapeCsv(c.lynkidUrl),
    c.clicksCount || 0,
    escapeCsv(c.shortDesc),
    Array.isArray(c.curriculum) ? c.curriculum.length : 0,
  ]);

  const csvContent =
    '\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `daftar_kelas_${Date.now()}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
