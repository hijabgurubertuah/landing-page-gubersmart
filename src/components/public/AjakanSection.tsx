// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

import React from 'react';
import { CMSSettings } from '../../types';
import { ImageSlot } from '../common/ImageSlot';

interface AjakanSectionProps {
  cms: CMSSettings;
}

export const AjakanSection: React.FC<AjakanSectionProps> = ({ cms }) => {
  const ajakanSetting = cms.sections.find((s) => s.id === 'ajakan');
  const image = ajakanSetting?.image;
  const title = ajakanSetting?.title || 'Bergabunglah Bersama Guber Smart';
  const subtitle =
    ajakanSetting?.subtitle ||
    'Wujudkan ide aplikasi pertama Anda sekarang juga bersama panduan langkah demi langkah.';

  const waPhone = cms.footer.waNumber.replace(/[^0-9]/g, '') || '6285376604024';
  const waMsg = encodeURIComponent(
    cms.buttons.waDefaultMsg ||
      "Assalamu'alaikum, saya ingin bertanya tentang kelas Guber Smart."
  );
  const waUrl = `https://wa.me/${waPhone}?text=${waMsg}`;

  return (
    <section className="py-16 max-w-[1200px] 2xl:max-w-[1320px] mx-auto px-4 sm:px-6">
      <div className="relative rounded-[22px] overflow-hidden shadow-2xl bg-[#07142b] border border-[#c9a35a]/30">
        {/* Background photo slot 4 */}
        <div className="absolute inset-0 z-0 opacity-40">
          <ImageSlot
            src={image}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        {/* Navy gradient from left */}
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#07142b] via-[#07142b]/95 to-transparent" />

        {/* Content */}
        <div className="relative z-10 p-8 sm:p-14 lg:p-16 max-w-2xl space-y-6">
          <div className="text-xs uppercase tracking-[0.2em] font-semibold text-[#e8cd8f]">
            Pendaftaran Dibuka
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-white leading-tight">
            {title}
          </h2>

          <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
            {subtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
            <a
              href={cms.buttons.ctaPrimaryUrl || 'https://lynk.id'}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 rounded-full gold-gradient-bg text-[#07142b] font-semibold text-center hover:brightness-105 active:scale-95 transition shadow-lg"
            >
              {cms.buttons.ctaPrimaryText || 'Daftar Sekarang'}
            </a>
            {cms.features.tanyaDulu && (
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 rounded-full border border-[#c9a35a] text-[#e8cd8f] hover:bg-[#c9a35a]/10 active:scale-95 transition text-center font-medium"
              >
                {cms.buttons.ctaSecondaryText || 'Tanya Dulu'}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
