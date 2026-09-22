import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { MobileCTA } from './MobileCTA';
import { trackEvent } from '../../utils/analytics';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { pathname } = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
    trackEvent('page_view', { path: pathname });
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfdfd] text-[#1e293b]">
      {/* Accessible skip to main content */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-teal-600 text-white font-semibold rounded-md shadow-lg"
      >
        Skip to main content
      </a>

      {/* Main Sticky Header */}
      <Header />

      {/* Main Page Content */}
      <main id="main-content" className="flex-1 pt-[72px] lg:pt-[84px] pb-16 md:pb-0">
        {children}
      </main>

      {/* Primary Footer */}
      <Footer />

      {/* Mobile Sticky Bottom CTA Bar */}
      <MobileCTA />
    </div>
  );
};
