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
    return { page, param };
  };

  const [route, setRoute] = useState(getRouteFromHash);

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(getRouteFromHash());
      window.scrollTo(0, 0);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Tarik data terbaru dari spreadsheet saat awal dibuka, saat tab aktif, dan berkala setiap 15 detik (real-time cross-device sync)
  useEffect(() => {
    const refreshData = () => {
      StorageService.pullFromAppsScript().then((pulled) => {
        if (pulled) {
          setClasses(StorageService.getClasses());
          setTestimonials(StorageService.getTestimonials());
          setKaryaList(StorageService.getKarya());
          setTips(StorageService.getTips());
          setFaqs(StorageService.getFaqs());
          setCms(StorageService.getCMS());
          setAdmins(StorageService.getAdmins());
        }
      });
    };

    refreshData();

    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        refreshData();
      }
    };

    window.addEventListener('visibilitychange', handleVisibility);
    window.addEventListener('focus', refreshData);
    const pollInterval = setInterval(refreshData, 15000);

    return () => {
      clearInterval(pollInterval);
      window.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('focus', refreshData);
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
  const handleSaveClasses = (newClasses: ClassItem[]) => {
    setClasses(newClasses);
    StorageService.saveClasses(newClasses);
    setLogs(StorageService.getLogs());
  };

  const handleSaveTestimonials = (newTestimonials: TestimonialItem[]) => {
    setTestimonials(newTestimonials);
    StorageService.saveTestimonials(newTestimonials);
    setLogs(StorageService.getLogs());
  };

  const handleSaveKarya = (newKarya: KaryaItem[]) => {
    setKaryaList(newKarya);
    StorageService.saveKarya(newKarya);
    setLogs(StorageService.getLogs());
  };

  const handleSaveTips = (newTips: TipsItem[]) => {
    setTips(newTips);
    StorageService.saveTips(newTips);
    setLogs(StorageService.getLogs());
  };

  const handleSaveFaqs = (newFaqs: FAQItem[]) => {
    setFaqs(newFaqs);
    StorageService.saveFaqs(newFaqs);
    setLogs(StorageService.getLogs());
  };

  const handleSaveCMS = (newCMS: CMSSettings) => {
    setCms(newCMS);
    StorageService.saveCMS(newCMS);
    setLogs(StorageService.getLogs());
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
          onSelectTab={(tab) => navigateTo(`/admin/${tab}`)}
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
          {currentAdminTab === 'sandi' && (
            <AdminPassword
              currentRole={currentRole}
              showToast={showToast}
            />
          )}
          {currentAdminTab === 'cms' && (
            <AdminCMS
              currentRole={currentRole}
              cms={cms}
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
          {currentAdminTab === 'akun' && currentRole === 'superadmin' && (
            <AdminAccounts
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
