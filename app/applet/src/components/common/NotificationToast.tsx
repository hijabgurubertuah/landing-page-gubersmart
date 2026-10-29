/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.
 */

import React, { useEffect } from 'react';

interface NotificationToastProps {
  message: string;
  onClose: () => void;
}

export const NotificationToast: React.FC<NotificationToastProps> = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 500);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 bg-[#07142b] text-[#e8cd8f] px-5 py-3 rounded-[18px] shadow-2xl border border-[#c9a35a]/40 text-sm font-medium animate-fade-in flex items-center gap-2">
      <span className="w-2 h-2 rounded-full bg-[#16a34a]"></span>
      {message}
    </div>
  );
};
