// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

import React from 'react';

export const AlurBelajarSection: React.FC = () => {
  const steps = [
    {
      num: 1,
      title: 'Ceritakan Ide',
      desc: 'Ceritakan dan Jelaskan Aplikasi apa yang ingin kamu buat.',
    },
    {
      num: 2,
      title: 'Ubah ide Jadi Prompt',
      desc: 'Menggunakan Skill dari GuberSmart akan mengubah cerita anda menjadi Prompt Lengkap.',
    },
    {
      num: 3,
      title: 'Proses Mudah',
      desc: 'Prompt hasil akan di ubah menjadi Aplikasi jadi',
    },
    {
      num: 4,
      title: 'Publish Hasil',
      desc: 'Aplikasi anda siap di Publish langsung dengan cara yang Mudah ke Vercel bahkan Domain Profesional.',
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
            className="bg-white rounded-[18px] p-6 shadow-md border border-[#e7e1d5] flex flex-col hover:-translate-y-1 transition duration-300"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-8 rounded-full border border-[#c9a35a] text-[#a77d36] font-serif font-bold text-sm flex items-center justify-center shrink-0">
                {s.num}
              </span>
              <h3 className="font-serif font-bold text-base sm:text-lg text-[#1b2433] leading-snug">
                {s.title}
              </h3>
            </div>
            <p className="text-sm text-[#4b5565] leading-relaxed">
              {s.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
