import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MessageCircle, Calendar } from 'lucide-react';
import { clinicConfig, getTelUrl, getWhatsAppUrl } from '../../config/clinic';
import { trackEvent } from '../../utils/analytics';

export const MobileCTA: React.FC = () => {
  return (
    <div 
      id="mobile-sticky-cta-bar"
      className="fixed bottom-0 left-0 right-0 z-30 lg:hidden bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] px-3 py-2"
      role="region"
      aria-label="Quick contact actions"
    >
      <div className="max-w-md mx-auto grid grid-cols-3 gap-2">
        {/* 1. Call Button */}
        <a
          id="mobile-cta-call"
          href={getTelUrl()}
          onClick={() => trackEvent('phone_click', { source: 'mobile_sticky_bar' })}
          className="flex flex-col items-center justify-center py-2 px-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors active:scale-95 touch-manipulation"
          aria-label={`Call clinic at ${clinicConfig.phoneDisplay}`}
        >
          <Phone className="w-4 h-4 text-blue-700 mb-0.5" />
          <span className="text-[11px] font-semibold tracking-tight">Call Clinic</span>
        </a>

        {/* 2. WhatsApp Button */}
        <a
          id="mobile-cta-whatsapp"
          href={getWhatsAppUrl("Hi, I would like to book a dental visit.")}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent('whatsapp_click', { source: 'mobile_sticky_bar' })}
          className="flex flex-col items-center justify-center py-2 px-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 transition-colors active:scale-95 touch-manipulation border border-emerald-200/60"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="w-4 h-4 text-emerald-600 mb-0.5" />
          <span className="text-[11px] font-semibold tracking-tight">WhatsApp</span>
        </a>

        {/* 3. Book Visit Button */}
        <Link
          id="mobile-cta-book"
          to="/book-appointment"
          onClick={() => trackEvent('cta_click', { label: 'Mobile Sticky Book Visit' })}
          className="flex flex-col items-center justify-center py-2 px-2 rounded-xl bg-[#0f2b48] hover:bg-[#163b63] text-white transition-colors active:scale-95 touch-manipulation shadow-xs"
          aria-label="Book a clinic visit"
        >
          <Calendar className="w-4 h-4 text-teal-300 mb-0.5" />
          <span className="text-[11px] font-semibold tracking-tight">Book Visit</span>
        </Link>
      </div>
    </div>
  );
};
