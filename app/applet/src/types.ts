/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.
 */

export type UserRole = 'publik' | 'admin' | 'superadmin';

export interface ClassModule {
  title: string;
  content: string;
}

export interface ClassFaqItem {
  q: string;
  a: string;
}

export interface ClassItem {
  id: string;
  slug: string;
  title: string;
  image: { source: 'drive' | 'tautan'; value: string };
  shortDesc: string;
  fullDesc: string;
  normalPrice: string;
  currentPrice: string;
  status: 'aktif' | 'arsip' | 'nonaktif';
  quota: string;
  schedule: string;
  lynkUrl: string;
  modules: ClassModule[];
  outcomes: string[];
  targetAudience: string[];
  classFaq: ClassFaqItem[];
  order: number;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  avatar: { source: 'drive' | 'tautan'; value: string };
  quote: string;
  status: 'tampil' | 'sembunyi';
  order: number;
}

export interface PortfolioItem {
  id: string;
  title: string;
  image: { source: 'drive' | 'tautan'; value: string };
  url: string;
  category: string;
  order: number;
}

export interface TipItem {
  id: string;
  slug: string;
  title: string;
  summary: string;
  thumbnail: { source: 'drive' | 'tautan'; value: string };
  category: string;
  date: string;
  author: string;
  status: 'terbit' | 'draf';
  content: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  order: number;
}

export interface NavItem {
  label: string;
  url: string;
  show: boolean;
}

export interface ButtonItem {
  label: string;
  url: string;
  color: string;
  show: boolean;
}

export interface SectionItem {
  id: string;
  title: string;
  label: string;
  content: string;
  image: { source: 'drive' | 'tautan'; value: string };
  show: boolean;
  order: number;
}

export interface StaticPage {
  id: string;
  title: string;
  slug: string;
  content: string;
}

export interface SocialLinks {
  instagram: string;
  tiktok: string;
  youtube: string;
  facebook: string;
}

export interface CmsSettings {
  identity: {
    appName: string;
    slogan: string;
    logo: { source: 'drive' | 'tautan'; value: string };
    favicon: { source: 'drive' | 'tautan'; value: string };
    seoTitle: string;
    seoDesc: string;
    ogImage: { source: 'drive' | 'tautan'; value: string };
  };
  theme: {
    primary: string;
    secondary: string;
    accent: string;
    bg: string;
    text: string;
    buttonColor: string;
    font: string;
    radius: string;
  };
  navigation: NavItem[];
  buttons: ButtonItem[];
  sections: SectionItem[];
  pages: StaticPage[];
  features: {
    testimonials: boolean;
    faq: boolean;
    portfolio: boolean;
    tips: boolean;
    floatingWa: boolean;
    askWa: boolean;
    searchTips: boolean;
  };
  media: {
    introVideoUrl: string;
    gallery: string[];
  };
  contact: {
    whatsapp: string;
    waMessage: string;
    serviceHours: string;
    social: SocialLinks;
    slogan: string;
    copyright: string;
  };
  sync: {
    scriptUrl: string;
    token: string;
    folderId: string;
    spreadsheetId: string;
    lastSync: string;
    connected: boolean;
  };
  firebase: {
    connected: boolean;
    status: string;
  };
}

export interface AdminUser {
  id: string;
  username: string;
  passwordHash: string;
  role: 'superadmin' | 'admin';
  name: string;
  active: boolean;
}

export interface ActivityLogItem {
  id: string;
  role: string;
  action: string;
  timestamp: string;
}

export interface ClickStatItem {
  classId: string;
  count: number;
  date: string;
}
