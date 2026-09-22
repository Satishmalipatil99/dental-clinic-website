import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ExternalLink,
  MessageCircle,
  Instagram,
  Facebook,
  Youtube,
  Linkedin,
  Navigation
} from 'lucide-react';
import { clinicConfig, getTelUrl, getWhatsAppUrl } from '../../config/clinic';
import { treatmentsData } from '../../config/treatments';
import { trackEvent } from '../../utils/analytics';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0a192f] text-slate-300 pt-16 pb-24 md:pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 4-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-12 border-b border-slate-800">
          
          {/* Column 1: Clinic Identity & Mission */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-blue-600 flex items-center justify-center text-white shadow-md">
                <ShieldCheck className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="block text-lg font-bold text-white tracking-tight">
                  {clinicConfig.clinicName}
                </span>
                <span className="block text-xs font-medium text-teal-400 uppercase tracking-wider">
                  Dental Clinic & Diagnostics
                </span>
              </div>
            </Link>
            
            <p className="text-sm text-slate-400 leading-relaxed">
              Professional, ethical dental care for you and your family. Combining gentle clinical expertise, modern sterilization protocols, and patient-first treatment planning.
            </p>

            <div className="pt-2">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Connect With Us
              </div>
              <div className="flex items-center gap-3">
                <a 
                  href={clinicConfig.social.instagram} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-800/80 hover:bg-teal-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a 
                  href={clinicConfig.social.facebook} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-800/80 hover:bg-teal-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a 
                  href={clinicConfig.social.youtube} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-800/80 hover:bg-teal-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
                <a 
                  href={clinicConfig.social.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-800/80 hover:bg-teal-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Navigation */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-slate-400 hover:text-teal-300 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-400 hover:text-teal-300 transition-colors">
                  About Clinic & Team
                </Link>
              </li>
              <li>
                <Link to="/doctor" className="text-slate-400 hover:text-teal-300 transition-colors">
                  Meet the Doctor
                </Link>
              </li>
              <li>
                <Link to="/treatments" className="text-slate-400 hover:text-teal-300 transition-colors">
                  Dental Treatments Overview
                </Link>
              </li>
              <li>
                <Link to="/before-after" className="text-slate-400 hover:text-teal-300 transition-colors">
                  Clinical Cases & Results
                </Link>
              </li>
              <li>
                <Link to="/reviews" className="text-slate-400 hover:text-teal-300 transition-colors">
                  Patient Reviews & Experiences
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-slate-400 hover:text-teal-300 transition-colors">
                  Clinic Tour & Sterilization
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-slate-400 hover:text-teal-300 transition-colors">
                  Patient Dental Guides & Blog
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-slate-400 hover:text-teal-300 transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-400 hover:text-teal-300 transition-colors">
                  Contact & Map Directions
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Treatments */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Key Treatments
            </h3>
            <ul className="space-y-2 text-sm">
              {treatmentsData.slice(0, 7).map(t => (
                <li key={t.id}>
                  <Link 
                    to={`/treatments/${t.slug}`} 
                    className="text-slate-400 hover:text-teal-300 transition-colors flex items-center justify-between group"
                  >
                    <span>{t.name}</span>
                    <span className="text-xs text-slate-600 group-hover:text-teal-400 transition-colors">→</span>
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link 
                  to="/treatments" 
                  className="text-xs font-semibold text-teal-400 hover:text-teal-300 transition-colors"
                >
                  View All 9 Treatments →
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Clinic Hours */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Visit & Contact
            </h3>
            
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-1" />
                <span className="text-slate-300 leading-snug">
                  {clinicConfig.address.street}, {clinicConfig.address.area}, {clinicConfig.address.city}, {clinicConfig.address.state} – {clinicConfig.address.postalCode}
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                <a 
                  href={getTelUrl()} 
                  onClick={() => trackEvent('phone_click', { source: 'footer' })}
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  {clinicConfig.phoneDisplay}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <a 
                  href={getWhatsAppUrl()} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('whatsapp_click', { source: 'footer' })}
                  className="text-slate-300 hover:text-emerald-300 transition-colors"
                >
                  WhatsApp Consultation
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                <a 
                  href={`mailto:${clinicConfig.email}`} 
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  {clinicConfig.email}
                </a>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800">
              <div className="flex items-center gap-2 text-xs font-semibold text-teal-400 uppercase tracking-wider mb-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>Operating Hours</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                {clinicConfig.openingHours.weekdays}
              </p>
              <p className="text-xs text-slate-400 leading-relaxed">
                {clinicConfig.openingHours.saturday}
              </p>
              <p className="text-xs text-slate-400 leading-relaxed">
                {clinicConfig.openingHours.sunday}
              </p>
            </div>

            <div className="pt-1">
              <a
                href={clinicConfig.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('get_directions_click', { source: 'footer' })}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-teal-300 text-xs font-medium transition-colors"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Get Directions in Google Maps</span>
              </a>
            </div>
          </div>
        </div>

        {/* Medical Content Safety Disclaimer (Prompt Mandate #43) */}
        <div className="py-6 border-b border-slate-800/80 text-xs text-slate-400 leading-relaxed bg-slate-900/40 px-4 rounded-xl mt-8">
          <p className="font-semibold text-slate-300 mb-1">Medical & Clinical Disclaimer:</p>
          <p>
            Information on this website is provided for general educational purposes and does not replace professional dental advice, clinical diagnosis, or individualized treatment. Always seek the advice of your qualified dentist or other medical healthcare provider with any questions you may have regarding a dental condition. Never disregard professional clinical advice or delay in seeking it because of something you have read on this website.
          </p>
        </div>

        {/* Bottom Bar with Copyright & Legal Links */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © 2026 {clinicConfig.clinicName}. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-slate-300 transition-colors">
              Terms & Conditions
            </Link>
            <Link to="/admin" className="hover:text-teal-400 transition-colors">
              Staff Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
