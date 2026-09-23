import express, { Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first');
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Clinic constants for email and notification templates (matches src/config/clinic.ts)
const CLINIC_INFO = {
  clinicName: 'YOUR CLINIC NAME',
  tagline: 'Personalized Dental Care & Advanced Oral Health',
  doctorName: 'Dr. YOUR NAME',
  qualification: 'BDS, MDS',
  specialization: 'Endodontist & Implantologist',
  phoneDisplay: '+91 98765 43210',
  whatsappDisplay: '+91 98765 43210',
  email: 'clinic@example.com',
  address: {
    street: 'YOUR STREET ADDRESS, SUITE / FLOOR',
    area: 'YOUR LOCALITY / AREA',
    city: 'YOUR CITY',
    state: 'YOUR STATE',
    postalCode: 'XXXXXX',
  },
  emergencyNotice: 'For acute severe dental trauma or bleeding, please call our clinic priority line immediately.',
};

interface AppointmentPayload {
  id: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  preferredDate: string;
  preferredTime: string;
  treatmentReason: string;
  additionalNotes?: string;
}

// -------------------------------------------------------------
// 1. Initial Booking Request Confirmation Email (Patient submits form)
// -------------------------------------------------------------
function generateConfirmationEmailHtml(appointment: AppointmentPayload): string {
  const { id, fullName, phoneNumber, email, preferredDate, preferredTime, treatmentReason, additionalNotes } = appointment;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Appointment Request - ${CLINIC_INFO.clinicName}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f1f5f9; padding: 32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); border: 1px solid #e2e8f0;">
          <tr>
            <td style="background-color: #0f2b48; padding: 32px 28px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 800; letter-spacing: -0.5px;">${CLINIC_INFO.clinicName}</h1>
              <p style="margin: 6px 0 0 0; color: #94a3b8; font-size: 13px; font-weight: 500;">${CLINIC_INFO.tagline}</p>
            </td>
          </tr>
          <tr><td style="background-color: #0d9488; height: 4px;"></td></tr>
          <tr>
            <td style="padding: 32px 28px;">
              <h2 style="margin: 0 0 12px 0; color: #0f2b48; font-size: 20px; font-weight: 700;">Appointment Request Received</h2>
              <p style="margin: 0 0 20px 0; font-size: 15px; line-height: 1.6; color: #475569;">Dear <strong>${fullName}</strong>,</p>
              <p style="margin: 0 0 24px 0; font-size: 15px; line-height: 1.6; color: #475569;">
                Thank you for contacting <strong>${CLINIC_INFO.clinicName}</strong>. We have received your dental appointment request. Our reception team will review our schedule and contact you shortly.
              </p>
              <table role="presentation" width="100%" style="background-color: #f8fafc; border: 1px solid #cbd5e1; border-radius: 12px; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 16px 20px;">
                    <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; color: #0d9488;">Booking Reference</div>
                    <div style="font-size: 18px; font-weight: 800; color: #0f2b48; font-family: monospace;">${id}</div>
                    <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 12px 0;">
                    <p style="margin: 4px 0; font-size: 14px;"><strong>Service:</strong> ${treatmentReason}</p>
                    <p style="margin: 4px 0; font-size: 14px;"><strong>Requested Date:</strong> ${preferredDate}</p>
                    <p style="margin: 4px 0; font-size: 14px;"><strong>Requested Time:</strong> ${preferredTime}</p>
                    <p style="margin: 4px 0; font-size: 14px;"><strong>Phone:</strong> ${phoneNumber}</p>
                    <p style="margin: 4px 0; font-size: 14px;"><strong>Email:</strong> ${email}</p>
                    ${additionalNotes ? `<p style="margin: 4px 0; font-size: 14px;"><strong>Notes:</strong> ${additionalNotes}</p>` : ''}
                  </td>
                </tr>
              </table>
              <p style="margin: 0; font-size: 13px; color: #64748b; text-align: center;">Questions? Call <strong>${CLINIC_INFO.phoneDisplay}</strong>.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function generateConfirmationEmailText(appointment: AppointmentPayload): string {
  return `APPOINTMENT REQUEST RECEIVED - ${CLINIC_INFO.clinicName}
Dear ${appointment.fullName},
Thank you for your appointment request. Ref: ${appointment.id}.
Service: ${appointment.treatmentReason}
Date: ${appointment.preferredDate} | Time: ${appointment.preferredTime}
Our team will contact you shortly to confirm.
Phone: ${CLINIC_INFO.phoneDisplay}`;
}

// -------------------------------------------------------------
// 2. Staff Officially Confirmed Appointment Email Template
// -------------------------------------------------------------
function generateStaffConfirmedEmailHtml(appointment: AppointmentPayload): string {
  const { id, fullName, phoneNumber, email, preferredDate, preferredTime, treatmentReason, additionalNotes } = appointment;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Appointment Officially Confirmed - ${CLINIC_INFO.clinicName}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f1f5f9; padding: 32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.08); border: 1px solid #cbd5e1;">
          
          <!-- Clinic Branding Header -->
          <tr>
            <td style="background-color: #0f2b48; padding: 32px 28px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 800; letter-spacing: -0.5px;">
                ${CLINIC_INFO.clinicName}
              </h1>
              <p style="margin: 6px 0 0 0; color: #94a3b8; font-size: 13px; font-weight: 500;">
                ${CLINIC_INFO.tagline}
              </p>
            </td>
          </tr>

          <!-- Green Status Accent Line -->
          <tr>
            <td style="background-color: #10b981; height: 6px;"></td>
          </tr>

          <!-- Confirmation Body -->
          <tr>
            <td style="padding: 36px 30px;">
              
              <!-- Badge -->
              <div style="text-align: center; margin-bottom: 20px;">
                <span style="display: inline-block; background-color: #ecfdf5; color: #047857; font-weight: 800; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; padding: 6px 16px; border-radius: 9999px; border: 1px solid #a7f3d0;">
                  ✓ Status: Confirmed by Clinic Staff
                </span>
              </div>

              <h2 style="margin: 0 0 14px 0; color: #0f2b48; font-size: 22px; font-weight: 800; text-align: center;">
                Your Dental Appointment is Confirmed!
              </h2>

              <p style="margin: 0 0 20px 0; font-size: 15px; line-height: 1.6; color: #334155;">
                Dear <strong>${fullName}</strong>,
              </p>

              <p style="margin: 0 0 24px 0; font-size: 15px; line-height: 1.6; color: #334155;">
                Great news! Our clinical staff has reviewed the doctor's schedule and <strong>officially confirmed</strong> your appointment. Your dental chair has been reserved.
              </p>

              <!-- Confirmed Details Card -->
              <table role="presentation" width="100%" style="background-color: #f8fafc; border: 2px solid #10b981; border-radius: 14px; margin-bottom: 24px; border-collapse: separate;">
                <tr>
                  <td style="background-color: #f0fdf4; padding: 14px 20px; border-bottom: 1px solid #bbf7d0; border-top-left-radius: 12px; border-top-right-radius: 12px;">
                    <span style="font-size: 11px; font-weight: 800; text-transform: uppercase; color: #047857; letter-spacing: 0.5px;">Confirmed Booking Reference</span>
                    <div style="font-size: 20px; font-weight: 800; color: #0f2b48; font-family: monospace; margin-top: 2px;">${id}</div>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 20px;">
                    <table role="presentation" width="100%" style="font-size: 14px; line-height: 1.9;">
                      <tr>
                        <td width="38%" style="color: #64748b; font-weight: 600;">Confirmed Date:</td>
                        <td width="62%" style="color: #0f2b48; font-weight: 800; font-size: 15px;">${preferredDate}</td>
                      </tr>
                      <tr>
                        <td style="color: #64748b; font-weight: 600;">Confirmed Time Slot:</td>
                        <td style="color: #0f2b48; font-weight: 800; font-size: 15px;">${preferredTime}</td>
                      </tr>
                      <tr>
                        <td style="color: #64748b; font-weight: 600;">Treatment / Procedure:</td>
                        <td style="color: #047857; font-weight: 700;">${treatmentReason}</td>
                      </tr>
                      <tr>
                        <td style="color: #64748b; font-weight: 600;">Attending Doctor:</td>
                        <td style="color: #0f2b48; font-weight: 700;">${CLINIC_INFO.doctorName} (${CLINIC_INFO.specialization})</td>
                      </tr>
                      <tr>
                        <td style="color: #64748b; font-weight: 600;">Patient Contact:</td>
                        <td style="color: #0f2b48;">${phoneNumber}</td>
                      </tr>
                      ${
                        additionalNotes
                          ? `<tr>
                              <td style="color: #64748b; font-weight: 600; vertical-align: top;">Patient Notes:</td>
                              <td style="color: #334155;">${additionalNotes}</td>
                            </tr>`
                          : ''
                      }
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Visit Reminders Box -->
              <div style="background-color: #f0fdfa; border: 1px solid #ccfbf1; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
                <h4 style="margin: 0 0 10px 0; color: #0f766e; font-size: 14px; font-weight: 700;">
                  Important Instructions for Your Visit
                </h4>
                <ul style="margin: 0; padding-left: 18px; color: #115e59; font-size: 13px; line-height: 1.6;">
                  <li style="margin-bottom: 6px;">Please arrive <strong>10 minutes before</strong> your scheduled slot for smooth check-in.</li>
                  <li style="margin-bottom: 6px;">Carry any prior dental X-rays, diagnostic records, or medical discharge summaries.</li>
                  <li>If you take routine cardiovascular, diabetes, or blood thinner medications, please inform our team upon arrival.</li>
                </ul>
              </div>

              <!-- Clinic Location Card -->
              <table role="presentation" width="100%" style="background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 18px 20px; margin-bottom: 24px;">
                <tr>
                  <td>
                    <h4 style="margin: 0 0 8px 0; color: #0f2b48; font-size: 14px; font-weight: 700;">Clinic Address & Directions</h4>
                    <p style="margin: 0 0 8px 0; font-size: 13px; color: #475569; line-height: 1.5;">
                      <strong>${CLINIC_INFO.clinicName}</strong><br>
                      ${CLINIC_INFO.address.street}, ${CLINIC_INFO.address.area}, ${CLINIC_INFO.address.city}, ${CLINIC_INFO.address.state} - ${CLINIC_INFO.address.postalCode}
                    </p>
                    <p style="margin: 0; font-size: 13px; color: #0f2b48;">
                      📞 Front Desk: <a href="tel:${CLINIC_INFO.phoneDisplay}" style="color: #0d9488; text-decoration: none; font-weight: 700;">${CLINIC_INFO.phoneDisplay}</a> &nbsp;|&nbsp; 
                      💬 WhatsApp: <a href="https://wa.me/${CLINIC_INFO.whatsappDisplay.replace(/[^0-9]/g, '')}" style="color: #0d9488; text-decoration: none; font-weight: 700;">${CLINIC_INFO.whatsappDisplay}</a>
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Reschedule Footer Note -->
              <p style="margin: 0; font-size: 13px; color: #64748b; line-height: 1.5; text-align: center;">
                Need to reschedule? Please inform us at least 2 hours in advance by calling <strong>${CLINIC_INFO.phoneDisplay}</strong> or messaging us on WhatsApp.
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 24px; text-align: center;">
              <p style="margin: 0 0 6px 0; font-size: 12px; color: #64748b;">
                ${CLINIC_INFO.clinicName} • ${CLINIC_INFO.doctorName}, ${CLINIC_INFO.qualification}
              </p>
              <p style="margin: 0; font-size: 11px; color: #94a3b8; line-height: 1.4;">
                This automated message was sent because your appointment request at ${CLINIC_INFO.clinicName} was confirmed.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function generateStaffConfirmedEmailText(appointment: AppointmentPayload): string {
  const { id, fullName, preferredDate, preferredTime, treatmentReason } = appointment;
  return `
APPOINTMENT OFFICIALLY CONFIRMED - ${CLINIC_INFO.clinicName}
--------------------------------------------------
Dear ${fullName},

Great news! Your dental appointment has been reviewed and officially CONFIRMED by our clinic team.

CONFIRMED DETAILS:
- Booking Reference: ${id}
- Treatment / Procedure: ${treatmentReason}
- Confirmed Date: ${preferredDate}
- Confirmed Time Slot: ${preferredTime}
- Attending Doctor: ${CLINIC_INFO.doctorName} (${CLINIC_INFO.specialization})

CLINIC LOCATION:
${CLINIC_INFO.clinicName}
${CLINIC_INFO.address.street}, ${CLINIC_INFO.address.area}, ${CLINIC_INFO.address.city}
Phone: ${CLINIC_INFO.phoneDisplay}
WhatsApp: ${CLINIC_INFO.whatsappDisplay}

INSTRUCTIONS:
1. Please arrive 10 minutes before your appointment time.
2. Bring any previous dental X-rays or diagnostic reports.
3. If you need to reschedule, call us at ${CLINIC_INFO.phoneDisplay}.

We look forward to welcoming you!
${CLINIC_INFO.clinicName} Team
  `.trim();
}

// -------------------------------------------------------------
// 3. SMS Message Generator & Dispatcher
// -------------------------------------------------------------
function generateStaffConfirmedSms(appointment: AppointmentPayload): string {
  return `CONFIRMED: Dear ${appointment.fullName}, your dental appointment at ${CLINIC_INFO.clinicName} for ${appointment.treatmentReason} is CONFIRMED for ${appointment.preferredDate} at ${appointment.preferredTime}. Ref: ${appointment.id}. Doctor: ${CLINIC_INFO.doctorName}. Clinic: ${CLINIC_INFO.phoneDisplay}, ${CLINIC_INFO.address.area}. Please arrive 10m early.`.trim();
}

async function dispatchSms(to: string, message: string): Promise<{ success: boolean; messageId: string; provider: string }> {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const fromNumber = process.env.TWILIO_PHONE_NUMBER;

  if (accountSid && authToken && fromNumber) {
    try {
      const endpoint = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;
      const body = new URLSearchParams({
        To: to,
        From: fromNumber,
        Body: message,
      });

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          Authorization: 'Basic ' + Buffer.from(`${accountSid}:${authToken}`).toString('base64'),
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: body.toString(),
      });

      const data = await response.json();
      if (response.ok) {
        console.log(`[SMS] Real SMS dispatched via Twilio to ${to}: SID ${data.sid}`);
        return { success: true, messageId: data.sid, provider: 'twilio' };
      } else {
        console.warn(`[SMS] Twilio returned error:`, data);
      }
    } catch (err) {
      console.error(`[SMS] Twilio dispatch exception:`, err);
    }
  }

  // Simulated gateway dispatch for development / demo
  const messageId = `sms_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
  console.log(`[SMS Dispatch Simulation] To: ${to} | Ref ID: ${messageId}`);
  console.log(`[SMS Body]: "${message}"`);

  return { success: true, messageId, provider: 'simulated_sms_gateway' };
}

// -------------------------------------------------------------
// 4. WhatsApp Message Generator & Dispatcher
// -------------------------------------------------------------
function generateDoctorWhatsAppNotification(appointment: AppointmentPayload): string {
  return `*NEW DENTAL APPOINTMENT* 🦷

*Booking ID:* ${appointment.id}

👤 *Patient:* ${appointment.fullName}
📞 *Phone:* ${appointment.phoneNumber}
📧 *Email:* ${appointment.email}

📅 *Preferred Date:* ${appointment.preferredDate}
⏰ *Preferred Time:* ${appointment.preferredTime}

🦷 *Treatment / Reason:*
${appointment.treatmentReason}

${appointment.additionalNotes ? `📝 *Notes:*\n${appointment.additionalNotes}\n` : ''}

Please review this appointment in the clinic admin dashboard.

*${CLINIC_INFO.clinicName}*`.trim();
}
function generateStaffConfirmedWhatsApp(appointment: AppointmentPayload): string {
  return `*APPOINTMENT CONFIRMED* ✅
*${CLINIC_INFO.clinicName}*
---------------------------------
Dear *${appointment.fullName}*,

Your dental appointment has been *CONFIRMED* by our clinical team!

📋 *Confirmed Booking:*
• *Reference ID:* ${appointment.id}
• *Treatment:* ${appointment.treatmentReason}
• *Date:* ${appointment.preferredDate}
• *Time Slot:* ${appointment.preferredTime}
• *Attending Doctor:* ${CLINIC_INFO.doctorName} (${CLINIC_INFO.specialization})

📍 *Clinic Location:*
${CLINIC_INFO.clinicName}
${CLINIC_INFO.address.street}, ${CLINIC_INFO.address.area}, ${CLINIC_INFO.address.city}

📌 *Visit Guidelines:*
• Please arrive 10 minutes prior to your chair time.
• Carry previous dental radiographs/prescriptions if available.

📞 *Questions or need to reschedule?*
Call our front desk: ${CLINIC_INFO.phoneDisplay}

We look forward to caring for your smile! ✨`.trim();
}

async function dispatchWhatsApp(to: string, message: string): Promise<{ success: boolean; messageId: string; provider: string; directUrl: string }> {
  const cleanPhone = to.replace(/[^0-9]/g, '');
  const directUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;

  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const fromWaNumber = process.env.TWILIO_WHATSAPP_NUMBER || (process.env.TWILIO_PHONE_NUMBER ? `whatsapp:${process.env.TWILIO_PHONE_NUMBER}` : undefined);

  if (accountSid && authToken && fromWaNumber) {
    try {
      const endpoint = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;
      const body = new URLSearchParams({
        To: `whatsapp:${to.startsWith('+') ? to : `+${to}`}`,
        From: fromWaNumber.startsWith('whatsapp:') ? fromWaNumber : `whatsapp:${fromWaNumber}`,
        Body: message,
      });

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          Authorization: 'Basic ' + Buffer.from(`${accountSid}:${authToken}`).toString('base64'),
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: body.toString(),
      });

      const data = await response.json();
      if (response.ok) {
        console.log(`[WhatsApp] Real WhatsApp dispatched via Twilio to ${to}: SID ${data.sid}`);
        return { success: true, messageId: data.sid, provider: 'twilio_whatsapp', directUrl };
      } else {
        console.warn(`[WhatsApp] Twilio WhatsApp error:`, data);
      }
    } catch (err) {
      console.error(`[WhatsApp] Twilio dispatch exception:`, err);
    }
  }

  // Simulated gateway dispatch for development / demo
  const messageId = `wa_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
  console.log(`[WhatsApp Dispatch Simulation] To: ${to} | ID: ${messageId}`);
  console.log(`[WhatsApp Direct URL]: ${directUrl}`);

  return { success: true, messageId, provider: 'simulated_whatsapp_gateway', directUrl };
}

// -------------------------------------------------------------
// 5. Nodemailer Transporter Helper
// -------------------------------------------------------------
function getEmailTransporter() {
  const smtpHost = process.env.SMTP_HOST;

  const smtpPort = parseInt(process.env.SMTP_PORT || '587', 10);

  const smtpUser = process.env.SMTP_USER;

  const smtpPass = process.env.SMTP_PASS;

  if (smtpHost && smtpUser && smtpPass) {
    return {
      transporter: nodemailer.createTransport({
        host: smtpHost,
        port: 587,
        secure: false,
        family: 4,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      }),
      isRealSmtp: true,
    };
  }

  return {
    transporter: nodemailer.createTransport({
      jsonTransport: true,
    }),
    isRealSmtp: false,
  };
}

// -------------------------------------------------------------
// 6. Routes
// -------------------------------------------------------------

// Health check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', service: 'dental-clinic-api' });
});

// Route: Patient Initial Booking Request Confirmation Email
app.post('/api/send-confirmation-email', async (req: Request, res: Response) => {
  try {
    const { id, fullName, phoneNumber, email, preferredDate, preferredTime, treatmentReason, additionalNotes } = req.body;

    if (!email || !email.includes('@')) {
      return res.status(400).json({ 
        success: false, 
        error: 'A valid patient email address is required.' 
      });
    }

    const payload: AppointmentPayload = {
      id: id || `APT-${Date.now()}`,
      fullName: fullName || 'Patient',
      phoneNumber: phoneNumber || CLINIC_INFO.phoneDisplay,
      email,
      preferredDate: preferredDate || 'Upcoming',
      preferredTime: preferredTime || 'Morning Slot',
      treatmentReason: treatmentReason || 'General Dental Consultation',
      additionalNotes,
    };

    const htmlContent = generateConfirmationEmailHtml(payload);
    const textContent = generateConfirmationEmailText(payload);
    const subject = `Appointment Confirmation Request - ${CLINIC_INFO.clinicName} (Ref: ${payload.id})`;
    const smtpFrom = process.env.SMTP_FROM || `"${CLINIC_INFO.clinicName}" <no-reply@dentalclinic.com>`;

    const { transporter, isRealSmtp } = getEmailTransporter();

    const info = await transporter.sendMail({
      from: smtpFrom,
      to: email,
      subject,
      text: textContent,
      html: htmlContent,
    });

    console.log(`[EmailService] Request received email sent to ${email} (Ref: ${payload.id}, realSmtp: ${isRealSmtp})`);

    return res.json({
      success: true,
      message: `Confirmation email dispatched to ${email}`,
      emailDetails: {
        recipient: email,
        subject,
        messageId: info.messageId || `msg_${Date.now()}`,
        sentAt: new Date().toISOString(),
        isRealSmtp,
        htmlPreview: htmlContent,
      },
    });
  } catch (error: any) {
    console.error('[EmailService] Error in /api/send-confirmation-email:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to process email',
      details: error.message,
    });
  }
});

// Route: Staff Confirms Appointment -> Dispatches Email, SMS, AND WhatsApp
app.post('/api/confirm-appointment-notifications', async (req: Request, res: Response) => {
  try {
    const { id, fullName, phoneNumber, email, preferredDate, preferredTime, treatmentReason, additionalNotes } = req.body;

    if (!id || !fullName || !phoneNumber) {
      return res.status(400).json({
        success: false,
        error: 'Missing required appointment confirmation parameters (id, fullName, phoneNumber).',
      });
    }

    const payload: AppointmentPayload = {
      id,
      fullName,
      phoneNumber,
      email: email || 'patient@example.com',
      preferredDate: preferredDate || 'Confirmed Date',
      preferredTime: preferredTime || 'Confirmed Time',
      treatmentReason: treatmentReason || 'Dental Consultation',
      additionalNotes,
    };

    const now = new Date().toISOString();

    // 1. Email Dispatch
    let emailResult: {
      status: 'sent' | 'failed';
      recipient: string;
      subject: string;
      messageId: string;
      sentAt: string;
      previewHtml: string;
    } = {
      status: 'sent',
      recipient: payload.email,
      subject: `✅ Appointment Confirmed: ${CLINIC_INFO.clinicName} (Ref: ${payload.id})`,
      messageId: `email_${Date.now()}`,
      sentAt: now,
      previewHtml: '',
    };

    if (payload.email && payload.email.includes('@')) {
      try {
        const { transporter, isRealSmtp } = getEmailTransporter();
        const html = generateStaffConfirmedEmailHtml(payload);
        const text = generateStaffConfirmedEmailText(payload);
        const smtpFrom = process.env.SMTP_FROM || `"${CLINIC_INFO.clinicName}" <no-reply@dentalclinic.com>`;

        const mailInfo = await transporter.sendMail({
          from: smtpFrom,
          to: payload.email,
          subject: emailResult.subject,
          text,
          html,
        });

        emailResult.messageId = mailInfo.messageId || emailResult.messageId;
        emailResult.previewHtml = html;
        console.log(`[MultiChannel] Confirmed Email sent to ${payload.email} (realSmtp: ${isRealSmtp})`);
      } catch (err: any) {
        console.error(`[MultiChannel] Error sending confirmed email:`, err);
        emailResult.status = 'failed';
      }
    } else {
      emailResult.status = 'failed';
    }

    // 2. SMS Dispatch
    const smsMessage = generateStaffConfirmedSms(payload);
    const smsRes = await dispatchSms(payload.phoneNumber, smsMessage);
    const smsResult: {
      status: 'sent' | 'failed';
      recipient: string;
      text: string;
      messageId: string;
      sentAt: string;
    } = {
      status: smsRes.success ? 'sent' : 'failed',
      recipient: payload.phoneNumber,
      text: smsMessage,
      messageId: smsRes.messageId,
      sentAt: now,
    };

    // 3. WhatsApp Dispatch
    const waMessage = generateStaffConfirmedWhatsApp(payload);
    const waRes = await dispatchWhatsApp(payload.phoneNumber, waMessage);
    const waResult: {
      status: 'sent' | 'failed';
      recipient: string;
      text: string;
      messageId: string;
      sentAt: string;
      whatsappUrl: string;
    } = {
      status: waRes.success ? 'sent' : 'failed',
      recipient: payload.phoneNumber,
      text: waMessage,
      messageId: waRes.messageId,
      sentAt: now,
      whatsappUrl: waRes.directUrl,
    };

    return res.json({
      success: true,
      appointmentId: payload.id,
      notifications: {
        email: emailResult,
        sms: smsResult,
        whatsapp: waResult,
      },
    });
  } catch (error: any) {
    console.error('[MultiChannel] Error in /api/confirm-appointment-notifications:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to process confirmation notifications',
      details: error.message,
    });
  }
});
app.post('/api/new-appointment-notification', async (req: Request, res: Response) => {
  try {
    const {
      id,
      fullName,
      phoneNumber,
      email,
      preferredDate,
      preferredTime,
      treatmentReason,
      additionalNotes
    } = req.body;

    if (!id || !fullName || !phoneNumber) {
      return res.status(400).json({
        success: false,
        error: 'Missing appointment information.'
      });
    }

    const appointment: AppointmentPayload = {
      id,
      fullName,
      phoneNumber,
      email: email || '',
      preferredDate: preferredDate || '',
      preferredTime: preferredTime || '',
      treatmentReason: treatmentReason || '',
      additionalNotes
    };

    const doctorWhatsApp = process.env.DOCTOR_WHATSAPP_NUMBER;

    if (!doctorWhatsApp) {
      return res.status(500).json({
        success: false,
        error: 'DOCTOR_WHATSAPP_NUMBER is not configured.'
      });
    }

    const message = generateDoctorWhatsAppNotification(appointment);

    const result = await dispatchWhatsApp(
      doctorWhatsApp,
      message
    );

    return res.json({
      success: result.success,
      appointmentId: id,
      whatsapp: {
        status: result.success ? 'sent' : 'failed',
        recipient: doctorWhatsApp,
        messageId: result.messageId,
        provider: result.provider
      }
    });

  } catch (error: any) {
    console.error('[Doctor WhatsApp] Error:', error);

    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
});
// Vite middleware & Production static serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Dental Clinic Server running on port ${PORT}`);
  });
}

startServer();
