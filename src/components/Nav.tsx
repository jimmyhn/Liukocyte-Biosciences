import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";

const links = [
  { href: "#hero",        num: "01", label: "Home"        },
  { href: "#product",     num: "02", label: "Product"     },
  { href: "#needs",       num: "03", label: "The Need"    },
  { href: "#competition", num: "04", label: "Competition" },
  { href: "#market",      num: "05", label: "Market"      },
  { href: "#team",        num: "06", label: "Team"        },
  { href: "#pitch",       num: "07", label: "Pitch"       },
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

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "py-3 bg-black/85 backdrop-blur-md hairline-b"
            : "py-5 bg-gradient-to-b from-black/60 to-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-10">
          <a href="#hero" aria-label="ANGel home" className="block">
            <Logo />
          </a>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="grid h-11 w-11 place-items-center rounded-full ring-hairline hover:bg-white/5 transition-colors"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

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
            className="fixed inset-y-0 right-0 z-[65] w-[min(440px,92vw)] bg-ink-900 hairline-b border-l border-white/10 px-10 py-12 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-12">
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
                    className="group flex items-baseline gap-4 py-2 font-display text-3xl md:text-4xl font-medium tracking-tight transition-colors hover:text-grad"
                  >
                    <span className="font-mono text-[11px] tracking-[0.2em] text-bone-400">
                      {l.num}
                    </span>
                    <span className="transition-transform group-hover:translate-x-1">
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
