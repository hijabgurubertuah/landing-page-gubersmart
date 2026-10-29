// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

import React from 'react';

interface NotFoundPageProps {
  onGoHome: () => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onGoHome }) => {
  return (
    <div className="min-h-screen bg-[#f8f5ef] flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md w-full bg-white rounded-[22px] p-8 sm:p-12 shadow-lg border border-[#e7e1d5] space-y-6">
        <div className="font-serif text-6xl font-bold text-[#a77d36]">404</div>
        <h1 className="text-2xl font-serif font-bold text-[#1b2433]">
          Halaman Tidak Ditemukan
        </h1>
        <button
          type="button"
          onClick={onGoHome}
          className="px-8 py-3 rounded-full gold-gradient-bg text-[#07142b] font-semibold hover:brightness-105 active:scale-95 transition shadow-sm"
        >
          Kembali ke Beranda
        </button>
      </div>
    </div>
  );
};
