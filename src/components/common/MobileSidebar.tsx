// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

import React, { useEffect, useState } from 'react';
import { Menu, Search } from 'lucide-react';
import { CMSSettings, UserRole } from '../../types';
import { BrandLogo } from './BrandLogo';

interface MobileSidebarProps {
  cms?: CMSSettings;
  currentRole: UserRole;
  activeSection: string;
  onNavigate: (target: string) => void;
  onOpenLogin: () => void;
  onLogout: () => void;
  isHomePage?: boolean;
}

export const MobileSidebar: React.FC<MobileSidebarProps> = ({
  cms,
  currentRole,
  activeSection,
  onNavigate,
  onOpenLogin,
  onLogout,
  isHomePage = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Lock background scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const navItems = [
    { label: 'Beranda', target: 'hero' },
    { label: 'Profil', target: 'profil' },
    { label: 'Kelas', target: 'kelas' },
    { label: 'Keunggulan', target: 'keunggulan' },
    { label: 'Karya', target: 'karya' },
  ];

  const trimmedQuery = searchQuery.trim().toLowerCase();
  const isSecretMatched = trimmedQuery === 'xxxx' || trimmedQuery === 'login';

  const displayedNavItems = isSecretMatched
    ? navItems
    : searchQuery.trim()
    ? navItems.filter((item) =>
        item.label.toLowerCase().includes(trimmedQuery)
      )
    : navItems;

  const handleItemClick = (target: string) => {
    setIsOpen(false);
    onNavigate(target);
  };

  const handleLoginClick = () => {
    setIsOpen(false);
    setSearchQuery('');
    onOpenLogin();
  };

  const handleLogoutClick = () => {
    setIsOpen(false);
    onLogout();
  };

  return (
    <>
      {/* Tombol Pembuka Sidebar di Tepi Kiri Layar (Tepat di tengah tinggi, 120px x 25px) */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Buka Menu"
        className="fixed left-0 top-1/2 -translate-y-1/2 z-40 h-[120px] w-[25px] rounded-r-lg bg-[#0b1c38]/85 hover:bg-[#0b1c38] text-[#e8cd8f] border-r border-y border-[#c9a35a]/50 flex items-center justify-center shadow-lg transition"
      >
        <Menu className="w-4 h-4" />
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#07142b]/70 backdrop-blur-sm transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer Sidebar */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-[290px] max-w-[85vw] bg-[#0b1c38] text-white shadow-2xl transition-transform duration-300 ease-out flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header Drawer */}
        <div className="p-5 border-b border-[#1b365f] flex items-center justify-between">
          <BrandLogo
            logoUrl={cms?.identity.logo}
            appName={cms?.identity.appName || 'Guber Smart'}
            size="sm"
          />
        </div>

        {/* Kolom Pencarian */}
        <div className="px-4 pt-4 pb-2">
          <div className="relative">
            <Search className="w-4 h-4 text-[#c9a35a] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari..."
              className="w-full bg-[#12284a] text-white placeholder-gray-400 text-sm rounded-xl pl-10 pr-8 py-2.5 border border-[#c9a35a]/30 focus:outline-none focus:border-[#c9a35a] transition"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white text-xs w-4 h-4 flex items-center justify-center"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* List Menu Vertikal */}
        <nav className="flex-1 overflow-y-auto px-4 py-3 space-y-1 no-scrollbar">
          {displayedNavItems.map((item) => {
            const isActive = isHomePage && activeSection === item.target;
            return (
              <button
                key={item.target}
                type="button"
                onClick={() => handleItemClick(item.target)}
                className={`w-full min-h-[48px] px-4 flex items-center text-left text-base font-medium rounded-xl transition ${
                  isActive
                    ? 'text-[#e8cd8f] bg-[#12284a] font-semibold'
                    : 'text-gray-300 hover:text-white hover:bg-[#12284a]/50'
                }`}
              >
                {item.label}
              </button>
            );
          })}

          {displayedNavItems.length === 0 && !isSecretMatched && (
            <div className="px-4 py-4 text-xs text-gray-400">
              Tidak ada menu ditemukan
            </div>
          )}

          {/* Tombol Masuk: Tersembunyi untuk publik, hanya muncul jika mengetikkan xxxx atau login pada kolom pencarian */}
          {currentRole === 'guest' ? (
            isSecretMatched && (
              <button
                type="button"
                onClick={handleLoginClick}
                className="w-full min-h-[48px] px-4 flex items-center text-left text-base font-semibold rounded-xl text-[#07142b] bg-gradient-to-r from-[#e8cd8f] via-[#c9a35a] to-[#a77d36] shadow-md transition hover:brightness-105 active:scale-95 mt-2"
              >
                Masuk
              </button>
            )
          ) : (
            <>
              <button
                type="button"
                onClick={() => handleItemClick('admin')}
                className="w-full min-h-[48px] px-4 flex items-center text-left text-base font-medium rounded-xl text-[#e8cd8f] hover:bg-[#12284a]/50 transition"
              >
                Dasbor
              </button>
              <button
                type="button"
                onClick={handleLogoutClick}
                className="w-full min-h-[48px] px-4 flex items-center text-left text-base font-medium rounded-xl text-red-400 hover:bg-[#12284a]/50 transition"
              >
                Keluar
              </button>
            </>
          )}
        </nav>
      </aside>
    </>
  );
};
