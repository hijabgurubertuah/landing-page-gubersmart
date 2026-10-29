// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { TestimonialItem } from '../../types';

interface TestimoniSectionProps {
  testimonials: TestimonialItem[];
}

export const TestimoniSection: React.FC<TestimoniSectionProps> = ({
  testimonials,
}) => {
  const [mobileIndex, setMobileIndex] = useState(0);
  const activeItems = testimonials.filter((t) => t.isActive);

  const prevSlide = () => {
    setMobileIndex((prev) => (prev > 0 ? prev - 1 : activeItems.length - 1));
  };

  const nextSlide = () => {
    setMobileIndex((prev) => (prev < activeItems.length - 1 ? prev + 1 : 0));
  };

  if (activeItems.length === 0) return null;

  return (
    <section className="py-20 max-w-[1200px] 2xl:max-w-[1320px] mx-auto px-4 sm:px-6">
      <div className="max-w-2xl mb-12">
        <div className="text-xs uppercase tracking-[0.2em] font-semibold text-[#a77d36] mb-2">
          Testimoni
        </div>
        <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#1b2433] leading-tight">
          Kata Mereka yang Sudah Belajar
        </h2>
      </div>

      {/* Desktop & Tablet: Grid 3 kolom */}
      <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {activeItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-[18px] p-7 shadow-md border border-[#e7e1d5] flex flex-col justify-between hover:-translate-y-1 transition duration-300"
          >
            <p className="font-serif italic text-[#4b5565] text-base leading-relaxed mb-6">
              &ldquo;{item.quote}&rdquo;
            </p>
            <div className="pt-4 border-t border-[#e7e1d5]">
              <div className="font-serif font-bold text-[#1b2433] text-base">
                {item.name}
              </div>
              <div className="text-xs text-[#a77d36] mt-0.5">{item.role}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile: Carousel dengan tombol geser fungsional */}
      <div className="sm:hidden relative">
        <div className="bg-white rounded-[18px] p-6 shadow-md border border-[#e7e1d5] flex flex-col justify-between min-h-[220px]">
          <p className="font-serif italic text-[#4b5565] text-base leading-relaxed mb-6">
            &ldquo;{activeItems[mobileIndex].quote}&rdquo;
          </p>
          <div className="pt-4 border-t border-[#e7e1d5]">
            <div className="font-serif font-bold text-[#1b2433] text-base">
              {activeItems[mobileIndex].name}
            </div>
            <div className="text-xs text-[#a77d36] mt-0.5">
              {activeItems[mobileIndex].role}
            </div>
          </div>
        </div>

        {/* Tombol Geser Carousel */}
        <div className="flex items-center justify-between pt-4 px-2">
          <div className="text-xs text-[#6b7280]">
            {mobileIndex + 1} / {activeItems.length}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Sebelumnya"
              className="w-10 h-10 rounded-full border border-[#e7e1d5] bg-white text-[#07142b] flex items-center justify-center hover:bg-[#f8f5ef] transition"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={nextSlide}
              aria-label="Selanjutnya"
              className="w-10 h-10 rounded-full border border-[#e7e1d5] bg-white text-[#07142b] flex items-center justify-center hover:bg-[#f8f5ef] transition"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
