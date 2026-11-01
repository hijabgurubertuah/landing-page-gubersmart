// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ClassItem, CMSSettings } from '../../types';
import { ImageSlot } from '../common/ImageSlot';
import { StorageService, formatUrl } from '../../services/storageService';

interface KelasSectionProps {
  classes: ClassItem[];
  cms: CMSSettings;
  onSelectClass: (slug: string) => void;
}

export const KelasSection: React.FC<KelasSectionProps> = ({
  classes,
  cms,
  onSelectClass,
}) => {
  const [mobileIndex, setMobileIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const kelasSetting = cms.sections.find((s) => s.id === 'kelas');
  const title = kelasSetting?.title || 'Pilih Kelas Anda';
  const subtitle =
    kelasSetting?.subtitle ||
    'Pilihan program belajar terstruktur yang dirancang untuk mengantar ide Anda menjadi aplikasi siap pakai.';

  const activeClasses = classes.filter((c) => c.status === 'active');
  const isCarousel = activeClasses.length > 2;

  // Auto-slide carousel pada HP jika lebih dari 2 kelas
  useEffect(() => {
    if (!isCarousel || isPaused) return;

    const interval = setInterval(() => {
      setMobileIndex((prev) => (prev < activeClasses.length - 1 ? prev + 1 : 0));
    }, 4000);

    return () => clearInterval(interval);
  }, [isCarousel, activeClasses.length, isPaused]);

  const prevSlide = () => {
    setMobileIndex((prev) => (prev > 0 ? prev - 1 : activeClasses.length - 1));
  };

  const nextSlide = () => {
    setMobileIndex((prev) => (prev < activeClasses.length - 1 ? prev + 1 : 0));
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

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleRegisterClick = (c: ClassItem) => {
    StorageService.trackClassClick(c.id);
    const targetUrl = c.lynkidUrl || cms.buttons.heroPrimaryUrl || 'https://lynk.id';
    window.open(formatUrl(targetUrl), '_blank', 'noopener,noreferrer');
  };

  const renderClassCard = (c: ClassItem) => (
    <div
      key={c.id}
      className="bg-white rounded-[18px] overflow-hidden shadow-lg border border-[#e7e1d5] flex flex-col hover:-translate-y-1 transition duration-300 h-full"
    >
      {/* Gambar Kelas */}
      <div className="w-full aspect-[1.6/1]">
        <ImageSlot
          src={c.image}
          alt={c.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Konten Kartu */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
        <div className="space-y-3">
          <h3 className="font-serif font-bold text-xl text-[#1b2433] leading-snug">
            {c.name}
          </h3>
          <p className="text-sm text-[#4b5565] line-clamp-3 leading-relaxed">
            {c.shortDesc}
          </p>
        </div>

        <div className="pt-2 border-t border-[#e7e1d5] space-y-4">
          {/* Harga */}
          <div className="flex items-baseline gap-2">
            {c.normalPrice > c.currentPrice && (
              <span className="text-sm text-[#6b7280] line-through">
                {formatRupiah(c.normalPrice)}
              </span>
            )}
            <span className="font-serif font-bold text-xl text-[#07142b]">
              {formatRupiah(c.currentPrice)}
            </span>
          </div>

          {/* Tombol aksi */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => onSelectClass(c.slug)}
              className="py-2.5 px-3 rounded-full border border-[#c9a35a] text-[#07142b] hover:bg-[#f8f5ef] text-sm font-medium text-center transition"
            >
              Lihat Detail
            </button>
            <button
              type="button"
              onClick={() => handleRegisterClick(c)}
              className="py-2.5 px-3 rounded-full gold-gradient-bg text-[#07142b] text-sm font-semibold text-center hover:brightness-105 active:scale-95 transition shadow-sm"
            >
              Daftar
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const currentClass = activeClasses[mobileIndex] || activeClasses[0];

  return (
    <section id="kelas" className="py-20 lg:py-28 bg-[#f1ece2]">
      <div className="max-w-[1200px] 2xl:max-w-[1320px] mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mb-12">
          <div className="text-xs uppercase tracking-[0.2em] font-semibold text-[#a77d36] mb-2">
            Program Kelas
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

        {activeClasses.length === 0 ? (
          <div className="py-12 text-center text-[#6b7280]">
            <p className="font-serif text-lg">Belum ada kelas aktif</p>
          </div>
        ) : isCarousel ? (
          <>
            {/* Desktop & Tablet: Grid Responsive */}
            <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {activeClasses.map((c) => renderClassCard(c))}
            </div>

            {/* Mobile (HP): Auto Carousel jika kelas lebih dari 2 */}
            <div
              className="sm:hidden relative"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <div className="overflow-hidden rounded-[18px]">
                {currentClass && renderClassCard(currentClass)}
              </div>

              {/* Kontrol & Indikator Carousel HP */}
              <div className="flex items-center justify-between pt-4 px-2">
                {/* Indikator Titik */}
                <div className="flex gap-1.5 items-center">
                  {activeClasses.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setMobileIndex(idx)}
                      aria-label={`Pindah ke kelas ${idx + 1}`}
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
                    aria-label="Kelas Sebelumnya"
                    className="w-11 h-11 rounded-full border border-[#e7e1d5] bg-white text-[#07142b] flex items-center justify-center hover:bg-[#f8f5ef] active:scale-95 transition shadow-sm"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={nextSlide}
                    aria-label="Kelas Selanjutnya"
                    className="w-11 h-11 rounded-full border border-[#e7e1d5] bg-white text-[#07142b] flex items-center justify-center hover:bg-[#f8f5ef] active:scale-95 transition shadow-sm"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* Jika kelas <= 2, tampilkan grid standar tanpa carousel */
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {activeClasses.map((c) => renderClassCard(c))}
          </div>
        )}
      </div>
    </section>
  );
};
