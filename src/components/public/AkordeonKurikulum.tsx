// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { CurriculumMeeting } from '../../types';

interface AkordeonKurikulumProps {
  curriculum: CurriculumMeeting[];
}

export const AkordeonKurikulum: React.FC<AkordeonKurikulumProps> = ({ curriculum }) => {
  // Buka pertemuan pertama secara bawaan
  const [openMeetings, setOpenMeetings] = useState<Set<number>>(() => new Set([1]));

  if (!curriculum || curriculum.length === 0) return null;

  const toggleMeeting = (meetingNum: number) => {
    setOpenMeetings((prev) => {
      const next = new Set(prev);
      if (next.has(meetingNum)) {
        next.delete(meetingNum);
      } else {
        next.add(meetingNum);
      }
      return next;
    });
  };

  return (
    <div className="bg-white rounded-[18px] p-6 sm:p-8 shadow-sm border border-[#e7e1d5] space-y-5">
      <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#1b2433]">
        Materi Pembelajaran
      </h2>

      <div className="space-y-3">
        {curriculum.map((item) => {
          const isOpen = openMeetings.has(item.meeting);

          return (
            <div
              key={item.meeting}
              className="rounded-xl border border-[#e7e1d5] overflow-hidden bg-white"
            >
              <button
                type="button"
                onClick={() => toggleMeeting(item.meeting)}
                className="w-full p-4 text-left flex items-center justify-between gap-4 bg-[#f8f5ef]/50 hover:bg-[#f8f5ef] transition min-h-[48px]"
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full border border-[#c9a35a] text-[#a77d36] text-xs font-serif font-bold flex items-center justify-center flex-shrink-0">
                    {item.meeting}
                  </span>
                  <span className="font-semibold text-sm sm:text-base text-[#1b2433]">
                    {item.title}
                  </span>
                </div>

                <span className="text-[#a77d36]">
                  {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </span>
              </button>

              {isOpen && item.content && (
                <div className="p-4 text-sm text-[#4b5565] leading-relaxed border-t border-[#e7e1d5] bg-white whitespace-pre-line">
                  {item.content}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
