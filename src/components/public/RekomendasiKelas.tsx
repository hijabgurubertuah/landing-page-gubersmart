// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

import React from 'react';
import { ClassItem } from '../../types';
import { KartuKelasPublik } from './KartuKelasPublik';

interface RekomendasiKelasProps {
  currentClassId: string;
  allClasses: ClassItem[];
  onSelectDetail: (slug: string) => void;
}

export const RekomendasiKelas: React.FC<RekomendasiKelasProps> = ({
  currentClassId,
  allClasses,
  onSelectDetail,
}) => {
  // Ambil maksimal 3 kelas aktif lainnya (terbaru dulu)
  const otherClasses = allClasses
    .filter((c) => c.id !== currentClassId && c.status === 'active' && !c.dihapus)
    .slice(0, 3);

  if (otherClasses.length === 0) return null;

  return (
    <div className="space-y-6 pt-6">
      <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#1b2433]">
        Pilihan Kelas Lainnya
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {otherClasses.map((c) => (
          <KartuKelasPublik
            key={c.id}
            item={c}
            onSelectDetail={onSelectDetail}
          />
        ))}
      </div>
    </div>
  );
};
