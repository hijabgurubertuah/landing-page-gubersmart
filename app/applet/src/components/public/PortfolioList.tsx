/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.
 */

import React, { useState } from 'react';
import { PortfolioItem, CmsSettings } from '../../types';
import { ArrowLeft, ExternalLink } from 'lucide-react';

interface PortfolioListProps {
  portfolio: PortfolioItem[];
  cms: CmsSettings;
  onBack: () => void;
}

export const PortfolioList: React.FC<PortfolioListProps> = ({ portfolio, cms, onBack }) => {
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  const categories = ['Semua', ...Array.from(new Set(portfolio.map(p => p.category)))];

  const filteredPortfolio = portfolio.filter(p => {
    return selectedCategory === 'Semua' || p.category === selectedCategory;
  });

  const getImageSrc = (img: { source: 'drive' | 'tautan'; value: string }) => {
    if (!img.value) return '';
    return img.source === 'tautan' ? img.value : `data:image/png;base64,${img.value}`;
  };

  return (
    <div className="min-h-screen pt-24 pb-20 bg-[#f8f5ef]">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 space-y-8">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#a77d36] hover:text-[#07142b] transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Beranda</span>
        </button>

        <div className="space-y-4">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a77d36]">Karya Peserta</span>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#1b2433]">Semua Karya Aplikasi</h1>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
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

        {filteredPortfolio.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-[18px] border border-[#e7e1d5]">
            <p className="text-lg font-serif text-[#4b5565]">Belum ada karya</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredPortfolio.map((item) => {
              const portImg = getImageSrc(item.image) || 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=600&q=80';
              return (
                <a
                  key={item.id}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white rounded-[18px] overflow-hidden shadow-md border border-[#e7e1d5] block transition hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="relative aspect-[1.45/1] overflow-hidden bg-[#f1ece2]">
                    <img src={portImg} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  </div>
                  <div className="p-4 space-y-1">
                    <p className="text-xs text-[#a77d36] font-semibold">{item.category}</p>
                    <h3 className="font-serif font-bold text-base text-[#1b2433] group-hover:text-[#c9a35a] transition">{item.title}</h3>
                  </div>
                </a>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
