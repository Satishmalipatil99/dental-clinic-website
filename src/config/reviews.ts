import { ReviewItem, BeforeAfterCase } from '../types';

/**
 * Notice: Reviews and testimonials displayed here are sample placeholders.
 * As per medical ethics and our prompt guidelines, do not fabricate real patient claims.
 * Replace these placeholders with genuine patient reviews collected with consent or
 * connect your verified Google Business Profile.
 */
export const reviewsData: ReviewItem[] = [
  {
    id: 'rev-1',
    patientName: 'Patient S. K. (Sample Placeholder)',
    treatmentName: 'Root Canal Treatment & Crown',
    rating: 5,
    reviewDate: 'Sample Review – Verified Clinic Visit',
    reviewText: 'Clear explanation of the procedure beforehand, very gentle technique, and the treatment was completed with minimal discomfort. The clinic environment is exceptionally clean and organized.',
    verifiedStatus: 'Sample Feedback Placeholder'
  },
  {
    id: 'rev-2',
    patientName: 'Patient R. M. (Sample Placeholder)',
    treatmentName: 'Dental Implant & Consultation',
    rating: 5,
    reviewDate: 'Sample Review – Verified Clinic Visit',
    reviewText: 'The doctor took the time to show me my 3D scans and explained the conservative treatment options without pressuring me. Highly professional and welcoming team.',
    verifiedStatus: 'Sample Feedback Placeholder'
  },
  {
    id: 'rev-3',
    patientName: 'Patient A. P. (Sample Placeholder)',
    treatmentName: 'Preventive Cleaning & Checkup',
    rating: 5,
    reviewDate: 'Sample Review – Verified Clinic Visit',
    reviewText: 'Thorough examination and gentle ultrasonic scaling. I appreciated the transparent discussion regarding my oral health routine and practical brushing tips.',
    verifiedStatus: 'Sample Feedback Placeholder'
  },
  {
    id: 'rev-4',
    patientName: 'Patient V. N. (Sample Placeholder)',
    treatmentName: 'Pediatric Dental Consultation',
    rating: 5,
    reviewDate: 'Sample Review – Verified Clinic Visit',
    reviewText: 'Brought my 7-year-old child for their first checkup. The doctor was patient, explained the instruments playfully, and made the visit a completely stress-free experience.',
    verifiedStatus: 'Sample Feedback Placeholder'
  }
];

export const beforeAfterCasesData: BeforeAfterCase[] = [
  {
    id: 'case-1',
    treatmentName: 'Ceramic Crown & Smile Restoration',
    category: 'Restorative Care',
    treatmentDuration: '2 appointments across 5 days',
    caseDescription: 'Restoration of a fractured anterior incisor with a custom-shaded all-ceramic crown, restoring natural translucency and bite balance.',
    consentNotice: 'Clinical record placeholder: Real patient pre- and post-treatment clinical photographs are displayed only with verified written patient consent.'
  },
  {
    id: 'case-2',
    treatmentName: 'Clear Aligner Orthodontic Correction',
    category: 'Orthodontics',
    treatmentDuration: '8 months active alignment',
    caseDescription: 'Correction of moderate lower anterior crowding and midline discrepancy using a series of customized clear orthodontic aligners.',
    consentNotice: 'Clinical record placeholder: Real patient pre- and post-treatment clinical photographs are displayed only with verified written patient consent.'
  },
  {
    id: 'case-3',
    treatmentName: 'Periodontal Therapy & Scaling',
    category: 'Periodontics',
    treatmentDuration: '2 visits with 4-week recall',
    caseDescription: 'Deep ultrasonic debridement and plaque removal, resolving localized gingival inflammation and restoring firm, pale-pink gum contours.',
    consentNotice: 'Clinical record placeholder: Real patient pre- and post-treatment clinical photographs are displayed only with verified written patient consent.'
  },
  {
    id: 'case-4',
    treatmentName: 'In-Office Enamel-Safe Teeth Whitening',
    category: 'Cosmetic Dentistry',
    treatmentDuration: 'Single 60-minute in-clinic session',
    caseDescription: 'Safe removal of deep extrinsic tea and coffee staining through professional pH-balanced bleaching, lightening the baseline shade by several intervals.',
    consentNotice: 'Clinical record placeholder: Real patient pre- and post-treatment clinical photographs are displayed only with verified written patient consent.'
  }
];
