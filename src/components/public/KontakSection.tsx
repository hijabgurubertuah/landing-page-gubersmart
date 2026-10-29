// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

import React from 'react';
import { CMSSettings } from '../../types';

interface KontakSectionProps {
  cms: CMSSettings;
}

export const KontakSection: React.FC<KontakSectionProps> = ({ cms }) => {
  const kontakSetting = cms.sections.find((s) => s.id === 'kontak');
  const title = kontakSetting?.title || 'Hubungi Kami';
  const subtitle =
    kontakSetting?.subtitle ||
    'Ada pertanyaan sebelum mendaftar? Tim kami siap berdiskusi bersama Anda.';

  const waPhone = cms.footer.waNumber.replace(/[^0-9]/g, '') || '6285376604024';
  const waUrl = `https://wa.me/${waPhone}?text=${encodeURIComponent(
    cms.footer.waMessage || "Assalamu'alaikum, saya ingin bertanya tentang kelas Guber Smart."
  )}`;

  const socialEntries = Object.entries(cms.footer.socialMedia).filter(
    ([, val]) => Boolean(val && val.trim())
  );

  return (
    <section id="kontak" className="py-20 lg:py-28 max-w-[1200px] 2xl:max-w-[1320px] mx-auto px-4 sm:px-6">
      <div className="max-w-2xl mb-12">
        <div className="text-xs uppercase tracking-[0.2em] font-semibold text-[#a77d36] mb-2">
          Kontak
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Kartu WhatsApp */}
        <div className="bg-white rounded-[18px] p-8 shadow-md border border-[#e7e1d5] flex flex-col justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.15em] font-semibold text-[#a77d36] mb-2">
              WhatsApp
            </div>
            <div className="font-serif font-bold text-xl text-[#1b2433] mb-2">
              {cms.footer.waNumber}
            </div>
          </div>
          <div className="pt-6">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-2.5 rounded-full border border-[#c9a35a] text-[#07142b] hover:bg-[#f8f5ef] text-sm font-semibold transition"
            >
              Kirim Pesan
            </a>
          </div>
        </div>

        {/* Kartu Jam Layanan */}
        <div className="bg-white rounded-[18px] p-8 shadow-md border border-[#e7e1d5] flex flex-col justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.15em] font-semibold text-[#a77d36] mb-2">
              Jam Layanan
            </div>
            <div className="font-serif font-bold text-lg text-[#1b2433]">
              {cms.footer.serviceHours}
            </div>
          </div>
        </div>

        {/* Kartu Media Sosial */}
        {socialEntries.length > 0 && (
          <div className="bg-white rounded-[18px] p-8 shadow-md border border-[#e7e1d5] flex flex-col justify-between md:col-span-2 lg:col-span-1">
            <div>
              <div className="text-xs uppercase tracking-[0.15em] font-semibold text-[#a77d36] mb-2">
                Media Sosial
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                {socialEntries.map(([platform, link]) => (
                  <a
                    key={platform}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-full border border-[#e7e1d5] hover:border-[#c9a35a] text-sm text-[#07142b] capitalize transition font-medium"
                  >
                    {platform}
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
