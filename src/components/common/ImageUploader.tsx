// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

import React, { useState, useRef, useEffect } from 'react';
import { Trash2, Loader2, RefreshCw, Check, Upload, Image as ImageIcon } from 'lucide-react';
import { StorageService } from '../../services/storageService';
import { GalleryFileItem } from '../../types';

interface ImageUploaderProps {
  label: string;
  value: string;
  onChange: (newVal: string) => void;
  className?: string;
}

// Client-side canvas compression to prevent huge payloads
function compressImageFile(
  file: File,
  maxDimension = 1200,
  quality = 0.8
): Promise<{ base64: string; mimeType: string }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve({ base64: event.target?.result as string, mimeType: file.type });
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        const mimeType = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
        const dataUrl = canvas.toDataURL(mimeType, quality);
        resolve({ base64: dataUrl, mimeType });
      };
      img.onerror = reject;
      img.src = event.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  label,
  value,
  onChange,
  className = '',
}) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'gallery' | 'url'>('upload');
  const [urlInput, setUrlInput] = useState(value.startsWith('http') ? value : '');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  // Inisialisasi langsung dengan galeri yang sudah tersimpan agar tidak pernah kosong
  const [galleryFiles, setGalleryFiles] = useState<GalleryFileItem[]>(() =>
    StorageService.getGalleryImages()
  );
  const [isLoadingGallery, setIsLoadingGallery] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Perbarui input URL jika value berubah dari luar
  useEffect(() => {
    if (value && value.startsWith('http')) {
      setUrlInput(value);
    }
  }, [value]);

  const loadGallery = async () => {
    // Tampilkan data lokal segera
    const local = StorageService.getGalleryImages();
    setGalleryFiles(local);
    setIsLoadingGallery(true);
    try {
      const files = await StorageService.getUploadedFiles();
      setGalleryFiles(files);
    } finally {
      setIsLoadingGallery(false);
    }
  };

  const handleTabChange = (tab: 'upload' | 'gallery' | 'url') => {
    setActiveTab(tab);
    if (tab === 'gallery') {
      loadGallery();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMessage('');
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'];
    if (!validTypes.includes(file.type)) {
      setErrorMessage('Format berkas tidak sesuai (gunakan JPG, PNG, WEBP, atau SVG)');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage('Ukuran berkas melebihi batas 5MB');
      return;
    }

    setIsLoading(true);

    try {
      const compressed = await compressImageFile(file, 1200, 0.8);
      const res = await StorageService.uploadImage(
        compressed.base64,
        file.name,
        compressed.mimeType
      );

      if (res.success && res.url) {
        onChange(res.url);
        // Segarkan galeri lokal segera agar gambar yang baru diunggah langsung muncul
        const updatedGallery = StorageService.getGalleryImages();
        setGalleryFiles(updatedGallery);
        setIsLoading(false);
      } else {
        setErrorMessage(res.error || 'Gagal mengunggah berkas');
        setIsLoading(false);
      }
    } catch {
      setErrorMessage('Gagal memproses berkas');
      setIsLoading(false);
    }
  };

  const handleApplyUrl = () => {
    if (urlInput.trim()) {
      const trimmed = urlInput.trim();
      onChange(trimmed);
      // Rekam juga URL yang dimasukkan ke galeri agar dapat digunakan kembali
      StorageService.saveGalleryImage({
        id: 'url_' + Date.now(),
        name: 'Tautan Gambar',
        url: trimmed,
        date: new Date().toISOString(),
        source: 'imported',
      });
      setGalleryFiles(StorageService.getGalleryImages());
    }
  };

  const handleClear = () => {
    onChange('');
    setUrlInput('');
    setErrorMessage('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDeleteFromGallery = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    StorageService.removeGalleryImage(id);
    setGalleryFiles((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-[#1b2433]">{label}</label>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/svg+xml"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Tabs */}
      <div className="flex border-b border-[#e7e1d5] gap-4 mb-2">
        <button
          type="button"
          onClick={() => handleTabChange('upload')}
          className={`pb-2 text-sm font-medium transition ${
            activeTab === 'upload'
              ? 'text-[#07142b] border-b-2 border-[#c9a35a]'
              : 'text-[#6b7280] hover:text-[#1b2433]'
          }`}
        >
          Unggah
        </button>
        <button
          type="button"
          onClick={() => handleTabChange('gallery')}
          className={`pb-2 text-sm font-medium transition ${
            activeTab === 'gallery'
              ? 'text-[#07142b] border-b-2 border-[#c9a35a]'
              : 'text-[#6b7280] hover:text-[#1b2433]'
          }`}
        >
          Galeri Drive
        </button>
        <button
          type="button"
          onClick={() => handleTabChange('url')}
          className={`pb-2 text-sm font-medium transition ${
            activeTab === 'url'
              ? 'text-[#07142b] border-b-2 border-[#c9a35a]'
              : 'text-[#6b7280] hover:text-[#1b2433]'
          }`}
        >
          Tautan
        </button>
      </div>

      {activeTab === 'upload' ? (
        <div className="flex items-center gap-3">
          <button
            type="button"
            disabled={isLoading}
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2 rounded-full border border-[#c9a35a] text-[#07142b] bg-white text-sm font-medium hover:bg-[#f8f5ef] transition inline-flex items-center gap-2 shadow-sm"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin text-[#c9a35a]" />
            ) : (
              <Upload className="w-4 h-4 text-[#c9a35a]" />
            )}
            <span>{isLoading ? 'Mengunggah...' : 'Pilih Gambar'}</span>
          </button>
        </div>
      ) : activeTab === 'gallery' ? (
        <div className="space-y-2">
          {/* Gallery Toolbar - Cukup tombol segarkan */}
          <div className="flex items-center justify-end text-xs text-[#6b7280] px-1">
            <button
              type="button"
              onClick={loadGallery}
              disabled={isLoadingGallery}
              className="inline-flex items-center gap-1.5 text-xs text-[#6b7280] hover:text-[#07142b] font-medium transition px-2.5 py-1 rounded-md hover:bg-[#07142b]/5"
              title="Segarkan Galeri Drive"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoadingGallery ? 'animate-spin text-[#c9a35a]' : ''}`} />
              <span>Segarkan</span>
            </button>
          </div>

          {galleryFiles.length === 0 ? (
            <div className="p-6 border border-dashed border-[#e7e1d5] rounded-xl text-center bg-[#f8f5ef] space-y-2">
              <ImageIcon className="w-8 h-8 mx-auto text-[#c9a35a]/50" />
              <p className="text-xs text-gray-500">
                Belum ada gambar di galeri. Gambar yang Anda unggah dari tab Unggah akan otomatis tersimpan di sini.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2.5 max-h-56 overflow-y-auto p-2.5 border border-[#e7e1d5] rounded-xl bg-[#f8f5ef]">
              {galleryFiles.map((file, idx) => {
                const isSelected = value === file.url;
                return (
                  <div
                    key={`${file.id}-${idx}`}
                    onClick={() => onChange(file.url)}
                    className={`relative group aspect-square rounded-lg overflow-hidden border-2 cursor-pointer transition bg-white shadow-sm ${
                      isSelected
                        ? 'border-[#c9a35a] ring-2 ring-[#c9a35a]/40 scale-[1.02]'
                        : 'border-[#e7e1d5] hover:border-[#c9a35a]/70 hover:shadow-md'
                    }`}
                    title={file.name}
                  >
                    <img
                      src={file.url}
                      alt={file.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />

                    {/* Selected badge */}
                    {isSelected && (
                      <div className="absolute top-1 left-1 w-5 h-5 rounded-full bg-[#c9a35a] text-[#07142b] flex items-center justify-center shadow">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    )}

                    {/* Source label */}
                    {file.source === 'drive' && (
                      <div className="absolute bottom-1 left-1 px-1 py-0.2 bg-[#07142b]/70 backdrop-blur-xs text-[9px] text-[#e8cd8f] rounded font-medium">
                        Drive
                      </div>
                    )}

                    {/* Delete hover action */}
                    <button
                      type="button"
                      onClick={(e) => handleDeleteFromGallery(e, file.id)}
                      className="absolute top-1 right-1 w-5 h-5 rounded-full bg-red-600/90 text-white opacity-0 group-hover:opacity-100 hover:bg-red-700 transition flex items-center justify-center shadow"
                      title="Hapus dari daftar galeri"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>

                    {/* Select overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-end p-1">
                      <span className="text-[10px] text-white font-medium truncate w-full">
                        {file.name}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <input
            type="url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="https://..."
            className="flex-1 rounded-xl border border-[#e7e1d5] px-3 py-2 text-sm text-[#1b2433] focus:border-[#c9a35a] focus:outline-none"
          />
          <button
            type="button"
            onClick={handleApplyUrl}
            className="px-4 py-2 rounded-full bg-[#0b1c38] text-white text-sm font-medium hover:bg-[#12284a] transition"
          >
            Terapkan
          </button>
        </div>
      )}

      {errorMessage && (
        <div className="text-xs text-red-600 mt-1">{errorMessage}</div>
      )}

      {/* Preview with Trash button */}
      {value && (
        <div className="flex items-center gap-3 pt-2">
          <div className="w-16 h-16 rounded-lg overflow-hidden border border-[#e7e1d5] bg-[#07142b]/5 relative group">
            <img src={value} alt="" className="w-full h-full object-cover" />
          </div>
          <button
            type="button"
            onClick={handleClear}
            className="p-2 text-red-600 hover:bg-red-50 rounded-full transition"
            aria-label="Hapus Gambar Terpilih"
            title="Hapus Gambar Terpilih"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

