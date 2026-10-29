/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.
 */

import React, { useState } from 'react';
import { TipItem, CmsSettings } from '../../types';
import { Search, ChevronRight, ArrowLeft } from 'lucide-react';

interface TipsListProps {
  tips: TipItem[];
  cms: CmsSettings;
  onSelectTip: (tip: TipItem) => void;
  onBackToHome: () => void;
}

export const TipsList: React.FC<TipsListProps> = ({ tips, cms, onSelectTip, onBackToHome }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  const publishedTips = tips.filter(t => t.status === 'terbit');
  const categories = ['Semua', ...Array.from(new Set(publishedTips.map(t => t.category)))];

  const filteredTips = publishedTips.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Semua' || t.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getImageSrc = (img: { source: 'drive' | 'tautan'; value: string }) => {
    if (!img.value) return '';
    return img.source === 'tautan' ? img.value : `data:image/png;base64,${img.value}`;
  };

  return (
    <div className="min-h-screen pt-24 pb-20 bg-[#f8f5ef]">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 space-y-8">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#a77d36] hover:text-[#07142b] transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Beranda</span>
        </button>

        <div className="space-y-4">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a77d36]">Tips dan Informasi</span>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#1b2433]">Semua Tips & Artikel</h1>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {cms.features.searchTips && (
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-[#6b7280]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari tips..."
                className="w-full pl-10 pr-4 py-2.5 rounded-[12px] border border-[#e7e1d5] bg-white text-sm focus:outline-none focus:border-[#c9a35a]"
              />
            </div>
          )}

          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition ${
                  selectedCategory === cat
                    ? 'bg-[#07142b] text-[#e8cd8f]'
                    : 'bg-white border border-[#e7e1d5] text-[#4b5565] hover:bg-[#f1ece2]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {filteredTips.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-[18px] border border-[#e7e1d5]">
            <p className="text-lg font-serif text-[#4b5565]">Belum ada tips</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTips.map((tip) => {
              const tipImg = getImageSrc(tip.thumbnail) || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80';
              return (
                <div key={tip.id} className="bg-white rounded-[18px] overflow-hidden shadow-md border border-[#e7e1d5] flex flex-col transition hover:shadow-xl hover:-translate-y-1">
                  <div className="relative aspect-[1.9/1] overflow-hidden bg-[#f1ece2]">
                    <img src={tipImg} alt={tip.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs text-[#a77d36] font-semibold">
                        <span>{tip.category}</span>
                        <span className="text-[#6b7280]">{tip.date}</span>
                      </div>
                      <h3 className="font-serif font-bold text-lg text-[#1b2433] leading-snug">{tip.title}</h3>
                      <p className="text-sm text-[#4b5565] line-clamp-2">{tip.summary}</p>
                    </div>
                    <button
                      onClick={() => onSelectTip(tip)}
                      className="text-sm font-bold text-[#a77d36] hover:text-[#07142b] transition flex items-center gap-1"
                    >
                      <span>Selengkapnya</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
