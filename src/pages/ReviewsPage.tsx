import React from 'react';
import { Star, ShieldCheck, ExternalLink, MessageCircle, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { reviewsData } from '../config/reviews';
import { clinicConfig } from '../config/clinic';

export const ReviewsPage: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Patient Reviews & Experiences – Dental Clinic"
        description={`Read genuine reviews from patients of ${clinicConfig.clinicName}. Experience our gentle dental care, root canals, implants, and cleanings in ${clinicConfig.address.city}.`}
        canonicalPath="/reviews"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Breadcrumbs items={[{ label: 'Patient Reviews' }]} />

        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto my-8 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-md border border-teal-100">
            TESTIMONIALS & CLINICAL TRUST
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0f2b48] tracking-tight">
            Patient Experiences
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Read verified feedback regarding our clinical precision, gentle anesthesia, sterilization protocols, and compassionate care.
          </p>
        </div>

        {/* Google Reviews Trust Bar */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs max-w-3xl mx-auto my-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-500 font-bold text-lg">
              ★
            </div>
            <div>
              <div className="text-base font-bold text-[#0f2b48]">
                Google Verified Ratings
              </div>
              <div className="text-xs text-slate-500">
                Independent feedback from clinic visitors on Google Maps
              </div>
            </div>
          </div>

          <a
            href={clinicConfig.googleMapsDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors"
          >
            <span>View on Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-10">
          {reviewsData.map(review => (
            <div
              key={review.id}
              className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-slate-400 font-medium">
                    {review.reviewDate || review.date}
                  </span>
                </div>

                <span className="inline-block text-xs font-semibold text-teal-800 bg-teal-50 px-2.5 py-1 rounded-md">
                  Treatment: {review.treatmentName}
                </span>

                <p className="text-sm text-slate-600 italic leading-relaxed">
                  "{review.reviewText}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-[#0f2b48]">
                    {review.patientName}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {review.verifiedStatus}
                  </div>
                </div>
                <ShieldCheck className="w-5 h-5 text-teal-600" />
              </div>
            </div>
          ))}
        </div>

        {/* Consultation Call to Action */}
        <div className="bg-gradient-to-br from-[#0f2b48] to-[#163b63] rounded-3xl p-8 sm:p-12 text-white text-center max-w-4xl mx-auto my-12 space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold">
            Experience Gentle, Patient-First Dentistry
          </h2>
          <p className="text-slate-200 text-sm max-w-xl mx-auto leading-relaxed">
            Schedule an initial consultation to discuss your teeth or gum concerns with {clinicConfig.doctorName}.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/book-appointment"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-900 font-bold text-sm transition-all"
            >
              <Calendar className="w-4 h-4 text-slate-900" />
              <span>Book Appointment</span>
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-sm transition-colors border border-white/20"
            >
              <span>Get Clinic Directions</span>
            </Link>
          </div>
        </div>

      </div>
    </>
  );
};
