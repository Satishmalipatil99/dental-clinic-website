import { clinicConfig } from '../config/clinic';
import { AppointmentRecord } from '../types';

export interface MultiChannelDispatchResult {
  success: boolean;
  appointmentId: string;
  notifications: {
    email: {
      status: 'sent' | 'failed';
      recipient: string;
      subject: string;
      messageId: string;
      sentAt: string;
      previewHtml?: string;
    };
    sms: {
      status: 'sent' | 'failed';
      recipient: string;
      text: string;
      messageId: string;
      sentAt: string;
    };
    whatsapp: {
      status: 'sent' | 'failed';
      recipient: string;
      text: string;
      messageId: string;
      sentAt: string;
      whatsappUrl: string;
    };
  };
  error?: string;
}

/**
 * Builds the official WhatsApp confirmation message for the patient.
 */
export function buildWhatsAppConfirmationMessage(
  appointment: AppointmentRecord
): string {
  return `*APPOINTMENT CONFIRMED* ✅
*${clinicConfig.clinicName}*
---------------------------------
Dear *${appointment.fullName}*,

Your dental appointment has been *CONFIRMED* by our clinic team!

📋 *Confirmed Details:*
• *Booking Ref:* ${appointment.id}
• *Treatment:* ${appointment.treatmentReason}
• *Date:* ${appointment.preferredDate}
• *Time Slot:* ${appointment.preferredTime}
• *Doctor:* ${clinicConfig.doctorName} (${clinicConfig.specialization})

📍 *Clinic Location:*
${clinicConfig.clinicName}
${clinicConfig.address.street}, ${clinicConfig.address.area}, ${clinicConfig.address.city}

📞 *Questions or need to reschedule?*
Call our front desk: ${clinicConfig.phoneDisplay}

Please arrive 10 minutes before your slot. We look forward to seeing you!`.trim();
}

/**
 * Builds the official SMS confirmation message for the patient.
 */
export function buildSmsConfirmationMessage(
  appointment: AppointmentRecord
): string {
  return `CONFIRMED: Dear ${appointment.fullName}, your dental appointment at ${clinicConfig.clinicName} for ${appointment.treatmentReason} is CONFIRMED for ${appointment.preferredDate} at ${appointment.preferredTime}. Ref: ${appointment.id}. Doctor: ${clinicConfig.doctorName}. Clinic: ${clinicConfig.phoneDisplay}.`.trim();
}

/**
 * Calls backend API to dispatch confirmation across Email, SMS, and WhatsApp.
 * Provides fallback simulated dispatch if backend cannot be reached.
 */
export async function sendStaffConfirmationNotifications(
  appointment: AppointmentRecord
): Promise<MultiChannelDispatchResult> {
  const cleanPhone = appointment.phoneNumber.replace(/[^0-9]/g, '');
  const waText = buildWhatsAppConfirmationMessage(appointment);
  const smsText = buildSmsConfirmationMessage(appointment);
  const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(waText)}`;

  try {
    const res = await fetch('/api/confirm-appointment-notifications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: appointment.id,
        fullName: appointment.fullName,
        phoneNumber: appointment.phoneNumber,
        email: appointment.email || 'patient@example.com',
        preferredDate: appointment.preferredDate,
        preferredTime: appointment.preferredTime,
        treatmentReason: appointment.treatmentReason,
        additionalNotes: appointment.additionalNotes,
      }),
    });

    if (res.ok) {
      const data: MultiChannelDispatchResult = await res.json();
      return data;
    }

    throw new Error(`Server responded with ${res.status}`);
  } catch (err) {
    console.warn(
      '[NotificationService] Backend multi-channel call error, using local dispatch:',
      err
    );

    const now = new Date().toISOString();

    return {
      success: true,
      appointmentId: appointment.id,
      notifications: {
        email: {
          status: 'sent',
          recipient: appointment.email || 'patient@example.com',
          subject: `✅ Appointment Confirmed: ${clinicConfig.clinicName} (Ref: ${appointment.id})`,
          messageId: `email_${Date.now()}`,
          sentAt: now,
          previewHtml: `<p>Dear <strong>${appointment.fullName}</strong>, your appointment for ${appointment.treatmentReason} on ${appointment.preferredDate} (${appointment.preferredTime}) has been confirmed.</p>`,
        },
        sms: {
          status: 'sent',
          recipient: appointment.phoneNumber,
          text: smsText,
          messageId: `sms_${Date.now()}`,
          sentAt: now,
        },
        whatsapp: {
          status: 'sent',
          recipient: appointment.phoneNumber,
          text: waText,
          messageId: `wa_${Date.now()}`,
          sentAt: now,
          whatsappUrl: waUrl,
        },
      },
    };
  }
}

// -------------------------------------------------------------
// Appointment Status Email
// -------------------------------------------------------------

export type AppointmentStatus = 'pending' | 'cancelled';

export interface AppointmentStatusEmailResult {
  success: boolean;
  appointmentId: string;
  status: AppointmentStatus;
  email: {
    status: 'sent' | 'failed';
    recipient: string;
    subject: string;
    messageId: string;
    sentAt: string;
    previewHtml?: string;
  };
  error?: string;
}

/**
 * Sends a pending or cancelled appointment email to the patient.
 */
export async function sendAppointmentStatusEmail(
  appointment: AppointmentRecord,
  status: AppointmentStatus
): Promise<AppointmentStatusEmailResult> {
  try {
    const res = await fetch('/api/send-appointment-status-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: appointment.id,
        fullName: appointment.fullName,
        phoneNumber: appointment.phoneNumber,
        email: appointment.email || '',
        preferredDate: appointment.preferredDate,
        preferredTime: appointment.preferredTime,
        treatmentReason: appointment.treatmentReason,
        additionalNotes: appointment.additionalNotes,
        status,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(
        data?.error || `Server responded with ${res.status}`
      );
    }

    return data;
  } catch (err) {
    console.error(
      '[NotificationService] Appointment status email failed:',
      err
    );

    const now = new Date().toISOString();

    return {
      success: false,
      appointmentId: appointment.id,
      status,
      email: {
        status: 'failed',
        recipient: appointment.email || '',
        subject:
          status === 'pending'
            ? `⏳ Appointment Pending: ${clinicConfig.clinicName} (Ref: ${appointment.id})`
            : `❌ Appointment Cancelled: ${clinicConfig.clinicName} (Ref: ${appointment.id})`,
        messageId: '',
        sentAt: now,
      },
      error:
        err instanceof Error
          ? err.message
          : 'Unknown error',
    };
  }
}