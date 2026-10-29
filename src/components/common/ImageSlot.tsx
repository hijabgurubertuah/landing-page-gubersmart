// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

import React, { useState } from 'react';

interface ImageSlotProps {
  src?: string;
  alt?: string;
  className?: string;
  aspectRatio?: string;
}

export const ImageSlot: React.FC<ImageSlotProps> = ({
  src,
  alt = '',
  className = '',
  aspectRatio,
}) => {
  const [hasError, setHasError] = useState(false);

  const isImageEmpty = !src || src.trim() === '' || hasError;

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      {isImageEmpty ? (
        <div className="w-full h-full min-h-[160px] bg-gradient-to-br from-[#07142b] via-[#0b1c38] to-[#1b365f] flex items-center justify-center border border-[#c9a35a]/15">
          <div className="w-12 h-12 rounded-full border border-[#c9a35a]/25 flex items-center justify-center opacity-40">
            <div className="w-5 h-5 border border-[#e8cd8f]/40 rotate-45" />
          </div>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          onError={() => setHasError(true)}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          loading="lazy"
        />
      )}
    </div>
  );
};
