import { motion } from "framer-motion";
import { Section } from "./Section";
import { fadeUp, stagger } from "../lib/motion";
import { ScrollCue } from "./ScrollCue";

type Member = {
  name: string;
  role: string;
  bio: string;
  photo: string;
  linkedin?: string;
  /**
   * Fine-tune how the photo sits inside the circular avatar.
   *   x:    positive = move face RIGHT, negative = move face LEFT  (in %)
   *   y:    positive = move face DOWN,  negative = move face UP    (in %)
   *   zoom: 1 = no zoom; >1 zooms IN (face bigger); <1 zooms OUT (face smaller)
   * Start with small values like 5 or -5 and increase from there.
   */
  adjust?: { x?: number; y?: number; zoom?: number };
};

/** Small LinkedIn glyph used in profile cards. */
function LinkedInIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zm1.78 13.02H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

const team: Member[] = [
  {
    name: "Devin Johnson",
    role: "Chief Executive Officer",
    bio: "Background in biomaterial research and academic communication; leads product demos, investor pitches, team coordination, and milestone execution.",
    photo: "/team-devin.png",
    linkedin: "https://www.linkedin.com/in/devincjohnson/",
    adjust: { x: 3, y: 0, zoom: 1 },
  },
  {
    name: "Catherine Salgado",
    role: "Chief Information Officer",
    bio: "Background in biomaterials and cell culture; supports experimental validation, biological integration, and product feasibility.",
    photo: "/team-catherine.png",
    linkedin: "https://www.linkedin.com/in/catherine-salgado-751242241/",
    adjust: { x: -6, y: -12, zoom: 1 },
  },
  {
    name: "Kristin Hagen",
    role: "Chief Operations Officer",
    bio: "Extensive business experience; owns the company's business model and client interviews — driving clinical relevance and scalability.",
    photo: "/team-kristin.png",
    linkedin: "https://www.linkedin.com/in/kristin-hagen-bme/",
    adjust: { x: 3, y: -2, zoom: 1 },
  },
  {
    name: "Jimmy Nguyen",
    role: "Chief Financial Officer",
    bio: "Materials research and engineering design background; responsible for cost analysis, manufacturing feasibility, and financial stability.",
    photo: "/team-jimmy.png",
    linkedin: "https://www.linkedin.com/in/jimmyhn/",
    adjust: { x: -10, y: -12, zoom: 1 },
  },
  {
    name: "Ronald Nguyen",
    role: "Chief Technical Officer",
    bio: "Conducts biomaterial research and translates validated wet-lab findings into scalable, market-ready product design.",
    photo: "/team-ronald.png",
    linkedin: "https://www.linkedin.com/in/ronald-nguyen/",
    adjust: { x: -15, y: -5, zoom: 1 },
  },
];

/** Mentor card — same adjust system as team members. */
const mentor = {
  name: "Wendy Liu, Ph.D.",
  affiliation: "UCI Samueli School of Engineering · BioEngine",
  email: "wendy.liu@uci.edu",
  photo: "/liu.png",
  adjust: { x: 0, y: 0, zoom: 1 },
};

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
          Meet the <span className="text-grad">Team</span>.
          <br />
          Contact and <span className="text-grad">Connect</span> with us!
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
            <div className="w-40 h-40 rounded-full overflow-hidden bg-white/[0.04]">
              <img
                src={m.photo}
                alt={m.name}
                className="w-full h-full object-cover"
                style={{
                  transform: `translate(${m.adjust?.x ?? 0}%, ${m.adjust?.y ?? 0}%) scale(${m.adjust?.zoom ?? 1})`,
                }}
              />
            </div>
            <div className="mt-5 flex items-center gap-2">
              <h3 className="font-display text-base font-semibold">
                {m.name}
              </h3>
              {m.linkedin && (
                <a
                  href={m.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${m.name} on LinkedIn`}
                  className="text-bone-400 hover:text-angel-sky transition-colors"
                >
                  <LinkedInIcon className="w-4 h-4" />
                </a>
              )}
            </div>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-angel-orange">
              {m.role}
            </p>
            <p className="mt-3 text-xs text-bone-400 leading-relaxed">
              {m.bio}
            </p>
          </motion.article>
        ))}
      </motion.div>

      {/* Mentor — Wendy Liu */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true, amount: 0.5 }}
        className="mt-12 rounded-2xl bg-white/[0.015] ring-1 ring-white/8 p-8 flex flex-wrap items-center gap-6"
      >
        <div className="w-32 h-32 rounded-full overflow-hidden bg-white/[0.04] flex-shrink-0">
          <img
            src={mentor.photo}
            alt={mentor.name}
            className="w-full h-full object-cover"
            style={{
              transform: `translate(${mentor.adjust.x}%, ${mentor.adjust.y}%) scale(${mentor.adjust.zoom})`,
            }}
          />
        </div>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-bone-400">
            Mentor
          </p>
          <p className="font-display text-2xl font-semibold mt-1">
            {mentor.name}
          </p>
          <p className="text-sm text-bone-300 mt-1">{mentor.affiliation}</p>
          <a
            href={`mailto:${mentor.email}`}
            className="mt-2 inline-block text-sm text-angel-sky hover:text-angel-orange transition-colors"
          >
            {mentor.email}
          </a>
        </div>
      </motion.div>

      <div className="mt-16 flex justify-center">
        <ScrollCue label="Pitch" href="#pitch" />
      </div>
    </Section>
  );
}
