/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.
 */

import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface NotFoundProps {
  onBackToHome: () => void;
}

export const NotFound: React.FC<NotFoundProps> = ({ onBackToHome }) => {
  return (
    <div className="min-h-screen pt-32 pb-20 bg-[#f8f5ef] flex items-center justify-center">
      <div className="max-w-md w-full mx-auto px-4 text-center space-y-6">
        <h1 className="text-6xl font-serif font-bold text-[#07142b]">404</h1>
        <h2 className="text-2xl font-serif font-bold text-[#1b2433]">Halaman Tidak Ditemukan</h2>
        <p className="text-sm text-[#4b5565]">Halaman yang Anda tuju tidak tersedia atau telah dipindahkan.</p>
        <button
          onClick={onBackToHome}
          className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#e8cd8f] via-[#c9a35a] to-[#a77d36] text-[#07142b] font-bold text-sm shadow-md hover:opacity-95 transition inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Beranda</span>
        </button>
      </div>
    </div>
  );
};
