// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

import React from 'react';
import { ClassFAQ } from '../../types';

interface FaqKelasProps {
  faqs: ClassFAQ[];
}

export const FaqKelas: React.FC<FaqKelasProps> = ({ faqs }) => {
  if (!faqs || faqs.length === 0) return null;

  return (
    <div className="bg-white rounded-[18px] p-6 sm:p-8 shadow-sm border border-[#e7e1d5] space-y-4">
      <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#1b2433] mb-4">
        Pertanyaan Kelas
      </h2>

      <div className="space-y-4">
        {faqs.map((f, idx) => (
          <div key={idx} className="pb-4 border-b border-[#f8f5ef] last:border-b-0 space-y-1">
            <h3 className="font-serif font-bold text-base text-[#1b2433]">
              {f.q}
            </h3>
            <p className="text-sm text-[#4b5565] leading-relaxed whitespace-pre-line">
              {f.a}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
