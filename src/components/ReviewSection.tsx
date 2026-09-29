import { useRef, useEffect, useState } from "react";
import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

const reviews = [
  {
    id: 1,
    name: "Priya Nair",
    location: "Jaffna",
    rating: 5,
    text: "The string hoppers with coconut sambol are absolutely divine. A true taste of home — authentic and unforgettable. I visit every weekend without fail!",
    avatar: "PN",
    color: "from-amber-500 to-orange-500",
  },
  {
    id: 2,
    name: "Rajan Muthu",
    location: "Colombo",
    rating: 5,
    text: "Best Jaffna Special Lunch in the whole northern province. The curries are perfectly spiced and the rice quality is superb. Highly recommend!",
    avatar: "RM",
    color: "from-emerald-500 to-teal-500",
  },
  {
    id: 3,
    name: "Kavitha Sree",
    location: "Jaffna",
    rating: 5,
    text: "The Odyal Kool is simply extraordinary — thick, aromatic, and exactly like the traditional recipe. A must-try for anyone visiting Jaffna.",
    avatar: "KS",
    color: "from-rose-500 to-pink-500",
  },
  {
    id: 4,
    name: "Anand Kumar",
    location: "Kilinochchi",
    rating: 5,
    text: "100% pure vegetarian and it shows — you can taste the quality in every dish. The masala dosai in the evening is crispy perfection.",
    avatar: "AK",
    color: "from-sky-500 to-blue-500",
  },
  {
    id: 5,
    name: "Meera Balaji",
    location: "Jaffna",
    rating: 5,
    text: "Such a warm, welcoming atmosphere. The Mysore Pak and Jaangiri sweets are outstanding. Perfect to enjoy after a traditional lunch.",
    avatar: "MB",
    color: "from-purple-500 to-violet-500",
  },
  {
    id: 6,
    name: "Thilaga Raj",
    location: "Mannar",
    rating: 5,
    text: "The diabetes special menu is a thoughtful touch. Varaku rice is nutritious and still delicious. So glad this option exists here.",
    avatar: "TR",
    color: "from-yellow-500 to-amber-500",
  },
  {
    id: 7,
    name: "Senthil Nathan",
    location: "Colombo",
    rating: 5,
    text: "Travelling from Colombo just to eat here was 100% worth it. The idly sambar combo is as good as any restaurant down south.",
    avatar: "SN",
    color: "from-indigo-500 to-blue-500",
  },
  {
    id: 8,
    name: "Lavanya Pillai",
    location: "Jaffna",
    rating: 4,
    text: "Love the digital menu concept — makes ordering so easy. The muruku and kolukattai from the Palakaaram section are my favorites!",
    avatar: "LP",
    color: "from-fuchsia-500 to-pink-500",
  },
];

function ReviewCard({ review }: { review: (typeof reviews)[0] }) {
  return (
    <div className="relative flex flex-col h-full min-w-[280px] sm:min-w-0 overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-[#161c28] to-[#0e1118] p-5 sm:p-6 shadow-xl hover:border-amber-500/25 hover:shadow-[0_16px_40px_-8px_rgba(245,158,11,0.12)] transition-all duration-300 group">
      {/* Top accent */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-amber-400/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Quote icon */}
      <Quote className="h-6 w-6 text-amber-400/30 mb-3 shrink-0" />

      {/* Stars */}
      <div className="flex gap-0.5 mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-3.5 w-3.5 ${i < review.rating ? "text-amber-400 fill-amber-400" : "text-slate-600"}`}
          />
        ))}
      </div>

      {/* Review text */}
      <p className="text-sm text-slate-300 leading-relaxed flex-1 mb-5">
        "{review.text}"
      </p>

      {/* Reviewer info */}
      <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
        <div
          className={`h-9 w-9 rounded-full bg-gradient-to-br ${review.color} flex items-center justify-center text-xs font-extrabold text-white shadow-md shrink-0`}
        >
          {review.avatar}
        </div>
        <div>
          <p className="text-xs font-bold text-white leading-snug">{review.name}</p>
          <p className="text-[10px] text-slate-500 font-medium">{review.location}</p>
        </div>
      </div>
    </div>
  );
}

export function ReviewSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  // Auto-scroll for mobile carousel
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    // Only auto-scroll on mobile
    const checkMobile = () => window.innerWidth < 1024;
    if (!checkMobile()) return;

    let frame: number;
    let speed = 0.5;

    const scroll = () => {
      if (!isDragging && el) {
        el.scrollLeft += speed;
        // Loop back
        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft = 0;
        }
      }
      frame = requestAnimationFrame(scroll);
    };
    frame = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(frame);
  }, [isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    startX.current = e.pageX - (scrollRef.current?.offsetLeft ?? 0);
    scrollLeft.current = scrollRef.current?.scrollLeft ?? 0;
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const x = e.pageX - (scrollRef.current?.offsetLeft ?? 0);
    const walk = (x - startX.current) * 1.5;
    if (scrollRef.current) scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };
  const handleMouseUp = () => setIsDragging(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].pageX - (scrollRef.current?.offsetLeft ?? 0);
    scrollLeft.current = scrollRef.current?.scrollLeft ?? 0;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    const x = e.touches[0].pageX - (scrollRef.current?.offsetLeft ?? 0);
    const walk = (x - startX.current) * 1.5;
    if (scrollRef.current) scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  // Doubled reviews for seamless loop on mobile
  const doubledReviews = [...reviews, ...reviews];

  return (
    <section id="reviews" className="relative py-16 sm:py-20 lg:py-24 bg-[#0a0c10] overflow-hidden">
      <span className="glow-orb top-[-10%] right-[-5%] h-96 w-96 bg-amber-500/8" aria-hidden="true" />
      <span className="glow-orb bottom-[-10%] left-[-5%] h-80 w-80 bg-orange-500/8" aria-hidden="true" />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-14"
        >
          <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1 text-xs font-bold tracking-[0.14em] text-amber-300 uppercase">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            Guest Reviews
          </span>
          <h2 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl tracking-tight">
            What Our Guests Say
          </h2>
          <p className="mt-3 text-base text-slate-300">
            Authentic experiences shared by our loyal patrons from across Jaffna and beyond.
          </p>

          {/* Stars summary */}
          <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-5 py-2">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 text-amber-400 fill-amber-400" />
              ))}
            </div>
            <span className="text-sm font-bold text-white">4.9</span>
            <span className="text-xs text-slate-400">/ 5.0 · 200+ reviews</span>
          </div>
        </motion.div>

        {/* ── DESKTOP: 2 rows × 4 columns grid ── */}
        <div className="hidden lg:grid grid-cols-4 gap-5 xl:gap-6">
          {reviews.map((review, idx) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.06 }}
            >
              <ReviewCard review={review} />
            </motion.div>
          ))}
        </div>

        {/* ── MOBILE / TABLET: Auto-scrolling + draggable carousel ── */}
        <div
          ref={scrollRef}
          className="lg:hidden flex gap-4 overflow-x-auto pb-4 cursor-grab active:cursor-grabbing select-none"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleMouseUp}
        >
          {doubledReviews.map((review, idx) => (
            <div
              key={`${review.id}-${idx}`}
              className="flex-shrink-0 w-[280px] sm:w-[320px]"
            >
              <ReviewCard review={review} />
            </div>
          ))}
        </div>

        {/* Mobile scroll hint */}
        <p className="lg:hidden text-center text-[11px] text-slate-500 mt-4">
          ← Swipe or drag to explore reviews →
        </p>
      </div>
    </section>
  );
}
