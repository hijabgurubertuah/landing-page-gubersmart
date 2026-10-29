/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.
 */

import React, { useState, useEffect } from 'react';
import { CmsSettings, UserRole } from '../../types';
import { BrandLogo } from './BrandLogo';
import { Lock, Eye, EyeOff, LayoutDashboard } from 'lucide-react';

interface HeaderProps {
  cms: CmsSettings;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  currentUser: UserRole;
  onLogin: (pass: string) => boolean;
  onOpenDashboard: () => void;
  onOpenSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cms,
  activeSection,
  onNavigate,
  currentUser,
  onLogin,
  onOpenDashboard,
  onOpenSidebar
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loginError, setLoginError] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = onLogin(passwordInput);
    if (success) {
      setShowLoginModal(false);
      setPasswordInput('');
      setLoginError(false);
      onOpenDashboard();
    } else {
      setLoginError(true);
    }
  };

  const menuItems = cms.navigation.filter(item => item.show);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[#0b1c38]/96 backdrop-blur-md shadow-lg py-3.5 border-b border-[#c9a35a]/20'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 flex items-center justify-between">
          <div onClick={() => onNavigate('beranda')} className="cursor-pointer">
            <BrandLogo cms={cms} />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {menuItems.map((item, idx) => {
              const isLoginItem = item.url === '#masuk' || item.label.toLowerCase() === 'masuk';
              const isDashboardItem = currentUser !== 'publik' && isLoginItem;

              if (isLoginItem) {
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      if (currentUser !== 'publik') {
                        onOpenDashboard();
                      } else {
                        setShowLoginModal(true);
                      }
                    }}
                    className={`text-sm font-medium tracking-wide transition pb-1 border-b-2 flex items-center gap-1.5 ${
                      currentUser !== 'publik'
                        ? 'text-[#e8cd8f] border-[#c9a35a]'
                        : 'text-white/90 border-transparent hover:text-[#e8cd8f]'
                    }`}
                  >
                    {currentUser !== 'publik' ? (
                      <>
                        <LayoutDashboard className="w-4 h-4" />
                        <span>Dasbor</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-3.5 h-3.5 text-[#c9a35a]" />
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
                  onClick={() => onNavigate(item.url)}
                  className={`text-sm font-medium tracking-wide transition pb-1 border-b-2 ${
                    isActive
                      ? 'text-[#e8cd8f] border-[#c9a35a]'
                      : 'text-white/90 border-transparent hover:text-[#e8cd8f]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Mobile Header: ONLY logo/name, no hamburger button in header as per prompt */}
          <div className="lg:hidden flex items-center">
            {currentUser !== 'publik' ? (
              <button
                onClick={onOpenDashboard}
                className="px-3 py-1.5 rounded-full bg-[#c9a35a] text-[#07142b] text-xs font-semibold flex items-center gap-1 shadow-md"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Dasbor</span>
              </button>
            ) : (
              <button
                onClick={() => setShowLoginModal(true)}
                className="px-3 py-1.5 rounded-full border border-[#c9a35a] text-[#e8cd8f] text-xs font-semibold flex items-center gap-1"
              >
                <Lock className="w-3 h-3 text-[#c9a35a]" />
                <span>Masuk</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 bg-[#07142b]/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[18px] max-w-sm w-full p-6 shadow-2xl border border-[#e7e1d5]">
            <h3 className="text-xl font-serif font-bold text-[#1b2433] mb-4 text-center">Masuk</h3>
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div className="relative">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#4b5565] mb-1">Kata Sandi</label>
                <div className="relative">
                  <input
                    type={showPass ? 'text' : 'password'}
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="Masukkan kata sandi..."
                    className="w-full pl-3 pr-10 py-2.5 rounded-[12px] border border-[#e7e1d5] text-sm focus:outline-none focus:border-[#c9a35a]"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-3 text-[#6b7280]"
                  >
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {loginError && (
                <p className="text-xs text-red-600 text-center font-medium">Kata sandi salah</p>
              )}

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowLoginModal(false)}
                  className="flex-1 py-2.5 rounded-full border border-[#e7e1d5] text-[#4b5565] font-medium text-sm hover:bg-[#f8f5ef] transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-full bg-gradient-to-r from-[#e8cd8f] via-[#c9a35a] to-[#a77d36] text-[#07142b] font-bold text-sm shadow-md transition hover:opacity-95"
                >
                  Masuk
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
