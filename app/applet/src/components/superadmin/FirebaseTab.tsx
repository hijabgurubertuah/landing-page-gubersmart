/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.
 */

import React from 'react';
import { Database, RefreshCw } from 'lucide-react';

export const FirebaseTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a77d36]">Superadmin</span>
        <h1 className="text-3xl font-serif font-bold text-[#1b2433]">Firebase</h1>
      </div>

      <div className="bg-white rounded-[18px] p-6 md:p-8 shadow-md border border-[#e7e1d5] space-y-6">
        <div className="flex items-center justify-between p-4 rounded-[12px] bg-[#f8f5ef] border border-[#e7e1d5]">
          <div className="flex items-center gap-3">
            <Database className="w-5 h-5 text-[#6b7280]" />
            <span className="font-serif font-bold text-[#1b2433]">Status Firebase</span>
          </div>
          <span className="text-sm font-semibold text-[#6b7280]">Belum aktif</span>
        </div>

        <div className="space-y-4 opacity-50 pointer-events-none">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#4b5565] mb-1">API Key</label>
            <input type="text" disabled placeholder="Nonaktif" className="w-full px-3 py-2.5 rounded-[12px] border border-[#e7e1d5] bg-gray-100 text-sm" />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#4b5565] mb-1">Project ID</label>
            <input type="text" disabled placeholder="Nonaktif" className="w-full px-3 py-2.5 rounded-[12px] border border-[#e7e1d5] bg-gray-100 text-sm" />
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-[#e7e1d5]">
          <button
            type="button"
            disabled
            className="px-6 py-2.5 rounded-full bg-gray-200 text-gray-500 font-bold text-sm cursor-not-allowed flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Sinkronkan</span>
          </button>
        </div>
      </div>
    </div>
  );
};
