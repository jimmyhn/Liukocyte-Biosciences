# ANGel — Liukocyte BioSciences

The marketing site for **ANGel**, an engineered bioactive hydrogel for enhanced
angiogenesis in the wound bed, built by Liukocyte BioSciences at UC Irvine.

> **Immune Innovation for Active Healing.**

## Stack

- **React 18 + TypeScript** — component-based UI
- **Vite** — dev server + bundler
- **Tailwind CSS** — utility-first styling
- **Framer Motion** — scroll-triggered fade-ups and slide-ins
- **Lucide React** — icon set (hamburger, arrow, check, close)

Everything compiles down to static HTML / CSS / JS — no backend, no database.

## Run it locally (VS Code)

### Prerequisites (one-time setup)

1. **Install Node.js** (LTS) — https://nodejs.org → installer for Windows or
   macOS. Restart VS Code after.
2. Verify in the VS Code terminal (Ctrl + `):
   ```
   node --version
   npm --version
   ```
   Both should print a version number.

### First time on this branch

```bash
npm install
```

That downloads everything in `package.json` into `node_modules/` (~150 MB,
gitignored). Only needs to run once after cloning.

### Start the dev server

```bash
npm run dev
```

Open the URL it prints (usually http://localhost:5173). Edits in any file
auto-reload the page.

### View the alternate hero

The site ships with two hero variants you can compare side-by-side:

- `http://localhost:5173/` → custom SVG illustration hero (default)
- `http://localhost:5173/?hero=video` → full-bleed background hero (MCP 1 style)

There's also a small switch button in the bottom-left of the page.

### Production build

```bash
npm run build      # outputs to dist/
npm run preview    # serves the build locally to verify
```

## Project layout

```
src/
├── main.tsx               ← entry point — mounts App into #root
├── App.tsx                ← composes Nav + sections + Footer; hero switch
├── index.css              ← Tailwind directives + brand utilities
├── lib/
│   └── motion.ts          ← shared Framer Motion variants (fadeUp, stagger…)
├── components/
│   ├── Nav.tsx            ← fixed nav, hamburger, slide-in side panel
│   ├── Logo.tsx           ← AN/Gel wordmark + circular swirl mark
│   ├── Section.tsx        ← shared section wrapper (number + label + rule)
│   ├── HeroSvg.tsx        ← Hero variant A — SVG vessels top-right
│   ├── HeroVideo.tsx      ← Hero variant B — full-bleed visual + scrim
│   ├── Product.tsx        ← section 02
│   ├── Needs.tsx          ← section 03
│   ├── Competitive.tsx    ← section 04
│   ├── Market.tsx         ← section 05
│   ├── Team.tsx           ← section 06
│   ├── Pitch.tsx          ← section 07 (YouTube embed)
│   └── Footer.tsx
└── illustrations/
    ├── VesselGrowth.tsx     ← animated, looping blood-vessel regrowth
    ├── DualSyringe.tsx      ← two-barrel applicator + droplet stream
    ├── SkinCrossSection.tsx ← layered anatomy: gel in wound + new vessels
    ├── HealingPhases.tsx    ← 4-phase pipeline w/ "stuck here" callout
    ├── ClinicalWorkflow.tsx ← 4-step debride → apply → matrix → wrap
    ├── ExistingFallShort.tsx← 4 reasons existing products fall short
    ├── CompetitiveMatrix.tsx← 5×7 check/X matrix table
    └── MarketGrowth.tsx     ← area chart $0 → $10B / 2030
```

## Editing tips

- **Change the slogan or hero text** → `src/components/HeroSvg.tsx` (top of file)
- **Change a stat** → search the number (e.g. `160,000`) — they live in their
  respective section component
- **Change a team member** → `src/components/Team.tsx`, top constant
- **Tweak brand colors** → `tailwind.config.js` → `theme.extend.colors.angel`
- **Add a section** → copy any section component, wrap with `<Section>`, then
  add it to the `links` array in `src/components/Nav.tsx` and render it in
  `src/App.tsx`

## Documentation

See **[CODE_GUIDE.md](./CODE_GUIDE.md)** for a line-by-line / group-by-group
explanation of every file, every illustration, every text block, every button.

## Branch policy

- This branch (`claude/angel-react-v2`) is the React rebuild.
- The previous static HTML/CSS version lives on `claude/jet-landing-hero-LojdL`.

## Reference materials

- **New UROP Poster 2026** — primary source for all content
- **Old UROP Poster 2026** — supporting graphics reference
- **ANGel NVC Concept Paper** — supporting brand/team reference
