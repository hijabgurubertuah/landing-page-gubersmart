// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

import React, { useState } from 'react';
import { ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react';
import { ClassItem, CMSSettings, UserRole } from '../types';
import { ImageSlot } from '../components/common/ImageSlot';
import { Footer } from '../components/common/Footer';
import { WhatsAppFloating } from '../components/common/WhatsAppFloating';
import { StorageService, formatUrl } from '../services/storageService';

interface ClassDetailPageProps {
  slug: string;
  classes: ClassItem[];
  cms: CMSSettings;
  currentRole: UserRole;
  onNavigateHome: (section?: string) => void;
  onSelectClass: (slug: string) => void;
  onOpenLogin: () => void;
}

export const ClassDetailPage: React.FC<ClassDetailPageProps> = ({
  slug,
  classes,
  cms,
  currentRole,
  onNavigateHome,
  onSelectClass,
  onOpenLogin,
}) => {
  const currentClass = classes.find(
    (c) => c.slug === slug || c.id === slug || (c.slug && c.slug.toLowerCase() === slug?.toLowerCase())
  );
  const [openMeeting, setOpenMeeting] = useState<number | null>(1);

  if (!currentClass) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-serif font-bold text-[#1b2433] mb-4">
          Kelas Tidak Ditemukan
        </h2>
        <button
          type="button"
          onClick={() => onNavigateHome('kelas')}
          className="px-6 py-2.5 rounded-full gold-gradient-bg text-[#07142b] font-semibold"
        >
          Kembali ke Kelas
        </button>
      </div>
    );
  }

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleRegister = () => {
    StorageService.trackClassClick(currentClass.id);
    const targetUrl =
      currentClass.lynkidUrl || cms.buttons.heroPrimaryUrl || 'https://lynk.id';
    window.open(formatUrl(targetUrl), '_blank', 'noopener,noreferrer');
  };

  const waPhone = cms.footer.waNumber.replace(/[^0-9]/g, '') || '6285376604024';
  const waMsg = encodeURIComponent(
    `Assalamu'alaikum, saya ingin bertanya tentang ${currentClass.name}.`
  );
  const waUrl = `https://wa.me/${waPhone}?text=${waMsg}`;

  const otherClasses = classes
    .filter((c) => c.id !== currentClass.id && c.status === 'active')
    .slice(0, 2);

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f5ef]">
      {/* Top Bar Navigation */}
      <div className="bg-[#0b1c38] text-white py-4 px-4 sm:px-6 sticky top-0 z-30 shadow-md">
        <div className="max-w-[1200px] 2xl:max-w-[1320px] mx-auto flex items-center justify-between">
          <button
            type="button"
            onClick={() => onNavigateHome('kelas')}
            className="flex items-center gap-2 text-sm text-gray-200 hover:text-[#e8cd8f] transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali</span>
          </button>
          <span className="font-serif text-[#e8cd8f] font-bold text-sm truncate max-w-[200px] sm:max-w-none">
            {currentClass.name}
          </span>
        </div>
      </div>

      <main className="flex-1 py-10 sm:py-16 max-w-[1000px] mx-auto px-4 sm:px-6 w-full space-y-12">
        {/* Banner Gambar Kelas */}
        <div className="rounded-[20px] overflow-hidden shadow-xl border border-[#e7e1d5] aspect-[1.8/1] bg-[#07142b]">
          <ImageSlot
            src={currentClass.image}
            alt={currentClass.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Header Kelas: Nama, Harga, Kuota */}
        <div className="bg-white rounded-[18px] p-6 sm:p-10 shadow-md border border-[#e7e1d5] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              {currentClass.quota && (
                <div className="text-xs font-semibold text-[#a77d36] uppercase tracking-wider mb-2">
                  {currentClass.quota}
                </div>
              )}
              <h1 className="text-2xl sm:text-4xl font-serif font-bold text-[#1b2433] leading-tight">
                {currentClass.name}
              </h1>
            </div>

            <div className="flex flex-col items-start sm:items-end">
              {currentClass.normalPrice > currentClass.currentPrice && (
                <span className="text-sm text-[#6b7280] line-through">
                  {formatRupiah(currentClass.normalPrice)}
                </span>
              )}
              <span className="font-serif font-bold text-2xl sm:text-3xl text-[#07142b]">
                {formatRupiah(currentClass.currentPrice)}
              </span>
            </div>
          </div>

          <p className="text-base sm:text-lg text-[#4b5565] leading-relaxed border-t border-[#f8f5ef] pt-6">
            {currentClass.fullDesc || currentClass.shortDesc}
          </p>

          {/* Desktop Action Buttons */}
          <div className="hidden sm:flex items-center gap-4 pt-2">
            <button
              type="button"
              onClick={handleRegister}
              className="px-8 py-3.5 rounded-full gold-gradient-bg text-[#07142b] font-semibold text-center hover:brightness-105 active:scale-95 transition shadow-lg"
            >
              Daftar Sekarang
            </button>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3 rounded-full border border-[#c9a35a] text-[#07142b] hover:bg-[#f8f5ef] font-medium text-center transition"
            >
              Tanya Dulu
            </a>
          </div>
        </div>

        {/* Detail Tambahan: Jadwal, Hasil Akhir, Sasaran */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-[18px] p-6 shadow-sm border border-[#e7e1d5]">
            <div className="text-xs uppercase tracking-widest font-semibold text-[#a77d36] mb-2">
              Jadwal
            </div>
            <div className="text-sm font-medium text-[#1b2433]">
              {currentClass.schedule}
            </div>
          </div>

          <div className="bg-white rounded-[18px] p-6 shadow-sm border border-[#e7e1d5]">
            <div className="text-xs uppercase tracking-widest font-semibold text-[#a77d36] mb-2">
              Hasil Akhir
            </div>
            <div className="text-sm text-[#4b5565] leading-relaxed">
              {currentClass.outcome}
            </div>
          </div>

          <div className="bg-white rounded-[18px] p-6 shadow-sm border border-[#e7e1d5]">
            <div className="text-xs uppercase tracking-widest font-semibold text-[#a77d36] mb-2">
              Cocok Untuk
            </div>
            <div className="text-sm text-[#4b5565] leading-relaxed">
              {currentClass.targetAudience}
            </div>
          </div>
        </div>

        {/* Materi Per Pertemuan (Akordeon) */}
        {Array.isArray(currentClass.curriculum) && currentClass.curriculum.length > 0 && (
          <div className="bg-white rounded-[18px] p-6 sm:p-10 shadow-md border border-[#e7e1d5] space-y-6">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#1b2433]">
              Materi Pembelajaran
            </h2>

            <div className="space-y-3">
              {currentClass.curriculum.map((item) => {
                const isOpen = openMeeting === item.meeting;
                return (
                  <div
                    key={item.meeting}
                    className="rounded-xl border border-[#e7e1d5] overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setOpenMeeting(isOpen ? null : item.meeting)
                      }
                      className="w-full p-4 text-left flex items-center justify-between gap-4 bg-[#f8f5ef]/50 hover:bg-[#f8f5ef] transition"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-full border border-[#c9a35a] text-[#a77d36] text-xs font-serif font-bold flex items-center justify-center flex-shrink-0">
                          {item.meeting}
                        </span>
                        <span className="font-medium text-sm sm:text-base text-[#1b2433]">
                          {item.title}
                        </span>
                      </div>
                      <span className="text-[#a77d36]">
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="p-4 text-sm text-[#4b5565] leading-relaxed border-t border-[#e7e1d5] bg-white">
                        {item.content}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* FAQ Kelas */}
        {Array.isArray(currentClass.faqs) && currentClass.faqs.length > 0 && (
          <div className="bg-white rounded-[18px] p-6 sm:p-10 shadow-md border border-[#e7e1d5] space-y-4">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#1b2433] mb-4">
              Pertanyaan Kelas
            </h2>
            <div className="space-y-4">
              {currentClass.faqs.map((f, idx) => (
                <div key={idx} className="pb-4 border-b border-[#f8f5ef] last:border-b-0">
                  <h3 className="font-serif font-bold text-base text-[#1b2433] mb-1">
                    {f.q}
                  </h3>
                  <p className="text-sm text-[#4b5565] leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Rekomendasi Kelas Lain */}
        {otherClasses.length > 0 && (
          <div className="space-y-6 pt-6">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#1b2433]">
              Pilihan Kelas Lainnya
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {otherClasses.map((oc) => (
                <div
                  key={oc.id}
                  onClick={() => onSelectClass(oc.slug)}
                  className="bg-white rounded-[18px] p-6 shadow-sm border border-[#e7e1d5] cursor-pointer hover:-translate-y-1 transition duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <h3 className="font-serif font-bold text-lg text-[#1b2433]">
                      {oc.name}
                    </h3>
                    <p className="text-xs text-[#4b5565] line-clamp-2">
                      {oc.shortDesc}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-[#e7e1d5] flex items-center justify-between">
                    <span className="font-serif font-bold text-sm text-[#07142b]">
                      {formatRupiah(oc.currentPrice)}
                    </span>
                    <span className="text-xs font-semibold text-[#a77d36]">
                      Lihat Detail
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Sticky Bottom Action Bar di HP */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#e7e1d5] p-3 flex items-center gap-2 shadow-2xl">
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-3 px-3 rounded-full border border-[#c9a35a] text-[#07142b] text-xs font-semibold text-center"
        >
          Tanya Dulu
        </a>
        <button
          type="button"
          onClick={handleRegister}
          className="flex-[2] py-3 px-4 rounded-full gold-gradient-bg text-[#07142b] text-xs font-bold text-center shadow-md active:scale-95 transition"
        >
          Daftar Sekarang
        </button>
      </div>

      <Footer
        cms={cms}
        currentRole={currentRole}
        onNavigate={onNavigateHome}
        onOpenLogin={onOpenLogin}
      />

      <WhatsAppFloating
        phone={cms.footer.waNumber}
        defaultMsg={cms.buttons.waDefaultMsg}
        isHomePage={false}
      />
    </div>
  );
};
