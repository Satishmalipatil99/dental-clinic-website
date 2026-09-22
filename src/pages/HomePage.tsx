import React from 'react';
import { SEOHead } from '../components/common/SEOHead';
import { HeroSection } from '../components/home/HeroSection';
import { DoctorIntroSection } from '../components/home/DoctorIntroSection';
import { TreatmentGridSection } from '../components/home/TreatmentGridSection';
import { WhyChooseUsSection } from '../components/home/WhyChooseUsSection';
import { PatientJourneySection } from '../components/home/PatientJourneySection';
import { BeforeAfterSection } from '../components/home/BeforeAfterSection';
import { ReviewSection } from '../components/home/ReviewSection';
import { TechnologySection } from '../components/home/TechnologySection';
import { FAQSection } from '../components/home/FAQSection';
import { LocationSection } from '../components/home/LocationSection';
import { clinicConfig } from '../config/clinic';

export const HomePage: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Personalized Dental Care & Advanced Oral Health"
        description={`Welcome to ${clinicConfig.clinicName}. Personalized dental care for you and your family in ${clinicConfig.address.city}. Book an appointment or chat on WhatsApp.`}
        canonicalPath="/"
      />

      <div className="space-y-0">
        <HeroSection />
        <DoctorIntroSection />
        <TreatmentGridSection />
        <WhyChooseUsSection />
        <PatientJourneySection />
        <BeforeAfterSection />
        <ReviewSection />
        <TechnologySection />
        <FAQSection />
        <LocationSection />
      </div>
    </>
  );
};
