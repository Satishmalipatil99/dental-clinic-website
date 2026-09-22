import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Activity, 
  ShieldCheck, 
  Sparkles, 
  Layers, 
  Award, 
  Smile, 
  FileText, 
  HeartPulse, 
  CheckCircle2,
  ArrowRight,
  Clock
} from 'lucide-react';
import { treatmentsData } from '../../config/treatments';

// Helper to map icon string to Lucide component
const getTreatmentIcon = (name: string) => {
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

export const TreatmentGridSection: React.FC = () => {
  return (
    <section id="treatments-section" className="py-16 md:py-24 bg-[#fcfdfd] border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-md border border-teal-100">
            COMPREHENSIVE DENTAL CARE
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f2b48] tracking-tight">
            Specialized Dental Treatments
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            From routine preventive checkups to complex microscopic endodontics and dental implant rehabilitation, our treatments are designed around biological preservation and patient comfort.
          </p>
        </div>

        {/* Treatment 9-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {treatmentsData.map(treatment => (
            <div
              key={treatment.id}
              className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-7 shadow-xs hover:shadow-md hover:border-teal-200 transition-all duration-200 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                {/* Icon Box */}
                <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center group-hover:bg-teal-600 group-hover:text-white transition-colors">
                  <div className="group-hover:[&_svg]:text-white transition-colors">
                    {getTreatmentIcon(treatment.iconName)}
                  </div>
                </div>

                {/* Name */}
                <h3 className="text-xl font-bold text-[#0f2b48] group-hover:text-teal-700 transition-colors">
                  {treatment.name}
                </h3>

                {/* Short Description */}
                <p className="text-sm text-slate-600 leading-relaxed">
                  {treatment.shortDescription}
                </p>

                {/* Duration Metadata tag */}
                <div className="flex items-center gap-1.5 text-xs text-slate-500 pt-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span className="truncate">{treatment.durationEstimate}</span>
                </div>
              </div>

              {/* Action Link */}
              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                <Link
                  to={`/treatments/${treatment.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-700 hover:text-teal-900 group-hover:translate-x-0.5 transition-all"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/book-appointment"
                  className="text-xs text-slate-500 hover:text-[#0f2b48] transition-colors"
                >
                  Book Visit →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Callout */}
        <div className="mt-12 text-center">
          <Link
            to="/treatments"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-semibold transition-colors"
          >
            <span>View All Detailed Treatment Guides & FAQs</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
};
