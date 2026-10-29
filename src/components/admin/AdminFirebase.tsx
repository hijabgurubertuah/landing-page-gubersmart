// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

import React from 'react';

export const AdminFirebase: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-serif font-bold text-[#1b2433]">Firebase</h2>
        <span className="text-sm text-[#6b7280]">Belum aktif</span>
      </div>

      <div className="bg-white rounded-[18px] p-6 sm:p-8 shadow-sm border border-[#e7e1d5] space-y-5 opacity-60">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#1b2433] mb-1">
              Project ID
            </label>
            <input
              type="text"
              disabled
              value=""
              className="w-full rounded-xl border border-[#e7e1d5] px-4 py-2 text-sm bg-gray-100 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1b2433] mb-1">
              Database URL
            </label>
            <input
              type="text"
              disabled
              value=""
              className="w-full rounded-xl border border-[#e7e1d5] px-4 py-2 text-sm bg-gray-100 cursor-not-allowed"
            />
          </div>
        </div>

        <div className="flex items-center justify-end pt-4 border-t border-[#e7e1d5]">
          <button
            type="button"
            disabled
            className="px-6 py-2.5 rounded-full border border-gray-300 text-gray-400 text-sm font-semibold cursor-not-allowed"
          >
            Sinkronkan
          </button>
        </div>
      </div>
    </div>
  );
};
