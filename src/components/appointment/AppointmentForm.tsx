import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  MessageCircle,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';
import { treatmentsData } from '../../config/treatments';
import { clinicConfig, getWhatsAppUrl, getTelUrl } from '../../config/clinic';
import { saveAppointment } from '../../utils/storage';
import { trackEvent } from '../../utils/analytics';
import { sendPatientConfirmationEmail, EmailDispatchResult } from '../../utils/emailService';

interface AppointmentFormProps {
  defaultTreatmentSlug?: string;
  onSuccess?: () => void;
}

export const AppointmentForm: React.FC<AppointmentFormProps> = ({ defaultTreatmentSlug, onSuccess }) => {
  const defaultTreatment = treatmentsData.find(t => t.slug === defaultTreatmentSlug)?.name || '';

  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    preferredDate: '',
    preferredTime: '10:00 AM',
    treatmentReason: defaultTreatment || 'General Dental Consultation',
    additionalNotes: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submissionId, setSubmissionId] = useState<string>('');
  const [emailStatus, setEmailStatus] = useState<EmailDispatchResult['emailDetails'] | null>(null);
  const [showEmailPreview, setShowEmailPreview] = useState(false);

  // Get tomorrow's date formatted as YYYY-MM-DD for min date
  const today = new Date();
  const minDate = today.toISOString().split('T')[0];

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Please enter a valid full name';
    }

    const cleanPhone = formData.phoneNumber.replace(/[\s\-\(\)\+]/g, '');
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required so we can confirm your slot';
    } else if (cleanPhone.length < 9) {
      newErrors.phoneNumber = 'Please provide a valid phone number (at least 10 digits)';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required to receive your confirmation email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email address';
    }

    if (!formData.preferredDate) {
      newErrors.preferredDate = 'Please select a preferred date';
    } else if (formData.preferredDate < minDate) {
      newErrors.preferredDate = 'Please choose today or a future date';
    }

    if (!formData.treatmentReason) {
      newErrors.treatmentReason = 'Please select a treatment or reason for visit';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const newRecord = saveAppointment({
        fullName: formData.fullName.trim(),
        phoneNumber: formData.phoneNumber.trim(),
        email: formData.email.trim(),
        preferredDate: formData.preferredDate,
        preferredTime: formData.preferredTime,
        treatmentReason: formData.treatmentReason,
        additionalNotes: formData.additionalNotes.trim() || undefined,
      });

      // Dispatch patient confirmation email
      const emailResult = await sendPatientConfirmationEmail({
        id: newRecord.id,
        fullName: formData.fullName.trim(),
        phoneNumber: formData.phoneNumber.trim(),
        email: formData.email.trim(),
        preferredDate: formData.preferredDate,
        preferredTime: formData.preferredTime,
        treatmentReason: formData.treatmentReason,
        additionalNotes: formData.additionalNotes.trim() || undefined,
      });

      if (emailResult.emailDetails) {
        setEmailStatus(emailResult.emailDetails);
      }

      trackEvent('appointment_form_submitted', {
        treatment: formData.treatmentReason,
        preferredDate: formData.preferredDate,
        id: newRecord.id,
        email: formData.email.trim()
      });

      setSubmissionId(newRecord.id);
      setSubmitted(true);
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error(err);
      setErrors({ form: 'An unexpected error occurred while saving your request. Please call our clinic directly.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    const confirmationWhatsAppMsg = `Hi ${clinicConfig.clinicName}, I just submitted an appointment request online (Ref: ${submissionId}) for ${formData.fullName} regarding ${formData.treatmentReason} on ${formData.preferredDate} at ${formData.preferredTime}.`;

    return (
      <div 
        id="appointment-success-container"
        className="bg-white rounded-2xl border border-teal-200/80 p-6 sm:p-10 shadow-sm text-center"
      >
        <div className="w-16 h-16 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-600 mx-auto mb-5 shadow-xs">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <h3 className="text-2xl font-bold text-[#0f2b48] mb-2">
          Thank You, {formData.fullName}
        </h3>

        <div className="max-w-md mx-auto space-y-3 text-slate-600 text-sm leading-relaxed mb-6">
          <p className="font-semibold text-teal-800 bg-teal-50/80 py-2 px-3 rounded-lg border border-teal-100">
            Your appointment request has been received.
          </p>

          {/* Email Confirmation Notice */}
          <div className="p-3.5 bg-teal-50/90 rounded-xl border border-teal-200 text-xs text-teal-900 text-left space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-teal-800">
              <Mail className="w-4 h-4 text-teal-600 shrink-0" />
              <span>Confirmation Email Dispatched</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              A confirmation email has been sent to <strong>{formData.email}</strong> with your appointment reference, procedure summary, and visit instructions.
            </p>
            {emailStatus?.htmlPreview && (
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => setShowEmailPreview(!showEmailPreview)}
                  className="text-teal-700 hover:text-teal-900 font-semibold underline cursor-pointer"
                >
                  {showEmailPreview ? 'Hide Sent Confirmation Email Copy' : 'View Sent Confirmation Email Copy'}
                </button>
              </div>
            )}
          </div>

          {showEmailPreview && emailStatus?.htmlPreview && (
            <div className="text-left p-4 bg-slate-50 border border-slate-200 rounded-xl max-h-64 overflow-y-auto text-xs text-slate-700 shadow-inner">
              <div className="text-[11px] text-slate-400 font-mono mb-2 pb-1 border-b border-slate-200">
                To: {emailStatus.recipient} • Subject: {emailStatus.subject}
              </div>
              <div dangerouslySetInnerHTML={{ __html: emailStatus.htmlPreview }} />
            </div>
          )}

          <p>
            The clinic team will review the appointment schedule and contact you shortly via phone/WhatsApp to confirm your time slot and provide any preliminary visit instructions.
          </p>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-500 text-left space-y-1">
            <div><strong>Request Reference:</strong> {submissionId}</div>
            <div><strong>Requested Service:</strong> {formData.treatmentReason}</div>
            <div><strong>Target Date & Time:</strong> {formData.preferredDate} ({formData.preferredTime})</div>
            <div><strong>Contact Number:</strong> {formData.phoneNumber}</div>
            <div><strong>Confirmation Email Sent To:</strong> {formData.email}</div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
          <a
            href={getWhatsAppUrl(confirmationWhatsAppMsg)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('whatsapp_click', { source: 'appointment_success_screen' })}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition-colors shadow-xs"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Speed up via WhatsApp</span>
          </a>

          <button
            type="button"
            onClick={() => {
              setSubmitted(false);
              setEmailStatus(null);
              setShowEmailPreview(false);
              setFormData({
                fullName: '',
                phoneNumber: '',
                email: '',
                preferredDate: '',
                preferredTime: '10:00 AM',
                treatmentReason: 'General Dental Consultation',
                additionalNotes: ''
              });
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-medium transition-colors"
          >
            <span>Book Another Visit</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <form 
      id="dental-appointment-form"
      onSubmit={handleSubmit}
      noValidate
      className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-5"
    >
      <div className="border-b border-slate-100 pb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-[#0f2b48]">
          Request an Appointment
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Fill in your details below. Our staff will contact you promptly to confirm your appointment time.
        </p>
      </div>

      {errors.form && (
        <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-start gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{errors.form}</span>
        </div>
      )}

      {/* Row 1: Full Name & Phone Number */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="apt-fullName" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            Full Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="apt-fullName"
              name="fullName"
              type="text"
              required
              placeholder="e.g. Aditi Rao"
              value={formData.fullName}
              onChange={e => {
                setFormData({ ...formData, fullName: e.target.value });
                if (errors.fullName) setErrors({ ...errors, fullName: '' });
              }}
              className={`w-full pl-10 pr-3 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                errors.fullName 
                  ? 'border-red-300 focus:ring-red-200 bg-red-50/20' 
                  : 'border-slate-200 focus:border-teal-500 focus:ring-teal-100'
              }`}
            />
          </div>
          {errors.fullName && (
            <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
          )}
        </div>

        <div>
          <label htmlFor="apt-phoneNumber" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="apt-phoneNumber"
              name="phoneNumber"
              type="tel"
              required
              placeholder="e.g. +91 98765 43210"
              value={formData.phoneNumber}
              onChange={e => {
                setFormData({ ...formData, phoneNumber: e.target.value });
                if (errors.phoneNumber) setErrors({ ...errors, phoneNumber: '' });
              }}
              className={`w-full pl-10 pr-3 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                errors.phoneNumber 
                  ? 'border-red-300 focus:ring-red-200 bg-red-50/20' 
                  : 'border-slate-200 focus:border-teal-500 focus:ring-teal-100'
              }`}
            />
          </div>
          {errors.phoneNumber && (
            <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>
          )}
        </div>
      </div>

      {/* Row 2: Email & Treatment selection */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="apt-email" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            Email Address <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="apt-email"
              name="email"
              type="email"
              required
              placeholder="you@example.com (for confirmation email)"
              value={formData.email}
              onChange={e => {
                setFormData({ ...formData, email: e.target.value });
                if (errors.email) setErrors({ ...errors, email: '' });
              }}
              className={`w-full pl-10 pr-3 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                errors.email 
                  ? 'border-red-300 focus:ring-red-200 bg-red-50/20' 
                  : 'border-slate-200 focus:border-teal-500 focus:ring-teal-100'
              }`}
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="apt-treatment" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            Treatment / Reason for Visit <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <FileText className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <select
              id="apt-treatment"
              name="treatmentReason"
              value={formData.treatmentReason}
              onChange={e => setFormData({ ...formData, treatmentReason: e.target.value })}
              className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition-all"
            >
              <option value="General Dental Consultation">General Dental Consultation & Checkup</option>
              {treatmentsData.map(t => (
                <option key={t.id} value={t.name}>{t.name}</option>
              ))}
              <option value="Severe Toothache / Urgent Consultation">Severe Toothache / Urgent Consultation</option>
              <option value="Second Opinion / Treatment Plan Review">Second Opinion / Treatment Plan Review</option>
            </select>
          </div>
        </div>
      </div>

      {/* Row 3: Date & Preferred Time */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="apt-date" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            Preferred Date <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id="apt-date"
              name="preferredDate"
              type="date"
              min={minDate}
              required
              value={formData.preferredDate}
              onChange={e => {
                setFormData({ ...formData, preferredDate: e.target.value });
                if (errors.preferredDate) setErrors({ ...errors, preferredDate: '' });
              }}
              className={`w-full pl-10 pr-3 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                errors.preferredDate 
                  ? 'border-red-300 focus:ring-red-200 bg-red-50/20' 
                  : 'border-slate-200 focus:border-teal-500 focus:ring-teal-100'
              }`}
            />
          </div>
          {errors.preferredDate && (
            <p className="text-red-500 text-xs mt-1">{errors.preferredDate}</p>
          )}
        </div>

        <div>
          <label htmlFor="apt-time" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            Preferred Time Window
          </label>
          <div className="relative">
            <Clock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <select
              id="apt-time"
              name="preferredTime"
              value={formData.preferredTime}
              onChange={e => setFormData({ ...formData, preferredTime: e.target.value })}
              className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition-all"
            >
              <option value="Morning (10:00 AM – 01:00 PM)">Morning (10:00 AM – 01:00 PM)</option>
              <option value="Afternoon (01:00 PM – 04:30 PM)">Afternoon (01:00 PM – 04:30 PM)</option>
              <option value="Evening (05:00 PM – 08:30 PM)">Evening (05:00 PM – 08:30 PM)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Row 4: Additional Notes */}
      <div>
        <label htmlFor="apt-notes" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
          Additional Notes or Symptoms <span className="text-slate-400 font-normal">(Optional)</span>
        </label>
        <textarea
          id="apt-notes"
          name="additionalNotes"
          rows={3}
          placeholder="e.g. Sensitivity to cold, bleeding gum in lower jaw, or first dental visit..."
          value={formData.additionalNotes}
          onChange={e => setFormData({ ...formData, additionalNotes: e.target.value })}
          className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition-all"
        />
      </div>

      {/* Safety & Confirmation Note */}
      <div className="text-[11px] text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center gap-2">
        <ShieldAlert className="w-4 h-4 text-teal-600 shrink-0" />
        <span>
          Note: This form transmits an initial appointment enquiry. Our front-desk coordinator will review current chair availability and call to finalize your appointment time.
        </span>
      </div>

      {/* Submit Button */}
      <button
        id="submit-appointment-btn"
        type="submit"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-[#0f2b48] hover:bg-[#163b63] text-white font-semibold text-base transition-all shadow-md shadow-blue-950/20 active:scale-98 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
      >
        {isSubmitting ? (
          <span>Securing Request...</span>
        ) : (
          <>
            <span>BOOK APPOINTMENT</span>
            <ArrowRight className="w-4 h-4 text-teal-300" />
          </>
        )}
      </button>
    </form>
  );
};
