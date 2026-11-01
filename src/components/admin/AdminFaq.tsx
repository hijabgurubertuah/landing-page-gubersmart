// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

import React, { useState } from 'react';
import { Plus, Trash2, Edit3, Loader2 } from 'lucide-react';
import { FAQItem } from '../../types';
import { AutoTextarea } from '../common/AutoTextarea';
import { ConfirmDialog } from '../common/ConfirmDialog';

import { StorageService } from '../../services/storageService';

interface AdminFaqProps {
  faqs: FAQItem[];
  onSaveFaqs: (items: FAQItem[]) => void;
  showToast: (msg: string) => void;
}

export const AdminFaq: React.FC<AdminFaqProps> = ({
  faqs,
  onSaveFaqs,
  showToast,
}) => {
  const [items, setItems] = useState<FAQItem[]>(faqs);
  const [editingItem, setEditingItem] = useState<FAQItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleStartCreate = () => {
    setEditingItem({
      id: 'faq_' + Date.now(),
      question: '',
      answer: '',
      order: items.length + 1,
    });
    setIsCreating(true);
  };

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem || !editingItem.question.trim()) return;

    let updated: FAQItem[];
    if (isCreating) {
      updated = [...items, editingItem];
    } else {
      updated = items.map((f) => (f.id === editingItem.id ? editingItem : f));
    }
    setItems(updated);
    setEditingItem(null);
    setIsCreating(false);
    setHasChanges(true);
  };

  const handleDelete = () => {
    if (!deleteId) return;
    const updated = items.filter((f) => f.id !== deleteId);
    setItems(updated);
    setDeleteId(null);
    setHasChanges(true);
  };

  const handleSaveAllToSheet = async () => {
    if (isSaving) return;
    setIsSaving(true);
    try {
      onSaveFaqs(items);
      await StorageService.syncToAppsScript('FAQ', items);
      setHasChanges(false);
      showToast('Berhasil disimpan');
    } catch {
      showToast('Gagal menyimpan FAQ');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-serif font-bold text-[#1b2433]">FAQ</h2>
        <button
          type="button"
          onClick={handleStartCreate}
          className="px-5 py-2.5 rounded-full gold-gradient-bg text-[#07142b] text-sm font-semibold hover:brightness-105 transition flex items-center gap-2 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Pertanyaan</span>
        </button>
      </div>

      <div className="space-y-3">
        {items.map((f) => (
          <div
            key={f.id}
            className="bg-white rounded-[18px] p-6 shadow-sm border border-[#e7e1d5] flex items-start justify-between gap-4"
          >
            <div className="space-y-2 flex-1">
              <h3 className="font-serif font-bold text-base text-[#1b2433]">
                {f.question}
              </h3>
              <p className="text-sm text-[#4b5565] leading-relaxed">{f.answer}</p>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                type="button"
                onClick={() => {
                  setEditingItem(f);
                  setIsCreating(false);
                }}
                className="p-2 text-[#07142b] hover:bg-[#f8f5ef] rounded-full transition"
                aria-label="Edit"
              >
                <Edit3 className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setDeleteId(f.id)}
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
              {isCreating ? 'Tambah FAQ' : 'Ubah FAQ'}
            </h3>

            <form onSubmit={handleApply} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#1b2433] mb-1">
                  Pertanyaan *
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.question}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, question: e.target.value })
                  }
                  className="w-full rounded-xl border border-[#e7e1d5] px-4 py-2.5 text-sm text-[#1b2433] focus:border-[#c9a35a] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1b2433] mb-1">
                  Jawaban *
                </label>
                <AutoTextarea
                  value={editingItem.answer}
                  onValueChange={(val) =>
                    setEditingItem({ ...editingItem, answer: val })
                  }
                  rows={3}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1b2433] mb-1">
                  Urutan
                </label>
                <input
                  type="number"
                  value={editingItem.order}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, order: Number(e.target.value) })
                  }
                  className="w-24 rounded-xl border border-[#e7e1d5] px-3 py-2 text-sm text-[#1b2433] focus:border-[#c9a35a] focus:outline-none"
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
        title="Hapus pertanyaan ini?"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
};
