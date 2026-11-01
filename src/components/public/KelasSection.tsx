// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

import React, { useState, useEffect } from 'react';
import { ClassItem, CMSSettings } from '../../types';
import { kelasStore } from '../../data/kelasStore';
import { KartuKelasPublik } from './KartuKelasPublik';
import { ErrorBoundary } from '../common/ErrorBoundary';

interface KelasSectionProps {
  classes?: ClassItem[];
  cms?: CMSSettings;
  onSelectClass: (slug: string) => void;
}

export const KelasSection: React.FC<KelasSectionProps> = ({ onSelectClass }) => {
  const [activeClasses, setActiveClasses] = useState<ClassItem[]>(() =>
    kelasStore.getPublishedPublic()
  );

  useEffect(() => {
    const unsub = kelasStore.subscribe(() => {
      setActiveClasses(kelasStore.getPublishedPublic());
    });
    return unsub;
  }, []);

  if (!activeClasses || activeClasses.length === 0) {
    return null; // Sembunyikan bagian jika tidak ada kelas aktif
  }

  return (
    <section id="kelas" className="py-12 sm:py-20 bg-[#f8f5ef]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-8 sm:space-y-12">
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#1b2433]">
            Program Kelas Pilihan
          </h2>
        </div>

        {/* Grid Kartu Kelas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {activeClasses.map((item) => (
            <ErrorBoundary key={item.id}>
              <KartuKelasPublik
                item={item}
                onSelectDetail={onSelectClass}
              />
            </ErrorBoundary>
          ))}
        </div>
      </div>
    </section>
  );
};

// Re-export sebagai KelasBeranda untuk kesesuaian arsitektur
export const KelasBeranda = KelasSection;
