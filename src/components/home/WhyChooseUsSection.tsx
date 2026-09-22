import React from 'react';
import { 
  GraduationCap, 
  Cpu, 
  UserCheck, 
  MessageSquare, 
  Sparkles, 
  CalendarClock,
  CheckCircle2
} from 'lucide-react';

const reasons = [
  {
    icon: <GraduationCap className="w-6 h-6 text-teal-600" />,
    title: 'Qualified Dental Professionals',
    description: 'Care delivered by post-graduate qualified dental surgeons committed to evidence-based techniques and ongoing clinical education.'
  },
  {
    icon: <Cpu className="w-6 h-6 text-teal-600" />,
    title: 'Modern Dental Equipment',
    description: 'Equipped with digital low-dose radiography, intraoral optical imaging, and rotary micro-motors for precise, quiet treatment.'
  },
  {
    icon: <UserCheck className="w-6 h-6 text-teal-600" />,
    title: 'Personalized Treatment Plans',
    description: 'No one-size-fits-all treatments. We design individualized restorative and preventive pathways centered around your biological needs.'
  },
  {
    icon: <MessageSquare className="w-6 h-6 text-teal-600" />,
    title: 'Clear Treatment Discussions',
    description: 'We show you intraoral photos, explain all viable clinical alternatives transparently, and discuss timelines before any procedure.'
  },
  {
    icon: <Sparkles className="w-6 h-6 text-teal-600" />,
    title: 'Sterilization & Infection Control',
    description: 'Rigorous multi-stage sterilization featuring Class-B autoclave technology, disposable barriers, and medical-grade chemical testing.'
  },
  {
    icon: <CalendarClock className="w-6 h-6 text-teal-600" />,
    title: 'Convenient Appointment Scheduling',
    description: 'Morning and evening operatory slots designed to accommodate busy work and school schedules with minimal waiting time.'
  }
];

export const WhyChooseUsSection: React.FC = () => {
  return (
    <section id="why-us-section" className="py-16 md:py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-md border border-teal-100">
            OUR CLINICAL COMMITMENT
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f2b48] tracking-tight">
            Why Patients Choose Us
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            We avoid exaggerated claims and focus strictly on patient comfort, honest clinical communication, and uncompromising hygiene standards.
          </p>
        </div>

        {/* 6 Clean Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {reasons.map((item, idx) => (
            <div 
              key={idx}
              className="p-6 sm:p-7 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:bg-white hover:shadow-md hover:border-teal-200 transition-all duration-200 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-xs">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-[#0f2b48]">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-200/60 flex items-center gap-1.5 text-xs text-teal-700 font-medium">
                <CheckCircle2 className="w-4 h-4 text-teal-600" />
                <span>Verified Clinical Standard</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
