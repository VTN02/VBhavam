import { useEffect, useRef, useState, useMemo } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  Menu,
  X,
  Search,
  ChevronDown,
  Utensils,
  Coffee,
  Flame,
  ShieldCheck,
  Sparkles,
  Heart,
  CupSoda,
  Layers,
  ArrowRight,
  Clock,
  MapPin,
  Navigation,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { site } from "@/config/site";
import { categories, products, formatPrice, type Category, type Product } from "@/data/products";
import { SearchModal } from "@/components/SearchModal";
import { setSearchActive } from "@/utils/searchEvents";

const links = [
  { to: "/", label: "Home" },
  { to: "/categories", label: "Categories", hasDropdown: true },
  { to: "/products", label: "Digital Menu (83 Items)" },
  { to: "/about", label: "About Us" },
  { to: "/branches", label: "Visit & Directions" },
] as const;

const categoryDetails: Record<
  Category,
  {
    icon: typeof Utensils;
    desc: string;
    badgeColor: string;
    iconColor: string;
  }
> = {
  "Breakfast & All Time": {
    icon: Coffee,
    desc: "String hoppers, idly, dosai, vadai & poori (6:00 AM – 10:00 PM)",
    badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    iconColor: "text-amber-400 bg-amber-500/15",
  },
  "Lunch": {
    icon: Utensils,
    desc: "Vegetarian Rice & Curry, Jaffna Special & Budget Lunch",
    badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    iconColor: "text-emerald-400 bg-emerald-500/15",
  },
  "Evening Special": {
    icon: Flame,
    desc: "Masala dosai, ghee dosai, pittu kottu & rotti kottu (4:00 PM – 10:00 PM)",
    badgeColor: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    iconColor: "text-orange-400 bg-orange-500/15",
  },
  "Diabetes Special": {
    icon: ShieldCheck,
    desc: "Traditional grain Kurakkan & Attama preparations",
    badgeColor: "bg-teal-500/10 text-teal-400 border-teal-500/20",
    iconColor: "text-teal-400 bg-teal-500/15",
  },
  "Jaffna Palakaaram": {
    icon: Sparkles,
    desc: "Kolukattai, Mothakam, Muruku & authentic Odyal Kool",
    badgeColor: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    iconColor: "text-yellow-400 bg-yellow-500/15",
  },
  "Indian Sweets": {
    icon: Heart,
    desc: "Pure ghee Mysore Pak, Jaangiri, Rava Laddoo & Kesari",
    badgeColor: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    iconColor: "text-rose-400 bg-rose-500/15",
  },
  "Beverages": {
    icon: CupSoda,
    desc: "Ceylon tea, ginger tea, coffee, cold drinks & mineral water",
    badgeColor: "bg-sky-500/10 text-sky-400 border-sky-500/20",
    iconColor: "text-sky-400 bg-sky-500/15",
  },
};

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [searchHovered, setSearchHovered] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const isSearchActive = searchExpanded || searchHovered || searchOpen;

  useEffect(() => {
    setSearchActive(isSearchActive);
    return () => {
      setSearchActive(false);
    };
  }, [isSearchActive]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setSearchOpen(false);
    setSearchExpanded(false);
    setSearchHovered(false);
    setCategoryDropdownOpen(false);
  }, [pathname]);

  const handleSearchMouseEnter = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setSearchHovered(true);
  };

  const handleSearchMouseLeave = () => {
    if (!searchExpanded && !searchQuery.trim()) {
      hoverTimeoutRef.current = setTimeout(() => {
        setSearchHovered(false);
      }, 250);
    }
  };

  const handleOpenSearch = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setSearchExpanded(true);
    setOpen(false);
    setTimeout(() => searchInputRef.current?.focus(), 80);
  };

  const handleCloseSearch = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setSearchExpanded(false);
    setSearchHovered(false);
    setSearchQuery("");
  };

  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];

    return products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.itemCode.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      )
      .slice(0, 6);
  }, [searchQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate({ to: "/products", search: { q: searchQuery.trim() } });
      handleCloseSearch();
    }
  };

  const handleCategoryMouseEnter = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setCategoryDropdownOpen(true);
  };

  const handleCategoryMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setCategoryDropdownOpen(false);
    }, 200);
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-amber-500/15 bg-[#0d0f14]/95 shadow-lg backdrop-blur-xl"
          : "border-b border-white/[0.06] bg-[#0d0f14]/80 backdrop-blur-md"
      )}
    >
      <nav
        aria-label="Main navigation"
        className="relative mx-auto flex h-16 w-full max-w-7xl items-center gap-3 px-4 sm:px-6 lg:h-18 lg:px-8"
      >
        {/* Brand Logo & Title */}
        <Link
          to="/"
          className="flex min-w-0 items-center gap-3 shrink-0 group"
          aria-label={`${site.name} home`}
        >
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-amber-500 via-amber-600 to-yellow-500 text-black shadow-lg shadow-amber-500/25 ring-1 ring-white/20 transition-transform duration-200 group-hover:scale-105">
            <Utensils className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-base sm:text-lg leading-tight font-extrabold text-white">
              {site.name}
            </span>
            <span className="block text-[10px] leading-tight font-bold text-amber-400 sm:text-[11px] tracking-wide">
              {site.tamilName} • 100% Pure Veg
            </span>
          </span>
        </Link>

        {/* Desktop Links */}
        <ul className="mx-auto hidden items-center gap-1 lg:flex">
          {links.map((link) => {
            if (link.to === "/categories") {
              return (
                <li
                  key={link.to}
                  className="relative"
                  onMouseEnter={handleCategoryMouseEnter}
                  onMouseLeave={handleCategoryMouseLeave}
                >
                  <Link
                    to="/categories"
                    activeOptions={{ exact: false }}
                    className="group relative inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition-colors duration-200 hover:text-white"
                    activeProps={{ className: "text-amber-400 font-bold" }}
                    aria-haspopup="true"
                    aria-expanded={categoryDropdownOpen}
                  >
                    {({ isActive }) => (
                      <>
                        <span>{link.label}</span>
                        <ChevronDown
                          className={cn(
                            "h-3.5 w-3.5 text-slate-400 transition-transform duration-200 group-hover:text-white",
                            categoryDropdownOpen && "rotate-180 text-amber-400"
                          )}
                          aria-hidden="true"
                        />
                        <span
                          className={cn(
                            "absolute inset-x-3 -bottom-0.5 h-0.5 origin-left rounded-full bg-amber-400 transition-transform duration-300",
                            isActive || categoryDropdownOpen ? "scale-x-100" : "scale-x-0"
                          )}
                        />
                      </>
                    )}
                  </Link>

                  {/* Mega-Menu Dropdown */}
                  <AnimatePresence>
                    {categoryDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.97 }}
                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-[720px] max-w-[96vw] z-50 pointer-events-auto"
                      >
                        <div className="absolute top-1 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 rounded-sm bg-[#121622] border-l border-t border-amber-500/20 z-10" />

                        <div className="relative overflow-hidden rounded-2xl border border-amber-500/25 bg-[#121622] shadow-[0_24px_60px_rgba(0,0,0,0.85)] backdrop-blur-3xl ring-1 ring-white/[0.06]">
                          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-500/70 to-transparent" />

                          <div className="flex">
                            {/* Left Panel */}
                            <div className="relative flex w-52 shrink-0 flex-col justify-between gap-6 border-r border-white/[0.07] bg-[#0d1018] p-6">
                              <div className="relative space-y-1">
                                <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-amber-400">
                                  Pure Vegetarian
                                </p>
                                <h3 className="text-lg font-extrabold leading-tight text-white">
                                  Food Menu
                                </h3>
                                <p className="text-[11px] leading-relaxed text-slate-400">
                                  Fresh breakfast, midday meals, evening tiffins &amp; Jaffna heritage sweets.
                                </p>
                              </div>

                              <div className="relative flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.04] px-3 py-2.5">
                                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-amber-500/20 text-amber-400">
                                  <Layers className="h-3.5 w-3.5" />
                                </span>
                                <div>
                                  <p className="text-sm font-extrabold text-white">83 Items</p>
                                  <p className="text-[10px] text-slate-400">100% Pure Veg</p>
                                </div>
                              </div>

                              <Link
                                to="/products"
                                onClick={() => setCategoryDropdownOpen(false)}
                                className="relative group inline-flex items-center justify-center gap-1.5 rounded-xl bg-amber-500 px-4 py-2.5 text-xs font-bold text-black shadow-lg shadow-amber-500/25 transition-all duration-200 hover:bg-amber-400 active:scale-[0.98]"
                              >
                                <span>Browse Full Menu</span>
                                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                              </Link>
                            </div>

                            {/* Right Panel - Category Grid */}
                            <div className="flex-1 p-4">
                              <div className="grid grid-cols-2 gap-1.5">
                                {categories.map((cat) => {
                                  const meta = categoryDetails[cat];
                                  const catProducts = products.filter((p) => p.category === cat);
                                  const IconComponent = meta?.icon ?? Utensils;
                                  const iconTextColor = meta?.iconColor.split(" ")[0] ?? "text-amber-400";
                                  const iconBgColor = meta?.iconColor.split(" ").slice(1).join(" ") ?? "bg-amber-500/15";

                                  return (
                                    <Link
                                      key={cat}
                                      to="/products"
                                      search={{ category: cat }}
                                      onClick={() => setCategoryDropdownOpen(false)}
                                      className="group relative flex items-center gap-3 overflow-hidden rounded-xl border border-transparent px-3 py-2.5 transition-all duration-200 hover:border-white/[0.10] hover:bg-white/[0.05] active:scale-[0.98]"
                                    >
                                      <div
                                        className={cn(
                                          "relative grid h-9 w-9 shrink-0 place-items-center rounded-xl border transition-transform duration-200 group-hover:scale-110",
                                          iconBgColor,
                                          meta?.badgeColor.split(" ").find((c) => c.startsWith("border")) ?? "border-white/10"
                                        )}
                                      >
                                        <IconComponent className={cn("h-4 w-4", iconTextColor)} aria-hidden="true" />
                                      </div>

                                      <div className="relative min-w-0 flex-1">
                                        <div className="flex items-center justify-between gap-1">
                                          <p className="truncate text-[13px] font-semibold text-slate-200 group-hover:text-white transition-colors duration-200">
                                            {cat}
                                          </p>
                                          <span
                                            className={cn(
                                              "shrink-0 rounded-md px-1.5 py-0.5 text-[10px] font-bold tabular-nums border",
                                              meta?.badgeColor ?? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                                            )}
                                          >
                                            {catProducts.length}
                                          </span>
                                        </div>
                                        <p className="mt-0.5 line-clamp-1 text-[11px] text-slate-400">
                                          {meta?.desc}
                                        </p>
                                      </div>
                                    </Link>
                                  );
                                })}
                              </div>

                              <div className="mt-3 flex items-center justify-between border-t border-white/[0.06] pt-3">
                                <p className="text-[11px] text-slate-400">
                                  Showing all 7 food categories
                                </p>
                                <Link
                                  to="/products"
                                  onClick={() => setCategoryDropdownOpen(false)}
                                  className="group inline-flex items-center gap-1 text-[11px] font-semibold text-amber-400 transition-colors hover:text-amber-300"
                                >
                                  <span>View digital menu (83 items)</span>
                                  <ArrowRight className="h-3 w-3 transition-transform duration-150 group-hover:translate-x-0.5" />
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            }

            return (
              <li key={link.to}>
                <Link
                  to={link.to}
                  activeOptions={{ exact: link.to === "/" }}
                  className="relative rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition-colors duration-200 hover:text-white"
                  activeProps={{ className: "text-amber-400 font-bold" }}
                >
                  {({ isActive }) => (
                    <>
                      {link.label}
                      <span
                        className={cn(
                          "absolute inset-x-3 -bottom-0.5 h-0.5 origin-left rounded-full bg-amber-400 transition-transform duration-300",
                          isActive ? "scale-x-100" : "scale-x-0"
                        )}
                      />
                    </>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right side controls */}
        <div className="ml-auto flex items-center gap-2">
          {/* Quick Google Maps directions link */}
          <a
            href={site.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-xs font-bold text-amber-300 hover:bg-amber-500 hover:text-black transition-all"
          >
            <Navigation className="h-3.5 w-3.5" />
            <span>Find Us (KKS Rd)</span>
          </a>

          {/* Search Trigger */}
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            aria-label="Open search dialog"
            className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-300 hover:bg-white/[0.08] hover:text-white transition-colors"
          >
            <Search className="h-4 w-4 text-amber-400" />
          </button>

          {/* Mobile menu trigger */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-300 hover:bg-white/[0.08] hover:text-white lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Spotlight Command Search Dialog */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="border-t border-white/[0.08] bg-[#0d1018]/98 backdrop-blur-2xl lg:hidden overflow-hidden shadow-2xl"
          >
            <motion.ul
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: { transition: { staggerChildren: 0.045, delayChildren: 0.06 } },
                closed: { transition: { staggerChildren: 0.025, staggerDirection: -1 } },
              }}
              className="mx-auto flex w-full max-w-7xl flex-col gap-1.5 px-4 py-3 sm:px-6"
            >
              {links.map((link) => (
                <motion.li
                  key={link.to}
                  variants={{
                    open: { opacity: 1, x: 0 },
                    closed: { opacity: 0, x: -10 },
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    to={link.to}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-300 hover:bg-white/[0.06] hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
              <motion.li
                variants={{
                  open: { opacity: 1, x: 0 },
                  closed: { opacity: 0, x: -10 },
                }}
                className="pt-2"
              >
                <a
                  href={site.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 px-4 py-3 text-xs font-bold text-stone-950 shadow-md shadow-amber-500/20 active:scale-[0.98] transition-all"
                >
                  <Navigation className="h-3.5 w-3.5 fill-stone-950" />
                  <span>Get Directions on Google Maps</span>
                </a>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
