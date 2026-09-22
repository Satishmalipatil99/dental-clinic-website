/**
 * Analytics Abstraction Layer
 * Logs user conversion interactions (Call, WhatsApp, Appointment, Directions, Views)
 * Ready for Google Analytics 4, Tag Manager, or custom telemetry endpoints.
 */

type AnalyticsEvent =
  | 'page_view'
  | 'appointment_form_submitted'
  | 'phone_click'
  | 'whatsapp_click'
  | 'get_directions_click'
  | 'treatment_page_view'
  | 'blog_view'
  | 'cta_click';

export function trackEvent(event: AnalyticsEvent, properties?: Record<string, any>) {
  if (typeof window === 'undefined') return;

  const payload = {
    event,
    timestamp: new Date().toISOString(),
    path: window.location.pathname,
    ...properties,
  };

  // Log in development console
  if (import.meta.env.DEV) {
    console.info(`[Analytics Event: ${event}]`, payload);
  }

  // Google Analytics 4 integration if configured
  if (typeof (window as any).gtag === 'function') {
    (window as any).gtag('event', event, payload);
  }

  // Custom dataLayer push if Google Tag Manager is present
  if (Array.isArray((window as any).dataLayer)) {
    (window as any).dataLayer.push(payload);
  }
}
