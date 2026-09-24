import { useRef, useEffect, useMemo } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Layers, Clock, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { products, type Category } from "@/data/products";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import heroFeast from "@/assets/hero-feast.jpg";
import lunchFeast from "@/assets/lunch-feast.jpg";
import eveningSpecial from "@/assets/evening-special.jpg";

interface ShowcaseCategory {
  title: string;
  category?: Category;
  tagline: string;
  image: string;
  popularBrands: string;
  timing?: string;
  badge?: string;
}

const showcaseList: ShowcaseCategory[] = [
  {
    title: "Breakfast & All Time",
    category: "Breakfast & All Time",
    tagline: "String hoppers, idly, dosai, vadai & poori sets",
    image: heroFeast,
    popularBrands: "All Day Availability",
    timing: "6:00 AM – 10:00 PM",
    badge: "All-Day Fresh",
  },
  {
    title: "Lunch Specials",
    category: "Lunch",
    tagline: "Traditional vegetarian Rice & Curry & Jaffna Special",
    image: lunchFeast,
    popularBrands: "Midday Specials",
    timing: "11:00 AM – 3:00 PM",
    badge: "Banana Leaf Feast",
  },
  {
    title: "Evening Specials",
    category: "Evening Special",
    tagline: "Masala dosai, ghee dosai, pittu kottu & rotti kottu",
    image: eveningSpecial,
    popularBrands: "Sizzling Tawa & Kottu",
    timing: "4:00 PM – 10:00 PM",
    badge: "Crispy Evening Tiffin",
  },
  {
    title: "Diabetes Special Food",
    category: "Diabetes Special",
    tagline: "Kurakkan & Attama low GI traditional grain healthy options",
    image: "/images/dishes/puttu.jpg",
    popularBrands: "Traditional Low GI Grains",
    timing: "Daily Special",
    badge: "Diabetic Friendly",
  },
  {
    title: "Jaffna Palakaaram",
    category: "Jaffna Palakaaram",
    tagline: "Kolukattai, Mothakam, Muruku & authentic Odyal Kool",
    image: "/images/dishes/modak.jpg",
    popularBrands: "Northern Heritage Recipes",
    timing: "Heritage Snacks",
    badge: "Traditional Jaffna",
  },
  {
    title: "Indian Sweets",
    category: "Indian Sweets",
    tagline: "Mysore Pak, Jaangiri, Rava Laddoo, Boondi & Kesari",
    image: "/images/dishes/mysore_pak.jpg",
    popularBrands: "Handcrafted Sweets",
    timing: "Pure Desi Ghee",
    badge: "Pure Desi Ghee",
  },
  {
    title: "Beverages",
    category: "Beverages",
    tagline: "Ceylon milk tea, ginger tea, coffee & chilled drinks",
    image: "/images/dishes/tea.jpg",
    popularBrands: "Hot & Chilled Refreshments",
    timing: "Hot & Chilled",
    badge: "Ceylon Brews",
  },
  {
    title: "Explore Digital Menu",
    category: undefined,
    tagline: "Browse all 80+ vegetarian dishes, daily prices & order online",
    image: heroFeast,
    popularBrands: "Complete Kitchen Menu",
    timing: "Open 6 AM – 10 PM",
    badge: "Full Digital Menu",
  },
];

function SwipeableMarqueeRow({
  items,
  direction = "left",
  speed = 0.55,
}: {
  items: ShowcaseCategory[];
  direction?: "left" | "right";
  speed?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInteracting = useRef(false);
  const touchTimeout = useRef<number | null>(null);

  // Repeat items for seamless continuous looping and smooth swiping
  const loopedItems = useMemo(
    () => [...items, ...items, ...items, ...items],
    [items],
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (direction === "right" && el.scrollLeft === 0) {
      el.scrollLeft = el.scrollWidth / 2;
    }

    let animationFrameId: number;

    const step = () => {
      if (!isInteracting.current && el) {
        if (direction === "left") {
          el.scrollLeft += speed;
          if (el.scrollLeft >= el.scrollWidth / 2) {
            el.scrollLeft -= el.scrollWidth / 4;
          }
        } else {
          el.scrollLeft -= speed;
          if (el.scrollLeft <= 0) {
            el.scrollLeft += el.scrollWidth / 4;
          }
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
      }, 1800);
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
  }, [direction, speed]);

  return (
    <div
      ref={containerRef}
      className="flex gap-3.5 overflow-x-auto py-2 px-3 scrollbar-none select-none touch-pan-x [-webkit-overflow-scrolling:touch]"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      {loopedItems.map((item, idx) => {
        const count = item.category
          ? products.filter((p) => p.category === item.category).length
          : products.length;

        return (
          <motion.div
            key={`${item.title}-${idx}`}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 450, damping: 25 }}
            className="shrink-0"
          >
            <Link
              to={item.category ? "/products" : "/products"}
              search={item.category ? { category: item.category } : undefined}
              className="group relative block w-[250px] aspect-[16/10] overflow-hidden rounded-2xl border border-amber-500/20 bg-[#0d101a] shadow-lg cursor-pointer select-none transition-all duration-300 active:border-amber-400/60"
            >
              <img
                src={item.image || "/images/dishes/fallback-food.svg"}
                alt={`${item.title} photo`}
                loading="lazy"
                width={360}
                height={225}
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.src.endsWith("/images/dishes/fallback-food.svg")) {
                    target.src = "/images/dishes/fallback-food.svg";
                  }
                }}
                className="h-full w-full object-cover pointer-events-none transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080b15]/95 via-[#080b15]/45 to-black/25 pointer-events-none" />

              {/* Top Badges */}
              <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between gap-1.5 z-10 pointer-events-none">
                <span className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-black/65 px-2 py-0.5 text-[10px] font-semibold text-white backdrop-blur-md">
                  <Layers className="h-2.5 w-2.5 text-amber-400" />
                  {count} {item.category ? "Dishes" : "Items"}
                </span>
                {item.timing && (
                  <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/30 bg-black/70 px-2 py-0.5 text-[9px] font-bold text-amber-300 backdrop-blur-md">
                    <Clock className="h-2.5 w-2.5" />
                    {item.timing}
                  </span>
                )}
              </div>

              {/* Bottom Content */}
              <div className="absolute bottom-0 inset-x-0 p-3 z-10 pointer-events-none bg-gradient-to-t from-[#080b15] via-[#080b15]/85 to-transparent pt-4">
                <p className="text-[9px] font-bold tracking-wider uppercase text-amber-400 truncate">
                  {item.badge || item.popularBrands}
                </p>
                <h4 className="text-sm font-bold text-white truncate group-hover:text-amber-300 transition-colors">
                  {item.title}
                </h4>
                <p className="mt-0.5 text-[10px] text-slate-300 line-clamp-1">
                  {item.tagline}
                </p>
              </div>

              {/* Top Amber Highlight */}
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-20"
                aria-hidden="true"
              />
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}

export function CategoryShowcase() {
  return (
    <section id="categories" className="relative py-12 sm:py-16 lg:py-20 overflow-hidden bg-section-sapphire">
      {/* Subtle background glow */}
      <span className="glow-orb top-1/3 left-[-5%] h-96 w-96 bg-amber-600/10" aria-hidden="true" />
      <span className="glow-orb top-[-10%] right-[-5%] h-80 w-80 bg-amber-500/10" aria-hidden="true" />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Dining Categories"
            title="Explore Our Vegetarian Kitchen"
            subtitle="Authentic Jaffna heritage recipes &amp; South Indian vegetarian specialties prepared fresh daily."
          />
          <Link
            to="/categories"
            className="group inline-flex items-center gap-2 text-sm font-bold text-amber-400 hover:text-amber-300 transition-colors shrink-0 pb-1"
          >
            <span>View All Categories</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      </div>

      {/* 1. MOBILE ONLY: 1 Row Auto-Running + Swipeable Marquee */}
      <div className="mt-6 block sm:hidden relative w-full overflow-hidden py-1">
        {/* Left & Right Smooth Edge Fade Masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-[#0b0e14] via-[#0b0e14]/80 to-transparent z-20" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-[#0b0e14] via-[#0b0e14]/80 to-transparent z-20" />

        {/* 1 Row Auto-running + Swipeable */}
        <SwipeableMarqueeRow items={showcaseList} direction="left" speed={0.55} />
      </div>

      {/* 2. TABLET & DESKTOP: Full Category Grid */}
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mt-10 hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {showcaseList.map((item, i) => {
            const count = item.category
              ? products.filter((p) => p.category === item.category).length
              : products.length;

            return (
              <Reveal key={item.title} delay={(i % 4) * 60}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  className="h-full"
                >
                  <Link
                    to={item.category ? "/products" : "/products"}
                    search={item.category ? { category: item.category } : undefined}
                    className="group relative block aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/[0.1] bg-[#0d101a] shadow-lg transition-all duration-300 hover:border-amber-500/50 hover:shadow-2xl hover:shadow-amber-500/15"
                  >
                    {/* Full-bleed Photo Image */}
                    <img
                      src={item.image || "/images/dishes/fallback-food.svg"}
                      alt={`${item.title} category photo`}
                      loading="lazy"
                      width={600}
                      height={450}
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (!target.src.endsWith("/images/dishes/fallback-food.svg")) {
                          target.src = "/images/dishes/fallback-food.svg";
                        }
                      }}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    />

                    {/* Gradient Overlay for high image vibrancy */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080b15]/95 via-[#080b15]/30 to-black/10 transition-opacity duration-300 group-hover:via-[#080b15]/40" />

                    {/* Top Badges */}
                    <div className="absolute top-3.5 inset-x-3.5 flex items-center justify-between gap-2 z-10">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/65 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur-md shadow-sm">
                        <Layers className="h-3 w-3 text-amber-400" aria-hidden="true" />
                        {count} {item.category ? "Dishes" : "Items"}
                      </span>
                      {item.timing && (
                        <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/35 bg-black/70 px-2.5 py-1 text-[10px] font-bold text-amber-300 backdrop-blur-md shadow-sm">
                          <Clock className="h-3 w-3" />
                          {item.timing}
                        </span>
                      )}
                    </div>

                    {/* Bottom Content */}
                    <div className="absolute bottom-0 inset-x-0 p-4 sm:p-4.5 z-10 bg-gradient-to-t from-[#080b15] via-[#080b15]/85 to-transparent pt-6">
                      <p className="text-[10px] font-bold tracking-wider uppercase text-amber-400">
                        {item.badge || item.popularBrands}
                      </p>
                      <h3 className="mt-1 text-base sm:text-lg font-bold text-white transition-colors duration-200 group-hover:text-amber-400">
                        {item.title}
                      </h3>
                      <p className="mt-0.5 text-xs text-slate-300 line-clamp-1">
                        {item.tagline}
                      </p>

                      <div className="mt-2.5 flex items-center gap-1 text-xs font-semibold text-amber-400 group-hover:text-amber-300">
                        <span>Explore Menu</span>
                        <ArrowRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
                      </div>
                    </div>

                    {/* Top Amber Highlight */}
                    <div
                      className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-20"
                      aria-hidden="true"
                    />
                  </Link>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
