import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { 
  ArrowRight, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Calendar, 
  MessageCircle, 
  ChevronDown, 
  ShieldCheck, 
  HeartHandshake,
  Activity,
  Layers,
  Sparkles
} from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { MedicalDisclaimer } from '../components/common/MedicalDisclaimer';
import { treatmentsData, getTreatmentBySlug } from '../config/treatments';
import { clinicConfig, getWhatsAppUrl, getTelUrl } from '../config/clinic';
import { trackEvent } from '../utils/analytics';

export const TreatmentDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const treatment = slug ? getTreatmentBySlug(slug) : undefined;

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  if (!treatment) {
    return <Navigate to="/treatments" replace />;
  }

  const symptomsList = treatment.symptoms || treatment.commonSigns || [];
  const benefitsList = treatment.benefits || treatment.recommendedWhen || [];
  const aftercareList = treatment.aftercareGuidelines || treatment.aftercare || [];
  const comfortText = treatment.comfortAndAnesthesia || treatment.anesthesiaType || 'Our clinic prioritizes gentle, painless dental procedures with modern local anesthesia and continuous patient feedback.';

  // Related treatments (excluding current)
  const relatedTreatments = treatmentsData
    .filter(t => t.id !== treatment.id)
    .slice(0, 3);

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(prev => (prev === idx ? null : idx));
  };

  const whatsappInquiryMsg = `Hi ${clinicConfig.clinicName}, I am interested in learning more or booking a consultation for ${treatment.name}.`;

  return (
    <>
      <SEOHead
        title={`${treatment.name} – Clinical Guide, Procedure & Recovery`}
        description={treatment.shortDescription}
        canonicalPath={`/treatments/${treatment.slug}`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Breadcrumbs 
          items={[
            { label: 'Treatments', href: '/treatments' },
            { label: treatment.name }
          ]} 
        />

        {/* 1. Treatment Hero Banner */}
        <div className="bg-gradient-to-br from-[#0f2b48] via-[#12365a] to-[#163b63] rounded-3xl p-6 sm:p-10 lg:p-12 text-white my-6 shadow-md relative overflow-hidden">
          <div className="max-w-3xl space-y-4 relative z-10">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-teal-500/20 text-teal-300 border border-teal-500/30">
              DENTAL SPECIALTY PROCEDURE
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
              {treatment.name}
            </h1>
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal">
              {treatment.shortDescription}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                to="/book-appointment"
                onClick={() => trackEvent('cta_click', { source: `treatment_hero_${treatment.slug}` })}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-900 font-bold text-sm transition-all shadow-md active:scale-98"
              >
                <Calendar className="w-4 h-4 text-slate-900" />
                <span>Book {treatment.name} Visit</span>
              </Link>

              <a
                href={getWhatsAppUrl(whatsappInquiryMsg)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('whatsapp_click', { source: `treatment_hero_${treatment.slug}` })}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-sm transition-all border border-white/20"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp Query</span>
              </a>
            </div>
          </div>
        </div>

        {/* Main Grid: 2/3 Content, 1/3 Sticky Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 my-10">
          
          {/* Main Content Column */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* 2. What is this treatment? */}
            <section className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 space-y-4 shadow-xs">
              <h2 className="text-2xl font-bold text-[#0f2b48] flex items-center gap-2.5">
                <span className="w-2.5 h-6 rounded-full bg-teal-600 inline-block" />
                <span>What is {treatment.name}?</span>
              </h2>
              <p className="text-slate-600 leading-relaxed text-base">
                {treatment.overview}
              </p>
            </section>

            {/* 3. Signs you may need this treatment */}
            <section className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 space-y-4 shadow-xs">
              <h2 className="text-2xl font-bold text-[#0f2b48] flex items-center gap-2.5">
                <span className="w-2.5 h-6 rounded-full bg-teal-600 inline-block" />
                <span>Signs You May Need This Treatment</span>
              </h2>
              <p className="text-sm text-slate-500">
                You might benefit from a consultation for {treatment.name} if you are experiencing any of the following symptoms:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {symptomsList.map((symptom, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                    <AlertCircle className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-700 font-medium">{symptom}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* 4. Procedure / Treatment Steps */}
            <section className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 space-y-6 shadow-xs">
              <h2 className="text-2xl font-bold text-[#0f2b48] flex items-center gap-2.5">
                <span className="w-2.5 h-6 rounded-full bg-teal-600 inline-block" />
                <span>The Procedure: Step-by-Step</span>
              </h2>
              <p className="text-sm text-slate-500">
                Our clinical protocol emphasizes precision, minimal invasiveness, and step-by-step patient clarity.
              </p>
              <div className="space-y-4">
                {treatment.procedureSteps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-[#fcfdfd] border border-slate-200/70">
                    <span className="w-8 h-8 rounded-xl bg-teal-50 border border-teal-200/80 text-teal-800 font-bold font-mono text-sm flex items-center justify-center shrink-0">
                      0{idx + 1}
                    </span>
                    <div>
                      <h3 className="text-base font-bold text-[#0f2b48] mb-1">
                        {step.title}
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 5. Benefits of this treatment */}
            <section className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 space-y-4 shadow-xs">
              <h2 className="text-2xl font-bold text-[#0f2b48] flex items-center gap-2.5">
                <span className="w-2.5 h-6 rounded-full bg-teal-600 inline-block" />
                <span>Benefits & Indications</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                {benefitsList.map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-teal-50/40 border border-teal-100">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* 6. What to expect during treatment (Anesthesia, comfort) */}
            <section className="bg-slate-50 rounded-2xl border border-slate-200/90 p-6 sm:p-8 space-y-3">
              <div className="flex items-center gap-2 text-teal-800 font-bold text-lg">
                <HeartHandshake className="w-5 h-5 text-teal-600" />
                <span>What to Expect: Patient Comfort & Pain Management</span>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                {comfortText}
              </p>
              <div className="flex items-center gap-2 text-xs text-slate-500 pt-2">
                <Clock className="w-4 h-4 text-teal-600" />
                <span><strong>Estimated Duration:</strong> {treatment.durationEstimate}</span>
              </div>
            </section>

            {/* 7. Post-treatment care / recovery */}
            <section className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 space-y-4 shadow-xs">
              <h2 className="text-2xl font-bold text-[#0f2b48] flex items-center gap-2.5">
                <span className="w-2.5 h-6 rounded-full bg-teal-600 inline-block" />
                <span>Aftercare & Recovery Guidelines</span>
              </h2>
              <p className="text-sm text-slate-500">
                Adhering to personalized post-operative care guarantees optimal tissue healing and long-term restorative success:
              </p>
              <ul className="space-y-2.5 pt-2">
                {aftercareList.map((guide, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-slate-600">
                    <span className="text-teal-600 font-bold">•</span>
                    <span>{guide}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* 8. FAQs for this treatment */}
            <section className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 space-y-6 shadow-xs">
              <h2 className="text-2xl font-bold text-[#0f2b48] flex items-center gap-2.5">
                <span className="w-2.5 h-6 rounded-full bg-teal-600 inline-block" />
                <span>{treatment.name} FAQs</span>
              </h2>
              <div className="space-y-3">
                {treatment.faqs.map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div 
                      key={idx} 
                      className="border border-slate-200 rounded-xl overflow-hidden"
                    >
                      <button
                        type="button"
                        onClick={() => toggleFaq(idx)}
                        className="w-full text-left p-4 flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-[#0f2b48] hover:bg-slate-50 transition-colors"
                      >
                        <span>{faq.question}</span>
                        <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4 text-sm text-slate-600 border-t border-slate-100 pt-3 leading-relaxed">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Mandatory Pricing & Medical Disclaimers */}
            <div className="bg-amber-50/60 border border-amber-200/70 rounded-2xl p-5 text-xs text-amber-900 leading-relaxed">
              <strong className="block font-semibold mb-1">Clinical Pricing Transparency Notice:</strong>
              Treatment costs vary based on clinical diagnosis, tooth anatomical complexity, and restorative materials required. Please book an initial consultation for an accurate individualized assessment and transparent cost estimate before starting treatment.
            </div>

            <MedicalDisclaimer />

          </div>

          {/* Sticky Consultation Sidebar (1/3 Width) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="sticky top-28 space-y-6">
              
              {/* Primary Appointment Booking Card */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-md space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md">
                  SCHEDULE VISIT
                </span>
                <h3 className="text-xl font-bold text-[#0f2b48]">
                  Need a Consultation for {treatment.name}?
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Meet our dental surgeons in {clinicConfig.address.city} for an individualized evaluation.
                </p>

                <div className="pt-2 space-y-2.5">
                  <Link
                    to="/book-appointment"
                    onClick={() => trackEvent('cta_click', { source: `treatment_sidebar_${treatment.slug}` })}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#0f2b48] hover:bg-[#163b63] text-white font-semibold text-sm transition-all shadow-xs"
                  >
                    <Calendar className="w-4 h-4 text-teal-300" />
                    <span>Book Appointment Online</span>
                  </Link>

                  <a
                    href={getWhatsAppUrl(whatsappInquiryMsg)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent('whatsapp_click', { source: `treatment_sidebar_${treatment.slug}` })}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-all shadow-xs"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Consult on WhatsApp</span>
                  </a>

                  <a
                    href={getTelUrl()}
                    onClick={() => trackEvent('phone_click', { source: `treatment_sidebar_${treatment.slug}` })}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium text-xs transition-colors"
                  >
                    <span>Direct Call: {clinicConfig.phoneDisplay}</span>
                  </a>
                </div>
              </div>

              {/* Related Treatments Internal Links (Mandated in Prompt #23) */}
              <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Related Dental Procedures
                </h4>
                <ul className="space-y-2">
                  {relatedTreatments.map(rel => (
                    <li key={rel.id}>
                      <Link
                        to={`/treatments/${rel.slug}`}
                        className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200/80 hover:border-teal-300 hover:text-teal-800 text-slate-700 text-xs font-semibold transition-all group"
                      >
                        <span>{rel.name}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-teal-600 group-hover:translate-x-0.5 transition-all" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>

        </div>

      </div>
    </>
  );
};
