"use client";

import { motion } from "motion/react";
import {
  Braces,
  Database,
  ServerCog,
  Wrench,
  Code2,
} from "lucide-react";

const stackGroups = [
  {
    number: "01",
    title: "Frontend",
    subtitle: "Interfaces & experiencias",
    icon: Braces,
    technologies: [
      "HTML",
      "CSS",
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Vue",
      "Tailwind CSS",
    ],
  },
  {
    number: "02",
    title: "Backend",
    subtitle: "Lógica & desarrollo",
    icon: ServerCog,
    technologies: [
      "PHP",
      "Laravel",
      "Python",
      "Django",
      "C#",
      ".NET",
      "Java",
    ],
  },
  {
    number: "03",
    title: "Bases de datos",
    subtitle: "Datos & persistencia",
    icon: Database,
    technologies: [
      "MySQL",
      "SQL",
      "PostgreSQL",
      "SQL Server",
      "MariaDB",
      "MongoDB",
      "Supabase",
    ],
  },
  {
    number: "04",
    title: "Tools & Mobile",
    subtitle: "Herramientas & desarrollo",
    icon: Wrench,
    technologies: [
      "Git",
      "GitHub",
      "Flutter",
      "Dart",
      "Excel",
      "Power BI",
      "MVC",
      "UX/UI",
    ],
  },
];

export default function TechStack() {
  return (
    <section
      id="stack"
      className="relative overflow-hidden border-t border-white/5 py-28 md:py-36"
    >
      {/* Glow */}
      <div className="pointer-events-none absolute -left-[200px] top-[30%] h-[500px] w-[500px] rounded-full bg-[#f35dce]/5 blur-[160px]" />

      <div className="container relative z-10">
        {/* ENCABEZADO */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4"
        >
          <span className="font-mono text-xs text-[#f35dce]">
            04
          </span>

          <span className="h-[1px] w-10 bg-[#f35dce]" />

          <span className="font-mono text-xs tracking-[0.22em] text-white/40">
            TECH STACK
          </span>
        </motion.div>

        {/* TÍTULO */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-12 grid gap-8 lg:grid-cols-[1fr_0.55fr] lg:items-end"
        >
          <h2 className="max-w-[800px] text-[48px] font-semibold leading-[0.95] tracking-[-0.055em] sm:text-[60px] lg:text-[72px]">
            Tecnologías que
            <br />

            <span className="text-white/30">
              utilizo.
            </span>
          </h2>

          <p className="max-w-[420px] text-sm leading-7 text-white/35">
            Lenguajes, frameworks, bases de datos y herramientas que
            forman parte de mi experiencia en desarrollo de software.
          </p>
        </motion.div>

        {/* =================================
            STACK GRID
        ================================== */}

        <div className="mt-20 grid gap-5 md:grid-cols-2">
          {stackGroups.map((group, groupIndex) => {
            const Icon = group.icon;

            return (
              <motion.article
                key={group.title}
                initial={{
                  opacity: 0,
                  y: 35,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.2,
                }}
                transition={{
                  duration: 0.6,
                  delay: groupIndex * 0.08,
                }}
                whileHover={{
                  y: -5,
                }}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-[26px]
                  border
                  border-white/[0.07]
                  bg-[#0b0e12]
                  p-7
                  transition
                  duration-300
                  hover:border-[#f35dce]/30
                  md:p-9
                "
              >
                {/* HEADER */}

                <div className="flex items-start justify-between">
                  <div
                    className="
                      flex
                      h-11
                      w-11
                      items-center
                      justify-center
                      rounded-xl
                      border
                      border-[#f35dce]/20
                      bg-[#f35dce]/5
                      text-[#f35dce]
                    "
                  >
                    <Icon
                      size={20}
                      strokeWidth={1.5}
                    />
                  </div>

                  <span className="font-mono text-[10px] text-white/20">
                    {group.number}
                  </span>
                </div>

                {/* INFO */}

                <h3 className="mt-7 text-[28px] font-semibold tracking-[-0.04em]">
                  {group.title}
                </h3>

                <p className="mt-1 font-mono text-[9px] tracking-[0.15em] text-white/25">
                  {group.subtitle}
                </p>

                {/* TECNOLOGÍAS */}

                <div className="mt-8 flex flex-wrap gap-2">
                  {group.technologies.map(
                    (technology, technologyIndex) => (
                      <motion.span
                        key={technology}
                        initial={{
                          opacity: 0,
                          scale: 0.9,
                        }}
                        whileInView={{
                          opacity: 1,
                          scale: 1,
                        }}
                        viewport={{
                          once: true,
                        }}
                        transition={{
                          duration: 0.35,
                          delay:
                            groupIndex * 0.05 +
                            technologyIndex * 0.025,
                        }}
                        whileHover={{
                          y: -2,
                          scale: 1.04,
                        }}
                        className="
                          cursor-default
                          rounded-full
                          border
                          border-white/[0.08]
                          bg-white/[0.025]
                          px-4
                          py-2
                          font-mono
                          text-[10px]
                          text-white/45
                          transition
                          hover:border-[#f35dce]/40
                          hover:bg-[#f35dce]/5
                          hover:text-[#f35dce]
                        "
                      >
                        {technology}
                      </motion.span>
                    )
                  )}
                </div>

                {/* Glow */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    -bottom-28
                    -right-28
                    h-56
                    w-56
                    rounded-full
                    bg-[#f35dce]/0
                    blur-[90px]
                    transition
                    duration-500
                    group-hover:bg-[#f35dce]/10
                  "
                />
              </motion.article>
            );
          })}
        </div>

        {/* =================================
            TERMINAL
        ================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.7,
          }}
          className="
            mt-8
            overflow-hidden
            rounded-[24px]
            border
            border-white/[0.07]
            bg-[#090b0e]
          "
        >
          {/* Terminal header */}

          <div
            className="
              flex
              h-12
              items-center
              justify-between
              border-b
              border-white/[0.07]
              px-5
            "
          >
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#f35dce]/60" />
            </div>

            <div className="flex items-center gap-2 font-mono text-[9px] text-white/25">
              <Code2 size={12} />

              developer@karla
            </div>
          </div>

          {/* Terminal content */}

          <div className="p-6 font-mono text-[11px] leading-7 md:p-8">
            <p>
              <span className="text-[#f35dce]">
                $
              </span>{" "}

              <span className="text-white/40">
                developer --profile
              </span>
            </p>

            <p className="mt-4 text-white/25">
              Loading developer profile...
            </p>

            <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              <TerminalItem
                label="ROLE"
                value="Full Stack Developer"
              />

              <TerminalItem
                label="FOCUS"
                value="Software Development"
              />

              <TerminalItem
                label="DATABASE"
                value="SQL / NoSQL"
              />

              <TerminalItem
                label="STATUS"
                value="Ready to build"
                active
              />
            </div>

            <p className="mt-6">
              <span className="text-[#f35dce]">
                $
              </span>

              <motion.span
                animate={{
                  opacity: [1, 0, 1],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                }}
                className="ml-2 inline-block h-[14px] w-[7px] bg-white/50 align-middle"
              />
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function TerminalItem({
  label,
  value,
  active = false,
}: {
  label: string;
  value: string;
  active?: boolean;
}) {
  return (
    <div
      className="
        rounded-xl
        border
        border-white/[0.06]
        bg-white/[0.02]
        p-4
      "
    >
      <p className="text-[8px] tracking-[0.15em] text-white/25">
        {label}
      </p>

      <p
        className={`mt-2 text-[10px] ${
          active
            ? "text-[#f35dce]"
            : "text-white/55"
        }`}
      >
        {active && (
          <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-[#f35dce] shadow-[0_0_10px_#f35dce]" />
        )}

        {value}
      </p>
    </div>
  );
}