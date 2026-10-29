/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.
 */

import React from 'react';

interface ConfirmDialogProps {
  title: string;
  message?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ title, message, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 z-50 bg-[#07142b]/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-[18px] max-w-md w-full p-6 shadow-2xl border border-[#e7e1d5] text-center">
        <h3 className="text-xl font-serif font-bold text-[#1b2433] mb-2">{title}</h3>
        {message && <p className="text-sm text-[#4b5565] mb-6">{message}</p>}
        <div className="flex gap-3 justify-center">
          <button
            onClick={onCancel}
            className="px-5 py-2.5 rounded-full border border-[#e7e1d5] text-[#4b5565] hover:bg-[#f8f5ef] font-medium text-sm transition"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            className="px-5 py-2.5 rounded-full bg-red-600 text-white hover:bg-red-700 font-medium text-sm transition shadow-md"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
};
