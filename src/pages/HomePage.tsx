// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

import React from 'react';
import {
  ClassItem,
  TestimonialItem,
  KaryaItem,
  TipsItem,
  FAQItem,
  CMSSettings,
  UserRole,
} from '../types';
import { HeroSection } from '../components/public/HeroSection';
import { PitaKeunggulan } from '../components/public/PitaKeunggulan';
import { ProfilSection } from '../components/public/ProfilSection';
import { VisiMisiSection } from '../components/public/VisiMisiSection';
import { KelasSection } from '../components/public/KelasSection';
import { AlurBelajarSection } from '../components/public/AlurBelajarSection';
import { KeunggulanSection } from '../components/public/KeunggulanSection';
import { KaryaSection } from '../components/public/KaryaSection';
import { TestimoniSection } from '../components/public/TestimoniSection';
import { TipsSection } from '../components/public/TipsSection';
import { FAQSection } from '../components/public/FAQSection';
import { AjakanSection } from '../components/public/AjakanSection';
import { KontakSection } from '../components/public/KontakSection';
import { Footer } from '../components/common/Footer';
import { WhatsAppFloating } from '../components/common/WhatsAppFloating';

interface HomePageProps {
  classes: ClassItem[];
  testimonials: TestimonialItem[];
  karyaList: KaryaItem[];
  tips: TipsItem[];
  faqs: FAQItem[];
  cms: CMSSettings;
  currentRole: UserRole;
  onNavigate: (target: string) => void;
  onOpenLogin: () => void;
  onSelectClass: (slug: string) => void;
  onSelectTip: (slug: string) => void;
  onViewAllKarya: () => void;
  onViewAllTips: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  classes,
  testimonials,
  karyaList,
  tips,
  faqs,
  cms,
  currentRole,
  onNavigate,
  onOpenLogin,
  onSelectClass,
  onSelectTip,
  onViewAllKarya,
  onViewAllTips,
}) => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <HeroSection cms={cms} onNavigate={onNavigate} />
        <PitaKeunggulan />
        <ProfilSection cms={cms} onNavigate={onNavigate} />
        <VisiMisiSection />
        <KelasSection
          classes={classes}
          cms={cms}
          onSelectClass={onSelectClass}
        />
        <AlurBelajarSection />
        <KeunggulanSection cms={cms} onNavigate={onNavigate} />
        {cms.features.karya && (
          <KaryaSection
            karyaList={karyaList}
            cms={cms}
            onViewAll={onViewAllKarya}
          />
        )}
        {cms.features.testimonials && (
          <TestimoniSection testimonials={testimonials} />
        )}
        {cms.features.tips && (
          <TipsSection
            tips={tips}
            cms={cms}
            onSelectTip={onSelectTip}
            onViewAll={onViewAllTips}
          />
        )}
        {cms.features.faq && <FAQSection faqs={faqs} />}
        <AjakanSection cms={cms} />
        <KontakSection cms={cms} />
      </main>

      <Footer
        cms={cms}
        currentRole={currentRole}
        onNavigate={onNavigate}
        onOpenLogin={onOpenLogin}
      />

      {cms.features.waFloating && (
        <WhatsAppFloating
          phone={cms.footer.waNumber}
          defaultMsg={cms.buttons.waDefaultMsg}
          isHomePage={true}
        />
      )}
    </div>
  );
};
