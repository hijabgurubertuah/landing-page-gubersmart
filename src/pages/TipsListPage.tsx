// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

import React, { useState, useMemo } from 'react';
import { ArrowLeft, Search } from 'lucide-react';
import { TipsItem, CMSSettings, UserRole } from '../types';
import { ImageSlot } from '../components/common/ImageSlot';
import { Footer } from '../components/common/Footer';
import { WhatsAppFloating } from '../components/common/WhatsAppFloating';

interface TipsListPageProps {
  tips: TipsItem[];
  cms: CMSSettings;
  currentRole: UserRole;
  onNavigateHome: (section?: string) => void;
  onSelectTip: (slug: string) => void;
  onOpenLogin: () => void;
}

export const TipsListPage: React.FC<TipsListPageProps> = ({
  tips,
  cms,
  currentRole,
  onNavigateHome,
  onSelectTip,
  onOpenLogin,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const headerImage = cms.sections.find((s) => s.id === 'tips')?.image;

  const categories = useMemo(() => {
    const set = new Set<string>();
    tips.forEach((t) => {
      if (t.status === 'published' && t.category) set.add(t.category);
    });
    return ['Semua', ...Array.from(set)];
  }, [tips]);

  const filteredTips = useMemo(() => {
    return tips
      .filter((t) => t.status === 'published')
      .filter((t) => {
        const matchesCategory =
          selectedCategory === 'Semua' || t.category === selectedCategory;
        const matchesSearch =
          t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.summary.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      });
  }, [tips, selectedCategory, searchQuery]);

  const totalPages = Math.ceil(filteredTips.length / itemsPerPage) || 1;
  const paginatedTips = filteredTips.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f5ef]">
      {/* Header Halaman Bergambar Slot 5 dengan Overlay Navy */}
      <div className="relative bg-[#07142b] text-white py-16 sm:py-24 overflow-hidden border-b border-[#c9a35a]/20">
        <div className="absolute inset-0 z-0 opacity-30">
          <ImageSlot
            src={headerImage}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-[#07142b]/80 backdrop-blur-xs z-0" />

        <div className="relative z-10 max-w-[1200px] 2xl:max-w-[1320px] mx-auto px-4 sm:px-6">
          <button
            type="button"
            onClick={() => onNavigateHome('tips')}
            className="flex items-center gap-2 text-sm text-gray-300 hover:text-[#e8cd8f] transition mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali</span>
          </button>
          <div className="text-xs uppercase tracking-[0.2em] font-semibold text-[#e8cd8f] mb-2">
            Tips dan Informasi
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white leading-tight">
            Semua Tips & Panduan
          </h1>
        </div>
      </div>

      <main className="flex-1 py-12 max-w-[1200px] 2xl:max-w-[1320px] mx-auto px-4 sm:px-6 w-full space-y-8">
        {/* Kontrol Pencarian & Filter Kategori */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Filter Kategori */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat);
                  setCurrentPage(1);
                }}
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

          {/* Kolom Pencarian */}
          {cms.features.searchTips && (
            <div className="relative max-w-xs w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Cari tips..."
                className="w-full rounded-full border border-[#e7e1d5] bg-white pl-10 pr-4 py-2 text-sm text-[#1b2433] focus:border-[#c9a35a] focus:outline-none transition"
              />
              <Search className="w-4 h-4 text-[#6b7280] absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          )}
        </div>

        {/* Grid Artikel Tips */}
        {filteredTips.length === 0 ? (
          <div className="py-20 text-center text-[#6b7280]">
            <p className="font-serif text-lg">Belum ada tips yang sesuai</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedTips.map((tip) => (
              <article
                key={tip.id}
                className="bg-white rounded-[18px] overflow-hidden shadow-md border border-[#e7e1d5] flex flex-col hover:-translate-y-1 transition duration-300"
              >
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
                      <span className="font-medium text-[#a77d36]">
                        {tip.category}
                      </span>
                      <span className="text-[#6b7280]">{tip.publishedAt}</span>
                    </div>

                    <h2 className="font-serif font-bold text-xl text-[#1b2433] leading-snug line-clamp-2">
                      {tip.title}
                    </h2>

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

        {/* Penomoran Halaman */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 pt-8">
            {Array.from({ length: totalPages }).map((_, idx) => {
              const p = idx + 1;
              return (
                <button
                  key={p}
                  type="button"
                  onClick={() => setCurrentPage(p)}
                  className={`w-10 h-10 rounded-full text-sm font-medium transition ${
                    currentPage === p
                      ? 'bg-[#0b1c38] text-[#e8cd8f] font-bold shadow'
                      : 'bg-white border border-[#e7e1d5] text-[#4b5565] hover:bg-[#f8f5ef]'
                  }`}
                >
                  {p}
                </button>
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
