// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

import React from 'react';

export const PitaKeunggulan: React.FC = () => {
  const points = [
    { num: 1, title: 'Ceritakan Ide', desc: 'Jelaskan aplikasi impian Anda' },
    { num: 2, title: 'Ubah ide Jadi Prompt', desc: 'Dikonversi ke prompt lengkap' },
    { num: 3, title: 'Proses Mudah', desc: 'Dibangun langsung jadi aplikasi' },
    { num: 4, title: 'Publish Aplikasi', desc: 'Rilis ke Vercel & Domain' },
  ];

  return (
    <div className="max-w-[1200px] 2xl:max-w-[1320px] mx-auto px-4 sm:px-6 relative z-20 -mt-10 sm:-mt-12">
      <div className="bg-gradient-to-r from-[#07142b] via-[#0b1c38] to-[#12284a] rounded-[18px] shadow-2xl border border-[#c9a35a]/30 p-5 sm:p-7">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x lg:divide-[#c9a35a]/25">
          {points.map((p) => (
            <div
              key={p.title}
              className="flex items-start lg:items-center lg:px-6 gap-3 text-left"
            >
              <span className="w-7 h-7 rounded-full border border-[#c9a35a]/60 text-[#e8cd8f] font-serif font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 lg:mt-0">
                {p.num}
              </span>
              <div>
                <div className="font-serif font-bold text-white text-base">
                  {p.title}
                </div>
                <div className="text-xs text-gray-300 mt-0.5 leading-snug">
                  {p.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
