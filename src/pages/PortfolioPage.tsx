// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

import React, { useState, useMemo } from 'react';
import { ArrowLeft } from 'lucide-react';
import { KaryaItem, CMSSettings, UserRole } from '../types';
import { ImageSlot } from '../components/common/ImageSlot';
import { Footer } from '../components/common/Footer';
import { WhatsAppFloating } from '../components/common/WhatsAppFloating';

interface PortfolioPageProps {
  karyaList: KaryaItem[];
  cms: CMSSettings;
  currentRole: UserRole;
  onNavigateHome: (section?: string) => void;
  onOpenLogin: () => void;
}

export const PortfolioPage: React.FC<PortfolioPageProps> = ({
  karyaList,
  cms,
  currentRole,
  onNavigateHome,
  onOpenLogin,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');

  const categories = useMemo(() => {
    const set = new Set<string>();
    karyaList.forEach((k) => {
      if (k.category) set.add(k.category);
    });
    return ['Semua', ...Array.from(set)];
  }, [karyaList]);

  const filteredKarya = useMemo(() => {
    if (selectedCategory === 'Semua') return karyaList;
    return karyaList.filter((k) => k.category === selectedCategory);
  }, [karyaList, selectedCategory]);

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f5ef]">
      {/* Top Header */}
      <div className="bg-[#07142b] text-white py-14 sm:py-20 border-b border-[#c9a35a]/20">
        <div className="max-w-[1200px] 2xl:max-w-[1320px] mx-auto px-4 sm:px-6">
          <button
            type="button"
            onClick={() => onNavigateHome('karya')}
            className="flex items-center gap-2 text-sm text-gray-300 hover:text-[#e8cd8f] transition mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali</span>
          </button>
          <div className="text-xs uppercase tracking-[0.2em] font-semibold text-[#e8cd8f] mb-2">
            Karya Peserta
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white leading-tight">
            Koleksi Aplikasi Karya Peserta
          </h1>
        </div>
      </div>

      <main className="flex-1 py-12 max-w-[1200px] 2xl:max-w-[1320px] mx-auto px-4 sm:px-6 w-full space-y-8">
        {/* Filter Kategori */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition ${
                selectedCategory === cat
                  ? 'bg-[#0b1c38] text-white'
                  : 'bg-white border border-[#e7e1d5] text-[#4b5565] hover:border-[#c9a35a]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid Karya */}
        {filteredKarya.length === 0 ? (
          <div className="py-20 text-center text-[#6b7280]">
            <p className="font-serif text-lg">Belum ada karya</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredKarya.map((item) => {
              const Content = (
                <div className="group relative rounded-[18px] overflow-hidden shadow-md border border-[#e7e1d5] aspect-[1.45/1] bg-[#07142b] block cursor-pointer">
                  <ImageSlot
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07142b] via-[#07142b]/40 to-transparent flex items-end p-4">
                    <div className="space-y-1">
                      <span className="text-[10px] text-[#e8cd8f] uppercase tracking-wider block">
                        {item.category}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#c9a35a] flex-shrink-0" />
                        <h3 className="font-serif font-medium text-sm sm:text-base text-white line-clamp-2 leading-tight">
                          {item.title}
                        </h3>
                      </div>
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
      </main>

      <Footer
        cms={cms}
        currentRole={currentRole}
        onNavigate={onNavigateHome}
        onOpenLogin={onOpenLogin}
      />

      {cms.features.waFloating && (
        <WhatsAppFloating
          phone={cms.footer.waNumber}
          defaultMsg={cms.buttons.waDefaultMsg}
          isHomePage={false}
        />
      )}
    </div>
  );
};
