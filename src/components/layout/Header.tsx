import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Phone, 
  Calendar, 
  Menu, 
  X, 
  ChevronDown, 
  Clock, 
  MapPin, 
  ShieldCheck,
  MessageCircle
} from 'lucide-react';
import { clinicConfig, getTelUrl, getWhatsAppUrl } from '../../config/clinic';
import { treatmentsData } from '../../config/treatments';
import { trackEvent } from '../../utils/analytics';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [treatmentsDropdownOpen, setTreatmentsDropdownOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setTreatmentsDropdownOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-200">
      {/* Top emergency & clinic hours micro-bar (collapses on scroll) */}
      <div 
        className={`bg-[#0a192f] text-slate-300 text-xs transition-all duration-300 overflow-hidden ${
          isScrolled ? 'max-h-0 py-0 opacity-0' : 'max-h-12 py-1.5 opacity-100 border-b border-slate-800'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1.5 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-teal-400" />
              <span>{clinicConfig.openingHours.weekdays}</span>
            </div>
            <div className="hidden md:flex items-center gap-1.5 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-teal-400" />
              <span>{clinicConfig.address.area}, {clinicConfig.address.city}</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a 
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('whatsapp_click', { location: 'top_bar' })}
              className="flex items-center gap-1.5 text-slate-300 hover:text-emerald-400 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">WhatsApp Chat</span>
            </a>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <Link 
              to="/admin" 
              className="text-slate-400 hover:text-slate-200 transition-colors"
              title="Clinic Admin Portal"
            >
              Staff Portal
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav 
        id="main-navigation"
        className={`w-full transition-all duration-200 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200 py-3' 
            : 'bg-white border-b border-slate-100 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Clinic Brand Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-teal-500 rounded-lg p-1"
            aria-label={`${clinicConfig.clinicName} Home`}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0f2b48] to-[#1a4a75] flex items-center justify-center text-white shadow-sm shadow-blue-950/20 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-6 h-6 text-teal-300" />
            </div>
            <div>
              <span className="block text-lg sm:text-xl font-bold tracking-tight text-[#0f2b48] leading-tight group-hover:text-teal-700 transition-colors">
                {clinicConfig.clinicName}
              </span>
              <span className="block text-[11px] font-medium tracking-wide text-slate-500 uppercase">
                Dental Clinic & Implant Center
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            <Link 
              to="/" 
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                isActive('/') && location.pathname === '/' 
                  ? 'text-teal-700 font-semibold bg-teal-50/60' 
                  : 'text-slate-700 hover:text-[#0f2b48] hover:bg-slate-50'
              }`}
            >
              Home
            </Link>

            <Link 
              to="/about" 
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                isActive('/about') 
                  ? 'text-teal-700 font-semibold bg-teal-50/60' 
                  : 'text-slate-700 hover:text-[#0f2b48] hover:bg-slate-50'
              }`}
            >
              About
            </Link>

            <Link 
              to="/doctor" 
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                isActive('/doctor') 
                  ? 'text-teal-700 font-semibold bg-teal-50/60' 
                  : 'text-slate-700 hover:text-[#0f2b48] hover:bg-slate-50'
              }`}
            >
              Doctor
            </Link>

            {/* Treatments Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setTreatmentsDropdownOpen(true)}
              onMouseLeave={() => setTreatmentsDropdownOpen(false)}
            >
              <button 
                id="treatments-menu-button"
                aria-expanded={treatmentsDropdownOpen}
                className={`px-3 py-2 text-sm font-medium rounded-md flex items-center gap-1 transition-colors ${
                  isActive('/treatments') 
                    ? 'text-teal-700 font-semibold bg-teal-50/60' 
                    : 'text-slate-700 hover:text-[#0f2b48] hover:bg-slate-50'
                }`}
              >
                <span>Treatments</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${treatmentsDropdownOpen ? 'rotate-180 text-teal-600' : 'text-slate-400'}`} />
              </button>

              {/* Mega Dropdown Menu */}
              {treatmentsDropdownOpen && (
                <div 
                  className="absolute top-full left-0 w-80 bg-white rounded-xl shadow-xl border border-slate-200/80 p-2.5 mt-1 transition-all z-50"
                  role="menu"
                  aria-orientation="vertical"
                >
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 px-3 py-1.5 border-b border-slate-100">
                    Comprehensive Procedures
                  </div>
                  <div className="py-1 max-h-96 overflow-y-auto">
                    {treatmentsData.map(treatment => (
                      <Link
                        key={treatment.id}
                        to={`/treatments/${treatment.slug}`}
                        className="block px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-teal-50/80 hover:text-teal-900 transition-colors"
                        role="menuitem"
                      >
                        <div className="font-medium">{treatment.name}</div>
                        <div className="text-xs text-slate-500 truncate">{treatment.shortDescription}</div>
                      </Link>
                    ))}
                  </div>
                  <div className="pt-2 border-t border-slate-100 mt-1">
                    <Link
                      to="/treatments"
                      className="block text-center py-2 text-xs font-semibold text-teal-700 hover:text-teal-800 bg-teal-50 rounded-lg transition-colors"
                    >
                      View All Treatments & Pricing Guide →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link 
              to="/before-after" 
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                isActive('/before-after') 
                  ? 'text-teal-700 font-semibold bg-teal-50/60' 
                  : 'text-slate-700 hover:text-[#0f2b48] hover:bg-slate-50'
              }`}
            >
              Clinical Cases
            </Link>

            <Link 
              to="/reviews" 
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                isActive('/reviews') 
                  ? 'text-teal-700 font-semibold bg-teal-50/60' 
                  : 'text-slate-700 hover:text-[#0f2b48] hover:bg-slate-50'
              }`}
            >
              Reviews
            </Link>

            <Link 
              to="/gallery" 
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                isActive('/gallery') 
                  ? 'text-teal-700 font-semibold bg-teal-50/60' 
                  : 'text-slate-700 hover:text-[#0f2b48] hover:bg-slate-50'
              }`}
            >
              Clinic Tour
            </Link>

            <Link 
              to="/blog" 
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                isActive('/blog') 
                  ? 'text-teal-700 font-semibold bg-teal-50/60' 
                  : 'text-slate-700 hover:text-[#0f2b48] hover:bg-slate-50'
              }`}
            >
              Dental Guides
            </Link>

            <Link 
              to="/faq" 
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                isActive('/faq') 
                  ? 'text-teal-700 font-semibold bg-teal-50/60' 
                  : 'text-slate-700 hover:text-[#0f2b48] hover:bg-slate-50'
              }`}
            >
              FAQ
            </Link>

            <Link 
              to="/contact" 
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                isActive('/contact') 
                  ? 'text-teal-700 font-semibold bg-teal-50/60' 
                  : 'text-slate-700 hover:text-[#0f2b48] hover:bg-slate-50'
              }`}
            >
              Contact
            </Link>
          </div>

          {/* Header Action Buttons (Desktop) */}
          <div className="hidden sm:flex items-center gap-3">
            <a 
              id="header-call-button"
              href={getTelUrl()}
              onClick={() => trackEvent('phone_click', { source: 'header' })}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-slate-200 text-sm font-medium text-slate-700 hover:text-[#0f2b48] hover:bg-slate-50 hover:border-slate-300 transition-all shadow-xs"
              title={`Call ${clinicConfig.phoneDisplay}`}
            >
              <Phone className="w-4 h-4 text-teal-600" />
              <span>Call Now</span>
            </a>

            <Link 
              id="header-book-button"
              to="/book-appointment"
              onClick={() => trackEvent('cta_click', { label: 'Header Book Appointment' })}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0f2b48] hover:bg-[#163b63] text-white text-sm font-semibold transition-all shadow-sm shadow-blue-950/20 active:scale-98"
            >
              <Calendar className="w-4 h-4 text-teal-300" />
              <span>Book Appointment</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <a 
              href={getTelUrl()}
              aria-label="Call clinic"
              className="p-2 text-slate-700 hover:text-teal-700 rounded-lg hover:bg-slate-100"
            >
              <Phone className="w-5 h-5 text-teal-600" />
            </a>
            <button 
              id="mobile-menu-toggle"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 top-[65px] bg-slate-900/60 backdrop-blur-xs z-30 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Drawer */}
      <div 
        id="mobile-drawer"
        className={`fixed top-[65px] right-0 bottom-0 w-full max-w-sm bg-white shadow-2xl z-40 lg:hidden transform transition-transform duration-300 ease-in-out flex flex-col ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div>
            <div className="text-sm font-bold text-[#0f2b48]">{clinicConfig.clinicName}</div>
            <div className="text-xs text-slate-500">{clinicConfig.phoneDisplay}</div>
          </div>
          <button 
            onClick={() => setMobileMenuOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-md"
            aria-label="Close navigation"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-3 px-4 space-y-1">
          <Link 
            to="/" 
            className={`block px-3 py-2.5 rounded-lg text-base font-medium ${
              isActive('/') && location.pathname === '/' ? 'bg-teal-50 text-teal-800 font-semibold' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            Home
          </Link>
          <Link 
            to="/about" 
            className={`block px-3 py-2.5 rounded-lg text-base font-medium ${
              isActive('/about') ? 'bg-teal-50 text-teal-800 font-semibold' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            About Us & Philosophy
          </Link>
          <Link 
            to="/doctor" 
            className={`block px-3 py-2.5 rounded-lg text-base font-medium ${
              isActive('/doctor') ? 'bg-teal-50 text-teal-800 font-semibold' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            Meet the Doctor
          </Link>

          {/* Mobile Treatments Accordion */}
          <div className="py-1">
            <div className="px-3 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Treatments
            </div>
            <div className="space-y-0.5 pl-2">
              <Link 
                to="/treatments"
                className="block px-3 py-2 text-sm font-semibold text-teal-700 hover:bg-teal-50 rounded-lg"
              >
                All Treatments Overview →
              </Link>
              {treatmentsData.map(t => (
                <Link
                  key={t.id}
                  to={`/treatments/${t.slug}`}
                  className={`block px-3 py-1.5 text-sm rounded-lg ${
                    location.pathname === `/treatments/${t.slug}` ? 'bg-teal-50 text-teal-800 font-medium' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {t.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 space-y-1">
            <Link 
              to="/before-after" 
              className={`block px-3 py-2.5 rounded-lg text-base font-medium ${
                isActive('/before-after') ? 'bg-teal-50 text-teal-800 font-semibold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Before & After Cases
            </Link>
            <Link 
              to="/reviews" 
              className={`block px-3 py-2.5 rounded-lg text-base font-medium ${
                isActive('/reviews') ? 'bg-teal-50 text-teal-800 font-semibold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Patient Reviews
            </Link>
            <Link 
              to="/gallery" 
              className={`block px-3 py-2.5 rounded-lg text-base font-medium ${
                isActive('/gallery') ? 'bg-teal-50 text-teal-800 font-semibold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Clinic Gallery & Tour
            </Link>
            <Link 
              to="/blog" 
              className={`block px-3 py-2.5 rounded-lg text-base font-medium ${
                isActive('/blog') ? 'bg-teal-50 text-teal-800 font-semibold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Patient Education Blog
            </Link>
            <Link 
              to="/faq" 
              className={`block px-3 py-2.5 rounded-lg text-base font-medium ${
                isActive('/faq') ? 'bg-teal-50 text-teal-800 font-semibold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Frequently Asked Questions
            </Link>
            <Link 
              to="/contact" 
              className={`block px-3 py-2.5 rounded-lg text-base font-medium ${
                isActive('/contact') ? 'bg-teal-50 text-teal-800 font-semibold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Contact & Directions
            </Link>
          </div>
        </div>

        {/* Mobile Quick Action Buttons in Drawer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 space-y-2">
          <Link 
            to="/book-appointment"
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#0f2b48] text-white font-semibold text-center text-sm shadow-md"
          >
            <Calendar className="w-4 h-4 text-teal-300" />
            <span>Book Appointment Online</span>
          </Link>
          <div className="grid grid-cols-2 gap-2">
            <a 
              href={getTelUrl()}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border border-slate-300 bg-white text-slate-800 text-xs font-semibold"
            >
              <Phone className="w-3.5 h-3.5 text-teal-600" />
              <span>Call Clinic</span>
            </a>
            <a 
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-800 text-xs font-semibold"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
