/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.
 */

import React, { useState } from 'react';
import { AdminUser } from '../../types';
import { ConfirmDialog } from '../common/ConfirmDialog';
import { Plus, Edit, Trash2, X } from 'lucide-react';

interface AdminManageProps {
  admins: AdminUser[];
  onSaveAdmin: (admin: AdminUser) => void;
  onDeleteAdmin: (id: string) => void;
  onShowToast: (msg: string) => void;
}

export const AdminManage: React.FC<AdminManageProps> = ({
  admins,
  onSaveAdmin,
  onDeleteAdmin,
  onShowToast
}) => {
  const [editing, setEditing] = useState<AdminUser | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleAddNew = () => {
    setEditing({
      id: `adm-${Date.now()}`,
      username: '',
      passwordHash: 'admin123',
      role: 'admin',
      name: '',
      active: true
    });
    setIsModalOpen(true);
  };

  const handleEdit = (adm: AdminUser) => {
    setEditing({ ...adm });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    onSaveAdmin(editing);
    setIsModalOpen(false);
    onShowToast('Berhasil disimpan');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a77d36]">Superadmin</span>
          <h1 className="text-3xl font-serif font-bold text-[#1b2433]">Kelola Admin</h1>
        </div>
        <button
          onClick={handleAddNew}
          className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#e8cd8f] via-[#c9a35a] to-[#a77d36] text-[#07142b] font-bold text-sm shadow-md transition hover:opacity-95 flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Admin</span>
        </button>
      </div>

      <div className="bg-white rounded-[18px] shadow-md border border-[#e7e1d5] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f8f5ef] border-b border-[#e7e1d5] text-xs font-semibold uppercase tracking-wider text-[#4b5565]">
                <th className="p-4">Nama</th>
                <th className="p-4">Peran</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e7e1d5] text-sm text-[#1b2433]">
              {admins.map((adm) => (
                <tr key={adm.id} className="hover:bg-[#f8f5ef]/50 transition">
                  <td className="p-4 font-serif font-bold">{adm.name}</td>
                  <td className="p-4 uppercase text-xs font-bold text-[#4b5565]">{adm.role}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      adm.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {adm.active ? 'Aktif' : 'Nonaktif'}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => handleEdit(adm)}
                      className="p-2 rounded-lg hover:bg-[#f1ece2] text-[#4b5565] transition"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeleteId(adm.id)}
                      className="p-2 rounded-lg hover:bg-red-50 text-red-600 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && editing && (
        <div className="fixed inset-0 z-50 bg-[#07142b]/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[18px] max-w-md w-full p-6 md:p-8 shadow-2xl border border-[#e7e1d5] space-y-6">
            <div className="flex items-center justify-between border-b border-[#e7e1d5] pb-4">
              <h3 className="text-xl font-serif font-bold text-[#1b2433]">Kelola Akun Admin</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 rounded-full hover:bg-[#f8f5ef]">
                <X className="w-5 h-5 text-[#6b7280]" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#4b5565] mb-1">Nama Lengkap *</label>
                <input
                  type="text"
                  required
                  value={editing.name}
                  onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-[12px] border border-[#e7e1d5] text-sm focus:outline-none focus:border-[#c9a35a]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#4b5565] mb-1">Peran</label>
                <select
                  value={editing.role}
                  onChange={(e) => setEditing({ ...editing, role: e.target.value as any })}
                  className="w-full px-3 py-2.5 rounded-[12px] border border-[#e7e1d5] text-sm focus:outline-none focus:border-[#c9a35a] bg-white"
                >
                  <option value="admin">Admin</option>
                  <option value="superadmin">Superadmin</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#4b5565] mb-1">Status</label>
                <select
                  value={editing.active ? 'true' : 'false'}
                  onChange={(e) => setEditing({ ...editing, active: e.target.value === 'true' })}
                  className="w-full px-3 py-2.5 rounded-[12px] border border-[#e7e1d5] text-sm focus:outline-none focus:border-[#c9a35a] bg-white"
                >
                  <option value="true">Aktif</option>
                  <option value="false">Nonaktif</option>
                </select>
              </div>

              <div className="flex gap-3 justify-end pt-4 border-t border-[#e7e1d5]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-full border border-[#e7e1d5] text-[#4b5565] text-sm font-medium hover:bg-[#f8f5ef]"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#e8cd8f] via-[#c9a35a] to-[#a77d36] text-[#07142b] font-bold text-sm shadow-md"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteId && (
        <ConfirmDialog
          title="Hapus Akun Admin"
          onConfirm={() => {
            onDeleteAdmin(deleteId);
            setDeleteId(null);
            onShowToast('Berhasil dihapus');
          }}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </div>
  );
};
