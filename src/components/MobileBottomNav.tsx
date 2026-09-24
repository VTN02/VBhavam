import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Utensils, Layers, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { WhatsAppIcon } from "@/components/icons/BrandIcons";
import { whatsappLink, waMessages } from "@/utils/whatsapp";

interface NavItem {
  to?: string;
  href?: string;
  label: string;
  icon: typeof Home;
  isExternal?: boolean;
}

const navItems: NavItem[] = [
  { to: "/", label: "Home", icon: Home },
  { to: "/products", label: "Food Menu", icon: Utensils },
  { to: "/categories", label: "Categories", icon: Layers },
  { to: "/branches", label: "Visit Us", icon: MapPin },
  {
    href: whatsappLink(waMessages.general()),
    label: "WhatsApp",
    icon: WhatsAppIcon as unknown as typeof Home,
    isExternal: true,
  },
];

export function MobileBottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <motion.nav
      aria-label="Mobile Bottom Navigation"
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed bottom-0 inset-x-0 z-40 block md:hidden border-t border-white/[0.08] bg-[#0b0e17]/95 backdrop-blur-xl pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_25px_rgba(0,0,0,0.6)]"
    >
      <div className="mx-auto flex h-16 max-w-md items-center justify-around px-2">
        {navItems.map((item) => {
          if (item.isExternal && item.href) {
            return (
              <motion.a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
                whileTap={{ scale: 0.88 }}
                transition={{ type: "spring", stiffness: 500, damping: 25 }}
                className="group relative flex flex-1 flex-col items-center justify-center py-1 min-h-[48px] touch-manipulation"
              >
                <motion.span
                  whileHover={{ scale: 1.1 }}
                  className="grid h-7 w-7 place-items-center rounded-full bg-[#25D366]/15 text-[#25D366] transition-colors group-hover:bg-[#25D366] group-hover:text-white"
                >
                  <WhatsAppIcon size={16} colored={false} className="shrink-0" />
                </motion.span>
                <span className="mt-1 text-[10px] font-bold text-[#25D366] tracking-tight">
                  {item.label}
                </span>
              </motion.a>
            );
          }

          const isActive =
            item.to === "/"
              ? pathname === "/"
              : item.to
                ? pathname.startsWith(item.to)
                : false;

          const IconComponent = item.icon;

          return (
            <motion.div
              key={item.label}
              className="flex-1 flex justify-center"
              whileTap={{ scale: 0.88 }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
            >
              <Link
                to={item.to!}
                aria-label={item.label}
                className={cn(
                  "relative flex w-full flex-col items-center justify-center py-1 min-h-[48px] touch-manipulation transition-colors",
                  isActive ? "text-amber-400" : "text-slate-400 hover:text-slate-200",
                )}
              >
                {/* Active Sliding Spring Indicator Pill */}
                {isActive && (
                  <motion.span
                    layoutId="mobileActiveNavPill"
                    className="absolute top-0 h-1 w-6 rounded-full bg-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.9)]"
                    transition={{ type: "spring", stiffness: 450, damping: 30 }}
                    aria-hidden="true"
                  />
                )}

                <span
                  className={cn(
                    "relative grid h-7 w-7 place-items-center rounded-xl transition-all duration-200",
                    isActive ? "bg-amber-500/20 text-amber-400 shadow-inner" : "text-slate-400",
                  )}
                >
                  <IconComponent className="h-4 w-4" aria-hidden="true" />
                </span>

                <span
                  className={cn(
                    "mt-0.5 text-[10px] tracking-tight transition-all duration-200",
                    isActive ? "font-bold text-white scale-105" : "font-medium text-slate-400",
                  )}
                >
                  {item.label}
                </span>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </motion.nav>
  );
}
