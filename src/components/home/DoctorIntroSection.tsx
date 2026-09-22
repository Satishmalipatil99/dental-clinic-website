import React from 'react';
import { Link } from 'react-router-dom';
import { Award, CheckCircle2, ArrowRight, Stethoscope, GraduationCap, Calendar } from 'lucide-react';
import { clinicConfig, doctorProfile } from '../../config/clinic';

export const DoctorIntroSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Image on one side (Editorial Layout) */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative">
              
              {/* Outer decorative frame */}
              <div className="rounded-3xl bg-gradient-to-tr from-slate-100 to-teal-50/50 p-3 sm:p-4 border border-slate-200/80 shadow-md">
                <div className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-[#0f2b48] to-[#163b63] aspect-3/4 flex flex-col justify-between p-6 sm:p-8 text-white">
                  
                  {/* Badge */}
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-teal-300 border border-white/10">
                      Chief Dental Surgeon
                    </span>
                    <span className="text-xs text-slate-300 font-mono">
                      {doctorProfile.experienceYears}
                    </span>
                  </div>

                  {/* Visual Portrait Placeholder */}
                  <div className="text-center my-auto py-6">
                    <div className="w-20 h-20 rounded-2xl bg-teal-500/20 border border-teal-400/30 mx-auto flex items-center justify-center text-teal-300 mb-4">
                      <Stethoscope className="w-10 h-10" />
                    </div>
                    <div className="text-2xl font-bold">{doctorProfile.name}</div>
                    <div className="text-teal-300 text-sm font-medium mt-1">{doctorProfile.qualification}</div>
                    <div className="text-xs text-slate-300 mt-2 max-w-xs mx-auto">{doctorProfile.specialization}</div>
                    <div className="mt-4 text-[11px] text-slate-400 border border-dashed border-white/20 p-2 rounded-lg bg-black/20">
                      📸 Replace with actual portrait photo of Dr. {doctorProfile.name.replace('Dr. ', '')}
                    </div>
                  </div>

                  {/* Bottom credential bar */}
                  <div className="text-xs text-slate-200 bg-white/10 p-3 rounded-xl border border-white/10 flex items-center justify-between">
                    <span>Dental Council Reg.</span>
                    <span className="font-mono text-teal-300">{doctorProfile.registrationNumber}</span>
                  </div>
                </div>
              </div>

              {/* Verified badge */}
              <div className="absolute -bottom-4 right-6 bg-white rounded-xl shadow-lg border border-slate-100 p-3 flex items-center gap-2.5">
                <GraduationCap className="w-5 h-5 text-teal-600" />
                <span className="text-xs font-bold text-slate-800">Verified Credentials</span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Text on the other */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
            
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-md border border-teal-100">
                MEET YOUR DENTIST
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f2b48] tracking-tight">
                {doctorProfile.name}
              </h2>
              <p className="text-base sm:text-lg font-semibold text-teal-800">
                {doctorProfile.qualification} • {doctorProfile.specialization}
              </p>
            </div>

            {/* Biography Paragraphs */}
            <div className="space-y-4 text-slate-600 text-base leading-relaxed">
              {doctorProfile.bioParagraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>

            {/* Core Clinical Focus Items */}
            <div className="pt-2 border-t border-slate-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                Key Areas of Clinical Focus
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {doctorProfile.clinicalFocus.slice(0, 4).map((focus, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span>{focus}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                to="/doctor"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#0f2b48] hover:bg-[#163b63] text-white text-sm font-semibold transition-all shadow-xs"
              >
                <span>Learn More About Dr. {doctorProfile.name.replace('Dr. ', '')}</span>
                <ArrowRight className="w-4 h-4 text-teal-300" />
              </Link>

              <Link
                to="/book-appointment"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-medium transition-all"
              >
                <Calendar className="w-4 h-4 text-teal-600" />
                <span>Schedule Consultation</span>
              </Link>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
