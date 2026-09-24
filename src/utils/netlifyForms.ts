/**
 * Netlify Forms Submission Utility for React SPA
 * Submits form data to Netlify Forms using standard URL-encoded POST
 */

export interface NetlifyEnquiryData {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  budget?: string;
  timeline?: string;
  message?: string;
  overview?: string;
  source: string;
  botField?: string;
}

function encodeFormData(data: Record<string, string>): string {
  return Object.keys(data)
    .filter((key) => data[key] !== undefined && data[key] !== null)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');
}

export async function submitToNetlify(
  formName: string,
  data: NetlifyEnquiryData
): Promise<{ success: boolean; message: string }> {
  // Honeypot check for bots
  if (data.botField && data.botField.trim().length > 0) {
    return {
      success: true,
      message: 'Thank you! Your enquiry has been submitted successfully. I’ll get back to you soon.',
    };
  }

  const payload: Record<string, string> = {
    'form-name': formName,
    name: data.name.trim(),
    email: data.email.trim(),
    source: data.source,
  };

  if (data.phone) payload.phone = data.phone.trim();
  if (data.service) payload.service = data.service.trim();
  if (data.budget) payload.budget = data.budget.trim();
  if (data.timeline) payload.timeline = data.timeline.trim();
  if (data.message) payload.message = data.message.trim();
  if (data.overview) payload.overview = data.overview.trim();

  // If testing in non-Netlify preview or localhost environments,
  // simulate successful submission so UI testing works smoothly.
  const isLocalOrPreview = 
    typeof window !== 'undefined' && 
    (window.location.hostname === 'localhost' || 
     window.location.hostname.includes('127.0.0.1') || 
     window.location.hostname.includes('run.app'));

  if (isLocalOrPreview) {
    console.info(`[Dev Environment Simulation] Netlify form "${formName}" payload:`, payload);
    return {
      success: true,
      message: 'Thank you! Your enquiry has been submitted successfully. I’ll get back to you soon.',
    };
  }

  try {
    const body = new URLSearchParams(payload).toString();
    const response = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    });

    if (response.ok) {
      return {
        success: true,
        message: 'Thank you! Your enquiry has been submitted successfully. I’ll get back to you soon.',
      };
    }

    throw new Error(`Netlify form returned HTTP ${response.status}`);
  } catch (error) {
    console.error('[Netlify Forms] Submission error:', error);
    return {
      success: false,
      message: 'Unable to submit your enquiry right now. Please try again or contact me on WhatsApp.',
    };
  }
}
