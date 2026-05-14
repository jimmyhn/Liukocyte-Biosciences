import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="hairline py-12 px-6 md:px-10">
      <div className="mx-auto max-w-7xl flex flex-wrap items-end justify-between gap-6">
        <div>
          <Logo />
          <p className="mt-2 text-xs tracking-wide text-bone-400">
            Immune Innovation for Active Healing
          </p>
        </div>
        <div className="text-right text-xs text-bone-400 space-y-1">
          <p>Liukocyte BioSciences</p>
          <p>UC Irvine · Department of Biomedical Engineering</p>
          <a
            href="https://angel.uci.design"
            className="text-angel-sky hover:underline"
          >
            angel.uci.design
          </a>
        </div>
      </div>
    </footer>
  );
}
