import { useRef, useEffect, useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock, Layers, Sparkles, Tag, Utensils, Navigation } from "lucide-react";
import { motion } from "framer-motion";
import { site } from "@/config/site";
import { categories, products, formatPrice, type Category } from "@/data/products";
import { SectionHeading } from "@/components/SectionHeading";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Reveal } from "@/components/Reveal";
import heroFeast from "@/assets/hero-feast.jpg";
import lunchFeast from "@/assets/lunch-feast.jpg";
import eveningSpecial from "@/assets/evening-special.jpg";
import sweetsPalakaaram from "@/assets/sweets-palakaaram.jpg";

type CategoryDetails = {
  name: Category;
  tagline: string;
  image: string;
  featuredTags: string[];
  popularBrands: string[];
  timing?: string;
};

const categoryMetadata: Record<Category, Omit<CategoryDetails, "name">> = {
  "Breakfast & All Time": {
    tagline: "String hoppers, idly, dosai, pittu, vadai, poori sets & morning specialties",
    image: heroFeast,
    featuredTags: ["String Hoppers", "Idly", "Dosai", "Ulundu Vadai", "Poori Set"],
    popularBrands: ["All-Day Service", "6:00 AM – 10:00 PM", "Fresh Daily"],
    timing: "6:00 AM – 10:00 PM",
  },
  "Lunch": {
    tagline: "Traditional vegetarian Rice & Curry, Budget pack & Jaffna Special Lunch",
    image: lunchFeast,
    featuredTags: ["Rice & Curry", "Jaffna Special", "Budget Pack", "Varaku Rice", "Curd Rice"],
    popularBrands: ["Midday Specials", "11:00 AM – 3:00 PM", "Banana Leaf Feast"],
    timing: "11:00 AM – 3:00 PM",
  },
  "Evening Special": {
    tagline: "Crispy ghee & masala dosai, pittu kottu, rotti kottu & string hoppers biryani",
    image: eveningSpecial,
    featuredTags: ["Masala Dosai", "Ghee Dosai", "Pittu Kottu", "Rotti Kottu", "Biryani"],
    popularBrands: ["Fresh Evening Tiffin", "4:00 PM – 10:00 PM", "Sizzling Tawa"],
    timing: "4:00 PM – 10:00 PM",
  },
  "Diabetes Special": {
    tagline: "Wholesome traditional finger millet (Kurakkan) and whole wheat (Attama) grain meals",
    image: heroFeast,
    featuredTags: ["Kurakkan String Hoppers", "Kurakkan Dosai", "Attama Rotti", "Low GI"],
    popularBrands: ["Traditional Grains", "Diabetic Friendly", "Stone Ground"],
  },
  "Jaffna Palakaaram": {
    tagline: "Steamed Kolukattai, Mothakam, Payathampaniyaram, Muruku & iconic Odyal Kool",
    image: sweetsPalakaaram,
    featuredTags: ["Kolukattai", "Mothakam", "Odyal Kool", "Muruku", "Payathampaniyaram"],
    popularBrands: ["Jaffna Heritage", "Traditional Sweets", "Palmyrah Odyal"],
  },
  "Indian Sweets": {
    tagline: "Authentic Mysore Pak, Jaangiri, Rava Laddoo, Boondi Laddoo & Kesari",
    image: sweetsPalakaaram,
    featuredTags: ["Mysore Pak", "Jaangiri", "Rava Laddoo", "Kesari", "Soan Papdi"],
    popularBrands: ["Pure Desi Ghee", "Festive Mithai", "Cardamom & Saffron"],
  },
  "Beverages": {
    tagline: "Fresh hot Ceylon tea, ginger plain tea, coffee, cold drinks & bottled water",
    image: heroFeast,
    featuredTags: ["Ceylon Tea", "Ginger Tea", "Nescafe", "Minute Maid", "Soft Drinks"],
    popularBrands: ["Hot Brews", "Chilled Refreshments", "Purified Water"],
  },
};

const title = `Menu Categories — Pure Vegetarian Dining | ${site.name}`;
const description =
  "Explore all 7 food categories at Vishnu Bhavan: Breakfast & All Time, Midday Lunch, Evening Specials, Diabetes Food, Jaffna Palakaaram, Sweets & Beverages.";

export const Route = createFileRoute("/categories")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "restaurant" },
      { property: "og:url", content: "/categories" },
    ],
    links: [{ rel: "canonical", href: "/categories" }],
  }),
  component: CategoriesPage,
});

function CategoriesPage() {
  return (
    <div className="relative overflow-hidden py-14 sm:py-16 lg:py-20 bg-[#0d0f14] min-h-[calc(100vh-4rem)]">
      <span className="glow-orb top-[-10%] left-[-6%] h-96 w-96 bg-amber-600/15" aria-hidden="true" />
      <span className="glow-orb bottom-[-10%] right-[-5%] h-80 w-80 bg-orange-600/10" aria-hidden="true" />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Menu Categories" }]} />

        <SectionHeading
          as="h1"
          eyebrow="100% Pure Vegetarian Kitchen"
          title="Digital Menu Categories"
          subtitle="Explore our 7 culinary categories featuring authentic South Indian staples and traditional Jaffna heritage specialties."
        />

        {/* Categories Quick Pills */}
        <div className="mt-5 sm:mt-8 flex flex-wrap justify-center gap-1.5 sm:gap-2">
          {categories.map((cat) => {
            const catProducts = products.filter((p) => p.category === cat);
            return (
              <Link
                key={cat}
                to="/products"
                search={{ category: cat }}
                className="group inline-flex items-center gap-1 sm:gap-2 rounded-full border border-amber-500/20 bg-[#141722] px-2.5 py-1 sm:px-3.5 sm:py-1.5 text-[11px] sm:text-xs font-semibold text-slate-300 transition-all duration-200 hover:border-amber-400 hover:text-white"
              >
                <span>{cat}</span>
                <span className="rounded-full bg-amber-500/15 text-amber-300 px-1.5 py-0.5 text-[9px] sm:text-[10px] font-bold">
                  {catProducts.length}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Categories Grid - 2 per row */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {categories.map((cat, index) => {
            const meta = categoryMetadata[cat];
            const catProducts = products.filter((p) => p.category === cat);
            const pricedProducts = catProducts.filter((p) => p.price > 0);
            const minPrice = pricedProducts.length > 0
              ? Math.min(...pricedProducts.map((p) => p.price))
              : 0;

            return (
              <Reveal key={cat} delay={(index % 2) * 80}>
                <motion.article
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  className="h-full"
                >
                  <Link
                    to="/products"
                    search={{ category: cat }}
                    className="group relative block aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden rounded-2xl border border-amber-500/20 bg-[#0d101a] shadow-lg transition-all duration-300 hover:border-amber-500/50 hover:shadow-2xl hover:shadow-amber-500/15"
                  >
                    {/* Full-bleed Category Image */}
                    <img
                      src={meta.image || "/images/dishes/fallback-food.svg"}
                      alt={`${cat} collection`}
                      loading="lazy"
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (!target.src.endsWith("/images/dishes/fallback-food.svg")) {
                          target.src = "/images/dishes/fallback-food.svg";
                        }
                      }}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    />

                    {/* Gradient Scrim Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#090c14]/95 via-[#090c14]/50 to-black/30 transition-opacity duration-300 group-hover:via-[#090c14]/60" />

                    {/* Top Badges */}
                    <div className="absolute top-4 inset-x-4 flex items-center justify-between gap-2 z-10">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/60 px-3 py-1 text-xs font-semibold text-slate-200 backdrop-blur-md shadow-sm">
                        <Layers className="h-3.5 w-3.5 text-amber-400" aria-hidden="true" />
                        {catProducts.length} {catProducts.length === 1 ? "Item" : "Items"}
                      </span>

                      {meta.timing ? (
                        <span className="inline-flex items-center gap-1 rounded-md border border-amber-500/40 bg-black/65 px-2.5 py-1 text-xs font-bold text-amber-300 backdrop-blur-md shadow-sm">
                          <Clock className="h-3 w-3" />
                          {meta.timing}
                        </span>
                      ) : minPrice > 0 ? (
                        <span className="inline-flex items-center gap-1 rounded-md border border-amber-500/30 bg-black/60 px-2.5 py-1 text-xs font-bold text-amber-300 backdrop-blur-md shadow-sm">
                          From Rs.{minPrice}
                        </span>
                      ) : null}
                    </div>

                    {/* Letters Overlaid Directly Over the Image */}
                    <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 z-10">
                      <p className="text-[11px] font-bold tracking-[0.18em] text-amber-400 uppercase drop-shadow-sm">
                        {meta.popularBrands.join(" • ")}
                      </p>

                      <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-white tracking-tight drop-shadow-md group-hover:text-amber-300 transition-colors">
                        {cat}
                      </h2>

                      <p className="mt-1 text-xs text-slate-300 line-clamp-1">
                        {meta.tagline}
                      </p>

                      {/* Featured Tags */}
                      <div className="mt-2.5 flex flex-wrap gap-1.5">
                        {meta.featuredTags.slice(0, 4).map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-black/40 px-2 py-0.5 text-[10px] font-medium text-slate-300 backdrop-blur-sm"
                          >
                            <Tag className="h-2.5 w-2.5 text-amber-400/80" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Top Amber Highlight */}
                    <div
                      className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-20"
                      aria-hidden="true"
                    />
                  </Link>
                </motion.article>
              </Reveal>
            );
          })}
        </div>

        {/* Restaurant Dining Banner */}
        <Reveal className="mt-16">
          <div className="relative overflow-hidden rounded-2xl border border-amber-500/25 bg-gradient-to-r from-[#141824] via-[#1a1f30] to-[#141824] p-8 sm:p-12 shadow-xl">
            <span className="glow-orb top-[-20%] right-[-10%] h-64 w-64 bg-amber-500/20" aria-hidden="true" />
            <div className="relative flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-400">
                  <Sparkles className="h-3.5 w-3.5" />
                  100% Pure Vegetarian Kitchen
                </div>
                <h3 className="mt-4 text-2xl sm:text-3xl font-extrabold text-white">
                  Dine In &amp; Takeaway on KKS Road, Jaffna
                </h3>
                <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                  Join us at No. 350, Jaffna–Kankesanturai Road for fresh breakfast, traditional lunch, and evening tiffin, open daily from 6:00 AM to 10:00 PM.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 shrink-0">
                <a
                  href={site.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-3 text-sm font-bold text-black hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/20"
                >
                  <Navigation className="h-4 w-4" />
                  <span>Get Directions</span>
                </a>
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/[0.05] px-6 py-3 text-sm font-bold text-white hover:bg-white/[0.1] transition-colors"
                >
                  <span>Explore Complete Menu</span>
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
