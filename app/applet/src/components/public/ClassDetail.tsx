/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.
 */

import React, { useState } from 'react';
import { ClassItem, CmsSettings } from '../../types';
import { ArrowLeft, MessageCircle, ChevronRight, CheckCircle, Calendar, Users, Award } from 'lucide-react';

interface ClassDetailProps {
  classItem: ClassItem;
  allClasses: ClassItem[];
  cms: CmsSettings;
  onBack: () => void;
  onSelectClass: (cls: ClassItem) => void;
  onRegisterClick: (classId: string, url: string) => void;
}

export const ClassDetail: React.FC<ClassDetailProps> = ({
  classItem,
  allClasses,
  cms,
  onBack,
  onSelectClass,
  onRegisterClick
}) => {
  const [openModuleIndex, setOpenModuleIndex] = useState<number | null>(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const getImageSrc = (img: { source: 'drive' | 'tautan'; value: string }) => {
    if (!img.value) return '';
    return img.source === 'tautan' ? img.value : `data:image/png;base64,${img.value}`;
  };

  const classImg = getImageSrc(classItem.image) || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80';
  const recommendations = allClasses.filter(c => c.id !== classItem.id && c.status === 'aktif');

  const handleWhatsAppChat = () => {
    const phone = cms.contact.whatsapp.replace(/[^0-9]/g, '');
    const msg = encodeURIComponent(`Assalamu alaikum, saya ingin bertanya tentang ${classItem.title}`);
    window.open(`https://wa.me/62${phone}?text=${msg}`, '_blank');
  };

  return (
    <div className="min-h-screen pt-24 pb-20 bg-[#f8f5ef]">
      <div className="max-w-[1000px] mx-auto px-4 md:px-8 space-y-8">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#a77d36] hover:text-[#07142b] transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali</span>
        </button>

        {/* Header Card */}
        <div className="bg-white rounded-[18px] p-6 md:p-10 shadow-xl border border-[#e7e1d5] grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-5 rounded-[14px] overflow-hidden aspect-[1.6/1] bg-[#f1ece2]">
            <img src={classImg} alt={classItem.title} className="w-full h-full object-cover" />
          </div>
          <div className="md:col-span-7 space-y-4">
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#1b2433]">{classItem.title}</h1>
            <p className="text-base text-[#4b5565] leading-relaxed">{classItem.fullDesc}</p>

            <div className="flex items-center gap-4 pt-2">
              <span className="text-sm text-[#6b7280] line-through">{classItem.normalPrice}</span>
              <span className="text-2xl font-bold text-[#1b2433]">{classItem.currentPrice}</span>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => onRegisterClick(classItem.id, classItem.lynkUrl)}
                className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#e8cd8f] via-[#c9a35a] to-[#a77d36] text-[#07142b] font-bold text-sm shadow-md transition hover:opacity-95"
              >
                Daftar Sekarang
              </button>
              <button
                onClick={handleWhatsAppChat}
                className="px-6 py-3.5 rounded-full border border-[#c9a35a] text-[#16a34a] font-bold text-sm hover:bg-[#16a34a]/10 transition flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Tanya Dulu</span>
              </button>
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Schedule & Quota */}
          <div className="bg-white rounded-[18px] p-6 shadow-md border border-[#e7e1d5] space-y-4">
            <h3 className="font-serif font-bold text-lg text-[#1b2433] flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#a77d36]" />
              <span>Jadwal & Kuota</span>
            </h3>
            <div className="space-y-2 text-sm text-[#4b5565]">
              <p><strong className="text-[#1b2433]">Jadwal:</strong> {classItem.schedule}</p>
              <p><strong className="text-[#1b2433]">Status Kursi:</strong> {classItem.quota}</p>
            </div>
          </div>

          {/* Outcomes */}
          <div className="bg-white rounded-[18px] p-6 shadow-md border border-[#e7e1d5] space-y-4">
            <h3 className="font-serif font-bold text-lg text-[#1b2433] flex items-center gap-2">
              <Award className="w-5 h-5 text-[#a77d36]" />
              <span>Hasil Akhir</span>
            </h3>
            <ul className="space-y-2 text-sm text-[#4b5565]">
              {classItem.outcomes.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-[#c9a35a] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Target Audience */}
        <div className="bg-white rounded-[18px] p-6 md:p-8 shadow-md border border-[#e7e1d5] space-y-4">
          <h3 className="font-serif font-bold text-xl text-[#1b2433] flex items-center gap-2">
            <Users className="w-5 h-5 text-[#a77d36]" />
            <span>Cocok Untuk Siapa</span>
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {classItem.targetAudience.map((item, idx) => (
              <li key={idx} className="p-4 rounded-[12px] bg-[#f8f5ef] border border-[#e7e1d5] text-sm text-[#4b5565]">
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Modules Accordion */}
        <div className="bg-white rounded-[18px] p-6 md:p-8 shadow-md border border-[#e7e1d5] space-y-4">
          <h3 className="font-serif font-bold text-xl text-[#1b2433]">Daftar Materi per Pertemuan</h3>
          <div className="space-y-3">
            {classItem.modules.map((mod, idx) => {
              const isOpen = openModuleIndex === idx;
              return (
                <div key={idx} className="border border-[#e7e1d5] rounded-[12px] overflow-hidden">
                  <button
                    onClick={() => setOpenModuleIndex(isOpen ? null : idx)}
                    className="w-full p-4 text-left font-serif font-bold text-base text-[#1b2433] flex items-center justify-between bg-[#f8f5ef] hover:bg-[#f1ece2] transition"
                  >
                    <span>{mod.title}</span>
                    <ChevronRight className={`w-4 h-4 text-[#a77d36] transition-transform ${isOpen ? 'rotate-90' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="p-4 text-sm text-[#4b5565] leading-relaxed bg-white border-t border-[#e7e1d5]">
                      {mod.content}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Class FAQ */}
        {classItem.classFaq && classItem.classFaq.length > 0 && (
          <div className="bg-white rounded-[18px] p-6 md:p-8 shadow-md border border-[#e7e1d5] space-y-4">
            <h3 className="font-serif font-bold text-xl text-[#1b2433]">Pertanyaan Seputar Kelas</h3>
            <div className="space-y-3">
              {classItem.classFaq.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div key={idx} className="border border-[#e7e1d5] rounded-[12px] overflow-hidden">
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full p-4 text-left font-serif font-semibold text-sm text-[#1b2433] flex items-center justify-between bg-[#f8f5ef] hover:bg-[#f1ece2] transition"
                    >
                      <span>{faq.q}</span>
                      <ChevronRight className={`w-4 h-4 text-[#a77d36] transition-transform ${isOpen ? 'rotate-90' : ''}`} />
                    </button>
                    {isOpen && (
                      <div className="p-4 text-sm text-[#4b5565] leading-relaxed bg-white border-t border-[#e7e1d5]">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <div className="space-y-6 pt-8">
            <h3 className="font-serif font-bold text-2xl text-[#1b2433]">Kelas Lainnya</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recommendations.map((cls) => {
                const recImg = getImageSrc(cls.image) || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80';
                return (
                  <div key={cls.id} className="bg-white rounded-[18px] overflow-hidden shadow-md border border-[#e7e1d5] flex items-center gap-4 p-4">
                    <div className="w-24 h-24 rounded-[12px] overflow-hidden bg-[#f1ece2] shrink-0">
                      <img src={recImg} alt={cls.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <h4 className="font-serif font-bold text-base text-[#1b2433] line-clamp-1">{cls.title}</h4>
                      <p className="text-sm font-bold text-[#1b2433]">{cls.currentPrice}</p>
                      <button
                        onClick={() => onSelectClass(cls)}
                        className="text-xs font-bold text-[#a77d36] hover:underline"
                      >
                        Lihat Detail
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
