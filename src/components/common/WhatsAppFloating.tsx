// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

import React, { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';

interface WhatsAppFloatingProps {
  phone?: string;
  defaultMsg?: string;
  isHomePage?: boolean;
}

export const WhatsAppFloating: React.FC<WhatsAppFloatingProps> = ({
  phone = '6285376604024',
  defaultMsg = "Assalamu'alaikum, saya ingin bertanya tentang kelas Guber Smart.",
  isHomePage = true,
}) => {
  const [isVisible, setIsVisible] = useState(!isHomePage);

  useEffect(() => {
    if (!isHomePage) {
      setIsVisible(true);
      return;
    }

    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(defaultMsg)}`;

  if (!isVisible) return null;

  return (
    <a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Hubungi WhatsApp"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#16a34a] hover:bg-[#15803d] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all duration-300"
    >
      <MessageCircle className="w-7 h-7" />
    </a>
  );
};
