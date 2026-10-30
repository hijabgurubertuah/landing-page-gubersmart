/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.
 */

import React from 'react';
import { CmsSettings } from '../../types';

interface FooterProps {
  cms?: CmsSettings;
  onNavigate?: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="bg-[#07142b] text-white py-8 border-t border-[#c9a35a]/20 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#c9a35a_1px,transparent_1px)] [background-size:24px_24px]"></div>
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 text-center relative z-10">
        <p className="text-xs text-white/50 tracking-wide font-normal">
          Copyright @ 2027 GuberSmart
        </p>
      </div>
    </footer>
  );
};

