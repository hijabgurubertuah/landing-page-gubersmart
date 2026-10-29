/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.
 */

import React, { useState, useEffect } from 'react';
import { CmsSettings, ClassItem, TestimonialItem, PortfolioItem, TipItem, FaqItem } from '../../types';
import { MessageCircle, ArrowRight, ChevronRight, ChevronLeft, Calendar, User, Search, ExternalLink, CheckCircle } from 'lucide-react';

interface HomeProps {
  cms: CmsSettings;
  classes: ClassItem[];
  testimonials: TestimonialItem[];
  portfolio: PortfolioItem[];
  tips: TipItem[];
  faqs: FaqItem[];
  onSelectClass: (cls: ClassItem) => void;
  onSelectTip: (tip: TipItem) => void;
  onViewAllTips: () => void;
  onViewAllPortfolio: () => void;
  onRegisterClick: (classId?: string, url?: string) => void;
}

export const Home: React.FC<HomeProps> = ({
  cms,
  classes,
  testimonials,
  portfolio,
  tips,
  faqs,
  onSelectClass,
  onSelectTip,
  onViewAllTips,
  onViewAllPortfolio,
  onRegisterClick
}) => {
  const [showWaFloat, setShowWaFloat] = useState(false);
  const [activeTestiIndex, setActiveTestiIndex] = useState(0);
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowWaFloat(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const activeClasses = classes.filter(c => c.status === 'aktif');
  const publishedTips = tips.filter(t => t.status === 'terbit').slice(0, 3);
  const displayedTestimonials = testimonials.filter(t => t.status === 'tampil');

  const getImageSrc = (img: { source: 'drive' | 'tautan'; value: string }) => {
    if (!img.value) return '';
    return img.source === 'tautan' ? img.value : `data:image/png;base64,${img.value}`;
  };

  const heroImg = getImageSrc(cms.sections.find(s => s.id === 'hero')?.image || { source: 'tautan', value: '' }) ||
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80';

  const profilImg = getImageSrc(cms.sections.find(s => s.id === 'profil')?.image || { source: 'tautan', value: '' }) ||
    'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80';

  const keunggulanImg = getImageSrc(cms.sections.find(s => s.id === 'keunggulan-sec')?.image || { source: 'tautan', value: '' }) ||
    'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80';

  const ajakanImg = getImageSrc(cms.sections.find(s => s.id === 'ajakan')?.image || { source: 'tautan', value: '' }) ||
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80';

  const handleWhatsAppChat = () => {
    const phone = cms.contact.whatsapp.replace(/[^0-9]/g, '');
    const msg = encodeURIComponent(cms.contact.waMessage || 'Assalamu alaikum, saya ingin bertanya tentang kelas Guber Smart.');
    window.open(`https://wa.me/62${phone}?text=${msg}`, '_blank');
  };

  return (
    <div id="beranda" className="min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative min-h-[90vh] lg:min-h-screen flex items-center bg-[#07142b] text-white overflow-hidden pt-20 pb-16">
        <div className="absolute inset-0 z-0">
          <img src={heroImg} alt="Hero" className="w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#07142b] via-[#07142b]/90 to-transparent"></div>
        </div>

        <div className="max-w-[1200px] mx-auto px-4 md:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8 space-y-6">
            <span className="text-sm font-serif italic text-[#e8cd8f] tracking-wide block">
              Selamat Datang di Guber Smart
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight text-white">
              Belajar Membuat Aplikasi Hanya Bermodalkan Ide
            </h1>
            <p className="text-lg text-white/80 max-w-2xl leading-relaxed">
              Tanpa perlu paham koding. Ceritakan idenya, kami pandu sampai aplikasinya jadi dan bisa dipakai.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => onRegisterClick(undefined, cms.buttons.find(b => b.show)?.url || 'https://lynk.id/gubersmart')}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-[#e8cd8f] via-[#c9a35a] to-[#a77d36] text-[#07142b] font-bold text-base shadow-xl hover:opacity-95 transition flex items-center gap-2"
              >
                <span>Daftar Sekarang</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById('kelas');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-4 rounded-full border-2 border-[#c9a35a] text-[#e8cd8f] font-bold text-base hover:bg-[#c9a35a]/10 transition"
              >
                Lihat Kelas
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Pita Keunggulan (Overlapping Hero) */}
      <section className="relative z-20 max-w-[1100px] mx-auto px-4 -mt-16 md:-mt-20">
        <div className="bg-gradient-to-r from-[#0b1c38] to-[#12284a] rounded-[18px] p-6 md:p-8 shadow-2xl border border-[#c9a35a]/30 text-white grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
          <div className="border-r border-[#c9a35a]/20 last:border-0 pr-2">
            <p className="font-serif font-bold text-[#e8cd8f] text-base mb-1">Tanpa Koding</p>
            <p className="text-xs text-white/70">Cukup bawa ide Anda</p>
          </div>
          <div className="border-r border-[#c9a35a]/20 last:border-0 pr-2">
            <p className="font-serif font-bold text-[#e8cd8f] text-base mb-1">Dipandu Bertahap</p>
            <p className="text-xs text-white/70">Langkah demi langkah sampai jadi</p>
          </div>
          <div className="border-r border-[#c9a35a]/20 last:border-0 pr-2">
            <p className="font-serif font-bold text-[#e8cd8f] text-base mb-1">Praktik Langsung</p>
            <p className="text-xs text-white/70">Belajar sambil membangun</p>
          </div>
          <div className="border-r border-[#c9a35a]/20 last:border-0 pr-2">
            <p className="font-serif font-bold text-[#e8cd8f] text-base mb-1">Aplikasi Sungguhan</p>
            <p className="text-xs text-white/70">Hasil akhir yang bisa dipakai</p>
          </div>
          <div className="col-span-2 md:col-span-1">
            <p className="font-serif font-bold text-[#e8cd8f] text-base mb-1">Komunitas Member</p>
            <p className="text-xs text-white/70">Belajar bersama, saling bantu</p>
          </div>
        </div>
        <div className="w-3/4 mx-auto h-[1px] bg-gradient-to-r from-transparent via-[#c9a35a] to-transparent mt-6"></div>
      </section>

      {/* 3. Profil Section */}
      <section id="profil" className="py-20 max-w-[1200px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a77d36]">Tentang Kami</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1b2433] leading-tight">
              Mengubah Ide Menjadi Aplikasi, Tanpa Pusing Koding
            </h2>
            <p className="text-base text-[#4b5565] leading-relaxed">
              Guber Smart hadir untuk menjembatani kreativitas Anda dengan teknologi modern. Kami percaya setiap orang berhak memiliki aplikasi sendiri untuk mempermudah pekerjaan, pendidikan, maupun usaha.
            </p>
            <button
              onClick={() => {
                const el = document.getElementById('visi-misi');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-[#e8cd8f] via-[#c9a35a] to-[#a77d36] text-[#07142b] font-bold text-sm shadow-md transition hover:opacity-95"
            >
              Selengkapnya
            </button>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#c9a35a]/20 rounded-[18px] pointer-events-none"></div>
            <div className="relative rounded-[18px] overflow-hidden shadow-2xl border border-[#e7e1d5] aspect-[1.25/1]">
              <img src={profilImg} alt="Profil Guber Smart" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -right-4 md:-right-6 bg-[#07142b] text-white p-6 rounded-[18px] shadow-2xl border border-[#c9a35a]/40 max-w-xs">
              <p className="font-serif italic text-[#e8cd8f] text-sm mb-2">
                "Setiap orang punya ide hebat. Tugas kami memastikan ide itu menjadi aplikasi nyata."
              </p>
              <div className="w-8 h-[1px] bg-[#c9a35a]"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Visi dan Misi */}
      <section id="visi-misi" className="py-16 bg-[#f1ece2]">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Visi Card */}
          <div className="bg-[#07142b] text-white rounded-[18px] p-8 shadow-xl border border-[#c9a35a]/30 relative overflow-hidden">
            <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#c9a35a_1px,transparent_1px)] [background-size:16px_16px]"></div>
            <div className="relative z-10 space-y-4">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#e8cd8f]">VISI</span>
              <h3 className="text-2xl font-serif font-bold text-white">Wujud Nyata Kreativitas</h3>
              <p className="text-white/80 leading-relaxed text-base">
                Menjadikan setiap orang mampu mewujudkan idenya menjadi aplikasi nyata tanpa harus memahami koding.
              </p>
            </div>
          </div>

          {/* Misi Card */}
          <div className="bg-white rounded-[18px] p-8 shadow-xl border border-[#e7e1d5] space-y-4">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a77d36]">MISI</span>
            <h3 className="text-2xl font-serif font-bold text-[#1b2433]">Langkah Strategis Kami</h3>
            <ul className="space-y-3 text-sm text-[#4b5565]">
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full border border-[#c9a35a] text-[#a77d36] font-bold text-xs flex items-center justify-center shrink-0">1</span>
                <span>Menyediakan pembelajaran membuat aplikasi yang sederhana dan mudah diikuti oleh siapa saja.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full border border-[#c9a35a] text-[#a77d36] font-bold text-xs flex items-center justify-center shrink-0">2</span>
                <span>Memandu peserta dari ide sampai aplikasi jadi lewat langkah yang jelas.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full border border-[#c9a35a] text-[#a77d36] font-bold text-xs flex items-center justify-center shrink-0">3</span>
                <span>Membekali peserta dengan prompt dan metode yang siap dipakai.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full border border-[#c9a35a] text-[#a77d36] font-bold text-xs flex items-center justify-center shrink-0">4</span>
                <span>Membangun komunitas yang saling mendukung dalam berkarya.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 5. Kelas (Program Kelas) */}
      <section id="kelas" className="py-20 max-w-[1200px] mx-auto px-4 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a77d36]">Program Kelas</span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1b2433]">Pilih Kelas Anda</h2>
          <p className="text-sm text-[#4b5565]">Temukan kelas yang sesuai dengan kebutuhan dan impian digital Anda.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activeClasses.map((cls) => {
            const classImg = getImageSrc(cls.image) || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80';
            return (
              <div key={cls.id} className="bg-white rounded-[18px] overflow-hidden shadow-lg border border-[#e7e1d5] flex flex-col transition hover:shadow-2xl hover:-translate-y-1">
                <div className="relative aspect-[1.6/1] bg-[#f1ece2] overflow-hidden">
                  <img src={classImg} alt={cls.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  {cls.quota && (
                    <span className="absolute top-3 right-3 bg-[#07142b]/80 backdrop-blur-sm text-[#e8cd8f] text-xs px-3 py-1 rounded-full font-medium">
                      {cls.quota}
                    </span>
                  )}
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-serif font-bold text-[#1b2433]">{cls.title}</h3>
                    <p className="text-sm text-[#4b5565] line-clamp-2">{cls.shortDesc}</p>
                  </div>

                  <div className="space-y-4 pt-2 border-t border-[#e7e1d5]">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xs text-[#6b7280] line-through">{cls.normalPrice}</span>
                      <span className="text-lg font-bold text-[#1b2433]">{cls.currentPrice}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => onSelectClass(cls)}
                        className="py-2.5 rounded-full border border-[#c9a35a] text-[#1b2433] font-medium text-xs hover:bg-[#f8f5ef] transition text-center"
                      >
                        Lihat Detail
                      </button>
                      <button
                        onClick={() => onRegisterClick(cls.id, cls.lynkUrl)}
                        className="py-2.5 rounded-full bg-gradient-to-r from-[#e8cd8f] via-[#c9a35a] to-[#a77d36] text-[#07142b] font-bold text-xs shadow-md transition hover:opacity-95 text-center"
                      >
                        Daftar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. Alur Belajar */}
      <section className="py-16 bg-[#f1ece2]">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a77d36]">Cara Belajar</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1b2433]">Empat Langkah Menjadi Aplikasi</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-[18px] p-6 shadow-md border border-[#e7e1d5] text-center space-y-3">
              <div className="w-10 h-10 mx-auto rounded-full border-2 border-[#c9a35a] text-[#a77d36] font-bold flex items-center justify-center font-serif text-lg">1</div>
              <h4 className="font-serif font-bold text-lg text-[#1b2433]">Tulis Ide</h4>
              <p className="text-sm text-[#4b5565]">Sampaikan apa yang ingin Anda buat dengan bahasa sederhana.</p>
            </div>
            <div className="bg-white rounded-[18px] p-6 shadow-md border border-[#e7e1d5] text-center space-y-3">
              <div className="w-10 h-10 mx-auto rounded-full border-2 border-[#c9a35a] text-[#a77d36] font-bold flex items-center justify-center font-serif text-lg">2</div>
              <h4 className="font-serif font-bold text-lg text-[#1b2433]">Susun Prompt</h4>
              <p className="text-sm text-[#4b5565]">Gunakan panduan instruksi siap pakai yang kami sediakan.</p>
            </div>
            <div className="bg-white rounded-[18px] p-6 shadow-md border border-[#e7e1d5] text-center space-y-3">
              <div className="w-10 h-10 mx-auto rounded-full border-2 border-[#c9a35a] text-[#a77d36] font-bold flex items-center justify-center font-serif text-lg">3</div>
              <h4 className="font-serif font-bold text-lg text-[#1b2433]">Bangun Aplikasi</h4>
              <p className="text-sm text-[#4b5565]">Sistem memproses dan mewujudkan aplikasi Anda seketika.</p>
            </div>
            <div className="bg-white rounded-[18px] p-6 shadow-md border border-[#e7e1d5] text-center space-y-3">
              <div className="w-10 h-10 mx-auto rounded-full border-2 border-[#c9a35a] text-[#a77d36] font-bold flex items-center justify-center font-serif text-lg">4</div>
              <h4 className="font-serif font-bold text-lg text-[#1b2433]">Publikasikan</h4>
              <p className="text-sm text-[#4b5565]">Bagikan tautan atau file aplikasi Anda ke siapa saja.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Keunggulan Section */}
      <section id="keunggulan" className="py-20 bg-[#07142b] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#c9a35a_1px,transparent_1px)] [background-size:20px_20px]"></div>
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 relative">
            <div className="rounded-[18px] overflow-hidden shadow-2xl border border-[#c9a35a]/40 aspect-[1.15/1]">
              <img src={keunggulanImg} alt="Keunggulan" className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#e8cd8f]">Keunggulan</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white">
              Belajar Lebih Mudah dengan Dukungan Lengkap
            </h2>
            <p className="text-base text-white/80 leading-relaxed">
              Nikmati fasilitas belajar terpadu yang membimbing Anda dari nol sampai mahir tanpa hambatan.
            </p>

            <div className="space-y-3 pt-2">
              {[
                'Materi Bertahap',
                'Prompt Siap Pakai',
                'Bimbingan Member',
                'Komunitas Belajar',
                'Praktik Langsung'
              ].map((item, idx) => (
                <div key={idx} className="p-4 rounded-[12px] bg-[#0b1c38] border border-[#c9a35a]/30 flex items-center justify-between">
                  <span className="font-serif font-semibold text-[#e8cd8f]">{item}</span>
                  <CheckCircle className="w-5 h-5 text-[#c9a35a]" />
                </div>
              ))}
            </div>

            <div className="pt-4">
              <button
                onClick={() => {
                  const el = document.getElementById('karya');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#e8cd8f] via-[#c9a35a] to-[#a77d36] text-[#07142b] font-bold text-sm shadow-lg hover:opacity-95 transition"
              >
                Lihat Karya
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Karya Peserta */}
      {cms.features.portfolio && (
        <section id="karya" className="py-20 max-w-[1200px] mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div className="space-y-3">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a77d36]">Karya Peserta</span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1b2433]">Aplikasi yang Lahir dari Ide Peserta</h2>
            </div>
            <button
              onClick={onViewAllPortfolio}
              className="text-sm font-bold text-[#a77d36] hover:text-[#07142b] transition flex items-center gap-1 self-start md:self-auto"
            >
              <span>Lihat Semua Karya</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {portfolio.slice(0, 4).map((item) => {
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
        </section>
      )}

      {/* 9. Testimoni */}
      {cms.features.testimonials && displayedTestimonials.length > 0 && (
        <section className="py-20 bg-[#f1ece2]">
          <div className="max-w-[1200px] mx-auto px-4 md:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a77d36]">Testimoni</span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1b2433]">Kata Mereka yang Sudah Belajar</h2>
            </div>

            <div className="relative max-w-3xl mx-auto">
              <div className="bg-white rounded-[18px] p-8 md:p-10 shadow-xl border border-[#e7e1d5] text-center space-y-6">
                <p className="text-lg md:text-xl font-serif italic text-[#1b2433] leading-relaxed">
                  "{displayedTestimonials[activeTestiIndex]?.quote}"
                </p>
                <div>
                  <h4 className="font-serif font-bold text-lg text-[#1b2433]">{displayedTestimonials[activeTestiIndex]?.name}</h4>
                  <p className="text-xs text-[#6b7280]">{displayedTestimonials[activeTestiIndex]?.role}</p>
                </div>
              </div>

              <div className="flex justify-center items-center gap-4 mt-6">
                <button
                  onClick={() => setActiveTestiIndex((prev) => (prev === 0 ? displayedTestimonials.length - 1 : prev - 1))}
                  className="w-10 h-10 rounded-full bg-white border border-[#e7e1d5] text-[#1b2433] flex items-center justify-center shadow hover:bg-[#f8f5ef] transition"
                  aria-label="Sebelumnya"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="flex gap-2">
                  {displayedTestimonials.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveTestiIndex(idx)}
                      className={`w-2.5 h-2.5 rounded-full transition ${idx === activeTestiIndex ? 'bg-[#c9a35a] w-6' : 'bg-[#e7e1d5]'}`}
                      aria-label={`Testimoni ${idx + 1}`}
                    />
                  ))}
                </div>
                <button
                  onClick={() => setActiveTestiIndex((prev) => (prev === displayedTestimonials.length - 1 ? 0 : prev + 1))}
                  className="w-10 h-10 rounded-full bg-white border border-[#e7e1d5] text-[#1b2433] flex items-center justify-center shadow hover:bg-[#f8f5ef] transition"
                  aria-label="Berikutnya"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 10. Tips dan Informasi */}
      {cms.features.tips && (
        <section id="tips" className="py-20 max-w-[1200px] mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div className="space-y-3">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a77d36]">Tips dan Informasi</span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1b2433]">Update Terbaru</h2>
            </div>
            <button
              onClick={onViewAllTips}
              className="text-sm font-bold text-[#a77d36] hover:text-[#07142b] transition flex items-center gap-1 self-start md:self-auto"
            >
              <span>Lihat Semua Tips</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {publishedTips.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-[18px] border border-[#e7e1d5]">
              <p className="text-base font-serif text-[#4b5565]">Belum ada tips</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {publishedTips.map((tip) => {
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
        </section>
      )}

      {/* 11. FAQ */}
      {cms.features.faq && (
        <section className="py-20 bg-[#f1ece2]">
          <div className="max-w-4xl mx-auto px-4 md:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a77d36]">Pertanyaan</span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1b2433]">Yang Sering Ditanyakan</h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq) => {
                const isOpen = openFaqId === faq.id;
                return (
                  <div key={faq.id} className="bg-white rounded-[18px] border border-[#e7e1d5] overflow-hidden shadow-sm">
                    <button
                      onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                      className="w-full p-6 text-left font-serif font-bold text-lg text-[#1b2433] flex items-center justify-between gap-4 transition hover:bg-[#f8f5ef]"
                    >
                      <span>{faq.question}</span>
                      <ChevronRight className={`w-5 h-5 text-[#a77d36] transition-transform ${isOpen ? 'rotate-90' : ''}`} />
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-6 text-sm text-[#4b5565] leading-relaxed border-t border-[#e7e1d5] pt-4">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 12. Ajakan (Call to Action) */}
      <section className="py-20 max-w-[1200px] mx-auto px-4 md:px-8">
        <div className="relative rounded-[18px] overflow-hidden bg-[#07142b] text-white p-8 md:p-16 shadow-2xl border border-[#c9a35a]/40">
          <div className="absolute inset-0 z-0">
            <img src={ajakanImg} alt="Ajakan" className="w-full h-full object-cover opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#07142b] via-[#07142b]/90 to-transparent"></div>
          </div>

          <div className="relative z-10 max-w-2xl space-y-6">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#e8cd8f]">Pendaftaran Dibuka</span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white leading-tight">
              Bergabunglah Bersama Guber Smart
            </h2>
            <p className="text-base text-white/80 leading-relaxed">
              Mulai perjalanan digital Anda hari ini dan wujudkan aplikasi impian tanpa hambatan.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => onRegisterClick(undefined, cms.buttons.find(b => b.show)?.url || 'https://lynk.id/gubersmart')}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-[#e8cd8f] via-[#c9a35a] to-[#a77d36] text-[#07142b] font-bold text-base shadow-xl hover:opacity-95 transition"
              >
                Daftar Sekarang
              </button>
              {cms.features.askWa && (
                <button
                  onClick={handleWhatsAppChat}
                  className="px-8 py-4 rounded-full border-2 border-[#c9a35a] text-[#e8cd8f] font-bold text-base hover:bg-[#c9a35a]/10 transition"
                >
                  Tanya Dulu
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 13. Kontak */}
      <section id="kontak" className="py-20 bg-[#f1ece2]">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a77d36]">Kontak</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1b2433]">Hubungi Kami</h2>
            <p className="text-sm text-[#4b5565]">Kami siap membantu menjawab pertanyaan Anda.</p>
          </div>

          <div className="max-w-xl mx-auto bg-white rounded-[18px] p-8 shadow-xl border border-[#e7e1d5] space-y-6 text-center">
            <div className="p-4 rounded-[12px] bg-[#f8f5ef] border border-[#e7e1d5] space-y-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#6b7280]">WhatsApp</p>
              <a
                href={`https://wa.me/62${cms.contact.whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-bold text-[#16a34a] hover:underline inline-flex items-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                <span>{cms.contact.whatsapp}</span>
              </a>
            </div>

            <div className="p-4 rounded-[12px] bg-[#f8f5ef] border border-[#e7e1d5] space-y-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#6b7280]">Jam Layanan</p>
              <p className="text-sm font-semibold text-[#1b2433]">{cms.contact.serviceHours}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp Button */}
      {cms.features.floatingWa && showWaFloat && (
        <button
          onClick={handleWhatsAppChat}
          aria-label="WhatsApp"
          className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-[#16a34a] text-white flex items-center justify-center shadow-2xl hover:bg-[#15803d] transition-all animate-bounce"
        >
          <MessageCircle className="w-7 h-7" />
        </button>
      )}
    </div>
  );
};
