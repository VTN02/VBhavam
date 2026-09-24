import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Clock, MapPin, Navigation, Sparkles, Utensils, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { site } from "@/config/site";
import { formatPrice, getProduct, relatedProducts } from "@/data/products";
import { cn } from "@/lib/utils";
import { ProductGrid } from "@/components/ProductGrid";
import { SectionHeading } from "@/components/SectionHeading";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const Route = createFileRoute("/products/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Dish not found" }, { name: "robots", content: "noindex" }],
      };
    }
    const { product } = loaderData;
    const title = `${product.itemCode} ${product.name} — ${site.name} Vegetarian Restaurant`;
    const description = `${product.shortDescription} ${formatPrice(product)} at Vishnu Bhavan, No. 350 Jaffna–Kankesanturai Road.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "restaurant.menu_item" },
        { property: "og:url", content: `/products/${params.id}` },
      ],
      links: [{ rel: "canonical", href: `/products/${params.id}` }],
    };
  },
  notFoundComponent: ProductNotFound,
  component: ProductDetails,
});

function ProductNotFound() {
  return (
    <div className="mx-auto max-w-md px-4 py-24 text-center">
      <h1 className="text-2xl font-extrabold text-white">Dish not found</h1>
      <p className="mt-3 text-sm text-slate-400">
        This menu item may have been relocated or the link is incorrect.
      </p>
      <Link
        to="/products"
        className="mt-6 inline-flex h-12 items-center rounded-xl bg-amber-500 px-6 text-sm font-bold text-black shadow-lg shadow-amber-500/20"
      >
        Back to Digital Menu
      </Link>
    </div>
  );
}

function ProductDetails() {
  const { product } = Route.useLoaderData();
  const related = relatedProducts(product);
  const isPriceFixed = product.price > 0;

  return (
    <div className="relative overflow-hidden py-10 sm:py-14 lg:py-16 bg-[#0d0f14] min-h-screen text-slate-200">
      <span className="glow-orb top-[-10%] right-[-8%] h-96 w-96 bg-amber-600/15" aria-hidden="true" />
      <span className="glow-orb bottom-[-10%] left-[-8%] h-96 w-96 bg-orange-500/10" aria-hidden="true" />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Breadcrumbs
            className="mb-0"
            items={[
              { label: "Digital Menu", to: "/products" },
              {
                label: product.category,
                to: `/products?category=${encodeURIComponent(product.category)}`,
              },
              { label: `${product.itemCode} ${product.name}` },
            ]}
          />
          <Link
            to="/products"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-amber-400 hover:text-amber-300 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span>Back to Digital Menu</span>
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-14">
          {/* Dish Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="absolute -inset-4 rounded-3xl bg-amber-500/10 opacity-30 blur-2xl" aria-hidden="true" />
            <div className="relative overflow-hidden rounded-2xl border border-amber-500/20 bg-[#0d101a] shadow-2xl">
              <img
                src={product.image || "/images/dishes/fallback-food.svg"}
                alt={`${product.name} dish photo`}
                width={800}
                height={600}
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.src.endsWith("/images/dishes/fallback-food.svg")) {
                    target.src = "/images/dishes/fallback-food.svg";
                  }
                }}
                className="w-full aspect-[4/3] object-cover"
              />
              <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                <span className="inline-flex items-center rounded-lg border border-amber-500/40 bg-black/80 px-2.5 py-1 text-xs font-mono font-bold text-amber-300 backdrop-blur-md">
                  {product.itemCode}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-950/80 px-3 py-1 text-xs font-bold text-emerald-300 backdrop-blur-md">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  100% Pure Veg
                </span>
              </div>
            </div>
          </motion.div>

          {/* Dish Info */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold tracking-[0.16em] text-amber-400 uppercase">
                {product.category}
              </span>
              {product.tag && (
                <span className="rounded-md border border-amber-400/30 bg-amber-500/15 px-2 py-0.5 text-[10px] font-bold text-amber-200">
                  {product.tag}
                </span>
              )}
            </div>

            <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl text-white">
              {product.name}
            </h1>

            {/* Price Badge */}
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <span
                className={cn(
                  "font-extrabold tracking-tight",
                  isPriceFixed
                    ? "text-3xl text-amber-400"
                    : "text-lg font-semibold text-slate-300"
                )}
              >
                {formatPrice(product)}
              </span>

              {product.timing && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-semibold text-slate-300">
                  <Clock className="h-3.5 w-3.5 text-amber-400" />
                  {product.timing}
                </span>
              )}
            </div>

            <p className="mt-6 text-base leading-relaxed text-slate-300">
              {product.description}
            </p>

            {/* Preparation Details */}
            <div className="mt-8">
              <h2 className="text-xs font-bold tracking-[0.14em] text-amber-400 uppercase">
                Dish Details &amp; Preparation
              </h2>
              <dl className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {product.specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="relative overflow-hidden rounded-xl border border-white/[0.08] bg-[#141824] px-4 py-3 shadow-md"
                  >
                    <dt className="text-xs font-medium text-slate-400">{spec.label}</dt>
                    <dd className="mt-0.5 text-sm font-semibold text-white">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Assurances */}
            <ul className="mt-6 space-y-2.5 text-xs sm:text-sm text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 shrink-0 text-emerald-400" aria-hidden="true" />
                <span>100% Pure Vegetarian Kitchen • Authentic Sattvic Preparation</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 shrink-0 text-emerald-400" aria-hidden="true" />
                <span>Served hot &amp; fresh daily on Jaffna–Kankesanturai Road</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 shrink-0 text-emerald-400" aria-hidden="true" />
                <span>Dine-In &amp; Takeaway Service Available</span>
              </li>
            </ul>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <motion.a
                href={site.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileTap={{ scale: 0.98 }}
                whileHover={{ brightness: 1.05 }}
                className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 px-6 text-sm font-bold text-stone-950 shadow-lg shadow-amber-500/20 transition-all text-center"
              >
                <Navigation className="h-4 w-4 fill-stone-950" />
                <span>Get Directions to Restaurant</span>
              </motion.a>

              <motion.div whileTap={{ scale: 0.98 }}>
                <Link
                  to="/products"
                  search={{ category: product.category }}
                  className="inline-flex h-12 w-full items-center justify-center rounded-xl border border-white/15 bg-white/[0.04] px-6 text-sm font-semibold text-slate-200 hover:bg-white/[0.08] hover:text-white transition-colors text-center"
                >
                  <span>View More in {product.category}</span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Related Dishes */}
        {related.length > 0 ? (
          <section className="mt-20">
            <SectionHeading
              align="left"
              eyebrow="More Favorites"
              title={`Related Dishes in ${product.category}`}
              className="max-w-xl"
            />
            <div className="mt-8">
              <ProductGrid products={related} />
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );
}
