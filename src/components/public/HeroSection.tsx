// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

import React from 'react';
import { CMSSettings } from '../../types';
import { ImageSlot } from '../common/ImageSlot';

interface HeroSectionProps {
  cms: CMSSettings;
  onNavigate: (target: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ cms, onNavigate }) => {
  const heroSetting = cms.sections.find((s) => s.id === 'hero');
  const heroImage = heroSetting?.image;
  const title = heroSetting?.title || 'Belajar Membuat Aplikasi Hanya Bermodalkan Ide';
  const subtitle =
    heroSetting?.subtitle ||
    'Tanpa perlu paham koding. Ceritakan idenya, kami pandu sampai aplikasinya jadi dan bisa dipakai.';

  return (
    <section id="hero" className="relative min-h-[62vh] sm:min-h-[70vh] lg:min-h-[74vh] flex items-center overflow-hidden bg-[#07142b]">
      {/* Background Image Slot 1 with dark gradient */}
      <div className="absolute inset-0 z-0">
        <ImageSlot
          src={heroImage}
          className="w-full h-full object-cover object-right"
        />
        {/* Gradients: dark from left on desktop, dark from bottom on mobile */}
        <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-[#07142b] via-[#07142b]/90 sm:via-[#07142b]/80 to-transparent" />
      </div>

      <div className="relative z-10 max-w-[1200px] 2xl:max-w-[1320px] mx-auto px-4 sm:px-6 pt-24 sm:pt-28 pb-14 sm:pb-16 w-full">
        <div className="max-w-2xl space-y-5">
          {/* Sapaan italic emas */}
          <div className="font-serif italic text-[#e8cd8f] text-base sm:text-lg">
            Selamat Datang di Guber Smart
          </div>

          {/* Judul besar 2 baris */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-[1.15]">
            {title}
          </h1>

          {/* Kalimat pendukung */}
          {subtitle && (
            <p className="text-base sm:text-lg text-gray-300 font-normal leading-relaxed max-w-xl">
              {subtitle}
            </p>
          )}

          {/* Tombol aksi - Hanya Lihat Kelas */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => onNavigate('kelas')}
              className="px-8 py-3.5 rounded-full gold-gradient-bg text-[#07142b] font-semibold text-center hover:brightness-105 active:scale-95 transition shadow-lg inline-block"
            >
              {cms.buttons.heroSecondaryText || 'Lihat Kelas'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
