import { useState } from "react";
import {
  Clock,
  MapPin,
  Phone,
  Navigation,
  ExternalLink,
  Sparkles,
  UtensilsCrossed,
  Copy,
  Check,
  Share2,
  Mail,
  Send,
  MessageCircle,
  CheckCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import { site } from "@/config/site";
import { SectionHeading } from "@/components/SectionHeading";
import { Breadcrumbs } from "@/components/Breadcrumbs";

type FormState = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

export function ContactSection() {
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [formState, setFormState] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(site.address);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2200);
  };

  const handleShareLocation = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${site.name} — ${site.tamilName}`,
          text: `Visit Vishnu Bhavan (100% Pure Vegetarian) at ${site.address}`,
          url: site.googleMapsUrl,
        });
      } catch {
        handleCopyAddress();
      }
    } else {
      handleCopyAddress();
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    // Simulate a form submission delay
    await new Promise((r) => setTimeout(r, 1200));
    setFormLoading(false);
    setFormSubmitted(true);
    setFormState({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  return (
    <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24 bg-[#0d0f14] min-h-[calc(100vh-4rem)]">
      {/* Ambient glows */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -top-32 left-[-10%] h-96 w-96 rounded-full bg-amber-600/12 blur-3xl" />
        <div className="absolute bottom-0 right-[-5%] h-80 w-80 rounded-full bg-orange-600/8 blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Contact Us" }]} />
        <SectionHeading
          eyebrow="Contact & Visit"
          title="Get In Touch With Us"
          subtitle="Find us in the heart of Jaffna. We're here to serve you authentic vegetarian cuisine every day."
        />

        {/* ── TOP ROW: Contact Details Cards ── */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {/* Address */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0 }}
            className="relative overflow-hidden rounded-2xl border border-amber-500/20 bg-gradient-to-b from-[#161b27] to-[#0f1219] p-5 shadow-lg hover:border-amber-500/40 transition-all"
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-amber-400/70 to-transparent" />
            <div className="h-10 w-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4">
              <MapPin className="h-5 w-5" />
            </div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-amber-400 mb-1">Address</p>
            <p className="text-sm font-bold text-white leading-snug">No. 350, Jaffna–Kankesanturai Road</p>
            <p className="text-xs text-slate-400 mt-0.5">Jaffna, Northern Province, Sri Lanka</p>
            <button
              type="button"
              onClick={handleCopyAddress}
              className="mt-3 inline-flex items-center gap-1.5 text-[10px] font-semibold text-amber-400/80 hover:text-amber-300 transition-colors"
            >
              {copiedAddress ? (
                <><Check className="h-3 w-3 text-emerald-400" /><span className="text-emerald-400">Copied!</span></>
              ) : (
                <><Copy className="h-3 w-3" /><span>Copy Address</span></>
              )}
            </button>
          </motion.div>

          {/* Phone */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-gradient-to-b from-[#141f1b] to-[#0f1219] p-5 shadow-lg hover:border-emerald-500/40 transition-all"
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-emerald-400/70 to-transparent" />
            <div className="h-10 w-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
              <Phone className="h-5 w-5" />
            </div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 mb-1">Phone</p>
            <p className="text-sm font-bold text-white leading-snug">Inquire In Person</p>
            <p className="text-xs text-slate-400 mt-0.5">Official hotline to be confirmed</p>
            <span className="mt-3 inline-flex items-center gap-1.5 text-[10px] font-semibold text-slate-500">
              <Sparkles className="h-3 w-3" />
              Coming soon
            </span>
          </motion.div>

          {/* Hours */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.16 }}
            className="relative overflow-hidden rounded-2xl border border-sky-500/20 bg-gradient-to-b from-[#131822] to-[#0f1219] p-5 shadow-lg hover:border-sky-500/40 transition-all"
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-sky-400/70 to-transparent" />
            <div className="h-10 w-10 rounded-xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-400 mb-4">
              <Clock className="h-5 w-5" />
            </div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-sky-400 mb-1">Hours</p>
            <p className="text-sm font-bold text-white font-mono">6:00 AM – 10:00 PM</p>
            <p className="text-xs text-slate-400 mt-0.5">7 Days a Week</p>
            <div className="mt-2.5 flex flex-wrap gap-1 text-[9px]">
              <span className="rounded bg-white/[0.05] border border-white/10 px-1.5 py-0.5 text-slate-300">Breakfast 6 AM+</span>
              <span className="rounded bg-amber-500/10 border border-amber-500/20 px-1.5 py-0.5 text-amber-300">Lunch 11 AM–3 PM</span>
            </div>
          </motion.div>

          {/* Dining */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.24 }}
            className="relative overflow-hidden rounded-2xl border border-purple-500/20 bg-gradient-to-b from-[#17131f] to-[#0f1219] p-5 shadow-lg hover:border-purple-500/40 transition-all"
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-purple-400/70 to-transparent" />
            <div className="h-10 w-10 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-4">
              <UtensilsCrossed className="h-5 w-5" />
            </div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-purple-400 mb-1">Service</p>
            <p className="text-sm font-bold text-white leading-snug">Dine-In & Takeaway</p>
            <p className="text-xs text-slate-400 mt-0.5">Walk-ins welcome • No reservation needed</p>
          </motion.div>
        </div>

        {/* ── MAIN GRID: Map + Contact Form ── */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 relative overflow-hidden rounded-2xl sm:rounded-3xl border border-amber-500/20 bg-gradient-to-b from-[#141824] via-[#10131d] to-[#0c0e14] p-5 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl"
          >
            {/* Top gold accent */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent" aria-hidden="true" />

            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <MessageCircle className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base leading-snug">Send Us a Message</h3>
                <p className="text-xs text-slate-400 mt-0.5">We'll get back to you in person</p>
              </div>
            </div>

            {formSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-12 text-center"
              >
                <div className="h-16 w-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mb-4">
                  <CheckCircle className="h-8 w-8 text-emerald-400" />
                </div>
                <h4 className="text-lg font-bold text-white mb-2">Message Sent!</h4>
                <p className="text-sm text-slate-400 max-w-xs">
                  Thank you for reaching out. We'll respond to your inquiry in person at our restaurant.
                </p>
                <button
                  type="button"
                  onClick={() => setFormSubmitted(false)}
                  className="mt-6 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                {/* Name */}
                <div>
                  <label htmlFor="contact-name" className="block text-[10px] font-bold uppercase tracking-widest text-amber-400 mb-1.5">
                    Your Name *
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    value={formState.name}
                    onChange={handleFormChange}
                    placeholder="e.g. Priya Nair"
                    className="w-full rounded-xl border border-white/[0.08] bg-[#0d101a] px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-amber-500/60 focus:ring-0 transition-colors"
                  />
                </div>

                {/* Email & Phone row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="contact-email" className="block text-[10px] font-bold uppercase tracking-widest text-amber-400 mb-1.5">
                      Email
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      value={formState.email}
                      onChange={handleFormChange}
                      placeholder="you@email.com"
                      className="w-full rounded-xl border border-white/[0.08] bg-[#0d101a] px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-amber-500/60 transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-phone" className="block text-[10px] font-bold uppercase tracking-widest text-amber-400 mb-1.5">
                      Phone
                    </label>
                    <input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      value={formState.phone}
                      onChange={handleFormChange}
                      placeholder="+94 77 123 4567"
                      className="w-full rounded-xl border border-white/[0.08] bg-[#0d101a] px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-amber-500/60 transition-colors"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="contact-subject" className="block text-[10px] font-bold uppercase tracking-widest text-amber-400 mb-1.5">
                    Subject *
                  </label>
                  <select
                    id="contact-subject"
                    name="subject"
                    required
                    value={formState.subject}
                    onChange={handleFormChange}
                    className="w-full rounded-xl border border-white/[0.08] bg-[#0d101a] px-4 py-3 text-sm text-white outline-none focus:border-amber-500/60 transition-colors cursor-pointer"
                  >
                    <option value="">Select a subject…</option>
                    <option value="general">General Inquiry</option>
                    <option value="menu">Menu & Pricing</option>
                    <option value="catering">Catering / Bulk Order</option>
                    <option value="feedback">Feedback / Suggestion</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="contact-message" className="block text-[10px] font-bold uppercase tracking-widest text-amber-400 mb-1.5">
                    Message *
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={4}
                    value={formState.message}
                    onChange={handleFormChange}
                    placeholder="How can we help you?"
                    className="w-full rounded-xl border border-white/[0.08] bg-[#0d101a] px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-amber-500/60 transition-colors resize-none"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={formLoading}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 py-3.5 px-4 text-sm font-bold text-stone-950 shadow-lg shadow-amber-500/20 hover:brightness-105 active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {formLoading ? (
                    <><span className="h-4 w-4 rounded-full border-2 border-black/30 border-t-black animate-spin" /> Sending…</>
                  ) : (
                    <><Send className="h-4 w-4" /> Send Message</>
                  )}
                </button>

                <p className="text-[10px] text-center text-slate-500">
                  Your inquiry will be noted and responded to at our restaurant counter.
                </p>
              </form>
            )}
          </motion.div>

          {/* Right: Map + Restaurant Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex flex-col gap-4"
          >
            {/* Google Map Embed */}
            <div className="h-[360px] sm:h-[420px] lg:h-[480px] rounded-2xl sm:rounded-3xl border border-amber-500/20 overflow-hidden shadow-2xl relative bg-[#0c0e14]">
              <iframe
                title="Vishnu Bhavan Jaffna Map Location"
                src="https://maps.google.com/maps?q=Vishnu%20Bhavan%2C%20No.%20350%2C%20Jaffna-Kankesanturai%20Road%2C%20Jaffna&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full border-0"
              />
              <div className="absolute top-3.5 right-3.5 z-10">
                <a
                  href={site.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/85 px-3.5 py-1.5 text-xs font-bold text-white backdrop-blur-md hover:bg-black hover:text-amber-300 shadow-lg transition-all"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  Open in Google Maps
                </a>
              </div>
            </div>

            {/* Action Buttons Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <a
                href={site.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 py-3 px-4 text-sm font-bold text-stone-950 shadow-lg shadow-amber-500/20 hover:brightness-105 active:scale-[0.98] transition-all"
              >
                <Navigation className="h-4 w-4 fill-stone-950" />
                Get Directions
              </a>

              <button
                type="button"
                onClick={handleCopyAddress}
                className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] py-3 px-4 text-sm font-semibold text-slate-200 hover:bg-white/[0.08] hover:text-white active:scale-[0.98] transition-all"
              >
                {copiedAddress ? (
                  <><Check className="h-4 w-4 text-emerald-400" /><span className="text-emerald-400 font-bold">Copied!</span></>
                ) : (
                  <><Copy className="h-4 w-4 text-amber-400" />Copy Address</>
                )}
              </button>

              <button
                type="button"
                onClick={handleShareLocation}
                className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] py-3 px-4 text-sm font-semibold text-slate-200 hover:bg-white/[0.08] hover:text-white active:scale-[0.98] transition-all"
              >
                <Share2 className="h-4 w-4 text-amber-400" />
                Share Location
              </button>
            </div>

            {/* Quick Info Strip */}
            <div className="relative overflow-hidden rounded-2xl border border-white/[0.07] bg-gradient-to-r from-[#141824] to-[#10131d] p-4 sm:p-5 flex flex-wrap gap-5 items-center">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />
              
              <div className="flex items-center gap-3">
                {/* Live indicator */}
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-950/90 border border-emerald-500/40 px-2.5 py-1 text-[11px] font-bold text-emerald-300">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                  </span>
                  Open Today
                </span>
              </div>

              <div className="flex flex-wrap gap-2 text-xs">
                <span className="inline-flex items-center gap-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-emerald-400 font-semibold">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  100% Pure Vegetarian
                </span>
                <span className="inline-flex items-center gap-1 rounded-md bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 text-amber-300 font-semibold">
                  6:00 AM – 10:00 PM
                </span>
                <span className="inline-flex items-center gap-1 rounded-md bg-white/[0.05] border border-white/10 px-2 py-0.5 text-slate-300 font-semibold">
                  Jaffna & South Indian
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
