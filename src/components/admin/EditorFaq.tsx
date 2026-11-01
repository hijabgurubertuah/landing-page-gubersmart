// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { ClassFAQ } from '../../types';
import { AutoTextarea } from '../common/AutoTextarea';

interface EditorFaqProps {
  faqs: ClassFAQ[];
  onChange: (updated: ClassFAQ[]) => void;
}

export const EditorFaq: React.FC<EditorFaqProps> = ({ faqs, onChange }) => {
  const handleAddFaq = () => {
    onChange([...faqs, { q: '', a: '' }]);
  };

  const handleRemoveFaq = (index: number) => {
    onChange(faqs.filter((_, idx) => idx !== index));
  };

  const handleChangeField = (index: number, field: 'q' | 'a', val: string) => {
    const updated = [...faqs];
    updated[index] = { ...updated[index], [field]: val };
    onChange(updated);
  };

  return (
    <div className="space-y-3 pt-2 border-t border-[#e7e1d5]">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-[#1b2433]">FAQ Kelas</span>
        <button
          type="button"
          onClick={handleAddFaq}
          className="text-xs text-[#a77d36] font-semibold hover:underline flex items-center gap-1 min-h-[44px] px-2"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Tambah Pertanyaan</span>
        </button>
      </div>

      <div className="space-y-3">
        {faqs.map((f, idx) => (
          <div
            key={idx}
            className="p-3.5 bg-[#f8f5ef] rounded-xl border border-[#e7e1d5] space-y-2"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-bold text-[#1b2433]">
                Pertanyaan {idx + 1}
              </span>
              <button
                type="button"
                onClick={() => handleRemoveFaq(idx)}
                className="text-xs text-red-600 hover:underline flex items-center gap-1 min-h-[44px] px-2"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Hapus Pertanyaan</span>
              </button>
            </div>

            <input
              type="text"
              value={f.q || ''}
              onChange={(e) => handleChangeField(idx, 'q', e.target.value)}
              placeholder="Pertanyaan"
              className="w-full rounded-lg border border-[#e7e1d5] px-3 py-2 text-xs text-[#1b2433] bg-white focus:outline-none focus:border-[#c9a35a]"
            />

            <AutoTextarea
              value={f.a || ''}
              onValueChange={(val) => handleChangeField(idx, 'a', val)}
              rows={1}
              placeholder="Jawaban"
              className="text-xs"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
