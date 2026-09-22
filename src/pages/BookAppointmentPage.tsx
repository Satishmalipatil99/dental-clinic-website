import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Phone, MessageCircle, Clock, ShieldCheck, CheckCircle2, Calendar } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { AppointmentForm } from '../components/appointment/AppointmentForm';
import { clinicConfig, getTelUrl, getWhatsAppUrl } from '../config/clinic';

export const BookAppointmentPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const treatmentParam = searchParams.get('treatment') || undefined;

  return (
    <>
      <SEOHead
        title="Book a Dental Appointment – Safe, Gentle Care"
        description={`Schedule your dental appointment with ${clinicConfig.doctorName} at ${clinicConfig.clinicName}, ${clinicConfig.address.city}. Quick confirmation, gentle care, modern sterilization.`}
        canonicalPath="/book-appointment"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Breadcrumbs items={[{ label: 'Book Appointment' }]} />

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto my-8 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-md border border-teal-100">
            CONFIRMED CLINICAL SLOTS
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0f2b48] tracking-tight">
            Schedule Your Visit
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Reserve your consultation slot with {clinicConfig.doctorName}. We dedicate uninterrupted chair time to every patient.
          </p>
        </div>

        {/* Quick Alternative CTAs: Fast Booking via WhatsApp & Call */}
        <div className="max-w-3xl mx-auto my-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <a
            href={getWhatsAppUrl("Hi, I would like to quickly book an appointment today.")}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 hover:bg-emerald-100/70 transition-all text-emerald-950"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shrink-0">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-800">Need Immediate Booking?</div>
              <div className="text-sm font-bold">Chat directly on WhatsApp</div>
            </div>
          </a>

          <a
            href={getTelUrl()}
            className="flex items-center gap-3 p-4 rounded-2xl bg-blue-50 border border-blue-200 hover:bg-blue-100/70 transition-all text-blue-950"
          >
            <div className="w-10 h-10 rounded-xl bg-[#0f2b48] flex items-center justify-center text-white shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-blue-800">Prefer Talking by Phone?</div>
              <div className="text-sm font-bold">Call {clinicConfig.phoneDisplay}</div>
            </div>
          </a>
        </div>

        {/* Form Container */}
        <div className="max-w-3xl mx-auto my-8">
          <AppointmentForm defaultTreatmentSlug={treatmentParam} />
        </div>

        {/* Trust & Preparation Checklist */}
        <div className="max-w-3xl mx-auto my-12 bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4">
          <h3 className="text-base font-bold text-[#0f2b48] flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-teal-600" />
            <span>What to Expect After Submitting</span>
          </h3>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
              <span><strong>Telephone Confirmation:</strong> Our front office desk coordinator will review chair availability and call/WhatsApp you to confirm your exact appointment timing.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
              <span><strong>Prior Dental Records:</strong> If you have recent dental radiographs (X-rays) or medical prescriptions, bring them along or mention them in the notes.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
              <span><strong>Zero Pressure:</strong> We discuss clinical diagnoses and costs completely before initiating any procedure.</span>
            </li>
          </ul>
        </div>

      </div>
    </>
  );
};
