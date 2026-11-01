// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { ClassSyncStatus } from '../../types';

interface BilahSimpanSinkronProps {
  unsyncedCount: number;
  syncStatus: ClassSyncStatus;
  onSaveAndSync: () => Promise<void>;
}

export const BilahSimpanSinkron: React.FC<BilahSimpanSinkronProps> = ({
  unsyncedCount,
  syncStatus,
  onSaveAndSync,
}) => {
  const [isSaving, setIsSaving] = useState(false);

  const handleTap = async () => {
    if (isSaving) return; // Ignore duplicate taps during loading

    // SATU KALI KETUK LANGSUNG LOADING (sebelum async op)
    setIsSaving(true);

    try {
      await onSaveAndSync();
    } finally {
      setIsSaving(false);
    }
  };

  const getBadgeColor = (status: ClassSyncStatus) => {
    switch (status) {
      case 'Tersinkron':
        return 'bg-emerald-100 text-emerald-800';
      case 'Menyinkronkan':
        return 'bg-amber-100 text-amber-800';
      case 'Belum tersinkron':
        return 'bg-red-100 text-red-800';
      case 'Offline':
        return 'bg-gray-200 text-gray-700';
      case 'Belum aktif':
        return 'bg-blue-100 text-blue-800';
      case 'Kode Lama':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[70] bg-white/95 backdrop-blur-md border-t border-[#e7e1d5] p-3 sm:px-6 shadow-2xl">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between gap-3">
        {/* Lencana Status Sinkronisasi */}
        <div className="flex items-center gap-2">
          <span
            className={`text-xs font-bold px-2.5 py-1 rounded-full ${getBadgeColor(
              syncStatus
            )}`}
          >
            {syncStatus}
          </span>
          {unsyncedCount > 0 && (
            <span className="text-xs font-semibold text-[#a77d36]">
              • {unsyncedCount} draf belum tersimpan
            </span>
          )}
        </div>

        {/* Tombol Simpan & Sinkronkan - Emas Keemasan - SELALU AKTIF */}
        <button
          type="button"
          onClick={handleTap}
          disabled={isSaving}
          style={{
            background: isSaving
              ? 'linear-gradient(135deg, #D4A017 0%, #B8860B 100%)'
              : 'linear-gradient(135deg, #F2C94C 0%, #D4A017 100%)',
            color: '#2B1D00',
          }}
          className="min-h-[48px] px-6 sm:px-8 py-2.5 rounded-full text-sm font-bold shadow-md hover:brightness-105 active:scale-95 transition flex items-center justify-center gap-2 w-full sm:w-auto text-center cursor-pointer"
        >
          {isSaving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-[#2B1D00]" />
              <span>Menyimpan...</span>
            </>
          ) : (
            <>
              <span>Simpan & Sinkronkan</span>
              {unsyncedCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-[#2B1D00] text-[#F2C94C] text-[11px] font-bold flex items-center justify-center ml-1">
                  {unsyncedCount}
                </span>
              )}
            </>
          )}
        </button>
      </div>
    </div>
  );
};
