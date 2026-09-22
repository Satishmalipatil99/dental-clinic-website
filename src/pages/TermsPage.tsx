import React from 'react';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { clinicConfig } from '../config/clinic';

export const TermsPage: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Terms of Service & Clinical Appointments Policy"
        description={`Website Terms and Clinic Policy for ${clinicConfig.clinicName}.`}
        canonicalPath="/terms"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Breadcrumbs items={[{ label: 'Terms & Conditions' }]} />

        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 my-6 space-y-6 text-slate-600 text-sm leading-relaxed shadow-xs">
          <h1 className="text-3xl font-extrabold text-[#0f2b48]">
            Terms of Service & Clinical Policies
          </h1>
          <p className="text-xs text-slate-400">
            Last Updated: January 2026 • Governs {clinicConfig.clinicName}
          </p>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-[#0f2b48]">1. Educational Disclaimer</h2>
            <p>
              The articles, guides, symptoms lists, and procedural descriptions provided on this website are intended solely for general patient education. They do not constitute formal medical diagnosis, prognosis, or legal warranties of clinical outcomes. Every human body and dental condition is biologically unique and requires clinical evaluation by a licensed dental practitioner.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-[#0f2b48]">2. Appointment Scheduling & Cancellations</h2>
            <p>
              Submissions through our online appointment form represent preliminary visit requests. An appointment slot is finalized only once our clinic coordination desk contacts you and confirms availability. If you need to reschedule or cancel your visit, we kindly request at least 24 hours advance notice so that chair time may be offered to other patients requiring care.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-[#0f2b48]">3. Treatment Estimates</h2>
            <p>
              Indicative procedure durations and descriptions are clinical estimates. Final treatment plans and fee structures are established following direct clinical examination, diagnostic radiographs, and doctor consultation.
            </p>
          </section>
        </div>
      </div>
    </>
  );
};
