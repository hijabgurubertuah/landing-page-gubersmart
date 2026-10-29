/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.
 */

import React, { useState, useEffect } from 'react';
import { CmsSettings, UserRole } from '../../types';
import { Menu, X, Lock, LayoutDashboard } from 'lucide-react';
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

  const menuItems = cms.navigation.filter(item => item.show);

  return (
    <>
      {/* Left edge toggle button (120x25px pill with hamburger icon) */}
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Buka Menu"
        className="lg:hidden fixed left-0 top-1/2 -translate-y-1/2 z-30 w-[25px] h-[120px] bg-[#0b1c38]/90 backdrop-blur-sm text-[#e8cd8f] rounded-r-[12px] flex items-center justify-center shadow-lg border-y border-r border-[#c9a35a]/40 hover:w-[30px] transition-all"
      >
        <Menu className="w-4 h-4" />
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="lg:hidden fixed inset-0 z-40 bg-[#07142b]/70 backdrop-blur-sm transition-opacity"
        />
      )}

      {/* Sidebar Panel */}
      <div
        className={`lg:hidden fixed top-0 left-0 bottom-0 z-50 w-[280px] bg-[#07142b] text-white flex flex-col shadow-2xl transition-transform duration-300 ease-in-out ${
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

        <div className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
          {menuItems.map((item, idx) => {
            const isLoginItem = item.url === '#masuk' || item.label.toLowerCase() === 'masuk';

            if (isLoginItem) {
              return (
                <button
                  key={idx}
                  onClick={() => {
                    setIsOpen(false);
                    if (currentUser !== 'publik') {
                      onOpenDashboard();
                    } else {
                      onOpenLoginModal();
                    }
                  }}
                  className={`w-full text-left px-5 py-3.5 rounded-[12px] text-base font-medium flex items-center gap-3 transition ${
                    currentUser !== 'publik'
                      ? 'bg-[#12284a] text-[#e8cd8f] font-bold border-l-4 border-[#c9a35a]'
                      : 'text-white hover:bg-[#12284a]'
                  }`}
                >
                  {currentUser !== 'publik' ? (
                    <>
                      <LayoutDashboard className="w-5 h-5 text-[#c9a35a]" />
                      <span>Dasbor</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-5 h-5 text-[#c9a35a]" />
                      <span>Masuk</span>
                    </>
                  )}
                </button>
              );
            }

            const isActive = activeSection === item.url.replace('#', '');
            return (
              <button
                key={idx}
                onClick={() => {
                  setIsOpen(false);
                  onNavigate(item.url);
                }}
                className={`w-full text-left px-5 py-3.5 rounded-[12px] text-base font-medium transition ${
                  isActive
                    ? 'bg-[#12284a] text-[#e8cd8f] font-bold border-l-4 border-[#c9a35a]'
                    : 'text-white/90 hover:bg-[#12284a]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        <div className="p-4 border-t border-[#1b365f] text-center text-xs text-white/50">
          {cms.contact.copyright}
        </div>
      </div>
    </>
  );
};
