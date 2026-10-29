// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

import React, { useEffect, useRef } from 'react';

interface AutoTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  value: string;
  onValueChange?: (val: string) => void;
}

export const AutoTextarea: React.FC<AutoTextareaProps> = ({
  value,
  onValueChange,
  className = '',
  rows = 2,
  ...props
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = () => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = 'auto';
      el.style.height = `${Math.max(el.scrollHeight, 44)}px`;
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [value]);

  return (
    <textarea
      ref={textareaRef}
      rows={rows}
      value={value}
      onChange={(e) => {
        onValueChange?.(e.target.value);
        props.onChange?.(e);
        adjustHeight();
      }}
      className={`w-full resize-none overflow-hidden rounded-xl border border-[#e7e1d5] bg-white px-4 py-3 text-base text-[#1b2433] focus:border-[#c9a35a] focus:outline-none transition ${className}`}
      {...props}
    />
  );
};
