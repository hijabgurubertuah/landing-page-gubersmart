/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.
 */

import React, { useState, useEffect } from 'react';
import { 
  ClassItem, TestimonialItem, PortfolioItem, TipItem, FaqItem, 
  CmsSettings, AdminUser, ActivityLogItem, ClickStatItem, UserRole 
} from './types';
import { 
  initialClasses, initialTestimonials, initialPortfolio, initialTips, 
  initialFaqs, initialCmsSettings, initialAdminUsers, initialActivityLogs, 
  initialClickStats, loadStorageData, saveStorageData 
} from './data/initialData';

import { Header } from './components/common/Header';
import { MobileSidebar } from './components/common/MobileSidebar';
import { Footer } from './components/common/Footer';
import { NotificationToast } from './components/common/NotificationToast';

import { Home } from './components/public/Home';
import { ClassDetail } from './components/public/ClassDetail';
import { TipsList } from './components/public/TipsList';
import { TipDetail } from './components/public/TipDetail';
import { PortfolioList } from './components/public/PortfolioList';
import { NotFound } from './components/public/NotFound';

import { AdminLayout } from './components/admin/AdminLayout';
import { DashboardView } from './components/admin/DashboardView';
import { ClassesManage } from './components/admin/ClassesManage';
import { TestimonialsManage } from './components/admin/TestimonialsManage';
import { PortfolioManage } from './components/admin/PortfolioManage';
import { TipsManage } from './components/admin/TipsManage';
import { FaqManage } from './components/admin/FaqManage';
import { PasswordManage } from './components/admin/PasswordManage';

import { CmsManager } from './components/superadmin/CmsManager';
import { SyncManager } from './components/superadmin/SyncManager';
import { FirebaseTab } from './components/superadmin/FirebaseTab';
import { ActivityLogs } from './components/superadmin/ActivityLogs';
import { AdminManage } from './components/superadmin/AdminManage';

export default function App() {
  const [classes, setClasses] = useState<ClassItem[]>(() => loadStorageData('classes', initialClasses));
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(() => loadStorageData('testimonials', initialTestimonials));
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>(() => loadStorageData('portfolio', initialPortfolio));
  const [tips, setTips] = useState<TipItem[]>(() => loadStorageData('tips', initialTips));
  const [faqs, setFaqs] = useState<FaqItem[]>(() => loadStorageData('faqs', initialFaqs));
  const [cms, setCms] = useState<CmsSettings>(() => loadStorageData('cms', initialCmsSettings));
  const [admins, setAdmins] = useState<AdminUser[]>(() => loadStorageData('admins', initialAdminUsers));
  const [activityLogs, setActivityLogs] = useState<ActivityLogItem[]>(() => loadStorageData('logs', initialActivityLogs));
  const [clickStats, setClickStats] = useState<ClickStatItem[]>(() => loadStorageData('stats', initialClickStats));

  const [currentUser, setCurrentUser] = useState<UserRole>(() => loadStorageData('currentUser', 'publik'));
  const [currentAdmin, setCurrentAdmin] = useState<AdminUser | null>(() => loadStorageData('currentAdmin', null));
  const [activeAdminTab, setActiveAdminTab] = useState('dasbor');
  const [activeCmsSubTab, setActiveCmsSubTab] = useState('identitas');

  const [viewRoute, setViewRoute] = useState<'home' | 'classDetail' | 'tipsList' | 'tipDetail' | 'portfolioList' | 'notFound' | 'admin'>('home');
  const [selectedClassId, setSelectedClassId] = useState<string | null>(null);
  const [selectedTipId, setSelectedTipId] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState('beranda');
  const [toastMessage, setToastMessage] = useState('');

  // Save to localStorage whenever state changes
  useEffect(() => { saveStorageData('classes', classes); }, [classes]);
  useEffect(() => { saveStorageData('testimonials', testimonials); }, [testimonials]);
  useEffect(() => { saveStorageData('portfolio', portfolio); }, [portfolio]);
  useEffect(() => { saveStorageData('tips', tips); }, [tips]);
  useEffect(() => { saveStorageData('faqs', faqs); }, [faqs]);
  useEffect(() => { saveStorageData('cms', cms); }, [cms]);
  useEffect(() => { saveStorageData('admins', admins); }, [admins]);
  useEffect(() => { saveStorageData('logs', activityLogs); }, [activityLogs]);
  useEffect(() => { saveStorageData('stats', clickStats); }, [clickStats]);
  useEffect(() => { saveStorageData('currentUser', currentUser); }, [currentUser]);
  useEffect(() => { saveStorageData('currentAdmin', currentAdmin); }, [currentAdmin]);

  // Sync document title, meta description, and favicon dynamically from CMS identity
  useEffect(() => {
    if (cms.identity.seoTitle || cms.identity.appName) {
      document.title = cms.identity.seoTitle || cms.identity.appName;
    }
    if (cms.identity.seoDesc) {
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', cms.identity.seoDesc);
      }
    }
    const faviconVal = cms.identity.favicon.value || cms.identity.logo.value;
    if (faviconVal) {
      const faviconSrc = faviconVal.startsWith('http') ? faviconVal : `data:image/png;base64,${faviconVal}`;
      let link: HTMLLinkElement | null = document.querySelector("link[rel*='icon']");
      if (!link) {
        link = document.createElement('link');
        link.type = 'image/x-icon';
        link.rel = 'shortcut icon';
        document.getElementsByTagName('head')[0].appendChild(link);
      }
      link.href = faviconSrc;
    }
  }, [cms.identity]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  const handleLogin = (password: string): boolean => {
    const foundAdmin = admins.find(a => a.passwordHash === password && a.active);
    if (foundAdmin) {
      setCurrentUser(foundAdmin.role);
      setCurrentAdmin(foundAdmin);
      setViewRoute('admin');
      setActiveAdminTab('dasbor');
      
      const newLog: ActivityLogItem = {
        id: `log-${Date.now()}`,
        role: foundAdmin.role,
        action: `Masuk ke sistem sebagai ${foundAdmin.name}`,
        timestamp: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) + ', ' + new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB'
      };
      setActivityLogs([newLog, ...activityLogs]);
      showToast('Berhasil masuk');
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setCurrentUser('publik');
    setCurrentAdmin(null);
    setViewRoute('home');
    showToast('Berhasil keluar');
  };

  const handleRegisterClick = (classId?: string, url?: string) => {
    if (classId) {
      setClickStats(prev => {
        const existing = prev.find(s => s.classId === classId);
        if (existing) {
          return prev.map(s => s.classId === classId ? { ...s, count: s.count + 1 } : s);
        }
        return [...prev, { classId, count: 1, date: new Date().toISOString().split('T')[0] }];
      });
    }
    const targetUrl = url || cms.buttons.find(b => b.show)?.url || 'https://lynk.id/gubersmart';
    window.open(targetUrl, '_blank');
  };

  const handleNavigate = (url: string) => {
    if (url.startsWith('#')) {
      setViewRoute('home');
      setTimeout(() => {
        const el = document.getElementById(url.replace('#', ''));
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else if (url === 'tips') {
      setViewRoute('tipsList');
    } else if (url === 'karya') {
      setViewRoute('portfolioList');
    }
  };

  // If in admin mode
  if (viewRoute === 'admin' && currentUser !== 'publik') {
    return (
      <AdminLayout
        cms={cms}
        currentUser={currentUser}
        currentAdmin={currentAdmin}
        activeTab={activeAdminTab}
        activeCmsSubTab={activeCmsSubTab}
        onSelectTab={(tab, subTab) => {
          setActiveAdminTab(tab);
          if (subTab) setActiveCmsSubTab(subTab);
        }}
        onSelectCmsSubTab={(subTab) => {
          setActiveCmsSubTab(subTab);
          setActiveAdminTab('cms');
        }}
        onLogout={handleLogout}
        onBackToPublic={() => setViewRoute('home')}
      >
        {activeAdminTab === 'dasbor' && (
          <DashboardView
            classes={classes}
            testimonials={testimonials}
            tips={tips}
            clickStats={clickStats}
            activityLogs={activityLogs}
          />
        )}
        {activeAdminTab === 'kelas' && (
          <ClassesManage
            classes={classes}
            onSaveClass={(cls) => {
              setClasses(prev => {
                const idx = prev.findIndex(c => c.id === cls.id);
                if (idx >= 0) {
                  const updated = [...prev];
                  updated[idx] = cls;
                  return updated;
                }
                return [...prev, cls];
              });
            }}
            onDeleteClass={(id) => setClasses(prev => prev.filter(c => c.id !== id))}
            onArchiveClass={(id) => setClasses(prev => prev.map(c => c.id === id ? { ...c, status: 'arsip' } : c))}
            onShowToast={showToast}
          />
        )}
        {activeAdminTab === 'testimoni' && (
          <TestimonialsManage
            testimonials={testimonials}
            onSave={(item) => setTestimonials(prev => {
              const idx = prev.findIndex(t => t.id === item.id);
              if (idx >= 0) {
                const updated = [...prev];
                updated[idx] = item;
                return updated;
              }
              return [...prev, item];
            })}
            onDelete={(id) => setTestimonials(prev => prev.filter(t => t.id !== id))}
            onShowToast={showToast}
          />
        )}
        {activeAdminTab === 'karya' && (
          <PortfolioManage
            portfolio={portfolio}
            onSave={(item) => setPortfolio(prev => {
              const idx = prev.findIndex(p => p.id === item.id);
              if (idx >= 0) {
                const updated = [...prev];
                updated[idx] = item;
                return updated;
              }
              return [...prev, item];
            })}
            onDelete={(id) => setPortfolio(prev => prev.filter(p => p.id !== id))}
            onShowToast={showToast}
          />
        )}
        {activeAdminTab === 'faq' && (
          <FaqManage
            faqs={faqs}
            onSave={(item) => setFaqs(prev => {
              const idx = prev.findIndex(f => f.id === item.id);
              if (idx >= 0) {
                const updated = [...prev];
                updated[idx] = item;
                return updated;
              }
              return [...prev, item];
            })}
            onDelete={(id) => setFaqs(prev => prev.filter(f => f.id !== id))}
            onShowToast={showToast}
          />
        )}
        {activeAdminTab === 'cms' && currentUser === 'superadmin' && (
          <CmsManager
            cms={cms}
            onSaveCms={(newCms) => setCms(newCms)}
            currentUser={currentUser}
            onShowToast={showToast}
            activeTab={activeCmsSubTab}
            onTabChange={setActiveCmsSubTab}
          />
        )}
        {activeAdminTab === 'sinkronisasi' && currentUser === 'superadmin' && (
          <SyncManager
            cms={cms}
            onSaveSync={(syncData) => setCms({ ...cms, sync: syncData })}
            onShowToast={showToast}
          />
        )}
        {activeAdminTab === 'firebase' && currentUser === 'superadmin' && (
          <FirebaseTab />
        )}
        {(activeAdminTab === 'akun' || activeAdminTab === 'sandi' || activeAdminTab === 'kelola-admin') && (
          <div className="space-y-8">
            <PasswordManage
              currentUser={currentUser}
              currentAdmin={currentAdmin}
              onUpdatePassword={(newPass) => {
                if (currentAdmin) {
                  setAdmins(prev => prev.map(a => a.id === currentAdmin.id ? { ...a, passwordHash: newPass } : a));
                }
              }}
              onShowToast={showToast}
            />
            {currentUser === 'superadmin' && (
              <AdminManage
                admins={admins}
                onSaveAdmin={(adm) => setAdmins(prev => {
                  const idx = prev.findIndex(a => a.id === adm.id);
                  if (idx >= 0) {
                    const updated = [...prev];
                    updated[idx] = adm;
                    return updated;
                  }
                  return [...prev, adm];
                })}
                onDeleteAdmin={(id) => setAdmins(prev => prev.filter(a => a.id !== id))}
                onShowToast={showToast}
              />
            )}
          </div>
        )}
        <NotificationToast message={toastMessage} onClose={() => setToastMessage('')} />
      </AdminLayout>
    );
  }

  const selectedClass = classes.find(c => c.id === selectedClassId);
  const selectedTip = tips.find(t => t.id === selectedTipId);

  return (
    <div className="min-h-screen bg-[#f8f5ef] text-[#1b2433] flex flex-col">
      <Header
        cms={cms}
        activeSection={activeSection}
        onNavigate={handleNavigate}
        currentUser={currentUser}
        onLogin={handleLogin}
        onOpenDashboard={() => {
          setViewRoute('admin');
          setActiveAdminTab('dasbor');
        }}
        onOpenSidebar={() => {}}
      />

      <MobileSidebar
        cms={cms}
        activeSection={activeSection}
        onNavigate={handleNavigate}
        currentUser={currentUser}
        onOpenLoginModal={() => {}}
        onOpenDashboard={() => {
          setViewRoute('admin');
          setActiveAdminTab('dasbor');
        }}
      />

      <main className="flex-1">
        {viewRoute === 'home' && (
          <Home
            cms={cms}
            classes={classes}
            testimonials={testimonials}
            portfolio={portfolio}
            tips={tips}
            faqs={faqs}
            onSelectClass={(cls) => {
              setSelectedClassId(cls.id);
              setViewRoute('classDetail');
              window.scrollTo(0, 0);
            }}
            onSelectTip={(tip) => {
              setSelectedTipId(tip.id);
              setViewRoute('tipDetail');
              window.scrollTo(0, 0);
            }}
            onViewAllTips={() => {
              setViewRoute('tipsList');
              window.scrollTo(0, 0);
            }}
            onViewAllPortfolio={() => {
              setViewRoute('portfolioList');
              window.scrollTo(0, 0);
            }}
            onRegisterClick={handleRegisterClick}
          />
        )}

        {viewRoute === 'classDetail' && selectedClass && (
          <ClassDetail
            classItem={selectedClass}
            allClasses={classes}
            cms={cms}
            onBack={() => setViewRoute('home')}
            onSelectClass={(cls) => {
              setSelectedClassId(cls.id);
              window.scrollTo(0, 0);
            }}
            onRegisterClick={handleRegisterClick}
          />
        )}

        {viewRoute === 'tipsList' && (
          <TipsList
            tips={tips}
            cms={cms}
            onSelectTip={(tip) => {
              setSelectedTipId(tip.id);
              setViewRoute('tipDetail');
              window.scrollTo(0, 0);
            }}
            onBackToHome={() => setViewRoute('home')}
          />
        )}

        {viewRoute === 'tipDetail' && selectedTip && (
          <TipDetail
            tip={selectedTip}
            onBack={() => setViewRoute('tipsList')}
          />
        )}

        {viewRoute === 'portfolioList' && (
          <PortfolioList
            portfolio={portfolio}
            cms={cms}
            onBack={() => setViewRoute('home')}
          />
        )}

        {viewRoute === 'notFound' && (
          <NotFound onBackToHome={() => setViewRoute('home')} />
        )}
      </main>

      <Footer cms={cms} onNavigate={handleNavigate} />
      <NotificationToast message={toastMessage} onClose={() => setToastMessage('')} />
    </div>
  );
}
