// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

import React, { useEffect, useState } from 'react';
import { Menu } from 'lucide-react';
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

  const handleItemClick = (target: string) => {
    setIsOpen(false);
    onNavigate(target);
  };

  const handleLoginClick = () => {
    setIsOpen(false);
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
        className="lg:hidden fixed left-0 top-1/2 -translate-y-1/2 z-40 h-[120px] w-[25px] rounded-r-lg bg-[#0b1c38]/85 hover:bg-[#0b1c38] text-[#e8cd8f] border-r border-y border-[#c9a35a]/50 flex items-center justify-center shadow-lg transition"
      >
        <Menu className="w-4 h-4" />
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-[#07142b]/70 backdrop-blur-sm transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer Sidebar */}
      <aside
        className={`lg:hidden fixed top-0 bottom-0 left-0 z-50 w-[280px] max-w-[85vw] bg-[#0b1c38] text-white shadow-2xl transition-transform duration-300 ease-out flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header Drawer */}
        <div className="p-6 border-b border-[#1b365f] flex items-center justify-between">
          <BrandLogo
            logoUrl={cms?.identity.logo}
            appName={cms?.identity.appName || 'Guber Smart'}
            size="sm"
          />
        </div>

        {/* List Menu Vertikal */}
        <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1 no-scrollbar">
          {navItems.map((item) => {
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

          {/* Item Terakhir: Masuk atau Dasbor & Keluar */}
          {currentRole === 'guest' ? (
            <button
              type="button"
              onClick={handleLoginClick}
              className="w-full min-h-[48px] px-4 flex items-center text-left text-base font-medium rounded-xl text-gray-300 hover:text-[#e8cd8f] hover:bg-[#12284a]/50 transition"
            >
              Masuk
            </button>
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
