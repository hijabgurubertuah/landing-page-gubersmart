// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

import React from 'react';
import firebaseConfig from '../../../firebase-applet-config.json';

export const AdminFirebase: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-serif font-bold text-[#1b2433]">Firebase</h2>
        <span className="text-sm text-emerald-600 font-bold">Aktif</span>
      </div>

      <div className="bg-white rounded-[18px] p-6 sm:p-8 shadow-sm border border-[#e7e1d5] space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#1b2433] mb-1">
              Project ID
            </label>
            <input
              type="text"
              disabled
              value={firebaseConfig.projectId}
              className="w-full rounded-xl border border-[#e7e1d5] px-4 py-2 text-sm bg-gray-50 text-gray-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1b2433] mb-1">
              Database ID
            </label>
            <input
              type="text"
              disabled
              value={firebaseConfig.firestoreDatabaseId}
              className="w-full rounded-xl border border-[#e7e1d5] px-4 py-2 text-sm bg-gray-50 text-gray-600"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
