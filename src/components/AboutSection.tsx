import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, Utensils, CheckCircle } from "lucide-react";
import { site } from "@/config/site";
import { Reveal } from "@/components/Reveal";
import lunchFeast from "@/assets/lunch-feast.jpg";

const stats = [
  { value: "83+", label: "Menu Items" },
  { value: "100%", label: "Pure Vegetarian" },
  { value: "6 AM – 10 PM", label: "Operating Hours" },
  { value: "7 Days", label: "Open Every Week" },
];

export function AboutSection({ withLink = true }: { withLink?: boolean }) {
  return (
    <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24 bg-[#0e1117]">
      <span className="glow-orb right-[-10%] bottom-0 h-80 w-80 bg-amber-600/15" aria-hidden="true" />
      <span className="glow-orb left-[-10%] top-1/4 h-80 w-80 bg-emerald-600/10" aria-hidden="true" />
      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <Reveal>
          <div className="relative">
            {/* Glow backdrop */}
            <div className="absolute -inset-3 rounded-3xl bg-amber-500/20 opacity-30 blur-2xl" aria-hidden="true" />
            {/* Image wrapper */}
            <div className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl border border-amber-500/20 shadow-2xl">
              <img
                src={lunchFeast}
                alt="Vishnu Bhavan traditional pure vegetarian culinary spread"
                loading="lazy"
                width={800}
                height={600}
                className="w-full h-full object-cover"
              />
              {/* Bottom gradient fade for polish */}
              <div
                className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none"
                aria-hidden="true"
              />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-amber-200">
                <span className="font-semibold">✦ ✦ ✦ Vishnu Bhavan • Jaffna, Sri Lanka</span>
                <span className="bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-bold px-2 py-0.5 rounded-full">
                  100% Pure Veg
                </span>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-500/10 px-3.5 py-1 text-xs font-bold tracking-[0.14em] text-amber-400 uppercase">
              <Sparkles className="h-3 w-3" />
              About Vishnu Bhavan
            </span>
            <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl text-white leading-tight">
              Authentic Vegetarian Dining in Jaffna
            </h2>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-slate-300">
              <p className="text-lg text-amber-100 font-medium">
                Vishnu Bhavan offers vegetarian food with a selection of South Indian and Jaffna-style dishes, traditional snacks, sweets and beverages. Customers can explore breakfast items, lunch specials, evening dishes and special food options through the digital menu.
              </p>
              <p>
                From crispy golden ghee roast dosai and piping-hot string hoppers in the morning, to hearty banana-leaf rice &amp; curry midday feasts, and sizzling kottu in the evening — every recipe is prepared in a dedicated 100% pure vegetarian kitchen.
              </p>
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-slate-200">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>South Indian &amp; Jaffna Specialties</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Diabetic Friendly Traditional Grains</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Authentic Jaffna Heritage Palakaaram</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Fresh Pure Ghee Sweets &amp; Beverages</span>
                </div>
              </div>
            </div>

            <dl className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="relative overflow-hidden rounded-xl border border-amber-500/15 bg-gradient-to-b from-[#181d28]/90 to-[#10141e]/90 p-4 text-center shadow-lg backdrop-blur-md"
                >
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <span className="block text-xl font-extrabold bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 bg-clip-text text-transparent sm:text-2xl">
                      {stat.value}
                    </span>
                    <span className="mt-1 block text-xs font-medium text-slate-400">
                      {stat.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>

            {withLink ? (
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/products"
                  className="group inline-flex h-12 items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-6 text-sm font-bold text-black shadow-lg shadow-amber-500/20 transition-all duration-200 hover:from-amber-400 hover:to-amber-500"
                >
                  <span>Browse Digital Menu</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
                </Link>
                <Link
                  to="/about"
                  className="inline-flex h-12 items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-6 text-sm font-semibold text-slate-200 hover:bg-white/[0.08] hover:text-white transition-colors"
                >
                  <span>More About Us</span>
                </Link>
              </div>
            ) : null}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
