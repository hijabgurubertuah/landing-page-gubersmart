/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.
 */

import React, { useState } from 'react';
import { ClassItem } from '../../types';
import { ImageSlot } from '../common/ImageSlot';
import { ConfirmDialog } from '../common/ConfirmDialog';
import { Plus, Edit, Trash2, Archive, Download, X } from 'lucide-react';

interface ClassesManageProps {
  classes: ClassItem[];
  onSaveClass: (cls: ClassItem) => void;
  onDeleteClass: (id: string) => void;
  onArchiveClass: (id: string) => void;
  onShowToast: (msg: string) => void;
}

export const ClassesManage: React.FC<ClassesManageProps> = ({
  classes,
  onSaveClass,
  onDeleteClass,
  onArchiveClass,
  onShowToast
}) => {
  const [editingClass, setEditingClass] = useState<ClassItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const handleAddNew = () => {
    setEditingClass({
      id: `cls-${Date.now()}`,
      slug: `kelas-baru-${Date.now()}`,
      title: '',
      image: { source: 'tautan', value: '' },
      shortDesc: '',
      fullDesc: '',
      normalPrice: 'Rp299.000',
      currentPrice: 'Rp199.000',
      status: 'aktif',
      quota: 'Sisa 20 Kursi',
      schedule: 'Setiap Hari Sabtu',
      lynkUrl: 'https://lynk.id/gubersmart',
      modules: [{ title: 'Pertemuan 1', content: '' }],
      outcomes: ['Hasil 1'],
      targetAudience: ['Umum'],
      classFaq: [{ q: 'Pertanyaan?', a: 'Jawaban.' }],
      order: classes.length + 1
    });
    setIsModalOpen(true);
  };

  const handleEdit = (cls: ClassItem) => {
    setEditingClass({ ...cls });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingClass) return;
    onSaveClass(editingClass);
    setIsModalOpen(false);
    onShowToast('Berhasil disimpan');
  };

  const exportCsv = () => {
    const headers = ['ID', 'Judul', 'Harga Normal', 'Harga Sekarang', 'Status', 'Kuota'];
    const rows = classes.map(c => [c.id, `"${c.title}"`, c.normalPrice, c.currentPrice, c.status, `"${c.quota}"`]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'daftar_kelas.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onShowToast('Berhasil diekspor');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a77d36]">Kelola</span>
          <h1 className="text-3xl font-serif font-bold text-[#1b2433]">Daftar Kelas</h1>
        </div>

        <div className="flex gap-2">
          <button
            onClick={exportCsv}
            className="px-5 py-2.5 rounded-full border border-[#c9a35a] text-[#1b2433] font-medium text-sm hover:bg-[#f8f5ef] transition flex items-center gap-1.5"
          >
            <Download className="w-4 h-4" />
            <span>Ekspor CSV</span>
          </button>
          <button
            onClick={handleAddNew}
            className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#e8cd8f] via-[#c9a35a] to-[#a77d36] text-[#07142b] font-bold text-sm shadow-md transition hover:opacity-95 flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Kelas</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[18px] shadow-md border border-[#e7e1d5] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f8f5ef] border-b border-[#e7e1d5] text-xs font-semibold uppercase tracking-wider text-[#4b5565]">
                <th className="p-4">Judul Kelas</th>
                <th className="p-4">Harga</th>
                <th className="p-4">Status</th>
                <th className="p-4">Kuota</th>
                <th className="p-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e7e1d5] text-sm text-[#1b2433]">
              {classes.map((cls) => (
                <tr key={cls.id} className="hover:bg-[#f8f5ef]/50 transition">
                  <td className="p-4 font-serif font-bold">{cls.title}</td>
                  <td className="p-4">
                    <span className="line-through text-xs text-[#6b7280] mr-2">{cls.normalPrice}</span>
                    <span className="font-bold">{cls.currentPrice}</span>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      cls.status === 'aktif' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {cls.status}
                    </span>
                  </td>
                  <td className="p-4 text-[#4b5565]">{cls.quota}</td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => handleEdit(cls)}
                      className="p-2 rounded-lg hover:bg-[#f1ece2] text-[#4b5565] transition"
                      title="Ubah"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        onArchiveClass(cls.id);
                        onShowToast('Berhasil diarsipkan');
                      }}
                      className="p-2 rounded-lg hover:bg-[#f1ece2] text-[#4b5565] transition"
                      title="Arsip"
                    >
                      <Archive className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeleteConfirmId(cls.id)}
                      className="p-2 rounded-lg hover:bg-red-50 text-red-600 transition"
                      title="Hapus"
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

      {/* Edit/Add Modal */}
      {isModalOpen && editingClass && (
        <div className="fixed inset-0 z-50 bg-[#07142b]/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[18px] max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 shadow-2xl border border-[#e7e1d5] space-y-6">
            <div className="flex items-center justify-between border-b border-[#e7e1d5] pb-4">
              <h3 className="text-xl font-serif font-bold text-[#1b2433]">Kelola Kelas</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 rounded-full hover:bg-[#f8f5ef]">
                <X className="w-5 h-5 text-[#6b7280]" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#4b5565] mb-1">Nama Kelas *</label>
                <input
                  type="text"
                  required
                  value={editingClass.title}
                  onChange={(e) => setEditingClass({ ...editingClass, title: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-[12px] border border-[#e7e1d5] text-sm focus:outline-none focus:border-[#c9a35a]"
                />
              </div>

              <ImageSlot
                label="Gambar Kelas"
                value={editingClass.image}
                onChange={(img) => setEditingClass({ ...editingClass, image: img })}
              />

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#4b5565] mb-1">Deskripsi Singkat</label>
                <textarea
                  value={editingClass.shortDesc}
                  onChange={(e) => setEditingClass({ ...editingClass, shortDesc: e.target.value })}
                  rows={2}
                  className="w-full px-3 py-2.5 rounded-[12px] border border-[#e7e1d5] text-sm focus:outline-none focus:border-[#c9a35a]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#4b5565] mb-1">Deskripsi Lengkap</label>
                <textarea
                  value={editingClass.fullDesc}
                  onChange={(e) => setEditingClass({ ...editingClass, fullDesc: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2.5 rounded-[12px] border border-[#e7e1d5] text-sm focus:outline-none focus:border-[#c9a35a]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#4b5565] mb-1">Harga Normal</label>
                  <input
                    type="text"
                    value={editingClass.normalPrice}
                    onChange={(e) => setEditingClass({ ...editingClass, normalPrice: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-[12px] border border-[#e7e1d5] text-sm focus:outline-none focus:border-[#c9a35a]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#4b5565] mb-1">Harga Sekarang</label>
                  <input
                    type="text"
                    value={editingClass.currentPrice}
                    onChange={(e) => setEditingClass({ ...editingClass, currentPrice: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-[12px] border border-[#e7e1d5] text-sm focus:outline-none focus:border-[#c9a35a]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#4b5565] mb-1">Status</label>
                  <select
                    value={editingClass.status}
                    onChange={(e) => setEditingClass({ ...editingClass, status: e.target.value as any })}
                    className="w-full px-3 py-2.5 rounded-[12px] border border-[#e7e1d5] text-sm focus:outline-none focus:border-[#c9a35a] bg-white"
                  >
                    <option value="aktif">Aktif</option>
                    <option value="arsip">Arsip</option>
                    <option value="nonaktif">Nonaktif</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#4b5565] mb-1">Kuota / Sisa Tempat</label>
                  <input
                    type="text"
                    value={editingClass.quota}
                    onChange={(e) => setEditingClass({ ...editingClass, quota: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-[12px] border border-[#e7e1d5] text-sm focus:outline-none focus:border-[#c9a35a]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#4b5565] mb-1">Jadwal</label>
                <input
                  type="text"
                  value={editingClass.schedule}
                  onChange={(e) => setEditingClass({ ...editingClass, schedule: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-[12px] border border-[#e7e1d5] text-sm focus:outline-none focus:border-[#c9a35a]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#4b5565] mb-1">Tautan Lynk.id</label>
                <input
                  type="text"
                  value={editingClass.lynkUrl}
                  onChange={(e) => setEditingClass({ ...editingClass, lynkUrl: e.target.value })}
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

      {/* Delete Confirmation */}
      {deleteConfirmId && (
        <ConfirmDialog
          title="Hapus Kelas"
          message="Tindakan ini akan menghapus kelas secara permanen."
          onConfirm={() => {
            onDeleteClass(deleteConfirmId);
            setDeleteConfirmId(null);
            onShowToast('Berhasil dihapus');
          }}
          onCancel={() => setDeleteConfirmId(null)}
        />
      )}
    </div>
  );
};
