// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

import React from 'react';
import { CMSSettings } from '../../types';
import { ImageSlot } from '../common/ImageSlot';

interface KeunggulanSectionProps {
  cms: CMSSettings;
  onNavigate: (target: string) => void;
}

export const KeunggulanSection: React.FC<KeunggulanSectionProps> = ({
  cms,
  onNavigate,
}) => {
  const keunggulanSetting = cms.sections.find((s) => s.id === 'keunggulan');
  const image = keunggulanSetting?.image;
  const title =
    keunggulanSetting?.title || 'Belajar Lebih Mudah dengan Dukungan Lengkap';
  const subtitle =
    keunggulanSetting?.subtitle ||
    'Seluruh sarana dan pendampingan disiapkan agar Anda fokus melahirkan karya tanpa hambatan teknis.';

  const tiles = [
    { title: 'Materi Bertahap', desc: 'Disusun runut dari pengenalan ide dasar hingga tahap rilis.' },
    { title: 'Prompt Siap Pakai', desc: 'Koleksi formula perintah yang sudah teruji dan siap Anda salin.' },
    { title: 'Bimbingan Member', desc: 'Konsultasi jika menemui kendala saat mengembangkan proyek.' },
    { title: 'Komunitas Belajar', desc: 'Wadah bertukar inspirasi bersama ratusan rekan pembelajar.' },
    { title: 'Praktik Langsung', desc: 'Langsung menghasilkan aplikasi nyata untuk kebutuhan sendiri.' },
  ];

  return (
    <section
      id="keunggulan"
      className="py-20 lg:py-28 bg-gradient-to-b from-[#07142b] via-[#0b1c38] to-[#07142b] text-white bg-islamic-pattern relative overflow-hidden"
    >
      <div className="max-w-[1200px] 2xl:max-w-[1320px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Kolom Kiri: Foto slot 3 dengan garis tepi emas tipis */}
          <div className="lg:col-span-5">
            <div className="rounded-[18px] overflow-hidden border border-[#c9a35a]/40 shadow-2xl aspect-[1.15/1]">
              <ImageSlot
                src={image}
                alt="Keunggulan Guber Smart"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Kolom Kanan: Teks & 5 Ubin Teks Tanpa Ikon */}
          <div className="lg:col-span-7 space-y-6">
            <div className="text-xs uppercase tracking-[0.2em] font-semibold text-[#e8cd8f]">
              Keunggulan
            </div>

            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white leading-tight">
              {title}
            </h2>

            <p className="text-base text-gray-300 leading-relaxed">
              {subtitle}
            </p>

            {/* 5 ubin teks saja tanpa ikon saling berbatas garis tipis emas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {tiles.map((tile, idx) => (
                <div
                  key={tile.title}
                  className={`p-4 rounded-[14px] bg-[#12284a]/40 border border-[#c9a35a]/25 ${
                    idx === 4 ? 'sm:col-span-2' : ''
                  }`}
                >
                  <div className="font-serif font-bold text-base text-[#e8cd8f] mb-1">
                    {tile.title}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                    {tile.desc}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <button
                type="button"
                onClick={() => onNavigate('karya')}
                className="px-7 py-3 rounded-full gold-gradient-bg text-[#07142b] font-semibold hover:brightness-105 active:scale-95 transition shadow-md"
              >
                Lihat Karya
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
