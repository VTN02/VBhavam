import { Link } from "@tanstack/react-router";
import { Clock, MapPin, Sparkles, Utensils, Navigation } from "lucide-react";
import { site } from "@/config/site";
import { categories } from "@/data/products";
import { GoogleMapsIcon } from "@/components/icons/BrandIcons";

const menuLinks = categories.map((cat) => ({
  label: cat,
  to: `/products?category=${encodeURIComponent(cat)}`,
}));

const quickLinks = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Complete Digital Menu (83 Items)" },
  { to: "/categories", label: "Menu Categories" },
  { to: "/about", label: "About Vishnu Bhavan" },
  { to: "/contact", label: "Location & Directions" },
] as const;

export function Footer() {
  return (
    <>
      <div className="divider-glow" aria-hidden="true" />
      <footer className="relative overflow-hidden bg-[#0a0c10] text-slate-200">
        <span className="glow-orb top-[-40%] left-1/4 h-80 w-80 bg-amber-600/15" aria-hidden="true" />
        <div className="relative mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {/* Column 1: Restaurant Brand */}
            <div>
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-amber-500 via-amber-600 to-yellow-500 text-black shadow-lg shadow-amber-500/20 ring-1 ring-white/20">
                  <Utensils className="h-5 w-5" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <span className="block truncate text-lg leading-tight font-extrabold text-white">
                    {site.name}
                  </span>
                  <span className="block text-xs font-bold text-amber-400">
                    {site.tamilName} • Pure Vegetarian
                  </span>
                </div>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-slate-400">
                Authentic South Indian &amp; traditional Jaffna pure vegetarian restaurant. Hot breakfasts, banana leaf lunches, evening tiffins, sweets &amp; heritage palakaaram.
              </p>

              <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/50 px-3 py-1 text-xs font-bold text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                100% Pure Vegetarian Kitchen
              </div>
            </div>

            {/* Column 2: Digital Menu Categories */}
            <nav aria-label="Menu categories">
              <h2 className="text-xs font-bold tracking-[0.14em] text-amber-400 uppercase">
                Digital Menu
              </h2>
              <ul className="mt-4 space-y-2.5 text-sm">
                {menuLinks.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.to}
                      className="text-slate-400 transition-colors hover:text-amber-300"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Column 3: Quick Links & Hours */}
            <div>
              <h2 className="text-xs font-bold tracking-[0.14em] text-amber-400 uppercase">
                Serving Timings
              </h2>
              <ul className="mt-4 space-y-3 text-xs text-slate-300">
                <li className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-2.5">
                  <span className="block font-bold text-white">Breakfast &amp; All Time</span>
                  <span className="text-amber-300/90 font-mono">6:00 AM – 10:00 PM</span>
                  <span className="block text-[11px] text-slate-400 mt-0.5">String hoppers, idly, dosai &amp; vadai</span>
                </li>
                <li className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-2.5">
                  <span className="block font-bold text-white">Lunch Service</span>
                  <span className="text-amber-300/90 font-mono">11:00 AM – 3:00 PM</span>
                  <span className="block text-[11px] text-slate-400 mt-0.5">Rice &amp; curry, Jaffna special, budget pack</span>
                </li>
                <li className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-2.5">
                  <span className="block font-bold text-white">Evening Special</span>
                  <span className="text-amber-300/90 font-mono">4:00 PM – 10:00 PM</span>
                  <span className="block text-[11px] text-slate-400 mt-0.5">Ghee dosai, pittu kottu, rotti kottu</span>
                </li>
              </ul>
            </div>

            {/* Column 4: Location & Inquiries */}
            <div>
              <h2 className="text-xs font-bold tracking-[0.14em] text-amber-400 uppercase">
                Visit Restaurant
              </h2>
              <ul className="mt-4 space-y-3.5 text-sm">
                <li className="flex items-start gap-2.5">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" aria-hidden="true" />
                  <span className="text-slate-300 text-xs leading-relaxed">
                    {site.address}
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" aria-hidden="true" />
                  <span className="text-slate-300 text-xs">
                    {site.hours}
                  </span>
                </li>
                <li className="flex items-start gap-2.5 text-xs text-slate-400">
                  <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" aria-hidden="true" />
                  <span>
                    Dine-In &amp; Takeaway: Walk-in orders warmly welcomed at our main counter at No. 350 KKS Road.
                  </span>
                </li>
              </ul>

              <div className="mt-5">
                <a
                  href={site.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-xs font-bold text-amber-300 hover:bg-amber-500 hover:text-black transition-all"
                >
                  <Navigation className="h-3.5 w-3.5" />
                  <span>Get Directions on Google Maps</span>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/[0.08] pt-8 text-xs text-slate-500 sm:flex-row">
            <p>
              © {new Date().getFullYear()} {site.name} • {site.tamilName}. All rights reserved. 100% Pure Vegetarian Kitchen, Jaffna, Sri Lanka.
            </p>
            <div className="flex items-center gap-4">
              <Link to="/about" className="hover:text-slate-300 transition-colors">
                About Us
              </Link>
              <span>•</span>
              <Link to="/products" className="hover:text-slate-300 transition-colors">
                Digital Menu
              </Link>
              <span>•</span>
              <Link to="/contact" className="hover:text-slate-300 transition-colors">
                Visit &amp; Directions
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
