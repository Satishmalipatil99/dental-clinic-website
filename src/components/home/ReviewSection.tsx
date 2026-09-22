import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MessageSquare, ExternalLink, ArrowRight, ShieldCheck } from 'lucide-react';
import { reviewsData } from '../../config/reviews';
import { clinicConfig } from '../../config/clinic';

export const ReviewSection: React.FC = () => {
  return (
    <section id="reviews-section" className="py-16 md:py-24 bg-[#fcfdfd] border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-md border border-teal-100">
            TESTIMONIALS & FEEDBACK
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f2b48] tracking-tight">
            WHAT OUR PATIENTS SAY
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Patient experiences reflecting our focus on gentle clinical execution, clear communication, and comfortable care.
          </p>
        </div>

        {/* Ethical Transparency Notice */}
        <div className="max-w-2xl mx-auto mb-10 text-center text-xs text-slate-500 bg-white border border-slate-200/80 rounded-xl p-3">
          <span>
            ℹ️ <strong>Review System Notice:</strong> As per healthcare advertising compliance, reviews below illustrate feedback from verified clinic visitors. Replace with your clinic’s direct Google Business Profile reviews.
          </span>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviewsData.map(review => (
            <div
              key={review.id}
              className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* 5 Stars */}
                <div className="flex items-center gap-1 text-amber-400" aria-label="5 out of 5 stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Treatment Tag */}
                <span className="inline-block text-[11px] font-semibold text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-md">
                  {review.treatmentName}
                </span>

                {/* Review Text */}
                <p className="text-sm text-slate-600 italic leading-relaxed">
                  "{review.reviewText}"
                </p>
              </div>

              {/* Patient Signature */}
              <div className="pt-4 mt-6 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-[#0f2b48]">
                    — {review.patientName}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    {review.verifiedStatus}
                  </div>
                </div>
                <ShieldCheck className="w-4 h-4 text-teal-600" />
              </div>
            </div>
          ))}
        </div>

        {/* Action Button: View More Reviews */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/reviews"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-semibold transition-colors"
          >
            <span>View More Reviews</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <a
            href={clinicConfig.googleMapsDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-200 hover:bg-white text-slate-700 text-sm font-medium transition-colors"
          >
            <span>Read Google Maps Reviews</span>
            <ExternalLink className="w-4 h-4 text-slate-400" />
          </a>
        </div>

      </div>
    </section>
  );
};
