// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

import React, { useState } from 'react';
import { Plus, Trash2, Edit3, Loader2 } from 'lucide-react';
import { TestimonialItem } from '../../types';
import { AutoTextarea } from '../common/AutoTextarea';
import { ConfirmDialog } from '../common/ConfirmDialog';

import { StorageService } from '../../services/storageService';

interface AdminTestimonialsProps {
  testimonials: TestimonialItem[];
  onSaveTestimonials: (items: TestimonialItem[]) => void;
  showToast: (msg: string) => void;
}

export const AdminTestimonials: React.FC<AdminTestimonialsProps> = ({
  testimonials,
  onSaveTestimonials,
  showToast,
}) => {
  const [items, setItems] = useState<TestimonialItem[]>(testimonials);
  const [editingItem, setEditingItem] = useState<TestimonialItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleStartCreate = () => {
    setEditingItem({
      id: 'testi_' + Date.now(),
      name: '',
      role: '',
      quote: '',
      isActive: true,
      order: items.length + 1,
    });
    setIsCreating(true);
  };

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem || !editingItem.name.trim()) return;

    let updated: TestimonialItem[];
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

  const handleToggle = (id: string) => {
    const updated = items.map((t) =>
      t.id === id ? { ...t, isActive: !t.isActive } : t
    );
    setItems(updated);
    setHasChanges(true);
  };

  const handleSaveAllToSheet = async () => {
    if (isSaving) return;
    setIsSaving(true);
    try {
      onSaveTestimonials(items);
      await StorageService.syncToAppsScript('Testimoni', items);
      setHasChanges(false);
      showToast('Berhasil disimpan');
    } catch {
      showToast('Gagal menyimpan testimoni');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-serif font-bold text-[#1b2433]">Testimoni</h2>
        <button
          type="button"
          onClick={handleStartCreate}
          className="px-5 py-2.5 rounded-full gold-gradient-bg text-[#07142b] text-sm font-semibold hover:brightness-105 transition flex items-center gap-2 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Testimoni</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((t) => (
          <div
            key={t.id}
            className="bg-white rounded-[18px] p-6 shadow-sm border border-[#e7e1d5] flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-serif font-bold text-base text-[#1b2433]">
                  {t.name}
                </span>
                <button
                  type="button"
                  onClick={() => handleToggle(t.id)}
                  className={`text-xs font-semibold uppercase ${
                    t.isActive ? 'text-[#16a34a]' : 'text-[#6b7280]'
                  }`}
                >
                  {t.isActive ? 'Tampil' : 'Sembunyi'}
                </button>
              </div>
              <div className="text-xs text-[#a77d36] font-medium">{t.role}</div>
              <p className="font-serif italic text-sm text-[#4b5565] line-clamp-3 leading-relaxed pt-2">
                &ldquo;{t.quote}&rdquo;
              </p>
            </div>

            <div className="pt-4 border-t border-[#f8f5ef] flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  setEditingItem(t);
                  setIsCreating(false);
                }}
                className="p-2 text-[#07142b] hover:bg-[#f8f5ef] rounded-full transition"
                aria-label="Edit"
              >
                <Edit3 className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setDeleteId(t.id)}
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
          disabled={isSaving}
          onClick={handleSaveAllToSheet}
          className={`px-7 py-3 rounded-full text-sm font-semibold transition shadow-sm inline-flex items-center gap-2 ${
            isSaving
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed pointer-events-none'
              : 'gold-gradient-bg text-[#07142b] hover:brightness-105 active:scale-95'
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
              {isCreating ? 'Tambah Testimoni' : 'Ubah Testimoni'}
            </h3>

            <form onSubmit={handleApply} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#1b2433] mb-1">
                  Nama *
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.name}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, name: e.target.value })
                  }
                  className="w-full rounded-xl border border-[#e7e1d5] px-4 py-2.5 text-sm text-[#1b2433] focus:border-[#c9a35a] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1b2433] mb-1">
                  Profesi / Asal *
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.role}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, role: e.target.value })
                  }
                  className="w-full rounded-xl border border-[#e7e1d5] px-4 py-2.5 text-sm text-[#1b2433] focus:border-[#c9a35a] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1b2433] mb-1">
                  Kutipan Testimoni *
                </label>
                <AutoTextarea
                  value={editingItem.quote}
                  onValueChange={(val) =>
                    setEditingItem({ ...editingItem, quote: val })
                  }
                  rows={3}
                  required
                />
              </div>

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
        title="Hapus testimoni ini?"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
};
