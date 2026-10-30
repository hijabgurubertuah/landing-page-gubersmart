// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

import React, { useEffect, useState } from 'react';
import { CMSSettings, UserRole } from '../../types';
import { BrandLogo } from './BrandLogo';

interface HeaderProps {
  cms?: CMSSettings;
  currentRole: UserRole;
  activeSection: string;
  onNavigate: (target: string) => void;
  onOpenLogin: () => void;
  isHomePage?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  cms,
  currentRole,
  activeSection,
  onNavigate,
  onOpenLogin,
  isHomePage = true,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Beranda', target: 'hero' },
    { label: 'Profil', target: 'profil' },
    { label: 'Kelas', target: 'kelas' },
    { label: 'Keunggulan', target: 'keunggulan' },
    { label: 'Karya', target: 'karya' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        !isHomePage || isScrolled
          ? 'bg-[#0b1c38]/95 backdrop-blur-md shadow-md py-3'
          : 'bg-gradient-to-b from-[#07142b]/90 to-transparent py-4'
      }`}
    >
      <div className="max-w-[1200px] 2xl:max-w-[1320px] mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo and Brand */}
        <button
          type="button"
          onClick={() => onNavigate('hero')}
          className="flex items-center text-left group focus:outline-none"
        >
          <BrandLogo
            logoUrl={cms?.identity.logo}
            appName={cms?.identity.appName || 'Guber Smart'}
            size="md"
          />
        </button>

        {/* Desktop Menu - Hidden on Mobile */}
        <nav className="hidden lg:flex items-center gap-7">
          {navItems.map((item) => {
            const isActive = isHomePage && activeSection === item.target;
            return (
              <button
                key={item.target}
                type="button"
                onClick={() => onNavigate(item.target)}
                className={`relative py-1 text-sm font-medium transition ${
                  isActive
                    ? 'text-[#e8cd8f]'
                    : 'text-gray-200 hover:text-white'
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#c9a35a] rounded-full" />
                )}
              </button>
            );
          })}

          {/* Last menu item: Masuk or Dasbor */}
          {currentRole === 'guest' ? (
            <button
              type="button"
              onClick={onOpenLogin}
              className="py-1 text-sm font-medium text-gray-200 hover:text-[#e8cd8f] transition"
            >
              Masuk
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onNavigate('admin')}
              className="py-1 text-sm font-medium text-[#e8cd8f] hover:text-white transition"
            >
              Dasbor
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};
