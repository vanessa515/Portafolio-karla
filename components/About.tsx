"use client";

import { motion } from "motion/react";
import { Code2, Database, Layout, Terminal } from "lucide-react";

const stats = [
  {
    value: "9+",
    label: "PROYECTOS",
    description: "Web, sistemas y aplicaciones",
  },
  {
    value: "3+",
    label: "AÑOS",
    description: "Desarrollando soluciones",
  },
  {
    value: "B2",
    label: "INGLÉS",
    description: "Upper Intermediate",
  },
];

export default function About() {
  return (
    <section
      id="sobre-mi"
      className="relative overflow-hidden border-t border-white/5 py-28 md:py-36"
    >
      {/* Glow decorativo */}
      <div className="pointer-events-none absolute -left-[200px] top-[20%] h-[450px] w-[450px] rounded-full bg-[#f35dce]/5 blur-[150px]" />

      <div className="container relative z-10">

        {/* =========================
            ENCABEZADO
        ========================== */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-16 flex items-center gap-4"
        >
          <span className="font-mono text-xs text-[#f35dce]">
            01
          </span>

          <span className="h-[1px] w-10 bg-[#f35dce]" />

          <span className="font-mono text-xs tracking-[0.22em] text-white/40">
            SOBRE MÍ
          </span>
        </motion.div>

        {/* =========================
            CONTENIDO PRINCIPAL
        ========================== */}

        <div className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-24">

          {/* IZQUIERDA */}

          <div>
            <motion.h2
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7 }}
              className="max-w-[720px] text-[48px] font-semibold leading-[0.95] tracking-[-0.055em] sm:text-[60px] lg:text-[72px]"
            >
              Del análisis
              <br />
              <span className="text-white/30">al código.</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.7,
                delay: 0.1,
              }}
              className="mt-10 max-w-[650px] space-y-5 text-base leading-8 text-white/50"
            >
              <p>
                Soy Karla Vanessa Rubio Segura, Ingeniera en Desarrollo
                y Gestión de Software y desarrolladora Full Stack.
              </p>

              <p>
                Mi experiencia combina desarrollo de software, análisis
                de sistemas, soporte y optimización de procesos. Esto me
                permite entender un proyecto más allá del código:
                identificar el problema, estructurar la solución y
                convertirla en una herramienta funcional.
              </p>

              <p>
                He trabajado en desarrollo web, sistemas empresariales,
                interfaces, bases de datos y proyectos enfocados en
                resolver necesidades reales de operación.
              </p>
            </motion.div>

            {/* =========================
                STATS
            ========================== */}

            <div className="mt-14 grid gap-4 sm:grid-cols-3">

              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{
                    opacity: 0,
                    y: 25,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.08,
                  }}
                  whileHover={{
                    y: -6,
                  }}
                  className="
                    group
                    rounded-[20px]
                    border
                    border-white/[0.07]
                    bg-white/[0.025]
                    p-5
                    transition
                    hover:border-[#f35dce]/30
                    hover:bg-white/[0.04]
                  "
                >
                  <p className="text-[36px] font-semibold tracking-[-0.05em] text-white">
                    {stat.value}
                  </p>

                  <p className="mt-1 font-mono text-[9px] tracking-[0.2em] text-[#f35dce]">
                    {stat.label}
                  </p>

                  <p className="mt-3 text-xs leading-5 text-white/35">
                    {stat.description}
                  </p>
                </motion.div>
              ))}

            </div>
          </div>

          {/* =========================
              DERECHA
              PERFIL TÉCNICO
          ========================== */}

          <motion.div
            initial={{
              opacity: 0,
              x: 40,
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
              duration: 0.8,
            }}
            className="relative"
          >

            {/* Ventana estilo editor */}

            <div className="overflow-hidden rounded-[26px] border border-white/[0.08] bg-[#0b0e12] shadow-[0_30px_100px_rgba(0,0,0,0.35)]">

              {/* Barra superior */}

              <div className="flex h-12 items-center justify-between border-b border-white/[0.07] px-5">

                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#f35dce]/60" />
                </div>

                <p className="font-mono text-[9px] tracking-[0.15em] text-white/25">
                  profile.ts
                </p>

              </div>

              {/* Código */}

              <div className="p-6 font-mono text-[12px] leading-7 md:p-8">

                <p className="text-white/25">
                  {"// developer profile"}
                </p>

                <p className="mt-4">
                  <span className="text-[#f35dce]">
                    const
                  </span>

                  <span className="text-white/70">
                    {" "}karla
                  </span>

                  <span className="text-white/30">
                    {" = {"}
                  </span>
                </p>

                <div className="pl-5">

                  <p>
                    <span className="text-white/35">
                      role:
                    </span>{" "}

                    <span className="text-white/70">
                      &quot;Full Stack Developer&quot;
                    </span>,
                  </p>

                  <p>
                    <span className="text-white/35">
                      degree:
                    </span>{" "}

                    <span className="text-white/70">
                      &quot;Software Engineering&quot;
                    </span>,
                  </p>

                  <p>
                    <span className="text-white/35">
                      location:
                    </span>{" "}

                    <span className="text-white/70">
                      &quot;Guadalajara, MX&quot;
                    </span>,
                  </p>

                  <p>
                    <span className="text-white/35">
                      english:
                    </span>{" "}

                    <span className="text-white/70">
                      &quot;B2&quot;
                    </span>,
                  </p>

                  <p>
                    <span className="text-white/35">
                      mindset:
                    </span>{" "}

                    <span className="text-white/70">
                      &quot;Analyze → Design → Build&quot;
                    </span>
                  </p>

                </div>

                <p className="text-white/30">
                  {"};"}
                </p>

              </div>

              {/* =========================
                  ÁREAS
              ========================== */}

              <div className="grid grid-cols-2 border-t border-white/[0.07]">

                <div className="border-b border-r border-white/[0.07] p-5">
                  <Layout
                    size={19}
                    strokeWidth={1.5}
                    className="text-[#f35dce]"
                  />

                  <p className="mt-4 text-sm text-white/75">
                    Frontend
                  </p>

                  <p className="mt-1 text-xs text-white/30">
                    Interfaces & UX/UI
                  </p>
                </div>

                <div className="border-b border-white/[0.07] p-5">
                  <Terminal
                    size={19}
                    strokeWidth={1.5}
                    className="text-[#f35dce]"
                  />

                  <p className="mt-4 text-sm text-white/75">
                    Backend
                  </p>

                  <p className="mt-1 text-xs text-white/30">
                    Lógica & APIs
                  </p>
                </div>

                <div className="border-r border-white/[0.07] p-5">
                  <Database
                    size={19}
                    strokeWidth={1.5}
                    className="text-[#f35dce]"
                  />

                  <p className="mt-4 text-sm text-white/75">
                    Database
                  </p>

                  <p className="mt-1 text-xs text-white/30">
                    SQL & Data
                  </p>
                </div>

                <div className="p-5">
                  <Code2
                    size={19}
                    strokeWidth={1.5}
                    className="text-[#f35dce]"
                  />

                  <p className="mt-4 text-sm text-white/75">
                    Software
                  </p>

                  <p className="mt-1 text-xs text-white/30">
                    Systems & Solutions
                  </p>
                </div>

              </div>

            </div>

            {/* Etiqueta flotante */}

            <motion.div
              animate={{
                y: [0, -6, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                absolute
                -bottom-5
                -left-5
                hidden
                rounded-full
                border
                border-[#f35dce]/20
                bg-[#0d1014]
                px-5
                py-3
                font-mono
                text-[9px]
                tracking-[0.18em]
                text-[#f35dce]
                shadow-xl
                md:block
              "
            >
              SYSTEM.STATUS = ACTIVE
            </motion.div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}