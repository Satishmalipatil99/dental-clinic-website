import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, HelpCircle, ArrowRight } from 'lucide-react';
import { faqData } from '../../config/faq';
import { MedicalDisclaimer } from '../common/MedicalDisclaimer';

export const FAQSection: React.FC = () => {
  // Keep first open by default
  const [openId, setOpenId] = useState<string | null>(faqData[0]?.id || null);

  const toggleFAQ = (id: string) => {
    setOpenId(prev => (prev === id ? null : id));
  };

  return (
    <section id="faq-section" className="py-16 md:py-24 bg-[#fcfdfd] border-b border-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-md border border-teal-100">
            COMMON INQUIRIES
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f2b48] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Clear, straightforward answers about visiting our clinic, treatment timelines, and oral healthcare procedures.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5" role="region" aria-label="Frequently Asked Questions">
          {faqData.map(item => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen 
                    ? 'bg-white border-teal-300 shadow-sm' 
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(item.id)}
                  aria-expanded={isOpen}
                  className="w-full text-left px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-4 focus:outline-none focus:ring-2 focus:ring-teal-500 rounded-2xl"
                >
                  <span className="text-base sm:text-lg font-bold text-[#0f2b48]">
                    {item.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all ${
                    isOpen ? 'bg-teal-50 text-teal-700 rotate-180' : 'bg-slate-100 text-slate-500'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Medical disclaimer note */}
        <div className="mt-8">
          <MedicalDisclaimer compact />
        </div>

        {/* View all FAQ button */}
        <div className="mt-10 text-center">
          <Link
            to="/faq"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-semibold transition-colors"
          >
            <span>Have More Questions? View All FAQ Guides</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
};
