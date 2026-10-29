// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

import React from 'react';
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
  const karyaSetting = cms.sections.find((s) => s.id === 'karya');
  const title = karyaSetting?.title || 'Aplikasi yang Lahir dari Ide Peserta';
  const subtitle =
    karyaSetting?.subtitle ||
    'Bukti nyata bahwa ide sederhana bisa diwujudkan menjadi solusi digital bermanfaat.';

  // Show top 4 items for homepage
  const featuredKarya = karyaList.slice(0, 4);

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
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
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
      )}
    </section>
  );
};
