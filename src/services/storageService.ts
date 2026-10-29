// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

import {
  ClassItem,
  TestimonialItem,
  KaryaItem,
  TipsItem,
  FAQItem,
  CMSSettings,
  SyncSettings,
  ActivityLog,
  AdminAccount,
  UserRole,
} from '../types';
import {
  INITIAL_CLASSES,
  INITIAL_TESTIMONIALS,
  INITIAL_KARYA,
  INITIAL_TIPS,
  INITIAL_FAQS,
  INITIAL_CMS_SETTINGS,
  INITIAL_SYNC_SETTINGS,
  INITIAL_ADMINS,
} from '../data/initialData';
import { DESIGN_SYSTEM } from '../constants/designSystem';

const STORAGE_KEYS = {
  CLASSES: 'guber_classes_v1',
  TESTIMONIALS: 'guber_testimonials_v1',
  KARYA: 'guber_karya_v1',
  TIPS: 'guber_tips_v1',
  FAQS: 'guber_faqs_v1',
  CMS: 'guber_cms_v1',
  SYNC: 'guber_sync_v1',
  LOGS: 'guber_logs_v1',
  ADMINS: 'guber_admins_v1',
  AUTH: 'guber_auth_v1',
  PASSWORDS: 'guber_passwords_v1',
};

// Safe LocalStorage getter
function getStored<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

function setStored<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage quota errors in private mode
  }
}

function mergeCMS(pulled: any): CMSSettings {
  if (!pulled || typeof pulled !== 'object') return INITIAL_CMS_SETTINGS;

  const parsed: any = {};
  for (const [key, val] of Object.entries(pulled)) {
    if (typeof val === 'string' && (val.startsWith('{') || val.startsWith('['))) {
      try {
        parsed[key] = JSON.parse(val);
      } catch {
        parsed[key] = val;
      }
    } else {
      parsed[key] = val;
    }
  }

  return {
    identity: { ...INITIAL_CMS_SETTINGS.identity, ...(parsed.identity || {}) },
    theme: { ...INITIAL_CMS_SETTINGS.theme, ...(parsed.theme || {}) },
    navigation: Array.isArray(parsed.navigation) ? parsed.navigation : INITIAL_CMS_SETTINGS.navigation,
    buttons: { ...INITIAL_CMS_SETTINGS.buttons, ...(parsed.buttons || {}) },
    sections: Array.isArray(parsed.sections) ? parsed.sections : INITIAL_CMS_SETTINGS.sections,
    pages: Array.isArray(parsed.pages) ? parsed.pages : INITIAL_CMS_SETTINGS.pages,
    features: { ...INITIAL_CMS_SETTINGS.features, ...(parsed.features || {}) },
    media: { ...INITIAL_CMS_SETTINGS.media, ...(parsed.media || {}) },
    footer: {
      ...INITIAL_CMS_SETTINGS.footer,
      ...(parsed.footer || {}),
      socialMedia: {
        ...INITIAL_CMS_SETTINGS.footer.socialMedia,
        ...(parsed.footer?.socialMedia || {}),
      },
    },
  };
}

export const StorageService = {
  // Classes
  getClasses(): ClassItem[] {
    return getStored<ClassItem[]>(STORAGE_KEYS.CLASSES, INITIAL_CLASSES);
  },
  saveClasses(classes: ClassItem[]): void {
    setStored(STORAGE_KEYS.CLASSES, classes);
  },
  getClassBySlug(slug: string): ClassItem | undefined {
    return this.getClasses().find((c) => c.slug === slug);
  },
  trackClassClick(classId: string): void {
    const classes = this.getClasses();
    const updated = classes.map((c) =>
      c.id === classId ? { ...c, clicksCount: (c.clicksCount || 0) + 1 } : c
    );
    this.saveClasses(updated);
  },

  // Testimonials
  getTestimonials(): TestimonialItem[] {
    return getStored<TestimonialItem[]>(STORAGE_KEYS.TESTIMONIALS, INITIAL_TESTIMONIALS);
  },
  saveTestimonials(items: TestimonialItem[]): void {
    setStored(STORAGE_KEYS.TESTIMONIALS, items);
  },

  // Karya
  getKarya(): KaryaItem[] {
    return getStored<KaryaItem[]>(STORAGE_KEYS.KARYA, INITIAL_KARYA);
  },
  saveKarya(items: KaryaItem[]): void {
    setStored(STORAGE_KEYS.KARYA, items);
  },

  // Tips
  getTips(): TipsItem[] {
    return getStored<TipsItem[]>(STORAGE_KEYS.TIPS, INITIAL_TIPS);
  },
  saveTips(items: TipsItem[]): void {
    setStored(STORAGE_KEYS.TIPS, items);
  },
  getTipBySlug(slug: string): TipsItem | undefined {
    return this.getTips().find((t) => t.slug === slug);
  },

  // FAQs
  getFaqs(): FAQItem[] {
    return getStored<FAQItem[]>(STORAGE_KEYS.FAQS, INITIAL_FAQS);
  },
  saveFaqs(items: FAQItem[]): void {
    setStored(STORAGE_KEYS.FAQS, items);
  },

  // CMS Settings
  getCMS(): CMSSettings {
    return getStored<CMSSettings>(STORAGE_KEYS.CMS, INITIAL_CMS_SETTINGS);
  },
  saveCMS(settings: CMSSettings): void {
    setStored(STORAGE_KEYS.CMS, settings);
  },

  // Sync Settings
  getSyncSettings(): SyncSettings {
    const stored = getStored<SyncSettings>(STORAGE_KEYS.SYNC, INITIAL_SYNC_SETTINGS);
    if (!stored.webAppUrl && INITIAL_SYNC_SETTINGS.webAppUrl) {
      stored.webAppUrl = INITIAL_SYNC_SETTINGS.webAppUrl;
      stored.token = stored.token || INITIAL_SYNC_SETTINGS.token;
      stored.isConnected = true;
      this.saveSyncSettings(stored);
    }
    return stored;
  },
  saveSyncSettings(settings: SyncSettings): void {
    setStored(STORAGE_KEYS.SYNC, settings);
  },

  // Activity Logs
  getLogs(): ActivityLog[] {
    return getStored<ActivityLog[]>(STORAGE_KEYS.LOGS, [
      {
        id: 'l1',
        role: 'superadmin',
        action: 'Inisialisasi sistem Guber Smart',
        timestamp: new Date().toISOString(),
      },
    ]);
  },
  addLog(role: 'admin' | 'superadmin', action: string): void {
    const logs = this.getLogs();
    const newLog: ActivityLog = {
      id: 'log_' + Date.now(),
      role,
      action,
      timestamp: new Date().toISOString(),
    };
    setStored(STORAGE_KEYS.LOGS, [newLog, ...logs].slice(0, 100));
  },

  // Admin accounts
  getAdmins(): AdminAccount[] {
    return getStored<AdminAccount[]>(STORAGE_KEYS.ADMINS, INITIAL_ADMINS);
  },
  saveAdmins(admins: AdminAccount[]): void {
    setStored(STORAGE_KEYS.ADMINS, admins);
  },

  // Passwords (stored locally for standalone mode)
  getPasswords(): { admin: string; superadmin: string } {
    return getStored(STORAGE_KEYS.PASSWORDS, {
      admin: DESIGN_SYSTEM.adminPasswords.admin,
      superadmin: DESIGN_SYSTEM.adminPasswords.superadmin,
    });
  },
  updatePassword(role: 'admin' | 'superadmin', newPass: string): void {
    const current = this.getPasswords();
    current[role] = newPass;
    setStored(STORAGE_KEYS.PASSWORDS, current);
    this.addLog(role, `Ubah kata sandi ${role}`);
  },

  // Authentication & Session
  getCurrentSession(): { role: UserRole; lastActive: number } {
    const session = getStored<{ role: UserRole; lastActive: number }>(STORAGE_KEYS.AUTH, {
      role: 'guest',
      lastActive: Date.now(),
    });
    // Check timeout (30 minutes)
    if (session.role !== 'guest') {
      const now = Date.now();
      if (now - session.lastActive > DESIGN_SYSTEM.sessionTimeoutMs) {
        this.logout();
        return { role: 'guest', lastActive: now };
      }
      session.lastActive = now;
      setStored(STORAGE_KEYS.AUTH, session);
    }
    return session;
  },

  login(password: string): { success: boolean; role: UserRole } {
    const passwords = this.getPasswords();
    if (password === passwords.superadmin) {
      const session = { role: 'superadmin' as UserRole, lastActive: Date.now() };
      setStored(STORAGE_KEYS.AUTH, session);
      this.addLog('superadmin', 'Masuk ke sistem');
      return { success: true, role: 'superadmin' };
    }
    if (password === passwords.admin) {
      const session = { role: 'admin' as UserRole, lastActive: Date.now() };
      setStored(STORAGE_KEYS.AUTH, session);
      this.addLog('admin', 'Masuk ke sistem');
      return { success: true, role: 'admin' };
    }
    return { success: false, role: 'guest' };
  },

  logout(): void {
    const current = getStored<{ role: UserRole }>(STORAGE_KEYS.AUTH, { role: 'guest' });
    if (current.role === 'admin' || current.role === 'superadmin') {
      this.addLog(current.role, 'Keluar dari sistem');
    }
    setStored(STORAGE_KEYS.AUTH, { role: 'guest', lastActive: Date.now() });
  },

  touchSession(): void {
    const session = getStored<{ role: UserRole; lastActive: number }>(STORAGE_KEYS.AUTH, {
      role: 'guest',
      lastActive: Date.now(),
    });
    if (session.role !== 'guest') {
      session.lastActive = Date.now();
      setStored(STORAGE_KEYS.AUTH, session);
    }
  },

  // Upload gambar ke Google Drive lewat Google Apps Script
  async uploadImage(
    base64Data: string,
    fileName: string,
    mimeType = 'image/jpeg'
  ): Promise<{ success: boolean; url?: string; fileId?: string; error?: string }> {
    const sync = this.getSyncSettings();
    if (!sync.webAppUrl) {
      return { success: false, error: 'Belum terhubung ke Apps Script' };
    }

    try {
      let pureBase64 = base64Data;
      if (pureBase64.includes('base64,')) {
        pureBase64 = pureBase64.split('base64,')[1];
      }

      const payload = {
        action: 'uploadFile',
        token: sync.token,
        base64Data: pureBase64,
        mimeType,
        fileName,
        folderId: sync.driveFolderId || undefined,
      };

      const res = await fetch(sync.webAppUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const json = await res.json();
        if (json.success && (json.url || json.fileId)) {
          const directUrl = json.url || `https://lh3.googleusercontent.com/d/${json.fileId}`;
          return { success: true, url: directUrl, fileId: json.fileId };
        }
        return { success: false, error: json.error || 'Gagal mengunggah berkas' };
      }
      return { success: false, error: 'Gagal mengunggah berkas' };
    } catch (err: any) {
      return { success: false, error: err?.toString() };
    }
  },

  // Ambil daftar file dari Google Drive
  async getUploadedFiles(): Promise<Array<{ id: string; name: string; url: string }>> {
    const sync = this.getSyncSettings();
    if (!sync.webAppUrl) return [];
    try {
      const res = await fetch(
        `${sync.webAppUrl}?action=listFiles&token=${encodeURIComponent(sync.token)}`,
        { method: 'GET', redirect: 'follow' }
      );
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.files)) {
          return json.files;
        }
      }
      return [];
    } catch {
      return [];
    }
  },


  // Sinkronisasi ke Google Sheets lewat Google Apps Script
  async syncToAppsScript(collection: string, data: any): Promise<{ success: boolean; error?: string }> {
    const sync = this.getSyncSettings();
    if (!sync.webAppUrl) {
      return { success: true };
    }

    try {
      const records = Array.isArray(data) ? data : [data];
      // Format aman untuk Google Sheets (hanya teks atau tautan, tanpa objek rumit/file)
      const cleanRecords = records.map((item) => {
        const cleanItem: Record<string, any> = {};
        for (const [key, val] of Object.entries(item)) {
          if (typeof val === 'object' && val !== null) {
            cleanItem[key] = JSON.stringify(val);
          } else {
            cleanItem[key] = val;
          }
        }
        return cleanItem;
      });

      const payload = {
        action: 'syncData',
        token: sync.token,
        collection,
        records: cleanRecords,
      };

      const res = await fetch(sync.webAppUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const json = await res.json();
        if (json.success) {
          this.addLog('admin', `Sinkronisasi tab ${collection} ke spreadsheet`);
          return { success: true };
        }
        return { success: false, error: json.error || 'Gagal menyinkronkan' };
      }
      return { success: false, error: 'Gagal menghubungi server' };
    } catch (err: any) {
      return { success: false, error: err?.toString() };
    }
  },

  // Tarik data terbaru dari Google Sheets saat aplikasi dibuka / disegarkan
  async pullFromAppsScript(): Promise<boolean> {
    const sync = this.getSyncSettings();
    if (!sync.webAppUrl) return false;
    try {
      const res = await fetch(
        `${sync.webAppUrl}?action=fetchData&token=${encodeURIComponent(sync.token)}`,
        { method: 'GET', redirect: 'follow' }
      );
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          if (json.data.Kelas && json.data.Kelas.length > 0) this.saveClasses(json.data.Kelas);
          if (json.data.Testimoni && json.data.Testimoni.length > 0) this.saveTestimonials(json.data.Testimoni);
          if (json.data.Karya && json.data.Karya.length > 0) this.saveKarya(json.data.Karya);
          if (json.data.Tips && json.data.Tips.length > 0) this.saveTips(json.data.Tips);
          if (json.data.FAQ && json.data.FAQ.length > 0) this.saveFaqs(json.data.FAQ);
          if (json.data.Pengaturan && json.data.Pengaturan.length > 0) {
            const rawCMS = json.data.Pengaturan[0];
            const merged = mergeCMS(rawCMS);
            this.saveCMS(merged);
          }
          if (json.data.Akun && json.data.Akun.length > 0) this.saveAdmins(json.data.Akun);
          return true;
        }
      }
      return false;
    } catch {
      return false;
    }
  },
};
