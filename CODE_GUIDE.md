# Code Guide

A plain-English walkthrough of every file, component, illustration, and
interactive element in the ANGel site. Read top to bottom or jump to a section.

- [Configuration files (root)](#configuration-files-root)
- [Entry & app shell](#entry--app-shell)
- [Shared primitives](#shared-primitives)
- [Sections](#sections)
- [Illustrations](#illustrations)
- [Animation library](#animation-library)
- [Interactive elements](#interactive-elements)

---

## Configuration files (root)

These don't render anything — they tell the build tools how to compile the
project.

### `package.json`
Lists every package the project depends on plus the npm scripts.
- `"scripts"`:
  - `"dev": "vite"` — runs the local dev server on save-reload
  - `"build"` — compiles TypeScript then bundles for production into `dist/`
  - `"preview"` — serves the production build locally to verify
- `"dependencies"` — what runs **in the browser** (React, Framer Motion, Lucide)
- `"devDependencies"` — what runs **only at build time** (TypeScript, Tailwind,
  Vite, PostCSS, autoprefixer)

### `vite.config.ts`
Tells Vite to use the React plugin so it understands `.tsx` files.

### `tsconfig.json` / `tsconfig.app.json` / `tsconfig.node.json`
TypeScript compiler settings. `strict: true` enables type safety. You almost
never touch these.

### `tailwind.config.js`
Configures Tailwind:
- `content` — files Tailwind scans for class names so it knows what CSS to ship
- `colors.ink.*` — black/near-black surface colors
- `colors.bone.*` — off-white text colors
- `colors.angel.*` — brand accent colors (orange, coral, sky, blue, deep blue)
- `fontFamily` — Inter (body), Space Grotesk (display), JetBrains Mono (mono)
- `backgroundImage.angel-grad` / `angel-grad-cool` — the gradients used for
  text highlights and the team avatars

### `postcss.config.js`
Tells PostCSS to run Tailwind and Autoprefixer when processing CSS.

### `index.html` (root, not `src/`)
Vite's entry HTML. Loads the Google Fonts (`Inter`, `Space Grotesk`,
`JetBrains Mono`), declares the empty `<div id="root">`, and includes the
script tag that boots `src/main.tsx`. **Anything beyond fonts and the root div
should NOT go here** — content belongs in components.

### `.gitignore`
Excludes `node_modules/`, build output (`dist/`), editor folders, OS files.

---

## Entry & app shell

### `src/main.tsx`
The first JavaScript that runs in the browser.
1. Imports `index.css` (which kicks off Tailwind)
2. Finds the `<div id="root">` in `index.html`
3. Calls `createRoot(...).render(<App />)` to mount the React app

### `src/index.css`
The only CSS file. Three jobs:
1. `@tailwind base; components; utilities;` — pull in Tailwind
2. `@layer base` — sets the global `body` background to pure black, sets the
   default font to Inter, enables smooth scrolling
3. `@layer utilities` — custom utility classes used throughout:
   - `.font-display` — switches to Space Grotesk with tight letter-spacing
   - `.font-mono` — JetBrains Mono
   - `.text-grad` — applies the **orange→coral→sky→blue** gradient to text
   - `.text-grad-cool` — applies the **cool blue** gradient (used in the logo)
   - `.hairline` / `.hairline-b` / `.ring-hairline` — thin 1px white-at-8%
     borders used as section dividers
4. Custom scrollbar styling (subtle gray on black)
5. A media query that disables animations for users who prefer reduced motion

### `src/App.tsx`
The orchestrator. Top-to-bottom it renders:
1. **`<Nav />`** — fixed nav bar
2. **The hero** — either `<HeroSvg />` (default) or `<HeroVideo />` based on the
   URL query param. The `useHeroVariant()` hook reads `?hero=video` from the
   URL and switches.
3. **Sections in order**: Product, Needs, Competitive, Market, Team, Pitch
4. **`<Footer />`**
5. A tiny **hero switcher chip** in the bottom-left corner (dev convenience).
   Two links — "SVG" / "Video" — that swap the hero. Delete this whole `<div>`
   once you pick the final hero.

---

## Shared primitives

### `src/components/Logo.tsx`
The "ANGel" wordmark + circular swirl mark.
- `<svg className="brand-mark">` — the round logo mark. `<defs>` defines a
  blue gradient `logoMark` that fills the circle outline and the 6 swirl
  paths. Each `<path>` traces one of the curved lines you see inside the
  circle.
- `<span className="brand-word">` — the text. "AN" in solid orange, "Gel"
  filled with the cool blue gradient via `.text-grad-cool`.
- `showMark` prop — set `false` if you want just the text (not used currently
  but available).

### `src/components/Section.tsx`
A reusable wrapper used by every section. Renders:
- The section header row: number (e.g. `01`), label (e.g. `Product`), and a
  horizontal rule that fills remaining space.
- The header animates in via `stagger` + `fadeUp` variants when it scrolls
  into view.
- Then your `children` content centered in `max-w-7xl`.

### `src/components/Nav.tsx`
The fixed top navigation. Three pieces:

**Header bar**
- Always-visible logo on the left
- Hamburger button on the right
- Background turns more opaque + smaller padding when scrolled past 30px
  (managed by the `scrolled` state + a `scroll` event listener)

**Hamburger button**
- `<button>` with the Lucide `<Menu />` icon
- Clicking it sets `open = true`

**Slide-in side panel** (only rendered when `open` is true)
- `<AnimatePresence>` from Framer Motion handles enter/exit animations
- Two motion elements:
  - `motion.div` overlay — fades the background dark, click closes the menu
  - `motion.aside` panel — slides in from the right (`x: "100%" → 0`)
- Inside the panel: Logo + close X + `<ol>` of links + footer block.
- Each `<li>` has its own per-link delay animation: `0.15 + i * 0.05` seconds
- Each `<a>`:
  - Shows the section number (`01–07`) in mono on the left
  - The label text in a big display font
  - On hover: gradient text + slides 4px to the right
  - On click: schedules `setOpen(false)` after 100ms so the smooth scroll has
    time to start
- Two `useEffect` hooks:
  - Locks `body` scroll when the menu is open
  - Listens for the Escape key to close the menu

---

## Sections

Every section follows the same pattern:
1. A big display headline (with a `.text-grad` accent on one line)
2. A short intro paragraph
3. The section's illustrations / content
4. Variants from `lib/motion.ts` animate things in on scroll

### `src/components/HeroSvg.tsx` — variant A
- Full-viewport (`min-h-[100svh]`) black background
- Absolutely-positioned `<VesselGrowth />` in the **top-right corner** —
  vessels grow and branch outward from that corner in a loop
- Editorial typographic block on the left:
  - Eyebrow: "Liukocyte BioSciences · UC Irvine BME"
  - 4-line headline: "Immune / Innovation / for Active / Healing." where
    "Innovation" has the gradient
  - Sub-paragraph explaining the product in one sentence
  - Two buttons: "Discover ANGel" (solid white) + "Watch the Pitch" (outlined)
- A 4-column **stat strip** at the bottom: 160K / 1 in 4 / $32B / $260

### `src/components/HeroVideo.tsx` — variant B
- Same content, but the `<VesselGrowth />` is scaled up and translated to
  cover the entire viewport behind the text
- Two `<div>` overlays apply dark gradient scrims so the text reads cleanly
- Currently uses the same SVG as the "video"; if a real `.mp4` URL is
  provided, replace the `<VesselGrowth />` with `<video autoPlay muted loop playsInline>...</video>`

### `src/components/Product.tsx` — section 02
Sequence:
1. Headline: "An engineered bioactive hydrogel / for enhanced angiogenesis."
2. Intro paragraph
3. **2-column row**: dual-barrel syringe illustration on the left,
   4 feature blocks on the right (PEG-NHS-PLL, dual-barrel, neutrophil
   AN factor, macrophage activation)
4. **Full-width card** with the skin cross-section illustration showing the
   gel in the wound + new vessels growing into the dermis
5. **Clinical workflow** — the 4-step process
6. **Indication pills**: Burns / Chronic Wounds / Skin Graft Prep / Full Thickness Wounds

### `src/components/Needs.tsx` — section 03
Sequence:
1. Headline: "Wounds stuck in inflammation / can't heal themselves."
2. Intro paragraph
3. **3 stat cards**: 160,000 / 1 in 4 / $32B with explanatory text under each
4. **Healing-phase pipeline** in a bordered card — shows the four phases
   (Hemostasis → Inflammation → Proliferation → Maturation) with Inflammation
   pulsing orange ("STUCK HERE") and Proliferation labeled "ANGel reactivates"
5. **Existing-products-fall-short grid** — 4 icon cards: High Cost, Passive
   Healing, Long Wait Times, Poor Vascularization

### `src/components/Competitive.tsx` — section 04
Sequence:
1. Headline: "5 key factors. 6 competitors. / One winner."
2. Intro paragraph
3. **Competitive matrix table** — rows = factors, columns = competitors + ANGel
4. **Cost callout** — `$10,000` (strikethrough orange) vs `$260` (gradient)

### `src/components/Market.tsx` — section 05
Sequence:
1. Headline: "$10 billion market by 2030. / ANGel is ready."
2. Intro paragraph
3. **Market growth area chart** — $0–$10B from 2024 → 2030, with a $32B chronic-
   wound-burden caption above the chart and a "$10B · 2030" pill at the
   endpoint
4. **3 pillars**: Reimbursable / Workflow-Ready / Margin to Scale
5. **Go-to-market target pills**: Plastic surgeons, Wound care doctors, etc.

### `src/components/Team.tsx` — section 06
Sequence:
1. Headline: "Built at UCI. / Built to commercialize."
2. Intro paragraph
3. **5 team cards** in a grid — each shows initials in a gradient circle,
   name, role (orange mono), and bio
4. **Mentor banner** at bottom: Wendy Liu, Ph.D. + UCI Samueli affiliation

### `src/components/Pitch.tsx` — section 07
Sequence:
1. Headline: "The ANGel pitch."
2. Intro paragraph
3. **YouTube embed** in a rounded card with shadow. Uses the exact iframe
   options you provided (`315vUUdaZY8`).

### `src/components/Footer.tsx`
- Logo on the left + tagline below
- Liukocyte BioSciences / UCI / `angel.uci.design` link on the right
- Hairline divider on top

---

## Illustrations

All illustrations are inline `<svg>` so they scale crisply at any size and
inherit color where useful. The animations are CSS keyframes embedded in a
`<style>` tag at the bottom of each component — kept scoped via class
prefixes (e.g. `.vg-`, `.ds-`).

### `src/illustrations/VesselGrowth.tsx`
**What it depicts**: blood vessels emerging from a corner and branching out into
capillaries — your YouTube reference but recreated in SVG.

**Structure** (top to bottom in the file):
- `<defs>` — three gradients (orange arterial, blue venous, fade glow)
- `<circle>` — soft radial glow behind the origin
- **3 trunk paths** (`.vg-trunk-1/2/3`) — thick (4–6px) lines that emerge first
- **6 mid-branch paths** (`.vg-branch-1..6`) — medium (2.5–3px) that emerge next
- **10 capillary paths** (`.vg-cap-1..10`) — fine (0.9–1.4px) that emerge last
- **5 pulse dots** at branch junctions

**Animation** (in the `<style>` block):
- `.vg-path` shared rule: stroke-dasharray 1000, stroke-dashoffset 1000 → 0
  over `vgDraw` keyframes. Each path opacity fades up, draws to full, then
  fades out — and repeats every 7 seconds.
- Per-class delays stagger the draw order: trunks first (0–0.6s), branches
  next (1.2–1.7s), capillaries last (2.2–3.1s). Result: vessels grow
  organically in waves.

**Props**:
- `origin` — which corner to grow from (`top-right` by default). A transform
  on the outer `<g>` flips/translates the paths so the same path data works
  for any corner.

### `src/illustrations/DualSyringe.tsx`
**What it depicts**: two-barrel applicator. Top barrel = hydrogel base (blue),
bottom barrel = AN factor (orange), converging into a mixing chamber + needle
with an animated droplet stream exiting the tip.

**Structure**:
- `<defs>` — four gradients (blue barrel fill, orange barrel fill, mixed
  blue→orange chamber, metal plunger)
- Plungers (gray rectangles on the left)
- Plunger shafts + finger flanges
- Top barrel (blue fill) + graduation tick marks (8 evenly spaced black ticks)
- Bottom barrel (orange fill) + graduation ticks
- Two convergence triangles that taper into the mixing chamber
- Mixing chamber rectangle with the orange→blue gradient
- Needle + arrow tip polygon
- 3 droplet circles that animate via `.ds-drop` / `dsDrip` keyframes
- Labels: "HYDROGEL" above and "AN FACTOR" below in mono caps

### `src/illustrations/SkinCrossSection.tsx`
**What it depicts**: anatomical cross-section showing the wound bed receiving
ANGel treatment, with new vessels growing into the dermis.

**Layers** (back to front in the SVG):
- Muscle band at the bottom (dark red gradient + faint fiber lines)
- Dermis layer (brown gradient)
- Wound depression (black silhouette carved into the dermis)
- ANGel hydrogel fill (blue gradient sitting in the depression)
- AN factor sparkles (small orange circles in the gel)
- New blood vessels — 3 main paths growing down into the dermis + 3 short
  side branches
- Epidermis surface line on top
- Labels: EPIDERMIS, DERMIS, MUSCLE (left side, mono) + "ANGel hydrogel +
  AN factor" callout (orange) + "new blood vessels" callout (blue)
- A faint cyan radial glow over the wound area

### `src/illustrations/HealingPhases.tsx`
**What it depicts**: the four healing phases as a horizontal pipeline:
Hemostasis → Inflammation → Proliferation → Maturation.

**Structure**: a `<div>` grid with 4 columns. Each phase has:
- An outer ring (different color per state: blue done, orange stuck, gray blocked)
- A core dot with the step number (01–04)
- The phase name below in display font
- Inflammation gets a pulsing animation + "STUCK HERE" sub-label in orange
- Proliferation gets an "ANGel reactivates" sub-label in sky blue
- A horizontal connecting line behind the dots with a gradient going from
  blue → orange where it stalls

### `src/illustrations/ClinicalWorkflow.tsx`
**What it depicts**: the 4-step clinical procedure.

Each step is a card with:
- `STEP 01–04` mono label
- An icon (custom SVG: knife, syringe, grid, bandage roll)
- A bold display title
- A short description
- A → arrow between cards (hidden on mobile)

Animates in with stagger.

### `src/illustrations/ExistingFallShort.tsx`
**What it depicts**: the 4 ways current wound-care products fall short.

A grid of 4 cards. Each card has:
- An icon in an orange-tinted square (dollar sign, dashed bandage, clock,
  blocked-flow line)
- The flaw name (High Cost, Passive Healing, Long Wait Times,
  Poor Vascularization)
- A one-line explanation

### `src/illustrations/CompetitiveMatrix.tsx`
**What it depicts**: rows = 5 factors, columns = 6 competitors + ANGel.

- Header row: factor labels and competitor names + the highlighted "ANGel"
  column with a gradient title
- Body rows: each cell is a `<Check>` (green) or `<X>` (red/rose) Lucide icon
- The ANGel column has a faint blue background tint to visually flag it
- The whole table sits in a rounded card with a thin border

The competitor list comes from your original brief (Regranex, Apligraf,
Aquacel, UrgoStart, Integra, NovoSorb BTM).

### `src/illustrations/MarketGrowth.tsx`
**What it depicts**: area chart showing the wound care market growing from
$4.6B in 2024 to $10B in 2030.

**Structure**:
- `<defs>` — two gradients (fill: blue → transparent; line: cyan → orange)
- 5 dashed horizontal gridlines at $0/$2.5B/$5B/$7.5B/$10B with mono labels
- Filled area below the line (blue gradient fades to nothing at the bottom)
- The line itself (cyan-to-orange gradient stroke)
- Point markers at each year — the 2030 endpoint is a larger orange dot
- X-axis year labels (mono)
- A pill callout at the 2030 endpoint: "$10B · 2030" in orange
- Above the chart: a small caption "U.S. CHRONIC WOUND BURDEN · $32B / yr"
  (the $32B in orange)

---

## Animation library

### `src/lib/motion.ts`
Shared Framer Motion variants used across every section. Reduces repetition.

- `fadeUp` — fades in + slides up 32px over 0.9s
- `fadeIn` — simple opacity 0→1 over 0.8s
- `slideInRight` / `slideInLeft` — fades + slides horizontally 40px
- `scaleIn` — fades + scales from 0.96 to 1
- `stagger(delayChildren, staggerChildren)` — function that returns a parent
  variant; children animate in sequence with the given delays
- `ease` — the shared easing curve `[0.22, 1, 0.36, 1]` (a smooth out-back
  feel) used by all variants

How they're used: a parent `<motion.div variants={stagger()} initial="hidden" whileInView="show">`
contains children with `<motion.span variants={fadeUp}>`. When the parent
scrolls into view, each child runs its `fadeUp` in sequence.

---

## Interactive elements

A short index of everything the user can click or that responds to scroll.

| What | Where | Behavior |
|---|---|---|
| Logo | `Logo.tsx`, in `Nav.tsx` and `Footer.tsx` | Anchor `#hero` — smooth-scrolls to top |
| Hamburger button | `Nav.tsx` | Toggles the side panel |
| Side panel links | `Nav.tsx` | Anchor `#section-id` + auto-close panel after 100ms |
| Close (X) button | `Nav.tsx` | Closes the side panel |
| Escape key | `Nav.tsx` (keydown listener) | Closes the side panel |
| Overlay click | `Nav.tsx` | Closes the side panel |
| "Discover ANGel" button | `HeroSvg.tsx` / `HeroVideo.tsx` | Anchor `#product` |
| "Watch the Pitch" button | `HeroSvg.tsx` / `HeroVideo.tsx` | Anchor `#pitch` |
| Indication pills | `Product.tsx` | Hover-tint to sky blue (no link) |
| Stat cards | `Needs.tsx` | Lift up 4px on hover |
| Competitive matrix | `CompetitiveMatrix.tsx` | Horizontally scrollable on small screens |
| Team cards | `Team.tsx` | Lift up 4px on hover |
| Target pills | `Market.tsx` | Hover-tint to sky blue (no link) |
| YouTube iframe | `Pitch.tsx` | Standard player |
| `angel.uci.design` link | `Footer.tsx` | Opens the external site |
| Hero switch chip | `App.tsx` | Click "SVG" or "Video" — reloads with the matching `?hero=...` |

---

## Common change recipes

### Change a stat number
1. Open the section file (`Hero*.tsx`, `Needs.tsx`, `Competitive.tsx`)
2. Find the value in the `stats`/`features` constant at the top
3. Edit it. Save. Browser reloads.

### Change brand colors
1. Open `tailwind.config.js`
2. Edit `theme.extend.colors.angel.{orange|coral|sky|blue|deep}`
3. Save. The gradient utility (`.text-grad`) updates automatically.

### Replace a team member
1. Open `src/components/Team.tsx`
2. Edit the entry in the `team` array (name + role + bio)
3. The avatar shows the first 2 initials of `name` automatically

### Swap the YouTube video
1. Open `src/components/Pitch.tsx`
2. Change the `src` of the `<iframe>` (only the video ID after `/embed/` needs
   to change)

### Delete the hero switch chip
1. Open `src/App.tsx`
2. Delete the `<div className="fixed bottom-4 left-4 ...">` block
3. Once you pick a final hero, also delete the unused component file
