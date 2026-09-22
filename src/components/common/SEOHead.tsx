import React, { useEffect } from 'react';
import { clinicConfig } from '../../config/clinic';

interface SEOProps {
  title: string;
  description: string;
  canonicalPath?: string;
  type?: 'website' | 'article';
  schema?: Record<string, any>;
}

export const SEOHead: React.FC<SEOProps> = ({
  title,
  description,
  canonicalPath = '',
  type = 'website',
  schema
}) => {
  const fullTitle = `${title} | ${clinicConfig.clinicName}`;

  useEffect(() => {
    // Set document title
    document.title = fullTitle;

    // Set meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // Set OG Title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', fullTitle);

    // Set OG Description
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', description);

    // Set OG Type
    let ogType = document.querySelector('meta[property="og:type"]');
    if (ogType) ogType.setAttribute('content', type);

    // Dynamic canonical URL
    const canonicalUrl = typeof window !== 'undefined' ? `${window.location.origin}${canonicalPath}` : '';
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    if (canonicalUrl) {
      linkCanonical.setAttribute('href', canonicalUrl);
    }

    // Structured data injection
    const scriptId = 'schema-org-structured-data';
    let existingScript = document.getElementById(scriptId);
    if (existingScript) {
      existingScript.remove();
    }

    const defaultLocalBusinessSchema = {
      "@context": "https://schema.org",
      "@type": "Dentist",
      "name": clinicConfig.clinicName,
      "image": "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80",
      "telephone": clinicConfig.phone,
      "email": clinicConfig.email,
      "url": typeof window !== 'undefined' ? window.location.origin : '',
      "address": {
        "@type": "PostalAddress",
        "streetAddress": clinicConfig.address.street,
        "addressLocality": clinicConfig.address.area,
        "addressRegion": clinicConfig.address.city,
        "postalCode": clinicConfig.address.postalCode,
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 12.9716,
        "longitude": 77.5946
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "09:30",
          "closes": "20:30"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Saturday"],
          "opens": "09:30",
          "closes": "19:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Sunday"],
          "opens": "10:00",
          "closes": "13:30"
        }
      ],
      "priceRange": "$$"
    };

    const script = document.createElement('script');
    script.id = scriptId;
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify(schema || defaultLocalBusinessSchema);
    document.head.appendChild(script);

    return () => {
      // Clean up structured data on unmount
      const s = document.getElementById(scriptId);
      if (s) s.remove();
    };
  }, [fullTitle, description, canonicalPath, type, schema]);

  return null;
};
