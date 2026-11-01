import { ClassItem } from '../types';
import { normalizeClassList, normalizeClassItem } from './kelasModel';
import { TEMPLATE_CLASSES } from './kelasTemplat';

const KEYS = {
  PUBLISHED: 'kelas_terbit',
  DRAFT: 'kelas_draf',
  META: 'kelas_meta',
};

const CHANNEL_NAME = 'kelas-sinkron';

export interface KelasMeta {
  rev: number;
  lastPullTime: number;
  unsyncedIds: string[];
}

// Memory fallback jika LocalStorage tidak dapat diakses
let memoryPublished: ClassItem[] = TEMPLATE_CLASSES.map((c) => normalizeClassItem(c)!);
let memoryDraft: ClassItem[] = TEMPLATE_CLASSES.map((c) => normalizeClassItem(c)!);
let memoryMeta: KelasMeta = { rev: 0, lastPullTime: 0, unsyncedIds: [] };

function getStoredJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function setStoredJson<T>(key: string, val: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch {
    // Ignore storage quota errors in private mode
  }
}

let localVersion = Date.now();

// Broadcast Channel & Storage Listener
const listeners = new Set<() => void>();

function notifyListeners() {
  listeners.forEach((fn) => {
    try {
      fn();
    } catch {}
  });
}

function broadcastChange(type: 'published' | 'draft' | 'all') {
  localVersion = Date.now();
  notifyListeners();

  try {
    if ('BroadcastChannel' in window) {
      const bc = new BroadcastChannel(CHANNEL_NAME);
      bc.postMessage({ type, version: localVersion, timestamp: Date.now() });
      bc.close();
    }
  } catch {}
}

// Inisialisasi listener antar tab
if (typeof window !== 'undefined') {
  try {
    if ('BroadcastChannel' in window) {
      const bc = new BroadcastChannel(CHANNEL_NAME);
      bc.onmessage = (e) => {
        if (e.data && e.data.version !== localVersion) {
          localVersion = e.data.version;
          notifyListeners();
        }
      };
    }
  } catch {}

  window.addEventListener('storage', (e) => {
    if (e.key === KEYS.PUBLISHED || e.key === KEYS.DRAFT || e.key === KEYS.META) {
      notifyListeners();
    }
  });
}

export const kelasStore = {
  subscribe(callback: () => void): () => void {
    listeners.add(callback);
    return () => listeners.delete(callback);
  },

  getMeta(): KelasMeta {
    return getStoredJson<KelasMeta>(KEYS.META, memoryMeta);
  },

  setMeta(meta: Partial<KelasMeta>): void {
    const current = this.getMeta();
    const updated = { ...current, ...meta };
    memoryMeta = updated;
    setStoredJson(KEYS.META, updated);
  },

  // Mendapatkan semua kelas terbit (non-dihapus)
  getPublishedAll(): ClassItem[] {
    const raw = getStoredJson<any>(KEYS.PUBLISHED, null);
    if (!raw) {
      const init = TEMPLATE_CLASSES.map((c) => normalizeClassItem(c)!);
      setStoredJson(KEYS.PUBLISHED, init);
      return init.filter((c) => !c.dihapus);
    }
    const normalized = normalizeClassList(raw);
    memoryPublished = normalized;
    return normalized.filter((c) => !c.dihapus);
  },

  // Mendapatkan kelas terbit yang aktif & tidak dihapus (untuk publik)
  getPublishedPublic(): ClassItem[] {
    return this.getPublishedAll().filter((c) => c.status === 'active');
  },

  // Mendapatkan draf admin (jika draf kosong, salin dari terbit)
  getDraft(): ClassItem[] {
    const raw = getStoredJson<any>(KEYS.DRAFT, null);
    if (!raw) {
      const published = this.getPublishedAll();
      setStoredJson(KEYS.DRAFT, published);
      return published;
    }
    const normalized = normalizeClassList(raw);
    memoryDraft = normalized;
    return normalized.filter((c) => !c.dihapus);
  },

  // Menyimpan perubahan draf admin lokal
  setDraft(classes: ClassItem[]): void {
    const normalized = normalizeClassList(classes);
    memoryDraft = normalized;
    setStoredJson(KEYS.DRAFT, normalized);
    broadcastChange('draft');
  },

  // Menerbitkan draf ke publik (0ms)
  publishDraft(classes: ClassItem[]): void {
    const normalized = normalizeClassList(classes);
    memoryPublished = normalized;
    memoryDraft = normalized;

    setStoredJson(KEYS.PUBLISHED, normalized);
    setStoredJson(KEYS.DRAFT, normalized);

    // Rekam ID yang perlu disinkronkan ke server
    const unsyncedIds = normalized.map((c) => c.id);
    this.setMeta({ unsyncedIds });

    broadcastChange('all');
  },

  // Menggabungkan data snapshot dari Google Sheets tanpa menimpa draf yang belum disimpan
  mergeServerSnapshot(serverClasses: ClassItem[], serverRev?: number): void {
    const normalizedServer = normalizeClassList(serverClasses);
    const localDraft = this.getDraft();

    // Map item lokal
    const draftMap = new Map<string, ClassItem>(localDraft.map((c) => [c.id, c]));

    // Gabungkan server snapshot
    const mergedMap = new Map<string, ClassItem>();

    normalizedServer.forEach((serverItem) => {
      const draftItem = draftMap.get(serverItem.id);

      if (draftItem) {
        // Jika item lokal punya timestamp diubah lebih baru, utamakan lokal
        if ((draftItem.diubah || 0) > (serverItem.diubah || 0)) {
          mergedMap.set(draftItem.id, draftItem);
        } else {
          mergedMap.set(serverItem.id, serverItem);
        }
      } else {
        mergedMap.set(serverItem.id, serverItem);
      }
    });

    // Tambahkan item draf lokal baru yang belum pernah disinkronkan ke server
    draftMap.forEach((draftItem, id) => {
      if (!mergedMap.has(id)) {
        mergedMap.set(id, draftItem);
      }
    });

    const finalMerged = Array.from(mergedMap.values()).filter((c) => !c.dihapus);

    setStoredJson(KEYS.PUBLISHED, finalMerged);
    setStoredJson(KEYS.DRAFT, finalMerged);
    if (typeof serverRev === 'number') {
      this.setMeta({ rev: serverRev, lastPullTime: Date.now() });
    }

    broadcastChange('all');
  },
};
