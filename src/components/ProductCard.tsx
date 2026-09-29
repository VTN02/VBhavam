import { Link } from "@tanstack/react-router";
import { Clock, Sparkles, ChefHat } from "lucide-react";
import { motion } from "framer-motion";
import { formatPrice, type Product } from "@/data/products";

export function ProductCard({ product }: { product: Product }) {
  const isAvailable = product.available;

  return (
    <motion.article
      whileHover={{ y: -6, scale: 1.01 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 450, damping: 25 }}
      className="group relative flex flex-col w-full h-[260px] sm:h-[370px] lg:h-[410px] overflow-hidden rounded-lg border border-white/[0.07] bg-gradient-to-b from-[#161b27] to-[#0f1219] shadow-xl transition-all duration-300 hover:border-amber-500/35 hover:shadow-[0_20px_50px_-10px_rgba(245,158,11,0.18)] cursor-pointer"
    >
      {/* Amber top glow line */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-amber-400/90 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-20"
        aria-hidden="true"
      />

      <Link
        to="/products/$id"
        params={{ id: product.id }}
        aria-label={`View ${product.name}, ${formatPrice(product)}`}
        className="flex h-full w-full flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-lg overflow-hidden"
      >
        {/* ── IMAGE SECTION (75% OF CARD) ── */}
        <div className="relative block w-full h-[75%] overflow-hidden bg-[#0e1118]">
          {/* Gradient overlay for readability and smooth transition */}
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#141824] via-transparent to-black/20 z-10"
            aria-hidden="true"
          />

          <img
            src={product.image || "/images/dishes/fallback-food.svg"}
            alt={`${product.name} dish`}
            loading="lazy"
            width={480}
            height={360}
            onError={(e) => {
              const target = e.currentTarget;
              if (!target.src.endsWith("/images/dishes/fallback-food.svg")) {
                target.src = "/images/dishes/fallback-food.svg";
              }
            }}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />

          {/* TOP: Pure Veg badge */}
          <div className="absolute top-2 right-2 sm:top-2.5 sm:right-2.5 z-20 pointer-events-none">
            <span className="inline-flex items-center gap-1 rounded-md border border-emerald-500/40 bg-black/70 px-1.5 py-0.5 sm:px-2 text-[8.5px] sm:text-[10px] font-bold text-emerald-300 backdrop-blur-md shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
              Pure Veg
            </span>
          </div>

          {/* TOP LEFT: Featured badge */}
          {product.isFeatured && (
            <div className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 z-20 pointer-events-none">
              <span className="inline-flex items-center gap-1 rounded-md border border-amber-500/40 bg-black/70 px-1.5 py-0.5 sm:px-2 text-[8.5px] sm:text-[10px] font-bold text-amber-300 backdrop-blur-md shadow-sm">
                <Sparkles className="h-2 w-2 sm:h-2.5 sm:w-2.5" />
                Popular
              </span>
            </div>
          )}

          {/* BOTTOM: Tag badge (if any) */}
          {product.tag && (
            <div className="absolute bottom-2 left-2 sm:bottom-2.5 sm:left-2.5 z-20 pointer-events-none">
              <span className="rounded-md border border-amber-400/30 bg-black/60 px-1.5 py-0.5 sm:px-2 text-[8.5px] sm:text-[10px] font-semibold text-amber-200 backdrop-blur-md">
                {product.tag}
              </span>
            </div>
          )}
        </div>

        {/* ── CONTENT SECTION (25% OF CARD) ── */}
        <div className="flex flex-col justify-between h-[25%] px-2.5 py-1.5 sm:px-3.5 sm:py-2.5 bg-gradient-to-b from-[#141824] to-[#0f1219]">
          <div className="min-w-0">
            {/* Category chip & availability status */}
            <div className="flex items-center justify-between gap-1 mb-0.5 sm:mb-1">
              <span className="inline-flex items-center gap-0.5 sm:gap-1 rounded-md bg-white/[0.06] border border-white/[0.08] px-1 py-0.5 sm:px-1.5 text-[8px] sm:text-[10px] font-semibold text-slate-400 truncate max-w-[65%]">
                <ChefHat className="h-2 w-2 sm:h-2.5 sm:w-2.5 text-amber-500/70 shrink-0" />
                <span className="truncate">{product.category}</span>
              </span>

              <span className="inline-flex items-center gap-1 text-[8.5px] sm:text-[9px] font-semibold shrink-0">
                <span className={`h-1.5 w-1.5 rounded-full ${isAvailable ? "bg-emerald-400" : "bg-red-400"}`} />
                <span className={`text-[8.5px] sm:text-[9px] ${isAvailable ? "text-emerald-400" : "text-red-400"}`}>
                  {isAvailable ? "Available" : "Sold Out"}
                </span>
              </span>
            </div>

            {/* Dish Name */}
            <h3 className="text-xs sm:text-base font-bold leading-tight text-white transition-colors duration-200 group-hover:text-amber-300 truncate">
              {product.name}
            </h3>
          </div>

          {/* ── BOTTOM ROW: Price + Timing ── */}
          <div className="flex items-center justify-between gap-1.5 pt-1 border-t border-white/[0.06]">
            <div className="flex items-baseline gap-1">
              {product.price > 0 ? (
                <span className="text-xs sm:text-base font-extrabold text-amber-400 tracking-tight leading-none">
                  {formatPrice(product)}
                </span>
              ) : (
                <span className="text-[9px] sm:text-xs font-semibold text-slate-400">Price on inquiry</span>
              )}
            </div>

            {product.timing && (
              <span className="inline-flex items-center gap-0.5 text-[8.5px] sm:text-[10px] text-slate-400 font-medium shrink-0">
                <Clock className="h-2 w-2 sm:h-2.5 sm:w-2.5 text-amber-500/70" />
                <span>{product.timing.split("–")[0].trim()}+</span>
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col w-full h-[260px] sm:h-[370px] lg:h-[410px] overflow-hidden rounded-lg border border-white/[0.07] bg-[#161b27] animate-pulse">
      <div className="w-full h-[75%] bg-white/[0.06]" />
      <div className="flex flex-col justify-between h-[25%] p-2.5 sm:p-3">
        <div className="flex justify-between items-center">
          <div className="h-2.5 w-14 bg-white/[0.06] rounded" />
          <div className="h-2 w-8 bg-white/[0.06] rounded" />
        </div>
        <div className="h-3.5 w-3/4 bg-white/[0.06] rounded" />
        <div className="h-3.5 w-1/3 bg-amber-500/10 rounded" />
      </div>
    </div>
  );
}
