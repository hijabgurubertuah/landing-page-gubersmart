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

  // Mengirim aksi simpan kelas ke Apps Script (timeout 10s, POST text/plain)
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
      // Bersihkan dan format data aman untuk Apps Script & Google Sheets
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

      const payload = {
        action: 'kelas.simpan',
        token: sync.token,
        records: cleanRecords,
        collection: 'Kelas',
      };

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const res = await fetch(sync.webAppUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (res.ok) {
        let json: any = null;
        try {
          json = await res.json();
        } catch {
          setSyncStatus('Belum tersinkron');
          return { success: false, error: 'Respons server tidak valid' };
        }

        if (json && json.success) {
          if (json.data && Array.isArray(json.data)) {
            kelasStore.mergeServerSnapshot(json.data, json.rev);
          } else if (json.records && Array.isArray(json.records)) {
            kelasStore.mergeServerSnapshot(json.records, json.rev);
          }
          setSyncStatus('Tersinkron');
          return { success: true };
        } else if (json && json.error === 'KODE_LAMA') {
          setSyncStatus('Kode Lama');
          return { success: false, error: 'Kode Apps Script perlu diperbarui di tab Sinkronisasi' };
        } else {
          setSyncStatus('Belum tersinkron');
          return { success: false, error: json?.error || 'Gagal menyinkronkan' };
        }
      } else {
        setSyncStatus('Belum tersinkron');
        return { success: false, error: 'Gagal menghubungi server' };
      }
    } catch (err: any) {
      setSyncStatus('Belum tersinkron');
      return { success: false, error: err?.message || 'Gagal menyimpan ke server' };
    }
  },

  // Menarik snapshot data terbaru dari Apps Script
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
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);

      const res = await fetch(
        `${sync.webAppUrl}?action=kelas.tarik&token=${encodeURIComponent(sync.token)}`,
        { method: 'GET', redirect: 'follow', signal: controller.signal }
      );

      clearTimeout(timeoutId);

      if (res.ok) {
        let json: any = null;
        try {
          json = await res.json();
        } catch {
          return false;
        }

        if (json && json.success && (json.data || json.records)) {
          const rawList = json.data || json.records;
          if (Array.isArray(rawList)) {
            kelasStore.mergeServerSnapshot(rawList, json.rev);
            setSyncStatus('Tersinkron');
            return true;
          }
        } else if (json && json.error === 'KODE_LAMA') {
          setSyncStatus('Kode Lama');
        }
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
      const payload = {
        action: 'kelas.klik',
        token: sync.token,
        classId: classIdOrSlug,
      };

      fetch(sync.webAppUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
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
