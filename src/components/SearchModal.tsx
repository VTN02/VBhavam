import { useEffect, useRef, useState, useMemo } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "@tanstack/react-router";
import { Search, X, ArrowRight, TrendingUp, Sparkles, Layers } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { products, categories, formatPrice, type Product } from "@/data/products";
import { setSearchActive } from "@/utils/searchEvents";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const popularSearches = [
  "String Hoppers",
  "Masala Dosai",
  "Rice & Curry",
  "Pittu Kottu",
  "Ghee Dosai",
  "Odyal Kool",
  "Mysore Pak",
  "Kurakkan String Hoppers",
];

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [mounted, setMounted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Focus input on open & lock background scroll
  useEffect(() => {
    setSearchActive(isOpen);
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 80);
    } else {
      document.body.style.overflow = "";
      setQuery("");
    }
    return () => {
      document.body.style.overflow = "";
      setSearchActive(false);
    };
  }, [isOpen]);

  // Global ESC shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Live Matching Products
  const matchingProducts = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.specs?.some(
            (s) =>
              s.label.toLowerCase().includes(q) ||
              s.value.toLowerCase().includes(q),
          ),
      )
      .slice(0, 5);
  }, [query]);

  // Live Matching Categories
  const matchingCategories = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return categories.filter((cat) => cat.toLowerCase().includes(q));
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate({ to: "/products", search: { q: query.trim() } });
      onClose();
    }
  };

  const handleSelectTerm = (term: string) => {
    navigate({ to: "/products", search: { q: term } });
    onClose();
  };

  const handleSelectCategory = (cat: string) => {
    navigate({ to: "/products", search: { category: cat } });
    onClose();
  };

  const handleSelectProduct = (product: Product) => {
    navigate({ to: "/products/$id", params: { id: product.id } });
    onClose();
  };

  if (!mounted) return null;

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-start justify-center overflow-y-auto px-3 py-6 sm:px-6 pt-16 sm:pt-24">
          {/* Backdrop Blur Scrim */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Dialog Modal Card */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Search restaurant menu"
            initial={{ opacity: 0, scale: 0.96, y: -16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -16 }}
            transition={{ type: "spring", stiffness: 450, damping: 32 }}
            className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-amber-500/20 bg-[#12161f] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95)] ring-1 ring-white/10 z-10"
          >
            {/* Top Amber Glow Accent */}
            <div className="h-[2.5px] w-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600" />

            {/* Search Input Bar Header */}
            <form
              onSubmit={handleSubmit}
              className="relative flex items-center gap-3 border-b border-white/[0.08] px-4 py-3.5 sm:px-5 sm:py-4"
            >
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-amber-500/15 text-amber-400">
                <Search className="h-5 w-5" aria-hidden="true" />
              </div>

              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search dishes, item code (e.g. #050, String Hoppers, Kool, Dosai)..."
                aria-label="Search dishes, numbers, or food categories"
                className="w-full bg-transparent text-base font-medium text-white placeholder-slate-400 outline-none"
              />

              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="rounded-lg p-2 text-slate-400 hover:bg-white/[0.08] hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-amber-500"
                  aria-label="Clear search input"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              )}

              <button
                type="submit"
                className="inline-flex h-10 items-center justify-center rounded-xl bg-amber-500 px-4 text-xs font-bold text-slate-950 shadow-md shadow-amber-500/30 hover:bg-amber-400 active:scale-95 transition-all shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Search
              </button>

              <button
                type="button"
                onClick={onClose}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-slate-400 hover:bg-white/[0.08] hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                aria-label="Close search dialog"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </form>

            {/* Modal Body / Results / Trending */}
            <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-5 space-y-5">
              {/* If user is typing and results exist */}
              {query.trim() ? (
                <>
                  {/* Matching Categories */}
                  {matchingCategories.length > 0 && (
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-amber-400 mb-2.5 flex items-center gap-1.5">
                        <Layers className="h-3.5 w-3.5" />
                        Matched Menu Categories
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {matchingCategories.map((cat) => (
                          <button
                            key={cat}
                            type="button"
                            onClick={() => handleSelectCategory(cat)}
                            className="inline-flex items-center gap-1.5 rounded-xl border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-xs font-semibold text-amber-300 hover:bg-amber-500/20 hover:text-white transition-colors"
                          >
                            <span>{cat}</span>
                            <ArrowRight className="h-3 w-3" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Matching Products List */}
                  {matchingProducts.length > 0 ? (
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400 mb-2.5 flex items-center gap-1.5">
                        <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                        Matching Dishes
                      </p>
                      <div className="space-y-2">
                        {matchingProducts.map((product) => (
                          <div
                            key={product.id}
                            onClick={() => handleSelectProduct(product)}
                            className="group flex items-center gap-3.5 rounded-xl border border-transparent p-2.5 hover:border-amber-500/20 hover:bg-white/[0.06] cursor-pointer transition-all duration-200"
                          >
                            <img
                              src={product.image || "/images/dishes/fallback-food.svg"}
                              alt={product.name}
                              onError={(e) => {
                                const target = e.currentTarget;
                                if (!target.src.endsWith("/images/dishes/fallback-food.svg")) {
                                  target.src = "/images/dishes/fallback-food.svg";
                                }
                              }}
                              className="h-12 w-12 rounded-lg object-cover bg-[#0d101a] shrink-0 border border-white/10"
                            />
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2">
                                <span className="rounded-md bg-emerald-500/15 border border-emerald-500/30 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-400">
                                  Pure Veg
                                </span>
                                <span className="rounded-md bg-amber-500/15 px-1.5 py-0.5 text-[10px] font-semibold text-amber-300">
                                  {product.category}
                                </span>
                              </div>
                              <p className="mt-1 text-xs sm:text-sm font-bold text-white group-hover:text-amber-300 truncate transition-colors">
                                {product.name}
                              </p>
                            </div>
                            <div className="text-right shrink-0">
                              <p className="text-xs sm:text-sm font-extrabold text-amber-400">
                                {formatPrice(product)}
                              </p>
                              <span className="text-[10px] text-amber-400/80 flex items-center justify-end gap-0.5 group-hover:underline">
                                View <ArrowRight className="h-2.5 w-2.5" />
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* View All Matches Button */}
                      <button
                        type="button"
                        onClick={handleSubmit}
                        className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-[#191e2b] py-2.5 text-xs font-semibold text-slate-200 hover:bg-amber-500 hover:text-slate-950 transition-all"
                      >
                        <span>See all menu results for "{query}"</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ) : (
                    <div className="py-6 text-center">
                      <p className="text-sm font-medium text-slate-300">
                        No dishes directly matched "<span className="text-white font-bold">{query}</span>"
                      </p>
                      <p className="mt-1 text-xs text-slate-400">
                        Press Enter to search the entire food catalog, or select from popular dishes below.
                      </p>
                    </div>
                  )}
                </>
              ) : null}

              {/* Popular / Trending Searches */}
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400 mb-2.5 flex items-center gap-1.5">
                  <TrendingUp className="h-3.5 w-3.5 text-amber-400" />
                  Popular Dishes
                </p>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => handleSelectTerm(term)}
                      className="inline-flex items-center gap-1 rounded-xl border border-white/10 bg-[#161b26] px-3 py-1.5 text-xs font-medium text-slate-300 hover:border-amber-500/40 hover:bg-[#202738] hover:text-amber-300 transition-all active:scale-95"
                    >
                      <Search className="h-3 w-3 text-slate-400" />
                      <span>{term}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Dialog Footer with Shortcuts */}
            <div className="flex items-center justify-between border-t border-white/[0.08] bg-[#0a0d16] px-4 py-2.5 text-[11px] text-slate-400">
              <div className="flex items-center gap-2">
                <span className="hidden sm:inline">Navigate:</span>
                <span className="inline-flex items-center gap-1 rounded bg-white/10 px-1.5 py-0.5 text-[10px] font-medium text-slate-300">
                  Enter ↵
                </span>
                <span className="hidden sm:inline">to search</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span>Close:</span>
                <span className="inline-flex items-center gap-1 rounded bg-white/10 px-1.5 py-0.5 text-[10px] font-medium text-slate-300">
                  ESC
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}
