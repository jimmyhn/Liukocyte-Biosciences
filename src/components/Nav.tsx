import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";

const links = [
  { href: "#hero",        label: "Home"        },
  { href: "#needs",       label: "The Need"    },
  { href: "#product",     label: "Product"     },
  { href: "#competition", label: "Competition" },
  { href: "#market",      label: "Market"      },
  { href: "#team",        label: "Team"        },
  { href: "#pitch",       label: "Pitch"       },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Logo click: keep scroll-to-top behavior, and broadcast a restart event
  // so the hero re-plays its intro animations and the illustrations restart.
  const handleLogoClick = () => {
    window.dispatchEvent(new Event("angel:restart"));
  };

  return (
    <>
      {/* Top bar: centered logo, no menu button */}
      <header className="fixed inset-x-0 top-0 z-50 py-2">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 transition-[opacity,backdrop-filter] duration-500 ease-out"
          style={{
            opacity: scrolled ? 1 : 0,
            backdropFilter: scrolled ? "blur(12px)" : "blur(0px)",
            WebkitBackdropFilter: scrolled ? "blur(12px)" : "blur(0px)",
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.55) 60%, rgba(0,0,0,0) 100%)",
          }}
        />
        <div className="relative mx-auto flex max-w-7xl items-center justify-center px-6 md:px-10">
          <a
            href="#hero"
            aria-label="ANGel home"
            onClick={handleLogoClick}
            className="block"
          >
            <Logo />
          </a>
        </div>
      </header>

      {/* Floating menu button — bottom-left */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        className="fixed bottom-5 left-5 z-40 grid h-12 w-12 place-items-center rounded-full bg-black/70 text-white ring-1 ring-white/15 backdrop-blur-md transition-colors hover:bg-black/90 hover:ring-white/30"
      >
        <Menu className="h-5 w-5" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
        )}

        {open && (
          <motion.aside
            key="panel"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: [0.7, 0, 0.2, 1] }}
            className="fixed inset-y-0 right-0 z-[65] flex w-[min(440px,92vw)] flex-col border-l border-white/10 bg-ink-900 px-10 py-12"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-12 flex items-center justify-between">
              <Logo />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="grid h-11 w-11 place-items-center rounded-full ring-hairline hover:bg-white/5 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <ol className="flex flex-1 flex-col gap-1">
              {links.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.05, duration: 0.4 }}
                >
                  <a
                    href={l.href}
                    onClick={() => setTimeout(() => setOpen(false), 100)}
                    className="group block py-2 font-display text-3xl md:text-4xl font-medium tracking-tight transition-colors hover:text-grad"
                  >
                    <span className="inline-block transition-transform group-hover:translate-x-1">
                      {l.label}
                    </span>
                  </a>
                </motion.li>
              ))}
            </ol>

            <div className="mt-auto pt-6 hairline text-xs text-bone-400 leading-relaxed">
              <p className="font-medium text-bone-300">Liukocyte BioSciences</p>
              <p>UC Irvine · Department of Biomedical Engineering</p>
              <a
                href="https://angel.uci.design"
                className="text-angel-sky hover:underline"
              >
                angel.uci.design
              </a>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
