/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.
 */

import React from 'react';
import { CmsSettings } from '../../types';
import { BrandLogo } from './BrandLogo';
import { MessageCircle, Instagram, Youtube, Facebook, Send } from 'lucide-react';

interface FooterProps {
  cms: CmsSettings;
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ cms, onNavigate }) => {
  const quickLinks = cms.navigation.filter(item => item.show);
  const social = cms.contact.social;

  return (
    <footer className="bg-[#07142b] text-white pt-16 pb-12 border-t border-[#c9a35a]/20 relative overflow-hidden">
      {/* Subtle Islamic geometric star pattern background layer */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#c9a35a_1px,transparent_1px)] [background-size:24px_24px]"></div>

      <div className="max-w-[1200px] mx-auto px-4 md:px-8 relative z-10 grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
        <div className="space-y-4">
          <BrandLogo cms={cms} />
          <p className="text-sm italic text-[#e8cd8f] font-serif">{cms.identity.slogan || 'Ide • Aplikasi • Karya'}</p>
          <p className="text-sm text-white/70 leading-relaxed">{cms.identity.seoDesc}</p>
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-bold uppercase tracking-wider text-[#e8cd8f] font-serif">Tautan Cepat</h4>
          <ul className="grid grid-cols-2 gap-2 text-sm">
            {quickLinks.map((item, idx) => (
              <li key={idx}>
                <button
                  onClick={() => onNavigate(item.url)}
                  className="text-white/80 hover:text-[#e8cd8f] transition text-left"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-bold uppercase tracking-wider text-[#e8cd8f] font-serif">Hubungi Kami</h4>
          <div className="space-y-2 text-sm text-white/80">
            <a
              href={`https://wa.me/62${cms.contact.whatsapp.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-[#e8cd8f] transition"
            >
              <MessageCircle className="w-4 h-4 text-[#16a34a]" />
              <span>WhatsApp: {cms.contact.whatsapp}</span>
            </a>
            <p className="text-xs text-white/60">{cms.contact.serviceHours}</p>

            <div className="flex items-center gap-3 pt-2">
              {social.instagram && (
                <a href={social.instagram} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-[#12284a] text-[#e8cd8f] hover:bg-[#c9a35a] hover:text-[#07142b] transition">
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              {social.youtube && (
                <a href={social.youtube} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-[#12284a] text-[#e8cd8f] hover:bg-[#c9a35a] hover:text-[#07142b] transition">
                  <Youtube className="w-4 h-4" />
                </a>
              )}
              {social.facebook && (
                <a href={social.facebook} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-[#12284a] text-[#e8cd8f] hover:bg-[#c9a35a] hover:text-[#07142b] transition">
                  <Facebook className="w-4 h-4" />
                </a>
              )}
              {social.tiktok && (
                <a href={social.tiktok} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-[#12284a] text-[#e8cd8f] hover:bg-[#c9a35a] hover:text-[#07142b] transition">
                  <Send className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 md:px-8 pt-6 border-t border-[#1b365f] flex flex-col md:flex-row items-center justify-between text-xs text-white/50 relative z-10">
        <p>{cms.contact.copyright}</p>
        <p className="mt-2 md:mt-0 font-serif italic text-[#c9a35a]">Guber Smart - Solusi Pembuatan Aplikasi Mudah</p>
      </div>
    </footer>
  );
};
