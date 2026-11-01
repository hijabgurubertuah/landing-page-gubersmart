// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { CurriculumMeeting } from '../../types';
import { AutoTextarea } from '../common/AutoTextarea';

interface EditorPertemuanProps {
  curriculum: CurriculumMeeting[];
  onChange: (updated: CurriculumMeeting[]) => void;
}

export const EditorPertemuan: React.FC<EditorPertemuanProps> = ({
  curriculum,
  onChange,
}) => {
  const handleAddMeeting = () => {
    const nextMeetingNum = curriculum.length + 1;
    const updated = [
      ...curriculum,
      {
        meeting: nextMeetingNum,
        title: `Pertemuan ${nextMeetingNum}`,
        content: '',
      },
    ];
    onChange(updated);
  };

  const handleRemoveMeeting = (index: number) => {
    const filtered = curriculum.filter((_, idx) => idx !== index);
    // Renumber remaining meetings
    const renumbered = filtered.map((c, idx) => ({
      ...c,
      meeting: idx + 1,
    }));
    onChange(renumbered);
  };

  const handleChangeField = (index: number, field: 'title' | 'content', val: string) => {
    const updated = [...curriculum];
    updated[index] = { ...updated[index], [field]: val };
    onChange(updated);
  };

  return (
    <div className="space-y-3 pt-2 border-t border-[#e7e1d5]">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-[#1b2433]">Materi Pertemuan</span>
        <button
          type="button"
          onClick={handleAddMeeting}
          className="text-xs text-[#a77d36] font-semibold hover:underline flex items-center gap-1 min-h-[44px] px-2"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Tambah Pertemuan</span>
        </button>
      </div>

      <div className="space-y-3">
        {curriculum.map((curr, idx) => (
          <div
            key={idx}
            className="p-3.5 bg-[#f8f5ef] rounded-xl border border-[#e7e1d5] space-y-2"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-bold text-[#a77d36]">
                Pertemuan {curr.meeting}
              </span>
              <button
                type="button"
                onClick={() => handleRemoveMeeting(idx)}
                className="text-xs text-red-600 hover:underline flex items-center gap-1 min-h-[44px] px-2"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Hapus Pertemuan</span>
              </button>
            </div>

            <input
              type="text"
              value={curr.title || ''}
              onChange={(e) => handleChangeField(idx, 'title', e.target.value)}
              placeholder="Judul Materi"
              className="w-full rounded-lg border border-[#e7e1d5] px-3 py-2 text-xs text-[#1b2433] bg-white focus:outline-none focus:border-[#c9a35a]"
            />

            <AutoTextarea
              value={curr.content || ''}
              onValueChange={(val) => handleChangeField(idx, 'content', val)}
              rows={1}
              placeholder="Ringkasan Materi"
              className="text-xs"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
