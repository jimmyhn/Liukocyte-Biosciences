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

export default function App() {
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
        {/* Vessel growth — bottom-right corner */}
        <div className="absolute bottom-0 right-0 h-full w-full max-w-[1100px] hidden md:block">
          <VesselGrowth origin="bottom-right" className="h-full w-full" />
        </div>
      </div>

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
