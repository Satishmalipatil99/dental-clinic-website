import React from 'react';
import { 
  MapPin, 
  Phone, 
  Clock, 
  MessageCircle, 
  Navigation, 
  ExternalLink,
  Car,
  Building,
  CheckCircle2
} from 'lucide-react';
import { clinicConfig, getTelUrl, getWhatsAppUrl } from '../../config/clinic';
import { trackEvent } from '../../utils/analytics';

export const LocationSection: React.FC = () => {
  return (
    <section id="location-section" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-md border border-teal-100">
            LOCATION & ACCESSIBILITY
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f2b48] tracking-tight">
            VISIT OUR CLINIC
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Conveniently situated in {clinicConfig.address.area} with elevator access, patient parking, and direct transit connectivity.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Left Column: Clinic Contact Details, Timings & Directions Button */}
          <div className="lg:col-span-5 bg-[#fcfdfd] rounded-3xl border border-slate-200/90 p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-xs">
            
            <div className="space-y-6">
              {/* Address */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600 shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Clinic Address
                  </h3>
                  <p className="text-base font-bold text-[#0f2b48] mt-0.5">
                    {clinicConfig.clinicName}
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed mt-1">
                    {clinicConfig.address.street} <br />
                    {clinicConfig.address.area}, {clinicConfig.address.city} <br />
                    {clinicConfig.address.state} – {clinicConfig.address.postalCode}
                  </p>
                  <div className="mt-1.5 flex items-center gap-1.5 text-xs text-teal-700 font-medium">
                    <Building className="w-3.5 h-3.5" />
                    <span>Landmark: {clinicConfig.address.landmark}</span>
                  </div>
                </div>
              </div>

              {/* Phone & WhatsApp */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                <div className="p-3.5 rounded-xl bg-white border border-slate-200/80">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-1">
                    <Phone className="w-3.5 h-3.5 text-teal-600" />
                    <span>Phone Line</span>
                  </div>
                  <a 
                    href={getTelUrl()}
                    onClick={() => trackEvent('phone_click', { source: 'location_section' })}
                    className="text-sm font-bold text-[#0f2b48] hover:text-teal-700 block truncate"
                  >
                    {clinicConfig.phoneDisplay}
                  </a>
                </div>

                <div className="p-3.5 rounded-xl bg-emerald-50/50 border border-emerald-200/60">
                  <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 mb-1">
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>WhatsApp</span>
                  </div>
                  <a 
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent('whatsapp_click', { source: 'location_section' })}
                    className="text-sm font-bold text-emerald-900 hover:underline block truncate"
                  >
                    {clinicConfig.whatsappDisplay}
                  </a>
                </div>
              </div>

              {/* Opening Hours */}
              <div className="pt-4 border-t border-slate-100 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700">
                  <Clock className="w-4 h-4 text-teal-600" />
                  <span>Clinical Hours</span>
                </div>
                <div className="text-xs text-slate-600 space-y-1.5 pl-6">
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="font-medium">Monday – Friday</span>
                    <span>09:30 AM – 08:30 PM</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="font-medium">Saturday</span>
                    <span>09:30 AM – 07:00 PM</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="font-medium">Sunday</span>
                    <span className="text-teal-700 font-medium">10:00 AM – 01:30 PM (By Appt)</span>
                  </div>
                </div>
              </div>

              {/* Parking and Access features */}
              <div className="flex items-center gap-2 text-xs text-slate-500 pt-2">
                <Car className="w-4 h-4 text-slate-400" />
                <span>Dedicated visitor parking & wheelchair accessibility available</span>
              </div>
            </div>

            {/* Directions Action Button (Prompt Mandate #20) */}
            <div className="pt-4">
              <a
                href={clinicConfig.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('get_directions_click', { source: 'location_section_btn' })}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-[#0f2b48] hover:bg-[#163b63] text-white font-semibold text-sm transition-all shadow-md shadow-blue-950/20 active:scale-98"
              >
                <Navigation className="w-4 h-4 text-teal-300" />
                <span>Get Directions in Google Maps</span>
              </a>
            </div>

          </div>

          {/* Right Column: Google Maps Embed Card */}
          <div className="lg:col-span-7 bg-slate-100 rounded-3xl overflow-hidden border border-slate-200/80 shadow-xs flex flex-col">
            <div className="p-3.5 bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-600 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-teal-600" />
                <span>Interactive Map & Landmark View</span>
              </div>
              <a
                href={clinicConfig.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-700 hover:text-teal-900 flex items-center gap-1 font-medium"
              >
                <span>Open in Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Embedded Google Map iframe with fallback placeholder */}
            <div className="relative flex-1 min-h-[380px] w-full bg-slate-200">
              <iframe
                title={`Google Map Location of ${clinicConfig.clinicName}`}
                src={clinicConfig.googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '380px' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
