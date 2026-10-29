// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

import React from 'react';
import { TipsItem, CMSSettings } from '../../types';
import { ImageSlot } from '../common/ImageSlot';

interface TipsSectionProps {
  tips: TipsItem[];
  cms: CMSSettings;
  onSelectTip: (slug: string) => void;
  onViewAll: () => void;
}

export const TipsSection: React.FC<TipsSectionProps> = ({
  tips,
  cms,
  onSelectTip,
  onViewAll,
}) => {
  const tipsSetting = cms.sections.find((s) => s.id === 'tips');
  const title = tipsSetting?.title || 'Update Terbaru';
  const subtitle =
    tipsSetting?.subtitle ||
    'Wawasan, panduan penulisan prompt, dan inspirasi berkarya digital untuk Anda.';

  const publishedTips = tips
    .filter((t) => t.status === 'published')
    .slice(0, 3);

  return (
    <section id="tips" className="py-20 lg:py-28 bg-[#f1ece2]">
      <div className="max-w-[1200px] 2xl:max-w-[1320px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-[0.2em] font-semibold text-[#a77d36] mb-2">
              Tips dan Informasi
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
            Lihat Semua Tips
          </button>
        </div>

        {publishedTips.length === 0 ? (
          <div className="py-12 text-center text-[#6b7280]">
            <p className="font-serif text-lg">Belum ada tips</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {publishedTips.map((tip) => (
              <article
                key={tip.id}
                className="bg-white rounded-[18px] overflow-hidden shadow-lg border border-[#e7e1d5] flex flex-col hover:-translate-y-1 transition duration-300"
              >
                {/* Thumbnail Slot 8 */}
                <div className="w-full aspect-[1.9/1]">
                  <ImageSlot
                    src={tip.thumbnail}
                    alt={tip.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      {/* Kategori berupa teks emas biasa TANPA bingkai kapsul */}
                      <span className="font-medium text-[#a77d36]">
                        {tip.category}
                      </span>
                      <span className="text-[#6b7280]">{tip.publishedAt}</span>
                    </div>

                    <h3 className="font-serif font-bold text-xl text-[#1b2433] leading-snug line-clamp-2">
                      {tip.title}
                    </h3>

                    <p className="text-sm text-[#4b5565] line-clamp-3 leading-relaxed">
                      {tip.summary}
                    </p>
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => onSelectTip(tip.slug)}
                      className="text-sm font-semibold text-[#07142b] hover:text-[#a77d36] transition"
                    >
                      Selengkapnya
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
