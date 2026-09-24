import { Clock, MapPin, Phone, ExternalLink, Navigation, Info } from "lucide-react";
import { motion } from "framer-motion";
import type { Branch } from "@/data/branches";
import { GoogleMapsIcon } from "@/components/icons/BrandIcons";

export function BranchCard({ branch }: { branch: Branch }) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      className="group relative overflow-hidden rounded-2xl border border-amber-500/20 bg-gradient-to-b from-[#181d2a]/95 via-[#131722]/95 to-[#0d0f16]/95 shadow-xl backdrop-blur-xl transition-all duration-300 hover:border-amber-500/40 hover:shadow-2xl hover:shadow-amber-500/10"
    >
      {/* Top golden highlight */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-amber-400/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-t-2xl z-20"
        aria-hidden="true"
      />

      {/* ── Google Map Embed Preview ── */}
      <div className="relative h-56 overflow-hidden sm:h-64">
        {/* Branch label badge — floats over the map */}
        <span className="absolute top-4 left-4 z-10 rounded-full border border-amber-500/40 bg-[#0d0f14]/90 px-3 py-1 text-[11px] font-bold tracking-wider text-amber-300 uppercase backdrop-blur-md shadow-lg">
          {branch.label}
        </span>

        {/* Open in Google Maps button — top right */}
        <a
          href={branch.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${branch.name} in Google Maps`}
          className="absolute top-4 right-4 z-10 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-[#0d0f14]/85 px-3 py-1.5 text-xs font-semibold text-white/90 backdrop-blur-md hover:bg-[#0d0f14] hover:text-amber-400 transition-colors shadow-lg"
        >
          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Open in Google Maps</span>
        </a>

        {/* Iframe map */}
        <iframe
          title={`Map for ${branch.name}`}
          src={branch.mapsEmbedUrl}
          width="100%"
          height="100%"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 w-full h-full border-0 grayscale-[15%] contrast-[1.05]"
        />

        {/* Bottom gradient fade into card body */}
        <div
          className="absolute bottom-0 inset-x-0 h-14 bg-gradient-to-t from-[#131722] to-transparent pointer-events-none"
          aria-hidden="true"
        />
      </div>

      {/* ── Card Body ── */}
      <div className="p-6 pt-4">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-xl font-extrabold text-white transition-colors duration-200 group-hover:text-amber-300">
            {branch.name}
          </h3>
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-950/70 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            100% Pure Veg
          </span>
        </div>

        <p className="mt-1 text-xs text-slate-400 font-medium">
          Conveniently situated on the prominent Jaffna–Kankesanturai (KKS) Road in Jaffna, Sri Lanka.
        </p>

        <ul className="mt-5 space-y-3.5 text-sm">
          <li className="flex items-start gap-3">
            <div className="mt-0.5 rounded-lg bg-amber-500/10 p-1.5 text-amber-400">
              <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
            </div>
            <div>
              <span className="block text-xs font-semibold text-slate-400">Restaurant Address</span>
              <span className="font-semibold text-slate-200">{branch.address}</span>
            </div>
          </li>

          <li className="flex items-start gap-3">
            <div className="mt-0.5 rounded-lg bg-amber-500/10 p-1.5 text-amber-400">
              <Clock className="h-4 w-4 shrink-0" aria-hidden="true" />
            </div>
            <div>
              <span className="block text-xs font-semibold text-slate-400">Daily Operating Hours</span>
              <span className="font-semibold text-slate-200">{branch.hours}</span>
              <span className="block text-xs text-amber-400/90 font-medium mt-0.5">
                Serving Breakfast, Lunch & Dinner
              </span>
            </div>
          </li>

          <li className="flex items-start gap-3">
            <div className="mt-0.5 rounded-lg bg-sky-500/10 p-1.5 text-sky-400">
              <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
            </div>
            <div>
              <span className="block text-xs font-semibold text-slate-400">Service &amp; Walk-ins</span>
              <span className="font-semibold text-slate-200">Dine-In • Takeaway • Counter Service</span>
              <span className="block text-xs text-slate-400 mt-0.5">
                Walk-ins warmly welcomed at our reception counter at No. 350 KKS Road.
              </span>
            </div>
          </li>
        </ul>

        {/* Action Button: Get Directions on Google Maps */}
        <div className="mt-6 pt-4 border-t border-white/[0.08]">
          <motion.a
            href={branch.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 450, damping: 25 }}
            className="w-full inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 px-4 text-sm font-bold text-stone-950 shadow-lg shadow-amber-500/20 hover:brightness-105 transition-all duration-200"
          >
            <Navigation className="h-4 w-4 fill-stone-950" aria-hidden="true" />
            <span>Get Directions on Google Maps</span>
          </motion.a>
        </div>
      </div>
    </motion.article>
  );
}
