import { Nav } from "./components/Nav";
import { HeroSvg } from "./components/HeroSvg";
import { Product } from "./components/Product";
import { Needs } from "./components/Needs";
import { Competitive } from "./components/Competitive";
import { Market } from "./components/Market";
import { Team } from "./components/Team";
import { Pitch } from "./components/Pitch";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="bg-ink-950 min-h-screen text-bone-100 selection:bg-angel-orange selection:text-black">
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
