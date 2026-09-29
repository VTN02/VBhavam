import { useState, useMemo } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Search, X, Utensils, Sparkles, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { site } from "@/config/site";
import { products } from "@/data/products";
import { SectionHeading } from "@/components/SectionHeading";
import { ProductCard } from "@/components/ProductCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";

const title = `Our Complete Food Menu — ${site.name} Pure Vegetarian Restaurant`;
const description =
  "Explore authentic South Indian breakfasts, traditional Jaffna rice meals, evening tiffins, sweets, and beverages at Vishnu Bhavan. 100% Pure Vegetarian Kitchen.";

const categories = [
  { label: "All", count: 83 },
  { label: "Breakfast & All Time", count: 24, timing: "6:00 AM – 10:00 PM" },
  { label: "Lunch", count: 7, timing: "11:00 AM – 3:00 PM" },
  { label: "Evening Special", count: 11, timing: "4:00 PM – 10:00 PM" },
  { label: "Diabetes Special", count: 8 },
  { label: "Jaffna Palakaaram", count: 6 },
  { label: "Indian Sweets", count: 7 },
  { label: "Beverages", count: 20 },
];

export const Route = createFileRoute("/products/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/products" },
    ],
    links: [{ rel: "canonical", href: "/products" }],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    let result = products;

    if (selectedCategory !== "All") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    return result;
  }, [selectedCategory, searchQuery]);

  return (
    <div className="relative overflow-hidden py-10 sm:py-14 lg:py-16 min-h-screen bg-[#0a0c10]">
      <span className="glow-orb top-[-10%] left-[-8%] h-96 w-96 bg-amber-500/10" aria-hidden="true" />
      <span className="glow-orb bottom-[-10%] right-[-5%] h-80 w-80 bg-orange-500/8" aria-hidden="true" />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={
            selectedCategory && selectedCategory !== "All"
              ? [
                  { label: "Digital Menu", to: "/products" },
                  { label: selectedCategory },
                ]
              : [{ label: "Digital Menu" }]
          }
        />
        <SectionHeading
          as="h1"
          eyebrow="100% Pure Vegetarian Kitchen"
          title="Our Complete Food Menu"
          subtitle="Explore authentic South Indian breakfasts, traditional Jaffna rice meals, evening tiffins, sweets, and beverages."
        />

        {/* Search Bar */}
        <div className="mt-8 max-w-lg mx-auto">
          <div className="relative flex items-center rounded-2xl border border-amber-500/20 bg-[#141722] px-4 py-3 shadow-lg backdrop-blur-md">
            <Search className="h-4 w-4 text-amber-400 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dish name, e.g. Masala Dosai, Kool, Pittu…"
              aria-label="Search food menu"
              className="w-full bg-transparent px-3 text-sm text-white placeholder-slate-400 outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="text-slate-400 hover:text-white p-1"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Category Tabs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.label;
            return (
              <motion.button
                key={cat.label}
                type="button"
                whileTap={{ scale: 0.94 }}
                onClick={() => setSelectedCategory(cat.label)}
                className={`group relative inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold transition-colors duration-200 outline-none cursor-pointer ${
                  isActive ? "text-stone-950 font-extrabold" : "text-slate-300 hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeMenuPill"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 shadow-lg shadow-amber-500/30"
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  />
                )}
                {!isActive && (
                  <span className="absolute inset-0 rounded-full border border-white/10 bg-[#141722] group-hover:border-amber-400/40 transition-colors" />
                )}
                <span className="relative z-10">{cat.label}</span>
                <span
                  className={`relative z-10 rounded-full px-1.5 py-0.5 text-[10px] font-extrabold transition-colors ${
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

        {/* Active category header strip */}
        <div className="mt-6 flex items-center justify-between border-b border-white/[0.08] pb-4">
          <div className="flex items-center gap-2">
            <Utensils className="h-4 w-4 text-amber-400" />
            <span className="text-sm font-extrabold text-white">{selectedCategory}</span>
            <span className="text-xs text-slate-400">
              ({filtered.length} {filtered.length === 1 ? "item" : "items"})
            </span>
          </div>

          {/* Timing badge */}
          {categories.find((c) => c.label === selectedCategory)?.timing && (
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
              <Clock className="h-3 w-3" />
              {categories.find((c) => c.label === selectedCategory)?.timing}
            </span>
          )}
        </div>

        {/* 4-Column Product Grid */}
        <motion.div
          layout
          className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((product, idx) => (
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
                  delay: Math.min(idx * 0.012, 0.2),
                }}
                className="w-full"
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center py-20">
            <Sparkles className="h-10 w-10 text-amber-400/50 mx-auto mb-4" />
            <p className="text-base text-slate-400">No dishes match your search.</p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors"
            >
              Show all dishes
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
