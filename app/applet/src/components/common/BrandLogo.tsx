/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.
 */

import React from 'react';
import { CmsSettings } from '../../types';

interface BrandLogoProps {
  cms: CmsSettings;
  className?: string;
  darkText?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ cms, className = '', darkText = false }) => {
  const logoVal = cms.identity.logo.value;
  const appName = cms.identity.appName || 'Guber Smart';

  return (
    <div className={`flex items-center gap-3 cursor-pointer select-none ${className}`}>
      {logoVal ? (
        <img 
          src={logoVal.startsWith('http') ? logoVal : `data:image/png;base64,${logoVal}`} 
          alt={appName} 
          className="w-10 h-10 rounded-full object-cover border border-[#c9a35a]/40 shadow-sm"
        />
      ) : (
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#c9a35a] to-[#a77d36] flex items-center justify-center text-[#07142b] font-serif font-bold text-lg shadow-sm">
          GS
        </div>
      )}
      <div className="flex flex-col leading-tight">
        <span className="text-[11px] font-medium tracking-[0.2em] text-white/80 uppercase font-serif">
          GUBER
        </span>
        <span className={`text-lg font-bold font-serif ${darkText ? 'text-[#07142b]' : 'text-[#e8cd8f]'}`}>
          SMART
        </span>
      </div>
    </div>
  );
};
