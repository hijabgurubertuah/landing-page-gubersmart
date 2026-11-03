// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

import React, { useState, useEffect, useCallback } from 'react';
import { StorageService } from './services/storageService';
import { applyDynamicTheme } from './utils/themeManager';
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
} from './types';
import { Header } from './components/common/Header';
import { MobileSidebar } from './components/common/MobileSidebar';
import { LoginModal } from './components/common/LoginModal';
import { Toast } from './components/common/Toast';
import { HomePage } from './pages/HomePage';
import { ClassDetailPage } from './pages/ClassDetailPage';
import { TipsListPage } from './pages/TipsListPage';
import { ArticlePage } from './pages/ArticlePage';
import { PortfolioPage } from './pages/PortfolioPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminClasses } from './components/admin/AdminClasses';
import { AdminTestimonials } from './components/admin/AdminTestimonials';
import { AdminPortfolio } from './components/admin/AdminPortfolio';
import { AdminFaq } from './components/admin/AdminFaq';
import { AdminPassword } from './components/admin/AdminPassword';
import { AdminCMS } from './components/admin/AdminCMS';
import { AdminSync } from './components/admin/AdminSync';
import { AdminFirebase } from './components/admin/AdminFirebase';
import { AdminAccounts } from './components/admin/AdminAccounts';
import { kelasStore } from './data/kelasStore';

export default function App() {
  // App-level data state
  const [classes, setClasses] = useState<ClassItem[]>(() => StorageService.getClasses());
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(() =>
    StorageService.getTestimonials()
  );
  const [karyaList, setKaryaList] = useState<KaryaItem[]>(() =>
    StorageService.getKarya()
  );
  const [tips, setTips] = useState<TipsItem[]>(() => StorageService.getTips());
  const [faqs, setFaqs] = useState<FAQItem[]>(() => StorageService.getFaqs());
  const [cms, setCms] = useState<CMSSettings>(() => StorageService.getCMS());
  const [syncSettings, setSyncSettings] = useState<SyncSettings>(() =>
    StorageService.getSyncSettings()
  );
  const [logs, setLogs] = useState<ActivityLog[]>(() => StorageService.getLogs());
  const [admins, setAdmins] = useState<AdminAccount[]>(() =>
    StorageService.getAdmins()
  );

  // Authentication State
  const [currentRole, setCurrentRole] = useState<UserRole>(() => {
    const session = StorageService.getCurrentSession();
    return session.role;
  });

  // UI state
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [activeSection, setActiveSection] = useState('hero');

  // URL / Route Parsing (stays on reload!)
  const getRouteFromHash = () => {
    const hash = window.location.hash.replace(/^#\/?/, '') || '';
    const parts = hash.split('/');
    const page = parts[0] || 'home';
    const param = parts[1] || '';
    const subParam = parts[2] || '';
    return { page, param, subParam };
  };

  const [route, setRoute] = useState(getRouteFromHash);
  const [cmsSubTab, setCmsSubTab] = useState<string>(() => {
    const r = getRouteFromHash();
    return r.page === 'admin' && r.param === 'cms' && r.subParam ? r.subParam : 'identitas';
  });

  useEffect(() => {
    const handleHashChange = () => {
      const newRoute = getRouteFromHash();
      setRoute(newRoute);
      if (newRoute.page === 'admin' && newRoute.param === 'cms' && newRoute.subParam) {
        setCmsSubTab(newRoute.subParam);
      }
      window.scrollTo(0, 0);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);
  // Real-time synchronization effect:
  // 1. Instant local sync across tabs/windows (BroadcastChannel & storage event)
  // 2. Real-time cross-device sync from Firestore
  useEffect(() => {
    const unsubFirebase = StorageService.initRealtimeSync((col, data) => {
      if (!data || data.length === 0) return; // Jangan timpa jika data Firebase kosong (mungkin baru aktif)

      if (col === 'kelas') {
        const normalized = data as ClassItem[];
        setClasses(normalized);
        StorageService.saveClasses(normalized);
        // Penting: Beritahu kelasStore agar draf admin juga terupdate
        kelasStore.mergeServerSnapshot(normalized);
      } else if (col === 'testimonials') {
        setTestimonials(data as TestimonialItem[]);
        StorageService.saveTestimonials(data as TestimonialItem[]);
      } else if (col === 'karya') {
        setKaryaList(data as KaryaItem[]);
        StorageService.saveKarya(data as KaryaItem[]);
      } else if (col === 'tips') {
        setTips(data as TipsItem[]);
        StorageService.saveTips(data as TipsItem[]);
      } else if (col === 'faqs') {
        setFaqs(data as FAQItem[]);
        StorageService.saveFaqs(data as FAQItem[]);
      } else if (col === 'settings') {
        // CMS settings biasanya hanya 1 dokumen
        if (data[0]) {
          const settings = data[0] as CMSSettings;
          setCms(settings);
          StorageService.saveCMS(settings);
        }
      } else if (col === 'admins') {
        setAdmins(data as AdminAccount[]);
        StorageService.saveAdmins(data as AdminAccount[]);
      }
    });

    return () => {
      unsubFirebase();
    };
  }, []);




  // Offline listener
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Apply dynamic theme, title, favicon, and description with CMS settings in real-time
  useEffect(() => {
    applyDynamicTheme(cms);
  }, [cms]);


  // Scroll spy on homepage
  useEffect(() => {
    if (route.page !== 'home') return;

    const sections = ['hero', 'profil', 'kelas', 'keunggulan', 'karya'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 120;
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [route.page]);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
  }, []);

  const navigateTo = (path: string) => {
    window.location.hash = path;
  };

  const handleNavScroll = (target: string = 'hero') => {
    if (target === 'admin') {
      navigateTo('/admin');
      return;
    }

    if (route.page !== 'home') {
      navigateTo('/');
      setTimeout(() => {
        const el = document.getElementById(target);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(target);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleLogout = () => {
    StorageService.logout();
    setCurrentRole('guest');
    showToast('Berhasil keluar');
    navigateTo('/');
  };

  // Handlers for saving data
  const handleSaveClasses = async (newClasses: ClassItem[]) => {
    setClasses(newClasses);
    StorageService.saveClasses(newClasses);
    setLogs(StorageService.getLogs());
    
    // Manual trigger to Firestore on save
    for (const item of newClasses) {
      await StorageService.saveToFirestore('kelas', item.id, item);
    }
  };

  const handleSaveTestimonials = async (newTestimonials: TestimonialItem[]) => {
    setTestimonials(newTestimonials);
    StorageService.saveTestimonials(newTestimonials);
    setLogs(StorageService.getLogs());
    
    for (const item of newTestimonials) {
      await StorageService.saveToFirestore('testimonials', item.id, item);
    }
  };

  const handleSaveKarya = async (newKarya: KaryaItem[]) => {
    setKaryaList(newKarya);
    StorageService.saveKarya(newKarya);
    setLogs(StorageService.getLogs());
    
    for (const item of newKarya) {
      await StorageService.saveToFirestore('karya', item.id, item);
    }
  };

  const handleSaveTips = async (newTips: TipsItem[]) => {
    setTips(newTips);
    StorageService.saveTips(newTips);
    setLogs(StorageService.getLogs());
    
    for (const item of newTips) {
      await StorageService.saveToFirestore('tips', item.id, item);
    }
  };

  const handleSaveFaqs = async (newFaqs: FAQItem[]) => {
    setFaqs(newFaqs);
    StorageService.saveFaqs(newFaqs);
    setLogs(StorageService.getLogs());
    
    for (const item of newFaqs) {
      await StorageService.saveToFirestore('faqs', item.id, item);
    }
  };

  const handleSaveCMS = async (newCMS: CMSSettings) => {
    setCms(newCMS);
    StorageService.saveCMS(newCMS);
    setLogs(StorageService.getLogs());
    await StorageService.saveToFirestore('settings', 'main_config', newCMS);
  };

  const handleSaveSync = (newSync: SyncSettings) => {
    setSyncSettings(newSync);
    StorageService.saveSyncSettings(newSync);
    setLogs(StorageService.getLogs());
  };

  const handleSaveAdmins = (newAdmins: AdminAccount[]) => {
    setAdmins(newAdmins);
    StorageService.saveAdmins(newAdmins);
    setLogs(StorageService.getLogs());
  };

  // If in admin page but not logged in, prompt login
  useEffect(() => {
    if (route.page === 'admin' && currentRole === 'guest') {
      setIsLoginModalOpen(true);
    }
  }, [route.page, currentRole]);

  // Render Admin View
  if (route.page === 'admin' && currentRole !== 'guest') {
    const currentAdminTab = route.param || 'dasbor';

    return (
      <>
        {!isOnline && (
          <div className="bg-[#07142b] text-yellow-300 text-xs py-1 px-4 text-center">
            Offline
          </div>
        )}
        <AdminLayout
          currentRole={currentRole}
          currentTab={currentAdminTab}
          activeCmsSubTab={cmsSubTab}
          onSelectTab={(tab, subTab) => {
            if (tab === 'cms') {
              const targetSub = subTab || cmsSubTab || 'identitas';
              setCmsSubTab(targetSub);
              navigateTo(`/admin/cms/${targetSub}`);
            } else {
              navigateTo(`/admin/${tab}`);
            }
          }}
          onSelectCmsSubTab={(subTab) => {
            setCmsSubTab(subTab);
            navigateTo(`/admin/cms/${subTab}`);
          }}
          onLogout={handleLogout}
          onViewWebsite={() => navigateTo('/')}
        >
          {currentAdminTab === 'dasbor' && (
            <AdminDashboard
              classes={classes}
              karyaList={karyaList}
              testimonials={testimonials}
              showToast={showToast}
            />
          )}
          {currentAdminTab === 'kelas' && (
            <AdminClasses
              classes={classes}
              onSaveClasses={handleSaveClasses}
              showToast={showToast}
            />
          )}
          {currentAdminTab === 'testimoni' && (
            <AdminTestimonials
              testimonials={testimonials}
              onSaveTestimonials={handleSaveTestimonials}
              showToast={showToast}
            />
          )}
          {currentAdminTab === 'karya' && (
            <AdminPortfolio
              karyaList={karyaList}
              onSaveKarya={handleSaveKarya}
              showToast={showToast}
            />
          )}
          {currentAdminTab === 'faq' && (
            <AdminFaq
              faqs={faqs}
              onSaveFaqs={handleSaveFaqs}
              showToast={showToast}
            />
          )}
          {currentAdminTab === 'cms' && (
            <AdminCMS
              currentRole={currentRole}
              cms={cms}
              activeTab={cmsSubTab}
              onTabChange={(newTab) => {
                setCmsSubTab(newTab);
                navigateTo(`/admin/cms/${newTab}`);
              }}
              onSaveCMS={handleSaveCMS}
              showToast={showToast}
              onPreview={() => navigateTo('/')}
            />
          )}
          {currentAdminTab === 'sinkronisasi' && currentRole === 'superadmin' && (
            <AdminSync
              syncSettings={syncSettings}
              onSaveSync={handleSaveSync}
              showToast={showToast}
            />
          )}
          {currentAdminTab === 'firebase' && currentRole === 'superadmin' && (
            <AdminFirebase />
          )}
          {(currentAdminTab === 'akun' || currentAdminTab === 'sandi') && (
            <AdminAccountSecurity
              currentRole={currentRole}
              admins={admins}
              onSaveAdmins={handleSaveAdmins}
              showToast={showToast}
            />
          )}
        </AdminLayout>
        <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
      </>
    );
  }

  // Render Public Views
  const isHomePage = route.page === 'home' || route.page === '';

  return (
    <div className="min-h-screen bg-[#f8f5ef]">
      {/* Offline Status */}
      {!isOnline && (
        <div className="bg-[#07142b] text-yellow-300 text-xs py-1 px-4 text-center">
          Offline
        </div>
      )}

      {/* Header */}
      <Header
        cms={cms}
        currentRole={currentRole}
        activeSection={activeSection}
        onNavigate={handleNavScroll}
        onOpenLogin={() => setIsLoginModalOpen(true)}
        isHomePage={isHomePage}
      />

      {/* Hidden Mobile Sidebar (120x25 fixed trigger on left edge) */}
      <MobileSidebar
        cms={cms}
        currentRole={currentRole}
        activeSection={activeSection}
        onNavigate={handleNavScroll}
        onOpenLogin={() => setIsLoginModalOpen(true)}
        onLogout={handleLogout}
        isHomePage={isHomePage}
      />

      {/* Route Views */}
      {isHomePage && (
        <HomePage
          classes={classes}
          testimonials={testimonials}
          karyaList={karyaList}
          tips={tips}
          faqs={faqs}
          cms={cms}
          currentRole={currentRole}
          onNavigate={handleNavScroll}
          onOpenLogin={() => setIsLoginModalOpen(true)}
          onSelectClass={(slug) => navigateTo(`/kelas/${slug}`)}
          onSelectTip={(slug) => navigateTo(`/tips/${slug}`)}
          onViewAllKarya={() => navigateTo('/karya')}
          onViewAllTips={() => navigateTo('/tips')}
        />
      )}

      {route.page === 'kelas' && (
        <ClassDetailPage
          slug={route.param}
          classes={classes}
          cms={cms}
          currentRole={currentRole}
          onNavigateHome={handleNavScroll}
          onSelectClass={(slug) => navigateTo(`/kelas/${slug}`)}
          onOpenLogin={() => setIsLoginModalOpen(true)}
        />
      )}

      {route.page === 'tips' && !route.param && (
        <TipsListPage
          tips={tips}
          cms={cms}
          currentRole={currentRole}
          onNavigateHome={handleNavScroll}
          onSelectTip={(slug) => navigateTo(`/tips/${slug}`)}
          onOpenLogin={() => setIsLoginModalOpen(true)}
        />
      )}

      {route.page === 'tips' && route.param && (
        <ArticlePage
          slug={route.param}
          tips={tips}
          cms={cms}
          currentRole={currentRole}
          onBack={() => navigateTo('/tips')}
          onOpenLogin={() => setIsLoginModalOpen(true)}
          onNavigateHome={handleNavScroll}
        />
      )}

      {route.page === 'karya' && (
        <PortfolioPage
          karyaList={karyaList}
          cms={cms}
          currentRole={currentRole}
          onNavigateHome={handleNavScroll}
          onOpenLogin={() => setIsLoginModalOpen(true)}
        />
      )}

      {route.page !== 'home' &&
        route.page !== '' &&
        route.page !== 'kelas' &&
        route.page !== 'tips' &&
        route.page !== 'karya' &&
        route.page !== 'admin' && (
          <NotFoundPage onGoHome={() => navigateTo('/')} />
        )}

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSuccess={(role) => {
          setCurrentRole(role);
          navigateTo('/admin');
        }}
        showToast={showToast}
      />

      {/* Toast Notification (0.5s auto-dismiss) */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  );
}
