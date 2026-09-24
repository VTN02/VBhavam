import { useState, useRef, useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Clock,
  ExternalLink,
  MapPin,
  Navigation,
  Phone,
  Search,
  Sparkles,
  Utensils,
  UtensilsCrossed,
  X,
  MessageCircle,
  ShieldCheck,
  CheckCircle,
  Copy,
  Check,
  Share2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { site } from "@/config/site";
import {
  products,
  type Product,
  type Category,
  formatPrice,
} from "@/data/products";
import {
  menuCategories,
  servingSchedules,
  featuredMenuItems,
  type MenuCategoryId,
} from "@/data/restaurant";
import { Hero } from "@/components/Hero";
import { TrustBar } from "@/components/TrustBar";
import { CategoryShowcase } from "@/components/CategoryShowcase";
import { ProductCard } from "@/components/ProductCard";
import { GoogleMapsIcon } from "@/components/icons/BrandIcons";
import { Reveal } from "@/components/Reveal";
import lunchFeast from "@/assets/lunch-feast.jpg";
import heroFeast from "@/assets/hero-feast.jpg";
import eveningSpecial from "@/assets/evening-special.jpg";

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
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [menuSearchQuery, setMenuSearchQuery] = useState("");
  const [copiedAddress, setCopiedAddress] = useState(false);
  const menuSectionRef = useRef<HTMLElement>(null);

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

  // Filtered menu items for the digital menu section
  const filteredProducts = useMemo(() => {
    let result = products;

    if (selectedCategory !== "All") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (menuSearchQuery.trim()) {
      const q = menuSearchQuery.trim().toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.itemCode.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          (p.tag && p.tag.toLowerCase().includes(q))
      );
    }

    return result;
  }, [selectedCategory, menuSearchQuery]);

  const handleSelectSchedule = (categoryName: string) => {
    setSelectedCategory(categoryName);
    menuSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

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
                <button
                  type="button"
                  onClick={() => handleSelectSchedule("Breakfast & All Time")}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500/15 border border-amber-500/30 px-4 py-2.5 text-xs font-bold text-amber-300 hover:bg-amber-500 hover:text-black transition-all cursor-pointer"
                >
                  <span>View Breakfast &amp; All Time Menu</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
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
                <h3 className="mt-4 text-2xl font-extrabold text-white">
                  Lunch
                </h3>
                <div className="mt-2 flex items-center gap-2 text-sm font-bold text-emerald-400 font-mono">
                  <Clock className="h-4 w-4" />
                  <span>11:00 AM – 3:00 PM</span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-slate-300">
                  Traditional vegetarian Rice &amp; Curry, Budget Lunch pack, Jaffna Special Lunch, and varieties.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/[0.08]">
                <button
                  type="button"
                  onClick={() => handleSelectSchedule("Lunch")}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 px-4 py-2.5 text-xs font-bold text-emerald-300 hover:bg-emerald-500 hover:text-black transition-all cursor-pointer"
                >
                  <span>View Lunch Menu</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </motion.div>

            {/* Card 3: Evening Special */}
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-orange-500/25 bg-gradient-to-b from-[#1f1917] to-[#120f0d] p-6 shadow-xl backdrop-blur-md"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-500/15 border border-orange-500/30 px-3 py-1 text-xs font-bold text-orange-300">
                  <Sparkles className="h-3 w-3" />
                  Fresh Evening Tiffin
                </span>
                <h3 className="mt-4 text-2xl font-extrabold text-white">
                  Evening Special
                </h3>
                <div className="mt-2 flex items-center gap-2 text-sm font-bold text-orange-400 font-mono">
                  <Clock className="h-4 w-4" />
                  <span>4:00 PM – 10:00 PM</span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-slate-300">
                  Crispy ghee &amp; masala dosai, pittu kottu, rotti kottu, string hoppers biryani &amp; hot poori sets.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/[0.08]">
                <button
                  type="button"
                  onClick={() => handleSelectSchedule("Evening Special")}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500/15 border border-orange-500/30 px-4 py-2.5 text-xs font-bold text-orange-300 hover:bg-orange-500 hover:text-black transition-all cursor-pointer"
                >
                  <span>View Evening Special Menu</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 4. POPULAR CHOICES / FEATURED MENU ── */}
      <section id="featured" className="relative py-16 sm:py-20 lg:py-24 bg-[#0e1118] overflow-hidden">
        <span className="glow-orb top-[-10%] left-[-5%] h-96 w-96 bg-amber-500/15" aria-hidden="true" />
        <span className="glow-orb bottom-[-10%] right-[-5%] h-80 w-80 bg-emerald-500/10" aria-hidden="true" />

        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1 text-xs font-bold tracking-[0.14em] text-amber-300 uppercase">
              <Sparkles className="h-3.5 w-3.5" />
              Popular Choices
            </span>
            <h2 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl tracking-tight">
              Featured Menu
            </h2>
            <p className="mt-3 text-base text-slate-300">
              A curated highlight of iconic South Indian favourites and authentic Jaffna delicacies prepared daily.
            </p>
          </div>

          {/* 9 Highlighted Featured Dishes Grid (2 columns on mobile) */}
          <div className="mt-8 sm:mt-12 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
            {featuredMenuItems.map((item) => {
              const matchedProduct = products.find((p) => p.itemCode === item.itemCode);
              if (!matchedProduct) return null;

              return (
                <Reveal key={item.id}>
                  <ProductCard product={matchedProduct} />
                </Reveal>
              );
            })}
          </div>

          {/* Browse Complete Menu CTA */}
          <div className="mt-12 flex justify-center">
            <button
              type="button"
              onClick={() => {
                setSelectedCategory("All");
                menuSectionRef.current?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-500 hover:from-amber-400 hover:to-amber-500 px-8 py-3.5 text-sm font-extrabold text-black shadow-lg shadow-amber-500/25 transition-all duration-200 cursor-pointer active:scale-95"
            >
              <span>Browse Complete Menu (60+ Items)</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </section>

      {/* ── 5. DIGITAL MENU (COMPLETE FOOD MENU WITH ALL 83 ITEMS) ── */}
      <section
        ref={menuSectionRef}
        id="digital-menu"
        className="relative py-16 sm:py-20 lg:py-24 bg-[#0a0c10] overflow-hidden"
      >
        <span className="glow-orb top-[-10%] right-[-5%] h-96 w-96 bg-amber-600/10" aria-hidden="true" />
        <span className="glow-orb bottom-[-10%] left-[-5%] h-80 w-80 bg-orange-600/10" aria-hidden="true" />

        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1 text-xs font-bold tracking-[0.14em] text-emerald-300 uppercase">
              <Utensils className="h-3.5 w-3.5" />
              Digital Menu
            </span>
            <h2 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl tracking-tight">
              Our Complete Food Menu
            </h2>
            <p className="mt-3 text-base text-slate-300">
              Explore authentic South Indian breakfasts, traditional Jaffna rice meals, evening tiffins, sweets, and beverages.
            </p>
          </div>

          {/* Search Input for Menu Items */}
          <div className="mt-8 max-w-md mx-auto">
            <div className="relative flex items-center rounded-2xl border border-amber-500/20 bg-[#141722] px-4 py-2.5 shadow-lg backdrop-blur-md">
              <Search className="h-4 w-4 text-amber-400 shrink-0" />
              <input
                type="text"
                value={menuSearchQuery}
                onChange={(e) => setMenuSearchQuery(e.target.value)}
                placeholder="Search dish name or item number (e.g. #050, Masala Dosai, Kool)..."
                className="w-full bg-transparent px-3 text-xs sm:text-sm text-white placeholder-slate-400 outline-none"
              />
              {menuSearchQuery && (
                <button
                  type="button"
                  onClick={() => setMenuSearchQuery("")}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* Category Tabs with Item Counts */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
            {[
              { label: "All", count: 83 },
              { label: "Breakfast & All Time", count: 24, timing: "6:00 AM – 10:00 PM" },
              { label: "Lunch", count: 7, timing: "11:00 AM – 3:00 PM" },
              { label: "Evening Special", count: 11, timing: "4:00 PM – 10:00 PM" },
              { label: "Diabetes Special", count: 8 },
              { label: "Jaffna Palakaaram", count: 6 },
              { label: "Indian Sweets", count: 7 },
              { label: "Beverages", count: 20 },
            ].map((cat) => {
              const isActive = selectedCategory === cat.label;
              return (
                <motion.button
                  key={cat.label}
                  type="button"
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(cat.label)}
                  className={`group relative inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold transition-colors duration-200 outline-none cursor-pointer ${
                    isActive
                      ? "text-stone-950 font-extrabold"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  {/* Sliding Golden Pill Indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeCategoryPill"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 shadow-lg shadow-amber-500/30"
                      transition={{ type: "spring", stiffness: 500, damping: 35 }}
                    />
                  )}
                  {!isActive && (
                    <span className="absolute inset-0 rounded-full border border-white/10 bg-[#141722] group-hover:border-amber-400/40 transition-colors" />
                  )}
                  <span className="relative z-10">{cat.label}</span>
                  <span
                    className={`relative z-10 rounded-full px-1.5 py-0.2 text-[10px] font-extrabold transition-colors ${
                      isActive
                        ? "bg-black/20 text-stone-950"
                        : "bg-white/[0.08] text-slate-400 group-hover:text-amber-300"
                    }`}
                  >
                    {cat.count}
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* Active Timing Header Strip */}
          <div className="mt-6 flex items-center justify-between border-b border-white/[0.08] pb-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-extrabold text-white">
                {selectedCategory}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                ({filteredProducts.length} items available)
              </span>
            </div>

            {selectedCategory === "Breakfast & All Time" && (
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
                <Clock className="h-3 w-3" />
                6:00 AM – 10:00 PM
              </span>
            )}
            {selectedCategory === "Lunch" && (
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
                <Clock className="h-3 w-3" />
                11:00 AM – 3:00 PM
              </span>
            )}
            {selectedCategory === "Evening Special" && (
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-400 bg-orange-500/10 border border-orange-500/20 px-3 py-1 rounded-full">
                <Clock className="h-3 w-3" />
                4:00 PM – 10:00 PM
              </span>
            )}
          </div>

          {/* Dish Grid with Framer Motion AnimatePresence & Layout transitions */}
          <motion.div
            layout
            className="mt-8 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product, idx) => (
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
                    delay: Math.min(idx * 0.015, 0.25),
                  }}
                  className="w-full"
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-base text-slate-400">No dishes match your search query.</p>
              <button
                type="button"
                onClick={() => {
                  setMenuSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-amber-400 hover:underline"
              >
                Reset filters
              </button>
            </div>
          )}
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
                <a
                  href="#schedule"
                  className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-3 text-sm font-bold text-black hover:bg-amber-400 transition-colors"
                >
                  <span>View Serving Schedule</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href={site.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/[0.05] px-6 py-3 text-sm font-bold text-white hover:bg-white/[0.1] transition-colors"
                >
                  <Navigation className="h-4 w-4 text-amber-400" />
                  <span>Get Directions</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. VISIT US / FIND US IN JAFFNA ── */}
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
