/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.
 */

import React, { useState, useEffect } from 'react';
import { Trash2, Upload, Link as LinkIcon, Image as ImageIcon, X, Check } from 'lucide-react';

interface ImageSlotProps {
  value: { source: 'drive' | 'tautan'; value: string };
  onChange: (val: { source: 'drive' | 'tautan'; value: string }) => void;
  label?: string;
}

export const ImageSlot: React.FC<ImageSlotProps> = ({ value, onChange, label }) => {
  const [mode, setMode] = useState<'unggah' | 'tautan' | 'galeri'>(value.source === 'tautan' ? 'tautan' : 'unggah');
  const [urlInput, setUrlInput] = useState(value.source === 'tautan' ? value.value : '');
  const [loading, setLoading] = useState(false);
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [galleryImages, setGalleryImages] = useState<{ source: 'drive' | 'tautan'; value: string }[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('guber_image_gallery');
      if (stored) {
        setGalleryImages(JSON.parse(stored));
      }
    } catch {
      setGalleryImages([]);
    }
  }, []);

  const addToGallery = (img: { source: 'drive' | 'tautan'; value: string }) => {
    if (!img.value) return;
    try {
      const stored = localStorage.getItem('guber_image_gallery');
      let list: { source: 'drive' | 'tautan'; value: string }[] = stored ? JSON.parse(stored) : [];
      // check if exists
      if (!list.some(item => item.value === img.value)) {
        list = [img, ...list];
        localStorage.setItem('guber_image_gallery', JSON.stringify(list));
        setGalleryImages(list);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert('Ukuran file maksimal 5 MB');
      return;
    }
    setLoading(true);
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = (reader.result as string).split(',')[1] || '';
      const newVal = { source: 'drive' as const, value: base64String };
      onChange(newVal);
      addToGallery(newVal);
      setLoading(false);
    };
    reader.onerror = () => {
      setLoading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleUrlSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setUrlInput(val);
    const newVal = { source: 'tautan' as const, value: val };
    onChange(newVal);
    if (val) {
      addToGallery(newVal);
    }
  };

  const handleClear = () => {
    setUrlInput('');
    onChange({ source: 'tautan', value: '' });
  };

  const currentPreview = value.value
    ? value.source === 'tautan'
      ? value.value
      : `data:image/png;base64,${value.value}`
    : '';

  return (
    <div className="space-y-2">
      {label && <label className="block text-xs font-semibold uppercase tracking-wider text-[#4b5565]">{label}</label>}
      <div className="flex gap-2 mb-2 flex-wrap">
        <button
          type="button"
          onClick={() => setMode('unggah')}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${mode === 'unggah' ? 'bg-[#07142b] text-[#e8cd8f]' : 'bg-[#f1ece2] text-[#4b5565]'}`}
        >
          Unggah
        </button>
        <button
          type="button"
          onClick={() => setMode('tautan')}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${mode === 'tautan' ? 'bg-[#07142b] text-[#e8cd8f]' : 'bg-[#f1ece2] text-[#4b5565]'}`}
        >
          Tautan
        </button>
        <button
          type="button"
          onClick={() => {
            setMode('galeri');
            setShowGalleryModal(true);
          }}
          className="px-3 py-1.5 rounded-full text-xs font-medium transition bg-[#f1ece2] text-[#4b5565] hover:bg-[#e7e1d5] flex items-center gap-1"
        >
          <ImageIcon className="w-3.5 h-3.5 text-[#c9a35a]" />
          <span>Galeri Drive</span>
        </button>
      </div>

      <div className="flex items-center gap-4">
        {mode === 'unggah' && (
          <div className="flex-1">
            <label className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-[12px] border border-dashed border-[#c9a35a]/60 bg-[#f8f5ef] hover:bg-[#f1ece2] cursor-pointer text-sm text-[#1b2433] transition">
              <Upload className="w-4 h-4 text-[#c9a35a]" />
              <span>{loading ? 'Memproses...' : 'Pilih Gambar'}</span>
              <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
            </label>
          </div>
        )}

        {mode === 'tautan' && (
          <div className="flex-1 relative">
            <LinkIcon className="absolute left-3 top-3 w-4 h-4 text-[#6b7280]" />
            <input
              type="text"
              value={urlInput}
              onChange={handleUrlSubmit}
              placeholder="https://..."
              className="w-full pl-9 pr-3 py-2 text-sm rounded-[12px] border border-[#e7e1d5] bg-white focus:outline-none focus:border-[#c9a35a]"
            />
          </div>
        )}

        {mode === 'galeri' && (
          <div className="flex-1">
            <button
              type="button"
              onClick={() => setShowGalleryModal(true)}
              className="w-full py-2.5 px-4 rounded-[12px] border border-[#c9a35a] bg-[#f8f5ef] text-[#1b2433] text-sm font-medium hover:bg-[#f1ece2] flex items-center justify-center gap-2"
            >
              <ImageIcon className="w-4 h-4 text-[#c9a35a]" />
              <span>Pilih dari Galeri Tersimpan</span>
            </button>
          </div>
        )}

        {currentPreview && (
          <div className="relative w-14 h-14 rounded-[10px] overflow-hidden border border-[#e7e1d5] bg-[#f1ece2] shrink-0 group">
            <img src={currentPreview} alt="Pratinjau" className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={handleClear}
              className="absolute inset-0 bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
              title="Hapus Gambar"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Gallery Picker Modal */}
      {showGalleryModal && (
        <div className="fixed inset-0 z-50 bg-[#07142b]/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[18px] max-w-xl w-full max-h-[80vh] overflow-y-auto p-6 shadow-2xl border border-[#e7e1d5] space-y-4">
            <div className="flex items-center justify-between border-b border-[#e7e1d5] pb-3">
              <h3 className="text-lg font-serif font-bold text-[#1b2433]">Pilih Gambar dari Galeri</h3>
              <button onClick={() => setShowGalleryModal(false)} className="p-1.5 rounded-full hover:bg-[#f8f5ef]">
                <X className="w-5 h-5 text-[#6b7280]" />
              </button>
            </div>

            {galleryImages.length === 0 ? (
              <p className="text-sm text-center text-[#6b7280] py-8">Belum ada gambar tersimpan di galeri</p>
            ) : (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {galleryImages.map((img, idx) => {
                  const src = img.source === 'tautan' ? img.value : `data:image/png;base64,${img.value}`;
                  const isSelected = value.value === img.value;
                  return (
                    <div
                      key={idx}
                      onClick={() => {
                        onChange(img);
                        if (img.source === 'tautan') setUrlInput(img.value);
                        setShowGalleryModal(false);
                      }}
                      className={`relative aspect-square rounded-[10px] overflow-hidden border-2 cursor-pointer transition group bg-[#f1ece2] ${
                        isSelected ? 'border-[#c9a35a] ring-2 ring-[#c9a35a]/50' : 'border-[#e7e1d5] hover:border-[#c9a35a]'
                      }`}
                    >
                      <img src={src} alt={`Galeri ${idx}`} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white">
                        <Check className="w-6 h-6" />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setShowGalleryModal(false)}
                className="px-4 py-2 rounded-full border border-[#e7e1d5] text-[#4b5565] text-xs font-medium hover:bg-[#f8f5ef]"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
