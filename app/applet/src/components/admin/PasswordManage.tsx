/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.
 */

import React, { useState } from 'react';
import { UserRole, AdminUser } from '../../types';
import { Key } from 'lucide-react';

interface PasswordManageProps {
  currentUser: UserRole;
  currentAdmin: AdminUser | null;
  onUpdatePassword: (newPass: string) => void;
  onShowToast: (msg: string) => void;
}

export const PasswordManage: React.FC<PasswordManageProps> = ({
  currentUser,
  currentAdmin,
  onUpdatePassword,
  onShowToast
}) => {
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPass.length < 8) {
      setErrorMsg('Minimal 8 karakter');
      return;
    }
    if (newPass !== confirmPass) {
      setErrorMsg('Kata sandi tidak sama');
      return;
    }
    onUpdatePassword(newPass);
    setOldPass('');
    setNewPass('');
    setConfirmPass('');
    setErrorMsg('');
    onShowToast('Berhasil disimpan');
  };

  return (
    <div className="space-y-6 max-w-xl">
      <div>
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a77d36]">Keamanan</span>
        <h1 className="text-3xl font-serif font-bold text-[#1b2433]">Ubah Kata Sandi</h1>
      </div>

      <div className="bg-white rounded-[18px] p-6 md:p-8 shadow-md border border-[#e7e1d5]">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#4b5565] mb-1">Kata Sandi Lama</label>
            <input
              type="password"
              required
              value={oldPass}
              onChange={(e) => setOldPass(e.target.value)}
              className="w-full px-3 py-2.5 rounded-[12px] border border-[#e7e1d5] text-sm focus:outline-none focus:border-[#c9a35a]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#4b5565] mb-1">Kata Sandi Baru</label>
            <input
              type="password"
              required
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
              className="w-full px-3 py-2.5 rounded-[12px] border border-[#e7e1d5] text-sm focus:outline-none focus:border-[#c9a35a]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#4b5565] mb-1">Ulangi Kata Sandi Baru</label>
            <input
              type="password"
              required
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              className="w-full px-3 py-2.5 rounded-[12px] border border-[#e7e1d5] text-sm focus:outline-none focus:border-[#c9a35a]"
            />
          </div>

          {errorMsg && <p className="text-xs text-red-600 font-medium">{errorMsg}</p>}

          <div className="pt-2">
            <button
              type="submit"
              className="px-6 py-3 rounded-full bg-gradient-to-r from-[#e8cd8f] via-[#c9a35a] to-[#a77d36] text-[#07142b] font-bold text-sm shadow-md transition hover:opacity-95"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
