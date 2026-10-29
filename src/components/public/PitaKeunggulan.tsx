// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

import React from 'react';

export const PitaKeunggulan: React.FC = () => {
  const points = [
    { title: 'Tanpa Koding', desc: 'Cukup bawa ide Anda' },
    { title: 'Dipandu Bertahap', desc: 'Langkah demi langkah sampai jadi' },
    { title: 'Praktik Langsung', desc: 'Belajar sambil membangun' },
    { title: 'Aplikasi Sungguhan', desc: 'Hasil akhir yang bisa dipakai' },
    { title: 'Komunitas Member', desc: 'Belajar bersama, saling bantu' },
  ];

  return (
    <div className="max-w-[1200px] 2xl:max-w-[1320px] mx-auto px-4 sm:px-6 relative z-20 -mt-10 sm:-mt-12">
      <div className="bg-gradient-to-r from-[#07142b] via-[#0b1c38] to-[#12284a] rounded-[18px] shadow-2xl border border-[#c9a35a]/30 p-6 sm:p-8">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-0 lg:divide-x lg:divide-[#c9a35a]/25">
          {points.map((p, idx) => (
            <div
              key={p.title}
              className={`flex flex-col justify-center ${
                idx === 4 ? 'col-span-2 lg:col-span-1' : ''
              } lg:px-4 text-center sm:text-left`}
            >
              <div className="font-serif font-bold text-white text-base sm:text-lg">
                {p.title}
              </div>
              <div className="text-xs sm:text-sm text-gray-300 mt-1 leading-snug">
                {p.desc}
              </div>
            </div>
          ))}
        </div>
        {/* Garis emas tipis di bawah pita */}
        <div className="mt-6 pt-4 border-t border-[#c9a35a]/20" />
      </div>
    </div>
  );
};
