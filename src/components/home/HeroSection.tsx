import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  MessageCircle, 
  ShieldCheck, 
  Sparkles, 
  Clock, 
  MapPin, 
  Phone,
  CheckCircle2,
  Award
} from 'lucide-react';
import { clinicConfig, getWhatsAppUrl, getTelUrl } from '../../config/clinic';
import { trackEvent } from '../../utils/analytics';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-white py-12 md:py-20 lg:py-24 border-b border-slate-100">
      {/* Subtle architectural background pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#0f2b48_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline, Subtitle, CTAs, and Trust Area */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Accreditation / Trust Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-200/80 text-teal-900 text-xs font-semibold tracking-wide">
              <ShieldCheck className="w-4 h-4 text-teal-600" />
              <span>{clinicConfig.clinicName} • Dental & Implant Care</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0f2b48] tracking-tight leading-[1.12]">
              YOUR SMILE. <br />
              <span className="text-teal-700">OUR PRIORITY.</span>
            </h1>

            {/* Sub-headline */}
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Personalized dental care for you and your family. Experienced clinical diagnosis, conservative treatment pathways, and gentle techniques in a calm, modern facility.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <Link
                to="/book-appointment"
                onClick={() => trackEvent('cta_click', { source: 'hero_primary' })}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#0f2b48] hover:bg-[#163b63] text-white font-semibold text-base transition-all shadow-md shadow-blue-950/20 active:scale-98"
              >
                <Calendar className="w-5 h-5 text-teal-300" />
                <span>Book an Appointment</span>
              </Link>

              <a
                href={getWhatsAppUrl("Hi, I would like to book a dental appointment.")}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('whatsapp_click', { source: 'hero_secondary' })}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-base transition-all shadow-xs active:scale-98"
              >
                <MessageCircle className="w-5 h-5" />
                <span>WhatsApp Us</span>
              </a>

              <a
                href={getTelUrl()}
                onClick={() => trackEvent('phone_click', { source: 'hero_call' })}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium text-base transition-all"
                title={`Call ${clinicConfig.phoneDisplay}`}
              >
                <Phone className="w-4 h-4 text-teal-600" />
                <span className="text-sm">Direct Call</span>
              </a>
            </div>

            {/* Trust Area Beneath CTA (Mandated by Prompt #10) */}
            <div className="pt-6 border-t border-slate-200/80">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
                <div className="flex items-center gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-100">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-slate-800">Qualified Dentist</div>
                    <div className="text-[11px] text-slate-500">{clinicConfig.qualification}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-100">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-slate-800">Personalized Care</div>
                    <div className="text-[11px] text-slate-500">Tailored treatment plans</div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-100">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-slate-800">Modern Facility</div>
                    <div className="text-[11px] text-slate-500">Digital diagnostics & hygiene</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: High-Quality Doctor/Clinic Showcase Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Visual Presentation Card */}
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-[#0f2b48] to-[#163b63] p-1 shadow-2xl shadow-slate-900/15">
                <div className="relative rounded-[22px] overflow-hidden bg-slate-900 aspect-4/5 flex flex-col justify-between p-6 sm:p-8 text-white">
                  
                  {/* Decorative background visual overlay */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(20,184,166,0.25),transparent_60%)]" />
                  
                  {/* Top card pill */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 backdrop-blur-md border border-white/20 text-teal-200">
                      Primary Clinical Director
                    </span>
                    <span className="text-xs text-slate-300 font-mono">
                      Reg: {clinicConfig.registrationNumber}
                    </span>
                  </div>

                  {/* Center Placeholder Graphic System */}
                  <div className="relative z-10 text-center my-auto py-8">
                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-teal-500/30 to-blue-400/20 border border-teal-300/30 mx-auto flex items-center justify-center mb-4 text-teal-300 shadow-inner">
                      <Award className="w-12 h-12" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                      {clinicConfig.doctorName}
                    </h3>
                    <p className="text-teal-300 font-medium text-sm mt-1">
                      {clinicConfig.qualification}
                    </p>
                    <p className="text-xs text-slate-300 max-w-xs mx-auto mt-2 leading-relaxed">
                      {clinicConfig.specialization}
                    </p>
                    <div className="mt-4 inline-block px-3 py-1 rounded-md text-[11px] text-slate-400 bg-black/30 border border-white/10">
                      📸 Doctor Photo Placeholder • Replace with real clinic photo
                    </div>
                  </div>

                  {/* Card bottom summary strip */}
                  <div className="relative z-10 p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-xs text-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-teal-300" />
                      <span>{clinicConfig.openingHours.weekdays}</span>
                    </div>
                    <Link 
                      to="/doctor" 
                      className="text-teal-300 hover:text-white font-semibold underline underline-offset-2 transition-colors"
                    >
                      View Profile →
                    </Link>
                  </div>
                </div>
              </div>

              {/* Floating Trust Indicator Pill */}
              <div className="absolute -bottom-5 -left-4 sm:-left-6 bg-white rounded-2xl p-3.5 shadow-xl border border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center text-teal-700 font-bold text-sm">
                  100%
                </div>
                <div>
                  <div className="text-xs font-bold text-[#0f2b48]">Sterilized Instruments</div>
                  <div className="text-[11px] text-slate-500">Class-B Vacuum Autoclaved</div>
                </div>
              </div>

              {/* Floating Location Pill */}
              <div className="absolute -top-4 -right-4 sm:-right-6 bg-white rounded-2xl p-3 shadow-lg border border-slate-100 hidden sm:flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-teal-600 shrink-0" />
                <div className="text-xs font-semibold text-slate-700">
                  {clinicConfig.address.city}
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
