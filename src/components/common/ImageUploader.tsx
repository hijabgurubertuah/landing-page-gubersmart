// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

import React, { useState, useRef } from 'react';
import { Trash2, Loader2 } from 'lucide-react';
import { StorageService } from '../../services/storageService';

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
  const [galleryFiles, setGalleryFiles] = useState<Array<{ id: string; name: string; url: string }>>([]);
  const [isLoadingGallery, setIsLoadingGallery] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadGallery = async () => {
    setIsLoadingGallery(true);
    const files = await StorageService.getUploadedFiles();
    setGalleryFiles(files);
    setIsLoadingGallery(false);
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
      setErrorMessage('Format berkas tidak sesuai');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage('Ukuran melebihi batas');
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
      onChange(urlInput.trim());
    }
  };

  const handleClear = () => {
    onChange('');
    setUrlInput('');
    setErrorMessage('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <label className="block text-sm font-medium text-[#1b2433]">{label}</label>

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
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/svg+xml"
            onChange={handleFileChange}
            className="hidden"
          />
          <button
            type="button"
            disabled={isLoading}
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2 rounded-full border border-[#c9a35a] text-[#07142b] bg-white text-sm font-medium hover:bg-[#f8f5ef] transition inline-flex items-center gap-2"
          >
            {isLoading && <Loader2 className="w-4 h-4 animate-spin text-[#c9a35a]" />}
            <span>Pilih Gambar</span>
          </button>
        </div>
      ) : activeTab === 'gallery' ? (
        <div className="space-y-3">
          {isLoadingGallery ? (
            <div className="flex items-center justify-center py-6">
              <Loader2 className="w-6 h-6 animate-spin text-[#c9a35a]" />
            </div>
          ) : galleryFiles.length === 0 ? (
            <div className="text-xs text-gray-500 py-4 text-center">
              Belum ada gambar tersimpan di Google Drive atau Apps Script belum terhubung. Unggah gambar baru terlebih dahulu.
            </div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-48 overflow-y-auto p-2 border border-[#e7e1d5] rounded-xl bg-[#f8f5ef]">
              {galleryFiles.map((file) => (
                <button
                  key={file.id}
                  type="button"
                  onClick={() => onChange(file.url)}
                  className={`relative group aspect-square rounded-lg overflow-hidden border-2 transition ${
                    value === file.url ? 'border-[#c9a35a] ring-2 ring-[#c9a35a]/30' : 'border-transparent hover:border-[#c9a35a]/60'
                  }`}
                  title={file.name}
                >
                  <img src={file.url} alt={file.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white text-[10px] p-1 text-center font-medium">
                    Pilih
                  </div>
                </button>
              ))}
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
          <div className="w-16 h-16 rounded-lg overflow-hidden border border-[#e7e1d5] bg-[#07142b]/5">
            <img src={value} alt="" className="w-full h-full object-cover" />
          </div>
          <button
            type="button"
            onClick={handleClear}
            className="p-2 text-red-600 hover:bg-red-50 rounded-full transition"
            aria-label="Hapus Gambar"
            title="Hapus Gambar"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

