import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Phone, Calendar, ArrowLeft } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { clinicConfig, getTelUrl } from '../config/clinic';

export const NotFoundPage: React.FC = () => {
  return (
    <>
      <SEOHead
        title="404 – Page Not Found"
        description="The dental page you are looking for does not exist or has been relocated."
        canonicalPath="/404"
      />

      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="text-6xl font-extrabold text-teal-600 font-mono">
          404
        </div>
        <h1 className="text-3xl font-bold text-[#0f2b48]">
          Page Not Found
        </h1>
        <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
          The page you requested may have moved or no longer exists. Let's guide you back to our dental services.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0f2b48] hover:bg-[#163b63] text-white text-xs font-semibold transition-colors"
          >
            <Home className="w-4 h-4 text-teal-300" />
            <span>Return to Homepage</span>
          </Link>

          <Link
            to="/treatments"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-medium transition-colors"
          >
            <span>Explore Treatments</span>
          </Link>

          <a
            href={getTelUrl()}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-medium transition-colors"
          >
            <Phone className="w-4 h-4 text-teal-600" />
            <span>Call Clinic: {clinicConfig.phoneDisplay}</span>
          </a>
        </div>
      </div>
    </>
  );
};
