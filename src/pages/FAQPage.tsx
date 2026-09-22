import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Search, MessageCircle, Calendar, HelpCircle } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { MedicalDisclaimer } from '../components/common/MedicalDisclaimer';
import { faqData } from '../config/faq';
import { clinicConfig, getWhatsAppUrl } from '../config/clinic';

export const FAQPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({
    [faqData[0]?.id || '1']: true
  });

  const categories = ['All', 'General & Appointments', 'Procedures & Pain', 'Cost & Planning', 'First Visit'];

  const filteredFaqs = faqData.filter(item => {
    const matchesCat = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = searchQuery.trim() === '' || 
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const toggleAccordion = (id: string) => {
    setOpenIds(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <>
      <SEOHead
        title="Frequently Asked Questions (FAQ) – Dental Inquiries"
        description={`Find clear answers to common dental questions at ${clinicConfig.clinicName}: Appointment booking, root canal pain, dental implant recovery, and pricing in ${clinicConfig.address.city}.`}
        canonicalPath="/faq"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Breadcrumbs items={[{ label: 'Frequently Asked Questions' }]} />

        {/* Page Header */}
        <div className="text-center my-8 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-md border border-teal-100">
            HELP & CLINICAL INQUIRIES
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0f2b48] tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Everything you need to know about scheduling, procedures, anesthesia, safety protocols, and post-treatment recovery.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative my-8">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search questions (e.g. 'root canal hurt', 'booking', 'whitening')..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200 bg-white text-sm sm:text-base focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition-all shadow-xs"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
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

        {/* FAQ Accordions */}
        <div className="space-y-3.5 my-8">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-8 space-y-3">
              <HelpCircle className="w-10 h-10 text-slate-400 mx-auto" />
              <p className="text-slate-600 text-sm font-semibold">
                No matching questions found for "{searchQuery}".
              </p>
              <p className="text-xs text-slate-400">
                You can ask us directly via WhatsApp or telephone.
              </p>
              <a
                href={getWhatsAppUrl(`Hi, I have a question about ${searchQuery}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-semibold mt-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Ask on WhatsApp</span>
              </a>
            </div>
          ) : (
            filteredFaqs.map(item => {
              const isOpen = !!openIds[item.id];
              return (
                <div
                  key={item.id}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen 
                      ? 'bg-white border-teal-300 shadow-xs' 
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleAccordion(item.id)}
                    aria-expanded={isOpen}
                    className="w-full text-left px-5 sm:px-6 py-4.5 flex items-center justify-between gap-4 focus:outline-none focus:ring-2 focus:ring-teal-500 rounded-2xl"
                  >
                    <div>
                      <span className="text-[11px] font-semibold text-teal-700 uppercase tracking-wider block mb-0.5">
                        {item.category}
                      </span>
                      <span className="text-base sm:text-lg font-bold text-[#0f2b48]">
                        {item.question}
                      </span>
                    </div>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform ${
                      isOpen ? 'bg-teal-50 text-teal-700 rotate-180' : 'bg-slate-100 text-slate-500'
                    }`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-5 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                      <p>{item.answer}</p>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Medical Disclaimer */}
        <MedicalDisclaimer />

        {/* Still Have Questions Banner */}
        <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200 text-center my-12 space-y-4">
          <h2 className="text-2xl font-bold text-[#0f2b48]">
            Still Have a Question?
          </h2>
          <p className="text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
            Our friendly front-desk team is ready to answer questions regarding treatments, appointment slots, or dental insurance claims.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              to="/book-appointment"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0f2b48] text-white text-xs font-semibold hover:bg-[#163b63] transition-colors"
            >
              <Calendar className="w-4 h-4 text-teal-300" />
              <span>Book Appointment</span>
            </Link>
            <a
              href={getWhatsAppUrl("Hi, I have a dental question not covered in your FAQ.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>

      </div>
    </>
  );
};
