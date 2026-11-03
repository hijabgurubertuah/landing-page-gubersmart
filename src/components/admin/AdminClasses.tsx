// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

import React, { useState, useEffect } from 'react';
import { Plus, Search, Download } from 'lucide-react';
import { ClassItem, ClassSyncStatus } from '../../types';
import { kelasStore } from '../../data/kelasStore';
import { kelasSync, startKelasPollingController } from '../../data/kelasSync';
import { TEMPLATE_CLASSES } from '../../data/kelasTemplat';
import { normalizeClassItem } from '../../data/kelasModel';
import { StorageService } from '../../services/storageService';
import { KartuKelasAdmin } from './KartuKelasAdmin';
import { FormKelas } from './FormKelas';
import { BilahSimpanSinkron } from './BilahSimpanSinkron';
import { exportClassesToCsv } from './eksporKelasCsv';
import { ConfirmDialog } from '../common/ConfirmDialog';
import { ErrorBoundary } from '../common/ErrorBoundary';

interface AdminClassesProps {
  classes?: ClassItem[];
  onSaveClasses?: (items: ClassItem[]) => void;
  showToast: (msg: string) => void;
}

export const AdminClasses: React.FC<AdminClassesProps> = ({ onSaveClasses, showToast }) => {
  const [draftItems, setDraftItems] = useState<ClassItem[]>(() => kelasStore.getDraft());
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [editingItem, setEditingItem] = useState<ClassItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [syncStatus, setSyncStatus] = useState<ClassSyncStatus>(kelasSync.getStatus());

  // Subscribe ke kelasStore & kelasSync
  useEffect(() => {
    const unsubStore = kelasStore.subscribe(() => {
      setDraftItems(kelasStore.getDraft());
    });

    const unsubStatus = kelasSync.subscribeStatus((st) => {
      setSyncStatus(st);
    });

    const stopPolling = startKelasPollingController();

    return () => {
      unsubStore();
      unsubStatus();
      stopPolling();
    };
  }, []);

  const publishedAll = kelasStore.getPublishedAll();
  const publishedMap = new Map(publishedAll.map((c) => [c.id, c]));

  // Hitung jumlah perubahan draf
  const unsyncedCount = draftItems.filter((draft) => {
    const pub = publishedMap.get(draft.id);
    if (!pub) return true;
    return (draft.diubah || 0) > (pub.diubah || 0);
  }).length;

  const filteredItems = draftItems.filter((item) => {
    const matchStatus = statusFilter === 'all' || item.status === statusFilter;
    const matchSearch =
      (item.name || '').toLowerCase().includes(search.toLowerCase()) ||
      (item.shortDesc || '').toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const handleStartCreate = () => {
    const newItem: ClassItem = {
      id: 'class_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6),
      slug: '',
      name: '',
      image: '',
      shortDesc: '',
      fullDesc: '',
      normalPrice: 299000,
      currentPrice: 199000,
      status: 'active',
      lynkidUrl: 'https://lynk.id',
      curriculum: [
        { meeting: 1, title: 'Pertemuan Pertama', content: 'Materi pengantar dasar.' },
      ],
      faqs: [],
      clicksCount: 0,
      order: draftItems.length + 1,
      dibuat: Date.now(),
      diubah: Date.now(),
      dihapus: false,
    };
    setEditingItem(newItem);
    setIsCreating(true);
  };

  const handleApplyForm = (updatedItem: ClassItem) => {
    console.log('Applying form data, image:', updatedItem.image ? updatedItem.image.slice(0, 50) : 'none');
    let updatedList: ClassItem[];
    if (isCreating) {
      updatedList = [updatedItem, ...draftItems];
    } else {
      updatedList = draftItems.map((c) => (c.id === updatedItem.id ? updatedItem : c));
    }

    kelasStore.setDraft(updatedList);
    setEditingItem(null);
    setIsCreating(false);
  };

  const handleDeleteConfirm = () => {
    if (!deleteConfirmId) return;
    const updatedList = draftItems.filter((c) => c.id !== deleteConfirmId);
    kelasStore.setDraft(updatedList);
    setDeleteConfirmId(null);
  };

  const handleLoadTemplates = () => {
    const existingSlugs = new Set(draftItems.map((c) => c.slug.toLowerCase()));
    const templatesToAdd = TEMPLATE_CLASSES.map((t) => normalizeClassItem(t)!).filter(
      (t) => t && !existingSlugs.has(t.slug.toLowerCase())
    );

    if (templatesToAdd.length === 0) {
      showToast('Templat sudah ada');
      return;
    }

    const updatedList = [...templatesToAdd, ...draftItems];
    kelasStore.setDraft(updatedList);
    showToast('Templat berhasil dimuat');
  };

  const handleExportCsv = () => {
    exportClassesToCsv(draftItems);
    showToast('Berhasil mengunduh');
  };

  const handleSaveAndSync = async () => {
    // 1. Tulis langsung ke terbit lokal (0ms) & broadcast antar tab
    kelasStore.publishDraft(draftItems);

    // 2. Simpan ke StorageService & panggil onSaveClasses agar sinkron di seluruh aplikasi
    StorageService.saveClasses(draftItems);
    if (onSaveClasses) {
      onSaveClasses(draftItems);
    }

    // 3. Kirim ke Google Apps Script / Sheets
    const res = await kelasSync.saveClassesToAppsScript(draftItems);

    // 4. Simpan ke Firestore
    for (const item of draftItems) {
      await StorageService.saveToFirestore('kelas', item.id, item);
    }

    if (res.success) {
      showToast('Berhasil disimpan');
    } else {
      showToast(res.error || 'Gagal menyimpan');
    }
  };

  return (
    <div className="space-y-6 pb-24">
      {/* Bilah Atas Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-serif font-bold text-[#1b2433]">Kelola Kelas</h2>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={handleLoadTemplates}
            className="min-h-[44px] px-4 py-2 rounded-full border border-[#c9a35a] text-[#07142b] bg-[#f8f5ef] text-sm font-semibold hover:bg-[#e7e1d5] transition shadow-sm"
          >
            Muat Templat
          </button>

          <button
            type="button"
            onClick={handleExportCsv}
            className="min-h-[44px] px-4 py-2 rounded-full border border-[#e7e1d5] text-[#07142b] bg-white text-sm font-semibold hover:bg-[#f8f5ef] transition flex items-center gap-1.5"
          >
            <Download className="w-4 h-4" />
            <span>Ekspor</span>
          </button>

          <button
            type="button"
            onClick={handleStartCreate}
            className="min-h-[44px] px-5 py-2.5 rounded-full gold-gradient-bg text-[#07142b] text-sm font-semibold hover:brightness-105 active:scale-95 transition flex items-center gap-2 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Kelas</span>
          </button>
        </div>
      </div>

      {/* Filter & Pencarian */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative max-w-sm w-full">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari..."
            className="w-full rounded-full border border-[#e7e1d5] bg-white pl-10 pr-4 py-2.5 text-sm text-[#1b2433] focus:border-[#c9a35a] focus:outline-none"
          />
          <Search className="w-4 h-4 text-[#6b7280] absolute left-3.5 top-1/2 -translate-y-1/2" />
        </div>

        <div className="flex gap-2">
          {(['all', 'active', 'inactive'] as const).map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(st)}
              className={`min-h-[44px] px-4 py-1.5 rounded-full text-xs font-semibold transition ${
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

      {/* Grid Kartu Kelas */}
      {filteredItems.length === 0 ? (
        <div className="bg-white rounded-[18px] p-12 text-center text-[#6b7280] border border-[#e7e1d5]">
          <p className="font-serif text-lg mb-3">Belum ada kelas</p>
          <div className="flex justify-center gap-3">
            <button
              type="button"
              onClick={handleStartCreate}
              className="min-h-[44px] px-5 py-2 rounded-full gold-gradient-bg text-[#07142b] text-xs font-semibold"
            >
              Tambah Kelas
            </button>
            <button
              type="button"
              onClick={handleLoadTemplates}
              className="min-h-[44px] px-5 py-2 rounded-full border border-[#c9a35a] text-[#07142b] text-xs font-semibold"
            >
              Muat Templat
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredItems.map((c) => {
            const pub = publishedMap.get(c.id);
            const isUnsaved = !pub || (c.diubah || 0) > (pub.diubah || 0);

            return (
              <ErrorBoundary key={c.id}>
                <KartuKelasAdmin
                  item={c}
                  hasUnsavedChanges={isUnsaved}
                  onEdit={(itemToEdit) => {
                    setEditingItem(itemToEdit);
                    setIsCreating(false);
                  }}
                  onDeleteRequest={(id) => setDeleteConfirmId(id)}
                />
              </ErrorBoundary>
            );
          })}
        </div>
      )}

      {/* Modal / Bottom-Sheet Form Kelas */}
      {editingItem && (
        <FormKelas
          initialData={editingItem}
          isCreating={isCreating}
          existingClasses={draftItems}
          onApply={handleApplyForm}
          onCancel={() => setEditingItem(null)}
        />
      )}

      {/* Dialog Konfirmasi Hapus */}
      <ConfirmDialog
        isOpen={Boolean(deleteConfirmId)}
        title="Hapus kelas?"
        confirmLabel="Hapus"
        cancelLabel="Batal"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteConfirmId(null)}
      />

      {/* Bilah Bawah Simpan & Sinkronkan - SELALU AKTIF */}
      <BilahSimpanSinkron
        unsyncedCount={unsyncedCount}
        syncStatus={syncStatus}
        onSaveAndSync={handleSaveAndSync}
      />
    </div>
  );
};

// Re-export sebagai KelasTab untuk kejelasan arsitektur
export const KelasTab = AdminClasses;
