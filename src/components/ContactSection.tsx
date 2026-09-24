import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Copy, 
  Check, 
  MessageSquare, 
  FileText,
  Linkedin,
  ExternalLink,
  Loader2,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { submitToNetlify } from '../utils/netlifyForms';
import { WHATSAPP_URL } from './ProjectEnquiryModal';

interface ContactSectionProps {
  onOpenResume: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenResume }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedLinkedin, setCopiedLinkedin] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Mobile App (Flutter)',
    message: ''
  });
  const [honeypot, setHoneypot] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleCopyLinkedin = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.linkedin);
    setCopiedLinkedin(true);
    setTimeout(() => setCopiedLinkedin(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);
    setServerError(null);

    const result = await submitToNetlify('contact', {
      name: formData.name,
      email: formData.email,
      service: formData.projectType,
      message: formData.message,
      source: 'Contact Form',
      botField: honeypot,
    });

    setIsLoading(false);

    if (result.success) {
      setFormSubmitted(true);
      setFormData({
        name: '',
        email: '',
        projectType: 'Mobile App (Flutter)',
        message: ''
      });
    } else {
      setServerError(result.message);
    }
  };

  return (
    <section id="contact" className="py-24 bg-[#fbfdff] dark:bg-[#070d1e] border-t border-blue-100/60 dark:border-blue-950/60 relative transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header (Modern Style) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-70px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-bold text-[#0d6efd] dark:text-blue-400 tracking-widest uppercase">
              GET IN TOUCH
            </span>
            <div className="w-12 h-[2px] bg-[#0d6efd]/30" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1B3D] dark:text-white tracking-tight">
            Have a project in mind? Let's build something together.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#475569] dark:text-slate-400 leading-relaxed">
            Whether you are looking to hire a full-time Flutter developer, build a production mobile MVP, or optimize an existing application, I am available to talk.
          </p>
        </motion.div>

        {/* Contact Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start max-w-5xl mx-auto">
          
          {/* Left Column: Direct Contact Info & Quick Actions */}
          <motion.div 
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-6"
          >
            
            <div className="p-6 sm:p-7 rounded-[28px] bg-white dark:bg-[#0B1B3D]/90 border border-blue-100/90 dark:border-blue-900/70 space-y-6 shadow-[0_10px_35px_rgba(11,27,61,0.05)]">
              <h3 className="text-lg font-extrabold text-[#0B1B3D] dark:text-white flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0d6efd]" />
                <span>Direct Contact Information</span>
              </h3>

              {/* Email Card */}
              <div className="p-4 rounded-2xl bg-[#f8fbff] dark:bg-[#070d1e] border border-blue-100/80 dark:border-blue-900/60 flex items-center justify-between gap-3 shadow-2xs">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-950/70 border border-blue-100 dark:border-blue-900/60 flex items-center justify-center text-[#0d6efd] dark:text-blue-400 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="overflow-hidden">
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium">Email Address</span>
                    <a 
                      href={`mailto:${PERSONAL_INFO.email}`} 
                      className="font-bold text-[#0B1B3D] dark:text-white text-xs sm:text-sm hover:text-[#0d6efd] dark:hover:text-blue-400 transition-colors truncate block"
                    >
                      {PERSONAL_INFO.email}
                    </a>
                  </div>
                </div>

                <motion.button
                  onClick={handleCopyEmail}
                  whileTap={{ scale: 0.9 }}
                  className="p-2.5 rounded-full bg-white dark:bg-[#0f1f42] hover:bg-blue-50 dark:hover:bg-blue-900/40 border border-blue-100 dark:border-blue-800 text-slate-600 dark:text-slate-300 transition-colors shrink-0 cursor-pointer shadow-2xs"
                  title="Copy email"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-4 h-4 text-[#0d6efd]" />}
                </motion.button>
              </div>

              {/* Phone Card */}
              <div className="p-4 rounded-2xl bg-[#f8fbff] dark:bg-[#070d1e] border border-blue-100/80 dark:border-blue-900/60 flex items-center justify-between gap-3 shadow-2xs">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-950/70 border border-blue-100 dark:border-blue-900/60 flex items-center justify-center text-[#0d6efd] dark:text-blue-400 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="overflow-hidden">
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium">Phone & WhatsApp</span>
                    <a 
                      href={`tel:${PERSONAL_INFO.phone}`} 
                      className="font-bold text-[#0B1B3D] dark:text-white text-xs sm:text-sm hover:text-[#0d6efd] dark:hover:text-blue-400 transition-colors truncate block"
                    >
                      {PERSONAL_INFO.phone}
                    </a>
                  </div>
                </div>

                <motion.button
                  onClick={handleCopyPhone}
                  whileTap={{ scale: 0.9 }}
                  className="p-2.5 rounded-full bg-white dark:bg-[#0f1f42] hover:bg-blue-50 dark:hover:bg-blue-900/40 border border-blue-100 dark:border-blue-800 text-slate-600 dark:text-slate-300 transition-colors shrink-0 cursor-pointer shadow-2xs"
                  title="Copy phone"
                >
                  {copiedPhone ? <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-4 h-4 text-[#0d6efd]" />}
                </motion.button>
              </div>

              {/* LinkedIn Card */}
              <div className="p-4 rounded-2xl bg-[#f8fbff] dark:bg-[#070d1e] border border-blue-100/80 dark:border-blue-900/60 flex items-center justify-between gap-3 shadow-2xs">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-950/70 border border-blue-100 dark:border-blue-900/60 flex items-center justify-center text-[#0a66c2] dark:text-[#70b5f9] shrink-0">
                    <Linkedin className="w-5 h-5 fill-current" />
                  </div>
                  <div className="overflow-hidden">
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium">LinkedIn Profile</span>
                    <a 
                      href={PERSONAL_INFO.linkedin} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-[#0B1B3D] dark:text-white text-xs sm:text-sm hover:text-[#0a66c2] dark:hover:text-[#70b5f9] transition-colors truncate block flex items-center gap-1.5"
                    >
                      <span className="truncate">anand-makhanasa</span>
                      <ExternalLink className="w-3.5 h-3.5 opacity-60 shrink-0" />
                    </a>
                  </div>
                </div>

                <motion.button
                  onClick={handleCopyLinkedin}
                  whileTap={{ scale: 0.9 }}
                  className="p-2.5 rounded-full bg-white dark:bg-[#0f1f42] hover:bg-blue-50 dark:hover:bg-blue-900/40 border border-blue-100 dark:border-blue-800 text-slate-600 dark:text-slate-300 transition-colors shrink-0 cursor-pointer shadow-2xs"
                  title="Copy LinkedIn profile URL"
                >
                  {copiedLinkedin ? <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-4 h-4 text-[#0a66c2]" />}
                </motion.button>
              </div>

              {/* Location Card */}
              <div className="p-4 rounded-2xl bg-[#f8fbff] dark:bg-[#070d1e] border border-blue-100/80 dark:border-blue-900/60 flex items-start gap-3 shadow-2xs">
                <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-950/70 border border-blue-100 dark:border-blue-900/60 flex items-center justify-center text-[#0d6efd] dark:text-blue-400 shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium">Location & Address</span>
                  <span className="font-bold text-[#0B1B3D] dark:text-white text-xs sm:text-sm block">
                    {PERSONAL_INFO.location}
                  </span>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-snug">
                    {PERSONAL_INFO.address}
                  </p>
                </div>
              </div>

              {/* Resume download prompt */}
              <div className="pt-2 border-t border-blue-100/80 dark:border-blue-900/60">
                <motion.button
                  onClick={onOpenResume}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 px-5 rounded-full bg-white dark:bg-[#0f1f42] hover:bg-blue-50 dark:hover:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-xs sm:text-sm font-bold text-[#0d6efd] dark:text-blue-300 flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
                >
                  <FileText className="w-4 h-4 text-[#0d6efd] dark:text-blue-400" />
                  <span>View & Print Official Resume</span>
                </motion.button>
              </div>

            </div>

          </motion.div>

          {/* Right Column: Contact Message Form */}
          <motion.div 
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <div className="p-6 sm:p-8 rounded-[28px] bg-white dark:bg-[#0B1B3D]/90 border border-blue-100/90 dark:border-blue-900/70 shadow-[0_10px_35px_rgba(11,27,61,0.05)]">
              <h3 className="text-xl font-extrabold text-[#0B1B3D] dark:text-white mb-2">
                Send a Message
              </h3>
              <p className="text-xs text-[#475569] dark:text-slate-400 mb-6">
                Fill in your project details below. Your message will be submitted through Netlify Forms and forwarded directly to Anand’s inbox.
              </p>

              <form
                name="contact"
                method="POST"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                {/* Netlify Form Identifier & Source */}
                <input type="hidden" name="form-name" value="contact" />
                <input type="hidden" name="source" value="Contact Form" />

                {/* Honeypot field for spam prevention */}
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

                {/* Server Error Notification */}
                {serverError && (
                  <div className="p-3.5 rounded-2xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 text-xs flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-semibold">{serverError}</p>
                      <a
                        href={WHATSAPP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-bold text-emerald-600 dark:text-emerald-400 hover:underline mt-1"
                      >
                        <span>Message on WhatsApp (+91 9537107504)</span>
                      </a>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#0B1B3D] dark:text-slate-300 mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah Jenkins"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-full bg-[#f8fbff] dark:bg-[#070d1e] border border-blue-100 dark:border-blue-900 text-xs text-[#0B1B3D] dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:border-[#0d6efd] dark:focus:border-blue-500 transition-colors shadow-2xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0B1B3D] dark:text-slate-300 mb-1.5">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. sarah@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-full bg-[#f8fbff] dark:bg-[#070d1e] border border-blue-100 dark:border-blue-900 text-xs text-[#0B1B3D] dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:border-[#0d6efd] dark:focus:border-blue-500 transition-colors shadow-2xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0B1B3D] dark:text-slate-300 mb-1.5">
                    Project Type or Role
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-full bg-[#f8fbff] dark:bg-[#070d1e] border border-blue-100 dark:border-blue-900 text-xs text-[#0B1B3D] dark:text-slate-200 focus:outline-none focus:border-[#0d6efd] dark:focus:border-blue-500 transition-colors shadow-2xs"
                  >
                    <option value="Full-Time Flutter Developer Role">Full-Time Flutter Developer Role</option>
                    <option value="Mobile App (Flutter) Contract / Freelance">Mobile App (Flutter) Contract / Freelance</option>
                    <option value="Figma to Flutter UI Conversion">Figma to Flutter UI Conversion</option>
                    <option value="Store Deployment & Optimization (Play Store/iOS)">Store Deployment & Optimization</option>
                    <option value="General Technical Consultation">General Technical Consultation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0B1B3D] dark:text-slate-300 mb-1.5">
                    Project Details & Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell me about your mobile application, timeline, or position requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-[#f8fbff] dark:bg-[#070d1e] border border-blue-100 dark:border-blue-900 text-xs text-[#0B1B3D] dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:border-[#0d6efd] dark:focus:border-blue-500 transition-colors custom-scrollbar shadow-2xs"
                  />
                </div>

                <motion.button
                  type="submit"
                  id="contact-submit-btn"
                  disabled={isLoading}
                  whileHover={{ y: isLoading ? 0 : -2 }}
                  whileTap={{ scale: isLoading ? 1 : 0.98 }}
                  className="w-full py-3.5 px-6 rounded-full bg-[#0d6efd] hover:bg-[#0b5ed7] disabled:opacity-75 disabled:cursor-not-allowed text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(13,110,253,0.3)] hover:shadow-[0_6px_20px_rgba(13,110,253,0.4)] transition-all cursor-pointer"
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
                </motion.button>

                <AnimatePresence>
                  {formSubmitted && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs text-center font-medium space-y-1"
                    >
                      <div className="flex items-center justify-center gap-1.5 font-bold text-emerald-700 dark:text-emerald-300">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Thank you! Your enquiry has been submitted successfully. I’ll get back to you soon.</span>
                      </div>
                      <p className="text-[11.5px] text-emerald-600 dark:text-emerald-400">
                        Your message has been submitted via Netlify Forms and routed to <span className="font-semibold">{PERSONAL_INFO.email}</span>.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
