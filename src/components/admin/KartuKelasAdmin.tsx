// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

import React, { useState } from 'react';
import { Edit3, Trash2, MousePointerClick } from 'lucide-react';
import { ClassItem } from '../../types';
import { formatRupiah } from '../../data/kelasModel';

interface KartuKelasAdminProps {
  item: ClassItem;
  hasUnsavedChanges?: boolean;
  onEdit: (item: ClassItem) => void;
  onDeleteRequest: (id: string) => void;
}

export const KartuKelasAdmin: React.FC<KartuKelasAdminProps> = ({
  item,
  hasUnsavedChanges = false,
  onEdit,
  onDeleteRequest,
}) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="relative bg-white rounded-[18px] p-5 shadow-sm border border-[#e7e1d5] flex flex-col justify-between space-y-4 hover:shadow-md transition">
      {/* Penanda Titik Perubahan Draf */}
      {hasUnsavedChanges && (
        <span
          className="absolute top-3 right-3 w-3 h-3 rounded-full bg-[#c9a35a] shadow ring-2 ring-white"
          title="Ada perubahan draf"
        />
      )}

      <div className="space-y-3">
        {/* Thumbnail Sampul 16:9 */}
        <div className="w-full aspect-[16/9] rounded-xl overflow-hidden bg-[#07142b] border border-[#e7e1d5] relative">
          {item.image && !imgError ? (
            <img
              src={item.image}
              alt={item.name}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#07142b] to-[#1b365f] flex items-center justify-center text-[#e8cd8f] text-xs font-serif p-3 text-center">
              {item.name || 'Kelas Guber Smart'}
            </div>
          )}
        </div>

        {/* Status Badge & Klik */}
        <div className="flex items-center justify-between">
          <span
            className={`text-xs font-bold uppercase px-2.5 py-0.5 rounded-full ${
              item.status === 'active'
                ? 'bg-emerald-100 text-emerald-800'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            {item.status === 'active' ? 'Aktif' : 'Nonaktif'}
          </span>

          <div className="flex items-center gap-1 text-xs text-[#6b7280]">
            <MousePointerClick className="w-3.5 h-3.5 text-[#a77d36]" />
            <span>{item.clicksCount || 0} klik</span>
          </div>
        </div>

        <h3 className="font-serif font-bold text-lg text-[#1b2433] leading-snug line-clamp-2">
          {item.name}
        </h3>

        <p className="text-xs text-[#4b5565] line-clamp-2 leading-relaxed">
          {item.shortDesc}
        </p>

        {/* Harga */}
        <div className="flex items-baseline gap-2 pt-1">
          {item.normalPrice > item.currentPrice && (
            <span className="text-xs text-[#6b7280] line-through">
              {formatRupiah(item.normalPrice)}
            </span>
          )}
          <span className="font-serif font-bold text-base text-[#07142b]">
            {item.currentPrice === 0 ? 'Gratis' : formatRupiah(item.currentPrice)}
          </span>
        </div>
      </div>

      {/* Aksi Ubah & Hapus */}
      <div className="pt-3 border-t border-[#f8f5ef] flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={() => onEdit(item)}
          className="min-h-[44px] px-3.5 py-1.5 bg-[#f8f5ef] text-[#07142b] hover:bg-[#e7e1d5] rounded-xl text-xs font-semibold transition flex items-center gap-1.5"
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>Ubah</span>
        </button>

        <button
          type="button"
          onClick={() => onDeleteRequest(item.id)}
          className="min-h-[44px] p-2.5 text-red-600 hover:bg-red-50 rounded-xl transition flex items-center justify-center"
          aria-label="Hapus"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
