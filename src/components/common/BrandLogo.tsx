// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

import React, { useState } from 'react';

interface BrandLogoProps {
  logoUrl?: string;
  appName?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

const DEFAULT_LOGO = 'https://lh3.googleusercontent.com/d/1qRqIzkWTJOQ8K-XbgzsxYa09nvCnqNQ3';

export const BrandLogo: React.FC<BrandLogoProps> = ({
  logoUrl,
  appName = 'Guber Smart',
  size = 'md',
  showText = true,
  className = '',
}) => {
  const [imageError, setImageError] = useState(false);

  // Parse appName for stylized display (e.g. "Guber Smart" -> "GUBER" & "SMART")
  const parts = appName.trim().split(/\s+/);
  const line1 = parts[0] || 'GUBER';
  const line2 = parts.slice(1).join(' ') || (parts.length > 1 ? '' : 'SMART');

  const sizeClasses = {
    sm: {
      img: 'w-8 h-8',
      text1: 'text-[9px] tracking-[0.2em]',
      text2: 'text-sm tracking-[0.1em]',
    },
    md: {
      img: 'w-10 h-10',
      text1: 'text-[11px] tracking-[0.2em]',
      text2: 'text-lg tracking-[0.1em]',
    },
    lg: {
      img: 'w-12 h-12',
      text1: 'text-xs tracking-[0.2em]',
      text2: 'text-xl tracking-[0.1em]',
    },
  }[size];

  const finalLogoUrl = (logoUrl && logoUrl.trim() && !imageError) ? logoUrl : DEFAULT_LOGO;

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className={`relative rounded-full overflow-hidden border border-[#c9a35a]/60 flex-shrink-0 shadow-inner bg-[#07142b] ${sizeClasses.img}`}>
        <img
          src={finalLogoUrl}
          alt={appName}
          onError={() => setImageError(true)}
          className="w-full h-full object-cover"
        />
      </div>

      {showText && (
        <div className="flex flex-col leading-none">
          <span className={`font-serif text-white font-medium ${sizeClasses.text1}`}>
            {line1.toUpperCase()}
          </span>
          {line2 && (
            <span className={`font-serif text-[#e8cd8f] font-bold leading-tight ${sizeClasses.text2}`}>
              {line2.toUpperCase()}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

