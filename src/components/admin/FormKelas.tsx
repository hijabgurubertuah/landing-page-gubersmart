// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

import React, { useState, useEffect } from 'react';
import { ClassItem } from '../../types';
import { generateSlug, formatClassUrl } from '../../data/kelasModel';
import { ImageUploader } from '../common/ImageUploader';
import { AutoTextarea } from '../common/AutoTextarea';
import { InputRupiah } from '../common/InputRupiah';
import { EditorPertemuan } from './EditorPertemuan';
import { EditorFaq } from './EditorFaq';
import { ConfirmDialog } from '../common/ConfirmDialog';

interface FormKelasProps {
  initialData: ClassItem;
  isCreating: boolean;
  existingClasses: ClassItem[];
  onApply: (item: ClassItem) => void;
  onCancel: () => void;
}

export const FormKelas: React.FC<FormKelasProps> = ({
  initialData,
  isCreating,
  existingClasses,
  onApply,
  onCancel,
}) => {
  const [formData, setFormData] = useState<ClassItem>(initialData);
  const [isSlugUserEdited, setIsSlugUserEdited] = useState(!isCreating);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isDirty, setIsDirty] = useState(false);
  const [showDiscardConfirm, setShowDiscardConfirm] = useState(false);

  // Auto-generate slug dari nama saat kelas BARU dibuat
  useEffect(() => {
    if (isCreating && !isSlugUserEdited && formData.name) {
      const generated = generateSlug(formData.name);
      setFormData((prev) => ({ ...prev, slug: generated }));
    }
  }, [formData.name, isCreating, isSlugUserEdited]);

  const updateField = (field: keyof ClassItem, val: any) => {
    console.log(`Updating field ${field} with value:`, typeof val === 'string' && val.length > 50 ? val.slice(0, 50) + '...' : val);
    setIsDirty(true);
    setErrors((prev) => ({ ...prev, [field]: '' }));
    setFormData((prev) => ({ ...prev, [field]: val }));
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsDirty(true);
    setIsSlugUserEdited(true);
    const clean = generateSlug(e.target.value);
    setErrors((prev) => ({ ...prev, slug: '' }));
    setFormData((prev) => ({ ...prev, slug: clean }));
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    if (!formData.name.trim()) {
      errs.name = 'Nama kelas wajib diisi';
    }

    if (!formData.slug.trim()) {
      errs.slug = 'Slug wajib diisi';
    } else {
      // Periksa keunikan slug di antara kelas yang belum dihapus
      const isDuplicate = existingClasses.some(
        (c) =>
          !c.dihapus &&
          c.id !== formData.id &&
          c.slug.toLowerCase() === formData.slug.toLowerCase()
      );
      if (isDuplicate) {
        errs.slug = 'Sudah dipakai';
      }
    }

    // Validasi harga sekarang tidak boleh melebihi harga normal jika harga normal diisi > 0
    if (
      formData.normalPrice > 0 &&
      formData.currentPrice > formData.normalPrice
    ) {
      errs.currentPrice = 'Melebihi harga normal';
    }

    // Validasi & Format Tautan Pendaftaran
    if (formData.lynkidUrl && formData.lynkidUrl.trim()) {
      const formatted = formatClassUrl(formData.lynkidUrl);
      try {
        new URL(formatted);
      } catch {
        errs.lynkidUrl = 'Tautan tidak valid';
      }
    }

    // Periksa batas ukuran kurikulum & faq
    if (JSON.stringify(formData.curriculum || []).length > 40000) {
      errs.curriculum = 'Terlalu panjang';
    }
    if (JSON.stringify(formData.faqs || []).length > 40000) {
      errs.faqs = 'Terlalu panjang';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Bersihkan baris kurikulum & faq yang kosong
    const cleanCurriculum = (formData.curriculum || []).filter(
      (c) => (c.title && c.title.trim()) || (c.content && c.content.trim())
    );
    const cleanFaqs = (formData.faqs || []).filter(
      (f) => (f.q && f.q.trim()) || (f.a && f.a.trim())
    );

    const finalData: ClassItem = {
      ...formData,
      lynkidUrl: formatClassUrl(formData.lynkidUrl),
      curriculum: cleanCurriculum,
      faqs: cleanFaqs,
      diubah: Date.now(),
    };

    onApply(finalData);
  };

  const handleRequestCancel = () => {
    if (isDirty) {
      setShowDiscardConfirm(true);
    } else {
      onCancel();
    }
  };

  return (
    <>
      <div
        className="fixed inset-0 z-[80] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-[#07142b]/60 backdrop-blur-sm overflow-y-auto"
        onClick={handleRequestCancel}
      >
        <div
          className="w-full max-w-2xl bg-white rounded-t-[24px] sm:rounded-[24px] p-5 sm:p-8 shadow-2xl border border-[#e7e1d5] max-h-[92vh] sm:max-h-[88vh] flex flex-col my-0 sm:my-8"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Dialog */}
          <div className="flex items-center justify-between pb-4 border-b border-[#e7e1d5] mb-5">
            <h3 className="text-xl font-serif font-bold text-[#1b2433]">
              {isCreating ? 'Tambah Kelas' : 'Ubah Kelas'}
            </h3>
            <button
              type="button"
              onClick={handleRequestCancel}
              className="text-[#6b7280] hover:text-[#1b2433] text-lg font-bold p-2 min-h-[44px]"
            >
              ✕
            </button>
          </div>

          {/* Form Content - Scrollable */}
          <form
            onSubmit={handleSubmit}
            className="flex-1 overflow-y-auto space-y-5 pr-1"
          >
            {/* 1. Nama Kelas */}
            <div>
              <label className="block text-sm font-semibold text-[#1b2433] mb-1">
                Nama Kelas *
              </label>
              <input
                type="text"
                required
                value={formData.name || ''}
                onChange={(e) => updateField('name', e.target.value)}
                placeholder="Nama Kelas"
                className="w-full rounded-xl border border-[#e7e1d5] px-4 py-2.5 text-base text-[#1b2433] focus:border-[#c9a35a] focus:outline-none"
              />
              {errors.name && (
                <p className="text-xs font-semibold text-red-600 mt-1">{errors.name}</p>
              )}
            </div>

            {/* 2. Alamat Halaman (Slug) */}
            <div>
              <label className="block text-sm font-semibold text-[#1b2433] mb-1">
                Alamat Halaman (Slug) *
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3.5 text-xs text-[#6b7280] font-mono pointer-events-none select-none">
                  /kelas/
                </span>
                <input
                  type="text"
                  required
                  value={formData.slug || ''}
                  onChange={handleSlugChange}
                  placeholder="slug-kelas"
                  className="w-full rounded-xl border border-[#e7e1d5] pl-16 pr-4 py-2.5 text-sm text-[#1b2433] font-mono focus:border-[#c9a35a] focus:outline-none"
                />
              </div>
              {errors.slug && (
                <p className="text-xs font-semibold text-red-600 mt-1">{errors.slug}</p>
              )}
            </div>

            {/* 3. Gambar Sampul Kelas */}
            <ImageUploader
              label="Gambar Sampul"
              value={formData.image || ''}
              onChange={(newVal) => updateField('image', newVal)}
            />

            {/* 4 & 5. Harga Normal & Harga Sekarang */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-[#1b2433] mb-1">
                  Harga Normal (Rp) *
                </label>
                <InputRupiah
                  value={formData.normalPrice || ''}
                  onChange={(val) => updateField('normalPrice', val === '' ? 0 : val)}
                  placeholder="299.000"
                />
                {errors.normalPrice && (
                  <p className="text-xs font-semibold text-red-600 mt-1">
                    {errors.normalPrice}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#1b2433] mb-1">
                  Harga Sekarang (Rp) *
                </label>
                <InputRupiah
                  value={formData.currentPrice || ''}
                  onChange={(val) => updateField('currentPrice', val === '' ? 0 : val)}
                  placeholder="199.000"
                />
                {errors.currentPrice && (
                  <p className="text-xs font-semibold text-red-600 mt-1">
                    {errors.currentPrice}
                  </p>
                )}
              </div>
            </div>

            {/* 6. Status */}
            <div>
              <label className="block text-sm font-semibold text-[#1b2433] mb-1">
                Status *
              </label>
              <select
                value={formData.status}
                onChange={(e) => updateField('status', e.target.value)}
                className="w-full rounded-xl border border-[#e7e1d5] px-3.5 py-2.5 text-sm text-[#1b2433] focus:border-[#c9a35a] focus:outline-none bg-white font-medium"
              >
                <option value="active">Aktif</option>
                <option value="inactive">Nonaktif</option>
              </select>
            </div>

            {/* 7. Tautan Pendaftaran */}
            <div>
              <label className="block text-sm font-semibold text-[#1b2433] mb-1">
                Tautan Pendaftaran
              </label>
              <input
                type="text"
                value={formData.lynkidUrl || ''}
                onChange={(e) => updateField('lynkidUrl', e.target.value)}
                onBlur={() =>
                  updateField('lynkidUrl', formatClassUrl(formData.lynkidUrl))
                }
                placeholder="https://lynk.id/namaproduk"
                className="w-full rounded-xl border border-[#e7e1d5] px-4 py-2.5 text-sm text-[#1b2433] focus:border-[#c9a35a] focus:outline-none"
              />
              {errors.lynkidUrl && (
                <p className="text-xs font-semibold text-red-600 mt-1">
                  {errors.lynkidUrl}
                </p>
              )}
            </div>

            {/* 8. Deskripsi Singkat */}
            <div>
              <label className="block text-sm font-semibold text-[#1b2433] mb-1">
                Deskripsi Singkat *
              </label>
              <AutoTextarea
                value={formData.shortDesc || ''}
                onValueChange={(val) => updateField('shortDesc', val)}
                rows={2}
                placeholder="Ringkasan singkat kelas"
              />
            </div>

            {/* 9. Deskripsi Lengkap */}
            <div>
              <label className="block text-sm font-semibold text-[#1b2433] mb-1">
                Deskripsi Lengkap
              </label>
              <AutoTextarea
                value={formData.fullDesc || ''}
                onValueChange={(val) => updateField('fullDesc', val)}
                rows={3}
                placeholder="Penjelasan lengkap mengenai kelas"
              />
            </div>

            {/* 10. Materi Pertemuan */}
            <EditorPertemuan
              curriculum={formData.curriculum || []}
              onChange={(updated) => updateField('curriculum', updated)}
            />
            {errors.curriculum && (
              <p className="text-xs font-semibold text-red-600 mt-1">
                {errors.curriculum}
              </p>
            )}

            {/* 11. FAQ Kelas */}
            <EditorFaq
              faqs={formData.faqs || []}
              onChange={(updated) => updateField('faqs', updated)}
            />
            {errors.faqs && (
              <p className="text-xs font-semibold text-red-600 mt-1">{errors.faqs}</p>
            )}

            {/* Fixed Bottom Action Bar */}
            <div className="pt-4 border-t border-[#e7e1d5] flex items-center justify-end gap-3 sticky bottom-0 bg-white py-2">
              <button
                type="button"
                onClick={handleRequestCancel}
                className="min-h-[44px] px-5 py-2.5 rounded-full border border-[#e7e1d5] text-[#4b5565] text-sm font-medium hover:bg-[#f8f5ef] transition"
              >
                Batal
              </button>
              <button
                type="submit"
                className="min-h-[44px] px-7 py-2.5 rounded-full gold-gradient-bg text-[#07142b] text-sm font-semibold hover:brightness-105 active:scale-95 transition shadow-sm"
              >
                Terapkan
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Dialog Konfirmasi Buang Perubahan */}
      <ConfirmDialog
        isOpen={showDiscardConfirm}
        title="Buang perubahan?"
        confirmLabel="Buang"
        cancelLabel="Lanjutkan"
        onConfirm={onCancel}
        onCancel={() => setShowDiscardConfirm(false)}
      />
    </>
  );
};
