// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

import React from 'react';
import { CMSSettings } from '../../types';
import { ImageSlot } from '../common/ImageSlot';

interface ProfilSectionProps {
  cms: CMSSettings;
  onNavigate: (target: string) => void;
}

export const ProfilSection: React.FC<ProfilSectionProps> = ({ cms, onNavigate }) => {
  const profilSetting = cms.sections.find((s) => s.id === 'profil');
  const profilImage = profilSetting?.image;
  const title = profilSetting?.title || 'Mengubah Ide Menjadi Aplikasi, Tanpa Pusing Koding';
  const subtitle =
    profilSetting?.subtitle ||
    'Guber Smart hadir untuk menjembatani siapa pun yang memiliki gagasan inovatif dengan kemampuan menciptakan teknologi nyata.';

  return (
    <section id="profil" className="py-20 lg:py-28 max-w-[1200px] 2xl:max-w-[1320px] mx-auto px-4 sm:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Kolom Kiri */}
        <div className="lg:col-span-6 space-y-6">
          <div className="text-xs uppercase tracking-[0.2em] font-semibold text-[#a77d36]">
            Tentang Kami
          </div>

          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#1b2433] leading-tight">
            {title}
          </h2>

          <p className="text-base text-[#4b5565] leading-relaxed">
            {subtitle}
          </p>

          <p className="text-base text-[#4b5565] leading-relaxed">
            Kami percaya bahwa batasan teknis tidak boleh menghalangi lahirnya karya yang bermanfaat. Melalui metode teruji dan panduan bahasa yang ramah awam, kami membantu guru, pelaku UMKM, mahasiswa, dan profesional mengubah alur kerja sehari-hari menjadi aplikasi mandiri.
          </p>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => onNavigate('visi-misi')}
              className="px-7 py-3 rounded-full gold-gradient-bg text-[#07142b] font-semibold hover:brightness-105 active:scale-95 transition shadow-sm"
            >
              Selengkapnya
            </button>
          </div>
        </div>

        {/* Kolom Kanan: Foto slot 2 + Kotak aksen emas + Kartu kutipan navy */}
        <div className="lg:col-span-6 relative">
          {/* Kotak emas transparan di pojok kiri atas */}
          <div className="absolute -top-4 -left-4 w-28 h-28 border border-[#c9a35a]/50 bg-[#e8cd8f]/10 rounded-[18px] pointer-events-none" />

          {/* Foto utama slot 2 */}
          <div className="relative rounded-[18px] overflow-hidden shadow-xl border border-[#e7e1d5] aspect-[1.25/1]">
            <ImageSlot
              src={profilImage}
              alt="Profil Guber Smart"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Kartu kutipan navy yang menumpuk di sisi kanan bawah */}
          <div className="relative sm:absolute sm:-bottom-6 sm:-right-4 mt-6 sm:mt-0 max-w-sm bg-[#0b1c38] text-white p-6 rounded-[18px] shadow-2xl border border-[#c9a35a]/30">
            <p className="font-serif italic text-sm sm:text-base text-gray-200 leading-relaxed">
              &ldquo;Setiap orang punya ide hebat. Tugas kami memastikan ide itu menjadi aplikasi nyata.&rdquo;
            </p>
            <div className="w-12 h-[2px] bg-[#c9a35a] mt-3" />
          </div>
        </div>
      </div>
    </section>
  );
};
