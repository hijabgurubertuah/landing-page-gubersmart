// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

import React, { useState } from 'react';
import { Plus, Trash2, Edit3, Loader2 } from 'lucide-react';
import { KaryaItem } from '../../types';
import { ImageUploader } from '../common/ImageUploader';
import { ConfirmDialog } from '../common/ConfirmDialog';

import { StorageService } from '../../services/storageService';

interface AdminPortfolioProps {
  karyaList: KaryaItem[];
  onSaveKarya: (items: KaryaItem[]) => void;
  showToast: (msg: string) => void;
}

export const AdminPortfolio: React.FC<AdminPortfolioProps> = ({
  karyaList,
  onSaveKarya,
  showToast,
}) => {
  const [items, setItems] = useState<KaryaItem[]>(karyaList);
  const [editingItem, setEditingItem] = useState<KaryaItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleStartCreate = () => {
    setEditingItem({
      id: 'karya_' + Date.now(),
      title: '',
      image: '',
      url: 'https://lynk.id',
      category: 'Bisnis',
      order: items.length + 1,
    });
    setIsCreating(true);
  };

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem || !editingItem.title.trim()) return;

    let updated: KaryaItem[];
    if (isCreating) {
      updated = [...items, editingItem];
    } else {
      updated = items.map((k) => (k.id === editingItem.id ? editingItem : k));
    }
    setItems(updated);
    setEditingItem(null);
    setIsCreating(false);
    setHasChanges(true);
  };

  const handleDelete = () => {
    if (!deleteId) return;
    const updated = items.filter((k) => k.id !== deleteId);
    setItems(updated);
    setDeleteId(null);
    setHasChanges(true);
  };

  const handleSaveAllToSheet = async () => {
    if (isSaving) return;
    setIsSaving(true);
    try {
      onSaveKarya(items);
      await StorageService.syncToAppsScript('Karya', items);
      setHasChanges(false);
      showToast('Berhasil disimpan');
    } catch {
      showToast('Gagal menyimpan karya');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-serif font-bold text-[#1b2433]">Karya Peserta</h2>
        <button
          type="button"
          onClick={handleStartCreate}
          className="px-5 py-2.5 rounded-full gold-gradient-bg text-[#07142b] text-sm font-semibold hover:brightness-105 transition flex items-center gap-2 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Karya</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((k) => (
          <div
            key={k.id}
            className="bg-white rounded-[18px] p-5 shadow-sm border border-[#e7e1d5] flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="w-full aspect-[1.45/1] rounded-xl overflow-hidden bg-[#07142b] border border-[#e7e1d5]">
                {k.image ? (
                  <img src={k.image} alt="" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#07142b] to-[#1b365f]" />
                )}
              </div>
              <div className="text-xs uppercase font-semibold text-[#a77d36]">
                {k.category}
              </div>
              <h3 className="font-serif font-bold text-base text-[#1b2433] leading-snug line-clamp-2">
                {k.title}
              </h3>
            </div>

            <div className="pt-3 border-t border-[#f8f5ef] flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  setEditingItem(k);
                  setIsCreating(false);
                }}
                className="p-2 text-[#07142b] hover:bg-[#f8f5ef] rounded-full transition"
                aria-label="Edit"
              >
                <Edit3 className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setDeleteId(k.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-full transition"
                aria-label="Hapus"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* TEPAT SATU TOMBOL SIMPAN PENGATURAN KE SPREADSHEET */}
      <div className="flex items-center justify-end pt-6 border-t border-[#e7e1d5]">
        <button
          type="button"
          disabled={!hasChanges || isSaving}
          onClick={handleSaveAllToSheet}
          className={`px-7 py-3 rounded-full text-sm font-semibold transition shadow-sm inline-flex items-center gap-2 ${
            hasChanges && !isSaving
              ? 'gold-gradient-bg text-[#07142b] hover:brightness-105 active:scale-95'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed pointer-events-none'
          }`}
        >
          {isSaving && <Loader2 className="w-4 h-4 animate-spin text-[#07142b]" />}
          <span>{isSaving ? 'Menyimpan...' : 'Simpan'}</span>
        </button>
      </div>

      {editingItem && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-[#07142b]/60 backdrop-blur-sm"
          onClick={() => setEditingItem(null)}
        >
          <div
            className="w-full max-w-lg bg-white rounded-[18px] p-6 sm:p-8 shadow-2xl border border-[#e7e1d5]"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-serif font-bold text-[#1b2433] mb-6">
              {isCreating ? 'Tambah Karya' : 'Ubah Karya'}
            </h3>

            <form onSubmit={handleApply} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#1b2433] mb-1">
                  Judul Aplikasi *
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.title}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, title: e.target.value })
                  }
                  className="w-full rounded-xl border border-[#e7e1d5] px-4 py-2.5 text-sm text-[#1b2433] focus:border-[#c9a35a] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1b2433] mb-1">
                  Kategori
                </label>
                <input
                  type="text"
                  value={editingItem.category}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, category: e.target.value })
                  }
                  className="w-full rounded-xl border border-[#e7e1d5] px-4 py-2.5 text-sm text-[#1b2433] focus:border-[#c9a35a] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1b2433] mb-1">
                  Tautan Aplikasi
                </label>
                <input
                  type="url"
                  value={editingItem.url || ''}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, url: e.target.value })
                  }
                  className="w-full rounded-xl border border-[#e7e1d5] px-4 py-2.5 text-sm text-[#1b2433] focus:border-[#c9a35a] focus:outline-none"
                />
              </div>

              <ImageUploader
                label="Gambar Karya"
                value={editingItem.image}
                onChange={(newVal) =>
                  setEditingItem({ ...editingItem, image: newVal })
                }
              />

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#e7e1d5]">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-5 py-2.5 rounded-full border border-[#e7e1d5] text-[#4b5565] text-sm font-medium hover:bg-[#f8f5ef] transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full gold-gradient-bg text-[#07142b] text-sm font-semibold hover:brightness-105 transition shadow-sm"
                >
                  Terapkan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmDialog
        isOpen={Boolean(deleteId)}
        title="Hapus karya ini?"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
};
