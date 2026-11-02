import { ClassItem, ClassSyncStatus } from '../types';
import { StorageService } from '../services/storageService';
import { kelasStore } from './kelasStore';
import { normalizeClassList, normalizeClassItem } from './kelasModel';

let currentStatus: ClassSyncStatus = 'Tersinkron';
let statusListeners = new Set<(status: ClassSyncStatus) => void>();

function setSyncStatus(status: ClassSyncStatus) {
  currentStatus = status;
  statusListeners.forEach((fn) => {
    try {
      fn(status);
    } catch {}
  });
}

// Map debounce untuk pendaftaran klik
const lastClickMap = new Map<string, number>();

export const kelasSync = {
  getStatus(): ClassSyncStatus {
    const sync = StorageService.getSyncSettings();
    if (!sync || !sync.webAppUrl || !sync.webAppUrl.trim()) {
      return 'Belum aktif';
    }
    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      return 'Offline';
    }
    return currentStatus;
  },

  subscribeStatus(fn: (status: ClassSyncStatus) => void): () => void {
    statusListeners.add(fn);
    fn(this.getStatus());
    return () => statusListeners.delete(fn);
  },

  // Mengirim aksi simpan kelas ke Apps Script (kompatibel penuh dengan skrip lama & baru)
  async saveClassesToAppsScript(classes: ClassItem[]): Promise<{ success: boolean; error?: string }> {
    const sync = StorageService.getSyncSettings();
    if (!sync || !sync.webAppUrl || !sync.webAppUrl.trim()) {
      setSyncStatus('Belum aktif');
      return { success: true }; // Perubahan tetap tersimpan di lokal
    }

    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      setSyncStatus('Offline');
      return { success: false, error: 'Tidak ada koneksi internet' };
    }

    setSyncStatus('Menyinkronkan');

    try {
      // Bersihkan dan format data aman untuk Google Sheets
      const cleanRecords = classes.map((item) => {
        const clean: Record<string, any> = {};
        for (const [key, val] of Object.entries(item)) {
          if (key === 'image' && String(val).startsWith('data:')) {
            clean[key] = '';
          } else if (typeof val === 'object' && val !== null) {
            clean[key] = JSON.stringify(val);
          } else {
            clean[key] = val;
          }
        }
        return clean;
      });

      const executePost = async (actionName: string) => {
        const payload = {
          action: actionName,
          collection: 'Kelas',
          token: sync.token,
          records: cleanRecords,
        };

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 12000);

        try {
          const res = await fetch(sync.webAppUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body: JSON.stringify(payload),
            signal: controller.signal,
          });
          clearTimeout(timeoutId);
          if (!res.ok) return { ok: false, status: res.status, error: 'Server gagal merespons' };
          const json = await res.json();
          return { ok: true, json };
        } catch (e: any) {
          clearTimeout(timeoutId);
          return { ok: false, error: e?.message || 'Koneksi gagal' };
        }
      };

      // 1. Coba syncData terlebih dahulu (dikenal oleh Apps Script lama dan Apps Script baru)
      let postResult = await executePost('syncData');

      // 2. Jika server mengembalikan "Aksi tidak dikenali", coba kelas.simpan
      const isUnknownAction =
        postResult.ok &&
        postResult.json &&
        !postResult.json.success &&
        typeof postResult.json.error === 'string' &&
        postResult.json.error.toLowerCase().includes('aksi tidak');

      if (isUnknownAction) {
        postResult = await executePost('kelas.simpan');
      }

      if (postResult.ok && postResult.json) {
        const json = postResult.json;
        if (json.success) {
          if (json.data && Array.isArray(json.data)) {
            kelasStore.mergeServerSnapshot(json.data, json.rev);
          } else if (json.records && Array.isArray(json.records)) {
            kelasStore.mergeServerSnapshot(json.records, json.rev);
          }
          setSyncStatus('Tersinkron');
          return { success: true };
        } else {
          setSyncStatus('Belum tersinkron');
          return { success: false, error: json.error || 'Gagal menyimpan ke server' };
        }
      } else {
        setSyncStatus('Belum tersinkron');
        return { success: false, error: postResult.error || 'Gagal menghubungi server' };
      }
    } catch (err: any) {
      setSyncStatus('Belum tersinkron');
      return { success: false, error: err?.message || 'Gagal menyimpan ke server' };
    }
  },

  // Menarik snapshot data terbaru dari Apps Script (otomatis fallback ke fetchData jika kelas.tarik belum ada)
  async fetchLatestFromAppsScript(): Promise<boolean> {
    const sync = StorageService.getSyncSettings();
    if (!sync || !sync.webAppUrl || !sync.webAppUrl.trim()) {
      setSyncStatus('Belum aktif');
      return false;
    }

    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      setSyncStatus('Offline');
      return false;
    }

    try {
      let rawList: any[] | null = null;
      let serverRev: number | undefined = undefined;

      // 1. Coba kelas.tarik
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 7000);
        const res = await fetch(
          `${sync.webAppUrl}?action=kelas.tarik&token=${encodeURIComponent(sync.token)}`,
          { method: 'GET', redirect: 'follow', signal: controller.signal }
        );
        clearTimeout(timeoutId);

        if (res.ok) {
          const json = await res.json();
          if (json && json.success && (json.data || json.records)) {
            const list = json.data || json.records;
            if (Array.isArray(list) && list.length > 0) {
              rawList = list;
              serverRev = json.rev;
            }
          }
        }
      } catch {}

      // 2. Jika kelas.tarik tidak mengembalikan data, fallback ke fetchData (standar semua versi Apps Script)
      if (!rawList) {
        try {
          const controller2 = new AbortController();
          const timeoutId2 = setTimeout(() => controller2.abort(), 7000);
          const res2 = await fetch(
            `${sync.webAppUrl}?action=fetchData&token=${encodeURIComponent(sync.token)}`,
            { method: 'GET', redirect: 'follow', signal: controller2.signal }
          );
          clearTimeout(timeoutId2);

          if (res2.ok) {
            const json2 = await res2.json();
            if (json2 && json2.success && json2.data && Array.isArray(json2.data.Kelas) && json2.data.Kelas.length > 0) {
              rawList = json2.data.Kelas;
              serverRev = json2.rev;
            }
          }
        } catch {}
      }

      if (rawList && Array.isArray(rawList) && rawList.length > 0) {
        kelasStore.mergeServerSnapshot(rawList, serverRev);
        setSyncStatus('Tersinkron');
        return true;
      }
      return false;
    } catch {
      return false;
    }
  },

  // Mengirim pencatatan klik tombol "Daftar Sekarang"
  async trackClassClick(classIdOrSlug: string): Promise<void> {
    const now = Date.now();
    const lastTime = lastClickMap.get(classIdOrSlug) || 0;

    // Debounce ketukan beruntun pada kelas yang sama dalam 2 detik
    if (now - lastTime < 2000) return;
    lastClickMap.set(classIdOrSlug, now);

    const sync = StorageService.getSyncSettings();
    if (!sync || !sync.webAppUrl) return;

    try {
      // Kirim kelas.klik
      fetch(sync.webAppUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          action: 'kelas.klik',
          token: sync.token,
          classId: classIdOrSlug,
        }),
      }).catch(() => {});

      // Kirim trackClick untuk kompatibilitas skrip lama
      fetch(sync.webAppUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          action: 'trackClick',
          token: sync.token,
          classId: classIdOrSlug,
        }),
      }).catch(() => {});
    } catch {}
  },
};

// Pengendali Polling Lintas Perangkat per 5 detik
let isPollingActive = false;
let pollTimeoutId: any = null;
let errorDelayMs = 5000;

export function startKelasPollingController(): () => void {
  if (isPollingActive) return () => {};
  isPollingActive = true;

  const runPollStep = async () => {
    if (!isPollingActive) return;

    if (typeof document !== 'undefined' && document.visibilityState === 'visible' && navigator.onLine) {
      const success = await kelasSync.fetchLatestFromAppsScript();
      if (success) {
        errorDelayMs = 5000; // Reset delay jika sukses
      } else {
        // Increment backoff delay jika error (5s -> 10s -> 20s -> 30s)
        errorDelayMs = Math.min(30000, errorDelayMs * 2);
      }
    }

    if (isPollingActive) {
      pollTimeoutId = setTimeout(runPollStep, errorDelayMs);
    }
  };

  // Jalankan langkah pertama
  runPollStep();

  const handleFocus = () => {
    errorDelayMs = 5000;
    kelasSync.fetchLatestFromAppsScript();
  };

  const handleVisibility = () => {
    if (document.visibilityState === 'visible') {
      errorDelayMs = 5000;
      kelasSync.fetchLatestFromAppsScript();
    }
  };

  if (typeof window !== 'undefined') {
    window.addEventListener('focus', handleFocus);
    window.addEventListener('visibilitychange', handleVisibility);
    window.addEventListener('online', handleFocus);
  }

  return () => {
    isPollingActive = false;
    if (pollTimeoutId) clearTimeout(pollTimeoutId);
    if (typeof window !== 'undefined') {
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('online', handleFocus);
    }
  };
}
