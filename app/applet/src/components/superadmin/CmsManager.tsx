/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.
 */

import React, { useState } from 'react';
import { CmsSettings, UserRole } from '../../types';
import { ImageSlot } from '../common/ImageSlot';
import { 
  Settings, Palette, Menu, Square, Layout, FileText, ToggleLeft, 
  Video, PhoneCall, Eye, Check 
} from 'lucide-react';

interface CmsManagerProps {
  cms: CmsSettings;
  onSaveCms: (newCms: CmsSettings) => void;
  currentUser: UserRole;
  onShowToast: (msg: string) => void;
}

export const CmsManager: React.FC<CmsManagerProps> = ({
  cms,
  onSaveCms,
  currentUser,
  onShowToast
}) => {
  const [activeTab, setActiveTab] = useState<'identitas' | 'tema' | 'navigasi' | 'tombol' | 'bagian' | 'halaman' | 'fitur' | 'media' | 'kontak' | 'pratinjau'>('identitas');
  const [formData, setFormData] = useState<CmsSettings>(JSON.parse(JSON.stringify(cms)));

  const handleSaveTab = () => {
    onSaveCms(formData);
    onShowToast('Berhasil disimpan');
  };

  const tabs = [
    { id: 'identitas', label: 'Identitas', icon: Settings },
    { id: 'tema', label: 'Tema', icon: Palette },
    { id: 'navigasi', label: 'Navigasi', icon: Menu },
    { id: 'tombol', label: 'Tombol', icon: Square },
    { id: 'bagian', label: 'Bagian Halaman', icon: Layout },
    { id: 'halaman', label: 'Halaman', icon: FileText },
    { id: 'fitur', label: 'Fitur', icon: ToggleLeft },
    { id: 'media', label: 'Media', icon: Video },
    { id: 'kontak', label: 'Footer & Kontak', icon: PhoneCall },
    { id: 'pratinjau', label: 'Pratinjau', icon: Eye },
  ];

  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a77d36]">Superadmin</span>
        <h1 className="text-3xl font-serif font-bold text-[#1b2433]">CMS Pengaturan</h1>
      </div>

      {/* Tabs bar */}
      <div className="flex flex-wrap gap-2 border-b border-[#e7e1d5] pb-4">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 transition ${
                isActive
                  ? 'bg-[#07142b] text-[#e8cd8f]'
                  : 'bg-white border border-[#e7e1d5] text-[#4b5565] hover:bg-[#f1ece2]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Contents with explicit Save Button per tab */}
      <div className="bg-white rounded-[18px] p-6 md:p-8 shadow-md border border-[#e7e1d5] space-y-6">
        {activeTab === 'identitas' && (
          <div className="space-y-6">
            <h3 className="font-serif font-bold text-xl text-[#1b2433]">Identitas Website</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#4b5565] mb-1">Nama Aplikasi</label>
                <input
                  type="text"
                  value={formData.identity.appName}
                  onChange={(e) => setFormData({ ...formData, identity: { ...formData.identity, appName: e.target.value } })}
                  className="w-full px-3 py-2.5 rounded-[12px] border border-[#e7e1d5] text-sm focus:outline-none focus:border-[#c9a35a]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#4b5565] mb-1">Slogan</label>
                <input
                  type="text"
                  value={formData.identity.slogan}
                  onChange={(e) => setFormData({ ...formData, identity: { ...formData.identity, slogan: e.target.value } })}
                  className="w-full px-3 py-2.5 rounded-[12px] border border-[#e7e1d5] text-sm focus:outline-none focus:border-[#c9a35a]"
                />
              </div>

              <ImageSlot
                label="Logo"
                value={formData.identity.logo}
                onChange={(img) => setFormData({ ...formData, identity: { ...formData.identity, logo: img } })}
              />

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#4b5565] mb-1">Judul SEO</label>
                <input
                  type="text"
                  value={formData.identity.seoTitle}
                  onChange={(e) => setFormData({ ...formData, identity: { ...formData.identity, seoTitle: e.target.value } })}
                  className="w-full px-3 py-2.5 rounded-[12px] border border-[#e7e1d5] text-sm focus:outline-none focus:border-[#c9a35a]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#4b5565] mb-1">Deskripsi SEO</label>
                <textarea
                  value={formData.identity.seoDesc}
                  onChange={(e) => setFormData({ ...formData, identity: { ...formData.identity, seoDesc: e.target.value } })}
                  rows={3}
                  className="w-full px-3 py-2.5 rounded-[12px] border border-[#e7e1d5] text-sm focus:outline-none focus:border-[#c9a35a]"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tema' && (
          <div className="space-y-6">
            <h3 className="font-serif font-bold text-xl text-[#1b2433]">Tema & Warna</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#4b5565] mb-1">Warna Utama (Primary)</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={formData.theme.primary}
                    onChange={(e) => setFormData({ ...formData, theme: { ...formData.theme, primary: e.target.value } })}
                    className="w-12 h-10 rounded-[8px] border border-[#e7e1d5] cursor-pointer"
                  />
                  <input
                    type="text"
                    value={formData.theme.primary}
                    onChange={(e) => setFormData({ ...formData, theme: { ...formData.theme, primary: e.target.value } })}
                    className="flex-1 px-3 py-2 rounded-[12px] border border-[#e7e1d5] text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#4b5565] mb-1">Warna Aksen (Accent)</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={formData.theme.accent}
                    onChange={(e) => setFormData({ ...formData, theme: { ...formData.theme, accent: e.target.value } })}
                    className="w-12 h-10 rounded-[8px] border border-[#e7e1d5] cursor-pointer"
                  />
                  <input
                    type="text"
                    value={formData.theme.accent}
                    onChange={(e) => setFormData({ ...formData, theme: { ...formData.theme, accent: e.target.value } })}
                    className="flex-1 px-3 py-2 rounded-[12px] border border-[#e7e1d5] text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'navigasi' && (
          <div className="space-y-6">
            <h3 className="font-serif font-bold text-xl text-[#1b2433]">Pengaturan Navigasi</h3>
            <div className="space-y-3">
              {formData.navigation.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 p-3 rounded-[12px] bg-[#f8f5ef] border border-[#e7e1d5]">
                  <input
                    type="text"
                    value={item.label}
                    onChange={(e) => {
                      const updated = [...formData.navigation];
                      updated[idx].label = e.target.value;
                      setFormData({ ...formData, navigation: updated });
                    }}
                    className="flex-1 px-3 py-2 rounded-[10px] border border-[#e7e1d5] text-sm bg-white"
                  />
                  <input
                    type="text"
                    value={item.url}
                    onChange={(e) => {
                      const updated = [...formData.navigation];
                      updated[idx].url = e.target.value;
                      setFormData({ ...formData, navigation: updated });
                    }}
                    className="w-40 px-3 py-2 rounded-[10px] border border-[#e7e1d5] text-sm bg-white"
                  />
                  <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
                    <input
                      type="checkbox"
                      checked={item.show}
                      onChange={(e) => {
                        const updated = [...formData.navigation];
                        updated[idx].show = e.target.checked;
                        setFormData({ ...formData, navigation: updated });
                      }}
                      className="w-4 h-4 rounded text-[#c9a35a]"
                    />
                    <span>Tampil</span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'tombol' && (
          <div className="space-y-6">
            <h3 className="font-serif font-bold text-xl text-[#1b2433]">Pengaturan Tombol</h3>
            <div className="space-y-3">
              {formData.buttons.map((btn, idx) => (
                <div key={idx} className="flex items-center gap-4 p-3 rounded-[12px] bg-[#f8f5ef] border border-[#e7e1d5]">
                  <input
                    type="text"
                    value={btn.label}
                    onChange={(e) => {
                      const updated = [...formData.buttons];
                      updated[idx].label = e.target.value;
                      setFormData({ ...formData, buttons: updated });
                    }}
                    className="flex-1 px-3 py-2 rounded-[10px] border border-[#e7e1d5] text-sm bg-white"
                  />
                  <input
                    type="text"
                    value={btn.url}
                    onChange={(e) => {
                      const updated = [...formData.buttons];
                      updated[idx].url = e.target.value;
                      setFormData({ ...formData, buttons: updated });
                    }}
                    className="flex-1 px-3 py-2 rounded-[10px] border border-[#e7e1d5] text-sm bg-white"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'bagian' && (
          <div className="space-y-6">
            <h3 className="font-serif font-bold text-xl text-[#1b2433]">Bagian Halaman Beranda</h3>
            <div className="space-y-4">
              {formData.sections.map((sec, idx) => (
                <div key={sec.id} className="p-4 rounded-[12px] bg-[#f8f5ef] border border-[#e7e1d5] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-serif font-bold text-base text-[#1b2433]">{sec.label || sec.id}</span>
                    <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
                      <input
                        type="checkbox"
                        checked={sec.show}
                        onChange={(e) => {
                          const updated = [...formData.sections];
                          updated[idx].show = e.target.checked;
                          setFormData({ ...formData, sections: updated });
                        }}
                        className="w-4 h-4 rounded text-[#c9a35a]"
                      />
                      <span>Tampil</span>
                    </label>
                  </div>
                  <input
                    type="text"
                    value={sec.title}
                    onChange={(e) => {
                      const updated = [...formData.sections];
                      updated[idx].title = e.target.value;
                      setFormData({ ...formData, sections: updated });
                    }}
                    className="w-full px-3 py-2 rounded-[10px] border border-[#e7e1d5] text-sm bg-white"
                    placeholder="Judul Bagian"
                  />
                  <ImageSlot
                    label="Gambar Bagian"
                    value={sec.image}
                    onChange={(img) => {
                      const updated = [...formData.sections];
                      updated[idx].image = img;
                      setFormData({ ...formData, sections: updated });
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'halaman' && (
          <div className="space-y-6">
            <h3 className="font-serif font-bold text-xl text-[#1b2433]">Halaman Statis</h3>
            <div className="space-y-4">
              {formData.pages.map((p, idx) => (
                <div key={p.id} className="p-4 rounded-[12px] bg-[#f8f5ef] border border-[#e7e1d5] space-y-3">
                  <input
                    type="text"
                    value={p.title}
                    onChange={(e) => {
                      const updated = [...formData.pages];
                      updated[idx].title = e.target.value;
                      setFormData({ ...formData, pages: updated });
                    }}
                    className="w-full px-3 py-2 rounded-[10px] border border-[#e7e1d5] text-sm bg-white font-bold"
                  />
                  <textarea
                    value={p.content}
                    onChange={(e) => {
                      const updated = [...formData.pages];
                      updated[idx].content = e.target.value;
                      setFormData({ ...formData, pages: updated });
                    }}
                    rows={3}
                    className="w-full px-3 py-2 rounded-[10px] border border-[#e7e1d5] text-sm bg-white"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'fitur' && (
          <div className="space-y-6">
            <h3 className="font-serif font-bold text-xl text-[#1b2433]">Pengaturan Fitur</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(formData.features).map(([key, val]) => (
                <label key={key} className="flex items-center justify-between p-4 rounded-[12px] bg-[#f8f5ef] border border-[#e7e1d5] cursor-pointer">
                  <span className="font-serif font-semibold text-sm capitalize text-[#1b2433]">{key}</span>
                  <input
                    type="checkbox"
                    checked={val}
                    onChange={(e) => setFormData({
                      ...formData,
                      features: { ...formData.features, [key]: e.target.checked }
                    })}
                    className="w-5 h-5 rounded text-[#c9a35a]"
                  />
                </label>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'media' && (
          <div className="space-y-6">
            <h3 className="font-serif font-bold text-xl text-[#1b2433]">Media & Video</h3>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#4b5565] mb-1">Tautan Video YouTube</label>
              <input
                type="text"
                value={formData.media.introVideoUrl}
                onChange={(e) => setFormData({ ...formData, media: { ...formData.media, introVideoUrl: e.target.value } })}
                placeholder="https://youtube.com/..."
                className="w-full px-3 py-2.5 rounded-[12px] border border-[#e7e1d5] text-sm focus:outline-none focus:border-[#c9a35a]"
              />
            </div>
          </div>
        )}

        {activeTab === 'kontak' && (
          <div className="space-y-6">
            <h3 className="font-serif font-bold text-xl text-[#1b2433]">Footer & Kontak</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#4b5565] mb-1">Nomor WhatsApp</label>
                <input
                  type="text"
                  value={formData.contact.whatsapp}
                  onChange={(e) => setFormData({ ...formData, contact: { ...formData.contact, whatsapp: e.target.value } })}
                  className="w-full px-3 py-2.5 rounded-[12px] border border-[#e7e1d5] text-sm focus:outline-none focus:border-[#c9a35a]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#4b5565] mb-1">Pesan Awal WhatsApp</label>
                <input
                  type="text"
                  value={formData.contact.waMessage}
                  onChange={(e) => setFormData({ ...formData, contact: { ...formData.contact, waMessage: e.target.value } })}
                  className="w-full px-3 py-2.5 rounded-[12px] border border-[#e7e1d5] text-sm focus:outline-none focus:border-[#c9a35a]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#4b5565] mb-1">Jam Layanan</label>
                <input
                  type="text"
                  value={formData.contact.serviceHours}
                  onChange={(e) => setFormData({ ...formData, contact: { ...formData.contact, serviceHours: e.target.value } })}
                  className="w-full px-3 py-2.5 rounded-[12px] border border-[#e7e1d5] text-sm focus:outline-none focus:border-[#c9a35a]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#4b5565] mb-1">Tautan Instagram</label>
                <input
                  type="text"
                  value={formData.contact.social.instagram}
                  onChange={(e) => setFormData({ ...formData, contact: { ...formData.contact, social: { ...formData.contact.social, instagram: e.target.value } } })}
                  className="w-full px-3 py-2.5 rounded-[12px] border border-[#e7e1d5] text-sm focus:outline-none focus:border-[#c9a35a]"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'pratinjau' && (
          <div className="space-y-6 text-center py-10">
            <h3 className="font-serif font-bold text-2xl text-[#1b2433]">Pratinjau Pengaturan</h3>
            <p className="text-sm text-[#4b5565]">Semua perubahan siap diterapkan pada situs.</p>
          </div>
        )}

        {/* Explicit Save Button per tab */}
        <div className="pt-6 border-t border-[#e7e1d5] flex justify-end">
          <button
            onClick={handleSaveTab}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-[#e8cd8f] via-[#c9a35a] to-[#a77d36] text-[#07142b] font-bold text-sm shadow-md transition hover:opacity-95 flex items-center gap-2"
          >
            <Check className="w-4 h-4" />
            <span>Simpan</span>
          </button>
        </div>
      </div>
    </div>
  );
};
