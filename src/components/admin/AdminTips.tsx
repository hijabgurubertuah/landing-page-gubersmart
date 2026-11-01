// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

import React, { useState } from 'react';
import { Plus, Search, Trash2, Edit3, Loader2 } from 'lucide-react';
import { TipsItem } from '../../types';
import { AutoTextarea } from '../common/AutoTextarea';
import { ImageUploader } from '../common/ImageUploader';
import { RichTextEditor } from '../common/RichTextEditor';
import { ConfirmDialog } from '../common/ConfirmDialog';

import { StorageService } from '../../services/storageService';

interface AdminTipsProps {
  tips: TipsItem[];
  onSaveTips: (items: TipsItem[]) => void;
  showToast: (msg: string) => void;
}

export const AdminTips: React.FC<AdminTipsProps> = ({
  tips,
  onSaveTips,
  showToast,
}) => {
  const [items, setItems] = useState<TipsItem[]>(tips);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [editingItem, setEditingItem] = useState<TipsItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const filteredItems = items.filter((item) => {
    const matchStatus = statusFilter === 'all' || item.status === statusFilter;
    const matchSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.summary.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const handleStartCreate = () => {
    setEditingItem({
      id: 'tip_' + Date.now(),
      slug: 'tips-baru-' + Date.now().toString().slice(-4),
      title: '',
      summary: '',
      thumbnail: '',
      category: 'Tips Prompting',
      publishedAt: new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
      author: 'Admin Guber Smart',
      status: 'published',
      content: '',
    });
    setIsCreating(true);
  };

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem || !editingItem.title.trim()) return;

    let updated: TipsItem[];
    if (isCreating) {
      updated = [...items, editingItem];
    } else {
      updated = items.map((t) => (t.id === editingItem.id ? editingItem : t));
    }
    setItems(updated);
    setEditingItem(null);
    setIsCreating(false);
    setHasChanges(true);
  };

  const handleDelete = () => {
    if (!deleteId) return;
    const updated = items.filter((t) => t.id !== deleteId);
    setItems(updated);
    setDeleteId(null);
    setHasChanges(true);
  };

  const handleSaveAllToSheet = async () => {
    if (isSaving) return;
    setIsSaving(true);
    try {
      onSaveTips(items);
      await StorageService.syncToAppsScript('Tips', items);
      setHasChanges(false);
      showToast('Berhasil disimpan');
    } catch {
      showToast('Gagal menyimpan tips');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-serif font-bold text-[#1b2433]">Tips & Artikel</h2>
        <button
          type="button"
          onClick={handleStartCreate}
          className="px-5 py-2.5 rounded-full gold-gradient-bg text-[#07142b] text-sm font-semibold hover:brightness-105 transition flex items-center gap-2 shadow-sm self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Tips</span>
        </button>
      </div>

      {/* Filter & Cari */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="relative max-w-sm w-full">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari artikel..."
            className="w-full rounded-full border border-[#e7e1d5] bg-white pl-10 pr-4 py-2 text-sm text-[#1b2433] focus:border-[#c9a35a] focus:outline-none"
          />
          <Search className="w-4 h-4 text-[#6b7280] absolute left-3.5 top-1/2 -translate-y-1/2" />
        </div>

        <div className="flex gap-2">
          {(['all', 'published', 'draft'] as const).map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${
                statusFilter === st
                  ? 'bg-[#0b1c38] text-white'
                  : 'bg-white border border-[#e7e1d5] text-[#4b5565]'
              }`}
            >
              {st === 'all' ? 'Semua' : st === 'published' ? 'Terbit' : 'Draf'}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-[18px] p-6 shadow-sm border border-[#e7e1d5] flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#a77d36]">{item.category}</span>
                <span
                  className={
                    item.status === 'published' ? 'text-green-600 font-medium' : 'text-gray-500'
                  }
                >
                  {item.status === 'published' ? 'Terbit' : 'Draf'}
                </span>
              </div>
              <h3 className="font-serif font-bold text-lg text-[#1b2433] line-clamp-2 leading-snug">
                {item.title}
              </h3>
              <p className="text-xs text-[#4b5565] line-clamp-3 leading-relaxed">
                {item.summary}
              </p>
            </div>

            <div className="pt-4 border-t border-[#f8f5ef] flex items-center justify-between">
              <span className="text-xs text-[#6b7280]">{item.publishedAt}</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setEditingItem(item);
                    setIsCreating(false);
                  }}
                  className="p-2 text-[#07142b] hover:bg-[#f8f5ef] rounded-full transition"
                  aria-label="Edit"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setDeleteId(item.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-full transition"
                  aria-label="Hapus"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
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

      {/* Form Dialog Modal */}
      {editingItem && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-[#07142b]/60 backdrop-blur-sm overflow-y-auto"
          onClick={() => setEditingItem(null)}
        >
          <div
            className="w-full max-w-3xl bg-white rounded-[18px] p-6 sm:p-8 shadow-2xl border border-[#e7e1d5] my-8 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-serif font-bold text-[#1b2433] mb-6">
              {isCreating ? 'Tambah Tips' : 'Ubah Tips'}
            </h3>

            <form onSubmit={handleApply} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-[#1b2433] mb-1">
                  Judul *
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.title}
                  onChange={(e) => {
                    const title = e.target.value;
                    setEditingItem({
                      ...editingItem,
                      title,
                      slug: isCreating
                        ? title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
                        : editingItem.slug,
                    });
                  }}
                  className="w-full rounded-xl border border-[#e7e1d5] px-4 py-2.5 text-base text-[#1b2433] focus:border-[#c9a35a] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                    className="w-full rounded-xl border border-[#e7e1d5] px-3 py-2 text-sm text-[#1b2433] focus:border-[#c9a35a] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1b2433] mb-1">
                    Status
                  </label>
                  <select
                    value={editingItem.status}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        status: e.target.value as 'published' | 'draft',
                      })
                    }
                    className="w-full rounded-xl border border-[#e7e1d5] px-3 py-2 text-sm text-[#1b2433] focus:border-[#c9a35a] focus:outline-none bg-white"
                  >
                    <option value="published">Terbit</option>
                    <option value="draft">Draf</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1b2433] mb-1">
                    Penulis
                  </label>
                  <input
                    type="text"
                    value={editingItem.author}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, author: e.target.value })
                    }
                    className="w-full rounded-xl border border-[#e7e1d5] px-3 py-2 text-sm text-[#1b2433] focus:border-[#c9a35a] focus:outline-none"
                  />
                </div>
              </div>

              <ImageUploader
                label="Thumbnail Sampul"
                value={editingItem.thumbnail}
                onChange={(newVal) =>
                  setEditingItem({ ...editingItem, thumbnail: newVal })
                }
              />

              <div>
                <label className="block text-sm font-medium text-[#1b2433] mb-1">
                  Ringkasan Singkat
                </label>
                <AutoTextarea
                  value={editingItem.summary}
                  onValueChange={(val) =>
                    setEditingItem({ ...editingItem, summary: val })
                  }
                  rows={2}
                />
              </div>

              {/* Rich Text Editor */}
              <RichTextEditor
                label="Isi Artikel Lengkap"
                value={editingItem.content}
                onChange={(val) =>
                  setEditingItem({ ...editingItem, content: val })
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
        title="Hapus tips ini?"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
};
