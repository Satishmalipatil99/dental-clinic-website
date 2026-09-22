import React from 'react';
import { Cpu, ShieldCheck, CheckCircle2, Sparkles } from 'lucide-react';
import { technologyCardsData } from '../../config/gallery';

export const TechnologySection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-md border border-teal-100">
            MODERN DIAGNOSTICS & SAFETY
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f2b48] tracking-tight">
            Advanced Clinical Technology
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Our investment in cutting-edge dental technology ensures less invasive treatments, reduced radiation exposure, shorter appointments, and maximum diagnostic clarity.
          </p>
        </div>

        {/* Technology Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {technologyCardsData.map(tech => (
            <div
              key={tech.id}
              className="bg-[#fcfdfd] rounded-2xl border border-slate-200/80 p-6 sm:p-7 shadow-xs hover:border-teal-300 transition-colors flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600">
                  <Cpu className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#0f2b48]">
                  {tech.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {tech.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 bg-slate-50/70 -mx-6 sm:-mx-7 -mb-6 sm:-mb-7 p-4 sm:p-5 rounded-b-2xl">
                <div className="flex items-start gap-2 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <span className="font-medium">
                    <strong className="text-teal-900 font-semibold">Patient Benefit:</strong> {tech.benefit}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
