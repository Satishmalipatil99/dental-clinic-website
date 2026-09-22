import React from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageCircle, 
  Navigation, 
  ExternalLink,
  Car,
  Building,
  CheckCircle2
} from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { AppointmentForm } from '../components/appointment/AppointmentForm';
import { clinicConfig, getTelUrl, getWhatsAppUrl } from '../config/clinic';
import { trackEvent } from '../utils/analytics';

export const ContactPage: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Contact Us, Location Map & Clinic Timings"
        description={`Contact ${clinicConfig.clinicName}: Phone ${clinicConfig.phoneDisplay}, WhatsApp, full address in ${clinicConfig.address.city}, interactive map directions, and opening hours.`}
        canonicalPath="/contact"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Breadcrumbs items={[{ label: 'Contact & Directions' }]} />

        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto my-8 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-md border border-teal-100">
            CONNECT WITH OUR TEAM
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0f2b48] tracking-tight">
            Contact & Clinic Location
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            We are here to help you coordinate appointments, answer procedure queries, or provide straightforward driving directions.
          </p>
        </div>

        {/* 2-Column Layout: Contact Details & Appointment Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 my-10 items-start">
          
          {/* Left Column: Contact Cards, Map, Hours */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Contact Cards */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-4">
              <h2 className="text-lg font-bold text-[#0f2b48] border-b border-slate-100 pb-3">
                Direct Contact Channels
              </h2>

              <div className="space-y-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 uppercase font-semibold">Telephone Line</span>
                    <a
                      href={getTelUrl()}
                      onClick={() => trackEvent('phone_click', { source: 'contact_page' })}
                      className="block text-base font-bold text-[#0f2b48] hover:text-teal-700 transition-colors"
                    >
                      {clinicConfig.phoneDisplay}
                    </a>
                    <span className="text-xs text-slate-500">Lines open 09:30 AM – 08:30 PM</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 pt-3 border-t border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 uppercase font-semibold">WhatsApp Chat</span>
                    <a
                      href={getWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackEvent('whatsapp_click', { source: 'contact_page' })}
                      className="block text-base font-bold text-emerald-700 hover:underline"
                    >
                      {clinicConfig.whatsappDisplay}
                    </a>
                    <span className="text-xs text-slate-500">Fast responses for queries & slot booking</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 pt-3 border-t border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-600 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 uppercase font-semibold">Email Desk</span>
                    <a
                      href={`mailto:${clinicConfig.email}`}
                      className="block text-sm font-semibold text-slate-700 hover:text-teal-700 transition-colors"
                    >
                      {clinicConfig.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Address & Hours Card */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs text-slate-400 uppercase font-semibold">Address & Landmark</h3>
                  <p className="text-sm font-bold text-[#0f2b48] mt-0.5">
                    {clinicConfig.clinicName}
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed mt-1">
                    {clinicConfig.address.street}, {clinicConfig.address.area} <br />
                    {clinicConfig.address.city}, {clinicConfig.address.state} – {clinicConfig.address.postalCode}
                  </p>
                  <div className="mt-2 text-xs font-semibold text-teal-700 flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5" />
                    <span>Landmark: {clinicConfig.address.landmark}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  <Clock className="w-3.5 h-3.5 text-teal-600" />
                  <span>Clinical Hours</span>
                </div>
                <div className="text-xs text-slate-600 space-y-1.5">
                  <div className="flex justify-between">
                    <span>Monday – Friday:</span>
                    <span className="font-semibold text-slate-800">{clinicConfig.openingHours.weekdays}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday:</span>
                    <span className="font-semibold text-slate-800">{clinicConfig.openingHours.saturday}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday:</span>
                    <span className="font-semibold text-teal-800">{clinicConfig.openingHours.sunday}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3">
                <a
                  href={clinicConfig.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('get_directions_click', { source: 'contact_page_cta' })}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition-colors shadow-xs"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Open Directions in Google Maps</span>
                </a>
              </div>
            </div>

            {/* Google Maps Embed iframe */}
            <div className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 aspect-16/10">
              <iframe
                title="Clinic Google Map"
                src={clinicConfig.googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
              />
            </div>

          </div>

          {/* Right Column: Appointment Booking & Enquiry Form */}
          <div className="lg:col-span-7">
            <AppointmentForm />
          </div>

        </div>

      </div>
    </>
  );
};
