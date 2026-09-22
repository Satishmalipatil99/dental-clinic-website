import React from 'react';
import { CalendarCheck, MessageSquare, Search, Stethoscope, HeartHandshake, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const steps = [
  {
    num: '01',
    title: 'BOOK',
    subtitle: 'Schedule your appointment.',
    description: 'Select your preferred date online, reach out via WhatsApp, or call our clinic directly.',
    icon: <CalendarCheck className="w-5 h-5 text-teal-600" />
  },
  {
    num: '02',
    title: 'CONSULT',
    subtitle: 'Discuss your dental concerns.',
    description: 'Share your symptoms, dental history, and comfort preferences in an unhurried, private setting.',
    icon: <MessageSquare className="w-5 h-5 text-teal-600" />
  },
  {
    num: '03',
    title: 'DIAGNOSIS',
    subtitle: 'Understand your condition.',
    description: 'View digital radiographs and high-definition intraoral images with clear explanations of findings.',
    icon: <Search className="w-5 h-5 text-teal-600" />
  },
  {
    num: '04',
    title: 'TREATMENT',
    subtitle: 'Personalized treatment plan.',
    description: 'Gentle, modern clinical care executed with precision, effective anesthesia, and comfort pauses.',
    icon: <Stethoscope className="w-5 h-5 text-teal-600" />
  },
  {
    num: '05',
    title: 'FOLLOW-UP',
    subtitle: 'Continue dental care.',
    description: 'Receive personalized aftercare instructions, post-procedure check-ins, and routine preventive reminders.',
    icon: <HeartHandshake className="w-5 h-5 text-teal-600" />
  }
];

export const PatientJourneySection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-slate-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-md border border-teal-100">
            TRANSPARENT CARE PATHWAY
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f2b48] tracking-tight">
            Your Patient Journey
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            From the moment you contact us to long-term preventive recall, here is what you can expect during your visit.
          </p>
        </div>

        {/* 5-Step Process with desktop connecting line and mobile vertical stack */}
        <div className="relative">
          {/* Desktop connecting guide line */}
          <div className="hidden lg:block absolute top-1/2 left-8 right-8 h-0.5 bg-slate-200 -translate-y-12 z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-4 relative z-10">
            {steps.map((step, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs flex flex-col justify-between hover:border-teal-300 transition-colors relative"
              >
                <div>
                  {/* Step Header */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black text-teal-600/80 font-mono">
                      {step.num}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center">
                      {step.icon}
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-base font-bold text-[#0f2b48] tracking-tight">
                    {step.title}
                  </h3>
                  <div className="text-xs font-semibold text-teal-800 mb-2">
                    {step.subtitle}
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Arrow indicator for next step on mobile */}
                {idx < steps.length - 1 && (
                  <div className="lg:hidden mt-4 pt-2 flex justify-center text-slate-300">
                    ↓
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Action Link */}
        <div className="mt-12 text-center">
          <Link
            to="/book-appointment"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0f2b48] hover:bg-[#163b63] text-white text-sm font-semibold transition-all shadow-xs"
          >
            <span>Start Step 1: Book an Appointment</span>
            <ArrowRight className="w-4 h-4 text-teal-300" />
          </Link>
        </div>

      </div>
    </section>
  );
};
