// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

import React, { useState } from 'react';
import { Plus, Search, Trash2, Edit3, Download, Loader2 } from 'lucide-react';
import { ClassItem, CurriculumMeeting, ClassFAQ } from '../../types';
import { AutoTextarea } from '../common/AutoTextarea';
import { ImageUploader } from '../common/ImageUploader';
import { ConfirmDialog } from '../common/ConfirmDialog';

import { StorageService, normalizeClassItem } from '../../services/storageService';
import { INITIAL_CLASSES } from '../../data/initialData';

interface AdminClassesProps {
  classes: ClassItem[];
  onSaveClasses: (items: ClassItem[]) => void;
  showToast: (msg: string) => void;
}

export const AdminClasses: React.FC<AdminClassesProps> = ({
  classes,
  onSaveClasses,
  showToast,
}) => {
  const [items, setItems] = useState<ClassItem[]>(() => classes.map(normalizeClassItem));
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [editingItem, setEditingItem] = useState<ClassItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const filteredItems = items.filter((item) => {
    const matchStatus = statusFilter === 'all' || item.status === statusFilter;
    const matchSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.shortDesc.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const handleStartCreate = () => {
    const newItem: ClassItem = {
      id: 'class_' + Date.now(),
      slug: 'kelas-baru-' + Date.now().toString().slice(-4),
      name: '',
      image: '',
      shortDesc: '',
      fullDesc: '',
      normalPrice: 299000,
      currentPrice: 199000,
      status: 'active',
      quota: 'Sisa 10 tempat',
      schedule: 'Setiap Sabtu (19.30 WIB)',
      lynkidUrl: 'https://lynk.id',
      curriculum: [
        { meeting: 1, title: 'Pertemuan Pertama', content: 'Pembahasan materi dasar.' },
      ],
      outcome: 'Aplikasi fungsional siap pakai.',
      targetAudience: 'Umum dan pemula.',
      faqs: [],
      clicksCount: 0,
      order: items.length + 1,
    };
    setEditingItem(newItem);
    setIsCreating(true);
  };

  const handleApplyForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem || !editingItem.name.trim()) return;

    let updated: ClassItem[];
    if (isCreating) {
      updated = [...items, editingItem];
    } else {
      updated = items.map((c) => (c.id === editingItem.id ? editingItem : c));
    }
    setItems(updated);
    setEditingItem(null);
    setIsCreating(false);
    setHasChanges(true);
  };

  const handleDelete = () => {
    if (!deleteConfirmId) return;
    const updated = items.filter((c) => c.id !== deleteConfirmId);
    setItems(updated);
    setDeleteConfirmId(null);
    setHasChanges(true);
  };

  const handleSaveAllToSheet = async () => {
    if (isSaving) return;
    setIsSaving(true);
    try {
      onSaveClasses(items);
      await StorageService.syncToAppsScript('Kelas', items);
      setHasChanges(false);
      showToast('Berhasil disimpan');
    } catch {
      showToast('Gagal menyimpan kelas');
    } finally {
      setIsSaving(false);
    }
  };

  const exportCsv = () => {
    const rows = [
      ['ID', 'Slug', 'Nama', 'Harga Normal', 'Harga Sekarang', 'Status', 'Klik'],
      ...items.map((c) => [
        c.id,
        c.slug,
        `"${c.name.replace(/"/g, '""')}"`,
        c.normalPrice,
        c.currentPrice,
        c.status,
        c.clicksCount,
      ]),
    ];
    const csvContent =
      'data:text/csv;charset=utf-8,' + rows.map((e) => e.join(',')).join('\n');
    const link = document.createElement('a');
    link.href = encodeURI(csvContent);
    link.download = `daftar_kelas_${Date.now()}.csv`;
    link.click();
    showToast('Berhasil mengunduh');
  };

  const handleLoadTemplates = () => {
    const templates = INITIAL_CLASSES.map(normalizeClassItem);
    setItems(templates);
    setHasChanges(true);
    showToast('Templat kelas berhasil dimuat. Klik Simpan untuk menerapkan.');
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-serif font-bold text-[#1b2433]">Kelola Kelas</h2>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleLoadTemplates}
            className="px-4 py-2 rounded-full border border-[#c9a35a] text-[#07142b] bg-[#f8f5ef] text-sm font-semibold hover:bg-[#e7e1d5] transition shadow-sm"
          >
            Muat Templat
          </button>
          <button
            type="button"
            onClick={exportCsv}
            className="px-4 py-2 rounded-full border border-[#e7e1d5] text-[#07142b] bg-white text-sm font-semibold hover:bg-[#f8f5ef] transition flex items-center gap-1.5"
          >
            <Download className="w-4 h-4" />
            <span>Ekspor</span>
          </button>
          <button
            type="button"
            onClick={handleStartCreate}
            className="px-5 py-2.5 rounded-full gold-gradient-bg text-[#07142b] text-sm font-semibold hover:brightness-105 transition flex items-center gap-2 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Kelas</span>
          </button>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="relative max-w-sm w-full">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari kelas..."
            className="w-full rounded-full border border-[#e7e1d5] bg-white pl-10 pr-4 py-2 text-sm text-[#1b2433] focus:border-[#c9a35a] focus:outline-none"
          />
          <Search className="w-4 h-4 text-[#6b7280] absolute left-3.5 top-1/2 -translate-y-1/2" />
        </div>

        <div className="flex gap-2">
          {(['all', 'active', 'inactive'] as const).map((st) => (
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
              {st === 'all' ? 'Semua' : st === 'active' ? 'Aktif' : 'Nonaktif'}
            </button>
          ))}
        </div>
      </div>

      {/* Daftar Kelas */}
      {filteredItems.length === 0 ? (
        <div className="bg-white rounded-[18px] p-12 text-center text-[#6b7280] border border-[#e7e1d5]">
          <p className="font-serif text-lg">Belum ada kelas</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((c) => (
            <div
              key={c.id}
              className="bg-white rounded-[18px] p-6 shadow-sm border border-[#e7e1d5] flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase text-[#a77d36]">
                    {c.status === 'active' ? 'Aktif' : 'Nonaktif'}
                  </span>
                  <span className="text-xs text-[#6b7280]">{c.clicksCount || 0} klik</span>
                </div>
                <h3 className="font-serif font-bold text-lg text-[#1b2433] leading-snug">
                  {c.name}
                </h3>
                <p className="text-xs text-[#4b5565] line-clamp-2 leading-relaxed">
                  {c.shortDesc}
                </p>
                <div className="font-serif font-bold text-base text-[#07142b]">
                  Rp{c.currentPrice.toLocaleString('id-ID')}
                </div>
              </div>

              <div className="pt-4 border-t border-[#f8f5ef] flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setEditingItem(normalizeClassItem(c));
                    setIsCreating(false);
                  }}
                  className="p-2 text-[#07142b] hover:bg-[#f8f5ef] rounded-full transition"
                  aria-label="Edit"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setDeleteConfirmId(c.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-full transition"
                  aria-label="Hapus"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

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

      {/* Modal / Panel Edit & Tambah Kelas */}
      {editingItem && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-[#07142b]/60 backdrop-blur-sm overflow-y-auto"
          onClick={() => setEditingItem(null)}
        >
          <div
            className="w-full max-w-2xl bg-white rounded-[18px] p-6 sm:p-8 shadow-2xl border border-[#e7e1d5] my-8 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-serif font-bold text-[#1b2433] mb-6">
              {isCreating ? 'Tambah Kelas' : 'Ubah Kelas'}
            </h3>

            <form onSubmit={handleApplyForm} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-[#1b2433] mb-1">
                  Nama Kelas *
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.name}
                  onChange={(e) => {
                    setEditingItem({
                      ...editingItem,
                      name: e.target.value,
                      slug: isCreating
                        ? e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-')
                        : editingItem.slug,
                    });
                    setHasChanges(true);
                  }}
                  className="w-full rounded-xl border border-[#e7e1d5] px-4 py-2.5 text-base text-[#1b2433] focus:border-[#c9a35a] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1b2433] mb-1">
                  Alamat Halaman (Slug) *
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.slug}
                  onChange={(e) => {
                    setEditingItem({ ...editingItem, slug: e.target.value });
                    setHasChanges(true);
                  }}
                  className="w-full rounded-xl border border-[#e7e1d5] px-4 py-2.5 text-sm text-[#1b2433] focus:border-[#c9a35a] focus:outline-none"
                />
              </div>

              {/* Upload Gambar */}
              <ImageUploader
                label="Gambar Kelas"
                value={editingItem.image}
                onChange={(newVal) => {
                  setEditingItem({ ...editingItem, image: newVal });
                  setHasChanges(true);
                }}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#1b2433] mb-1">
                    Harga Normal (Rp) *
                  </label>
                  <input
                    type="number"
                    required
                    value={editingItem.normalPrice}
                    onChange={(e) => {
                      setEditingItem({
                        ...editingItem,
                        normalPrice: Number(e.target.value),
                      });
                      setHasChanges(true);
                    }}
                    className="w-full rounded-xl border border-[#e7e1d5] px-4 py-2 text-sm text-[#1b2433] focus:border-[#c9a35a] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1b2433] mb-1">
                    Harga Sekarang (Rp) *
                  </label>
                  <input
                    type="number"
                    required
                    value={editingItem.currentPrice}
                    onChange={(e) => {
                      setEditingItem({
                        ...editingItem,
                        currentPrice: Number(e.target.value),
                      });
                      setHasChanges(true);
                    }}
                    className="w-full rounded-xl border border-[#e7e1d5] px-4 py-2 text-sm text-[#1b2433] focus:border-[#c9a35a] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#1b2433] mb-1">
                    Status *
                  </label>
                  <select
                    value={editingItem.status}
                    onChange={(e) => {
                      setEditingItem({
                        ...editingItem,
                        status: e.target.value as 'active' | 'inactive',
                      });
                      setHasChanges(true);
                    }}
                    className="w-full rounded-xl border border-[#e7e1d5] px-3 py-2 text-sm text-[#1b2433] focus:border-[#c9a35a] focus:outline-none bg-white"
                  >
                    <option value="active">Aktif</option>
                    <option value="inactive">Nonaktif</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1b2433] mb-1">
                    Keterangan Kuota
                  </label>
                  <input
                    type="text"
                    value={editingItem.quota}
                    onChange={(e) => {
                      setEditingItem({ ...editingItem, quota: e.target.value });
                      setHasChanges(true);
                    }}
                    className="w-full rounded-xl border border-[#e7e1d5] px-3 py-2 text-sm text-[#1b2433] focus:border-[#c9a35a] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1b2433] mb-1">
                    Jadwal
                  </label>
                  <input
                    type="text"
                    value={editingItem.schedule}
                    onChange={(e) => {
                      setEditingItem({ ...editingItem, schedule: e.target.value });
                      setHasChanges(true);
                    }}
                    className="w-full rounded-xl border border-[#e7e1d5] px-3 py-2 text-sm text-[#1b2433] focus:border-[#c9a35a] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1b2433] mb-1">
                  Tautan Lynk.id *
                </label>
                <input
                  type="url"
                  required
                  value={editingItem.lynkidUrl}
                  onChange={(e) => {
                    setEditingItem({ ...editingItem, lynkidUrl: e.target.value });
                    setHasChanges(true);
                  }}
                  className="w-full rounded-xl border border-[#e7e1d5] px-4 py-2 text-sm text-[#1b2433] focus:border-[#c9a35a] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1b2433] mb-1">
                  Deskripsi Singkat *
                </label>
                <AutoTextarea
                  value={editingItem.shortDesc}
                  onValueChange={(val) => {
                    setEditingItem({ ...editingItem, shortDesc: val });
                    setHasChanges(true);
                  }}
                  rows={2}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1b2433] mb-1">
                  Deskripsi Lengkap
                </label>
                <AutoTextarea
                  value={editingItem.fullDesc}
                  onValueChange={(val) => {
                    setEditingItem({ ...editingItem, fullDesc: val });
                    setHasChanges(true);
                  }}
                  rows={3}
                />
              </div>

              {/* Kurikulum */}
              <div className="space-y-3 pt-2 border-t border-[#e7e1d5]">
                {(() => {
                  const curriculumList = Array.isArray(editingItem.curriculum)
                    ? editingItem.curriculum
                    : [];

                  return (
                    <>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-[#1b2433]">
                          Materi Pertemuan
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            const nextMeeting = curriculumList.length + 1;
                            const updatedCurriculum = [
                              ...curriculumList,
                              {
                                meeting: nextMeeting,
                                title: `Pertemuan ${nextMeeting}`,
                                content: '',
                              },
                            ];
                            setEditingItem({ ...editingItem, curriculum: updatedCurriculum });
                            setHasChanges(true);
                          }}
                          className="text-xs text-[#a77d36] font-semibold hover:underline"
                        >
                          + Tambah Pertemuan
                        </button>
                      </div>

                      <div className="space-y-2">
                        {curriculumList.map((curr, idx) => (
                          <div
                            key={idx}
                            className="p-3 bg-[#f8f5ef] rounded-xl border border-[#e7e1d5] space-y-2"
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-xs font-bold text-[#a77d36]">
                                Pertemuan {curr.meeting}
                              </span>
                              <button
                                type="button"
                                onClick={() => {
                                  const updatedCurriculum = curriculumList.filter(
                                    (_, i) => i !== idx
                                  );
                                  setEditingItem({
                                    ...editingItem,
                                    curriculum: updatedCurriculum,
                                  });
                                  setHasChanges(true);
                                }}
                                className="text-xs text-red-600 hover:underline"
                              >
                                Hapus
                              </button>
                            </div>
                            <input
                              type="text"
                              value={curr.title || ''}
                              onChange={(e) => {
                                const updatedCurriculum = [...curriculumList];
                                updatedCurriculum[idx] = {
                                  ...updatedCurriculum[idx],
                                  title: e.target.value,
                                };
                                setEditingItem({
                                  ...editingItem,
                                  curriculum: updatedCurriculum,
                                });
                                setHasChanges(true);
                              }}
                              placeholder="Judul Materi"
                              className="w-full rounded-lg border border-[#e7e1d5] px-3 py-1.5 text-xs text-[#1b2433] bg-white focus:outline-none"
                            />
                            <AutoTextarea
                              value={curr.content || ''}
                              onValueChange={(val) => {
                                const updatedCurriculum = [...curriculumList];
                                updatedCurriculum[idx] = {
                                  ...updatedCurriculum[idx],
                                  content: val,
                                };
                                setEditingItem({
                                  ...editingItem,
                                  curriculum: updatedCurriculum,
                                });
                                setHasChanges(true);
                              }}
                              rows={1}
                              placeholder="Ringkasan Materi"
                              className="text-xs"
                            />
                          </div>
                        ))}
                      </div>
                    </>
                  );
                })()}
              </div>

              {/* Bilah Aksi Bawah */}
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

      {/* Konfirmasi Hapus */}
      <ConfirmDialog
        isOpen={Boolean(deleteConfirmId)}
        title="Hapus kelas ini?"
        confirmLabel="Hapus"
        cancelLabel="Batal"
        onConfirm={handleDelete}
        onCancel={() => setDeleteConfirmId(null)}
      />
    </div>
  );
};
