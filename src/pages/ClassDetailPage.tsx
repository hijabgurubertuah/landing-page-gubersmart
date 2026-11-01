// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { ClassItem, CMSSettings, UserRole } from '../types';
import { kelasStore } from '../data/kelasStore';
import { kelasSync } from '../data/kelasSync';
import { formatRupiah, formatClassUrl } from '../data/kelasModel';
import { AkordeonKurikulum } from '../components/public/AkordeonKurikulum';
import { FaqKelas } from '../components/public/FaqKelas';
import { RekomendasiKelas } from '../components/public/RekomendasiKelas';
import { Footer } from '../components/common/Footer';
import { ErrorBoundary } from '../components/common/ErrorBoundary';

interface ClassDetailPageProps {
  slug?: string;
  classes?: ClassItem[];
  cms?: CMSSettings;
  currentRole?: UserRole;
  onNavigateHome: (section?: string) => void;
  onSelectClass: (slug: string) => void;
  onOpenLogin?: () => void;
}

export const ClassDetailPage: React.FC<ClassDetailPageProps> = ({
  slug,
  cms,
  onNavigateHome,
  onSelectClass,
}) => {
  const [publishedClasses, setPublishedClasses] = useState<ClassItem[]>(() =>
    kelasStore.getPublishedAll()
  );
  const [isInitialLoadDone, setIsInitialLoadDone] = useState(false);

  // Subscribe ke perubahan store real-time
  useEffect(() => {
    const unsub = kelasStore.subscribe(() => {
      setPublishedClasses(kelasStore.getPublishedAll());
    });
    return unsub;
  }, []);

  useEffect(() => {
    // Tarik data terbaru untuk memastikan data slug terbaru
    kelasSync.fetchLatestFromAppsScript().finally(() => {
      setIsInitialLoadDone(true);
    });
  }, [slug]);

  // Cari kelas berdasarkan slug
  const currentClass = publishedClasses.find(
    (c) =>
      !c.dihapus &&
      c.status === 'active' &&
      (c.slug.toLowerCase() === (slug || '').toLowerCase() || c.id === slug)
  );

  // Perbarui meta title & description secara dinamis
  useEffect(() => {
    if (currentClass) {
      document.title = `${currentClass.name} | Guber Smart`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', currentClass.shortDesc || currentClass.name);
      }
    } else {
      document.title = 'Guber Smart - Kelas AI & Digital';
    }
  }, [currentClass]);

  // Handler pendaftaran
  const handleRegisterClick = () => {
    if (!currentClass) return;
    kelasSync.trackClassClick(currentClass.id);
    const targetUrl = formatClassUrl(currentClass.lynkidUrl);
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
  };

  if (!currentClass) {
    if (!isInitialLoadDone) {
      // Tampilkan skeleton pemuatan awal
      return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#f8f5ef]">
          <div className="w-12 h-12 rounded-full border-4 border-[#c9a35a] border-t-transparent animate-spin mb-4" />
        </div>
      );
    }

    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-[#f8f5ef]">
        <h2 className="text-2xl font-serif font-bold text-[#1b2433] mb-4">
          Kelas Tidak Ditemukan
        </h2>
        <button
          type="button"
          onClick={() => onNavigateHome('kelas')}
          className="min-h-[44px] px-7 py-3 rounded-full gold-gradient-bg text-[#07142b] font-bold shadow-md hover:brightness-105 active:scale-95 transition"
        >
          Kembali ke Beranda
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f5ef] pb-24 sm:pb-0">
      {/* Sticky Top Bar Navigation */}
      <div className="bg-[#0b1c38] text-white py-3.5 px-4 sm:px-6 sticky top-0 z-40 shadow-md">
        <div className="max-w-[1000px] mx-auto flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => onNavigateHome('kelas')}
            className="flex items-center gap-2 text-sm font-semibold text-gray-200 hover:text-[#e8cd8f] transition min-h-[44px]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Beranda</span>
          </button>

          <span className="font-serif text-[#e8cd8f] font-bold text-sm truncate max-w-[200px] sm:max-w-none">
            {currentClass.name}
          </span>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 py-8 sm:py-14 max-w-[1000px] mx-auto px-4 sm:px-6 w-full space-y-8 sm:space-y-12">
        {/* Banner Utama 16:9 */}
        <div className="rounded-[20px] overflow-hidden shadow-xl border border-[#e7e1d5] aspect-[16/9] bg-[#07142b] relative">
          {currentClass.image ? (
            <img
              src={currentClass.image}
              alt={currentClass.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#07142b] to-[#1b365f] flex items-center justify-center text-[#e8cd8f] text-base sm:text-2xl font-serif font-bold p-6 text-center">
              {currentClass.name}
            </div>
          )}
        </div>

        {/* Header Kelas: Nama, Harga, Deskripsi */}
        <div className="bg-white rounded-[18px] p-6 sm:p-10 shadow-sm border border-[#e7e1d5] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h1 className="text-2xl sm:text-4xl font-serif font-bold text-[#1b2433] leading-tight">
              {currentClass.name}
            </h1>

            <div className="flex flex-col items-start sm:items-end flex-shrink-0">
              {currentClass.normalPrice > currentClass.currentPrice && (
                <span className="text-sm text-[#6b7280] line-through">
                  {formatRupiah(currentClass.normalPrice)}
                </span>
              )}
              <span className="font-serif font-bold text-2xl sm:text-3xl text-[#07142b]">
                {currentClass.currentPrice === 0
                  ? 'Gratis'
                  : formatRupiah(currentClass.currentPrice)}
              </span>
            </div>
          </div>

          {/* Desktop Register Button */}
          <div className="hidden sm:block pt-2">
            <button
              type="button"
              onClick={handleRegisterClick}
              className="min-h-[48px] px-8 py-3 rounded-full gold-gradient-bg text-[#07142b] font-bold text-base hover:brightness-105 active:scale-95 transition shadow-md"
            >
              Daftar Sekarang
            </button>
          </div>

          <div className="border-t border-[#f8f5ef] pt-6 text-base sm:text-lg text-[#4b5565] leading-relaxed whitespace-pre-line">
            {currentClass.fullDesc || currentClass.shortDesc}
          </div>
        </div>

        {/* Akordeon Kurikulum Materi Pertemuan */}
        <ErrorBoundary>
          <AkordeonKurikulum curriculum={currentClass.curriculum || []} />
        </ErrorBoundary>

        {/* FAQ Kelas */}
        <ErrorBoundary>
          <FaqKelas faqs={currentClass.faqs || []} />
        </ErrorBoundary>

        {/* Rekomendasi Kelas Lainnya */}
        <ErrorBoundary>
          <RekomendasiKelas
            currentClassId={currentClass.id}
            allClasses={publishedClasses}
            onSelectDetail={onSelectClass}
          />
        </ErrorBoundary>
      </main>

      {/* Sticky Bottom Bar di HP */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#e7e1d5] p-3 shadow-2xl">
        <div className="flex items-center justify-between gap-3">
          <div className="flex flex-col">
            {currentClass.normalPrice > currentClass.currentPrice && (
              <span className="text-[11px] text-[#6b7280] line-through">
                {formatRupiah(currentClass.normalPrice)}
              </span>
            )}
            <span className="font-serif font-bold text-lg text-[#07142b]">
              {currentClass.currentPrice === 0
                ? 'Gratis'
                : formatRupiah(currentClass.currentPrice)}
            </span>
          </div>

          <button
            type="button"
            onClick={handleRegisterClick}
            className="flex-1 min-h-[48px] px-6 py-3 rounded-full gold-gradient-bg text-[#07142b] font-bold text-sm hover:brightness-105 active:scale-95 transition shadow-md text-center"
          >
            Daftar Sekarang
          </button>
        </div>
      </div>

      {cms && <Footer cms={cms} onNavigate={onNavigateHome} />}
    </div>
  );
};

// Re-export sebagai KelasDetail untuk kesesuaian arsitektur
export const KelasDetail = ClassDetailPage;
