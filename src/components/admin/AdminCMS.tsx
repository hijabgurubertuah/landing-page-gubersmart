// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { CMSSettings, UserRole } from '../../types';
import { AutoTextarea } from '../common/AutoTextarea';
import { ImageUploader } from '../common/ImageUploader';
import { StorageService } from '../../services/storageService';

interface AdminCMSProps {
  currentRole: UserRole;
  cms: CMSSettings;
  onSaveCMS: (newSettings: CMSSettings) => void;
  showToast: (msg: string) => void;
  onPreview: () => void;
}

export const AdminCMS: React.FC<AdminCMSProps> = ({
  currentRole,
  cms,
  onSaveCMS,
  showToast,
  onPreview,
}) => {
  // Local draft state
  const [draft, setDraft] = useState<CMSSettings>(JSON.parse(JSON.stringify(cms)));
  const [activeTab, setActiveTab] = useState<string>(
    currentRole === 'superadmin' ? 'identitas' : 'bagian'
  );

  const isSuperadmin = currentRole === 'superadmin';
  const hasChanges = JSON.stringify(draft) !== JSON.stringify(cms);

  const allTabs = [
    { id: 'identitas', label: 'Identitas', superOnly: true },
    { id: 'tema', label: 'Tema', superOnly: true },
    { id: 'navigasi', label: 'Navigasi', superOnly: true },
    { id: 'tombol', label: 'Tombol', superOnly: true },
    { id: 'bagian', label: 'Bagian Halaman', superOnly: false },
    { id: 'halaman', label: 'Halaman', superOnly: false },
    { id: 'fitur', label: 'Fitur', superOnly: true },
    { id: 'media', label: 'Media', superOnly: true },
    { id: 'footer', label: 'Footer dan Kontak', superOnly: false },
    { id: 'pratinjau', label: 'Pratinjau', superOnly: false },
  ];

  const allowedTabs = allTabs.filter((t) => (isSuperadmin ? true : !t.superOnly));

  const handleSaveTab = async () => {
    onSaveCMS(draft);
    await StorageService.syncToAppsScript('Pengaturan', draft);
    showToast('Berhasil disimpan');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-serif font-bold text-[#1b2433]">Pengaturan CMS</h2>
      </div>

      {/* Tabs Menu */}
      <div className="flex border-b border-[#e7e1d5] gap-2 overflow-x-auto no-scrollbar pb-1">
        {allowedTabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => {
              if (t.id === 'pratinjau') {
                onPreview();
              } else {
                setActiveTab(t.id);
              }
            }}
            className={`px-4 py-2 text-sm font-medium whitespace-nowrap rounded-t-xl transition ${
              activeTab === t.id
                ? 'bg-white text-[#07142b] border-t-2 border-t-[#c9a35a] shadow-sm font-semibold'
                : 'text-[#4b5565] hover:text-[#07142b]'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab Konten */}
      <div className="bg-white rounded-[18px] p-6 sm:p-8 shadow-sm border border-[#e7e1d5] space-y-6">
        {/* TAB 1: IDENTITAS */}
        {activeTab === 'identitas' && isSuperadmin && (
          <div className="space-y-5">
            <h3 className="font-serif font-bold text-lg text-[#1b2433]">Identitas</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#1b2433] mb-1">
                  Nama Aplikasi
                </label>
                <input
                  type="text"
                  value={draft.identity.appName}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      identity: { ...draft.identity, appName: e.target.value },
                    })
                  }
                  className="w-full rounded-xl border border-[#e7e1d5] px-4 py-2 text-sm text-[#1b2433] focus:border-[#c9a35a] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1b2433] mb-1">
                  Slogan
                </label>
                <input
                  type="text"
                  value={draft.identity.tagline}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      identity: { ...draft.identity, tagline: e.target.value },
                    })
                  }
                  className="w-full rounded-xl border border-[#e7e1d5] px-4 py-2 text-sm text-[#1b2433] focus:border-[#c9a35a] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1b2433] mb-1">
                Judul Halaman (SEO)
              </label>
              <input
                type="text"
                value={draft.identity.pageTitle}
                onChange={(e) =>
                  setDraft({
                    ...draft,
                    identity: { ...draft.identity, pageTitle: e.target.value },
                  })
                }
                className="w-full rounded-xl border border-[#e7e1d5] px-4 py-2 text-sm text-[#1b2433] focus:border-[#c9a35a] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1b2433] mb-1">
                Deskripsi Halaman (SEO)
              </label>
              <AutoTextarea
                value={draft.identity.pageDescription}
                onValueChange={(val) =>
                  setDraft({
                    ...draft,
                    identity: { ...draft.identity, pageDescription: val },
                  })
                }
                rows={2}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ImageUploader
                label="Logo Aplikasi"
                value={draft.identity.logo}
                onChange={(newVal) =>
                  setDraft({
                    ...draft,
                    identity: { ...draft.identity, logo: newVal },
                  })
                }
              />
              <ImageUploader
                label="Gambar Pratinjau Bagikan"
                value={draft.identity.previewImage}
                onChange={(newVal) =>
                  setDraft({
                    ...draft,
                    identity: { ...draft.identity, previewImage: newVal },
                  })
                }
              />
            </div>
          </div>
        )}

        {/* TAB 2: TEMA */}
        {activeTab === 'tema' && isSuperadmin && (
          <div className="space-y-5">
            <h3 className="font-serif font-bold text-lg text-[#1b2433]">Tema</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#1b2433] mb-1">
                  Warna Utama (Navy)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={draft.theme.primaryColor}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        theme: { ...draft.theme, primaryColor: e.target.value },
                      })
                    }
                    className="w-9 h-9 rounded-lg border border-[#e7e1d5] cursor-pointer"
                  />
                  <span className="text-xs font-mono">{draft.theme.primaryColor}</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#1b2433] mb-1">
                  Warna Sekunder
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={draft.theme.secondaryColor}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        theme: { ...draft.theme, secondaryColor: e.target.value },
                      })
                    }
                    className="w-9 h-9 rounded-lg border border-[#e7e1d5] cursor-pointer"
                  />
                  <span className="text-xs font-mono">{draft.theme.secondaryColor}</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#1b2433] mb-1">
                  Warna Aksen (Emas)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={draft.theme.accentColor}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        theme: { ...draft.theme, accentColor: e.target.value },
                      })
                    }
                    className="w-9 h-9 rounded-lg border border-[#e7e1d5] cursor-pointer"
                  />
                  <span className="text-xs font-mono">{draft.theme.accentColor}</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#1b2433] mb-1">
                  Latar Utama
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={draft.theme.bgColor}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        theme: { ...draft.theme, bgColor: e.target.value },
                      })
                    }
                    className="w-9 h-9 rounded-lg border border-[#e7e1d5] cursor-pointer"
                  />
                  <span className="text-xs font-mono">{draft.theme.bgColor}</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#1b2433] mb-1">
                  Warna Teks
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={draft.theme.textColor}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        theme: { ...draft.theme, textColor: e.target.value },
                      })
                    }
                    className="w-9 h-9 rounded-lg border border-[#e7e1d5] cursor-pointer"
                  />
                  <span className="text-xs font-mono">{draft.theme.textColor}</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#1b2433] mb-1">
                  Sudut Membulat
                </label>
                <select
                  value={draft.theme.borderRadius}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      theme: { ...draft.theme, borderRadius: e.target.value },
                    })
                  }
                  className="w-full rounded-xl border border-[#e7e1d5] px-3 py-2 text-xs bg-white"
                >
                  <option value="12px">12px</option>
                  <option value="16px">16px</option>
                  <option value="18px">18px (Bawaan)</option>
                  <option value="22px">22px</option>
                </select>
              </div>
            </div>

            {/* Kotak Pratinjau Tema Langsung */}
            <div className="p-5 rounded-[18px] border border-[#e7e1d5] space-y-3 bg-[#f8f5ef]">
              <span className="text-xs uppercase font-semibold text-[#a77d36]">
                Pratinjau Tema
              </span>
              <div
                className="p-5 rounded-[18px] shadow-sm flex items-center justify-between"
                style={{
                  backgroundColor: draft.theme.primaryColor,
                  color: '#ffffff',
                }}
              >
                <span className="font-serif text-lg font-bold">Guber Smart</span>
                <span
                  className="px-4 py-1.5 rounded-full text-xs font-semibold"
                  style={{
                    backgroundColor: draft.theme.accentColor,
                    color: draft.theme.primaryColor,
                  }}
                >
                  Contoh Tombol
                </span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: NAVIGASI */}
        {activeTab === 'navigasi' && isSuperadmin && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif font-bold text-lg text-[#1b2433]">Navigasi</h3>
              <button
                type="button"
                onClick={() => {
                  const newNav = [
                    ...draft.navigation,
                    {
                      id: 'nav_' + Date.now(),
                      label: 'Menu Baru',
                      target: '#',
                      isVisible: true,
                      order: draft.navigation.length + 1,
                    },
                  ];
                  setDraft({ ...draft, navigation: newNav });
                }}
                className="text-xs text-[#a77d36] font-semibold hover:underline"
              >
                + Tambah Item
              </button>
            </div>

            <div className="space-y-2">
              {draft.navigation.map((nav, idx) => (
                <div
                  key={nav.id}
                  className="flex items-center gap-3 p-3 bg-[#f8f5ef] rounded-xl border border-[#e7e1d5]"
                >
                  <input
                    type="text"
                    value={nav.label}
                    onChange={(e) => {
                      const updated = [...draft.navigation];
                      updated[idx].label = e.target.value;
                      setDraft({ ...draft, navigation: updated });
                    }}
                    className="flex-1 rounded-lg border border-[#e7e1d5] px-3 py-1.5 text-sm bg-white"
                  />
                  <input
                    type="text"
                    value={nav.target}
                    onChange={(e) => {
                      const updated = [...draft.navigation];
                      updated[idx].target = e.target.value;
                      setDraft({ ...draft, navigation: updated });
                    }}
                    className="w-32 rounded-lg border border-[#e7e1d5] px-3 py-1.5 text-sm bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const updated = [...draft.navigation];
                      updated[idx].isVisible = !updated[idx].isVisible;
                      setDraft({ ...draft, navigation: updated });
                    }}
                    className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                      nav.isVisible
                        ? 'text-green-700 bg-green-50'
                        : 'text-gray-500 bg-gray-100'
                    }`}
                  >
                    {nav.isVisible ? 'Tampil' : 'Sembunyi'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const updated = draft.navigation.filter((_, i) => i !== idx);
                      setDraft({ ...draft, navigation: updated });
                    }}
                    className="p-1 text-red-600 hover:bg-red-50 rounded"
                    aria-label="Hapus"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: TOMBOL */}
        {activeTab === 'tombol' && isSuperadmin && (
          <div className="space-y-5">
            <h3 className="font-serif font-bold text-lg text-[#1b2433]">Tombol Aksi</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#1b2433] mb-1">
                  Teks Tombol Hero Utama
                </label>
                <input
                  type="text"
                  value={draft.buttons.heroPrimaryText}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      buttons: { ...draft.buttons, heroPrimaryText: e.target.value },
                    })
                  }
                  className="w-full rounded-xl border border-[#e7e1d5] px-4 py-2 text-sm text-[#1b2433] focus:border-[#c9a35a] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1b2433] mb-1">
                  Tautan Lynk.id Hero Utama
                </label>
                <input
                  type="url"
                  value={draft.buttons.heroPrimaryUrl}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      buttons: { ...draft.buttons, heroPrimaryUrl: e.target.value },
                    })
                  }
                  className="w-full rounded-xl border border-[#e7e1d5] px-4 py-2 text-sm text-[#1b2433] focus:border-[#c9a35a] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1b2433] mb-1">
                  Teks Tombol Hero Kedua
                </label>
                <input
                  type="text"
                  value={draft.buttons.heroSecondaryText}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      buttons: { ...draft.buttons, heroSecondaryText: e.target.value },
                    })
                  }
                  className="w-full rounded-xl border border-[#e7e1d5] px-4 py-2 text-sm text-[#1b2433] focus:border-[#c9a35a] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1b2433] mb-1">
                  Target Tombol Hero Kedua
                </label>
                <input
                  type="text"
                  value={draft.buttons.heroSecondaryUrl}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      buttons: { ...draft.buttons, heroSecondaryUrl: e.target.value },
                    })
                  }
                  className="w-full rounded-xl border border-[#e7e1d5] px-4 py-2 text-sm text-[#1b2433] focus:border-[#c9a35a] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1b2433] mb-1">
                  Teks Tombol Ajakan
                </label>
                <input
                  type="text"
                  value={draft.buttons.ctaPrimaryText}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      buttons: { ...draft.buttons, ctaPrimaryText: e.target.value },
                    })
                  }
                  className="w-full rounded-xl border border-[#e7e1d5] px-4 py-2 text-sm text-[#1b2433] focus:border-[#c9a35a] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1b2433] mb-1">
                  Tautan Lynk.id Ajakan
                </label>
                <input
                  type="url"
                  value={draft.buttons.ctaPrimaryUrl}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      buttons: { ...draft.buttons, ctaPrimaryUrl: e.target.value },
                    })
                  }
                  className="w-full rounded-xl border border-[#e7e1d5] px-4 py-2 text-sm text-[#1b2433] focus:border-[#c9a35a] focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: BAGIAN HALAMAN */}
        {activeTab === 'bagian' && (
          <div className="space-y-6">
            <h3 className="font-serif font-bold text-lg text-[#1b2433]">Bagian Beranda</h3>
            <div className="space-y-4">
              {draft.sections.map((sec, idx) => (
                <div
                  key={sec.id}
                  className="p-5 rounded-[18px] border border-[#e7e1d5] bg-[#f8f5ef]/60 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-serif font-bold text-base text-[#1b2433]">
                      {sec.label} ({sec.id})
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        const updated = [...draft.sections];
                        updated[idx].isVisible = !updated[idx].isVisible;
                        setDraft({ ...draft, sections: updated });
                      }}
                      className={`text-xs px-3 py-1 rounded-full font-medium ${
                        sec.isVisible
                          ? 'text-green-700 bg-green-50'
                          : 'text-gray-500 bg-gray-100'
                      }`}
                    >
                      {sec.isVisible ? 'Tampil' : 'Sembunyi'}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs font-medium text-[#1b2433]">
                          Judul Bagian
                        </label>
                        <button
                          type="button"
                          onClick={() => {
                            const updated = [...draft.sections];
                            updated[idx].title = '';
                            setDraft({ ...draft, sections: updated });
                          }}
                          className="text-[11px] text-[#a77d36] hover:underline"
                        >
                          Kosongkan
                        </button>
                      </div>
                      <input
                        type="text"
                        value={sec.title}
                        onChange={(e) => {
                          const updated = [...draft.sections];
                          updated[idx].title = e.target.value;
                          setDraft({ ...draft, sections: updated });
                        }}
                        className="w-full rounded-xl border border-[#e7e1d5] px-3 py-1.5 text-sm bg-white"
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs font-medium text-[#1b2433]">
                          Subjudul / Teks Pendukung
                        </label>
                        <button
                          type="button"
                          onClick={() => {
                            const updated = [...draft.sections];
                            updated[idx].subtitle = '';
                            setDraft({ ...draft, sections: updated });
                          }}
                          className="text-[11px] text-[#a77d36] hover:underline"
                        >
                          Kosongkan
                        </button>
                      </div>
                      <input
                        type="text"
                        value={sec.subtitle || ''}
                        onChange={(e) => {
                          const updated = [...draft.sections];
                          updated[idx].subtitle = e.target.value;
                          setDraft({ ...draft, sections: updated });
                        }}
                        className="w-full rounded-xl border border-[#e7e1d5] px-3 py-1.5 text-sm bg-white"
                      />
                    </div>
                  </div>

                  {/* Slot Gambar untuk bagian yang mendukung gambar */}
                  {['hero', 'profil', 'keunggulan', 'tips', 'ajakan'].includes(
                    sec.id
                  ) && (
                    <ImageUploader
                      label={`Gambar Bagian ${sec.label}`}
                      value={sec.image || ''}
                      onChange={(newVal) => {
                        const updated = [...draft.sections];
                        updated[idx].image = newVal;
                        setDraft({ ...draft, sections: updated });
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: HALAMAN */}
        {activeTab === 'halaman' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif font-bold text-lg text-[#1b2433]">
                Halaman Statis
              </h3>
              <button
                type="button"
                onClick={() => {
                  const newPage = {
                    id: 'page_' + Date.now(),
                    slug: 'halaman-baru-' + Date.now().toString().slice(-4),
                    title: 'Halaman Baru',
                    content: '<p>Isi halaman di sini.</p>',
                  };
                  setDraft({ ...draft, pages: [...draft.pages, newPage] });
                }}
                className="text-xs text-[#a77d36] font-semibold hover:underline"
              >
                + Tambah Halaman
              </button>
            </div>

            {draft.pages.length === 0 ? (
              <div className="py-8 text-center text-sm text-[#6b7280]">
                Belum ada halaman tambahan
              </div>
            ) : (
              <div className="space-y-3">
                {draft.pages.map((p, idx) => (
                  <div
                    key={p.id}
                    className="p-4 bg-[#f8f5ef] rounded-xl border border-[#e7e1d5] space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <input
                        type="text"
                        value={p.title}
                        onChange={(e) => {
                          const updated = [...draft.pages];
                          updated[idx].title = e.target.value;
                          setDraft({ ...draft, pages: updated });
                        }}
                        className="rounded-lg border border-[#e7e1d5] px-3 py-1.5 text-sm font-semibold bg-white"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const updated = draft.pages.filter((_, i) => i !== idx);
                          setDraft({ ...draft, pages: updated });
                        }}
                        className="text-xs text-red-600 hover:underline"
                      >
                        Hapus
                      </button>
                    </div>
                    <AutoTextarea
                      value={p.content}
                      onValueChange={(val) => {
                        const updated = [...draft.pages];
                        updated[idx].content = val;
                        setDraft({ ...draft, pages: updated });
                      }}
                      rows={2}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 7: FITUR */}
        {activeTab === 'fitur' && isSuperadmin && (
          <div className="space-y-4">
            <h3 className="font-serif font-bold text-lg text-[#1b2433]">Sakelar Fitur</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { key: 'testimonials', label: 'Bagian Testimoni' },
                { key: 'faq', label: 'Bagian FAQ' },
                { key: 'karya', label: 'Bagian Karya Peserta' },
                { key: 'tips', label: 'Bagian Tips dan Panduan' },
                { key: 'waFloating', label: 'Tombol WhatsApp Melayang' },
                { key: 'tanyaDulu', label: 'Tombol Tanya Dulu' },
                { key: 'searchTips', label: 'Pencarian Tips' },
              ].map((feat) => {
                const k = feat.key as keyof typeof draft.features;
                const active = draft.features[k];
                return (
                  <div
                    key={feat.key}
                    className="p-4 rounded-xl border border-[#e7e1d5] bg-[#f8f5ef] flex items-center justify-between"
                  >
                    <span className="text-sm font-medium text-[#1b2433]">
                      {feat.label}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setDraft({
                          ...draft,
                          features: { ...draft.features, [k]: !active },
                        })
                      }
                      className={`text-xs px-3 py-1 rounded-full font-semibold ${
                        active
                          ? 'bg-[#0b1c38] text-white'
                          : 'bg-white border border-[#e7e1d5] text-[#6b7280]'
                      }`}
                    >
                      {active ? 'Aktif' : 'Nonaktif'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 8: MEDIA */}
        {activeTab === 'media' && isSuperadmin && (
          <div className="space-y-4">
            <h3 className="font-serif font-bold text-lg text-[#1b2433]">Media</h3>
            <div>
              <label className="block text-sm font-medium text-[#1b2433] mb-1">
                Tautan Video Pengantar (YouTube)
              </label>
              <input
                type="url"
                value={draft.media.introVideoUrl}
                onChange={(e) =>
                  setDraft({
                    ...draft,
                    media: { ...draft.media, introVideoUrl: e.target.value },
                  })
                }
                placeholder="https://www.youtube.com/watch?v=..."
                className="w-full rounded-xl border border-[#e7e1d5] px-4 py-2 text-sm text-[#1b2433] focus:border-[#c9a35a] focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* TAB 9: FOOTER DAN KONTAK */}
        {activeTab === 'footer' && (
          <div className="space-y-5">
            <h3 className="font-serif font-bold text-lg text-[#1b2433]">
              Footer dan Kontak
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#1b2433] mb-1">
                  Nomor WhatsApp *
                </label>
                <input
                  type="text"
                  required
                  value={draft.footer.waNumber}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      footer: { ...draft.footer, waNumber: e.target.value },
                    })
                  }
                  className="w-full rounded-xl border border-[#e7e1d5] px-4 py-2 text-sm text-[#1b2433] focus:border-[#c9a35a] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1b2433] mb-1">
                  Jam Layanan
                </label>
                <input
                  type="text"
                  value={draft.footer.serviceHours}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      footer: { ...draft.footer, serviceHours: e.target.value },
                    })
                  }
                  className="w-full rounded-xl border border-[#e7e1d5] px-4 py-2 text-sm text-[#1b2433] focus:border-[#c9a35a] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1b2433] mb-1">
                Pesan Awal WhatsApp
              </label>
              <AutoTextarea
                value={draft.footer.waMessage}
                onValueChange={(val) =>
                  setDraft({
                    ...draft,
                    footer: { ...draft.footer, waMessage: val },
                  })
                }
                rows={2}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#1b2433] mb-1">
                  Instagram
                </label>
                <input
                  type="url"
                  value={draft.footer.socialMedia.instagram || ''}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      footer: {
                        ...draft.footer,
                        socialMedia: {
                          ...draft.footer.socialMedia,
                          instagram: e.target.value,
                        },
                      },
                    })
                  }
                  className="w-full rounded-xl border border-[#e7e1d5] px-4 py-2 text-sm text-[#1b2433] focus:border-[#c9a35a] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1b2433] mb-1">
                  TikTok
                </label>
                <input
                  type="url"
                  value={draft.footer.socialMedia.tiktok || ''}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      footer: {
                        ...draft.footer,
                        socialMedia: {
                          ...draft.footer.socialMedia,
                          tiktok: e.target.value,
                        },
                      },
                    })
                  }
                  className="w-full rounded-xl border border-[#e7e1d5] px-4 py-2 text-sm text-[#1b2433] focus:border-[#c9a35a] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1b2433] mb-1">
                  YouTube
                </label>
                <input
                  type="url"
                  value={draft.footer.socialMedia.youtube || ''}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      footer: {
                        ...draft.footer,
                        socialMedia: {
                          ...draft.footer.socialMedia,
                          youtube: e.target.value,
                        },
                      },
                    })
                  }
                  className="w-full rounded-xl border border-[#e7e1d5] px-4 py-2 text-sm text-[#1b2433] focus:border-[#c9a35a] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#1b2433] mb-1">
                  Semboyan (Motto)
                </label>
                <input
                  type="text"
                  value={draft.footer.motto}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      footer: { ...draft.footer, motto: e.target.value },
                    })
                  }
                  className="w-full rounded-xl border border-[#e7e1d5] px-4 py-2 text-sm text-[#1b2433] focus:border-[#c9a35a] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1b2433] mb-1">
                  Hak Cipta
                </label>
                <input
                  type="text"
                  value={draft.footer.copyright}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      footer: { ...draft.footer, copyright: e.target.value },
                    })
                  }
                  className="w-full rounded-xl border border-[#e7e1d5] px-4 py-2 text-sm text-[#1b2433] focus:border-[#c9a35a] focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* TEPAT SATU TOMBOL SIMPAN DI KANAN BAWAH TAB */}
        <div className="flex items-center justify-end pt-4 border-t border-[#e7e1d5]">
          <button
            type="button"
            disabled={!hasChanges}
            onClick={handleSaveTab}
            className={`px-7 py-3 rounded-full text-sm font-semibold transition shadow-sm ${
              hasChanges
                ? 'gold-gradient-bg text-[#07142b] hover:brightness-105 active:scale-95'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
};
