import { useRef, useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Compass, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { products, type Category } from "@/data/products";
import { SectionHeading } from "@/components/SectionHeading";
import heroFeast from "@/assets/hero-feast.jpg";
import lunchFeast from "@/assets/lunch-feast.jpg";
import eveningSpecial from "@/assets/evening-special.jpg";

export interface CategoryCardItem {
  badge: string;
  subtitle: string;
  title: string;
  description: string;
  image: string;
  category?: Category;
  search?: Record<string, string>;
  count?: number;
}

// ── ROW 1 ITEMS (Runs in one direction, e.g. Leftwards) ──
export const row1Categories: CategoryCardItem[] = [
  {
    badge: "DRY ROASTED MASALA",
    subtitle: "9 DISHES",
    title: "Pirattal with Pittu",
    description: "Thick caramelized dry-roasted masala reductions with red shallots & curry leaves",
    image: "/images/dishes/puttu.jpg",
    category: "Breakfast & All Time",
    search: { search: "Pittu" },
  },
  {
    badge: "SIGNATURE KOTTU",
    subtitle: "9 VARIETIES",
    title: "Pittu Kottu & Rotti Kottu",
    description: "Crushed steamed pittu & shredded parotta tossed on smoking iron griddles with vegetables & curry",
    image: "/images/dishes/kottu.jpg",
    category: "Evening Special",
    search: { category: "Evening Special" },
  },
  {
    badge: "WOODFIRE EARTHEN",
    subtitle: "CHEF CLASSIC",
    title: "Clay Pot Specialties",
    description: "Slow-braised traditional country specialties & heirloom curries cooked in authentic earthen pots",
    image: "/images/dishes/dal.jpg",
    category: "Lunch",
    search: { category: "Lunch" },
  },
  {
    badge: "AUTHENTIC GRAVY",
    subtitle: "9 DISHES",
    title: "Curry with Pittu",
    description: "Steamed bamboo pittu served with rich northern gravies, fresh coconut milk & spicy sambol",
    image: "/images/dishes/puttu.jpg",
    category: "Breakfast & All Time",
    search: { search: "Pittu" },
  },
  {
    badge: "MORNING TIFFIN",
    subtitle: "ALL-DAY FRESH",
    title: "String Hoppers & Idly Sets",
    description: "Freshly pressed string hoppers, feather-light idly & golden medu vadai with aromatic sodhi",
    image: heroFeast,
    category: "Breakfast & All Time",
    search: { category: "Breakfast & All Time" },
  },
  {
    badge: "PURE DESI GHEE",
    subtitle: "FESTIVE SWEETS",
    title: "Handcrafted Indian Sweets",
    description: "Pure ghee Mysore Pak, golden Jaangiri, rich Rava Laddoo, Boondi & traditional Kesari",
    image: "/images/dishes/mysore_pak.jpg",
    category: "Indian Sweets",
    search: { category: "Indian Sweets" },
  },
  {
    badge: "CRISPY TAWA",
    subtitle: "EVENING TIFFIN",
    title: "Ghee & Masala Dosai",
    description: "Golden roasted fermented crepes in pure desi ghee, stuffed with spiced potato masala",
    image: "/images/dishes/dosa.jpg",
    category: "Evening Special",
    search: { category: "Evening Special" },
  },
];

// ── ROW 2 ITEMS (Runs in the OPPOSITE direction, e.g. Rightwards) ──
export const row2Categories: CategoryCardItem[] = [
  {
    badge: "TRADITIONAL BAMBOO",
    subtitle: "ORIGINAL CRAFT",
    title: "Bamboo Steamed Pittu",
    description: "Artisanal red and white rice cylinders steamed in natural hollow bamboo reeds",
    image: "/images/dishes/puttu.jpg",
    category: "Breakfast & All Time",
    search: { search: "Pittu" },
  },
  {
    badge: "HERITAGE GRAINS",
    subtitle: "HEALTHY HERITAGE",
    title: "Kurakkan & Yaal Pittu",
    description: "Nutrient-rich finger millet and heirloom Jaffna grains with fresh grated coconut",
    image: "/images/dishes/puttu.jpg",
    category: "Diabetes Special",
    search: { category: "Diabetes Special" },
  },
  {
    badge: "NORTHERN COAST",
    subtitle: "DAILY SPECIAL",
    title: "Lagoon & Coastal Curries",
    description: "Spicy northern roasted spice reductions, heirloom tamarind kuzhambu & Jaffna curries",
    image: "/images/dishes/rice-and-curry.jpg",
    category: "Lunch",
    search: { category: "Lunch" },
  },
  {
    badge: "DUM-STYLE RICE",
    subtitle: "3 VARIETIES",
    title: "Jaffna Dum Rice & Biryani",
    description: "Fragrant basmati rice layered with ghee, whole spices, roasted cashews & rich gravies",
    image: "/images/dishes/biryani.jpg",
    category: "Lunch",
    search: { search: "Biryani" },
  },
  {
    badge: "HANDMADE HERITAGE",
    subtitle: "TRADITIONAL SNACKS",
    title: "Jaffna Palakaaram & Kool",
    description: "Steamed Kolukattai, sweet Mothakam, crispy Murukku & iconic spicy Odyal Kool",
    image: "/images/dishes/modak.jpg",
    category: "Jaffna Palakaaram",
    search: { category: "Jaffna Palakaaram" },
  },
  {
    badge: "MIDDAY FEAST",
    subtitle: "BANANA LEAF MEAL",
    title: "Traditional Rice & Curry",
    description: "Full vegetarian feast with red/white rice, 7 traditional curries, rasam, vadai & payasam",
    image: lunchFeast,
    category: "Lunch",
    search: { category: "Lunch" },
  },
  {
    badge: "CEYLON BREWS",
    subtitle: "HOT & CHILLED",
    title: "Ceylon Milk Tea & Coffee",
    description: "Freshly brewed highland Ceylon milk tea, aromatic ginger tea & filtered South Indian coffee",
    image: "/images/dishes/tea.jpg",
    category: "Beverages",
    search: { category: "Beverages" },
  },
];

/**
 * ScrollableMarqueeTrack
 * - Smooth continuous marquee running in specified direction (left or right).
 * - Opposite direction support for multi-row layouts.
 * - Interactive: Users can drag with mouse, touch-swipe on mobile, trackpad or wheel scroll.
 * - Seamless infinite wrapping logic without jumping or flickering.
 * - Distinguishes click from drag so links navigate reliably without misfiring during scrolls.
 */
function ScrollableMarqueeTrack({
  items,
  direction = "left",
  speed = 0.55,
}: {
  items: CategoryCardItem[];
  direction?: "left" | "right";
  speed?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInteracting = useRef(false);
  const interactionTimer = useRef<number | null>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startScrollLeft = useRef(0);
  const dragDistance = useRef(0);

  // Duplicate items 4 times to ensure seamless continuous wrapping across all resolutions
  const loopedItems = useMemo(
    () => [...items, ...items, ...items, ...items],
    [items],
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Initialize starting scroll position for smooth forward / reverse running
    const singleWidth = el.scrollWidth / 4;
    if (direction === "right" && el.scrollLeft <= 5) {
      el.scrollLeft = singleWidth * 1.5;
    } else if (direction === "left" && el.scrollLeft === 0) {
      el.scrollLeft = singleWidth * 0.5;
    }

    let animationFrameId: number;
    let lastTime = performance.now();

    const step = (timestamp: number) => {
      const elapsed = Math.min((timestamp - lastTime) / 1000, 0.1);
      lastTime = timestamp;

      if (!isInteracting.current && el) {
        const deltaPixels = speed * 60 * elapsed;
        const currentSingleWidth = el.scrollWidth / 4;

        if (currentSingleWidth > 0) {
          if (direction === "left") {
            el.scrollLeft += deltaPixels;
            if (el.scrollLeft >= currentSingleWidth * 2.5) {
              el.scrollLeft -= currentSingleWidth;
            }
          } else {
            el.scrollLeft -= deltaPixels;
            if (el.scrollLeft <= currentSingleWidth * 0.5) {
              el.scrollLeft += currentSingleWidth;
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);

    const handlePointerDown = (e: PointerEvent) => {
      isInteracting.current = true;
      isDragging.current = true;
      startX.current = e.pageX;
      startScrollLeft.current = el.scrollLeft;
      dragDistance.current = 0;
      if (interactionTimer.current) clearTimeout(interactionTimer.current);
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isDragging.current) return;
      const dx = e.pageX - startX.current;
      dragDistance.current = Math.abs(dx);
      el.scrollLeft = startScrollLeft.current - dx;

      // Wrap boundaries while dragging smoothly
      const currentSingleWidth = el.scrollWidth / 4;
      if (currentSingleWidth > 0) {
        if (el.scrollLeft >= currentSingleWidth * 2.5) {
          el.scrollLeft -= currentSingleWidth;
          startScrollLeft.current -= currentSingleWidth;
        } else if (el.scrollLeft <= currentSingleWidth * 0.5) {
          el.scrollLeft += currentSingleWidth;
          startScrollLeft.current += currentSingleWidth;
        }
      }
    };

    const handlePointerUp = () => {
      isDragging.current = false;
      if (interactionTimer.current) clearTimeout(interactionTimer.current);
      interactionTimer.current = window.setTimeout(() => {
        isInteracting.current = false;
      }, 1500);
    };

    const handleWheel = () => {
      isInteracting.current = true;
      if (interactionTimer.current) clearTimeout(interactionTimer.current);
      interactionTimer.current = window.setTimeout(() => {
        isInteracting.current = false;
      }, 1200);

      const currentSingleWidth = el.scrollWidth / 4;
      if (currentSingleWidth > 0) {
        if (el.scrollLeft >= currentSingleWidth * 2.5) {
          el.scrollLeft -= currentSingleWidth;
        } else if (el.scrollLeft <= currentSingleWidth * 0.5) {
          el.scrollLeft += currentSingleWidth;
        }
      }
    };

    const handleMouseEnter = () => {
      // Pause on hover so the user can easily read and click on cards
      isInteracting.current = true;
    };

    const handleMouseLeave = () => {
      if (!isDragging.current) {
        if (interactionTimer.current) clearTimeout(interactionTimer.current);
        interactionTimer.current = window.setTimeout(() => {
          isInteracting.current = false;
        }, 500);
      }
    };

    el.addEventListener("pointerdown", handlePointerDown, { passive: true });
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerup", handlePointerUp, { passive: true });
    window.addEventListener("pointercancel", handlePointerUp, { passive: true });
    el.addEventListener("wheel", handleWheel, { passive: true });
    el.addEventListener("mouseenter", handleMouseEnter);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (interactionTimer.current) clearTimeout(interactionTimer.current);
      el.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerUp);
      el.removeEventListener("wheel", handleWheel);
      el.removeEventListener("mouseenter", handleMouseEnter);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [direction, speed]);

  return (
    <div
      ref={containerRef}
      className="flex gap-4 sm:gap-5 overflow-x-auto py-2.5 px-4 scrollbar-none select-none touch-pan-x cursor-grab active:cursor-grabbing [-webkit-overflow-scrolling:touch]"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      {loopedItems.map((item, idx) => {
        return (
          <div
            key={`${item.title}-${idx}`}
            className="shrink-0"
          >
            <Link
              to="/products"
              search={item.search || (item.category ? { category: item.category } : undefined)}
              onClick={(e) => {
                // Prevent accidental navigation if the user was dragging/swiping
                if (dragDistance.current > 8) {
                  e.preventDefault();
                }
              }}
              className="group relative block w-[280px] sm:w-[325px] md:w-[350px] aspect-[16/10] overflow-hidden rounded-lg border border-white/10 bg-[#0c0f17] shadow-xl transition-all duration-300 hover:border-amber-400/40 hover:shadow-2xl hover:shadow-amber-500/10 cursor-pointer"
            >
              {/* Full-bleed Background Dish Photo */}
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
                className="h-full w-full object-cover pointer-events-none transition-transform duration-700 ease-out group-hover:scale-106"
              />

              {/* Dark Gradient Scrim Overlay for high legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#080a10]/95 via-[#080a10]/45 to-black/35 pointer-events-none transition-opacity duration-300 group-hover:via-[#080a10]/55" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent pointer-events-none" />

              {/* TOP HEADER: Pill Tag on Left + Circular Arrow Button on Right */}
              <div className="absolute top-3 inset-x-3.5 flex items-center justify-between gap-2 z-10 pointer-events-none">
                <span className="inline-flex items-center rounded-full border border-white/[0.15] bg-black/60 backdrop-blur-md px-3 py-1 text-[9.5px] sm:text-[10px] font-bold tracking-[0.14em] uppercase text-[#e2b77a] shadow-sm">
                  {item.badge}
                </span>

                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-white/[0.18] bg-black/60 backdrop-blur-md flex items-center justify-center text-white/80 group-hover:text-amber-300 group-hover:border-amber-400/60 group-hover:bg-black/80 transition-all duration-300 shadow-md">
                  <ArrowUpRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>

              {/* BOTTOM CONTENT: Subtitle Eyebrow + Elegant Serif Title + Description */}
              <div className="absolute bottom-0 inset-x-0 p-3.5 sm:p-4 z-10 pointer-events-none bg-gradient-to-t from-[#080a10] via-[#080a10]/90 to-transparent pt-6">
                <p className="text-[10px] sm:text-[10.5px] font-bold tracking-[0.16em] uppercase text-amber-400 drop-shadow-sm truncate">
                  {item.subtitle}
                </p>

                <h3 className="mt-0.5 text-base sm:text-lg font-serif font-medium text-white tracking-tight leading-snug line-clamp-1 group-hover:text-amber-300 transition-colors">
                  {item.title}
                </h3>

                <p className="mt-1 text-[11px] sm:text-xs text-slate-300/80 line-clamp-2 leading-relaxed font-sans">
                  {item.description}
                </p>
              </div>

              {/* Top Amber Highlight Glow on Hover */}
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-20"
                aria-hidden="true"
              />
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export function CategoryShowcase() {
  return (
    <section id="categories" className="relative py-12 sm:py-16 lg:py-20 overflow-hidden bg-section-sapphire">
      {/* Subtle atmospheric ambient glow */}
      <span className="glow-orb top-1/4 left-[-6%] h-96 w-96 bg-amber-600/10 pointer-events-none" aria-hidden="true" />
      <span className="glow-orb bottom-[-10%] right-[-6%] h-96 w-96 bg-orange-600/10 pointer-events-none" aria-hidden="true" />

      {/* Header bar */}
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Dining Categories"
            title="Explore Our Vegetarian Kitchen"
            subtitle="Authentic Jaffna heritage recipes &amp; South Indian vegetarian specialties prepared fresh daily."
          />

          <div className="flex items-center gap-3">
            <span className="hidden md:inline-flex items-center gap-1.5 rounded-full border border-amber-500/25 bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-300/90">
              <Compass className="h-3.5 w-3.5" />
              Scroll or drag anytime • Runs automatically
            </span>

            <Link
              to="/categories"
              className="group inline-flex items-center gap-2 text-sm font-bold text-amber-400 hover:text-amber-300 transition-colors shrink-0 pb-1"
            >
              <span>View All Categories</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>

      {/* ── DUAL OPPOSITE DIRECTION SCROLLABLE MARQUEE ── */}
      <div className="relative w-full overflow-hidden">
        {/* Left & Right Smooth Edge Fade Masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-28 bg-gradient-to-r from-[#0d0f12] via-[#0d0f12]/80 to-transparent z-20" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-28 bg-gradient-to-l from-[#0d0f12] via-[#0d0f12]/80 to-transparent z-20" />

        {/* ROW 1: Running Leftward (Interactive & User-Scrollable) */}
        <div className="mb-3 sm:mb-4">
          <ScrollableMarqueeTrack items={row1Categories} direction="left" speed={0.55} />
        </div>

        {/* ROW 2: Running Rightward (Opposite Direction, Interactive & User-Scrollable) */}
        <div>
          <ScrollableMarqueeTrack items={row2Categories} direction="right" speed={0.55} />
        </div>
      </div>
    </section>
  );
}
