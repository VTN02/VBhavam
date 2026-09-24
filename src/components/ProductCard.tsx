import { Link } from "@tanstack/react-router";
import { Clock, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { formatPrice, type Product } from "@/data/products";

export function ProductCard({ product }: { product: Product }) {
  const isAvailable = product.available;
  const isPriceFixed = product.price > 0;

  return (
    <motion.article
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 450, damping: 25 }}
      className="group relative flex aspect-[3/4] w-full flex-col overflow-hidden rounded-2xl border border-amber-500/15 bg-[#151922] shadow-soft backdrop-blur-xl transition-all duration-300 hover:border-amber-500/40 hover:shadow-[0_15px_30px_-10px_rgba(245,158,11,0.15)]"
    >
      {/* Top subtle golden highlight */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-amber-400/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-10"
        aria-hidden="true"
      />

      {/* Whole Card Clickable Link */}
      <Link
        to="/products/$id"
        params={{ id: product.id }}
        aria-label={`View ${product.name}, ${formatPrice(product)}`}
        className="flex h-full w-full flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-2xl overflow-hidden"
      >
        {/* Dish Image — 3 Parts (75% of card height) */}
        <div className="relative block w-full h-[75%] overflow-hidden bg-[#0e1118]">
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#151922] via-transparent to-transparent opacity-60 z-10"
            aria-hidden="true"
          />

          <img
            src={product.image || "/images/dishes/fallback-food.svg"}
            alt={`${product.name} dish photo`}
            loading="lazy"
            width={800}
            height={600}
            onError={(e) => {
              const target = e.currentTarget;
              if (!target.src.endsWith("/images/dishes/fallback-food.svg")) {
                target.src = "/images/dishes/fallback-food.svg";
              }
            }}
            className="relative h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />

          {/* Top Badges */}
          <div className="absolute top-2 inset-x-2 flex items-center justify-between gap-1 pointer-events-none z-20">
            {/* Item Code */}
            <span className="inline-flex items-center rounded-md border border-amber-500/30 bg-[#0d0f14]/85 px-1.5 py-0.5 text-[10px] sm:text-[11px] font-mono font-bold tracking-wider text-amber-300 backdrop-blur-md shadow-sm">
              {product.itemCode}
            </span>

            {/* Pure Veg Badge */}
            <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-950/85 px-1.5 py-0.5 text-[9px] sm:text-[10px] font-bold text-emerald-300 backdrop-blur-md shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
              Pure Veg
            </span>
          </div>

          {/* Category / Specialty Tag on image */}
          <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between gap-1 pointer-events-none z-20">
            <span className="rounded-md border border-white/10 bg-black/60 px-1.5 py-0.5 text-[9px] sm:text-[10px] font-semibold text-slate-200 backdrop-blur-md truncate">
              {product.category}
            </span>
            {product.tag && (
              <span className="rounded-md border border-amber-400/30 bg-amber-500/20 px-1.5 py-0.5 text-[9px] sm:text-[10px] font-bold text-amber-200 backdrop-blur-md shrink-0">
                {product.tag}
              </span>
            )}
          </div>
        </div>

        {/* Dish Info — 1 Part (25% of card height) -> 3:1 Image : Other Things */}
        <div className="flex h-[25%] w-full flex-col justify-center px-2.5 py-1.5 sm:px-3 sm:py-2 gap-1 border-t border-white/[0.06] bg-[#151922]">
          {/* Row 1: Dish Name & Popular Tag */}
          <div className="flex items-center justify-between gap-1.5 min-w-0">
            <h3 className="text-xs sm:text-sm font-bold leading-tight text-white transition-colors duration-200 group-hover:text-amber-400 truncate">
              {product.name}
            </h3>
            {product.isFeatured && (
              <span className="shrink-0 inline-flex items-center gap-0.5 text-[9px] sm:text-[10px] font-semibold text-amber-400 bg-amber-400/10 px-1 sm:px-1.5 py-0.5 rounded border border-amber-400/20">
                <Sparkles className="h-2 w-2 sm:h-2.5 sm:w-2.5" />
                <span className="hidden min-[380px]:inline">Popular</span>
              </span>
            )}
          </div>

          {/* Row 2: Price & Timing */}
          <div className="flex items-center justify-between gap-1.5 pt-0.5">
            <div className="flex items-baseline gap-1">
              <span className="text-xs sm:text-base font-extrabold text-amber-400 tracking-tight leading-none">
                {formatPrice(product)}
              </span>
            </div>

            {product.timing ? (
              <div className="flex items-center gap-1 text-[9px] sm:text-[10px] font-medium text-amber-300/80 truncate">
                <Clock className="h-2.5 w-2.5 shrink-0 text-amber-400" />
                <span className="truncate">{product.timing}</span>
              </div>
            ) : (
              <span className="text-[9px] sm:text-[10px] font-medium text-slate-400 truncate max-w-[100px]">
                {product.warranty}
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
    <div className="aspect-[3/4] overflow-hidden rounded-2xl border border-white/[0.08] bg-[#151922] flex flex-col">
      <div className="skeleton h-[75%] w-full" />
      <div className="h-[25%] p-2.5 sm:p-3 flex flex-col justify-between">
        <div className="flex justify-between items-center">
          <div className="skeleton h-3 w-20 rounded" />
          <div className="skeleton h-3 w-10 rounded" />
        </div>
        <div className="flex justify-between items-center pt-1">
          <div className="skeleton h-4 w-12 rounded" />
          <div className="skeleton h-3 w-16 rounded" />
        </div>
      </div>
    </div>
  );
}
