import React from 'react';
import { AlertCircle } from 'lucide-react';

interface MedicalDisclaimerProps {
  compact?: boolean;
}

export const MedicalDisclaimer: React.FC<MedicalDisclaimerProps> = ({ compact = false }) => {
  if (compact) {
    return (
      <div className="flex items-start gap-2 text-xs text-slate-500 bg-slate-50 border border-slate-200/80 rounded-lg p-3">
        <AlertCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
        <p>
          <strong>Medical Notice:</strong> Information presented here is educational and does not constitute formal medical diagnosis or treatment guarantee. Please consult with our dentist for an individualized clinical assessment.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-blue-50/60 border border-blue-100 rounded-xl p-4 sm:p-5 text-xs sm:text-sm text-slate-600 leading-relaxed my-6">
      <div className="flex items-center gap-2 text-blue-900 font-semibold mb-1.5">
        <AlertCircle className="w-4 h-4 text-blue-700" />
        <span>Clinical & Educational Information Disclaimer</span>
      </div>
      <p>
        The content provided on this page is for general educational and informational guidance only. Dental health conditions and suitable treatment options vary significantly between individuals. No material on this website is intended to serve as a definitive diagnosis or replace direct consultation with Dr. [Doctor Name] or a licensed dental specialist.
      </p>
    </div>
  );
};
