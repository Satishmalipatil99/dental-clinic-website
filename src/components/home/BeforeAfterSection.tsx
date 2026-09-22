import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowRight, Check, AlertCircle } from 'lucide-react';
import { beforeAfterCasesData } from '../../config/reviews';

export const BeforeAfterSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-md border border-teal-100">
            CLINICAL RESTORATIONS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f2b48] tracking-tight">
            Before & After Clinical Cases
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Real outcomes from conservative cosmetic, restorative, and orthodontic dental care.
          </p>
        </div>

        {/* Ethical Patient Consent & Non-fabrication Notice (Prompt Mandate #15) */}
        <div className="max-w-3xl mx-auto mb-10 bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-500 flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
          <span>
            <strong>Ethical Clinical Notice:</strong> In compliance with medical confidentiality standards, clinical before-and-after photographs are published only with explicit written patient authorization. The cases below demonstrate typical procedural goals and treatment pathways. Individual biological healing and cosmetic results vary.
          </span>
        </div>

        {/* Before / After Case Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {beforeAfterCasesData.map(c => (
            <div 
              key={c.id}
              className="bg-[#fcfdfd] rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-md transition-shadow p-5 sm:p-6 space-y-5"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <span className="text-xs font-semibold text-teal-700 uppercase tracking-wider">
                    {c.category}
                  </span>
                  <h3 className="text-lg font-bold text-[#0f2b48]">
                    {c.treatmentName}
                  </h3>
                </div>
                <span className="text-xs text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full font-medium">
                  {c.treatmentDuration}
                </span>
              </div>

              {/* Before & After Visual Representation */}
              <div className="grid grid-cols-2 gap-3">
                {/* Before Box */}
                <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-100 p-4 flex flex-col justify-between aspect-4/3 text-center">
                  <span className="inline-block self-start px-2 py-0.5 rounded text-[11px] font-bold uppercase bg-slate-200 text-slate-700">
                    Before
                  </span>
                  <div className="my-auto py-2">
                    <div className="text-xs font-semibold text-slate-500">Initial Clinical State</div>
                    <div className="text-[11px] text-slate-400 mt-1">Staining / Chipped / Misaligned</div>
                  </div>
                  <span className="text-[10px] text-slate-400">Pre-treatment photo placeholder</span>
                </div>

                {/* After Box */}
                <div className="rounded-xl overflow-hidden border border-teal-200 bg-teal-50/50 p-4 flex flex-col justify-between aspect-4/3 text-center">
                  <span className="inline-block self-start px-2 py-0.5 rounded text-[11px] font-bold uppercase bg-teal-600 text-white">
                    After
                  </span>
                  <div className="my-auto py-2">
                    <div className="text-xs font-bold text-teal-900">Restored Smile</div>
                    <div className="text-[11px] text-teal-700 mt-1">Harmonious Shade & Alignment</div>
                  </div>
                  <span className="text-[10px] text-teal-600">Post-treatment photo placeholder</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {c.caseDescription}
              </p>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400">{c.consentNotice}</span>
                <Link 
                  to="/book-appointment" 
                  className="font-semibold text-teal-700 hover:text-teal-800 shrink-0 ml-2"
                >
                  Consultation →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View All Cases CTA (Mandated by Prompt #15) */}
        <div className="mt-10 text-center">
          <Link
            to="/before-after"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-semibold transition-colors"
          >
            <span>View All Clinical Cases</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
};
