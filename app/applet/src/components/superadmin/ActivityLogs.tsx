/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.
 */

import React from 'react';
import { ActivityLogItem } from '../../types';

interface ActivityLogsProps {
  logs: ActivityLogItem[];
}

export const ActivityLogs: React.FC<ActivityLogsProps> = ({ logs }) => {
  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a77d36]">Superadmin</span>
        <h1 className="text-3xl font-serif font-bold text-[#1b2433]">Log Aktivitas</h1>
      </div>

      <div className="bg-white rounded-[18px] shadow-md border border-[#e7e1d5] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f8f5ef] border-b border-[#e7e1d5] text-xs font-semibold uppercase tracking-wider text-[#4b5565]">
                <th className="p-4">Waktu</th>
                <th className="p-4">Peran</th>
                <th className="p-4">Aktivitas</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e7e1d5] text-sm text-[#1b2433]">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-[#f8f5ef]/50 transition">
                  <td className="p-4 text-[#a77d36] font-medium">{log.timestamp}</td>
                  <td className="p-4 uppercase text-xs font-bold text-[#4b5565]">{log.role}</td>
                  <td className="p-4 font-serif">{log.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
