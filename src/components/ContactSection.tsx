import { useState } from "react";
import {
  Clock,
  MapPin,
  Phone,
  Navigation,
  ExternalLink,
  Sparkles,
  UtensilsCrossed,
  CheckCircle,
  Copy,
  Check,
  Share2,
} from "lucide-react";
import { GoogleMapsIcon } from "@/components/icons/BrandIcons";
import { site } from "@/config/site";
import { SectionHeading } from "@/components/SectionHeading";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Reveal } from "@/components/Reveal";

export function ContactSection() {
  const [copiedAddress, setCopiedAddress] = useState(false);

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

  return (
    <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24 bg-[#0d0f14] min-h-[calc(100vh-4rem)]">
      {/* Ambient glows */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -top-32 left-[-10%] h-96 w-96 rounded-full bg-amber-600/15 blur-3xl" />
        <div className="absolute bottom-0 right-[-5%] h-80 w-80 rounded-full bg-orange-600/10 blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Contact & Visit" }]} />
        <SectionHeading
          eyebrow="Visit &amp; Contact"
          title="Find Us in Jaffna"
          subtitle="Conveniently situated on the prominent Jaffna–Kankesanturai (KKS) Road in Jaffna, Sri Lanka."
        />

        <div className="mt-10 sm:mt-12 grid grid-cols-1 gap-6 lg:gap-8 lg:grid-cols-12">
          {/* ── Left Column: Contact Cards ── */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-amber-500/25 bg-gradient-to-b from-[#141824] via-[#10131d] to-[#0c0e14] p-5 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-xl">
              {/* Top ambient gold accent */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent" aria-hidden="true" />

              {/* Header: Name, Tamil Script & Live Status */}
              <div className="flex flex-col gap-3 pb-5 border-b border-white/[0.08]">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
                      {site.name}
                    </h3>
                    <p className="text-sm font-semibold text-amber-400/90 mt-0.5 tracking-wide">
                      {site.tamilName}
                    </p>
                  </div>

                  {/* Live Status Indicator */}
                  <span className="shrink-0 inline-flex items-center gap-1.5 rounded-full bg-emerald-950/90 border border-emerald-500/40 px-2.5 py-1 text-[11px] font-bold text-emerald-300 shadow-sm backdrop-blur-md">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                    </span>
                    Open Today
                  </span>
                </div>

                {/* Badges Bar */}
                <div className="flex flex-wrap items-center gap-2 pt-0.5">
                  <span className="inline-flex items-center gap-1 rounded-md bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 text-[11px] font-bold text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    100% Pure Vegetarian
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-md bg-white/[0.06] border border-white/10 px-2 py-0.5 text-[11px] font-medium text-slate-300">
                    Jaffna &amp; South Indian
                  </span>
                </div>
              </div>

              {/* Cohesive Modern Info Cards */}
              <div className="mt-5 space-y-3">
                {/* 1. Address Card */}
                <div className="group relative rounded-xl border border-white/[0.08] bg-white/[0.02] p-3.5 sm:p-4 hover:border-amber-500/30 hover:bg-white/[0.04] transition-all">
                  <div className="flex items-start gap-3">
                    <div className="h-9 w-9 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center shrink-0 text-amber-400 mt-0.5">
                      <MapPin className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                          Restaurant Address
                        </span>
                        <button
                          type="button"
                          onClick={handleCopyAddress}
                          className="inline-flex items-center gap-1 text-[10px] font-semibold text-amber-400/80 hover:text-amber-300 transition-colors"
                        >
                          {copiedAddress ? (
                            <>
                              <Check className="h-3 w-3 text-emerald-400" />
                              <span className="text-emerald-400">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="h-3 w-3" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                      <p className="mt-0.5 font-bold text-white text-sm sm:text-base leading-snug">
                        No. 350, Jaffna–Kankesanturai Road
                      </p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Jaffna, Northern Province, Sri Lanka
                      </p>
                    </div>
                  </div>
                </div>

                {/* 2. Hours Card with Meal Schedule */}
                <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-3.5 sm:p-4">
                  <div className="flex items-start gap-3">
                    <div className="h-9 w-9 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shrink-0 text-emerald-400 mt-0.5">
                      <Clock className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                          Operating Hours
                        </span>
                        <span className="text-[10px] font-semibold text-slate-400">
                          7 Days a Week
                        </span>
                      </div>
                      <p className="mt-0.5 font-bold text-white text-sm sm:text-base font-mono">
                        6:00 AM – 10:00 PM
                      </p>
                      
                      {/* Meal service pills */}
                      <div className="mt-2 flex flex-wrap gap-1.5 text-[10px]">
                        <span className="rounded bg-white/[0.05] border border-white/10 px-1.5 py-0.5 text-slate-300 font-medium">
                          Breakfast: 6 AM – 10 PM
                        </span>
                        <span className="rounded bg-amber-500/10 border border-amber-500/20 px-1.5 py-0.5 text-amber-300 font-medium">
                          Lunch: 11 AM – 3 PM
                        </span>
                        <span className="rounded bg-orange-500/10 border border-orange-500/20 px-1.5 py-0.5 text-orange-300 font-medium">
                          Evening: 4 PM – 10 PM
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Dining & Inquiries Card */}
                <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-3.5 sm:p-4">
                  <div className="flex items-start gap-3">
                    <div className="h-9 w-9 rounded-lg bg-sky-500/15 border border-sky-500/30 flex items-center justify-center shrink-0 text-sky-400 mt-0.5">
                      <UtensilsCrossed className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-sky-400">
                        Service &amp; Inquiries
                      </span>
                      <p className="mt-0.5 font-bold text-white text-sm">
                        Dine-In • Takeaway • Walk-ins Welcome
                      </p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        In-person orders &amp; inquiries at our reception counter at No. 350 KKS Road.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons: Unified, High-Conversion Mobile Actions */}
              <div className="mt-5 space-y-2.5">
                {/* Primary: Get Directions in Google Maps */}
                <a
                  href={site.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 py-3.5 px-4 text-sm font-bold text-stone-950 shadow-lg shadow-amber-500/20 hover:shadow-amber-500/35 hover:brightness-105 active:scale-[0.98] transition-all text-center"
                >
                  <Navigation className="h-4 w-4 fill-stone-950" />
                  <span>Get Directions in Google Maps</span>
                </a>

                {/* Secondary Row: Copy Address & Share Location */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={handleCopyAddress}
                    className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] py-2.5 px-3 text-xs font-semibold text-slate-200 hover:bg-white/[0.08] hover:text-white active:scale-[0.98] transition-all"
                  >
                    {copiedAddress ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-400" />
                        <span className="text-emerald-400 font-bold">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5 text-amber-400" />
                        <span>Copy Address</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleShareLocation}
                    className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] py-2.5 px-3 text-xs font-semibold text-slate-200 hover:bg-white/[0.08] hover:text-white active:scale-[0.98] transition-all"
                  >
                    <Share2 className="h-3.5 w-3.5 text-amber-400" />
                    <span>Share Location</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right Column: Embedded Interactive Map ── */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="h-[460px] lg:h-[620px] rounded-2xl border border-amber-500/20 overflow-hidden shadow-2xl relative">
              <iframe
                title="Vishnu Bhavan Jaffna Map Location"
                src="https://maps.google.com/maps?q=Vishnu%20Bhavan%2C%20No.%20350%2C%20Jaffna-Kankesanturai%20Road%2C%20Jaffna&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full border-0"
              />
              <div className="absolute top-4 right-4 z-10">
                <a
                  href={site.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/85 px-3.5 py-1.5 text-xs font-bold text-white backdrop-blur-md hover:bg-black hover:text-amber-300 shadow-lg transition-all"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  <span>Open in Google Maps</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
