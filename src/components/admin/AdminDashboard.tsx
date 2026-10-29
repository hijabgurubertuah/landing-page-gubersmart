// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

import React, { useState } from 'react';
import { Download } from 'lucide-react';
import { ClassItem, TipsItem, TestimonialItem, ActivityLog } from '../../types';

interface AdminDashboardProps {
  classes: ClassItem[];
  tips: TipsItem[];
  testimonials: TestimonialItem[];
  logs: ActivityLog[];
  showToast: (msg: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  classes,
  tips,
  testimonials,
  logs,
  showToast,
}) => {
  const [period, setPeriod] = useState<'7' | '30' | 'all'>('30');

  const activeClassesCount = classes.filter((c) => c.status === 'active').length;
  const publishedTipsCount = tips.filter((t) => t.status === 'published').length;
  const activeTestimonialsCount = testimonials.filter((t) => t.isActive).length;
  const totalClicks = classes.reduce((sum, c) => sum + (c.clicksCount || 0), 0);

  const exportCsv = () => {
    const rows = [
      ['ID', 'Nama Kelas', 'Status', 'Harga Normal', 'Harga Sekarang', 'Klik Daftar'],
      ...classes.map((c) => [
        c.id,
        `"${c.name.replace(/"/g, '""')}"`,
        c.status,
        c.normalPrice,
        c.currentPrice,
        c.clicksCount || 0,
      ]),
    ];
    const csvContent =
      'data:text/csv;charset=utf-8,' + rows.map((e) => e.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `statistik_guber_smart_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Berhasil mengunduh CSV');
  };

  const maxClick = Math.max(...classes.map((c) => c.clicksCount || 0), 10);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-serif font-bold text-[#1b2433]">Dasbor</h2>
        </div>
        <button
          type="button"
          onClick={exportCsv}
          className="px-5 py-2.5 rounded-full border border-[#c9a35a] text-[#07142b] bg-white text-sm font-semibold hover:bg-[#f8f5ef] transition self-start sm:self-auto flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          <span>Unduh Laporan</span>
        </button>
      </div>

      {/* Ringkasan Angka */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white rounded-[18px] p-6 shadow-sm border border-[#e7e1d5]">
          <div className="text-xs font-semibold text-[#a77d36] uppercase tracking-wider mb-2">
            Kelas Aktif
          </div>
          <div className="font-serif text-3xl font-bold text-[#07142b]">
            {activeClassesCount}
          </div>
        </div>

        <div className="bg-white rounded-[18px] p-6 shadow-sm border border-[#e7e1d5]">
          <div className="text-xs font-semibold text-[#a77d36] uppercase tracking-wider mb-2">
            Total Klik Daftar
          </div>
          <div className="font-serif text-3xl font-bold text-[#07142b]">
            {totalClicks}
          </div>
        </div>

        <div className="bg-white rounded-[18px] p-6 shadow-sm border border-[#e7e1d5]">
          <div className="text-xs font-semibold text-[#a77d36] uppercase tracking-wider mb-2">
            Tips Terbit
          </div>
          <div className="font-serif text-3xl font-bold text-[#07142b]">
            {publishedTipsCount}
          </div>
        </div>

        <div className="bg-white rounded-[18px] p-6 shadow-sm border border-[#e7e1d5]">
          <div className="text-xs font-semibold text-[#a77d36] uppercase tracking-wider mb-2">
            Testimoni
          </div>
          <div className="font-serif text-3xl font-bold text-[#07142b]">
            {activeTestimonialsCount}
          </div>
        </div>
      </div>

      {/* Grafik Batang Klik Daftar Per Kelas */}
      <div className="bg-white rounded-[18px] p-6 sm:p-8 shadow-sm border border-[#e7e1d5] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h3 className="font-serif font-bold text-lg text-[#1b2433]">
            Statistik Klik Daftar per Kelas
          </h3>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setPeriod('7')}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${
                period === '7'
                  ? 'bg-[#0b1c38] text-white'
                  : 'bg-white border border-[#e7e1d5] text-[#4b5565]'
              }`}
            >
              7 Hari
            </button>
            <button
              type="button"
              onClick={() => setPeriod('30')}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${
                period === '30'
                  ? 'bg-[#0b1c38] text-white'
                  : 'bg-white border border-[#e7e1d5] text-[#4b5565]'
              }`}
            >
              30 Hari
            </button>
            <button
              type="button"
              onClick={() => setPeriod('all')}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${
                period === 'all'
                  ? 'bg-[#0b1c38] text-white'
                  : 'bg-white border border-[#e7e1d5] text-[#4b5565]'
              }`}
            >
              Semua
            </button>
          </div>
        </div>

        {/* Visual Bar Chart */}
        <div className="space-y-4 pt-2">
          {classes.map((c) => {
            const count = c.clicksCount || 0;
            const percent = Math.min(Math.round((count / maxClick) * 100), 100);
            return (
              <div key={c.id} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="font-medium text-[#1b2433] truncate max-w-[240px] sm:max-w-md">
                    {c.name}
                  </span>
                  <span className="font-bold text-[#07142b]">{count} klik</span>
                </div>
                <div className="w-full h-3 bg-[#f8f5ef] rounded-full overflow-hidden border border-[#e7e1d5]">
                  <div
                    className="h-full rounded-full gold-gradient-bg transition-all duration-500"
                    style={{ width: `${Math.max(percent, 4)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Aktivitas Terbaru */}
      <div className="bg-white rounded-[18px] p-6 sm:p-8 shadow-sm border border-[#e7e1d5] space-y-4">
        <h3 className="font-serif font-bold text-lg text-[#1b2433]">
          Aktivitas Terbaru
        </h3>
        <div className="divide-y divide-[#f8f5ef]">
          {logs.slice(0, 5).map((log) => (
            <div
              key={log.id}
              className="py-3 flex items-center justify-between gap-4 text-sm"
            >
              <div className="flex items-center gap-3">
                <span className="text-xs uppercase font-semibold text-[#a77d36]">
                  {log.role}
                </span>
                <span className="text-[#1b2433]">{log.action}</span>
              </div>
              <span className="text-xs text-[#6b7280] flex-shrink-0">
                {new Date(log.timestamp).toLocaleTimeString('id-ID', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
