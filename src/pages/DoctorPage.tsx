import React from 'react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  Award, 
  CheckCircle2, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  MessageCircle,
  FileCheck,
  Stethoscope
} from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { clinicConfig, doctorProfile, getWhatsAppUrl } from '../config/clinic';

export const DoctorPage: React.FC = () => {
  return (
    <>
      <SEOHead
        title={`Meet ${doctorProfile.name} – ${doctorProfile.qualification}`}
        description={`Learn about ${doctorProfile.name}, qualifications (${doctorProfile.qualification}), clinical specialization in ${doctorProfile.specialization}, and schedule in ${clinicConfig.address.city}.`}
        canonicalPath="/doctor"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Breadcrumbs items={[{ label: 'Meet Your Doctor' }]} />

        {/* Doctor Editorial Banner */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-10 lg:p-12 my-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Photo & Registration Card */}
            <div className="lg:col-span-4 space-y-4">
              <div className="rounded-2xl overflow-hidden bg-gradient-to-b from-[#0f2b48] to-[#163b63] p-6 text-white text-center aspect-3/4 flex flex-col justify-between shadow-md">
                <span className="self-end text-xs font-mono bg-white/15 px-2.5 py-1 rounded-md text-teal-300">
                  {doctorProfile.experienceYears}
                </span>

                <div className="my-auto py-4">
                  <div className="w-20 h-20 rounded-2xl bg-teal-500/20 border border-teal-300/30 flex items-center justify-center text-teal-300 mx-auto mb-4">
                    <Stethoscope className="w-10 h-10" />
                  </div>
                  <h2 className="text-2xl font-bold">{doctorProfile.name}</h2>
                  <p className="text-teal-300 text-sm font-medium mt-1">{doctorProfile.qualification}</p>
                  <p className="text-xs text-slate-300 mt-2 max-w-xs mx-auto">{doctorProfile.specialization}</p>
                  <div className="mt-4 text-[10px] text-slate-400 border border-dashed border-white/20 p-2 rounded-lg bg-black/20">
                    📸 Replace with doctor profile photo
                  </div>
                </div>

                <div className="text-xs text-slate-300 bg-white/10 p-2.5 rounded-lg">
                  State Dental Council Reg: <span className="text-white font-mono">{doctorProfile.registrationNumber}</span>
                </div>
              </div>

              {/* Consultation Booking Widget */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Clinical Consultations
                </div>
                <div className="space-y-1 text-xs text-slate-600">
                  {doctorProfile.schedule.map((item, idx) => (
                    <div key={idx} className="flex justify-between py-1 border-b border-slate-200/60 last:border-0">
                      <span className="font-semibold text-slate-800">{item.days}:</span>
                      <span className="text-slate-600">{item.hours}</span>
                    </div>
                  ))}
                </div>
                <Link
                  to="/book-appointment"
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#0f2b48] text-white text-xs font-semibold hover:bg-[#163b63] transition-colors"
                >
                  <Calendar className="w-3.5 h-3.5 text-teal-300" />
                  <span>Book with {doctorProfile.name}</span>
                </Link>
              </div>
            </div>

            {/* Right Detailed Bio & Credentials */}
            <div className="lg:col-span-8 space-y-8">
              
              <div className="space-y-2 border-b border-slate-100 pb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-md border border-teal-100">
                  CHIEF DENTAL SURGEON
                </span>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0f2b48] tracking-tight">
                  {doctorProfile.name}
                </h1>
                <p className="text-base sm:text-lg text-teal-800 font-semibold">
                  {doctorProfile.qualification}
                </p>
                <p className="text-sm text-slate-600">
                  Specialty: {doctorProfile.specialization}
                </p>
              </div>

              {/* Detailed Bio */}
              <div className="space-y-4 text-slate-600 leading-relaxed text-sm sm:text-base">
                {doctorProfile.bioParagraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              {/* Verified Credentials */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <h3 className="text-base font-bold text-[#0f2b48] flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-teal-600" />
                  <span>Academic Qualifications & Training</span>
                </h3>
                <ul className="space-y-2 text-sm text-slate-600">
                  {doctorProfile.credentials.map((cred, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                      <span>{cred}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Clinical Focus */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <h3 className="text-base font-bold text-[#0f2b48] flex items-center gap-2">
                  <Award className="w-5 h-5 text-teal-600" />
                  <span>Specialized Clinical Procedures</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-sm text-slate-600">
                  {doctorProfile.clinicalFocus.map((focus, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                      <div className="w-2 h-2 rounded-full bg-teal-500" />
                      <span>{focus}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Professional Memberships */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <h3 className="text-base font-bold text-[#0f2b48] flex items-center gap-2">
                  <FileCheck className="w-5 h-5 text-teal-600" />
                  <span>Professional Affiliations</span>
                </h3>
                <ul className="space-y-1.5 text-sm text-slate-600">
                  {doctorProfile.memberships.map((mem, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="text-teal-600">•</span>
                      <span>{mem}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Direct WhatsApp Consultation button */}
              <div className="pt-6 border-t border-slate-100 flex flex-wrap gap-4">
                <a
                  href={getWhatsAppUrl(`Hi, I would like to schedule a consultation with ${doctorProfile.name}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition-colors shadow-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Ask a Question on WhatsApp</span>
                </a>

                <Link
                  to="/book-appointment"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0f2b48] hover:bg-[#163b63] text-white text-sm font-semibold transition-colors"
                >
                  <Calendar className="w-4 h-4 text-teal-300" />
                  <span>Book In-Clinic Visit</span>
                </Link>
              </div>

            </div>

          </div>
        </div>

      </div>
    </>
  );
};
