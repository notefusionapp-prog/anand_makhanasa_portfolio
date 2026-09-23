import { submitToNetlify, type NetlifyEnquiryData } from './netlifyForms';

export interface ContactSubmissionPayload extends NetlifyEnquiryData {
  _hp_company?: string;
}

export interface ContactSubmissionResponse {
  success: boolean;
  message: string;
}

export async function submitContactEnquiry(
  payload: ContactSubmissionPayload
): Promise<ContactSubmissionResponse> {
  return submitToNetlify('contact', {
    ...payload,
    botField: payload.botField || payload._hp_company,
  });
}
