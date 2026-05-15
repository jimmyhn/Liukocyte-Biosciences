import { Nav } from "./components/Nav";
import { HeroSvg } from "./components/HeroSvg";
import { Product } from "./components/Product";
import { Needs } from "./components/Needs";
import { Competitive } from "./components/Competitive";
import { Market } from "./components/Market";
import { Team } from "./components/Team";
import { Pitch } from "./components/Pitch";
import { Footer } from "./components/Footer";
import { Macrophages } from "./illustrations/Macrophages";
import { VesselGrowth } from "./illustrations/VesselGrowth";
import { useState, useEffect } from "react";

export default function App() {
  const [scrollOpacity, setScrollOpacity] = useState(0);

    useEffect(() => {
      const handleScroll = () => {
        // Adjust '400' to whenever you want the background to be fully dark
        const winScroll = window.scrollY;
        const opacity = Math.min(winScroll / 2200, 0.35); // Caps at 70% dark

        setScrollOpacity(opacity);
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);
  return (
    <div className="min-h-screen text-bone-100 selection:bg-angel-orange selection:text-black">

      {/* ── FIXED BACKGROUND LAYER ──────────────────────────────────────────
          Illustrations stay locked to the viewport while content scrolls.
          bg-black lives HERE (not on the wrapper) so the fixed layer itself
          is the base background. All sections sit above this with semi-
          transparent backgrounds so the macrophage blues and vessel oranges
          bleed through everywhere. */}
      <div className="fixed inset-0 z-0 overflow-hidden bg-black" aria-hidden="true">
        {/* Macrophage cluster — top-left corner */}
        <div className="absolute inset-0 hidden md:block">
          <Macrophages className="h-full w-full" />
        </div>
        {/* Vessel growth — full viewport so branches can reach the bottom-left
            corner, top-right corner, and approach the macrophage cluster at
            top-left. The SVG is still anchored to the bottom-right corner. */}
        <div className="absolute inset-0 hidden md:block">
          <VesselGrowth origin="bottom-right" className="h-full w-full" />
        </div>
      </div>
      {/* 2. THE GLOBAL OVERLAY (The "Smart" Backdrop) */}

      <div

      className="fixed inset-0 z-10 pointer-events-none transition-backdrop duration-300 backdrop-blur-sm"

      style={{

      backgroundColor: `rgba(0, 0, 0, ${scrollOpacity})`,

      backdropFilter: `blur(${scrollOpacity * 8}px)` // Blur increases as you scroll

      }}

      />
      {/* ── CONTENT LAYER ──────────────────────────────────────────────────
          Everything that scrolls lives above the fixed background. */}
      <div className="relative z-10">
        <Nav />
        <main>
          <HeroSvg />
          <Needs />
          <Product />
          <Competitive />
          <Market />
          <Team />
          <Pitch />
        </main>
        <Footer />
      </div>
    </div>
  );
}
