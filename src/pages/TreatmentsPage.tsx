import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Clock, 
  CheckCircle2, 
  ShieldCheck, 
  Activity, 
  Sparkles, 
  Layers, 
  Award, 
  Smile, 
  FileText, 
  HeartPulse 
} from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { treatmentsData } from '../config/treatments';
import { clinicConfig } from '../config/clinic';

const getIcon = (name: string) => {
  switch (name) {
    case 'Activity': return <Activity className="w-6 h-6 text-teal-600" />;
    case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-teal-600" />;
    case 'Sparkles': return <Sparkles className="w-6 h-6 text-teal-600" />;
    case 'Layers': return <Layers className="w-6 h-6 text-teal-600" />;
    case 'Award': return <Award className="w-6 h-6 text-teal-600" />;
    case 'Smile': return <Smile className="w-6 h-6 text-teal-600" />;
    case 'FileText': return <FileText className="w-6 h-6 text-teal-600" />;
    case 'HeartPulse': return <HeartPulse className="w-6 h-6 text-teal-600" />;
    default: return <CheckCircle2 className="w-6 h-6 text-teal-600" />;
  }
};

export const TreatmentsPage: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Dental Treatments & Specialized Clinical Procedures"
        description={`Explore full dental treatments offered by ${clinicConfig.clinicName}: Root canal therapy, dental implants, teeth whitening, clear aligners, pediatric dentistry, and more in ${clinicConfig.address.city}.`}
        canonicalPath="/treatments"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Breadcrumbs items={[{ label: 'Treatments' }]} />

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto my-8 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-md border border-teal-100">
            CLINICAL EXCELLENCE
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0f2b48] tracking-tight">
            Our Dental Treatments
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Every procedure is planned with digital diagnostics, conservative techniques, and patient comfort. Click on any treatment below to read its in-depth clinical guide, steps, recovery advice, and FAQs.
          </p>
        </div>

        {/* Treatment Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-10">
          {treatmentsData.map(treatment => (
            <div
              key={treatment.id}
              className="bg-white rounded-2xl border border-slate-200/90 p-7 shadow-xs hover:shadow-md hover:border-teal-300 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center group-hover:bg-teal-600 group-hover:text-white transition-colors">
                  <div className="group-hover:[&_svg]:text-white transition-colors">
                    {getIcon(treatment.iconName)}
                  </div>
                </div>

                <h2 className="text-xl font-bold text-[#0f2b48] group-hover:text-teal-700 transition-colors">
                  {treatment.name}
                </h2>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {treatment.shortDescription}
                </p>

                <div className="pt-2">
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                    Key Signs / Indications:
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    {(treatment.symptoms || treatment.commonSigns || []).slice(0, 3).map((symptom, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-teal-600 font-bold">•</span>
                        <span>{symptom}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{treatment.durationEstimate}</span>
                </div>

                <Link
                  to={`/treatments/${treatment.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-700 hover:text-teal-900 group-hover:translate-x-1 transition-transform"
                >
                  <span>Read Guide</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Pricing Notice */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center max-w-3xl mx-auto my-12 text-sm text-slate-600 leading-relaxed">
          <p className="font-semibold text-slate-800 mb-1">
            Transparent Clinical Pricing Notice:
          </p>
          <p>
            Treatment costs vary based on clinical diagnosis, severity, tooth position, and materials required. Please book an initial consultation for an accurate individualized assessment and transparent cost estimate before starting any treatment.
          </p>
          <div className="mt-4">
            <Link
              to="/book-appointment"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0f2b48] text-white text-xs font-semibold hover:bg-[#163b63] transition-colors"
            >
              <span>Schedule Consultation</span>
              <ArrowRight className="w-3.5 h-3.5 text-teal-300" />
            </Link>
          </div>
        </div>

      </div>
    </>
  );
};
