import React from 'react';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { clinicConfig } from '../config/clinic';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Privacy Policy & Medical Data Confidentiality"
        description={`Privacy Policy and Patient Data Handling procedures for ${clinicConfig.clinicName}.`}
        canonicalPath="/privacy-policy"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Breadcrumbs items={[{ label: 'Privacy Policy' }]} />

        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 my-6 space-y-6 text-slate-600 text-sm leading-relaxed shadow-xs">
          <h1 className="text-3xl font-extrabold text-[#0f2b48]">
            Privacy Policy & Data Security
          </h1>
          <p className="text-xs text-slate-400">
            Last Updated: January 2026 • Governs {clinicConfig.clinicName}
          </p>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-[#0f2b48]">1. Patient Information Confidentiality</h2>
            <p>
              At {clinicConfig.clinicName}, we treat your personal and medical information with utmost clinical confidentiality. Information collected through our appointment booking form (including your name, contact phone number, email, and reason for consultation) is utilized exclusively to schedule and confirm your appointments and maintain internal health records.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-[#0f2b48]">2. No Sharing with Third Parties</h2>
            <p>
              We do not sell, rent, or lease your contact information or clinical history to third-party advertisers, pharmaceutical companies, or marketing agencies. Patient communication is strictly limited to direct clinical scheduling, dental reminders, and critical care updates from our practice.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-[#0f2b48]">3. Photographic and Clinical Consent</h2>
            <p>
              Clinical diagnostic photographs, intraoral scans, and before/after case documentation are taken for diagnosis and treatment records. No clinical image or testimonial is published on public media or this website without prior signed patient authorization.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-[#0f2b48]">4. Contact Our Privacy Officer</h2>
            <p>
              If you have any questions regarding your medical data or wish to request updates to your clinical records, please contact us at {clinicConfig.email} or by phone at {clinicConfig.phoneDisplay}.
            </p>
          </section>
        </div>
      </div>
    </>
  );
};
