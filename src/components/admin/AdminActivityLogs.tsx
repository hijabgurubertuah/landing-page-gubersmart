// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

import React from 'react';
import { ActivityLog } from '../../types';

interface AdminActivityLogsProps {
  logs: ActivityLog[];
}

export const AdminActivityLogs: React.FC<AdminActivityLogsProps> = ({ logs }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-serif font-bold text-[#1b2433]">Log Aktivitas</h2>

      <div className="bg-white rounded-[18px] shadow-sm border border-[#e7e1d5] overflow-hidden">
        {/* Desktop Table */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#f8f5ef] border-b border-[#e7e1d5] text-xs uppercase font-semibold text-[#a77d36]">
              <tr>
                <th className="py-3 px-6">Peran</th>
                <th className="py-3 px-6">Aktivitas</th>
                <th className="py-3 px-6">Waktu</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f8f5ef]">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-[#f8f5ef]/50 transition">
                  <td className="py-3.5 px-6 font-semibold uppercase text-xs text-[#07142b]">
                    {log.role}
                  </td>
                  <td className="py-3.5 px-6 text-[#1b2433]">{log.action}</td>
                  <td className="py-3.5 px-6 text-xs text-[#6b7280]">
                    {new Date(log.timestamp).toLocaleString('id-ID')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Stacked Cards */}
        <div className="sm:hidden divide-y divide-[#f8f5ef] p-4 space-y-3">
          {logs.map((log) => (
            <div key={log.id} className="pt-3 first:pt-0 space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold uppercase text-[#a77d36]">
                  {log.role}
                </span>
                <span className="text-[#6b7280]">
                  {new Date(log.timestamp).toLocaleTimeString('id-ID')}
                </span>
              </div>
              <div className="text-sm font-medium text-[#1b2433]">
                {log.action}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
