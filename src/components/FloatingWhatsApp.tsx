import { useState, useRef, useEffect } from "react";
import { X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { whatsappLink, waMessages } from "@/utils/whatsapp";
import { WhatsAppIcon } from "@/components/icons/BrandIcons";
import { useSearchActive } from "@/utils/searchEvents";

const GREETING_DELAY_MS = 2000;
const GREETING_AUTO_CLOSE_MS = 30000; // Auto-close after 30 seconds

const SAMPLE_MESSAGES = [
  {
    id: "hello",
    emoji: "👋",
    label: "Say Vanakkam!",
    message: "Vanakkam! 🙏 Vishnu Bhavan",
  },
  {
    id: "product",
    emoji: "🍛",
    label: "Menu & Take Away",
    message: waMessages.sample1_product(),
  },
  {
    id: "catering",
    emoji: "🍬",
    label: "Sweets & Bulk Orders",
    message: waMessages.sample2_repair(),
  },
];

export function FloatingWhatsApp() {
  const isSearchActive = useSearchActive();
  const [open, setOpen] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Show greeting bubble after initial delay
  useEffect(() => {
    const t = setTimeout(() => setShowGreeting(true), GREETING_DELAY_MS);
    return () => clearTimeout(t);
  }, []);

  // Auto-close greeting bubbles after 30 seconds
  useEffect(() => {
    if (!showGreeting) return;
    const timer = setTimeout(() => {
      setShowGreeting(false);
    }, GREETING_AUTO_CLOSE_MS);
    return () => clearTimeout(timer);
  }, [showGreeting]);

  // Hide greeting when panel opens
  useEffect(() => {
    if (open) setShowGreeting(false);
  }, [open]);

  // Track scrolling on mobile to dock half the button off-screen
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth >= 640) {
        if (isScrolling) setIsScrolling(false);
        return;
      }

      setIsScrolling(true);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 1200);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [isScrolling]);

  // Hide greeting bubbles immediately when scrolling on mobile
  useEffect(() => {
    if (isScrolling && showGreeting) {
      setShowGreeting(false);
    }
  }, [isScrolling, showGreeting]);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <AnimatePresence>
      {!isSearchActive && (
        <div
          ref={panelRef}
          className="fixed right-4 bottom-6 z-40 flex flex-col items-end gap-3 sm:right-6 sm:bottom-6"
        >
          {/* ── Greeting bubbles ── */}
          <AnimatePresence>
            {showGreeting && !open && (
              <div className="flex flex-col items-end gap-2">
                {/* Dismiss × on top bubble */}
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.92 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.92 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  className="relative"
                >
                  <button
                    type="button"
                    onClick={() => setShowGreeting(false)}
                    aria-label="Dismiss"
                    className="absolute -top-2.5 -right-2.5 grid h-5 w-5 place-items-center rounded-full bg-[#333] text-white shadow-md hover:bg-[#555] transition-colors z-10"
                  >
                    <X className="h-3 w-3" />
                  </button>
                  <button
                    type="button"
                    onClick={() => { setOpen(true); setShowGreeting(false); }}
                    className="rounded-full bg-white px-4 py-2.5 text-[13.5px] font-medium text-[#111] shadow-lg hover:bg-gray-50 active:scale-[0.98] transition-all"
                  >
                    Hi there 👋
                  </button>
                </motion.div>

                {/* Second bubble */}
                <motion.button
                  type="button"
                  onClick={() => { setOpen(true); setShowGreeting(false); }}
                  initial={{ opacity: 0, y: 8, scale: 0.92 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.92 }}
                  transition={{ duration: 0.22, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                  className="rounded-full bg-white px-4 py-2.5 text-[13.5px] font-medium text-[#111] shadow-lg hover:bg-gray-50 active:scale-[0.98] transition-all"
                >
                  Need help? Chat with us!
                </motion.button>
              </div>
            )}
          </AnimatePresence>


          {/* ── Chat popup panel ── */}
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 12 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="w-72 overflow-hidden rounded-2xl border border-white/10 bg-[#0f1422] shadow-2xl shadow-black/60 backdrop-blur-2xl"
              >
                {/* Header */}
                <div className="flex items-center gap-3 bg-[#25D366] px-4 py-3.5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/20">
                    <WhatsAppIcon size={20} colored={false} className="text-white" />
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-extrabold text-white leading-tight">Chat with us</p>
                    <p className="flex items-center gap-1.5 text-[11px] text-white/80">
                      <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                      Typically replies instantly
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label="Close chat"
                    className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>

                {/* Message options — plain */}
                <div className="flex flex-col divide-y divide-white/[0.06]">
                  <a
                    href={whatsappLink(waMessages.general())}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                    className="px-4 py-3.5 text-[13px] text-slate-200 transition-colors hover:bg-white/[0.05] hover:text-white active:bg-white/[0.08]"
                  >
                    🍽️ Today's Specials &amp; Menu
                  </a>
                  <a
                    href={whatsappLink(waMessages.sample1_product())}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                    className="px-4 py-3.5 text-[13px] text-slate-200 transition-colors hover:bg-white/[0.05] hover:text-white active:bg-white/[0.08]"
                  >
                    🍛 Lunch Packs &amp; Take Away
                  </a>
                  <a
                    href={whatsappLink(waMessages.sample2_repair())}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                    className="px-4 py-3.5 text-[13px] text-slate-200 transition-colors hover:bg-white/[0.05] hover:text-white active:bg-white/[0.08]"
                  >
                    🍬 Sweets &amp; Bulk Catering
                  </a>
                </div>

                {/* Footer note */}
                <p className="border-t border-white/[0.06] px-4 py-2.5 text-center text-[10px] text-slate-600">
                  Opens WhatsApp on your device
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Floating trigger button ── */}
          <motion.button
            type="button"
            key="floating-whatsapp-btn"
            onClick={() => {
              setIsScrolling(false);
              setOpen((v) => !v);
            }}
            onTouchStart={() => setIsScrolling(false)}
            aria-label={open ? "Close WhatsApp chat" : "Open WhatsApp chat"}
            aria-expanded={open}
            initial={{ scale: 0, opacity: 0, y: 16 }}
            animate={{
              scale: 1,
              opacity: !open && isScrolling ? 0.88 : 1,
              y: 0,
              x: !open && isScrolling ? 32 : 0,
            }}
            exit={{ scale: 0, opacity: 0, y: 16, transition: { duration: 0.2 } }}
            transition={{ type: "spring", stiffness: 350, damping: 24 }}
            whileHover={{ scale: 1.08, opacity: 1, x: 0 }}
            whileTap={{ scale: 0.94 }}
            className="relative inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_6px_25px_rgba(37,211,102,0.55)] hover:shadow-[0_8px_30px_rgba(37,211,102,0.75)] transition-shadow"
          >
            {/* Ping ring — only when closed */}
            {!open && (
              <span className="absolute inset-0 rounded-full bg-[#25D366]/40 animate-ping opacity-60 pointer-events-none" />
            )}
            <AnimatePresence mode="wait" initial={false}>
              {open ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  <X className="h-6 w-6" />
                </motion.span>
              ) : (
                <motion.span
                  key="wa"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  <WhatsAppIcon size={30} colored={false} className="text-white" />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      )}
    </AnimatePresence>
  );
}
