// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

import React, { useState } from 'react';
import { Plus, Loader2 } from 'lucide-react';
import { AdminAccount } from '../../types';
import { StorageService } from '../../services/storageService';

interface AdminAccountsProps {
  admins: AdminAccount[];
  onSaveAdmins: (items: AdminAccount[]) => void;
  showToast: (msg: string) => void;
}

export const AdminAccounts: React.FC<AdminAccountsProps> = ({
  admins,
  onSaveAdmins,
  showToast,
}) => {
  const [items, setItems] = useState<AdminAccount[]>(admins);
  const [isCreating, setIsCreating] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [newRole, setNewRole] = useState<'admin' | 'superadmin'>('admin');
  const [newPassword, setNewPassword] = useState('');
  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleToggleActive = (id: string) => {
    const updated = items.map((a) =>
      a.id === id ? { ...a, isActive: !a.isActive } : a
    );
    setItems(updated);
    setHasChanges(true);
  };

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUsername.trim()) return;

    const newAcc: AdminAccount = {
      id: 'acc_' + Date.now(),
      username: newUsername.trim(),
      role: newRole,
      isActive: true,
      createdAt: new Date().toISOString().split('T')[0],
    };

    const updated = [...items, newAcc];
    setItems(updated);

    if (newPassword) {
      StorageService.updatePassword(newRole, newPassword);
    }

    setNewUsername('');
    setNewPassword('');
    setIsCreating(false);
    setHasChanges(true);
  };

  const handleSaveAllToSheet = async () => {
    if (isSaving) return;
    setIsSaving(true);
    try {
      onSaveAdmins(items);
      await StorageService.syncToAppsScript('Akun', items);
      setHasChanges(false);
      showToast('Berhasil disimpan');
    } catch {
      showToast('Gagal menyimpan akun');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-serif font-bold text-[#1b2433]">Kelola Admin</h2>
        <button
          type="button"
          onClick={() => setIsCreating(true)}
          className="px-5 py-2.5 rounded-full gold-gradient-bg text-[#07142b] text-sm font-semibold hover:brightness-105 transition flex items-center gap-2 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Akun</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((acc) => (
          <div
            key={acc.id}
            className="bg-white rounded-[18px] p-6 shadow-sm border border-[#e7e1d5] flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-serif font-bold text-lg text-[#1b2433]">
                  {acc.username}
                </span>
                <span className="text-xs uppercase font-semibold text-[#a77d36]">
                  {acc.role}
                </span>
              </div>
              <div className="text-xs text-[#6b7280]">Dibuat: {acc.createdAt}</div>
            </div>

            <div className="pt-4 border-t border-[#f8f5ef] flex items-center justify-between">
              <button
                type="button"
                onClick={() => handleToggleActive(acc.id)}
                className={`text-xs font-semibold ${
                  acc.isActive ? 'text-green-700' : 'text-gray-400'
                }`}
              >
                {acc.isActive ? 'Aktif' : 'Nonaktif'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* TEPAT SATU TOMBOL SIMPAN PENGATURAN KE SPREADSHEET */}
      <div className="flex items-center justify-end pt-6 border-t border-[#e7e1d5]">
        <button
          type="button"
          disabled={!hasChanges || isSaving}
          onClick={handleSaveAllToSheet}
          className={`px-7 py-3 rounded-full text-sm font-semibold transition shadow-sm inline-flex items-center gap-2 ${
            hasChanges && !isSaving
              ? 'gold-gradient-bg text-[#07142b] hover:brightness-105 active:scale-95'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed pointer-events-none'
          }`}
        >
          {isSaving && <Loader2 className="w-4 h-4 animate-spin text-[#07142b]" />}
          <span>{isSaving ? 'Menyimpan...' : 'Simpan'}</span>
        </button>
      </div>

      {isCreating && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-[#07142b]/60 backdrop-blur-sm"
          onClick={() => setIsCreating(false)}
        >
          <div
            className="w-full max-w-md bg-white rounded-[18px] p-6 sm:p-8 shadow-2xl border border-[#e7e1d5]"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-serif font-bold text-[#1b2433] mb-6">
              Tambah Akun
            </h3>

            <form onSubmit={handleApply} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#1b2433] mb-1">
                  Nama Akun *
                </label>
                <input
                  type="text"
                  required
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  className="w-full rounded-xl border border-[#e7e1d5] px-4 py-2.5 text-sm text-[#1b2433] focus:border-[#c9a35a] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1b2433] mb-1">
                  Peran *
                </label>
                <select
                  value={newRole}
                  onChange={(e) =>
                    setNewRole(e.target.value as 'admin' | 'superadmin')
                  }
                  className="w-full rounded-xl border border-[#e7e1d5] px-3 py-2 text-sm text-[#1b2433] bg-white focus:outline-none"
                >
                  <option value="admin">Admin</option>
                  <option value="superadmin">Superadmin</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1b2433] mb-1">
                  Kata Sandi
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full rounded-xl border border-[#e7e1d5] px-4 py-2.5 text-sm text-[#1b2433] focus:border-[#c9a35a] focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#e7e1d5]">
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="px-5 py-2.5 rounded-full border border-[#e7e1d5] text-[#4b5565] text-sm font-medium hover:bg-[#f8f5ef] transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full gold-gradient-bg text-[#07142b] text-sm font-semibold hover:brightness-105 transition shadow-sm"
                >
                  Terapkan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
