// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

import React, { useState } from 'react';
import { UserRole } from '../../types';
import { StorageService } from '../../services/storageService';

interface AdminPasswordProps {
  currentRole: UserRole;
  showToast: (msg: string) => void;
}

export const AdminPassword: React.FC<AdminPasswordProps> = ({
  currentRole,
  showToast,
}) => {
  const [targetRole, setTargetRole] = useState<'admin' | 'superadmin'>(
    currentRole === 'superadmin' ? 'superadmin' : 'admin'
  );
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Check old password
    const passwords = StorageService.getPasswords();
    if (oldPassword !== passwords[targetRole]) {
      setErrorMsg('Kata sandi lama tidak sesuai');
      return;
    }

    if (newPassword.length < 8) {
      setErrorMsg('Kata sandi minimal 8 karakter');
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMsg('Konfirmasi kata sandi tidak cocok');
      return;
    }

    StorageService.updatePassword(targetRole, newPassword);
    await StorageService.syncToAppsScript('Akun', [
      { role: targetRole, password: newPassword },
    ]);
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
    showToast('Berhasil disimpan');
  };

  return (
    <div className="max-w-md bg-white rounded-[18px] p-6 sm:p-8 shadow-sm border border-[#e7e1d5] space-y-6">
      <h2 className="text-2xl font-serif font-bold text-[#1b2433]">Kata Sandi</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {currentRole === 'superadmin' && (
          <div>
            <label className="block text-sm font-medium text-[#1b2433] mb-1">
              Pilih Peran *
            </label>
            <select
              value={targetRole}
              onChange={(e) => {
                setTargetRole(e.target.value as 'admin' | 'superadmin');
                setErrorMsg('');
              }}
              className="w-full rounded-xl border border-[#e7e1d5] px-3 py-2 text-sm text-[#1b2433] bg-white focus:outline-none"
            >
              <option value="superadmin">Superadmin</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-[#1b2433] mb-1">
            Kata Sandi Lama *
          </label>
          <input
            type="password"
            required
            value={oldPassword}
            onChange={(e) => {
              setOldPassword(e.target.value);
              setErrorMsg('');
            }}
            className="w-full rounded-xl border border-[#e7e1d5] px-4 py-2.5 text-sm text-[#1b2433] focus:border-[#c9a35a] focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#1b2433] mb-1">
            Kata Sandi Baru *
          </label>
          <input
            type="password"
            required
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
              setErrorMsg('');
            }}
            className="w-full rounded-xl border border-[#e7e1d5] px-4 py-2.5 text-sm text-[#1b2433] focus:border-[#c9a35a] focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#1b2433] mb-1">
            Ulangi Kata Sandi Baru *
          </label>
          <input
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setErrorMsg('');
            }}
            className="w-full rounded-xl border border-[#e7e1d5] px-4 py-2.5 text-sm text-[#1b2433] focus:border-[#c9a35a] focus:outline-none"
          />
        </div>

        {errorMsg && <p className="text-xs text-red-600">{errorMsg}</p>}

        <div className="pt-2">
          <button
            type="submit"
            className="w-full py-3 rounded-full gold-gradient-bg text-[#07142b] font-semibold text-sm hover:brightness-105 transition shadow-sm"
          >
            Simpan Kata Sandi
          </button>
        </div>
      </form>
    </div>
  );
};
