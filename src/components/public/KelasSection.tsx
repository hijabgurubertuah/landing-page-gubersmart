// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

import React from 'react';
import { ClassItem, CMSSettings } from '../../types';
import { ImageSlot } from '../common/ImageSlot';
import { StorageService } from '../../services/storageService';

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
  const kelasSetting = cms.sections.find((s) => s.id === 'kelas');
  const title = kelasSetting?.title || 'Pilih Kelas Anda';
  const subtitle =
    kelasSetting?.subtitle ||
    'Pilihan program belajar terstruktur yang dirancang untuk mengantar ide Anda menjadi aplikasi siap pakai.';

  const activeClasses = classes.filter((c) => c.status === 'active');

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
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
  };

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
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activeClasses.map((c) => (
              <div
                key={c.id}
                className="bg-white rounded-[18px] overflow-hidden shadow-lg border border-[#e7e1d5] flex flex-col hover:-translate-y-1 transition duration-300"
              >
                {/* Gambar Kelas slot 6 */}
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
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
