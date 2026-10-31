/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.
 */

import React, { useState } from 'react';
import { CmsSettings, UserRole, AdminUser } from '../../types';
import { BrandLogo } from '../common/BrandLogo';
import { 
  LayoutDashboard, BookOpen, MessageSquare, Image, FileText, HelpCircle, 
  Key, Settings, RefreshCw, Database, Activity, Users, LogOut, Menu, X, ArrowLeft,
  ChevronDown, ChevronRight 
} from 'lucide-react';

interface AdminLayoutProps {
  cms: CmsSettings;
  currentUser: UserRole;
  currentAdmin: AdminUser | null;
  activeTab: string;
  activeCmsSubTab?: string;
  onSelectTab: (tab: string, subTab?: string) => void;
  onSelectCmsSubTab?: (subTab: string) => void;
  onLogout: () => void;
  onBackToPublic: () => void;
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  cms,
  currentUser,
  currentAdmin,
  activeTab,
  activeCmsSubTab = 'identitas',
  onSelectTab,
  onSelectCmsSubTab,
  onLogout,
  onBackToPublic,
  children
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isCmsExpanded, setIsCmsExpanded] = useState(true);

  const cmsSubCategories = [
    { id: 'identitas', label: 'Identitas' },
    { id: 'tema', label: 'Tema' },
    { id: 'navigasi', label: 'Navigasi' },
    { id: 'tombol', label: 'Tombol' },
    { id: 'bagian', label: 'Bagian Halaman' },
    { id: 'halaman', label: 'Halaman' },
    { id: 'fitur', label: 'Fitur' },
    { id: 'media', label: 'Media' },
    { id: 'kontak', label: 'Footer & Kontak' },
    { id: 'pratinjau', label: 'Pratinjau' },
  ];

  const adminNavItems = [
    { id: 'dasbor', label: 'Dasbor', icon: LayoutDashboard },
    { id: 'kelas', label: 'Kelas', icon: BookOpen },
    { id: 'testimoni', label: 'Testimoni', icon: MessageSquare },
    { id: 'karya', label: 'Karya', icon: Image },
    { id: 'faq', label: 'FAQ', icon: HelpCircle },
    { id: 'sandi', label: 'Kata Sandi', icon: Key },
  ];

  const superadminNavItems = currentUser === 'superadmin' ? [
    { id: 'cms', label: 'CMS', icon: Settings },
    { id: 'sinkronisasi', label: 'Sinkronisasi', icon: RefreshCw },
    { id: 'firebase', label: 'Firebase', icon: Database },
    { id: 'kelola-admin', label: 'Kelola Admin', icon: Users },
  ] : [];

  const allNav = [...adminNavItems, ...superadminNavItems];

  return (
    <div className="min-h-screen bg-[#f8f5ef] flex flex-col md:flex-row">
      {/* Mobile Top Bar */}
      <div className="md:hidden bg-[#07142b] text-white p-4 flex items-center justify-between border-b border-[#c9a35a]/20">
        <BrandLogo cms={cms} />
        <div className="flex items-center gap-2">
          <button
            onClick={onBackToPublic}
            className="px-3 py-1.5 rounded-full border border-[#c9a35a] text-[#e8cd8f] text-xs font-semibold"
          >
            Situs
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-lg text-[#e8cd8f] hover:bg-[#12284a]"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Sidebar for Desktop & Mobile Drawer */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-50 w-64 bg-[#07142b] text-white flex flex-col shadow-2xl transition-transform duration-300
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-6 border-b border-[#1b365f] hidden md:block">
          <BrandLogo cms={cms} />
        </div>

        <div className="p-4 border-b border-[#1b365f] flex items-center justify-between">
          <div>
            <p className="text-xs text-[#e8cd8f] font-serif uppercase tracking-wider">{currentAdmin?.role || currentUser}</p>
            <p className="text-sm font-bold text-white truncate">{currentAdmin?.name || 'Administrator'}</p>
          </div>
          <button
            onClick={onBackToPublic}
            className="hidden md:flex items-center gap-1 text-xs text-white/70 hover:text-[#e8cd8f] transition"
            title="Kembali ke Beranda"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Situs</span>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {allNav.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            if (item.id === 'cms') {
              return (
                <div key={item.id} className="space-y-1">
                  <div
                    className={`w-full flex items-center justify-between rounded-[12px] transition ${
                      isActive
                        ? 'bg-[#12284a] text-[#e8cd8f] border-l-4 border-[#c9a35a] font-bold'
                        : 'text-white/80 hover:bg-[#12284a] hover:text-white'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        onSelectTab('cms', activeCmsSubTab || 'identitas');
                        setIsCmsExpanded(true);
                        setMobileOpen(false);
                      }}
                      className="flex-1 flex items-center gap-3 px-4 py-3 text-left text-sm font-medium"
                    >
                      <Icon className={`w-4 h-4 ${isActive ? 'text-[#c9a35a]' : 'text-white/60'}`} />
                      <span>{item.label}</span>
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsCmsExpanded(!isCmsExpanded);
                      }}
                      className="p-2 mr-2 text-white/60 hover:text-[#e8cd8f] transition rounded-lg"
                      aria-label="Expand CMS Subkategori"
                    >
                      {isCmsExpanded ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  {/* Expandable Sub-Categories */}
                  {isCmsExpanded && (
                    <div className="ml-5 pl-3 border-l border-[#1b365f] py-1 space-y-1">
                      {cmsSubCategories.map((sub) => {
                        const isSubActive = isActive && activeCmsSubTab === sub.id;
                        return (
                          <button
                            key={sub.id}
                            type="button"
                            onClick={() => {
                              if (sub.id === 'pratinjau') {
                                setMobileOpen(false);
                                onBackToPublic();
                                return;
                              }
                              if (onSelectCmsSubTab) {
                                onSelectCmsSubTab(sub.id);
                              } else {
                                onSelectTab('cms', sub.id);
                              }
                              setMobileOpen(false);
                            }}
                            className={`w-full py-2 px-3 rounded-lg text-left text-xs font-medium transition flex items-center justify-between ${
                              isSubActive
                                ? 'bg-[#18345e] text-[#e8cd8f] font-semibold border-l-2 border-[#c9a35a]'
                                : 'text-white/70 hover:text-white hover:bg-[#12284a]/60'
                            }`}
                          >
                            <span>{sub.label}</span>
                            {isSubActive && (
                              <span className="w-1.5 h-1.5 rounded-full bg-[#c9a35a]" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.id);
                  setMobileOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-[12px] text-sm font-medium transition ${
                  isActive
                    ? 'bg-[#12284a] text-[#e8cd8f] border-l-4 border-[#c9a35a] font-bold'
                    : 'text-white/80 hover:bg-[#12284a] hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#c9a35a]' : 'text-white/60'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-[#1b365f]">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-[12px] text-sm font-medium text-red-400 hover:bg-red-500/10 transition"
          >
            <LogOut className="w-4 h-4" />
            <span>Keluar</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto min-h-screen p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};
