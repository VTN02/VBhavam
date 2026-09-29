import { useState, useRef } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Clock,
  MapPin,
  Navigation,
  Sparkles,
  Utensils,
  UtensilsCrossed,
  CheckCircle,
  Copy,
  Check,
  Share2,
  ExternalLink,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { site } from "@/config/site";
import { products } from "@/data/products";
import {
  featuredMenuItems,
} from "@/data/restaurant";
import { Hero } from "@/components/Hero";
import { TrustBar } from "@/components/TrustBar";
import { CategoryShowcase } from "@/components/CategoryShowcase";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { ReviewSection } from "@/components/ReviewSection";
import lunchFeast from "@/assets/lunch-feast.jpg";

const title = `${site.name} — 100% Pure Vegetarian South Indian & Jaffna Restaurant`;
const description =
  "Authentic 100% Pure Vegetarian dining at No. 350, Jaffna–Kankesanturai Road. Breakfast, Lunch & Dinner 6:00 AM – 10:00 PM daily. Explore 83 digital menu specialties.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "restaurant" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
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

  // Show only 12 items from featured or first 12 products
  const homeMenuItems = products.slice(0, 12);

  return (
    <div className="flex flex-col bg-[#0d0f14] text-foreground">
      {/* ── 1. HERO SECTION ── */}
      <Hero />

      {/* ── 2. TRUST / VALUE BAR ── */}
      <TrustBar />

      {/* ── 3. DINING CATEGORIES SHOWCASE ── */}
      <CategoryShowcase />

      {/* ── 4. SERVING SCHEDULE (FOOD AVAILABILITY & TIMINGS) ── */}
      <section id="schedule" className="relative py-16 sm:py-20 lg:py-24 bg-[#0a0c10] overflow-hidden">
        <span className="glow-orb top-[-10%] right-[-5%] h-96 w-96 bg-amber-500/10" aria-hidden="true" />
        <span className="glow-orb bottom-[-10%] left-[-5%] h-80 w-80 bg-orange-500/10" aria-hidden="true" />

        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1 text-xs font-bold tracking-[0.14em] text-amber-300 uppercase">
              <Clock className="h-3.5 w-3.5" />
              Serving Schedule
            </span>
            <h2 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl tracking-tight">
              Food Availability &amp; Timings
            </h2>
            <p className="mt-3 text-base text-slate-300">
              Enjoy hot and fresh vegetarian specialties prepared during dedicated meal service hours throughout the day.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Card 1: Breakfast & All Time */}
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-amber-500/20 bg-gradient-to-b from-[#161a24] to-[#10131a] p-6 shadow-xl backdrop-blur-md"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 px-3 py-1 text-xs font-bold text-amber-300">
                  <Sparkles className="h-3 w-3" />
                  All Day Availability
                </span>
                <h3 className="mt-4 text-2xl font-extrabold text-white">
                  Breakfast &amp; All Time
                </h3>
                <div className="mt-2 flex items-center gap-2 text-sm font-bold text-amber-400 font-mono">
                  <Clock className="h-4 w-4" />
                  <span>6:00 AM – 10:00 PM</span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-slate-300">
                  String hoppers, idly, dosai, pittu, vadai, poori sets, and traditional hot morning dishes.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/[0.08]">
                <Link
                  to="/products"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500/15 border border-amber-500/30 px-4 py-2.5 text-xs font-bold text-amber-300 hover:bg-amber-500 hover:text-black transition-all cursor-pointer"
                >
                  <span>View Breakfast &amp; All Time Menu</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </motion.div>

            {/* Card 2: Lunch */}
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-emerald-500/25 bg-gradient-to-b from-[#131d1a] to-[#0d1412] p-6 shadow-xl backdrop-blur-md"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 px-3 py-1 text-xs font-bold text-emerald-300">
                  <Sparkles className="h-3 w-3" />
                  Midday Specials
                </span>
                <h3 className="mt-4 text-2xl font-extrabold text-white">Lunch</h3>
                <div className="mt-2 flex items-center gap-2 text-sm font-bold text-emerald-400 font-mono">
                  <Clock className="h-4 w-4" />
                  <span>11:00 AM – 3:00 PM</span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-slate-300">
                  Traditional rice & curry feasts, Jaffna Special Lunch, Budget Lunch, and vegetarian biryani.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/[0.08]">
                <Link
                  to="/products"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 px-4 py-2.5 text-xs font-bold text-emerald-300 hover:bg-emerald-500 hover:text-black transition-all cursor-pointer"
                >
                  <span>View Lunch Menu</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </motion.div>

            {/* Card 3: Evening Special */}
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-orange-500/25 bg-gradient-to-b from-[#1d1410] to-[#12100d] p-6 shadow-xl backdrop-blur-md"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-500/15 border border-orange-500/30 px-3 py-1 text-xs font-bold text-orange-300">
                  <Sparkles className="h-3 w-3" />
                  Evening Eats
                </span>
                <h3 className="mt-4 text-2xl font-extrabold text-white">Evening Special</h3>
                <div className="mt-2 flex items-center gap-2 text-sm font-bold text-orange-400 font-mono">
                  <Clock className="h-4 w-4" />
                  <span>4:00 PM – 10:00 PM</span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-slate-300">
                  Masala dosai, ghee dosai, pittu kottu, rotti kottu, and crispy evening favourites.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/[0.08]">
                <Link
                  to="/products"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500/15 border border-orange-500/30 px-4 py-2.5 text-xs font-bold text-orange-300 hover:bg-orange-500 hover:text-black transition-all cursor-pointer"
                >
                  <span>View Evening Menu</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 5. OUR MENU (12 ITEMS PREVIEW) ── */}
      <section
        id="menu"
        className="relative py-16 sm:py-20 lg:py-24 bg-[#0e1118] overflow-hidden"
      >
        <span className="glow-orb top-[-10%] right-[-5%] h-96 w-96 bg-amber-600/10" aria-hidden="true" />
        <span className="glow-orb bottom-[-10%] left-[-5%] h-80 w-80 bg-orange-600/10" aria-hidden="true" />

        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1 text-xs font-bold tracking-[0.14em] text-emerald-300 uppercase">
              <Utensils className="h-3.5 w-3.5" />
              Our Menu
            </span>
            <h2 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl tracking-tight">
              Popular Dishes
            </h2>
            <p className="mt-3 text-base text-slate-300">
              A taste of our most-loved South Indian and Jaffna specialties — freshly prepared every day.
            </p>
          </div>

          {/* 4-Column Grid — 12 items */}
          <motion.div
            layout
            className="mt-10 sm:mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6"
          >
            <AnimatePresence mode="popLayout">
              {homeMenuItems.map((product, idx) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.88, transition: { duration: 0.15 } }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 28,
                    delay: Math.min(idx * 0.04, 0.3),
                  }}
                  className="w-full"
                >
                  <Reveal>
                    <ProductCard product={product} />
                  </Reveal>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* View All Button */}
          <div className="mt-12 flex justify-center">
            <Link
              to="/products"
              className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-400 px-8 py-3.5 text-sm font-extrabold text-stone-950 shadow-lg shadow-amber-500/30 transition-all duration-200 cursor-pointer active:scale-95"
            >
              <span>View All 83 Menu Items</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 6. ABOUT US ── */}
      <section id="about" className="relative py-16 sm:py-20 lg:py-24 bg-[#0d0f16] overflow-hidden">
        <span className="glow-orb top-[-10%] left-[-5%] h-96 w-96 bg-amber-500/10" aria-hidden="true" />
        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left image showcase */}
            <div className="relative">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-amber-500/20 shadow-2xl">
                <img
                  src={lunchFeast}
                  alt="Vishnu Bhavan traditional vegetarian meal"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <p className="text-sm font-extrabold text-amber-300">
                    ✦ ✦ ✦ Vishnu Bhavan • Jaffna, Sri Lanka
                  </p>
                  <p className="text-xs text-slate-300 mt-1">
                    No. 350, Jaffna–Kankesanturai Road
                  </p>
                </div>
              </div>
            </div>

            {/* Right text content */}
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1 text-xs font-bold tracking-[0.14em] text-amber-300 uppercase">
                <Sparkles className="h-3.5 w-3.5" />
                About Us
              </span>
              <h2 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl tracking-tight">
                About Vishnu Bhavan
              </h2>
              <div className="mt-6 space-y-4 text-base text-slate-300 leading-relaxed">
                <p className="text-lg text-amber-100 font-medium leading-relaxed">
                  Vishnu Bhavan offers vegetarian food with a selection of South Indian and Jaffna-style dishes, traditional snacks, sweets and beverages. Customers can explore breakfast items, lunch specials, evening dishes and special food options through the digital menu.
                </p>
                <p>
                  Rooted in authentic regional culinary traditions, our kitchen is 100% pure vegetarian, preparing morning string hoppers and idly, midday rice and curry feasts, crisp evening dosais, and handcrafted sweets daily.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-sm text-slate-200">
                <div className="flex items-center gap-2.5 rounded-xl border border-white/[0.08] bg-white/[0.03] p-3">
                  <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>100% Pure Vegetarian Kitchen</span>
                </div>
                <div className="flex items-center gap-2.5 rounded-xl border border-white/[0.08] bg-white/[0.03] p-3">
                  <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>South Indian &amp; Jaffna Heritage</span>
                </div>
                <div className="flex items-center gap-2.5 rounded-xl border border-white/[0.08] bg-white/[0.03] p-3">
                  <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Diabetes Grain Selections</span>
                </div>
                <div className="flex items-center gap-2.5 rounded-xl border border-white/[0.08] bg-white/[0.03] p-3">
                  <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>6:00 AM – 10:00 PM Service</span>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-3 text-sm font-bold text-black hover:bg-amber-400 transition-colors"
                >
                  <span>Browse Full Menu</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/[0.05] px-6 py-3 text-sm font-bold text-white hover:bg-white/[0.1] transition-colors"
                >
                  <Navigation className="h-4 w-4 text-amber-400" />
                  <span>Get Directions</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. REVIEWS SECTION ── */}
      <ReviewSection />

      {/* ── 8. VISIT US / FIND US IN JAFFNA ── */}
      <section id="visit" className="relative py-16 sm:py-20 lg:py-24 bg-[#0a0c10] overflow-hidden">
        <span className="glow-orb top-[-10%] right-[-5%] h-96 w-96 bg-amber-500/10" aria-hidden="true" />

        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1 text-xs font-bold tracking-[0.14em] text-amber-300 uppercase">
              <MapPin className="h-3.5 w-3.5" />
              Visit Us
            </span>
            <h2 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl tracking-tight">
              Find Us in Jaffna
            </h2>
            <p className="mt-3 text-base text-slate-300">
              Conveniently situated on the prominent Jaffna–Kankesanturai (KKS) Road in Jaffna, Sri Lanka.
            </p>
          </div>

          <div className="mt-10 sm:mt-12 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            {/* Left: Contact Info & Address */}
            <div className="lg:col-span-5 relative overflow-hidden rounded-2xl sm:rounded-3xl border border-amber-500/25 bg-gradient-to-b from-[#141824] via-[#10131d] to-[#0c0e14] p-5 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-xl">
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

              {/* Info Cards */}
              <div className="mt-5 space-y-3">
                {/* Address Card */}
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
                            <><Check className="h-3 w-3 text-emerald-400" /><span className="text-emerald-400">Copied</span></>
                          ) : (
                            <><Copy className="h-3 w-3" /><span>Copy</span></>
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

                {/* Hours Card */}
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
                        <span className="text-[10px] font-semibold text-slate-400">7 Days a Week</span>
                      </div>
                      <p className="mt-0.5 font-bold text-white text-sm sm:text-base font-mono">6:00 AM – 10:00 PM</p>
                      <div className="mt-2 flex flex-wrap gap-1.5 text-[10px]">
                        <span className="rounded bg-white/[0.05] border border-white/10 px-1.5 py-0.5 text-slate-300 font-medium">Breakfast: 6 AM – 10 PM</span>
                        <span className="rounded bg-amber-500/10 border border-amber-500/20 px-1.5 py-0.5 text-amber-300 font-medium">Lunch: 11 AM – 3 PM</span>
                        <span className="rounded bg-orange-500/10 border border-orange-500/20 px-1.5 py-0.5 text-orange-300 font-medium">Evening: 4 PM – 10 PM</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Dining & Inquiries Card */}
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

              {/* Action Buttons */}
              <div className="mt-5 space-y-2.5">
                <a
                  href={site.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 py-3.5 px-4 text-sm font-bold text-stone-950 shadow-lg shadow-amber-500/20 hover:shadow-amber-500/35 hover:brightness-105 active:scale-[0.98] transition-all text-center"
                >
                  <Navigation className="h-4 w-4 fill-stone-950" />
                  <span>Get Directions in Google Maps</span>
                </a>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={handleCopyAddress}
                    className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] py-2.5 px-3 text-xs font-semibold text-slate-200 hover:bg-white/[0.08] hover:text-white active:scale-[0.98] transition-all"
                  >
                    {copiedAddress ? (
                      <><Check className="h-3.5 w-3.5 text-emerald-400" /><span className="text-emerald-400 font-bold">Copied!</span></>
                    ) : (
                      <><Copy className="h-3.5 w-3.5 text-amber-400" /><span>Copy Address</span></>
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

            {/* Right: Embedded Interactive Map */}
            <div className="lg:col-span-7 h-[320px] sm:h-[420px] lg:h-[530px] rounded-2xl sm:rounded-3xl border border-amber-500/25 overflow-hidden shadow-2xl relative bg-[#0c0e14]">
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
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/85 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-md hover:bg-black hover:text-amber-300 shadow-lg transition-all"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  <span>Full Screen Map</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
