import { motion } from "framer-motion";
import { Section } from "./Section";
import { fadeUp, stagger } from "../lib/motion";
import { ScrollCue } from "./ScrollCue";

type Member = { name: string; role: string; bio: string };

const team: Member[] = [
  {
    name: "Devin Johnson",
    role: "Chief Executive Officer",
    bio: "Background in biomaterial research and academic communication; leads product demos, investor pitches, team coordination, and milestone execution.",
  },
  {
    name: "Catherine Salgado",
    role: "Chief Information Officer",
    bio: "Background in biomaterials and cell culture; supports experimental validation, biological integration, and product feasibility.",
  },
  {
    name: "Kristin Hagen",
    role: "Chief Operations Officer",
    bio: "Extensive business experience; owns the company's business model and client interviews — driving clinical relevance and scalability.",
  },
  {
    name: "Jimmy Nguyen",
    role: "Chief Financial Officer",
    bio: "Materials research and engineering design background; responsible for cost analysis, manufacturing feasibility, and financial stability.",
  },
  {
    name: "Ronald Nguyen",
    role: "Chief Technical Officer",
    bio: "Conducts biomaterial research and translates validated wet-lab findings into scalable, market-ready product design.",
  },
];

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");
}

export function Team() {
  return (
    <Section id="team" num="06" label="Team">
      <motion.div
        variants={stagger(0.05, 0.1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-4xl"
      >
        <motion.h2
          variants={fadeUp}
          className="font-display text-[clamp(36px,5vw,72px)] leading-[1.02] tracking-tightest font-semibold"
        >
          Built at UCI.
          <br />
          <span className="text-grad">Built to commercialize.</span>
        </motion.h2>
        <motion.p
          variants={fadeUp}
          className="mt-6 text-lg text-bone-300 max-w-2xl"
        >
          Liukocyte BioSciences was founded at UC Irvine by a multidisciplinary
          team with expertise across biomaterials, cell culture, business
          development, materials engineering, and product design.
        </motion.p>
      </motion.div>

      <motion.div
        variants={stagger(0.05, 0.1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"
      >
        {team.map((m) => (
          <motion.article
            key={m.name}
            variants={fadeUp}
            className="rounded-2xl bg-white/[0.02] ring-1 ring-white/8 p-6 transition-transform hover:-translate-y-1"
          >
            <div className="grid h-16 w-16 place-items-center rounded-full bg-angel-grad-cool font-display text-lg font-semibold text-white ring-2 ring-angel-sky/40">
              {initials(m.name)}
            </div>
            <h3 className="mt-5 font-display text-base font-semibold">
              {m.name}
            </h3>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-angel-orange">
              {m.role}
            </p>
            <p className="mt-3 text-xs text-bone-400 leading-relaxed">
              {m.bio}
            </p>
          </motion.article>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true, amount: 0.5 }}
        className="mt-12 rounded-2xl bg-white/[0.015] ring-1 ring-white/8 p-8 flex flex-wrap items-center justify-between gap-4"
      >
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-bone-400">
            Mentor
          </p>
          <p className="font-display text-2xl font-semibold mt-2">
            Wendy Liu, Ph.D.
          </p>
        </div>
        <p className="text-sm text-bone-300">
          UCI Samueli School of Engineering · BioEngine
        </p>
      </motion.div>

      <div className="mt-16 flex justify-center">
        <ScrollCue label="Pitch" href="#pitch" />
      </div>
    </Section>
  );
}
