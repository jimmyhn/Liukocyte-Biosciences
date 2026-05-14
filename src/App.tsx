import { useEffect, useState } from "react";
import { Nav } from "./components/Nav";
import { HeroSvg } from "./components/HeroSvg";
import { HeroVideo } from "./components/HeroVideo";
import { Product } from "./components/Product";
import { Needs } from "./components/Needs";
import { Competitive } from "./components/Competitive";
import { Market } from "./components/Market";
import { Team } from "./components/Team";
import { Pitch } from "./components/Pitch";
import { Footer } from "./components/Footer";

/**
 * Hero variant switch.
 * Default = "svg". Append "?hero=video" to the URL to see the other variant.
 * Once a final choice is made, delete the unused component.
 */
function useHeroVariant() {
  const [v, setV] = useState<"svg" | "video">("svg");
  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get("hero");
    if (param === "video") setV("video");
    else setV("svg");
  }, []);
  return v;
}

export default function App() {
  const heroVariant = useHeroVariant();

  return (
    <div className="bg-ink-950 min-h-screen text-bone-100 selection:bg-angel-orange selection:text-black">
      <Nav />
      <main>
        {heroVariant === "video" ? <HeroVideo /> : <HeroSvg />}
        <Needs />
        <Product />
        <Competitive />
        <Market />
        <Team />
        <Pitch />
      </main>
      <Footer />

      {/* Tiny floating hero-switch indicator (dev convenience). */}
      <div className="fixed bottom-4 left-4 z-40 flex items-center gap-2 rounded-full bg-black/60 px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest text-bone-400 ring-1 ring-white/10 backdrop-blur">
        Hero:{" "}
        <a
          href="?"
          className={heroVariant === "svg" ? "text-angel-sky" : "hover:text-bone-200"}
        >
          SVG
        </a>
        <span>/</span>
        <a
          href="?hero=video"
          className={heroVariant === "video" ? "text-angel-sky" : "hover:text-bone-200"}
        >
          Video
        </a>
      </div>
    </div>
  );
}
