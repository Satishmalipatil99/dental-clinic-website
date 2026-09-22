import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  HeartHandshake, 
  Sparkles, 
  Clock, 
  Users, 
  CheckCircle2,
  ArrowRight,
  Stethoscope
} from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { clinicConfig, doctorProfile } from '../config/clinic';

export const AboutPage: React.FC = () => {
  return (
    <>
      <SEOHead
        title="About Us & Practice Philosophy"
        description={`Learn about ${clinicConfig.clinicName}, our clinical philosophy, sterilization standards, and patient-centered dental care in ${clinicConfig.address.city}.`}
        canonicalPath="/about"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Breadcrumbs items={[{ label: 'About Our Clinic' }]} />

        {/* Hero Banner */}
        <div className="bg-gradient-to-br from-[#0f2b48] to-[#163b63] rounded-3xl p-8 sm:p-12 text-white my-6 shadow-md relative overflow-hidden">
          <div className="max-w-3xl space-y-4 relative z-10">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-teal-500/20 text-teal-300 border border-teal-500/30">
              PRACTICE PHILOSOPHY
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Ethical, Gentle & Evidence-Based Dental Care
            </h1>
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal">
              Founded on the belief that visiting the dentist should be calm, transparent, and respectful of natural anatomy. We take the time to listen before we treat.
            </p>
          </div>
        </div>

        {/* Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-14">
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center text-teal-600 mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#0f2b48] mb-2">
              Conservative Dentistry
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              We prioritize saving your natural tooth structure wherever clinically viable, avoiding aggressive over-treatment in favor of biological preservation.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center text-teal-600 mb-4">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#0f2b48] mb-2">
              Transparent Communication
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Every diagnosis is backed by intraoral images and digital X-rays shown directly to you. We clearly explain timelines, materials, and alternatives.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center text-teal-600 mb-4">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#0f2b48] mb-2">
              Hospital-Grade Hygiene
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              We employ Class-B vacuum autoclave sterilization, certified biological monitoring, and single-use disposable barriers for complete patient safety.
            </p>
          </div>
        </div>

        {/* Clinical Environment Narrative */}
        <div className="bg-slate-50 rounded-3xl p-8 sm:p-12 border border-slate-200/80 my-12">
          <div className="max-w-3xl mx-auto space-y-6 text-slate-700 leading-relaxed">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0f2b48] text-center">
              A Thoughtfully Designed Clinical Environment
            </h2>
            <p>
              Dental anxiety is real and common. That is why our facility in {clinicConfig.address.city} was built from the ground up to reduce sensory stress. From daylight-balanced operatory lighting and ergonomic memory foam dental chairs to whisper-quiet electric handpieces, we have eliminated traditional clinical stressors.
            </p>
            <p>
              Under the clinical leadership of {doctorProfile.name} ({doctorProfile.qualification}), our team follows continuing education modules to stay at the forefront of modern restorative dentistry, digital impressions, and microscopic endodontics.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/doctor"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#0f2b48] text-white font-semibold text-sm hover:bg-[#163b63] transition-colors"
              >
                <span>Read Full Doctor Biography</span>
                <ArrowRight className="w-4 h-4 text-teal-300" />
              </Link>
              <Link
                to="/gallery"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-slate-300 bg-white text-slate-800 font-medium text-sm hover:bg-slate-100 transition-colors"
              >
                <span>Take a Virtual Clinic Tour</span>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </>
  );
};
