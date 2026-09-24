import { useState, useEffect, useRef, useMemo } from "react";
import { BadgeCheck, Clock, MapPin, Sparkles, UtensilsCrossed } from "lucide-react";
import { motion } from "framer-motion";

const trustItems = [
  {
    step: "01",
    icon: BadgeCheck,
    title: "100% Pure Vegetarian",
    text: "Strictly pure vegetarian kitchen with traditional sattvic hygiene",
    accent: "from-emerald-500/20 via-teal-500/10 to-transparent",
    iconColor: "text-emerald-400",
  },
  {
    step: "02",
    icon: UtensilsCrossed,
    title: "Authentic Heritage Taste",
    text: "South Indian classics, Jaffna rice & curry, and traditional palakaaram",
    accent: "from-amber-500/20 via-orange-500/10 to-transparent",
    iconColor: "text-amber-400",
  },
  {
    step: "03",
    icon: Clock,
    title: "6:00 AM – 10:00 PM Daily",
    text: "Serving hot breakfast, lunch meals & evening tiffins 7 days a week",
    accent: "from-yellow-500/20 via-amber-500/10 to-transparent",
    iconColor: "text-amber-400",
  },
  {
    step: "04",
    icon: MapPin,
    title: "No. 350, KKS Road, Jaffna",
    text: "Convenient central location on the prominent Jaffna–Kankesanturai Road",
    accent: "from-orange-600/20 via-amber-500/10 to-transparent",
    iconColor: "text-amber-400",
  },
];

/* ── Mobile 1-Row Auto-Running & Swipeable Marquee Strip (<640px) ── */
function MobileRunningTrustStrip({ items }: { items: typeof trustItems }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInteracting = useRef(false);
  const touchTimeout = useRef<number | null>(null);

  // Seamless continuous loop
  const loopedItems = useMemo(
    () => [...items, ...items, ...items, ...items],
    [items],
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let animationFrameId: number;
    const speed = 0.55;

    const step = () => {
      if (!isInteracting.current && el) {
        el.scrollLeft += speed;
        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft -= el.scrollWidth / 4;
        }
      }
      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);

    const onPointerDown = () => {
      isInteracting.current = true;
      if (touchTimeout.current) clearTimeout(touchTimeout.current);
    };

    const onPointerUp = () => {
      if (touchTimeout.current) clearTimeout(touchTimeout.current);
      touchTimeout.current = window.setTimeout(() => {
        isInteracting.current = false;
      }, 1600);
    };

    el.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true });
    window.addEventListener("pointercancel", onPointerUp, { passive: true });

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (touchTimeout.current) clearTimeout(touchTimeout.current);
      el.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
    };
  }, []);

  return (
    <div className="relative w-full overflow-hidden block sm:hidden py-1">
      {/* Left & Right Smooth Edge Fade Masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-[#0d0f12] via-[#0d0f12]/80 to-transparent z-20" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-[#0d0f12] via-[#0d0f12]/80 to-transparent z-20" />

      <div
        ref={containerRef}
        className="flex gap-3 overflow-x-auto no-scrollbar touch-pan-x cursor-grab active:cursor-grabbing px-4 select-none scroll-smooth"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {loopedItems.map(({ step, icon: Icon, title, text }, idx) => (
          <div
            key={`${step}-${idx}`}
            className="group relative flex w-[280px] shrink-0 items-center gap-3.5 rounded-2xl border border-amber-500/25 bg-gradient-to-b from-[#181d2a]/95 via-[#131722]/95 to-[#0e1118]/95 p-3.5 shadow-xl backdrop-blur-xl"
          >
            {/* Top golden highlight */}
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-amber-400/60 to-transparent opacity-80 rounded-t-2xl"
              aria-hidden="true"
            />

            {/* Glowing Icon Node */}
            <div className="relative shrink-0">
              <span className="relative grid h-11 w-11 place-items-center rounded-xl border border-amber-500/30 bg-gradient-to-br from-amber-500/20 to-orange-500/10 text-amber-400 shadow-md">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
            </div>

            {/* Text Content — no cut off! */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-1.5">
                <span className="block text-xs sm:text-sm font-bold text-white truncate">
                  {title}
                </span>
                <span className="text-[10px] font-mono font-bold text-amber-400/80 shrink-0">
                  {step}
                </span>
              </div>
              <span className="mt-0.5 block text-[11px] text-slate-300/80 leading-snug line-clamp-2">
                {text}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TrustBar() {
  const [activeStep, setActiveStep] = useState(0);

  // Sequential active wave cycling across the 4 trust badges
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % trustItems.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="trust-strip"
      aria-label="Why dine with us"
      className="relative z-10 -mt-8 pb-6 sm:-mt-10 overflow-hidden"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Continuous ambient glowing trail beneath strip */}
        <div className="pointer-events-none absolute inset-x-8 -top-4 h-12 bg-gradient-to-r from-amber-600/10 via-amber-500/15 to-orange-600/10 blur-2xl" aria-hidden="true" />

        {/* 1. MOBILE ONLY: 1-Row Running Mode & Swipeable (<640px) */}
        <MobileRunningTrustStrip items={trustItems} />

        {/* 2. TABLET & DESKTOP: 4-Column Grid (>=640px) */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {trustItems.map(({ step, icon: Icon, title, text }, i) => {
            const isActive = activeStep === i;

            return (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ y: -5, scale: 1.015 }}
                whileTap={{ scale: 0.97 }}
                className={`group relative flex h-full items-center gap-3.5 rounded-2xl border p-4 shadow-xl backdrop-blur-xl transition-all duration-300 cursor-pointer select-none overflow-hidden ${
                  isActive
                    ? "border-amber-500/40 bg-gradient-to-b from-[#1a1824]/95 via-[#14131d]/95 to-[#0e0d14]/95 shadow-amber-500/15"
                    : "border-white/[0.08] bg-gradient-to-b from-[#141824]/90 via-[#10131d]/90 to-[#0c0e14]/90 hover:border-amber-500/35 hover:shadow-2xl hover:shadow-amber-500/10"
                }`}
              >
                {/* 1. Animated Top Specular Laser Highlight */}
                <div
                  className={`pointer-events-none absolute inset-x-0 top-0 h-[2px] transition-all duration-500 rounded-t-2xl ${
                    isActive
                      ? "bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-100 shadow-[0_0_12px_rgba(245,158,11,0.9)]"
                      : "bg-gradient-to-r from-transparent via-amber-400/40 to-transparent opacity-0 group-hover:opacity-100"
                  }`}
                  aria-hidden="true"
                />

                {/* 2. Flowing Ambient Corner Glow on Hover or Active Cycle */}
                <div
                  className={`pointer-events-none absolute -top-8 -right-8 h-20 w-20 rounded-full bg-amber-400/15 blur-xl transition-opacity duration-500 ${
                    isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                  }`}
                  aria-hidden="true"
                />

                {/* 3. Glowing Icon Node with Pulsing Halo */}
                <div className="relative shrink-0">
                  {/* Active Radar Ripple Ring */}
                  {isActive && (
                    <motion.span
                      className="pointer-events-none absolute -inset-1 rounded-2xl border border-amber-400/50"
                      initial={{ scale: 0.9, opacity: 0.8 }}
                      animate={{ scale: 1.25, opacity: 0 }}
                      transition={{
                        duration: 1.8,
                        repeat: Infinity,
                        ease: "easeOut",
                      }}
                      aria-hidden="true"
                    />
                  )}

                  <span
                    className={`relative grid h-11 w-11 place-items-center rounded-xl border transition-all duration-300 ${
                      isActive
                        ? "bg-gradient-to-br from-amber-500 via-amber-600 to-orange-500 text-stone-950 border-amber-400/60 shadow-lg shadow-amber-500/30 scale-105"
                        : "bg-gradient-to-br from-amber-500/15 to-orange-500/5 text-amber-400 border-amber-400/20 group-hover:scale-105 group-hover:from-amber-500 group-hover:to-orange-500 group-hover:text-stone-950 group-hover:border-amber-400/40"
                    }`}
                  >
                    <Icon className="h-5 w-5 transition-transform duration-300 group-hover:rotate-6" aria-hidden="true" />
                  </span>
                </div>

                {/* 4. Text Content */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1">
                    <span
                      className={`block text-sm font-bold transition-colors duration-200 truncate ${
                        isActive
                          ? "text-amber-200"
                          : "text-white group-hover:text-amber-200"
                      }`}
                    >
                      {title}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-slate-500 transition-colors duration-200 group-hover:text-amber-400 shrink-0">
                      {step}
                    </span>
                  </div>
                  <span className="mt-0.5 block text-xs text-slate-300/80 leading-snug line-clamp-2">
                    {text}
                  </span>
                </div>

                {/* 5. Bottom Energy Pulse Line Indicator */}
                <motion.div
                  className="pointer-events-none absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-400/60 to-transparent"
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{
                    opacity: isActive ? 1 : 0,
                    scaleX: isActive ? 1 : 0,
                  }}
                  transition={{ duration: 0.35 }}
                  aria-hidden="true"
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
