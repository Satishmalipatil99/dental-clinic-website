export interface ClinicConfig {
  clinicName: string;
  tagline: string;
  doctorName: string;
  qualification: string;
  specialization: string;
  registrationNumber: string;
  experienceYears: string;
  phone: string;
  phoneDisplay: string;
  whatsapp: string;
  whatsappDisplay: string;
  email: string;
  address: {
    street: string;
    area: string;
    city: string;
    state: string;
    postalCode: string;
    landmark: string;
  };
  openingHours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  googleMapsEmbedUrl: string;
  googleMapsDirectionsUrl: string;
  social: {
    instagram: string;
    facebook: string;
    youtube: string;
    linkedin: string;
  };
  emergencyNotice: string;
  consultationFee: string;
}

export interface Treatment {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  iconName: string;
  durationEstimate: string;
  anesthesiaType?: string;
  comfortAndAnesthesia?: string;
  imagePlaceholderAlt?: string;
  overview: string;
  recommendedWhen?: string[];
  commonSigns?: string[];
  symptoms?: string[];
  howItWorks?: string;
  procedureSteps: {
    title: string;
    description: string;
  }[];
  benefits?: string[];
  aftercareGuidelines?: string[];
  aftercare?: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export interface DoctorProfile {
  name: string;
  qualification: string;
  specialization: string;
  registrationNumber: string;
  experienceYears: string;
  bioParagraphs: string[];
  credentials: string[];
  clinicalFocus: string[];
  memberships: string[];
  schedule: {
    days: string;
    hours: string;
  }[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  summary?: string;
  author: string;
  authorRole?: string;
  publishDate: string;
  readTime: string;
  category: string;
  tags?: string[];
  relatedTreatmentSlugs?: string[];
  content: string[];
  contentHtml?: string;
  faqs?: {
    question: string;
    answer: string;
  }[];
}

export interface ReviewItem {
  id: string;
  patientName: string;
  treatmentName: string;
  rating: number;
  date?: string;
  reviewDate: string;
  reviewText: string;
  verifiedStatus: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  description: string;
}

export interface BeforeAfterCase {
  id: string;
  treatmentName: string;
  category: string;
  treatmentDuration: string;
  caseDescription: string;
  consentNotice: string;
}

export interface AppointmentNotifications {
  emailSent?: boolean;
  emailSentAt?: string;
  smsSent?: boolean;
  smsSentAt?: string;
  whatsappSent?: boolean;
  whatsappSentAt?: string;
}

export interface AppointmentRecord {
  id: string;
  fullName: string;
  phoneNumber: string;
  email?: string;
  preferredDate: string;
  preferredTime: string;
  treatmentReason: string;
  additionalNotes?: string;
  createdAt: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  notifications?: AppointmentNotifications;
}

export type AppointmentRequest = AppointmentRecord;
