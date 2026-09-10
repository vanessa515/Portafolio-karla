"use client";

import { motion } from "motion/react";
import { BriefcaseBusiness, MapPin } from "lucide-react";

const experiences = [
  {
    company: "Enlace Patrimonial",
    role: "Analista de Sistemas",
    period: "2025 — 2026",
    location: "Guadalajara, Jalisco",
    description:
      "Análisis y optimización de procesos, desarrollo de herramientas internas, creación de dashboards en Excel y participación en el desarrollo de una tienda en línea.",
    tags: [
      "Análisis de Sistemas",
      "Optimización",
      "Excel",
      "Web",
    ],
  },
  {
    company: "GIRO",
    role: "Desarrolladora Web y Analista de Soporte",
    period: "2025",
    location: "Guadalajara, Jalisco",
    description:
      "Soporte general a sistemas, mantenimiento e instalación de software, atención a usuarios y participación en el desarrollo de soluciones web para procesos internos.",
    tags: [
      "Soporte",
      "Desarrollo Web",
      "Sistemas",
      "Atención a usuarios",
    ],
  },
  {
    company: "Deshidratadora MMH",
    role: "Desarrolladora Web",
    period: "2023 — 2024",
    location: "México",
    description:
      "Diseño y desarrollo del sitio web de la empresa, mantenimiento del contenido digital y apoyo en materiales publicitarios.",
    tags: [
      "HTML",
      "CSS",
      "JavaScript",
      "Diseño Web",
    ],
  },
  {
    company: "Innovative Net",
    role: "Desarrolladora Web",
    period: "2023",
    location: "México",
    description:
      "Desarrollo del sitio web corporativo, diseño de banners y participación en la creación de un sistema de cotización CAS.",
    tags: [
      "Frontend",
      "Web",
      "UI",
      "Sistemas",
    ],
  },
];

export default function Experience() {
  return (
    <section
      id="experiencia"
      className="relative overflow-hidden border-t border-white/5 py-28 md:py-36"
    >
      <div className="pointer-events-none absolute -right-[220px] top-[20%] h-[500px] w-[500px] rounded-full bg-[#f35dce]/5 blur-[160px]" />

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
            03
          </span>

          <span className="h-[1px] w-10 bg-[#f35dce]" />

          <span className="font-mono text-xs tracking-[0.22em] text-white/40">
            EXPERIENCIA
          </span>
        </motion.div>

        {/* TÍTULO */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-12"
        >
          <h2 className="max-w-[800px] text-[48px] font-semibold leading-[0.95] tracking-[-0.055em] sm:text-[60px] lg:text-[72px]">
            Experiencia
            <br />
            <span className="text-white/30">
              profesional.
            </span>
          </h2>

          <p className="mt-8 max-w-[650px] text-base leading-8 text-white/40">
            Experiencia en desarrollo, análisis de sistemas, soporte técnico
            y creación de soluciones digitales orientadas a necesidades
            reales de operación.
          </p>
        </motion.div>

        {/* TIMELINE */}
        <div className="relative mt-20">

          {/* Línea vertical */}
          <div className="absolute left-[11px] top-0 hidden h-full w-[1px] bg-gradient-to-b from-[#f35dce] via-white/10 to-transparent md:block" />

          <div className="space-y-8">

            {experiences.map((experience, index) => (
              <motion.article
                key={`${experience.company}-${experience.period}`}
                initial={{
                  opacity: 0,
                  x: -30,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.2,
                }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.08,
                }}
                className="relative md:pl-16"
              >

                {/* Punto */}
                <div
                  className="
                    absolute
                    left-0
                    top-10
                    hidden
                    h-[23px]
                    w-[23px]
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-[#f35dce]/40
                    bg-[#07080a]
                    md:flex
                  "
                >
                  <span
                    className="
                      h-[7px]
                      w-[7px]
                      rounded-full
                      bg-[#f35dce]
                      shadow-[0_0_14px_#f35dce]
                    "
                  />
                </div>

                {/* Card */}
                <div
                  className="
                    group
                    relative
                    overflow-hidden
                    rounded-[26px]
                    border
                    border-white/[0.07]
                    bg-[#0b0e12]
                    p-6
                    transition
                    duration-300
                    hover:border-[#f35dce]/30
                    md:p-8
                  "
                >

                  <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">

                    {/* IZQUIERDA */}
                    <div>

                      <div className="flex items-center gap-3 text-[#f35dce]">
                        <BriefcaseBusiness
                          size={18}
                          strokeWidth={1.5}
                        />

                        <span className="font-mono text-[9px] tracking-[0.18em]">
                          {experience.period}
                        </span>
                      </div>

                      <h3 className="mt-5 text-[28px] font-semibold tracking-[-0.04em]">
                        {experience.company}
                      </h3>

                      <p className="mt-2 text-sm text-white/50">
                        {experience.role}
                      </p>

                      <div className="mt-5 flex items-center gap-2 font-mono text-[9px] text-white/25">
                        <MapPin size={12} />

                        {experience.location}
                      </div>

                    </div>

                    {/* DERECHA */}
                    <div>

                      <p className="max-w-[680px] text-sm leading-7 text-white/45">
                        {experience.description}
                      </p>

                      <div className="mt-7 flex flex-wrap gap-2">

                        {experience.tags.map((tag) => (
                          <span
                            key={tag}
                            className="
                              rounded-full
                              border
                              border-white/[0.07]
                              bg-white/[0.02]
                              px-3
                              py-1.5
                              font-mono
                              text-[9px]
                              text-white/35
                            "
                          >
                            {tag}
                          </span>
                        ))}

                      </div>

                    </div>

                  </div>

                  {/* Número decorativo */}
                  <span className="pointer-events-none absolute -bottom-5 right-5 font-mono text-[80px] font-semibold text-white/[0.015]">
                    0{index + 1}
                  </span>

                </div>

              </motion.article>
            ))}

          </div>

        </div>

      </div>
    </section>
  );
}