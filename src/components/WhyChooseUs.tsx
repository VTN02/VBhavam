import { Award, Clock, Heart, MapPin, ShieldCheck, Sparkles, Utensils } from "lucide-react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";

const reasons = [
  {
    step: "01",
    icon: ShieldCheck,
    title: "100% Pure Vegetarian Kitchen",
    text: "Dedicated strictly vegetarian kitchen upholding traditional cleanliness, purity and sattvic integrity.",
    highlight: "Pure Veg Assurance",
  },
  {
    step: "02",
    icon: Utensils,
    title: "Authentic Jaffna & South Indian",
    text: "True flavours perfected through traditional spices, freshly grated coconuts, and heritage culinary roots.",
    highlight: "Authentic Recipes",
  },
  {
    step: "03",
    icon: Clock,
    title: "All-Day Fresh Service",
    text: "Serving hot breakfast, midday lunch meals, and fresh evening tiffins continuously from 6:00 AM to 10:00 PM.",
    highlight: "6 AM – 10 PM Daily",
  },
  {
    step: "04",
    icon: Heart,
    title: "Diabetes & Wellness Choices",
    text: "Nutritious traditional finger millet (Kurakkan) and whole wheat (Attama) grain meals tailored for wellness.",
    highlight: "Traditional Grains",
  },
  {
    step: "05",
    icon: Sparkles,
    title: "Heritage Palakaaram & Sweets",
    text: "Handcrafted Kolukattai, Mothakam, Jaffna Odyal Kool, and pure ghee Mysore Pak and laddoos.",
    highlight: "Jaffna Heritage",
  },
  {
    step: "06",
    icon: MapPin,
    title: "Prime Location on KKS Road",
    text: "Conveniently situated at No. 350, Jaffna–Kankesanturai Road for easy dine-in and quick takeaway.",
    highlight: "KKS Road, Jaffna",
  },
];

function MobileWhyChooseUsVerticalPath() {
  return (
    <div className="relative mt-8 block sm:hidden px-1 overflow-hidden">
      {/* ── 1. Base Vertical Path Track ── */}
      <div
        className="pointer-events-none absolute left-[17px] top-4 bottom-6 w-[2px] bg-gradient-to-b from-amber-500/20 via-amber-500/40 to-emerald-500/20"
        aria-hidden="true"
      />

      {/* ── 2. Compact Slow-Moving Glowing Pulse ── */}
      <motion.div
        className="pointer-events-none absolute left-[16px] w-[3px] h-16 rounded-full bg-gradient-to-b from-transparent via-amber-400 to-transparent shadow-[0_0_12px_rgba(245,158,11,0.9)] z-10"
        aria-hidden="true"
        initial={{ top: "-10%" }}
        animate={{ top: ["-10%", "105%"] }}
        transition={{
          duration: 7.5,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <div className="space-y-4 relative z-10">
        {reasons.map(({ step, icon: Icon, title, text, highlight }, index) => (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{
              duration: 0.55,
              delay: index * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative flex items-start gap-3.5"
          >
            {/* ── Left Animated Node with Pulsing Ring ── */}
            <div className="relative shrink-0 pt-1">
              <motion.span
                className="pointer-events-none absolute inset-0 rounded-xl bg-amber-400/25 blur-sm"
                animate={{
                  scale: [1, 1.25, 1],
                  opacity: [0.15, 0.6, 0.15],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: index * 0.6,
                  ease: "easeInOut",
                }}
              />

              <motion.div
                whileTap={{ scale: 0.92 }}
                className="relative grid h-[36px] w-[36px] place-items-center rounded-xl border border-amber-400/40 bg-gradient-to-br from-[#241a10] via-[#1a140d] to-[#120d09] shadow-md shadow-amber-500/20"
              >
                <Icon className="h-4 w-4 text-amber-400" aria-hidden="true" />
              </motion.div>
            </div>

            {/* ── Right Content Card ── */}
            <motion.div
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 450, damping: 25 }}
              className="group relative flex-1 overflow-hidden rounded-2xl border border-amber-500/15 bg-gradient-to-b from-[#181d2a]/95 via-[#131722]/95 to-[#0e1118]/95 p-4 shadow-lg backdrop-blur-xl"
            >
              {/* Top specular highlight */}
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-amber-400/50 to-transparent opacity-80"
                aria-hidden="true"
              />

              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center rounded-md border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-[9px] font-bold text-amber-300 uppercase tracking-wider">
                  {highlight}
                </span>
                <span className="text-[10px] font-mono font-bold text-slate-500">
                  {step}
                </span>
              </div>

              <h3 className="mt-1.5 text-xs sm:text-sm font-bold text-white leading-snug">
                {title}
              </h3>
              <p className="mt-1 text-[11px] leading-relaxed text-slate-300/80">
                {text}
              </p>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function DesktopLaptopPathSection() {
  return (
    <div className="relative mt-12 hidden sm:block">
      {/* ── 1. Background Saffron/Gold Circuit Lines ── */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        {/* Horizontal Laser Line Across Row 1 */}
        <div className="hidden lg:block absolute left-[15%] right-[15%] top-[110px] h-[2px] bg-gradient-to-r from-amber-500/20 via-amber-400/40 to-amber-500/20">
          <motion.div
            className="absolute -top-[3px] h-[8px] w-24 rounded-full bg-gradient-to-r from-transparent via-amber-300 to-transparent shadow-[0_0_12px_#f59e0b]"
            animate={{ left: ["-10%", "110%"] }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Horizontal Laser Line Across Row 2 */}
        <div className="hidden lg:block absolute left-[15%] right-[15%] bottom-[125px] h-[2px] bg-gradient-to-r from-amber-500/20 via-amber-400/40 to-amber-500/20">
          <motion.div
            className="absolute -top-[3px] h-[8px] w-24 rounded-full bg-gradient-to-r from-transparent via-amber-300 to-transparent shadow-[0_0_12px_#f59e0b]"
            animate={{ left: ["110%", "-10%"] }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.8,
            }}
          />
        </div>

        {/* Connecting Vertical Conduit between Row 1 and Row 2 */}
        <div className="hidden lg:block absolute right-[6%] top-[110px] bottom-[125px] w-[2px] bg-gradient-to-b from-amber-500/30 via-amber-400/40 to-amber-500/30">
          <motion.div
            className="absolute -left-[3px] w-[8px] h-16 rounded-full bg-gradient-to-b from-transparent via-amber-300 to-transparent shadow-[0_0_12px_#f59e0b]"
            animate={{ top: ["-10%", "110%"] }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>
      </div>

      {/* ── 2. The 6 Reason Cards in 3-Column Grid ── */}
      <div className="relative z-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {reasons.map(({ step, icon: Icon, title, text, highlight }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: 0.5,
              delay: i * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            whileHover={{ y: -6, scale: 1.01 }}
            className="group relative flex flex-col justify-between rounded-2xl border border-amber-500/15 bg-gradient-to-b from-[#181d2a]/95 via-[#131722]/95 to-[#0e1118]/95 p-6 shadow-xl backdrop-blur-xl transition-all duration-300 hover:border-amber-500/45 hover:shadow-2xl hover:shadow-amber-500/15 cursor-pointer select-none"
          >
            {/* Top Glowing Specular Line on Hover */}
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-t-2xl shadow-[0_0_12px_rgba(245,158,11,0.8)]"
              aria-hidden="true"
            />

            {/* Corner Ambient Glow */}
            <div
              className="pointer-events-none absolute -top-10 -right-10 h-20 w-20 rounded-full bg-amber-500/10 blur-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              aria-hidden="true"
            />

            <div>
              {/* Card Header: Icon + Pipeline Tag + Step Number */}
              <div className="flex items-center justify-between gap-3">
                <div className="relative">
                  <span
                    className="pointer-events-none absolute inset-0 rounded-xl bg-amber-400/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    aria-hidden="true"
                  />
                  <span className="relative grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/10 text-amber-400 border border-amber-500/30 shadow-md transition-all duration-300 group-hover:scale-105 group-hover:border-amber-400/60 group-hover:bg-gradient-to-br group-hover:from-amber-500 group-hover:to-orange-500 group-hover:text-black">
                    <Icon className="h-5 w-5 transition-transform duration-300 group-hover:rotate-6" aria-hidden="true" />
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center rounded-md border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold text-amber-300 uppercase tracking-wider">
                    {highlight}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-500 transition-colors duration-200 group-hover:text-amber-400">
                    {step}
                  </span>
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="mt-5 text-base font-bold text-white transition-colors duration-200 group-hover:text-amber-200">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300/80">
                {text}
              </p>
            </div>

            {/* Bottom Pipeline Node Route Indicator */}
            <div className="mt-5 flex items-center justify-between border-t border-white/[0.05] pt-3 text-[11px] font-mono text-slate-500">
              <span className="flex items-center gap-1.5 transition-colors group-hover:text-amber-400">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400/60 group-hover:bg-amber-400 group-hover:shadow-[0_0_6px_#f59e0b] transition-all" />
                <span>STEP_{step}</span>
              </span>
              <span className="text-[10px] text-slate-600 group-hover:text-slate-400 transition-colors">
                {i < 5 ? `➔ 0${i + 2}` : "➔ 100% PURE VEG"}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden bg-section-mesh py-16 sm:py-20 lg:py-24">
      <span className="glow-orb top-[-10%] left-1/2 h-96 w-96 -translate-x-1/2 bg-amber-600/15" aria-hidden="true" />
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Our Culinary Heritage"
          title="Why Diners Love Vishnu Bhavan"
          subtitle="100% pure vegetarian kitchen in Jaffna, prepared daily with sacred purity, traditional spices, and authentic South Indian flavours."
        />

        {/* 1. Mobile Screen: Animated Vertical Path Timeline (<640px) */}
        <MobileWhyChooseUsVerticalPath />

        {/* 2. Laptop & Desktop Screen: Connected Pipeline Path Animation (>=640px) */}
        <DesktopLaptopPathSection />
      </div>
    </section>
  );
}
