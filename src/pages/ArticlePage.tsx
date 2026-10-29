// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { TipsItem, CMSSettings, UserRole } from '../types';
import { ImageSlot } from '../components/common/ImageSlot';
import { Footer } from '../components/common/Footer';
import { WhatsAppFloating } from '../components/common/WhatsAppFloating';

interface ArticlePageProps {
  slug: string;
  tips: TipsItem[];
  cms: CMSSettings;
  currentRole: UserRole;
  onBack: () => void;
  onOpenLogin: () => void;
  onNavigateHome: (section?: string) => void;
}

export const ArticlePage: React.FC<ArticlePageProps> = ({
  slug,
  tips,
  cms,
  currentRole,
  onBack,
  onOpenLogin,
  onNavigateHome,
}) => {
  const article = tips.find((t) => t.slug === slug);

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-serif font-bold text-[#1b2433] mb-4">
          Artikel Tidak Ditemukan
        </h2>
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-2.5 rounded-full gold-gradient-bg text-[#07142b] font-semibold"
        >
          Kembali ke Daftar Tips
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f5ef]">
      {/* Top Bar Navigation */}
      <div className="bg-[#0b1c38] text-white py-4 px-4 sm:px-6 sticky top-0 z-30 shadow-md">
        <div className="max-w-[1200px] 2xl:max-w-[1320px] mx-auto flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 text-sm text-gray-200 hover:text-[#e8cd8f] transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali</span>
          </button>
          <span className="font-serif text-[#e8cd8f] font-bold text-sm truncate max-w-[200px] sm:max-w-none">
            {article.category}
          </span>
        </div>
      </div>

      <main className="flex-1 py-10 sm:py-16 px-4 sm:px-6 flex justify-center">
        {/* Kartu putih berlebar 820px di tengah (penuh lebar di HP) */}
        <article className="w-full max-w-[820px] bg-white rounded-[22px] p-6 sm:p-12 shadow-lg border border-[#e7e1d5] space-y-8">
          {/* Metadata artikel */}
          <div className="space-y-3">
            <div className="text-xs uppercase tracking-[0.2em] font-semibold text-[#a77d36]">
              {article.category}
            </div>
            <h1 className="text-2xl sm:text-4xl font-serif font-bold text-[#1b2433] leading-tight">
              {article.title}
            </h1>
            <div className="flex items-center gap-4 text-xs text-[#6b7280] pt-1 border-t border-[#f8f5ef]">
              <span>{article.author}</span>
              <span>•</span>
              <span>{article.publishedAt}</span>
            </div>
          </div>

          {/* Gambar Sampul slot 8 */}
          {article.thumbnail && (
            <div className="w-full aspect-[1.9/1] rounded-[18px] overflow-hidden border border-[#e7e1d5]">
              <ImageSlot
                src={article.thumbnail}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Isi Bacaan Nyaman (16,5px, line-height 1.85, gambar bulat) */}
          <div
            className="text-[16.5px] leading-[1.85] text-[#1b2433] prose prose-slate max-w-none [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-8 [&_h2]:mb-3 [&_h3]:font-serif [&_h3]:text-xl [&_h3]:font-bold [&_h3]:mt-6 [&_h3]:mb-2 [&_p]:mb-4 [&_img]:rounded-[16px] [&_img]:border [&_img]:border-[#e7e1d5]"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Tombol Kembali di bawah */}
          <div className="pt-8 border-t border-[#e7e1d5] flex justify-start">
            <button
              type="button"
              onClick={onBack}
              className="px-6 py-2.5 rounded-full border border-[#c9a35a] text-[#07142b] hover:bg-[#f8f5ef] text-sm font-semibold transition flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali</span>
            </button>
          </div>
        </article>
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
