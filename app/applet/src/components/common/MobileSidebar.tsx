/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.
 */

import React, { useState, useEffect } from 'react';
import { CmsSettings, UserRole } from '../../types';
import { Menu, X, Lock, LayoutDashboard, Search } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface MobileSidebarProps {
  cms: CmsSettings;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  currentUser: UserRole;
  onOpenLoginModal: () => void;
  onOpenDashboard: () => void;
}

export const MobileSidebar: React.FC<MobileSidebarProps> = ({
  cms,
  activeSection,
  onNavigate,
  currentUser,
  onOpenLoginModal,
  onOpenDashboard
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const trimmedQuery = searchQuery.trim().toLowerCase();
  const isSecretMatched = trimmedQuery === 'xxxx' || trimmedQuery === 'login';

  const menuItems = cms.navigation.filter(item => {
    if (!item.show) return false;
    // Don't show login item in standard menu list
    if (item.url === '#masuk' || item.label.toLowerCase() === 'masuk') return false;
    if (searchQuery.trim() && !isSecretMatched) {
      return item.label.toLowerCase().includes(trimmedQuery);
    }
    return true;
  });

  return (
    <>
      {/* Left edge toggle button (120x25px pill with hamburger icon) */}
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Buka Menu"
        className="fixed left-0 top-1/2 -translate-y-1/2 z-30 w-[25px] h-[120px] bg-[#0b1c38]/90 backdrop-blur-sm text-[#e8cd8f] rounded-r-[12px] flex items-center justify-center shadow-lg border-y border-r border-[#c9a35a]/40 hover:w-[30px] transition-all"
      >
        <Menu className="w-4 h-4" />
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-[#07142b]/70 backdrop-blur-sm transition-opacity"
        />
      )}

      {/* Sidebar Panel */}
      <div
        className={`fixed top-0 left-0 bottom-0 z-50 w-[280px] bg-[#07142b] text-white flex flex-col shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-5 border-b border-[#1b365f] flex items-center justify-between">
          <BrandLogo cms={cms} />
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Tutup Menu"
            className="p-2 rounded-full text-[#e8cd8f] hover:bg-[#12284a] transition"
          >
            <X className="w-5 h-5" />
          </button>
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

        <div className="flex-1 overflow-y-auto py-3 px-3 space-y-1">
          {menuItems.map((item, idx) => {
            const isActive = activeSection === item.url.replace('#', '');
            return (
              <button
                key={idx}
                onClick={() => {
                  setIsOpen(false);
                  onNavigate(item.url);
                }}
                className={`w-full text-left px-4 py-3 rounded-[12px] text-base font-medium transition ${
                  isActive
                    ? 'bg-[#12284a] text-[#e8cd8f] font-bold border-l-4 border-[#c9a35a]'
                    : 'text-white/90 hover:bg-[#12284a]'
                }`}
              >
                {item.label}
              </button>
            );
          })}

          {menuItems.length === 0 && !isSecretMatched && (
            <div className="px-4 py-4 text-xs text-gray-400">
              Tidak ada menu ditemukan
            </div>
          )}

          {/* Tombol Masuk: Tersembunyi, hanya muncul bila ketik xxxx atau login */}
          {currentUser === 'publik' ? (
            isSecretMatched && (
              <button
                onClick={() => {
                  setIsOpen(false);
                  setSearchQuery('');
                  onOpenLoginModal();
                }}
                className="w-full text-left px-4 py-3 rounded-[12px] text-base font-semibold flex items-center gap-3 text-[#07142b] bg-gradient-to-r from-[#e8cd8f] via-[#c9a35a] to-[#a77d36] shadow-md transition hover:brightness-105 active:scale-95 mt-2"
              >
                <Lock className="w-5 h-5 text-[#07142b]" />
                <span>Masuk</span>
              </button>
            )
          ) : (
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenDashboard();
              }}
              className="w-full text-left px-4 py-3 rounded-[12px] text-base font-medium flex items-center gap-3 bg-[#12284a] text-[#e8cd8f] font-bold border-l-4 border-[#c9a35a] transition"
            >
              <LayoutDashboard className="w-5 h-5 text-[#c9a35a]" />
              <span>Dasbor</span>
            </button>
          )}
        </div>

        <div className="p-4 border-t border-[#1b365f] text-center text-xs text-white/50">
          {cms.contact.copyright}
        </div>
      </div>
    </>
  );
};
