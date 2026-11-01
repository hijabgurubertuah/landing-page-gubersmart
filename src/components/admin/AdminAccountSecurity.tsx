// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

import React, { useState } from 'react';
import { Plus, Shield, KeyRound, UserCheck, UserX, Loader2 } from 'lucide-react';
import { AdminAccount, UserRole } from '../../types';
import { StorageService } from '../../services/storageService';

interface AdminAccountSecurityProps {
  currentRole: UserRole;
  admins: AdminAccount[];
  onSaveAdmins: (items: AdminAccount[]) => void;
  showToast: (msg: string) => void;
}

export const AdminAccountSecurity: React.FC<AdminAccountSecurityProps> = ({
  currentRole,
  admins,
  onSaveAdmins,
  showToast,
}) => {
  const isSuperadmin = currentRole === 'superadmin';

  // --- State Password ---
  const [targetRole, setTargetRole] = useState<'admin' | 'superadmin'>(
    isSuperadmin ? 'superadmin' : 'admin'
  );
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isSavingPassword, setIsSavingPassword] = useState(false);

  // --- State Kelola Akun (Superadmin) ---
  const [items, setItems] = useState<AdminAccount[]>(admins);
  const [isCreating, setIsCreating] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [newRole, setNewRole] = useState<'admin' | 'superadmin'>('admin');
  const [newAccountPassword, setNewAccountPassword] = useState('');
  const [hasAccountChanges, setHasAccountChanges] = useState(false);
  const [isSavingAccounts, setIsSavingAccounts] = useState(false);

  // Handle Ubah Kata Sandi
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSavingPassword) return;
    setPasswordError('');

    const passwords = StorageService.getPasswords();
    if (oldPassword !== passwords[targetRole]) {
      setPasswordError('Kata sandi lama tidak sesuai');
      return;
    }

    if (newPassword.length < 8) {
      setPasswordError('Kata sandi minimal 8 karakter');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('Konfirmasi kata sandi tidak cocok');
      return;
    }

    setIsSavingPassword(true);
    try {
      StorageService.updatePassword(targetRole, newPassword);
      await StorageService.syncToAppsScript('Akun', [
        { role: targetRole, password: newPassword },
      ]);

      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      showToast('Kata sandi berhasil diperbarui');
    } catch {
      showToast('Gagal memperbarui kata sandi');
    } finally {
      setIsSavingPassword(false);
    }
  };

  // Handle Toggle Aktif Akun
  const handleToggleActive = (id: string) => {
    const updated = items.map((a) =>
      a.id === id ? { ...a, isActive: !a.isActive } : a
    );
    setItems(updated);
    setHasAccountChanges(true);
  };

  // Handle Tambah Akun Baru
  const handleCreateAccount = (e: React.FormEvent) => {
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

    if (newAccountPassword) {
      StorageService.updatePassword(newRole, newAccountPassword);
    }

    setNewUsername('');
    setNewAccountPassword('');
    setIsCreating(false);
    setHasAccountChanges(true);
    showToast('Akun berhasil ditambahkan');
  };

  // Handle Hapus Akun
  const handleDeleteAccount = (id: string) => {
    const updated = items.filter((a) => a.id !== id);
    setItems(updated);
    setHasAccountChanges(true);
  };

  // Simpan Semua Perubahan Akun ke Sheets
  const handleSaveAccounts = async () => {
    if (isSavingAccounts) return;
    setIsSavingAccounts(true);
    try {
      onSaveAdmins(items);
      await StorageService.syncToAppsScript('Akun', items);
      setHasAccountChanges(false);
      showToast('Berhasil disimpan ke Google Sheets');
    } catch {
      showToast('Gagal menyimpan akun');
    } finally {
      setIsSavingAccounts(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-serif font-bold text-[#1b2433]">Akun & Keamanan</h2>
      </div>

      {/* Bagian 1: Ganti Kata Sandi */}
      <div className="bg-white rounded-[18px] p-6 sm:p-8 shadow-sm border border-[#e7e1d5] space-y-6 max-w-2xl">
        <div className="flex items-center gap-3 pb-4 border-b border-[#e7e1d5]">
          <KeyRound className="w-5 h-5 text-[#c9a35a]" />
          <h3 className="font-serif font-bold text-lg text-[#1b2433]">Ganti Kata Sandi</h3>
        </div>

        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          {isSuperadmin && (
            <div>
              <label className="block text-sm font-medium text-[#1b2433] mb-1">
                Akun Target
              </label>
              <select
                value={targetRole}
                onChange={(e) =>
                  setTargetRole(e.target.value as 'admin' | 'superadmin')
                }
                className="w-full rounded-xl border border-[#e7e1d5] px-4 py-2 text-sm text-[#1b2433] focus:border-[#c9a35a] focus:outline-none"
              >
                <option value="superadmin">Super Admin</option>
                <option value="admin">Admin Biasa</option>
              </select>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-[#1b2433] mb-1">
              Kata Sandi Lama
            </label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
              className="w-full rounded-xl border border-[#e7e1d5] px-4 py-2 text-sm text-[#1b2433] focus:border-[#c9a35a] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1b2433] mb-1">
              Kata Sandi Baru
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              minLength={8}
              className="w-full rounded-xl border border-[#e7e1d5] px-4 py-2 text-sm text-[#1b2433] focus:border-[#c9a35a] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1b2433] mb-1">
              Konfirmasi Kata Sandi Baru
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={8}
              className="w-full rounded-xl border border-[#e7e1d5] px-4 py-2 text-sm text-[#1b2433] focus:border-[#c9a35a] focus:outline-none"
            />
          </div>

          {passwordError && (
            <div className="text-red-500 text-xs font-medium">{passwordError}</div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSavingPassword}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold inline-flex items-center gap-2 transition shadow-sm ${
                isSavingPassword
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed pointer-events-none'
                  : 'gold-gradient-bg text-[#07142b] hover:brightness-105 active:scale-95'
              }`}
            >
              {isSavingPassword && <Loader2 className="w-4 h-4 animate-spin text-[#07142b]" />}
              <span>{isSavingPassword ? 'Menyimpan...' : 'Perbarui Kata Sandi'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Bagian 2: Kelola Administrator (Hanya Superadmin) */}
      {isSuperadmin && (
        <div className="bg-white rounded-[18px] p-6 sm:p-8 shadow-sm border border-[#e7e1d5] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#e7e1d5]">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-[#c9a35a]" />
              <h3 className="font-serif font-bold text-lg text-[#1b2433]">
                Kelola Akun Administrator
              </h3>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setIsCreating(true)}
                className="px-4 py-2 rounded-full text-sm font-semibold gold-gradient-bg text-[#07142b] hover:brightness-105 transition flex items-center gap-1.5 shadow-sm active:scale-95"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Admin</span>
              </button>
              {hasAccountChanges && (
                <button
                  type="button"
                  disabled={isSavingAccounts}
                  onClick={handleSaveAccounts}
                  className={`px-5 py-2 rounded-full text-sm font-semibold inline-flex items-center gap-2 transition shadow-sm ${
                    isSavingAccounts
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed pointer-events-none'
                      : 'bg-[#07142b] text-white hover:bg-[#12284a] active:scale-95'
                  }`}
                >
                  {isSavingAccounts && <Loader2 className="w-4 h-4 animate-spin text-white" />}
                  <span>{isSavingAccounts ? 'Menyimpan...' : 'Simpan Perubahan'}</span>
                </button>
              )}
            </div>
          </div>

          {/* Form Tambah Admin */}
          {isCreating && (
            <form
              onSubmit={handleCreateAccount}
              className="bg-[#f8f5ef] p-5 rounded-2xl border border-[#e7e1d5] space-y-4"
            >
              <h4 className="font-bold text-sm text-[#1b2433]">Tambah Admin Baru</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#1b2433] mb-1">
                    Nama Pengguna
                  </label>
                  <input
                    type="text"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    required
                    placeholder="Contoh: admin_utama"
                    className="w-full rounded-xl border border-[#e7e1d5] px-3 py-2 text-sm bg-white text-[#1b2433] focus:border-[#c9a35a] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#1b2433] mb-1">
                    Peran
                  </label>
                  <select
                    value={newRole}
                    onChange={(e) =>
                      setNewRole(e.target.value as 'admin' | 'superadmin')
                    }
                    className="w-full rounded-xl border border-[#e7e1d5] px-3 py-2 text-sm bg-white text-[#1b2433] focus:border-[#c9a35a] focus:outline-none"
                  >
                    <option value="admin">Admin Biasa</option>
                    <option value="superadmin">Super Admin</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#1b2433] mb-1">
                    Kata Sandi Awal
                  </label>
                  <input
                    type="password"
                    value={newAccountPassword}
                    onChange={(e) => setNewAccountPassword(e.target.value)}
                    placeholder="Minimal 8 karakter"
                    className="w-full rounded-xl border border-[#e7e1d5] px-3 py-2 text-sm bg-white text-[#1b2433] focus:border-[#c9a35a] focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="px-4 py-2 rounded-full text-xs font-semibold text-[#4b5565] hover:bg-gray-200 transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full text-xs font-semibold gold-gradient-bg text-[#07142b] hover:brightness-105 transition shadow-sm active:scale-95"
                >
                  Simpan Akun
                </button>
              </div>
            </form>
          )}

          {/* Daftar Akun */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {items.map((acc) => (
              <div
                key={acc.id}
                className="p-5 rounded-2xl border border-[#e7e1d5] bg-white flex items-center justify-between hover:border-[#c9a35a]/50 transition shadow-sm"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#1b2433] text-sm">
                      {acc.username}
                    </span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded font-semibold uppercase ${
                        acc.role === 'superadmin'
                          ? 'bg-[#07142b] text-[#e8cd8f]'
                          : 'bg-gray-100 text-[#4b5565]'
                      }`}
                    >
                      {acc.role === 'superadmin' ? 'Superadmin' : 'Admin'}
                    </span>
                  </div>
                  <div className="text-xs text-[#5f697a] mt-1">
                    Terdaftar: {acc.createdAt || '-'}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleToggleActive(acc.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1 ${
                      acc.isActive
                        ? 'bg-green-50 text-green-700 hover:bg-green-100'
                        : 'bg-red-50 text-red-700 hover:bg-red-100'
                    }`}
                  >
                    {acc.isActive ? (
                      <>
                        <UserCheck className="w-3.5 h-3.5" />
                        <span>Aktif</span>
                      </>
                    ) : (
                      <>
                        <UserX className="w-3.5 h-3.5" />
                        <span>Nonaktif</span>
                      </>
                    )}
                  </button>

                  {items.length > 1 && acc.role !== 'superadmin' && (
                    <button
                      type="button"
                      onClick={() => handleDeleteAccount(acc.id)}
                      className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg transition"
                      aria-label="Hapus akun"
                    >
                      <UserX className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
