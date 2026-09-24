import { useState, useMemo } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Search,
  SlidersHorizontal,
  X,
  RotateCcw,
  ArrowUpDown,
  Tag,
  DollarSign,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { site } from "@/config/site";
import { products, categories } from "@/data/products";
import { SectionHeading } from "@/components/SectionHeading";
import { ProductGrid } from "@/components/ProductGrid";
import { ProductFilters, type FilterState } from "@/components/ProductFilters";
import { Breadcrumbs } from "@/components/Breadcrumbs";

const title = `Digital Food Menu (83 Items) — ${site.name} Pure Vegetarian Restaurant`;
const description =
  "Explore authentic South Indian breakfasts, traditional Jaffna rice meals, evening tiffins, sweets, and beverages at Vishnu Bhavan. 100% Pure Vegetarian Kitchen.";

export type ProductSearchParams = {
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  warranty?: boolean;
  sort?: "featured" | "price-asc" | "price-desc" | "name-asc" | "rating";
  q?: string;
};

export const Route = createFileRoute("/products/")({
  validateSearch: (search: Record<string, unknown>): ProductSearchParams => {
    const params: ProductSearchParams = {};
    if (typeof search["category"] === "string" && search["category"].trim() !== "") {
      params.category = search["category"];
    }
    if (typeof search["brand"] === "string" && search["brand"].trim() !== "") {
      params.brand = search["brand"];
    }
    if (typeof search["minPrice"] === "number" || typeof search["minPrice"] === "string") {
      const n = Number(search["minPrice"]);
      if (!isNaN(n)) params.minPrice = n;
    }
    if (typeof search["maxPrice"] === "number" || typeof search["maxPrice"] === "string") {
      const n = Number(search["maxPrice"]);
      if (!isNaN(n)) params.maxPrice = n;
    }
    if (typeof search["inStock"] === "boolean") {
      params.inStock = search["inStock"];
    } else if (search["inStock"] === "true") {
      params.inStock = true;
    }
    if (typeof search["warranty"] === "boolean") {
      params.warranty = search["warranty"];
    } else if (search["warranty"] === "true") {
      params.warranty = true;
    }
    if (
      typeof search["sort"] === "string" &&
      ["featured", "price-asc", "price-desc", "name-asc", "rating"].includes(search["sort"])
    ) {
      params.sort = search["sort"] as ProductSearchParams["sort"];
    }
    if (typeof search["q"] === "string" && search["q"].trim() !== "") {
      params.q = search["q"];
    }
    return params;
  },
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
  const search = Route.useSearch();
  const navigate = Route.useNavigate();

  // Extract search params
  const category = search.category ?? "All";
  const selectedBrands = useMemo(() => {
    if (!search.brand) return [];
    return search.brand.split(",").map((b) => b.trim()).filter(Boolean);
  }, [search.brand]);
  const minPrice = search.minPrice;
  const maxPrice = search.maxPrice;
  const inStockOnly = search.inStock ?? false;
  const warrantyOnly = search.warranty ?? false;
  const sortOption = search.sort ?? "featured";
  const searchQuery = search.q ?? "";

  // Mobile drawer state
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [localQuery, setLocalQuery] = useState(searchQuery);

  // Compute available price boundaries from dataset
  const priceBounds = useMemo(() => {
    const allPrices = products.map((p) => p.price);
    return {
      min: Math.min(...allPrices),
      max: Math.max(...allPrices),
    };
  }, []);

  // Compute category item counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    products.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, []);

  // Compute brand item counts (based on current category selection)
  const availableBrands = useMemo(() => {
    const counts: Record<string, number> = {};
    const relevantProducts =
      category === "All"
        ? products
        : products.filter((p) => p.category === category);

    relevantProducts.forEach((p) => {
      counts[p.brand] = (counts[p.brand] || 0) + 1;
    });

    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
  }, [category]);

  const updateSearch = (newParams: Partial<ProductSearchParams>) => {
    navigate({
      to: ".",
      search: (prev) => {
        const merged: ProductSearchParams = { ...prev, ...newParams };
        if (merged.category === "All") delete merged.category;
        if (!merged.brand) delete merged.brand;
        if (merged.minPrice === undefined) delete merged.minPrice;
        if (merged.maxPrice === undefined) delete merged.maxPrice;
        if (!merged.inStock) delete merged.inStock;
        if (!merged.warranty) delete merged.warranty;
        if (merged.sort === "featured") delete merged.sort;
        if (!merged.q) delete merged.q;
        return merged;
      },
    });
  };

  const handleBrandToggle = (brandName: string) => {
    const current = new Set(selectedBrands);
    if (current.has(brandName)) {
      current.delete(brandName);
    } else {
      current.add(brandName);
    }
    const arr = Array.from(current);
    updateSearch({ brand: arr.length > 0 ? arr.join(",") : undefined });
  };

  const handlePriceChange = (min?: number, max?: number) => {
    updateSearch({ minPrice: min, maxPrice: max });
  };

  const clearAllFilters = () => {
    setLocalQuery("");
    navigate({
      to: ".",
      search: {},
    });
  };

  // Filter and sort products
  const filtered = useMemo(() => {
    let result = products;

    // 1. Category Filter
    if (category !== "All") {
      result = result.filter((p) => p.category === category);
    }

    // 2. Brand Filter
    if (selectedBrands.length > 0) {
      result = result.filter((p) => selectedBrands.includes(p.brand));
    }

    // 3. Price Filter
    if (minPrice !== undefined) {
      result = result.filter((p) => p.price >= minPrice);
    }
    if (maxPrice !== undefined) {
      result = result.filter((p) => p.price <= maxPrice);
    }

    // 4. In-Stock Filter
    if (inStockOnly) {
      result = result.filter((p) => p.available);
    }

    // 5. Warranty Filter
    if (warrantyOnly) {
      result = result.filter(
        (p) =>
          p.warranty &&
          !p.warranty.toLowerCase().includes("no warranty") &&
          (p.warranty.toLowerCase().includes("12") ||
            p.warranty.toLowerCase().includes("18") ||
            p.warranty.toLowerCase().includes("24")),
      );
    }

    // 6. Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
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
      );
    }

    // 7. Sort
    const sorted = [...result];
    switch (sortOption) {
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "rating":
        // Mock rating sort
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "featured":
      default:
        break;
    }

    return sorted;
  }, [
    category,
    selectedBrands,
    minPrice,
    maxPrice,
    inStockOnly,
    warrantyOnly,
    searchQuery,
    sortOption,
  ]);

  const activeFiltersCount =
    (category !== "All" ? 1 : 0) +
    selectedBrands.length +
    (minPrice !== undefined || maxPrice !== undefined ? 1 : 0) +
    (inStockOnly ? 1 : 0) +
    (warrantyOnly ? 1 : 0);

  const hasActiveFilters = activeFiltersCount > 0 || Boolean(searchQuery);

  const filterState: FilterState = {
    category,
    brands: selectedBrands,
    minPrice,
    maxPrice,
    inStockOnly,
    warrantyOnly,
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSearch({ q: localQuery.trim() ? localQuery.trim() : undefined });
  };

  return (
    <div className="relative overflow-hidden py-10 sm:py-14 lg:py-16 min-h-screen bg-section-spotlight">
      <span className="glow-orb top-[-10%] left-[-8%] h-96 w-96 bg-blue-600/18" aria-hidden="true" />
      <span className="glow-orb bottom-[-10%] right-[-5%] h-80 w-80 bg-sky-500/12" aria-hidden="true" />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={
            category && category !== "All"
              ? [
                  { label: "Digital Menu", to: "/products" },
                  { label: category },
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

        {/* TOP CONTROLS & SEARCH BAR */}
        <div className="mt-8 rounded-2xl border border-amber-500/20 bg-[#121624] p-3 sm:p-4 shadow-md backdrop-blur-xl">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            {/* Search Input Bar */}
            <form onSubmit={handleSearchSubmit} className="relative flex-1 max-w-xl">
              <div className="flex items-center rounded-xl border border-white/10 bg-[#0d101a] px-3 py-1.5 focus-within:border-amber-500 transition-colors">
                <Search className="h-4 w-4 shrink-0 text-amber-400" aria-hidden="true" />
                <input
                  type="text"
                  value={localQuery}
                  onChange={(e) => {
                    setLocalQuery(e.target.value);
                    if (e.target.value === "") {
                      updateSearch({ q: undefined });
                    }
                  }}
                  placeholder="Search dish name or item number (e.g. #050, String Hoppers, Pittu Kottu)..."
                  aria-label="Search food menu"
                  className="w-full bg-transparent px-2.5 py-1 text-base sm:text-sm text-white placeholder-slate-400 outline-none"
                />
                {localQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      setLocalQuery("");
                      updateSearch({ q: undefined });
                    }}
                    className="p-1.5 text-slate-400 hover:text-white mr-1"
                    aria-label="Clear search query"
                  >
                    <X className="h-4 w-4" aria-hidden="true" />
                  </button>
                )}
                <button
                  type="submit"
                  className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-blue-500 shrink-0"
                >
                  Search
                </button>
              </div>
            </form>

            {/* Sort & Mobile Filter Toggle Button */}
            <div className="flex items-center gap-2.5 justify-between sm:justify-end">
              {/* Mobile Filter Toggle (Visible on < lg) */}
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(true)}
                aria-label="Open filter options"
                className="inline-flex lg:hidden h-10 items-center gap-2 rounded-xl border border-blue-500/40 bg-blue-600/15 px-3.5 text-xs font-semibold text-blue-300 active:scale-95 shadow-sm"
              >
                <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
                <span>Filters</span>
                {activeFiltersCount > 0 && (
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
                    {activeFiltersCount}
                  </span>
                )}
              </button>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-2">
                <span className="hidden sm:inline-flex items-center gap-1 text-xs font-medium text-slate-400">
                  <ArrowUpDown className="h-3.5 w-3.5 text-blue-400" aria-hidden="true" />
                  Sort:
                </span>
                <select
                  value={sortOption}
                  onChange={(e) =>
                    updateSearch({
                      sort: e.target.value as ProductSearchParams["sort"],
                    })
                  }
                  aria-label="Sort products by"
                  className="h-10 rounded-xl border border-white/10 bg-[#0d101a] px-3 text-xs font-semibold text-white outline-none focus:border-blue-500 transition-colors cursor-pointer"
                >
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name-asc">Name: A to Z</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>
            </div>
          </div>

          {/* ACTIVE FILTER CHIPS ROW */}
          {hasActiveFilters && (
            <div className="mt-3.5 flex flex-wrap items-center gap-2 border-t border-white/[0.06] pt-3 text-xs">
              <span className="text-[11px] font-medium text-slate-400">Active filters:</span>

              {/* Search Query Chip */}
              {searchQuery && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 px-2.5 py-1 text-xs font-medium text-blue-300">
                  <span>"{searchQuery}"</span>
                  <button
                    type="button"
                    onClick={() => {
                      setLocalQuery("");
                      updateSearch({ q: undefined });
                    }}
                    className="hover:text-white"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}

              {/* Category Chip */}
              {category !== "All" && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 px-2.5 py-1 text-xs font-medium text-blue-300">
                  <Tag className="h-3 w-3 text-blue-400" />
                  <span>{category}</span>
                  <button
                    type="button"
                    onClick={() => updateSearch({ category: undefined })}
                    className="hover:text-white"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}

              {/* Brand Chips */}
              {selectedBrands.map((b) => (
                <span
                  key={b}
                  className="inline-flex items-center gap-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 px-2.5 py-1 text-xs font-medium text-purple-300"
                >
                  <Sparkles className="h-3 w-3 text-purple-400" />
                  <span>{b}</span>
                  <button
                    type="button"
                    onClick={() => handleBrandToggle(b)}
                    className="hover:text-white"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}

              {/* Price Range Chip */}
              {(minPrice !== undefined || maxPrice !== undefined) && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-300">
                  <DollarSign className="h-3 w-3 text-emerald-400" />
                  <span>
                    {minPrice !== undefined && maxPrice !== undefined
                      ? `Rs. ${minPrice.toLocaleString()} - ${maxPrice.toLocaleString()}`
                      : minPrice !== undefined
                        ? `Over Rs. ${minPrice.toLocaleString()}`
                        : `Under Rs. ${maxPrice?.toLocaleString()}`}
                  </span>
                  <button
                    type="button"
                    onClick={() => handlePriceChange(undefined, undefined)}
                    className="hover:text-white"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}

              {/* In Stock Chip */}
              {inStockOnly && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-teal-500/30 bg-teal-500/10 px-2.5 py-1 text-xs font-medium text-teal-300">
                  <span>In Stock Only</span>
                  <button
                    type="button"
                    onClick={() => updateSearch({ inStock: undefined })}
                    className="hover:text-white"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}

              {/* Warranty Chip */}
              {warrantyOnly && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-500/30 bg-sky-500/10 px-2.5 py-1 text-xs font-medium text-sky-300">
                  <ShieldCheck className="h-3 w-3 text-sky-400" />
                  <span>12+ Mo. Warranty</span>
                  <button
                    type="button"
                    onClick={() => updateSearch({ warranty: undefined })}
                    className="hover:text-white"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}

              {/* Clear All Text Button */}
              <button
                type="button"
                onClick={clearAllFilters}
                className="inline-flex items-center gap-1 ml-auto text-xs font-semibold text-rose-400 hover:text-rose-300 transition-colors"
              >
                <RotateCcw className="h-3 w-3" />
                Clear All
              </button>
            </div>
          )}
        </div>

        {/* MAIN BODY: SIDEBAR FILTERS + PRODUCT GRID */}
        <div className="mt-8 flex items-start gap-8">
          {/* Professional Filters (Sidebar on desktop, drawer on mobile) */}
          <ProductFilters
            categories={categories}
            availableBrands={availableBrands}
            categoryCounts={categoryCounts}
            filters={filterState}
            priceBounds={priceBounds}
            activeFiltersCount={activeFiltersCount}
            totalFilteredCount={filtered.length}
            onCategoryChange={(cat) => updateSearch({ category: cat })}
            onBrandToggle={handleBrandToggle}
            onPriceChange={handlePriceChange}
            onInStockToggle={(val) => updateSearch({ inStock: val || undefined })}
            onWarrantyToggle={(val) => updateSearch({ warranty: val || undefined })}
            onClearAll={clearAllFilters}
            isMobileOpen={isMobileFilterOpen}
            onCloseMobile={() => setIsMobileFilterOpen(false)}
          />

          {/* Product Results Column */}
          <main className="flex-1 min-w-0">
            {/* Results Header Count */}
            <div className="mb-4 flex items-center justify-between">
              <span className="text-xs sm:text-sm font-semibold text-slate-300">
                Showing <span className="font-bold text-white">{filtered.length}</span>{" "}
                {filtered.length === 1 ? "product" : "products"}
              </span>
            </div>

            {/* Product Grid */}
            <ProductGrid
              products={filtered}
              emptyMessage={
                hasActiveFilters
                  ? "No products match the selected filters. Try clearing some filters or searching for another keyword."
                  : "No products available in this category."
              }
            />
          </main>
        </div>
      </div>
    </div>
  );
}
