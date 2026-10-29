// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { StorageService } from '../../services/storageService';
import { UserRole } from '../../types';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (role: UserRole) => void;
  showToast: (msg: string) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  showToast,
}) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (!password) {
      setErrorMsg('Kata sandi harus diisi');
      return;
    }

    const res = StorageService.login(password);
    if (res.success) {
      showToast('Berhasil masuk');
      onSuccess(res.role);
      setPassword('');
      onClose();
    } else {
      setErrorMsg('Kata sandi salah');
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#07142b]/65 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm bg-white rounded-[18px] p-6 shadow-2xl border border-[#e7e1d5]"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-xl font-serif font-medium text-[#1b2433] text-center mb-5">
          Masuk
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#1b2433] mb-1.5">
              Kata Sandi *
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrorMsg('');
                }}
                className="w-full rounded-xl border border-[#e7e1d5] px-4 py-3 text-base text-[#1b2433] pr-12 focus:border-[#c9a35a] focus:outline-none transition"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6b7280] hover:text-[#1b2433] p-1"
                aria-label={showPassword ? 'Sembunyikan' : 'Tampilkan'}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errorMsg && (
              <p className="text-xs text-red-600 mt-1.5">{errorMsg}</p>
            )}
          </div>

          <div className="flex items-center justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-full border border-[#e7e1d5] text-[#4b5565] text-sm font-medium hover:bg-[#f8f5ef] transition"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-full gold-gradient-bg text-[#07142b] text-sm font-semibold hover:brightness-105 transition shadow-sm"
            >
              Masuk
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
