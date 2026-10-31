// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { KaryaItem, CMSSettings } from '../../types';
import { ImageSlot } from '../common/ImageSlot';

interface KaryaSectionProps {
  karyaList: KaryaItem[];
  cms: CMSSettings;
  onViewAll: () => void;
}

export const KaryaSection: React.FC<KaryaSectionProps> = ({
  karyaList,
  cms,
  onViewAll,
}) => {
  const [mobileIndex, setMobileIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const karyaSetting = cms.sections.find((s) => s.id === 'karya');
  const title = karyaSetting?.title || 'Aplikasi yang Lahir dari Ide Peserta';
  const subtitle =
    karyaSetting?.subtitle ||
    'Bukti nyata bahwa ide sederhana bisa diwujudkan menjadi solusi digital bermanfaat.';

  // Show top 4 items for homepage
  const featuredKarya = karyaList.slice(0, 4);

  // Auto-slide carousel pada HP setiap 3.5 detik (pause saat disentuh/di-hover)
  useEffect(() => {
    if (featuredKarya.length <= 1 || isPaused) return;

    const interval = setInterval(() => {
      setMobileIndex((prev) => (prev < featuredKarya.length - 1 ? prev + 1 : 0));
    }, 3500);

    return () => clearInterval(interval);
  }, [featuredKarya.length, isPaused]);

  const prevSlide = () => {
    setMobileIndex((prev) => (prev > 0 ? prev - 1 : featuredKarya.length - 1));
  };

  const nextSlide = () => {
    setMobileIndex((prev) => (prev < featuredKarya.length - 1 ? prev + 1 : 0));
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

  const currentItem = featuredKarya[mobileIndex] || featuredKarya[0];

  return (
    <section id="karya" className="py-20 lg:py-28 max-w-[1200px] 2xl:max-w-[1320px] mx-auto px-4 sm:px-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
        <div className="max-w-2xl">
          <div className="text-xs uppercase tracking-[0.2em] font-semibold text-[#a77d36] mb-2">
            Karya Peserta
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#1b2433] leading-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="text-base text-[#4b5565] mt-3 leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
        <button
          type="button"
          onClick={onViewAll}
          className="text-sm font-semibold text-[#a77d36] hover:text-[#07142b] transition flex items-center gap-1 self-start sm:self-auto"
        >
          Lihat Semua Karya
        </button>
      </div>

      {featuredKarya.length === 0 ? (
        <div className="py-12 text-center text-[#6b7280]">
          <p className="font-serif text-lg">Belum ada karya</p>
        </div>
      ) : (
        <>
          {/* Desktop & Tablet: Grid 4 Kolom */}
          <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {featuredKarya.map((item) => {
              const Content = (
                <div className="group relative rounded-[18px] overflow-hidden shadow-md border border-[#e7e1d5] aspect-[1.45/1] bg-[#07142b] block cursor-pointer">
                  <ImageSlot
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Gradient overlay at bottom for title */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07142b] via-[#07142b]/40 to-transparent flex items-end p-4">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#c9a35a] flex-shrink-0" />
                      <h3 className="font-serif font-medium text-sm sm:text-base text-white line-clamp-2 leading-tight">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                </div>
              );

              return item.url ? (
                <a
                  key={item.id}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus:outline-none"
                >
                  {Content}
                </a>
              ) : (
                <div key={item.id}>{Content}</div>
              );
            })}
          </div>

          {/* Mobile: Carousel Otomatis Berjalan */}
          <div
            className="sm:hidden relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {currentItem && (
              <div>
                {currentItem.url ? (
                  <a
                    href={currentItem.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group"
                  >
                    <div className="relative rounded-[18px] overflow-hidden shadow-md border border-[#e7e1d5] aspect-[1.4/1] bg-[#07142b] transition-all duration-500">
                      <ImageSlot
                        src={currentItem.image}
                        alt={currentItem.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#07142b] via-[#07142b]/40 to-transparent flex items-end p-4">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#c9a35a] flex-shrink-0" />
                          <h3 className="font-serif font-medium text-base text-white leading-tight">
                            {currentItem.title}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </a>
                ) : (
                  <div className="relative rounded-[18px] overflow-hidden shadow-md border border-[#e7e1d5] aspect-[1.4/1] bg-[#07142b]">
                    <ImageSlot
                      src={currentItem.image}
                      alt={currentItem.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#07142b] via-[#07142b]/40 to-transparent flex items-end p-4">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#c9a35a] flex-shrink-0" />
                        <h3 className="font-serif font-medium text-base text-white leading-tight">
                          {currentItem.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Kontrol & Indikator Carousel HP */}
            <div className="flex items-center justify-between pt-4 px-2">
              {/* Indikator Titik */}
              <div className="flex gap-1.5 items-center">
                {featuredKarya.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setMobileIndex(idx)}
                    aria-label={`Pindah ke karya ${idx + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === mobileIndex
                        ? 'w-6 bg-[#c9a35a]'
                        : 'w-2 bg-[#e7e1d5] hover:bg-[#c9a35a]/50'
                    }`}
                  />
                ))}
              </div>

              {/* Tombol Navigasi Manual */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={prevSlide}
                  aria-label="Karya Sebelumnya"
                  className="w-11 h-11 rounded-full border border-[#e7e1d5] bg-white text-[#07142b] flex items-center justify-center hover:bg-[#f8f5ef] active:scale-95 transition shadow-sm"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={nextSlide}
                  aria-label="Karya Selanjutnya"
                  className="w-11 h-11 rounded-full border border-[#e7e1d5] bg-white text-[#07142b] flex items-center justify-center hover:bg-[#f8f5ef] active:scale-95 transition shadow-sm"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
};
