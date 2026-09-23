import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, ShieldCheck, CheckCircle2, Linkedin, ExternalLink, Loader2, AlertCircle } from 'lucide-react';
import { submitToNetlify } from '../utils/netlifyForms';

interface ProjectEnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg 
    viewBox="0 0 24 24" 
    width="24" 
    height="24" 
    fill="currentColor" 
    className={className}
    aria-hidden="true"
  >
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.04 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.53 7.34C9.36 7.34 9.09 7.4 8.87 7.64C8.64 7.89 8 8.49 8 9.71C8 10.93 8.89 12.1 9.01 12.27C9.14 12.44 10.74 14.91 13.2 15.97C13.79 16.22 14.24 16.37 14.6 16.49C15.19 16.67 15.73 16.65 16.15 16.58C16.62 16.51 17.6 15.99 17.81 15.4C18.01 14.81 18.01 14.31 17.95 14.2C17.89 14.1 17.72 14.04 17.47 13.91C17.21 13.79 15.97 13.18 15.74 13.09C15.51 13.01 15.35 12.97 15.18 13.22C15.01 13.47 14.54 14.04 14.4 14.2C14.25 14.37 14.11 14.39 13.86 14.27C13.61 14.14 12.8 13.88 11.84 13.02C11.09 12.35 10.59 11.53 10.44 11.28C10.3 11.03 10.43 10.9 10.55 10.77C10.66 10.66 10.8 10.48 10.93 10.33C11.05 10.18 11.1 10.08 11.18 9.91C11.26 9.74 11.22 9.6 11.16 9.47C11.1 9.35 10.61 8.15 10.4 7.66C10.2 7.18 10 7.24 9.85 7.24C9.7 7.23 9.53 7.34 9.53 7.34Z" />
  </svg>
);

export const WHATSAPP_URL = `https://wa.me/919537107504?text=${encodeURIComponent(
  'Hi Anand, I found your portfolio and would like to discuss a project with you.'
)}`;

export const LINKEDIN_URL = 'https://www.linkedin.com/in/anand-makhanasa-144b1229a';

export const ProjectEnquiryModal: React.FC<ProjectEnquiryModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Flutter App Development',
    budget: '₹25,000 – ₹50,000',
    timeline: '1–2 Weeks',
    overview: '',
  });

  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<{ name?: string; email?: string; overview?: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const errs: { name?: string; email?: string; overview?: string } = {};
    if (!formData.name.trim()) {
      errs.name = 'Please enter your name';
    }
    if (!formData.email.trim()) {
      errs.email = 'Please enter your work email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address';
    }
    if (!formData.overview.trim()) {
      errs.overview = 'Please provide a brief overview of your project requirements';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || isLoading) return;

    setIsLoading(true);
    setServerError(null);

    const result = await submitToNetlify('project-enquiry', {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      service: formData.service,
      budget: formData.budget,
      timeline: formData.timeline,
      overview: formData.overview,
      source: 'Instant Project Enquiry Popup',
      botField: honeypot,
    });

    setIsLoading(false);

    if (result.success) {
      setIsSubmitted(true);
    } else {
      setServerError(result.message);
    }
  };

  const handleResetForm = () => {
    setIsSubmitted(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: 'Flutter App Development',
      budget: '₹25,000 – ₹50,000',
      timeline: '1–2 Weeks',
      overview: '',
    });
    setErrors({});
    setServerError(null);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/65 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-xl bg-white dark:bg-[#0c1833] rounded-[26px] sm:rounded-[30px] border border-slate-200/90 dark:border-slate-800 shadow-[0_25px_70px_-15px_rgba(0,0,0,0.35)] dark:shadow-[0_25px_70px_-15px_rgba(0,0,0,0.8)] overflow-hidden z-10 my-auto"
          >
            {/* Top Accent Line matching Reference */}
            <div className="h-1.5 w-full bg-[#f95721]" />

            {/* Modal Body */}
            <div className="p-5 sm:p-7 max-h-[85vh] overflow-y-auto">
              {/* Header */}
              <div className="flex items-start justify-between gap-4 mb-5">
                <div>
                  {/* Top Badge matching Reference Image 1 */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fff4ec] dark:bg-[#2a160e] border border-[#ffd8c2] dark:border-[#5c2d18] mb-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#f95721] animate-pulse" />
                    <span className="text-[10px] sm:text-[10.5px] font-bold text-[#ea580c] dark:text-[#ff7844] tracking-wider uppercase">
                      INSTANT PROJECT ENQUIRY • 15s REMINDER
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                    Let’s Discuss Your Project
                  </h2>
                  <p className="text-xs sm:text-[13px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    Have a project idea, app requirement, or business solution in mind? Let’s discuss how I can help.
                  </p>
                </div>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={onClose}
                  className="p-1.5 -mr-1 -mt-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/80 rounded-full transition-colors cursor-pointer shrink-0"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form Content or Success Screen */}
              {isSubmitted ? (
                <div className="py-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                    Thank you! Your enquiry has been submitted successfully. I’ll get back to you soon.
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto mb-6 leading-relaxed">
                    Thank you, <span className="font-semibold text-slate-900 dark:text-white">{formData.name}</span>. Your enquiry has been received and routed to Anand’s inbox (<span className="font-semibold text-slate-900 dark:text-white">anandmakhanasa1631@gmail.com</span>). For immediate coordination, chat directly on WhatsApp:
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#00a859] hover:bg-[#00924d] text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-500/20 transition-all cursor-pointer"
                    >
                      <WhatsAppIcon className="w-4 h-4" />
                      <span>Chat on WhatsApp Now</span>
                    </a>
                    <button
                      type="button"
                      onClick={handleResetForm}
                      className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
                    >
                      Done
                    </button>
                  </div>
                </div>
              ) : (
                <form
                  name="project-enquiry"
                  method="POST"
                  data-netlify="true"
                  data-netlify-honeypot="bot-field"
                  onSubmit={handleSubmit}
                  className="space-y-3.5"
                >
                  {/* Netlify Form identifier & source */}
                  <input type="hidden" name="form-name" value="project-enquiry" />
                  <input type="hidden" name="source" value="Instant Project Enquiry Popup" />

                  {/* Honeypot field for bot spam protection */}
                  <input
                    type="text"
                    name="bot-field"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                  />

                  {/* Server error banner */}
                  {serverError && (
                    <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 text-xs flex items-start gap-2.5">
                      <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="font-medium">{serverError}</p>
                        <a 
                          href={WHATSAPP_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 font-bold text-emerald-600 dark:text-emerald-400 hover:underline mt-1"
                        >
                          <WhatsAppIcon className="w-3.5 h-3.5" />
                          <span>Chat on WhatsApp (+91 9537107504)</span>
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Row 1: Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                    <div>
                      <label className="block text-[10.5px] font-bold text-slate-500 dark:text-slate-400 tracking-wider uppercase mb-1.5">
                        YOUR NAME *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          if (errors.name) setErrors({ ...errors, name: undefined });
                        }}
                        placeholder="Enter your name"
                        className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-50/80 dark:bg-slate-900/60 border ${
                          errors.name
                            ? 'border-red-500 ring-1 ring-red-500/20'
                            : 'border-slate-200 dark:border-slate-800 focus:border-[#f95721] focus:ring-2 focus:ring-orange-500/15'
                        } text-slate-900 dark:text-white text-xs sm:text-sm placeholder:text-slate-400 outline-none transition-all`}
                      />
                      {errors.name && <p className="text-[11px] text-red-500 mt-1 font-medium">{errors.name}</p>}
                    </div>

                    <div>
                      <label className="block text-[10.5px] font-bold text-slate-500 dark:text-slate-400 tracking-wider uppercase mb-1.5">
                        WORK EMAIL *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (errors.email) setErrors({ ...errors, email: undefined });
                        }}
                        placeholder="your@email.com"
                        className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-50/80 dark:bg-slate-900/60 border ${
                          errors.email
                            ? 'border-red-500 ring-1 ring-red-500/20'
                            : 'border-slate-200 dark:border-slate-800 focus:border-[#f95721] focus:ring-2 focus:ring-orange-500/15'
                        } text-slate-900 dark:text-white text-xs sm:text-sm placeholder:text-slate-400 outline-none transition-all`}
                      />
                      {errors.email && <p className="text-[11px] text-red-500 mt-1 font-medium">{errors.email}</p>}
                    </div>
                  </div>

                  {/* Row 2: WhatsApp / Phone & Service Of Interest */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                    <div>
                      <label className="block text-[10.5px] font-bold text-slate-500 dark:text-slate-400 tracking-wider uppercase mb-1.5">
                        WHATSAPP / PHONE
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 ..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 focus:border-[#f95721] focus:ring-2 focus:ring-orange-500/15 text-slate-900 dark:text-white text-xs sm:text-sm placeholder:text-slate-400 outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[10.5px] font-bold text-slate-500 dark:text-slate-400 tracking-wider uppercase mb-1.5">
                        SERVICE OF INTEREST
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 focus:border-[#f95721] focus:ring-2 focus:ring-orange-500/15 text-slate-900 dark:text-white text-xs sm:text-sm outline-none transition-all cursor-pointer"
                      >
                        <option value="Flutter App Development">Flutter App Development</option>
                        <option value="Mobile App Development">Mobile App Development</option>
                        <option value="UI Implementation">UI Implementation</option>
                        <option value="API Integration">API Integration</option>
                        <option value="Firebase Integration">Firebase Integration</option>
                        <option value="Bug Fixing / Maintenance">Bug Fixing / Maintenance</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 3: Estimated Budget & Target Timeline */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                    <div>
                      <label className="block text-[10.5px] font-bold text-slate-500 dark:text-slate-400 tracking-wider uppercase mb-1.5">
                        ESTIMATED BUDGET
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 focus:border-[#f95721] focus:ring-2 focus:ring-orange-500/15 text-slate-900 dark:text-white text-xs sm:text-sm outline-none transition-all cursor-pointer"
                      >
                        <option value="Under ₹25,000">Under ₹25,000</option>
                        <option value="₹25,000 – ₹50,000">₹25,000 – ₹50,000</option>
                        <option value="₹50,000 – ₹1,00,000">₹50,000 – ₹1,00,000</option>
                        <option value="₹1,00,000+">₹1,00,000+</option>
                        <option value="Let's Discuss">Let's Discuss</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10.5px] font-bold text-slate-500 dark:text-slate-400 tracking-wider uppercase mb-1.5">
                        TARGET TIMELINE
                      </label>
                      <select
                        value={formData.timeline}
                        onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 focus:border-[#f95721] focus:ring-2 focus:ring-orange-500/15 text-slate-900 dark:text-white text-xs sm:text-sm outline-none transition-all cursor-pointer"
                      >
                        <option value="Immediately">Immediately</option>
                        <option value="1–2 Weeks">1–2 Weeks</option>
                        <option value="2–4 Weeks">2–4 Weeks</option>
                        <option value="1–2 Months">1–2 Months</option>
                        <option value="Flexible">Flexible</option>
                      </select>
                    </div>
                  </div>

                  {/* Full-width Field: Brief Project Overview */}
                  <div>
                    <label className="block text-[10.5px] font-bold text-slate-500 dark:text-slate-400 tracking-wider uppercase mb-1.5">
                      BRIEF PROJECT OVERVIEW *
                    </label>
                    <textarea
                      rows={3}
                      value={formData.overview}
                      onChange={(e) => {
                        setFormData({ ...formData, overview: e.target.value });
                        if (errors.overview) setErrors({ ...errors, overview: undefined });
                      }}
                      placeholder="Tell me about your project, required features, or technical requirements..."
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-50/80 dark:bg-slate-900/60 border ${
                        errors.overview
                          ? 'border-red-500 ring-1 ring-red-500/20'
                          : 'border-slate-200 dark:border-slate-800 focus:border-[#f95721] focus:ring-2 focus:ring-orange-500/15'
                      } text-slate-900 dark:text-white text-xs sm:text-sm placeholder:text-slate-400 outline-none transition-all resize-none`}
                    />
                    {errors.overview && <p className="text-[11px] text-red-500 mt-1 font-medium">{errors.overview}</p>}
                  </div>

                  {/* Action Buttons Row */}
                  <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      {/* Primary Button */}
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#f95721] hover:bg-[#e64a19] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed text-white font-bold text-xs sm:text-sm shadow-md shadow-orange-500/25 transition-all cursor-pointer"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Sending Enquiry...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            <span>Submit Enquiry</span>
                          </>
                        )}
                      </button>

                      {/* WhatsApp Button */}
                      <a
                        href={WHATSAPP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#00a859] hover:bg-[#00924d] active:scale-[0.98] text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-500/20 transition-all cursor-pointer"
                      >
                        <WhatsAppIcon className="w-4 h-4" />
                        <span>WhatsApp</span>
                      </a>
                    </div>

                    {/* Dismiss Button matching Reference Image 1 */}
                    <button
                      type="button"
                      onClick={onClose}
                      disabled={isLoading}
                      className="text-[11.5px] text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 font-medium transition-colors cursor-pointer text-center sm:text-right py-1 disabled:opacity-50"
                    >
                      Dismiss (re-opens in 15s)
                    </button>
                  </div>

                  {/* LinkedIn Connect Option */}
                  <div className="pt-1.5 flex items-center justify-between text-xs border-t border-slate-100 dark:border-slate-800/60">
                    <span className="text-[11px] text-slate-400">Prefer professional network?</span>
                    <a
                      href={LINKEDIN_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0a66c2] dark:text-[#70b5f9] hover:underline"
                    >
                      <Linkedin className="w-3.5 h-3.5" />
                      <span>Connect on LinkedIn</span>
                      <ExternalLink className="w-3 h-3 opacity-60" />
                    </a>
                  </div>
                </form>
              )}
            </div>

            {/* Modal Footer matching Reference Image 1 */}
            <div className="border-t border-slate-100 dark:border-slate-800/80 px-5 sm:px-7 py-2.5 bg-slate-50/60 dark:bg-slate-900/40 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span className="font-medium">100% Confidential • NDA Available</span>
              </div>
              <span className="text-[10.5px] text-slate-400 dark:text-slate-500 font-mono">
                Reminder repeats every 15s
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
