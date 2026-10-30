// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

import React from 'react';
import { CMSSettings, UserRole } from '../../types';

interface FooterProps {
  cms?: CMSSettings;
  currentRole?: UserRole;
  onNavigate?: (target: string) => void;
  onOpenLogin?: () => void;
}

export const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="relative bg-[#07142b] text-[#e7e1d5] py-8 overflow-hidden border-t border-[#c9a35a]/20 bg-islamic-pattern">
      <div className="max-w-[1200px] 2xl:max-w-[1320px] mx-auto px-4 sm:px-6 text-center">
        <p className="text-xs text-gray-400 tracking-wide font-normal">
          Copyright @ 2027 GuberSmart
        </p>
      </div>
    </footer>
  );
};

