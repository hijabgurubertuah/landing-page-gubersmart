// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

import React from 'react';
import { CMSSettings, UserRole } from '../../types';
import { BrandLogo } from './BrandLogo';

interface FooterProps {
  cms: CMSSettings;
  currentRole: UserRole;
  onNavigate: (target: string) => void;
  onOpenLogin: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  cms,
  currentRole,
  onNavigate,
  onOpenLogin,
}) => {
  const socialEntries = Object.entries(cms.footer.socialMedia).filter(
    ([, val]) => Boolean(val && val.trim())
  );

  return (
    <footer className="relative bg-[#07142b] text-[#e7e1d5] pt-16 pb-12 overflow-hidden border-t border-[#c9a35a]/20 bg-islamic-pattern">
      <div className="max-w-[1200px] 2xl:max-w-[1320px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#1b365f]/80">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <BrandLogo
              logoUrl={cms.identity.logo}
              appName={cms.identity.appName}
              size="md"
            />
            <p className="font-serif italic text-[#e8cd8f] text-base">
              {cms.footer.motto || 'Ide • Aplikasi • Karya'}
            </p>
            <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
              {cms.identity.pageDescription}
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs uppercase tracking-widest text-[#e8cd8f] font-semibold">
              Tautan Cepat
            </div>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('hero')}
                  className="text-gray-300 hover:text-[#e8cd8f] transition"
                >
                  Beranda
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('profil')}
                  className="text-gray-300 hover:text-[#e8cd8f] transition"
                >
                  Profil
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('kelas')}
                  className="text-gray-300 hover:text-[#e8cd8f] transition"
                >
                  Kelas
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('keunggulan')}
                  className="text-gray-300 hover:text-[#e8cd8f] transition"
                >
                  Keunggulan
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('karya')}
                  className="text-gray-300 hover:text-[#e8cd8f] transition"
                >
                  Karya
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('tips')}
                  className="text-gray-300 hover:text-[#e8cd8f] transition"
                >
                  Tips
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('kontak')}
                  className="text-gray-300 hover:text-[#e8cd8f] transition"
                >
                  Kontak
                </button>
              </li>
              <li>
                {currentRole === 'guest' ? (
                  <button
                    type="button"
                    onClick={onOpenLogin}
                    className="text-gray-300 hover:text-[#e8cd8f] transition"
                  >
                    Masuk
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => onNavigate('admin')}
                    className="text-[#e8cd8f] hover:text-white transition"
                  >
                    Dasbor
                  </button>
                )}
              </li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-xs uppercase tracking-widest text-[#e8cd8f] font-semibold">
              Hubungi Kami
            </div>
            <div className="space-y-2 text-sm text-gray-300">
              <div>WhatsApp: {cms.footer.waNumber}</div>
              <div>{cms.footer.serviceHours}</div>
              {socialEntries.length > 0 && (
                <div className="pt-2 flex flex-wrap gap-3">
                  {socialEntries.map(([platform, url]) => (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[#e8cd8f] hover:underline capitalize"
                    >
                      {platform}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div>{cms.footer.copyright}</div>
          <div className="text-gray-400">Guber Smart</div>
        </div>
      </div>
    </footer>
  );
};
