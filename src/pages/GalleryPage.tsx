import React, { useState } from 'react';
import { Sparkles, Info, Eye, ShieldCheck, Cpu } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Lightbox } from '../components/common/Lightbox';
import { galleryItemsData } from '../config/gallery';
import { GalleryItem } from '../types';
import { clinicConfig } from '../config/clinic';

export const GalleryPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);

  const categories = [
    'All',
    'Treatment Rooms',
    'Sterilization Area',
    'Diagnostics',
    'Waiting Lounge',
    'Exterior'
  ];

  const filteredItems = activeCategory === 'All'
    ? galleryItemsData
    : galleryItemsData.filter(item => item.category === activeCategory);

  const handleOpenLightbox = (item: GalleryItem) => {
    setSelectedItem(item);
    setIsLightboxOpen(true);
  };

  return (
    <>
      <SEOHead
        title="Clinic Tour & Facility Gallery – Modern Dental Care"
        description={`Take a photo tour of ${clinicConfig.clinicName}: Sterilization room, modern treatment operatories, digital imaging suite, and patient lounge in ${clinicConfig.address.city}.`}
        canonicalPath="/gallery"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Breadcrumbs items={[{ label: 'Clinic Tour & Gallery' }]} />

        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto my-8 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-md border border-teal-100">
            TRANSPARENT CLINICAL ENVIRONMENT
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0f2b48] tracking-tight">
            Clinic Tour & Facility Gallery
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Take a visual walkthrough of our clinical operatory rooms, dedicated Class-B autoclave sterilization center, digital diagnostics, and comfortable waiting environment.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
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

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 my-8">
          {filteredItems.map(item => (
            <div
              key={item.id}
              onClick={() => handleOpenLightbox(item)}
              className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-lg hover:border-teal-300 transition-all cursor-pointer group flex flex-col justify-between"
            >
              {/* Image / Graphic Presentation Box */}
              <div className="relative aspect-16/10 bg-gradient-to-br from-slate-800 to-slate-900 flex flex-col justify-between p-5 text-white overflow-hidden">
                <div className="flex items-center justify-between relative z-10">
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white/10 backdrop-blur-md text-teal-200 border border-white/10">
                    {item.category}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Eye className="w-4 h-4 text-white" />
                  </div>
                </div>

                <div className="text-center my-auto py-2 relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center mx-auto mb-2 text-teal-300">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div className="text-sm font-bold text-white max-w-xs mx-auto">
                    {item.title}
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 inline-block">
                    Click to inspect view
                  </span>
                </div>

                <div className="text-[10px] text-slate-400 text-center relative z-10 border-t border-white/10 pt-2">
                  📸 Photo asset placeholder
                </div>
              </div>

              {/* Description Body */}
              <div className="p-5 space-y-1.5">
                <h3 className="text-base font-bold text-[#0f2b48] group-hover:text-teal-700 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        <Lightbox
          isOpen={isLightboxOpen}
          currentItem={selectedItem}
          items={filteredItems}
          onClose={() => setIsLightboxOpen(false)}
          onSelect={(item) => setSelectedItem(item)}
        />

        {/* Sterilization Protocol Callout */}
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 sm:p-10 my-12 max-w-4xl mx-auto space-y-4">
          <div className="flex items-center gap-2.5 text-teal-800 font-bold text-lg">
            <ShieldCheck className="w-6 h-6 text-teal-600" />
            <span>Our 6-Step Sterilization & Cross-Infection Protocol</span>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            Patient safety is non-negotiable. Every semi-critical and critical dental instrument undergoes ultrasonic pre-cleaning, enzymatic decontamination, sealing in medical pouches with biological indicators, and high-temperature vacuum sterilization in a certified Class-B Autoclave. Pouches are opened exclusively in your presence.
          </p>
        </div>

      </div>
    </>
  );
};
