// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

import React, { useState, useEffect } from 'react';
import { Menu, ArrowLeft } from 'lucide-react';
import { CMSSettings, UserRole } from '../../types';
import { BrandLogo } from '../common/BrandLogo';

interface AdminLayoutProps {
  cms?: CMSSettings;
  currentRole: UserRole;
  currentTab: string;
  onSelectTab: (tab: string) => void;
  onLogout: () => void;
  onViewWebsite: () => void;
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  cms,
  currentRole,
  currentTab,
  onSelectTab,
  onLogout,
  onViewWebsite,
  children,
}) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileOpen]);

  const isSuperadmin = currentRole === 'superadmin';

  const menuItems = [
    { id: 'dasbor', label: 'Dasbor' },
    { id: 'kelas', label: 'Kelas' },
    { id: 'testimoni', label: 'Testimoni' },
    { id: 'karya', label: 'Karya' },
    { id: 'tips', label: 'Tips' },
    { id: 'faq', label: 'FAQ' },
    { id: 'sandi', label: 'Kata Sandi' },
    ...(isSuperadmin
      ? [
          { id: 'cms', label: 'CMS' },
          { id: 'sinkronisasi', label: 'Sinkronisasi' },
          { id: 'firebase', label: 'Firebase' },
          { id: 'logs', label: 'Log Aktivitas' },
          { id: 'akun', label: 'Kelola Admin' },
        ]
      : []),
  ];

  const handleMobileSelect = (id: string) => {
    onSelectTab(id);
    setIsMobileOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#f8f5ef] flex flex-col lg:flex-row">
      {/* Top Header di HP: HANYA LOGO/NAMA, TANPA HAMBURGER */}
      <div className="lg:hidden bg-[#0b1c38] text-white py-3 px-4 flex items-center justify-between sticky top-0 z-30 shadow-md">
        <BrandLogo
          logoUrl={cms?.identity.logo}
          appName={cms?.identity.appName || 'Guber Smart'}
          size="sm"
        />
        <button
          type="button"
          onClick={onViewWebsite}
          className="text-xs text-gray-300 hover:text-white flex items-center gap-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Website</span>
        </button>
      </div>

      {/* Tombol Pembuka Sidebar HP di Tepi Kiri Tengah Layar (120px x 25px) */}
      <button
        type="button"
        onClick={() => setIsMobileOpen(true)}
        aria-label="Buka Menu Admin"
        className="lg:hidden fixed left-0 top-1/2 -translate-y-1/2 z-40 h-[120px] w-[25px] rounded-r-lg bg-[#0b1c38]/85 hover:bg-[#0b1c38] text-[#e8cd8f] border-r border-y border-[#c9a35a]/50 flex items-center justify-center shadow-lg transition"
      >
        <Menu className="w-4 h-4" />
      </button>

      {/* Backdrop Sidebar HP */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-[#07142b]/70 backdrop-blur-sm"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar HP */}
      <aside
        className={`lg:hidden fixed top-0 bottom-0 left-0 z-50 w-[280px] max-w-[85vw] bg-[#0b1c38] text-white shadow-2xl transition-transform duration-300 ease-out flex flex-col ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-5 border-b border-[#1b365f] flex items-center justify-between">
          <span className="font-serif font-bold text-base text-[#e8cd8f]">
            Panel Admin
          </span>
        </div>
        <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1 no-scrollbar">
          {menuItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleMobileSelect(item.id)}
              className={`w-full min-h-[48px] px-4 flex items-center text-left text-base font-medium rounded-xl transition ${
                currentTab === item.id
                  ? 'text-[#e8cd8f] bg-[#12284a] font-semibold'
                  : 'text-gray-300 hover:text-white hover:bg-[#12284a]/50'
              }`}
            >
              {item.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => {
              setIsMobileOpen(false);
              onLogout();
            }}
            className="w-full min-h-[48px] px-4 flex items-center text-left text-base font-medium rounded-xl text-red-400 hover:bg-[#12284a]/50 transition"
          >
            Keluar
          </button>
        </nav>
      </aside>

      {/* Desktop Sidebar Tetap di Kiri */}
      <aside className="hidden lg:flex w-64 bg-[#0b1c38] text-white flex-col flex-shrink-0 border-r border-[#1b365f] min-h-screen sticky top-0 h-screen">
        <div className="p-6 border-b border-[#1b365f]">
          <BrandLogo
            logoUrl={cms?.identity.logo}
            appName={cms?.identity.appName || 'Guber Smart'}
            size="md"
          />
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-1.5 no-scrollbar">
          {menuItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectTab(item.id)}
              className={`w-full py-2.5 px-4 rounded-xl text-left text-sm font-medium transition ${
                currentTab === item.id
                  ? 'bg-[#12284a] text-[#e8cd8f] font-semibold border-l-2 border-[#c9a35a]'
                  : 'text-gray-300 hover:text-white hover:bg-[#12284a]/50'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-[#1b365f] space-y-2">
          <button
            type="button"
            onClick={onViewWebsite}
            className="w-full py-2.5 px-4 rounded-xl text-left text-sm font-medium text-gray-300 hover:text-white hover:bg-[#12284a]/50 transition flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Lihat Website</span>
          </button>
          <button
            type="button"
            onClick={onLogout}
            className="w-full py-2.5 px-4 rounded-xl text-left text-sm font-medium text-red-400 hover:bg-[#12284a]/50 transition"
          >
            Keluar
          </button>
        </div>
      </aside>

      {/* Main Admin Area */}
      <main className="flex-1 p-4 sm:p-8 lg:p-10 max-w-[1200px] w-full mx-auto">
        {children}
      </main>
    </div>
  );
};
