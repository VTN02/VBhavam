import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  Menu,
  X,
  Utensils,
  Navigation,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { site } from "@/config/site";

const links = [
  { to: "/", label: "Home" },
  { to: "/categories", label: "Categories" },
  { to: "/products", label: "Our Menu" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

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
          {links.map((link) => (
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
          ))}
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

          {/* Mobile menu trigger */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid h-10 w-10 place-items-center text-slate-300 hover:text-white lg:hidden transition-colors"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

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
