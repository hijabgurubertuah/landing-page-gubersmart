// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

import React from 'react';

export const AlurBelajarSection: React.FC = () => {
  const steps = [
    {
      num: 1,
      title: 'Tulis Ide',
      desc: 'Ceritakan masalah yang ingin diselesaikan dan fitur apa yang Anda bayangkan.',
    },
    {
      num: 2,
      title: 'Susun Prompt',
      desc: 'Terjemahkan ide menjadi instruksi terstruktur dengan bantuan panduan kami.',
    },
    {
      num: 3,
      title: 'Bangun Aplikasi',
      desc: 'Biarkan AI menyusun kerangka dan logika aplikasi secara bertahap.',
    },
    {
      num: 4,
      title: 'Publikasikan',
      desc: 'Uji coba di ponsel atau komputer, lalu rilis aplikasi agar siap dipakai.',
    },
  ];

  return (
    <section className="py-20 max-w-[1200px] 2xl:max-w-[1320px] mx-auto px-4 sm:px-6">
      <div className="max-w-2xl mb-12">
        <div className="text-xs uppercase tracking-[0.2em] font-semibold text-[#a77d36] mb-2">
          Cara Belajar
        </div>
        <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#1b2433] leading-tight">
          Empat Langkah Menjadi Aplikasi
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((s) => (
          <div
            key={s.num}
            className="bg-white rounded-[18px] p-6 shadow-md border border-[#e7e1d5] flex flex-col justify-between hover:-translate-y-1 transition duration-300"
          >
            <div>
              <div className="w-10 h-10 rounded-full border border-[#c9a35a] text-[#a77d36] font-serif font-bold text-base flex items-center justify-center mb-5">
                {s.num}
              </div>
              <h3 className="font-serif font-bold text-lg text-[#1b2433] mb-2">
                {s.title}
              </h3>
              <p className="text-sm text-[#4b5565] leading-relaxed">
                {s.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
