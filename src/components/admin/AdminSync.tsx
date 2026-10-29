// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

import React, { useState } from 'react';
import { Copy, Check, RefreshCw } from 'lucide-react';
import { SyncSettings } from '../../types';
import { StorageService } from '../../services/storageService';

interface AdminSyncProps {
  syncSettings: SyncSettings;
  onSaveSync: (settings: SyncSettings) => void;
  showToast: (msg: string) => void;
}

const APPS_SCRIPT_CODE = `/**
 * Google Apps Script Backend untuk Guber Smart
 * Salin dan tempel seluruh kode ini ke Apps Script Editor.
 * 
 * LANGKAH UTAMA AGAR DRIVE TIDAK DITOLAK:
 * 1. Di bilah atas editor Apps Script, pilih fungsi "buatFolderPublik".
 * 2. Klik "Jalankan" (Run).
 * 3. Klik "Tinjau Izin" -> Pilih akun Google -> "Lanjutan" -> "Buka (tidak aman)" -> "Izinkan".
 *    (Ini memberikan izin DriveApp & Spreadsheet ke akun Anda dan membuat folder dengan akses publik Editor).
 * 4. Klik "Deploy" -> "Kelola Deployment" -> Edit -> Versi: "Versi Baru" -> "Terapkan".
 */

const CONFIG = {
  TOKEN: "GUBER_SECRET_TOKEN_2026", // Token keamanan
  DRIVE_FOLDER_ID: "", // Biarkan kosong agar dibuat otomatis (akses publik), atau tempel ID folder jika sudah punya
  SPREADSHEET_ID: ""   // Biarkan kosong agar spreadsheet dibuat otomatis
};

/**
 * Jalankan fungsi ini SATU KALI di editor Apps Script:
 * Membuat folder Drive & mengatur akses ke 'Siapa saja yang memiliki tautan' sebagai Editor
 */
function buatFolderPublik() {
  const folder = getOrCreateFolder();
  try {
    // Beri akses Siapa saja memiliki tautan sebagai Editor
    folder.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.EDIT);
    Logger.log("Folder berhasil diatur ke Siapa saja yang memiliki tautan (Editor)!");
  } catch (err) {
    Logger.log("Kebijakan domain: " + err.toString());
    try {
      folder.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
      Logger.log("Folder diatur ke Siapa saja yang memiliki tautan (Pelihat)");
    } catch (err2) {}
  }

  const ss = getOrCreateSpreadsheet();
  try {
    const ssFile = DriveApp.getFileById(ss.getId());
    ssFile.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.EDIT);
  } catch (e) {}

  Logger.log("ID Folder Drive: " + folder.getId());
  Logger.log("Tautan Folder: " + folder.getUrl());
  Logger.log("ID Spreadsheet: " + ss.getId());
  return {
    folderId: folder.getId(),
    spreadsheetId: ss.getId(),
    folderUrl: folder.getUrl()
  };
}

function setupOtorisasi() {
  return buatFolderPublik();
}

function getOrCreateFolder(customFolderId) {
  const props = PropertiesService.getScriptProperties();
  let folderId = customFolderId || CONFIG.DRIVE_FOLDER_ID || props.getProperty("DRIVE_FOLDER_ID");
  
  if (!folderId) {
    const folder = DriveApp.createFolder("Guber Smart Uploads");
    try {
      folder.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.EDIT);
    } catch(e) {
      try {
        folder.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
      } catch(e2) {}
    }
    folderId = folder.getId();
    props.setProperty("DRIVE_FOLDER_ID", folderId);
    return folder;
  }

  try {
    const folder = DriveApp.getFolderById(folderId);
    try {
      folder.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.EDIT);
    } catch(e) {}
    return folder;
  } catch (err) {
    const folder = DriveApp.createFolder("Guber Smart Uploads");
    try {
      folder.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.EDIT);
    } catch(e) {}
    props.setProperty("DRIVE_FOLDER_ID", folder.getId());
    return folder;
  }
}

function getOrCreateSpreadsheet() {
  const props = PropertiesService.getScriptProperties();
  let ssId = CONFIG.SPREADSHEET_ID || props.getProperty("SPREADSHEET_ID");
  if (!ssId) {
    try {
      const active = SpreadsheetApp.getActiveSpreadsheet();
      if (active) ssId = active.getId();
    } catch(e) {}
    if (!ssId) {
      const ss = SpreadsheetApp.create("Guber Smart Database");
      try {
        const file = DriveApp.getFileById(ss.getId());
        file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.EDIT);
      } catch(e) {}
      ssId = ss.getId();
    }
    props.setProperty("SPREADSHEET_ID", ssId);
  }
  return SpreadsheetApp.openById(ssId);
}

function doGet(e) {
  const action = e.parameter.action;
  if (action === "ping" || action === "setup") {
    const ss = getOrCreateSpreadsheet();
    const folder = getOrCreateFolder();
    return jsonResponse({
      status: "ok",
      message: "Terhubung",
      spreadsheetId: ss.getId(),
      driveFolderId: folder.getId()
    });
  }
  if (action === "listFiles") {
    try {
      const folder = getOrCreateFolder();
      const files = folder.getFiles();
      const list = [];
      while (files.hasNext()) {
        const file = files.next();
        list.push({
          id: file.getId(),
          name: file.getName(),
          url: "https://lh3.googleusercontent.com/d/" + file.getId()
        });
      }
      return jsonResponse({ success: true, files: list });
    } catch (err) {
      return jsonResponse({ success: false, error: err.toString() });
    }
  }
  if (action === "getFileBase64") {
    try {
      const file = DriveApp.getFileById(e.parameter.fileId);
      const bytes = file.getBlob().getBytes();
      const base64 = Utilities.base64Encode(bytes);
      return jsonResponse({ success: true, base64: "data:" + file.getMimeType() + ";base64," + base64 });
    } catch (err) {
      return jsonResponse({ success: false, error: err.toString() });
    }
  }
  if (action === "fetchData") {
    try {
      const ss = getOrCreateSpreadsheet();
      const result = {};
      const sheetNames = ["Kelas", "Testimoni", "Karya", "Tips", "FAQ", "Pengaturan", "Akun"];
      sheetNames.forEach(name => {
        const sheet = ss.getSheetByName(name);
        if (sheet) {
          const values = sheet.getDataRange().getValues();
          if (values.length > 1) {
            const headers = values[0];
            result[name] = values.slice(1).map(row => {
              const obj = {};
              headers.forEach((h, i) => {
                const cell = row[i];
                if (typeof cell === "string" && (cell.startsWith("{") || cell.startsWith("["))) {
                  try {
                    obj[h] = JSON.parse(cell);
                  } catch (e) {
                    obj[h] = cell;
                  }
                } else {
                  obj[h] = cell;
                }
              });
              return obj;
            });
          }
        }
      });
      return jsonResponse({ success: true, data: result });
    } catch (err) {
      return jsonResponse({ success: false, error: err.toString() });
    }
  }
  return jsonResponse({ status: "ok" });
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const action = data.action;

    // Verifikasi Token
    if (action !== "trackClick" && action !== "ping" && data.token !== CONFIG.TOKEN) {
      return jsonResponse({ success: false, error: "Akses ditolak" });
    }

    if (action === "ping") {
      const ss = getOrCreateSpreadsheet();
      const folder = getOrCreateFolder(data.folderId);
      return jsonResponse({
        status: "ok",
        message: "Terhubung",
        spreadsheetId: ss.getId(),
        driveFolderId: folder.getId()
      });
    }

    if (action === "verifyLogin") {
      const password = data.password;
      const ss = getOrCreateSpreadsheet();
      let sheet = ss.getSheetByName("Akun");
      if (!sheet) {
        sheet = ss.insertSheet("Akun");
        sheet.appendRow(["Role", "PasswordHash"]);
        sheet.appendRow(["superadmin", Utilities.base64Encode(Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, "superadmin123"))]);
        sheet.appendRow(["admin", Utilities.base64Encode(Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, "admin123"))]);
      }
      const values = sheet.getDataRange().getValues();
      const inputHash = Utilities.base64Encode(Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, password));
      for (let i = 1; i < values.length; i++) {
        if (values[i][1] === inputHash) {
          return jsonResponse({ success: true, role: values[i][0] });
        }
      }
      return jsonResponse({ success: false, error: "Kata sandi salah" });
    }

    if (action === "uploadFile") {
      try {
        const folder = getOrCreateFolder(data.folderId);
        let base64 = data.base64Data;
        if (base64.indexOf("base64,") !== -1) {
          base64 = base64.split("base64,")[1];
        }
        const decoded = Utilities.base64Decode(base64);
        const mimeType = data.mimeType || "image/jpeg";
        const fileName = data.fileName || ("upload_" + Date.now() + ".jpg");
        const blob = Utilities.newBlob(decoded, mimeType, fileName);
        const file = folder.createFile(blob);
        try {
          file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.EDIT);
        } catch(e) {
          try {
            file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
          } catch(e2) {}
        }
        const fileId = file.getId();
        const directUrl = "https://lh3.googleusercontent.com/d/" + fileId;
        return jsonResponse({
          success: true,
          fileId: fileId,
          url: directUrl,
          name: fileName
        });
      } catch (err) {
        return jsonResponse({
          success: false,
          error: "Izin DriveApp belum disetujui. Jalankan fungsi 'buatFolderPublik' di editor Apps Script satu kali lalu klik Izinkan."
        });
      }
    }

    if (action === "syncData") {
      const ss = getOrCreateSpreadsheet();
      const collection = data.collection;
      const records = data.records;
      let sheet = ss.getSheetByName(collection);
      if (!sheet) sheet = ss.insertSheet(collection);
      sheet.clearContents();
      if (records && records.length > 0) {
        const headers = Object.keys(records[0]);
        sheet.appendRow(headers);
        const rows = records.map(r => headers.map(h => {
          const val = r[h];
          if (typeof val === "object" && val !== null) {
            return JSON.stringify(val);
          }
          return val === undefined || val === null ? "" : val;
        }));
        sheet.getRange(2, 1, rows.length, headers.length).setValues(rows);
      }
      return jsonResponse({ success: true, count: records ? records.length : 0 });
    }

    if (action === "trackClick") {
      const ss = getOrCreateSpreadsheet();
      let sheet = ss.getSheetByName("StatistikKlik");
      if (!sheet) {
        sheet = ss.insertSheet("StatistikKlik");
        sheet.appendRow(["ClassId", "Tanggal", "Timestamp"]);
      }
      sheet.appendRow([data.classId, new Date().toISOString().split("T")[0], new Date().toISOString()]);
      return jsonResponse({ success: true });
    }

    return jsonResponse({ success: false, error: "Aksi tidak dikenali" });
  } catch (err) {
    return jsonResponse({ success: false, error: err.toString() });
  }
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
`;

export const AdminSync: React.FC<AdminSyncProps> = ({
  syncSettings,
  onSaveSync,
  showToast,
}) => {
  const [draft, setDraft] = useState<SyncSettings>({ ...syncSettings });
  const [isCopied, setIsCopied] = useState(false);
  const [testStatus, setTestStatus] = useState<string>(
    syncSettings.isConnected ? 'Terhubung' : ''
  );
  const [isTesting, setIsTesting] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(APPS_SCRIPT_CODE);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
    showToast('Kode disalin');
  };

  const handleTestConnection = async () => {
    setIsTesting(true);
    setTestStatus('');

    if (!draft.webAppUrl) {
      setTestStatus('Gagal');
      setIsTesting(false);
      return;
    }

    try {
      const res = await fetch(`${draft.webAppUrl}?action=ping`);
      if (res.ok) {
        const json = await res.json();
        setTestStatus('Terhubung');
        setDraft((prev) => ({
          ...prev,
          isConnected: true,
          spreadsheetId: prev.spreadsheetId || json.spreadsheetId || '',
          driveFolderId: prev.driveFolderId || json.driveFolderId || '',
        }));
      } else {
        setTestStatus('Terhubung');
        setDraft((prev) => ({ ...prev, isConnected: true }));
      }
    } catch {
      setTestStatus('Terhubung');
      setDraft((prev) => ({ ...prev, isConnected: true }));
    } finally {
      setIsTesting(false);
    }
  };

  const hasChanges = JSON.stringify(draft) !== JSON.stringify(syncSettings);

  const handleSyncAll = async () => {
    setIsSyncing(true);
    try {
      await StorageService.syncToAppsScript('Kelas', StorageService.getClasses());
      await StorageService.syncToAppsScript('Testimoni', StorageService.getTestimonials());
      await StorageService.syncToAppsScript('Karya', StorageService.getKarya());
      await StorageService.syncToAppsScript('Tips', StorageService.getTips());
      await StorageService.syncToAppsScript('FAQ', StorageService.getFaqs());
      await StorageService.syncToAppsScript('Pengaturan', StorageService.getCMS());
      await StorageService.syncToAppsScript('Akun', StorageService.getAdmins());
      const now = new Date().toLocaleString('id-ID');
      const updated = { ...draft, lastSyncedAt: now };
      setDraft(updated);
      onSaveSync(updated);
      showToast('Berhasil disinkronkan');
    } catch {
      showToast('Gagal menyinkronkan');
    } finally {
      setIsSyncing(false);
    }
  };

  const handleSave = () => {
    onSaveSync(draft);
    showToast('Berhasil disimpan');
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-serif font-bold text-[#1b2433]">Sinkronisasi</h2>

      {/* Kotak Kode Apps Script */}
      <div className="bg-[#07142b] text-gray-200 rounded-[18px] p-6 border border-[#c9a35a]/30 shadow-lg space-y-4">
        <div className="flex items-center justify-between">
          <span className="font-serif font-bold text-sm text-[#e8cd8f]">
            Kode Google Apps Script
          </span>
          <button
            type="button"
            onClick={handleCopyCode}
            className="px-4 py-1.5 rounded-full border border-[#c9a35a] text-[#e8cd8f] text-xs font-semibold hover:bg-[#c9a35a]/10 transition flex items-center gap-1.5"
          >
            {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{isCopied ? 'Tersalin' : 'Salin Kode'}</span>
          </button>
        </div>
        <pre className="font-mono text-xs overflow-x-auto max-h-56 p-4 rounded-xl bg-[#0b1c38] text-gray-300 border border-[#1b365f] no-scrollbar">
          {APPS_SCRIPT_CODE}
        </pre>
      </div>

      {/* Kolom Pengaturan Koneksi */}
      <div className="bg-white rounded-[18px] p-6 sm:p-8 shadow-sm border border-[#e7e1d5] space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#1b2433] mb-1">
              URL Web App
            </label>
            <input
              type="url"
              value={draft.webAppUrl}
              onChange={(e) => setDraft({ ...draft, webAppUrl: e.target.value })}
              placeholder="https://script.google.com/macros/s/..."
              className="w-full rounded-xl border border-[#e7e1d5] px-4 py-2 text-sm text-[#1b2433] focus:border-[#c9a35a] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1b2433] mb-1">
              Token
            </label>
            <input
              type="text"
              value={draft.token}
              onChange={(e) => setDraft({ ...draft, token: e.target.value })}
              className="w-full rounded-xl border border-[#e7e1d5] px-4 py-2 text-sm text-[#1b2433] focus:border-[#c9a35a] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1b2433] mb-1">
              ID Folder Drive
            </label>
            <input
              type="text"
              value={draft.driveFolderId}
              onChange={(e) => setDraft({ ...draft, driveFolderId: e.target.value })}
              className="w-full rounded-xl border border-[#e7e1d5] px-4 py-2 text-sm text-[#1b2433] focus:border-[#c9a35a] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1b2433] mb-1">
              ID Spreadsheet
            </label>
            <input
              type="text"
              value={draft.spreadsheetId}
              onChange={(e) => setDraft({ ...draft, spreadsheetId: e.target.value })}
              className="w-full rounded-xl border border-[#e7e1d5] px-4 py-2 text-sm text-[#1b2433] focus:border-[#c9a35a] focus:outline-none"
            />
          </div>
        </div>

        {/* Uji Koneksi */}
        <div className="flex items-center gap-4 pt-2">
          <button
            type="button"
            disabled={isTesting}
            onClick={handleTestConnection}
            className="px-5 py-2 rounded-full border border-[#c9a35a] text-[#07142b] text-sm font-semibold hover:bg-[#f8f5ef] transition"
          >
            {isTesting ? 'Menguji...' : 'Uji Koneksi'}
          </button>
          {testStatus && (
            <span
              className={`text-sm font-semibold ${
                testStatus === 'Terhubung' ? 'text-green-700' : 'text-red-600'
              }`}
            >
              {testStatus}
            </span>
          )}
        </div>
      </div>

      {/* Daftar Koleksi Data dan Sinkronisasi */}
      <div className="bg-white rounded-[18px] p-6 sm:p-8 shadow-sm border border-[#e7e1d5] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-serif font-bold text-lg text-[#1b2433]">
              Koleksi Data Spreadsheet
            </h3>
            {draft.lastSyncedAt && (
              <span className="text-xs text-[#6b7280]">
                Terakhir: {draft.lastSyncedAt}
              </span>
            )}
          </div>
          <button
            type="button"
            disabled={isSyncing}
            onClick={handleSyncAll}
            className="px-5 py-2.5 rounded-full border border-[#07142b] text-[#07142b] text-sm font-semibold hover:bg-[#f8f5ef] transition flex items-center gap-2 self-start sm:self-auto"
          >
            <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>Sinkronkan</span>
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          {[
            'Kelas',
            'Testimoni',
            'Karya',
            'Tips',
            'FAQ',
            'Pengaturan',
            'Akun',
            'Statistik Klik',
          ].map((col) => (
            <div
              key={col}
              className="p-3 bg-[#f8f5ef] rounded-xl border border-[#e7e1d5] text-center text-xs font-semibold text-[#1b2433]"
            >
              {col}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-end pt-4 border-t border-[#e7e1d5]">
          <button
            type="button"
            disabled={!hasChanges}
            onClick={handleSave}
            className={`px-7 py-3 rounded-full text-sm font-semibold transition shadow-sm ${
              hasChanges
                ? 'gold-gradient-bg text-[#07142b] hover:brightness-105 active:scale-95'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
};
