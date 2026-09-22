import { ClinicConfig, DoctorProfile } from '../types';

/**
 * Centralized Clinic Configuration
 * 
 * Instructions for clinic owner / developer:
 * Update this file with your actual dental clinic details, phone numbers,
 * operating hours, address, and Google Maps location URL.
 * All pages, buttons, and schema metadata update automatically.
 */
export const clinicConfig: ClinicConfig = {
  clinicName: "YOUR CLINIC NAME",
  tagline: "Personalized Dental Care & Advanced Oral Health",
  doctorName: "Dr. YOUR NAME",
  qualification: "BDS, MDS [YOUR QUALIFICATION]",
  specialization: "YOUR SPECIALIZATION (e.g. Endodontist & Implantologist)",
  registrationNumber: "[YOUR STATE DENTAL COUNCIL REGISTRATION NO.]",
  experienceYears: "[XX] Years Clinical Experience",
  
  // Contact phone numbers
  phone: "+919876543210", // Format for tel: links
  phoneDisplay: "+91 98765 43210", // Clean display format
  whatsapp: "919876543210", // Format for wa.me link without '+'
  whatsappDisplay: "+91 98765 43210",
  email: "clinic@example.com",

  // Physical Location
  address: {
    street: "YOUR STREET ADDRESS, SUITE / FLOOR",
    area: "YOUR LOCALITY / AREA",
    city: "YOUR CITY",
    state: "YOUR STATE",
    postalCode: "XXXXXX",
    landmark: "NEAR NOTABLE LANDMARK",
  },

  // Operating Hours
  openingHours: {
    weekdays: "Monday – Friday: 09:30 AM – 08:30 PM",
    saturday: "Saturday: 09:30 AM – 07:00 PM",
    sunday: "Sunday: 10:00 AM – 01:30 PM (By Appointment Only)",
  },

  // Location & Navigation
  // Update with your actual Google Maps embed iframe src URL and directions link:
  googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.8927503816796!2d77.5945627!3d12.9715987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU4JzE3LjgiTiA3N8KwMzUnNDAuNCJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin",
  googleMapsDirectionsUrl: "https://maps.google.com/?q=YOUR+CLINIC+NAME+YOUR+CITY",

  // Social Channels
  social: {
    instagram: "https://instagram.com/yourclinic",
    facebook: "https://facebook.com/yourclinic",
    youtube: "https://youtube.com/@yourclinic",
    linkedin: "https://linkedin.com/company/yourclinic",
  },

  emergencyNotice: "For acute severe dental trauma or bleeding, please call our clinic priority line immediately.",
  consultationFee: "Consultation fee provided during scheduling (varies by clinical evaluation needs)",
};

export const doctorProfile: DoctorProfile = {
  name: clinicConfig.doctorName,
  qualification: clinicConfig.qualification,
  specialization: clinicConfig.specialization,
  registrationNumber: clinicConfig.registrationNumber,
  experienceYears: clinicConfig.experienceYears,
  bioParagraphs: [
    "Welcome to our practice. As a dental surgeon dedicated to patient-centered, ethical dental care, my focus is on preserving natural tooth structure, eliminating pain with gentle technique, and restoring oral function.",
    "Our clinic is founded on transparent communication. Before commencing any procedure, we take time to examine your oral health using digital imaging, clearly explain all findings, outline conservative and alternative treatment pathways, and ensure you are comfortable at every step.",
    "We maintain rigorous sterilization protocols adhering to international infection control standards, ensuring every patient receives safe, compassionate, and evidence-based care in a calm, modern clinical setting."
  ],
  credentials: [
    "Bachelor of Dental Surgery (BDS) - [YOUR DENTAL COLLEGE / UNIVERSITY]",
    "Master of Dental Surgery (MDS) - [YOUR SPECIALTY & UNIVERSITY]",
    "Registered with State Dental Council [REG. NO. PLACEHOLDER]",
    "Continuous Medical & Dental Education Certification in Modern Endodontics & Biomimetic Dentistry"
  ],
  clinicalFocus: [
    "Microscopic & Single-Visit Root Canal Treatments",
    "Conservative Cosmetic & Restorative Dentistry",
    "Digital Smile & Occlusal Rehabilitation",
    "Preventative Pediatric Care & Habit Correction",
    "Laser-Assisted Periodontal (Gum) Therapies"
  ],
  memberships: [
    "Indian Dental Association (IDA)",
    "Specialty Association of Endodontics / Orthodontics / Prosthodontics [PLACEHOLDER]"
  ],
  schedule: [
    { days: "Monday – Friday", hours: "09:30 AM – 01:30 PM, 04:30 PM – 08:30 PM" },
    { days: "Saturday", hours: "09:30 AM – 02:00 PM, 04:00 PM – 07:00 PM" },
    { days: "Sunday", hours: "10:00 AM – 01:30 PM (Prior Appointment Recommended)" },
  ]
};

/**
 * Helper to build custom contextual WhatsApp messages
 * Supports sending to clinic or sending to a specific patient's phone number
 */
export function getWhatsAppUrl(customMessage?: string, targetPhone?: string): string {
  const cleanPhone = targetPhone ? targetPhone.replace(/[^0-9]/g, '') : clinicConfig.whatsapp;
  const message = customMessage || "Hi, I would like to book a dental appointment at " + clinicConfig.clinicName + ".";
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

/**
 * Helper to build click-to-call link
 */
export function getTelUrl(): string {
  return `tel:${clinicConfig.phone}`;
}
