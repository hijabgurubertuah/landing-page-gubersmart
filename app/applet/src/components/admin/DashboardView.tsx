/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.
 */

import React, { useState } from 'react';
import { ClassItem, TestimonialItem, TipItem, ClickStatItem, ActivityLogItem } from '../../types';
import { BookOpen, MessageSquare, FileText, BarChart2 } from 'lucide-react';

interface DashboardViewProps {
  classes: ClassItem[];
  testimonials: TestimonialItem[];
  tips: TipItem[];
  clickStats: ClickStatItem[];
  activityLogs: ActivityLogItem[];
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  classes,
  testimonials,
  tips,
  clickStats,
  activityLogs
}) => {
  const [period, setPeriod] = useState<'7' | '30' | 'all'>('7');

  const activeClassesCount = classes.filter(c => c.status === 'aktif').length;
  const publishedTipsCount = tips.filter(t => t.status === 'terbit').length;
  const totalTestimonialsCount = testimonials.filter(t => t.status === 'tampil').length;
  const totalClicks = clickStats.reduce((acc, curr) => acc + curr.count, 0);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a77d36]">Dasbor</span>
          <h1 className="text-3xl font-serif font-bold text-[#1b2433]">Ringkasan Sistem</h1>
        </div>

        <div className="flex gap-2">
          {(['7', '30', 'all'] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition ${
                period === p
                  ? 'bg-[#07142b] text-[#e8cd8f]'
                  : 'bg-white border border-[#e7e1d5] text-[#4b5565] hover:bg-[#f1ece2]'
              }`}
            >
              {p === '7' ? '7 Hari' : p === '30' ? '30 Hari' : 'Semua'}
            </button>
          ))}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-[18px] p-6 shadow-md border border-[#e7e1d5] flex items-center gap-4">
          <div className="w-12 h-12 rounded-[12px] bg-[#f8f5ef] border border-[#e7e1d5] flex items-center justify-center text-[#a77d36]">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#6b7280]">Kelas Aktif</p>
            <p className="text-2xl font-bold font-serif text-[#1b2433]">{activeClassesCount}</p>
          </div>
        </div>

        <div className="bg-white rounded-[18px] p-6 shadow-md border border-[#e7e1d5] flex items-center gap-4">
          <div className="w-12 h-12 rounded-[12px] bg-[#f8f5ef] border border-[#e7e1d5] flex items-center justify-center text-[#a77d36]">
            <BarChart2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#6b7280]">Total Klik Daftar</p>
            <p className="text-2xl font-bold font-serif text-[#1b2433]">{totalClicks}</p>
          </div>
        </div>

        <div className="bg-white rounded-[18px] p-6 shadow-md border border-[#e7e1d5] flex items-center gap-4">
          <div className="w-12 h-12 rounded-[12px] bg-[#f8f5ef] border border-[#e7e1d5] flex items-center justify-center text-[#a77d36]">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#6b7280]">Tips Terbit</p>
            <p className="text-2xl font-bold font-serif text-[#1b2433]">{publishedTipsCount}</p>
          </div>
        </div>

        <div className="bg-white rounded-[18px] p-6 shadow-md border border-[#e7e1d5] flex items-center gap-4">
          <div className="w-12 h-12 rounded-[12px] bg-[#f8f5ef] border border-[#e7e1d5] flex items-center justify-center text-[#a77d36]">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#6b7280]">Testimoni</p>
            <p className="text-2xl font-bold font-serif text-[#1b2433]">{totalTestimonialsCount}</p>
          </div>
        </div>
      </div>

      {/* Click Stats per Class */}
      <div className="bg-white rounded-[18px] p-6 md:p-8 shadow-md border border-[#e7e1d5] space-y-6">
        <h3 className="font-serif font-bold text-xl text-[#1b2433]">Statistik Klik Daftar per Kelas</h3>
        <div className="space-y-4">
          {classes.map((cls) => {
            const stat = clickStats.find(s => s.classId === cls.id);
            const count = stat ? stat.count : 0;
            const maxCount = Math.max(...clickStats.map(s => s.count), 1);
            const percentage = (count / maxCount) * 100;

            return (
              <div key={cls.id} className="space-y-1">
                <div className="flex justify-between text-sm font-medium text-[#1b2433]">
                  <span>{cls.title}</span>
                  <span className="font-bold text-[#a77d36]">{count} klik</span>
                </div>
                <div className="w-full h-3 bg-[#f1ece2] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#e8cd8f] to-[#c9a35a] rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-[18px] p-6 md:p-8 shadow-md border border-[#e7e1d5] space-y-6">
        <h3 className="font-serif font-bold text-xl text-[#1b2433]">Aktivitas Terbaru</h3>
        <div className="space-y-3">
          {activityLogs.slice(0, 5).map((log) => (
            <div key={log.id} className="p-4 rounded-[12px] bg-[#f8f5ef] border border-[#e7e1d5] flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-[#1b2433]">{log.action}</p>
                <p className="text-xs text-[#6b7280]">Peran: {log.role}</p>
              </div>
              <span className="text-xs text-[#a77d36] font-medium">{log.timestamp}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
