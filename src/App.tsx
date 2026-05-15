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
    <div className="bg-black min-h-screen text-bone-100 selection:bg-angel-orange selection:text-black">

      {/* ── FIXED BACKGROUND LAYER ──────────────────────────────────────────
          Illustrations stay locked to the viewport while content scrolls.
          All sections sit above this with semi-transparent backgrounds so
          the macrophage blues and vessel oranges bleed through everywhere. */}
      <div className="fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
        {/* Macrophage cluster — top-left corner */}
        <div className="absolute inset-0 hidden md:block">
          <Macrophages className="h-full w-full" />
        </div>
        {/* Vessel growth — bottom-right corner */}
        <div className="absolute bottom-0 right-0 h-full w-full max-w-[1100px] hidden md:block">
          <VesselGrowth origin="bottom-right" className="h-full w-full" />
        </div>
        {/* Soft center vignette — keeps the background from competing too
            strongly with content; lets the corner glows remain vivid */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,black/25_70%)]" />
      </div>

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
  );
}
