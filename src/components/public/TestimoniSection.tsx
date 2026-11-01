// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { TestimonialItem } from '../../types';

interface TestimoniSectionProps {
  testimonials: TestimonialItem[];
}

export const TestimoniSection: React.FC<TestimoniSectionProps> = ({
  testimonials,
}) => {
  const [mobileIndex, setMobileIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const activeItems = testimonials.filter((t) => t.isActive);
  const isCarousel = activeItems.length > 2;

  // Auto-slide carousel pada HP jika lebih dari 2 testimoni (pause saat disentuh/di-hover)
  useEffect(() => {
    if (!isCarousel || isPaused) return;

    const interval = setInterval(() => {
      setMobileIndex((prev) => (prev < activeItems.length - 1 ? prev + 1 : 0));
    }, 4000);

    return () => clearInterval(interval);
  }, [isCarousel, activeItems.length, isPaused]);

  const prevSlide = () => {
    setMobileIndex((prev) => (prev > 0 ? prev - 1 : activeItems.length - 1));
  };

  const nextSlide = () => {
    setMobileIndex((prev) => (prev < activeItems.length - 1 ? prev + 1 : 0));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    setIsPaused(false);
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (diff > 50) {
      nextSlide();
    } else if (diff < -50) {
      prevSlide();
    }
    setTouchStart(null);
  };

  if (activeItems.length === 0) return null;

  const renderTestimonialCard = (item: TestimonialItem) => (
    <div
      key={item.id}
      className="bg-white rounded-[18px] p-7 shadow-md border border-[#e7e1d5] flex flex-col justify-between hover:-translate-y-1 transition duration-300 h-full"
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
  );

  const currentItem = activeItems[mobileIndex] || activeItems[0];

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

      {isCarousel ? (
        <>
          {/* Desktop & Tablet: Grid 3 kolom */}
          <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeItems.map((item) => renderTestimonialCard(item))}
          </div>

          {/* Mobile (HP): Carousel Otomatis jika lebih dari 2 */}
          <div
            className="sm:hidden relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div className="overflow-hidden rounded-[18px]">
              <div
                key={currentItem.id}
                className="bg-white rounded-[18px] p-6 shadow-md border border-[#e7e1d5] flex flex-col justify-between min-h-[220px] transition-all duration-500 ease-out"
              >
                <p className="font-serif italic text-[#4b5565] text-base leading-relaxed mb-6">
                  &ldquo;{currentItem.quote}&rdquo;
                </p>
                <div className="pt-4 border-t border-[#e7e1d5]">
                  <div className="font-serif font-bold text-[#1b2433] text-base">
                    {currentItem.name}
                  </div>
                  <div className="text-xs text-[#a77d36] mt-0.5">
                    {currentItem.role}
                  </div>
                </div>
              </div>
            </div>

            {/* Kontrol & Indikator Carousel */}
            <div className="flex items-center justify-between pt-4 px-2">
              {/* Indikator Titik */}
              <div className="flex gap-1.5 items-center">
                {activeItems.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setMobileIndex(idx)}
                    aria-label={`Pindah ke testimoni ${idx + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === mobileIndex
                        ? 'w-6 bg-[#c9a35a]'
                        : 'w-2 bg-[#e7e1d5] hover:bg-[#c9a35a]/50'
                    }`}
                  />
                ))}
              </div>

              {/* Tombol Geser */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={prevSlide}
                  aria-label="Sebelumnya"
                  className="w-11 h-11 rounded-full border border-[#e7e1d5] bg-white text-[#07142b] flex items-center justify-center hover:bg-[#f8f5ef] active:scale-95 transition shadow-sm"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={nextSlide}
                  aria-label="Selanjutnya"
                  className="w-11 h-11 rounded-full border border-[#e7e1d5] bg-white text-[#07142b] flex items-center justify-center hover:bg-[#f8f5ef] active:scale-95 transition shadow-sm"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        /* Jika testimoni <= 2, tampilkan grid standar tanpa carousel */
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {activeItems.map((item) => renderTestimonialCard(item))}
        </div>
      )}
    </section>
  );
};
