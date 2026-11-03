// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

import React, { useState, useEffect } from 'react';
import { ClassItem } from '../../types';
import { formatRupiah, formatClassUrl } from '../../data/kelasModel';
import { kelasSync } from '../../data/kelasSync';

interface KartuKelasPublikProps {
  item: ClassItem;
  onSelectDetail: (slug: string) => void;
}

export const KartuKelasPublik: React.FC<KartuKelasPublikProps> = ({
  item,
  onSelectDetail,
}) => {
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setImgError(false);
  }, [item.image]);

  const handleRegisterClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    kelasSync.trackClassClick(item.id);
    const targetUrl = formatClassUrl(item.lynkidUrl);
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-white rounded-[18px] overflow-hidden shadow-sm border border-[#e7e1d5] flex flex-col justify-between hover:-translate-y-1 transition duration-300 h-full">
      <div className="space-y-3.5 p-5">
        {/* Gambar Sampul 16:9 */}
        <div className="w-full aspect-[16/9] rounded-xl overflow-hidden bg-[#07142b] border border-[#e7e1d5]">
          {item.image && !imgError ? (
            <img
              src={item.image}
              alt={item.name}
              referrerPolicy="no-referrer"
              crossOrigin="anonymous"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#07142b] to-[#1b365f] flex items-center justify-center text-[#e8cd8f] text-xs font-serif p-3 text-center">
              {item.name || 'Kelas Guber Smart'}
            </div>
          )}
        </div>

        <h3 className="font-serif font-bold text-lg text-[#1b2433] leading-snug line-clamp-2">
          {item.name}
        </h3>

        <p className="text-xs text-[#4b5565] line-clamp-3 leading-relaxed">
          {item.shortDesc}
        </p>
      </div>

      <div className="p-5 pt-0 space-y-4">
        {/* Harga */}
        <div className="flex items-baseline gap-2 border-t border-[#f8f5ef] pt-3">
          {item.normalPrice > item.currentPrice && (
            <span className="text-xs text-[#6b7280] line-through">
              {formatRupiah(item.normalPrice)}
            </span>
          )}
          <span className="font-serif font-bold text-lg text-[#07142b]">
            {item.currentPrice === 0 ? 'Gratis' : formatRupiah(item.currentPrice)}
          </span>
        </div>

        {/* Tombol Aksi */}
        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => onSelectDetail(item.slug)}
            className="min-h-[44px] py-2.5 px-3 rounded-full border border-[#c9a35a] text-[#07142b] hover:bg-[#f8f5ef] text-xs font-semibold text-center transition"
          >
            Lihat Detail
          </button>

          {item.lynkidUrl ? (
            <button
              type="button"
              onClick={handleRegisterClick}
              className="min-h-[44px] py-2.5 px-3 rounded-full gold-gradient-bg text-[#07142b] text-xs font-bold text-center hover:brightness-105 active:scale-95 transition shadow-sm"
            >
              Daftar Sekarang
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onSelectDetail(item.slug)}
              className="min-h-[44px] py-2.5 px-3 rounded-full gold-gradient-bg text-[#07142b] text-xs font-bold text-center hover:brightness-105 active:scale-95 transition shadow-sm"
            >
              Daftar Sekarang
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
