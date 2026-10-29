// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { FAQItem } from '../../types';

interface FAQSectionProps {
  faqs: FAQItem[];
}

export const FAQSection: React.FC<FAQSectionProps> = ({ faqs }) => {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id || null);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const sortedFaqs = [...faqs].sort((a, b) => a.order - b.order);

  return (
    <section id="faq" className="py-20 lg:py-28 max-w-[900px] mx-auto px-4 sm:px-6">
      <div className="text-center max-w-xl mx-auto mb-12">
        <div className="text-xs uppercase tracking-[0.2em] font-semibold text-[#a77d36] mb-2">
          Pertanyaan
        </div>
        <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#1b2433] leading-tight">
          Yang Sering Ditanyakan
        </h2>
      </div>

      <div className="space-y-4">
        {sortedFaqs.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div
              key={faq.id}
              className="bg-white rounded-[18px] border border-[#e7e1d5] overflow-hidden shadow-sm transition"
            >
              <button
                type="button"
                onClick={() => toggle(faq.id)}
                className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
              >
                <span className="font-serif font-bold text-base sm:text-lg text-[#1b2433]">
                  {faq.question}
                </span>
                <span className="text-[#a77d36] flex-shrink-0">
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </span>
              </button>

              {isOpen && (
                <div className="px-5 sm:px-6 pb-6 pt-1 text-base text-[#4b5565] leading-relaxed border-t border-[#f8f5ef]">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
