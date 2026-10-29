// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

import React from 'react';

export const VisiMisiSection: React.FC = () => {
  const missions = [
    'Menyediakan pembelajaran membuat aplikasi yang sederhana dan mudah diikuti oleh siapa saja.',
    'Memandu peserta dari ide sampai aplikasi jadi lewat langkah yang jelas.',
    'Membekali peserta dengan prompt dan metode yang siap dipakai.',
    'Membangun komunitas yang saling mendukung dalam berkarya.',
  ];

  return (
    <section id="visi-misi" className="py-16 max-w-[1200px] 2xl:max-w-[1320px] mx-auto px-4 sm:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Kartu Visi: Navy dengan pola emas */}
        <div className="bg-[#0b1c38] text-white rounded-[18px] p-8 sm:p-10 shadow-xl border border-[#c9a35a]/30 relative overflow-hidden bg-islamic-pattern flex flex-col justify-center">
          <div className="text-xs uppercase tracking-[0.25em] font-semibold text-[#e8cd8f] mb-3">
            VISI
          </div>
          <p className="font-serif text-xl sm:text-2xl text-white leading-relaxed">
            Menjadikan setiap orang mampu mewujudkan idenya menjadi aplikasi nyata tanpa harus memahami koding.
          </p>
          <div className="w-16 h-[2px] bg-[#c9a35a] mt-6" />
        </div>

        {/* Kartu Misi: Putih dengan angka dalam lingkaran emas */}
        <div className="bg-white rounded-[18px] p-8 sm:p-10 shadow-lg border border-[#e7e1d5] flex flex-col justify-center">
          <div className="text-xs uppercase tracking-[0.25em] font-semibold text-[#a77d36] mb-4">
            MISI
          </div>
          <ul className="space-y-4">
            {missions.map((m, idx) => (
              <li key={idx} className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full border border-[#c9a35a] text-[#a77d36] font-serif font-bold text-sm flex items-center justify-center">
                  {idx + 1}
                </span>
                <span className="text-base text-[#4b5565] leading-relaxed pt-0.5">
                  {m}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
