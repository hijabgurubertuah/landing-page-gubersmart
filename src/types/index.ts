// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

export type UserRole = 'guest' | 'admin' | 'superadmin';

export interface CurriculumMeeting {
  meeting: number;
  title: string;
  content: string;
}

export interface ClassFAQ {
  q: string;
  a: string;
}

export type ClassSyncStatus =
  | 'Tersinkron'
  | 'Menyinkronkan'
  | 'Belum tersinkron'
  | 'Offline'
  | 'Belum aktif'
  | 'Kode Lama';

export interface ClassItem {
  id: string;
  slug: string;
  name: string;
  image: string;
  shortDesc: string;
  fullDesc: string;
  normalPrice: number;
  currentPrice: number;
  status: 'active' | 'inactive';
  lynkidUrl: string;
  curriculum: CurriculumMeeting[];
  faqs: ClassFAQ[];
  clicksCount: number;
  order: number;
  quota?: string;
  schedule?: string;
  outcome?: string;
  targetAudience?: string;
  dibuat?: number;
  diubah?: number;
  dihapus?: boolean;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  quote: string;
  photo?: string;
  isActive: boolean;
  order: number;
}

export interface KaryaItem {
  id: string;
  title: string;
  image: string;
  url?: string;
  category: string;
  order: number;
}

export interface TipsItem {
  id: string;
  slug: string;
  title: string;
  summary: string;
  thumbnail: string;
  category: string;
  publishedAt: string;
  author: string;
  status: 'published' | 'draft';
  content: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  order: number;
}

export interface ActivityLog {
  id: string;
  role: 'admin' | 'superadmin';
  action: string;
  timestamp: string;
}

export interface AdminAccount {
  id: string;
  username: string;
  role: 'admin' | 'superadmin';
  isActive: boolean;
  createdAt: string;
}

export interface NavItem {
  id: string;
  label: string;
  target: string;
  isVisible: boolean;
  order: number;
}

export interface SectionSetting {
  id: string;
  label: string;
  title: string;
  subtitle?: string;
  isVisible: boolean;
  order: number;
  image?: string;
}

export interface StaticPage {
  id: string;
  slug: string;
  title: string;
  content: string;
}

export interface CMSSettings {
  identity: {
    appName: string;
    tagline: string;
    logo: string;
    favicon: string;
    pageTitle: string;
    pageDescription: string;
    previewImage: string;
  };
  theme: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    bgColor: string;
    textColor: string;
    fontHeading: string;
    fontBody: string;
    borderRadius: string;
  };
  navigation: NavItem[];
  buttons: {
    heroPrimaryText: string;
    heroPrimaryUrl: string;
    heroSecondaryText: string;
    heroSecondaryUrl: string;
    ctaPrimaryText: string;
    ctaPrimaryUrl: string;
    ctaSecondaryText: string;
    waPhone: string;
    waDefaultMsg: string;
  };
  sections: SectionSetting[];
  pages: StaticPage[];
  features: {
    testimonials: boolean;
    faq: boolean;
    karya: boolean;
    tips: boolean;
    waFloating: boolean;
    tanyaDulu: boolean;
    searchTips: boolean;
  };
  media: {
    introVideoUrl: string;
    gallery: string[];
  };
  footer: {
    waNumber: string;
    waMessage: string;
    serviceHours: string;
    socialMedia: {
      instagram?: string;
      tiktok?: string;
      youtube?: string;
      facebook?: string;
    };
    motto: string;
    copyright: string;
  };
}

export interface SyncSettings {
  webAppUrl: string;
  token: string;
  driveFolderId: string;
  spreadsheetId: string;
  isConnected: boolean;
  lastSyncedAt?: string;
}

export interface GalleryFileItem {
  id: string;
  name: string;
  url: string;
  date?: string;
  source?: 'drive' | 'local' | 'imported';
}

