import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, Calendar, ArrowRight, ShieldCheck } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { beforeAfterCasesData } from '../config/reviews';
import { clinicConfig } from '../config/clinic';

export const BeforeAfterPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Orthodontics', 'Restorative', 'Endodontics', 'Cosmetic'];

  const filteredCases = activeCategory === 'All'
    ? beforeAfterCasesData
    : beforeAfterCasesData.filter(c => c.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <>
      <SEOHead
        title="Before & After Smile Restorations – Clinical Results"
        description={`View documented clinical before and after dental cases from ${clinicConfig.clinicName}: Teeth whitening, cosmetic veneers, aligners, and restorative dentistry in ${clinicConfig.address.city}.`}
        canonicalPath="/before-after"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Breadcrumbs items={[{ label: 'Clinical Cases' }]} />

        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto my-8 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-md border border-teal-100">
            DOCUMENTED CLINICAL OUTCOMES
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0f2b48] tracking-tight">
            Before & After Cases
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Exemplifying our commitment to natural tooth aesthetics, functional occlusion, and conservative restorative techniques.
          </p>
        </div>

        {/* Mandatory Patient Consent Notice (Prompt #15) */}
        <div className="max-w-4xl mx-auto mb-10 bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 text-xs text-slate-600 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold text-slate-800">Medical Confidentiality & Consent Statement:</span>
            <p>
              All clinical before-and-after photographs are published strictly with signed patient consent in accordance with medical ethics. Do not fabricate clinical cases. Results vary according to individual tooth anatomy, periodontal condition, and adherence to maintenance protocols.
            </p>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#0f2b48] text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
          {filteredCases.map(item => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-5"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-teal-700 uppercase tracking-wider">
                    {item.category}
                  </span>
                  <span className="text-xs text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                    {item.treatmentDuration}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#0f2b48]">
                  {item.treatmentName}
                </h3>

                {/* Before and After Boxes */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="aspect-4/3 rounded-xl bg-slate-100 border border-slate-200 p-4 flex flex-col justify-between text-center">
                    <span className="self-start text-[10px] font-bold uppercase bg-slate-200 text-slate-700 px-2 py-0.5 rounded">
                      Before
                    </span>
                    <div className="my-auto text-xs text-slate-500 font-medium">
                      Pre-procedure presentation
                    </div>
                    <span className="text-[10px] text-slate-400">Clinical photo placeholder</span>
                  </div>

                  <div className="aspect-4/3 rounded-xl bg-teal-50/60 border border-teal-200 p-4 flex flex-col justify-between text-center">
                    <span className="self-start text-[10px] font-bold uppercase bg-teal-600 text-white px-2 py-0.5 rounded">
                      After
                    </span>
                    <div className="my-auto text-xs text-teal-900 font-bold">
                      Restored alignment & shade
                    </div>
                    <span className="text-[10px] text-teal-600">Post-procedure photo placeholder</span>
                  </div>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.caseDescription}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>{item.consentNotice}</span>
                <Link
                  to="/book-appointment"
                  className="font-semibold text-teal-700 hover:text-teal-900 flex items-center gap-1"
                >
                  <span>Book Consultation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 text-center max-w-3xl mx-auto my-12 space-y-4">
          <h2 className="text-2xl font-bold text-[#0f2b48]">
            Want to Discuss Your Own Smile Restoration?
          </h2>
          <p className="text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
            Every smile has unique dental anatomy. Our doctors conduct high-resolution scans and intraoral examinations before discussing suitable restoration options.
          </p>
          <div className="pt-2">
            <Link
              to="/book-appointment"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0f2b48] hover:bg-[#163b63] text-white font-semibold text-sm transition-all"
            >
              <Calendar className="w-4 h-4 text-teal-300" />
              <span>Schedule Evaluation</span>
            </Link>
          </div>
        </div>

      </div>
    </>
  );
};
