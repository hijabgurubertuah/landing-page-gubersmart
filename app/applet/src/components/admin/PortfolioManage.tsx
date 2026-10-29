/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.
 */

import React, { useState } from 'react';
import { PortfolioItem } from '../../types';
import { ImageSlot } from '../common/ImageSlot';
import { ConfirmDialog } from '../common/ConfirmDialog';
import { Plus, Edit, Trash2, X } from 'lucide-react';

interface PortfolioManageProps {
  portfolio: PortfolioItem[];
  onSave: (item: PortfolioItem) => void;
  onDelete: (id: string) => void;
  onShowToast: (msg: string) => void;
}

export const PortfolioManage: React.FC<PortfolioManageProps> = ({
  portfolio,
  onSave,
  onDelete,
  onShowToast
}) => {
  const [editing, setEditing] = useState<PortfolioItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleAddNew = () => {
    setEditing({
      id: `port-${Date.now()}`,
      title: '',
      image: { source: 'tautan', value: '' },
      url: 'https://lynk.id/gubersmart',
      category: 'Umum',
      order: portfolio.length + 1
    });
    setIsModalOpen(true);
  };

  const handleEdit = (item: PortfolioItem) => {
    setEditing({ ...item });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    onSave(editing);
    setIsModalOpen(false);
    onShowToast('Berhasil disimpan');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a77d36]">Kelola</span>
          <h1 className="text-3xl font-serif font-bold text-[#1b2433]">Karya Peserta</h1>
        </div>
        <button
          onClick={handleAddNew}
          className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#e8cd8f] via-[#c9a35a] to-[#a77d36] text-[#07142b] font-bold text-sm shadow-md transition hover:opacity-95 flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Karya</span>
        </button>
      </div>

      <div className="bg-white rounded-[18px] shadow-md border border-[#e7e1d5] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f8f5ef] border-b border-[#e7e1d5] text-xs font-semibold uppercase tracking-wider text-[#4b5565]">
                <th className="p-4">Judul Karya</th>
                <th className="p-4">Kategori</th>
                <th className="p-4">Tautan</th>
                <th className="p-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e7e1d5] text-sm text-[#1b2433]">
              {portfolio.map((item) => (
                <tr key={item.id} className="hover:bg-[#f8f5ef]/50 transition">
                  <td className="p-4 font-serif font-bold">{item.title}</td>
                  <td className="p-4 text-[#4b5565]">{item.category}</td>
                  <td className="p-4 text-[#4b5565] truncate max-w-xs">{item.url}</td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="p-2 rounded-lg hover:bg-[#f1ece2] text-[#4b5565] transition"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeleteId(item.id)}
                      className="p-2 rounded-lg hover:bg-red-50 text-red-600 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && editing && (
        <div className="fixed inset-0 z-50 bg-[#07142b]/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[18px] max-w-lg w-full p-6 md:p-8 shadow-2xl border border-[#e7e1d5] space-y-6">
            <div className="flex items-center justify-between border-b border-[#e7e1d5] pb-4">
              <h3 className="text-xl font-serif font-bold text-[#1b2433]">Kelola Karya</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 rounded-full hover:bg-[#f8f5ef]">
                <X className="w-5 h-5 text-[#6b7280]" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#4b5565] mb-1">Judul Karya *</label>
                <input
                  type="text"
                  required
                  value={editing.title}
                  onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-[12px] border border-[#e7e1d5] text-sm focus:outline-none focus:border-[#c9a35a]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#4b5565] mb-1">Kategori</label>
                <input
                  type="text"
                  value={editing.category}
                  onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-[12px] border border-[#e7e1d5] text-sm focus:outline-none focus:border-[#c9a35a]"
                />
              </div>

              <ImageSlot
                label="Gambar Karya"
                value={editing.image}
                onChange={(img) => setEditing({ ...editing, image: img })}
              />

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#4b5565] mb-1">Tautan</label>
                <input
                  type="text"
                  value={editing.url}
                  onChange={(e) => setEditing({ ...editing, url: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-[12px] border border-[#e7e1d5] text-sm focus:outline-none focus:border-[#c9a35a]"
                />
              </div>

              <div className="flex gap-3 justify-end pt-4 border-t border-[#e7e1d5]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-full border border-[#e7e1d5] text-[#4b5565] text-sm font-medium hover:bg-[#f8f5ef]"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#e8cd8f] via-[#c9a35a] to-[#a77d36] text-[#07142b] font-bold text-sm shadow-md"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteId && (
        <ConfirmDialog
          title="Hapus Karya"
          onConfirm={() => {
            onDelete(deleteId);
            setDeleteId(null);
            onShowToast('Berhasil dihapus');
          }}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </div>
  );
};
