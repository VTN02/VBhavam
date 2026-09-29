import { useRef, useEffect, useState } from "react";
import { Star, ExternalLink, MessageSquarePlus } from "lucide-react";
import { motion } from "framer-motion";
import { site } from "@/config/site";

function GoogleLogo({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
      />
    </svg>
  );
}

const googleReviews = [
  {
    id: 1,
    name: "Sivaram Thangarajah",
    role: "Local Guide",
    date: "1 week ago",
    rating: 5,
    text: "Best pure vegetarian restaurant in Jaffna! Their crispy Ghee Masala Dosai with fresh coconut chutney and spicy sambar is out of this world. Highly recommend stopping here on KKS Road.",
    avatar: "ST",
    color: "from-amber-500 to-orange-500",
  },
  {
    id: 2,
    name: "Rajan Muthu",
    role: "Local Guide",
    date: "2 weeks ago",
    rating: 5,
    text: "The Jaffna Special Lunch Feast served on fresh banana leaf is exceptional. The curries are cooked to perfection with authentic northern spices. Budget friendly and very satisfying.",
    avatar: "RM",
    color: "from-emerald-500 to-teal-500",
  },
  {
    id: 3,
    name: "Priya Nair",
    role: "Verified Diner",
    date: "3 weeks ago",
    rating: 5,
    text: "Delicious breakfast with steaming string hoppers, fluffy idly, and crispy medu vadai. The sodhi has the right balance of coconut milk and spices. 100% pure veg heaven!",
    avatar: "PN",
    color: "from-rose-500 to-pink-500",
  },
  {
    id: 4,
    name: "Anand Kumar",
    role: "Local Guide",
    date: "1 month ago",
    rating: 5,
    text: "If you are in Jaffna and crave authentic vegetarian evening tiffins, Vishnu Bhavan is the place. Their Pittu Kottu and Rotti Kottu on the iron griddle are packed with flavor.",
    avatar: "AK",
    color: "from-sky-500 to-blue-500",
  },
  {
    id: 5,
    name: "Meera Balaji",
    role: "Verified Diner",
    date: "1 month ago",
    rating: 5,
    text: "Their pure ghee Mysore Pak and Jaangiri are top-tier! We bought boxes to take back home to Colombo. Authentic South Indian sweets right in the heart of Jaffna.",
    avatar: "MB",
    color: "from-purple-500 to-violet-500",
  },
  {
    id: 6,
    name: "Kavitha Sree",
    role: "Local Guide",
    date: "2 months ago",
    rating: 5,
    text: "The traditional Odyal Kool and Jaffna Palakaaram snacks are authentic heritage recipes. So hard to find such genuine taste nowadays. Staff is very attentive and polite.",
    avatar: "KS",
    color: "from-yellow-500 to-amber-500",
  },
  {
    id: 7,
    name: "Senthil Nathan",
    role: "Local Guide",
    date: "2 months ago",
    rating: 5,
    text: "They have a special Diabetes friendly menu with Kurakkan and Attama dishes, which is very rare and appreciated for elderly family members. Food was fresh and wholesome.",
    avatar: "SN",
    color: "from-indigo-500 to-blue-500",
  },
  {
    id: 8,
    name: "Dharshan Wickremasinghe",
    role: "Visitor from Colombo",
    date: "3 months ago",
    rating: 5,
    text: "Traveled all the way from Colombo and Vishnu Bhavan was our first stop. Clean dining hall, fast service, and authentic Jaffna vegetarian food at very fair prices.",
    avatar: "DW",
    color: "from-teal-500 to-emerald-500",
  },
];

function ReviewCard({ review }: { review: (typeof googleReviews)[0] }) {
  return (
    <div className="relative flex flex-col h-full min-w-[280px] sm:min-w-0 overflow-hidden rounded-lg border border-white/[0.08] bg-gradient-to-b from-[#141824] to-[#0e1118] p-5 sm:p-6 shadow-xl hover:border-amber-500/30 hover:shadow-[0_16px_40px_-8px_rgba(245,158,11,0.12)] transition-all duration-300 group">
      {/* Top accent line */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-amber-400/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Top row: Google badge & review date */}
      <div className="flex items-center justify-between gap-2 mb-3.5">
        <div className="inline-flex items-center gap-1.5 rounded-md bg-white/[0.05] border border-white/[0.08] px-2 py-0.5">
          <GoogleLogo className="h-3.5 w-3.5" />
          <span className="text-[10px] font-semibold text-slate-300">Google Review</span>
        </div>
        <span className="text-[10px] text-slate-400">{review.date}</span>
      </div>

      {/* 5 Google Stars */}
      <div className="flex gap-0.5 mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-3.5 w-3.5 ${i < review.rating ? "text-[#FBBC05] fill-[#FBBC05]" : "text-slate-600"}`}
          />
        ))}
      </div>

      {/* Review text */}
      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed flex-1 mb-5">
        "{review.text}"
      </p>

      {/* Reviewer info */}
      <div className="flex items-center gap-3 pt-3.5 border-t border-white/[0.06] mt-auto">
        <div
          className={`h-8 w-8 rounded-full bg-gradient-to-br ${review.color} flex items-center justify-center text-[11px] font-extrabold text-white shadow-md shrink-0`}
        >
          {review.avatar}
        </div>
        <div className="min-w-0">
          <p className="text-xs font-bold text-white leading-snug truncate">{review.name}</p>
          <p className="text-[10px] text-slate-400 truncate">{review.role}</p>
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

    const checkMobile = () => window.innerWidth < 1024;
    if (!checkMobile()) return;

    let frame: number;
    const speed = 0.5;

    const scroll = () => {
      if (!isDragging && el) {
        el.scrollLeft += speed;
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

  const doubledReviews = [...googleReviews, ...googleReviews];

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
          {/* Google badge badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 shadow-sm">
            <GoogleLogo className="h-4 w-4" />
            <span className="text-xs font-bold tracking-wide text-white">
              Google Customer Reviews
            </span>
          </div>

          <h2 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl tracking-tight">
            Loved by Diners in Jaffna &amp; Beyond
          </h2>
          <p className="mt-3 text-base text-slate-300">
            Real guest feedback from our Google Maps listing at No. 350, Jaffna–Kankesanturai Road.
          </p>

          {/* Stars & Google score summary */}
          <a
            href={site.googleReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-3 rounded-full border border-amber-500/25 bg-amber-500/10 px-5 py-2.5 hover:bg-amber-500/15 transition-all group"
          >
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 text-[#FBBC05] fill-[#FBBC05]" />
              ))}
            </div>
            <span className="text-sm font-extrabold text-white">4.8 / 5.0</span>
            <span className="text-xs text-amber-300/80 font-medium flex items-center gap-1">
              <span>Verified on Google</span>
              <ExternalLink className="h-3 w-3 opacity-70 group-hover:opacity-100 transition-opacity" />
            </span>
          </a>
        </motion.div>

        {/* ── DESKTOP: 2 rows × 4 columns grid ── */}
        <div className="hidden lg:grid grid-cols-4 gap-5 xl:gap-6">
          {googleReviews.map((review, idx) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
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

        {/* ── BOTTOM ACTIONS: View on Google / Write a review ── */}
        <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <a
            href={site.googleReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 px-6 py-3 text-xs sm:text-sm font-extrabold text-stone-950 shadow-lg shadow-amber-500/20 hover:brightness-105 active:scale-[0.98] transition-all"
          >
            <GoogleLogo className="h-4 w-4" />
            <span>Read All Reviews on Google</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>

          <a
            href={site.googleWriteReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-6 py-3 text-xs sm:text-sm font-bold text-slate-200 hover:bg-white/[0.08] hover:text-white active:scale-[0.98] transition-all"
          >
            <MessageSquarePlus className="h-4 w-4 text-amber-400" />
            <span>Write a Google Review</span>
          </a>
        </div>
      </div>
    </section>
  );
}
