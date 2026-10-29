// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

import React, { useEffect } from 'react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, 500); // Tepat 0.5 detik (500 ms) sesuai aturan
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] pointer-events-none">
      <div className="animate-toast-500ms px-5 py-2.5 bg-[#0b1c38] text-[#e8cd8f] text-sm font-medium rounded-full shadow-xl border border-[#c9a35a]/30 flex items-center gap-2">
        <span>{message}</span>
      </div>
    </div>
  );
};
