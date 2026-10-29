/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.
 */

import React from 'react';
import { TipItem } from '../../types';
import { ArrowLeft, Calendar, User } from 'lucide-react';

interface TipDetailProps {
  tip: TipItem;
  onBack: () => void;
}

export const TipDetail: React.FC<TipDetailProps> = ({ tip, onBack }) => {
  const getImageSrc = (img: { source: 'drive' | 'tautan'; value: string }) => {
    if (!img.value) return '';
    return img.source === 'tautan' ? img.value : `data:image/png;base64,${img.value}`;
  };

  const thumbImg = getImageSrc(tip.thumbnail) || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80';

  return (
    <div className="min-h-screen pt-24 pb-20 bg-[#f8f5ef]">
      <div className="max-w-[820px] mx-auto px-4 md:px-8 space-y-8">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#a77d36] hover:text-[#07142b] transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali</span>
        </button>

        <article className="bg-white rounded-[18px] p-6 md:p-12 shadow-xl border border-[#e7e1d5] space-y-6">
          <div className="space-y-3">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a77d36]">{tip.category}</span>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#1b2433] leading-tight">{tip.title}</h1>
            <div className="flex items-center gap-4 text-xs text-[#6b7280] pt-2 border-b border-[#e7e1d5] pb-4">
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-[#c9a35a]" /> {tip.date}</span>
              <span className="flex items-center gap-1.5"><User className="w-4 h-4 text-[#c9a35a]" /> {tip.author}</span>
            </div>
          </div>

          <div className="rounded-[14px] overflow-hidden aspect-[1.9/1] bg-[#f1ece2]">
            <img src={thumbImg} alt={tip.title} className="w-full h-full object-cover" />
          </div>

          <div 
            className="prose prose-stone max-w-none text-[#1b2433] text-[16.5px] leading-[1.85] space-y-4"
            dangerouslySetInnerHTML={{ __html: tip.content }}
          />
        </article>
      </div>
    </div>
  );
};
