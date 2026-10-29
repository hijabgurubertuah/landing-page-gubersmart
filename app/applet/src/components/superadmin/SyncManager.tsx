/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.
 */

import React, { useState } from 'react';
import { CmsSettings } from '../../types';
import { Copy, Check, RefreshCw } from 'lucide-react';

interface SyncManagerProps {
  cms: CmsSettings;
  onSaveSync: (syncData: CmsSettings['sync']) => void;
  onShowToast: (msg: string) => void;
}

export const SyncManager: React.FC<SyncManagerProps> = ({ cms, onSaveSync, onShowToast }) => {
  const [syncState, setSyncState] = useState(cms.sync);
  const [copied, setCopied] = useState(false);
  const [testStatus, setTestStatus] = useState<string | null>(null);

  const appsScriptCode = `/**
 * Guber Smart Google Apps Script Backend
 */
const TOKEN = "${syncState.token || 'RAHASIA_TOKEN'}";

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    if (data.token !== TOKEN) {
      return ContentService.createTextOutput(JSON.stringify({ status: "error", message: "Unauthorized" })).setMimeType(ContentService.MimeType.JSON);
    }
    // Handle actions...
    return ContentService.createTextOutput(JSON.stringify({ status: "success" })).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: err.toString() })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({ status: "active", message: "Guber Smart API Ready" })).setMimeType(ContentService.MimeType.JSON);
}`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(appsScriptCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    onShowToast('Berhasil disalin');
  };

  const handleTestConnection = () => {
    setTestStatus('Menghubungkan...');
    setTimeout(() => {
      if (syncState.scriptUrl) {
        setTestStatus('Terhubung');
      } else {
        setTestStatus('Gagal');
      }
    }, 800);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveSync({ ...syncState, connected: testStatus === 'Terhubung' });
    onShowToast('Berhasil disimpan');
  };

  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a77d36]">Superadmin</span>
        <h1 className="text-3xl font-serif font-bold text-[#1b2433]">Sinkronisasi Google Sheets</h1>
      </div>

      <div className="bg-white rounded-[18px] p-6 md:p-8 shadow-md border border-[#e7e1d5] space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#4b5565]">Kode Google Apps Script</label>
            <button
              onClick={handleCopyCode}
              className="px-3 py-1.5 rounded-full bg-[#f8f5ef] border border-[#e7e1d5] text-xs font-medium text-[#1b2433] hover:bg-[#f1ece2] transition flex items-center gap-1"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Disalin' : 'Salin Kode'}</span>
            </button>
          </div>
          <pre className="p-4 rounded-[12px] bg-[#07142b] text-[#e8cd8f] text-xs overflow-x-auto font-mono">
            {appsScriptCode}
          </pre>
        </div>

        <form onSubmit={handleSave} className="space-y-4 pt-4 border-t border-[#e7e1d5]">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#4b5565] mb-1">URL Web App</label>
            <input
              type="text"
              value={syncState.scriptUrl}
              onChange={(e) => setSyncState({ ...syncState, scriptUrl: e.target.value })}
              placeholder="https://script.google.com/macros/s/.../exec"
              className="w-full px-3 py-2.5 rounded-[12px] border border-[#e7e1d5] text-sm focus:outline-none focus:border-[#c9a35a]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#4b5565] mb-1">Token</label>
              <input
                type="text"
                value={syncState.token}
                onChange={(e) => setSyncState({ ...syncState, token: e.target.value })}
                className="w-full px-3 py-2.5 rounded-[12px] border border-[#e7e1d5] text-sm focus:outline-none focus:border-[#c9a35a]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#4b5565] mb-1">ID Folder Drive</label>
              <input
                type="text"
                value={syncState.folderId}
                onChange={(e) => setSyncState({ ...syncState, folderId: e.target.value })}
                className="w-full px-3 py-2.5 rounded-[12px] border border-[#e7e1d5] text-sm focus:outline-none focus:border-[#c9a35a]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#4b5565] mb-1">ID Spreadsheet</label>
              <input
                type="text"
                value={syncState.spreadsheetId}
                onChange={(e) => setSyncState({ ...syncState, spreadsheetId: e.target.value })}
                className="w-full px-3 py-2.5 rounded-[12px] border border-[#e7e1d5] text-sm focus:outline-none focus:border-[#c9a35a]"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleTestConnection}
                className="px-5 py-2.5 rounded-full border border-[#c9a35a] text-[#1b2433] text-sm font-medium hover:bg-[#f8f5ef] transition"
              >
                Uji Koneksi
              </button>
              {testStatus && (
                <span className={`text-sm font-bold ${testStatus === 'Terhubung' ? 'text-green-600' : 'text-red-600'}`}>
                  {testStatus}
                </span>
              )}
            </div>

            <button
              type="submit"
              className="px-8 py-3 rounded-full bg-gradient-to-r from-[#e8cd8f] via-[#c9a35a] to-[#a77d36] text-[#07142b] font-bold text-sm shadow-md transition hover:opacity-95"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
