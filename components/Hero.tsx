"use client";

import { motion } from "motion/react";
import Badge from "./Badge";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-screen items-center overflow-hidden pt-[74px]"
    >
      {/* Glow de fondo */}
      <div className="pointer-events-none absolute right-[6%] top-[18%] h-[420px] w-[420px] rounded-full bg-[#f35dce]/10 blur-[140px]" />

      <div className="container relative z-10 grid items-center gap-12 py-20 lg:grid-cols-[1.15fr_0.85fr]">
        {/* CONTENIDO IZQUIERDO */}
        <div>
          <motion.div
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.55,
              delay: 0.1,
            }}
            className="mb-7 flex items-center gap-3"
          >
            <span className="h-[1px] w-10 bg-[#f35dce]" />

            <p className="font-mono text-[11px] tracking-[0.24em] text-[#f35dce]">
              SOFTWARE ENGINEER / FULL STACK DEVELOPER
            </p>
          </motion.div>

          {/* TÍTULO PRINCIPAL */}
          <motion.h1
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
              delay: 0.2,
              ease: "easeOut",
            }}
            className="max-w-[850px] text-[48px] font-semibold leading-[0.98] tracking-[-0.055em] sm:text-[62px] lg:text-[78px]"
          >
            Ingeniera en
            <br />
            Desarrollo y Gestión
            <br />
            <span className="text-[#f35dce]">de Software.</span>
          </motion.h1>

          {/* FULL STACK */}
          <motion.p
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
              delay: 0.35,
            }}
            className="mt-6 font-mono text-sm tracking-[0.18em] text-white/45"
          >
            FULL STACK DEVELOPER
          </motion.p>

          {/* DESCRIPCIÓN */}
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.65,
              delay: 0.45,
            }}
            className="mt-8 max-w-[650px] space-y-4 text-base leading-7 text-white/55 md:text-lg"
          >
            <p>
              Me especializo en convertir necesidades y procesos en soluciones
              digitales, desde la experiencia de usuario y el frontend hasta la
              lógica de negocio y la base de datos.
            </p>

            <p>
              Desarrollo sistemas web completos, interfaces funcionales y
              herramientas orientadas a mejorar procesos y facilitar el trabajo
              de las empresas.
            </p>
          </motion.div>

          {/* BOTONES */}
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
              delay: 0.6,
            }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <a
              href="#proyectos"
              className="rounded-full bg-[#f35dce] px-6 py-3 text-sm font-semibold text-[#09090a] transition duration-300 hover:scale-[1.04]"
            >
              VER PROYECTOS
            </a>

            <a
              href="#contacto"
              className="rounded-full border border-white/10 px-6 py-3 text-sm text-white/70 transition duration-300 hover:border-[#f35dce]/40 hover:text-white"
            >
              CONTÁCTAME
            </a>
          </motion.div>

          {/* LINKS */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.7,
              delay: 0.75,
            }}
            className="mt-9 flex items-center gap-6 font-mono text-xs text-white/35"
          >
            <a
              href="https://github.com/vanessa515"
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-[#f35dce]"
            >
              GITHUB ↗
            </a>

            <a
              href="#contacto"
              className="transition hover:text-[#f35dce]"
            >
              CONTACTO ↗
            </a>
          </motion.div>

          {/* CÓDIGO */}
          <motion.div
            initial={{
              opacity: 0,
              x: -20,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.8,
              delay: 0.9,
            }}
            className="mt-12 border-l border-[#f35dce]/60 pl-5 font-mono text-xs leading-6 text-white/30"
          >
            <p>
              <span className="text-[#f35dce]">const</span>{" "}
              developer = {"{"}
            </p>

            <p className="pl-5">
              degree:{" "}
              <span className="text-white/60">
                &quot;Software Engineering&quot;
              </span>
              ,
            </p>

            <p className="pl-5">
              role:{" "}
              <span className="text-white/60">
                &quot;Full Stack Developer&quot;
              </span>
              ,
            </p>

            <p className="pl-5">
              focus:{" "}
              <span className="text-white/60">
                &quot;Systems & Web Development&quot;
              </span>
            </p>

            <p>{"}"}</p>
          </motion.div>
        </div>

        {/* GAFETE */}
        <Badge />
      </div>

      {/* SCROLL */}
      <div className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 items-center gap-3 font-mono text-[9px] tracking-[0.18em] text-white/25 md:flex">
        <span>SCROLL TO EXPLORE</span>
        <span>↓</span>
      </div>
    </section>
  );
}