import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";


import heroFeast from "@/assets/hero-feast.jpg";
import lunchFeast from "@/assets/lunch-feast.jpg";
import eveningSpecial from "@/assets/evening-special.jpg";

// ─── Slide Data ────────────────────────────────────────────────────────────────
interface HeroSlide {
  id: number;
  eyebrow: string;
  heading: string;
  headingAccent: string;
  subheading: string;
  primaryCta: { label: string; href?: string; to?: string };
  secondaryCta: { label: string; to: string; href?: string };
  bg: { type: "video" | "image"; src: string };
  accentColor: string;
  accentGlow: string;
}

const SLIDES: HeroSlide[] = [
  {
    id: 0,
    eyebrow: "100% Pure Vegetarian Kitchen • Jaffna",
    heading: "Authentic South Indian &",
    headingAccent: "Jaffna Heritage Cuisine",
    subheading:
      "Welcome to Vishnu Bhavan on Kankesanturai Road. Savor steaming string hoppers, crispy golden dosai, traditional banana leaf rice & curry, evening kottu, and handcrafted pure ghee sweets.",
    primaryCta: { label: "Browse Digital Menu (83 Items)", to: "/products" },
    secondaryCta: { label: "Serving Schedule", to: "/#schedule" },
    bg: { type: "image", src: heroFeast },
    accentColor: "from-amber-400 via-yellow-300 to-orange-400",
    accentGlow: "bg-amber-600/30",
  },
  {
    id: 1,
    eyebrow: "Midday Specials • 11:00 AM – 3:00 PM",
    heading: "Traditional Vegetarian",
    headingAccent: "Rice & Curry Feast",
    subheading:
      "Signature Jaffna Special Lunch served with country rice, aromatic curries, rasam, curd, and papadam, plus convenient budget take-away packs.",
    primaryCta: {
      label: "Explore Lunch Menu",
      href: "/products?category=Lunch",
    },
    secondaryCta: { label: "Find Restaurant", to: "/contact" },
    bg: { type: "image", src: lunchFeast },
    accentColor: "from-emerald-400 via-teal-300 to-amber-300",
    accentGlow: "bg-emerald-600/25",
  },
  {
    id: 2,
    eyebrow: "Fresh Evening Tiffin • 4:00 PM – 10:00 PM",
    heading: "Crispy Ghee Dosai &",
    headingAccent: "Sizzling Pittu Kottu",
    subheading:
      "Golden masala dosais, pure cow ghee roast, sizzling Pittu Kottu chopped on the griddle with fresh vegetables, and wholesome Jaffna palakaaram.",
    primaryCta: {
      label: "View Evening Specials",
      href: "/products?category=Evening+Special",
    },
    secondaryCta: { label: "Jaffna Palakaaram", to: "/products" },
    bg: { type: "image", src: eveningSpecial },
    accentColor: "from-orange-400 via-amber-300 to-yellow-300",
    accentGlow: "bg-orange-600/25",
  },
];

const SLIDE_DURATION = 5500; // ms each slide is visible
const TRANSITION_DURATION = 0.8; // seconds crossfade

// ─── Framer Motion variants ────────────────────────────────────────────────────
const textContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
  exit: { transition: { staggerChildren: 0.06, staggerDirection: -1 } },
};

const textItemVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: { duration: 0.35, ease: "easeIn" },
  },
};

const bgVariants = {
  enter: { opacity: 0 },
  center: { opacity: 1, transition: { duration: TRANSITION_DURATION, ease: "easeInOut" } },
  exit: { opacity: 0, transition: { duration: TRANSITION_DURATION, ease: "easeInOut" } },
};

// ─── Offer Ticker Data & Component ──────────────────────────────────────────
const HERO_OFFERS = [
  {
    tag: "🌱 100% PURE VEG",
    text: "Pure Vegetarian Kitchen • Dedicated Sattvic Preparation",
    link: "/about",
    badgeColor: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  },
  {
    tag: "⏰ OPERATING HOURS",
    text: "6:00 AM – 10:00 PM • Serving Breakfast, Lunch & Dinner 7 Days a Week",
    link: "/#schedule",
    badgeColor: "bg-amber-500/15 text-amber-300 border-amber-500/30",
  },
  {
    tag: "📍 JAFFNA LOCATION",
    text: "No. 350, Jaffna–Kankesanturai (KKS) Road, Jaffna, Sri Lanka",
    link: "/contact",
    badgeColor: "bg-sky-500/15 text-sky-300 border-sky-500/30",
  },
  {
    tag: "🍛 MIDDAY LUNCH",
    text: "Rice & Curry (Rs.150) • Budget Lunch Pack (Rs.130) • 11 AM - 3 PM",
    link: "/products?category=Lunch",
    badgeColor: "bg-orange-500/15 text-orange-300 border-orange-500/30",
  },
  {
    tag: "🌾 DIABETES SPECIAL",
    text: "Kurakkan String Hoppers, Kurakkan Dosai & Attama Rotti Varieties",
    link: "/products?category=Diabetes+Special",
    badgeColor: "bg-teal-500/15 text-teal-300 border-teal-500/30",
  },
  {
    tag: "🍮 JAFFNA HERITAGE",
    text: "Kolukattai, Mothakam, Seeni Ariyatharam & Odyal Kool (Rs.100)",
    link: "/products?category=Jaffna+Palakaaram",
    badgeColor: "bg-yellow-500/15 text-yellow-300 border-yellow-500/30",
  },
];

function HeroOfferTicker() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInteracting = useRef(false);
  const touchTimeout = useRef<number | null>(null);

  const loopedOffers = [
    ...HERO_OFFERS,
    ...HERO_OFFERS,
    ...HERO_OFFERS,
    ...HERO_OFFERS,
  ];

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let animationFrameId: number;
    const speed = 1.05; // Faster brisk marquee speed

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
      }, 1200);
    };

    const onMouseEnter = () => {
      isInteracting.current = true;
    };

    const onMouseLeave = () => {
      if (!touchTimeout.current) {
        isInteracting.current = false;
      }
    };

    el.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true });
    window.addEventListener("pointercancel", onPointerUp, { passive: true });
    el.addEventListener("mouseenter", onMouseEnter);
    el.addEventListener("mouseleave", onMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (touchTimeout.current) clearTimeout(touchTimeout.current);
      el.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
      el.removeEventListener("mouseenter", onMouseEnter);
      el.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <div className="relative z-30 w-full border-b border-white/[0.08] bg-[#0c101d]/95 backdrop-blur-xl overflow-hidden py-2 select-none shadow-md">
      {/* Left/Right Subtle Fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-8 sm:w-16 bg-gradient-to-r from-[#0c101d] to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-8 sm:w-16 bg-gradient-to-l from-[#0c101d] to-transparent z-10" />

      <div
        ref={containerRef}
        className="flex w-full items-center gap-8 overflow-x-auto whitespace-nowrap scrollbar-none touch-pan-x cursor-grab active:cursor-grabbing px-4 [-webkit-overflow-scrolling:touch]"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {loopedOffers.map((offer, idx) => (
          <Link
            key={`offer-${idx}`}
            to={offer.link as any}
            className="group inline-flex shrink-0 items-center gap-2 text-xs text-slate-300 hover:text-white transition-colors"
          >
            <span
              className={`rounded px-1.5 py-0.5 text-[9.5px] font-extrabold tracking-wide uppercase border ${offer.badgeColor}`}
            >
              {offer.tag}
            </span>
            <span className="font-semibold text-slate-200 group-hover:text-blue-300 transition-colors">
              {offer.text}
            </span>
            <span className="text-slate-600 text-[10px]">✦</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

// ─── Sub-components ────────────────────────────────────────────────────────────

/** Ken Burns wrapper — subtle scale from 1 → 1.05 over the slide lifetime */
function KenBurns({
  children,
  active,
}: {
  children: React.ReactNode;
  active: boolean;
}) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        transform: active ? "scale(1.05)" : "scale(1)",
        transition: active
          ? `transform ${SLIDE_DURATION + TRANSITION_DURATION * 1000}ms linear`
          : "none",
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
}

/** Background layer for a single slide */
function SlideBackground({ slide, active }: { slide: HeroSlide; active: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoRef.current) return;
    if (active) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => { });
    } else {
      videoRef.current.pause();
    }
  }, [active]);

  return (
    <motion.div
      key={slide.id}
      variants={bgVariants}
      initial="enter"
      animate="center"
      exit="exit"
      className="absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <KenBurns active={active}>
        {slide.bg.type === "video" ? (
          <video
            ref={videoRef}
            src={slide.bg.src}
            loop
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover opacity-50"
          />
        ) : (
          <img
            src={slide.bg.src}
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-55"
          />
        )}
      </KenBurns>

      {/* Layered dark overlays for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.55)_100%)]" />

      {/* Subtle dot-grid texture */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.07)_0.8px,transparent_0.8px)] [background-size:28px_28px] opacity-[0.35]" />
    </motion.div>
  );
}

// ─── Progress bar for each dot indicator ──────────────────────────────────────
function ProgressDot({
  active,
  onClick,
  index,
}: {
  active: boolean;
  onClick: () => void;
  index: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Go to slide ${index + 1}`}
      className="group relative flex items-center justify-center p-1.5 focus:outline-none"
    >
      <span
        className={`block rounded-full transition-all duration-500 ${active
            ? "w-8 h-2 bg-white"
            : "w-2 h-2 bg-white/35 group-hover:bg-white/60"
          }`}
      />
      {active && (
        <motion.span
          className="absolute left-1.5 top-1.5 h-2 rounded-full bg-white/40"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: SLIDE_DURATION / 1000, ease: "linear" }}
          key={`progress-${index}`}
          style={{ maxWidth: "2rem" }}
        />
      )}
    </button>
  );
}

// ─── Main Hero Component ───────────────────────────────────────────────────────
export function Hero() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prefersReduced =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % SLIDES.length);
  }, []);

  const goTo = useCallback(
    (index: number) => {
      if (index === current) return;
      setCurrent(index);
      // Reset and restart the auto-advance timer
      setPaused(true);
      setTimeout(() => setPaused(false), 300);
    },
    [current],
  );

  // Auto-advance timer
  useEffect(() => {
    if (prefersReduced || paused) return;
    timerRef.current = setTimeout(next, SLIDE_DURATION);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [current, paused, next, prefersReduced]);

  const slide = SLIDES[current];

  return (
    <section
      className="relative flex min-h-[calc(100dvh-4rem)] flex-col overflow-hidden border-b border-white/[0.08]"
      aria-label="Hero carousel"
    >
      {/* ── Top Running Promotional Offer Ticker ── */}
      <HeroOfferTicker />

      {/* ── Background layers (crossfade between slides) ── */}
      <AnimatePresence mode="sync">
        <SlideBackground key={`bg-${slide.id}`} slide={slide} active={true} />
      </AnimatePresence>

      {/* ── Ambient coloured glow orb (per-slide accent) ── */}
      <AnimatePresence mode="sync">
        <motion.span
          key={`orb-${slide.id}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className={`pointer-events-none absolute top-[-8%] left-1/2 -translate-x-1/2 h-[32rem] w-[32rem] rounded-full blur-[120px] ${slide.accentGlow}`}
          aria-hidden="true"
        />
      </AnimatePresence>

      {/* ── Foreground content (centered vertically & horizontally) ── */}
      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-4 py-8 sm:py-16 lg:py-20 text-center my-auto">
        {/* Eyebrow badge */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`eyebrow-${slide.id}`}
            variants={textItemVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.08] px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-white/80 backdrop-blur-xl shadow-lg"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-white/70 animate-pulse shrink-0" />
            {slide.eyebrow}
          </motion.div>
        </AnimatePresence>

        {/* Heading + accent */}
        <AnimatePresence mode="wait">
          <motion.h1
            key={`h1-${slide.id}`}
            variants={textContainerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="mt-5 sm:mt-6 text-[36px] min-[400px]:text-[44px] sm:text-6xl lg:text-[72px] font-black tracking-tight text-white leading-[1.08] max-w-4xl"
          >
            <motion.span variants={textItemVariants} className="block">
              {slide.heading}
            </motion.span>
            <motion.span
              variants={textItemVariants}
              className={`block bg-gradient-to-r ${slide.accentColor} bg-clip-text text-transparent`}
            >
              {slide.headingAccent}
            </motion.span>
          </motion.h1>
        </AnimatePresence>

        {/* Subheading (Hidden on mobile screen for cleaner mobile viewport) */}
        <AnimatePresence mode="wait">
          <motion.p
            key={`sub-${slide.id}`}
            variants={textItemVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ delay: 0.2 }}
            className="mt-4 sm:mt-5 max-w-xl text-sm sm:text-lg leading-relaxed text-white/70 font-light hidden sm:block"
          >
            {slide.subheading}
          </motion.p>
        </AnimatePresence>

        {/* CTA Buttons */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`ctas-${slide.id}`}
            variants={textItemVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ delay: 0.35 }}
            className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto"
          >
            {/* Primary CTA */}
            {slide.primaryCta.to ? (
              <Link
                to={slide.primaryCta.to as "/products" | "/categories" | "/about"}
                className="group relative inline-flex h-12 sm:h-13 w-full sm:w-auto items-center justify-center gap-2.5 overflow-hidden rounded-full bg-white px-8 text-sm font-bold text-black shadow-2xl shadow-white/10 transition-all duration-300 hover:shadow-white/20 hover:scale-[1.03] active:scale-[0.98]"
              >
                <span className="relative z-10">{slide.primaryCta.label}</span>
                <ArrowRight
                  className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-black/10 to-transparent" />
              </Link>
            ) : (
              <a
                href={slide.primaryCta.href}
                className="group relative inline-flex h-12 sm:h-13 w-full sm:w-auto items-center justify-center gap-2.5 overflow-hidden rounded-full bg-white px-8 text-sm font-bold text-black shadow-2xl shadow-white/10 transition-all duration-300 hover:shadow-white/20 hover:scale-[1.03] active:scale-[0.98]"
              >
                <span className="relative z-10">{slide.primaryCta.label}</span>
                <ArrowRight
                  className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-black/10 to-transparent" />
              </a>
            )}

            {/* Secondary CTA */}
            <Link
              to={slide.secondaryCta.to}
              className="group inline-flex h-12 sm:h-13 w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-white/25 bg-white/[0.08] px-7 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:bg-white/[0.14] hover:border-white/40 active:scale-[0.98]"
            >
              {slide.secondaryCta.label}
              <ArrowRight
                className="h-4 w-4 opacity-70 transition-transform duration-300 group-hover:translate-x-1 group-hover:opacity-100"
                aria-hidden="true"
              />
            </Link>
          </motion.div>
        </AnimatePresence>

        {/* Slide progress dots */}
        <div
          className="mt-10 sm:mt-14 flex items-center gap-1"
          role="tablist"
          aria-label="Hero slides"
        >
          {SLIDES.map((s, i) => (
            <ProgressDot
              key={s.id}
              index={i}
              active={i === current}
              onClick={() => goTo(i)}
            />
          ))}
        </div>

        {/* Scroll hint */}
        <div className="mt-6 flex items-center justify-center">
          <a
            href="#trust-strip"
            aria-label="Scroll down to explore"
            className="flex flex-col items-center gap-1 text-[10px] font-medium text-white/40 hover:text-white/70 transition-colors duration-200"
          >
            <span className="hidden sm:block">Scroll to explore</span>
            <ChevronDown
              className="h-4 w-4 animate-bounce"
              aria-hidden="true"
            />
          </a>
        </div>
      </div>

      {/* Slide counter — desktop only, bottom-right */}
      <div className="absolute bottom-4 right-5 z-20 hidden sm:flex items-center gap-1.5 text-[11px] font-mono font-medium text-white/35 select-none">
        <span className="text-white/70">{String(current + 1).padStart(2, "0")}</span>
        <span>/</span>
        <span>{String(SLIDES.length).padStart(2, "0")}</span>
      </div>
    </section>
  );
}
