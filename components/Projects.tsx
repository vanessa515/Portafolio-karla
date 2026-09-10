"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  motion,
} from "motion/react";

import {
  ArrowUpRight,
  Code2,
  RefreshCw,
} from "lucide-react";

import { supabase } from "@/lib/supabase";
import ProjectCard from "@/components/ProjectCard";

export type ProyectoPublico = {
  pk_proyecto: string;
  slug: string;
  titulo: string;
  categoria: string | null;
  resumen: string;
  descripcion: string | null;
  problema: string | null;
  solucion: string | null;
  rol: string | null;
  tecnologias: string[];
  anio: number | null;
  url_demo: string | null;
  url_repositorio: string | null;
  destacado: boolean;
  publicado: boolean;
  orden: number;
};

export default function Projects() {
  const [proyectos, setProyectos] =
    useState<ProyectoPublico[]>([]);

  const [cargando, setCargando] =
    useState(true);

  const [error, setError] =
    useState(false);

  const cargarProyectos =
    useCallback(async () => {
      try {
        setCargando(true);
        setError(false);

        const {
          data,
          error: errorSupabase,
        } = await supabase
          .from("proyectos")
          .select("*")
          .eq("publicado", true)
          .order("destacado", {
            ascending: false,
          })
          .order("orden", {
            ascending: true,
          });

        if (errorSupabase) {
          console.error(
            "Error cargando proyectos:",
            errorSupabase
          );

          setError(true);
          return;
        }

        setProyectos(
          (data ?? []) as ProyectoPublico[]
        );
      } catch (error) {
        console.error(
          "Error inesperado:",
          error
        );

        setError(true);
      } finally {
        setCargando(false);
      }
    }, []);

  useEffect(() => {
    cargarProyectos();
  }, [cargarProyectos]);

  const proyectoDestacado =
    proyectos.find(
      (proyecto) => proyecto.destacado
    ) ?? proyectos[0];

  const proyectosSecundarios =
    proyectoDestacado
      ? proyectos.filter(
          (proyecto) =>
            proyecto.pk_proyecto !==
            proyectoDestacado.pk_proyecto
        )
      : [];

  return (
    <section
      id="proyectos"
      className="relative overflow-hidden border-t border-white/[0.05] bg-[#07080a] py-24 md:py-32"
    >
      {/* GRID DE FONDO */}

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.022]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.7) 1px, transparent 1px)",
          backgroundSize: "42px 42px",
        }}
      />

      <div className="container relative z-10">
        {/* HEADER */}

        <div className="grid gap-10 lg:grid-cols-[1fr_360px] lg:items-end">
          <div>
            <div className="flex items-center gap-4">
              <span className="font-mono text-[9px] tracking-[0.18em] text-[#f35dce]">
                02
              </span>

              <span className="h-px w-8 bg-[#f35dce]/40" />

              <span className="font-mono text-[9px] tracking-[0.18em] text-[#f35dce]">
                PROYECTOS
              </span>
            </div>

            <h2 className="mt-7 max-w-[720px] text-[46px] font-semibold leading-[0.95] tracking-[-0.055em] text-white sm:text-[58px] lg:text-[70px]">
              Proyectos que
              <br />

              <span className="text-[#f35dce]">
                resuelven problemas.
              </span>
            </h2>
          </div>

          <p className="max-w-[350px] text-sm leading-7 text-white/30">
            Una selección de sistemas, sitios web
            y soluciones desarrolladas durante mi
            experiencia profesional y formación.
          </p>
        </div>

        {/* CARGANDO */}

        {cargando && (
          <div className="mt-16 flex min-h-[360px] items-center justify-center rounded-[28px] border border-white/[0.06] bg-[#0b0e12]">
            <div className="text-center">
              <RefreshCw
                size={20}
                className="mx-auto animate-spin text-[#f35dce]"
              />

              <p className="mt-4 font-mono text-[9px] tracking-[0.15em] text-white/20">
                LOADING_PROJECTS...
              </p>
            </div>
          </div>
        )}

        {/* ERROR */}

        {!cargando && error && (
          <div className="mt-16 rounded-[28px] border border-red-400/10 bg-red-400/[0.02] px-6 py-16 text-center">
            <p className="font-mono text-[10px] text-red-400/60">
              PROJECT_DATABASE_ERROR
            </p>

            <button
              type="button"
              onClick={cargarProyectos}
              className="mt-5 rounded-full border border-white/10 px-5 py-3 font-mono text-[9px] text-white/40 transition hover:border-[#f35dce]/30 hover:text-[#f35dce]"
            >
              REINTENTAR
            </button>
          </div>
        )}

        {/* SIN PROYECTOS */}

        {!cargando &&
          !error &&
          proyectos.length === 0 && (
            <div className="mt-16 rounded-[28px] border border-white/[0.06] bg-[#0b0e12] px-6 py-20 text-center">
              <p className="font-mono text-[10px] tracking-[0.15em] text-white/20">
                NO_PUBLISHED_PROJECTS
              </p>
            </div>
          )}

        {/* DESTACADO */}

        {!cargando &&
          !error &&
          proyectoDestacado && (
            <div className="mt-16">
              <FeaturedProject
                proyecto={proyectoDestacado}
              />
            </div>
          )}

        {/* PROYECTOS SECUNDARIOS */}

        {!cargando &&
          !error &&
          proyectosSecundarios.length > 0 && (
            <div className="mt-20">
              <div className="mb-8 flex items-end justify-between gap-6">
                <div>
                  <p className="font-mono text-[8px] tracking-[0.16em] text-[#f35dce]">
                    SELECTED WORK
                  </p>

                  <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-white">
                    Mis proyectos
                  </h3>
                </div>

                <div className="hidden items-center gap-3 sm:flex">
                  <span className="h-px w-8 bg-white/10" />

                  <span className="font-mono text-[7px] text-white/15">
                    INDEX
                  </span>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {proyectosSecundarios.map(
                  (proyecto, index) => (
                    <ProjectCard
                      key={
                        proyecto.pk_proyecto
                      }
                      proyecto={proyecto}
                      numero={index + 2}
                    />
                  )
                )}
              </div>
            </div>
          )}
      </div>
    </section>
  );
}

/* =========================================
   PROYECTO DESTACADO
========================================= */

function FeaturedProject({
  proyecto,
}: {
  proyecto: ProyectoPublico;
}) {
  const tecnologias =
    Array.isArray(proyecto.tecnologias)
      ? proyecto.tecnologias
      : [];

  const enlace =
    proyecto.url_demo ??
    proyecto.url_repositorio;

  return (
    <div className="relative overflow-hidden rounded-[28px] border border-[#f35dce]/20 bg-[#0a0d12]">
      {/* SUPERIOR */}

      <div className="flex items-center justify-between border-b border-white/[0.05] px-7 py-4">
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-[#f35dce]" />

          <span className="font-mono text-[7px] tracking-[0.16em] text-[#f35dce]">
            FEATURED PROJECT
          </span>
        </div>

        <span className="font-mono text-[7px] text-white/15">
          01
        </span>
      </div>

      {/* CONTENIDO */}

      <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
        {/* IZQUIERDA */}

        <div className="relative flex min-h-[460px] flex-col justify-between p-8 md:p-10 lg:border-r lg:border-white/[0.05]">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <Code2
                size={13}
                className="text-[#f35dce]"
              />

              <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-white/25">
                {proyecto.categoria ||
                  "Sistema Web"}
              </span>

              {proyecto.anio && (
                <>
                  <span className="text-white/10">
                    /
                  </span>

                  <span className="font-mono text-[8px] text-white/20">
                    {proyecto.anio}
                  </span>
                </>
              )}
            </div>

            <h3 className="mt-7 max-w-[520px] text-[44px] font-semibold leading-[0.93] tracking-[-0.055em] text-white md:text-[54px]">
              {proyecto.titulo}
            </h3>

            <p className="mt-7 max-w-[520px] text-sm leading-7 text-white/35">
              {proyecto.resumen}
            </p>

            {tecnologias.length > 0 && (
              <div className="mt-7 flex flex-wrap gap-2">
                {tecnologias.map(
                  (tecnologia) => (
                    <span
                      key={tecnologia}
                      className="rounded-full border border-white/[0.07] px-3 py-1.5 font-mono text-[7px] text-white/30"
                    >
                      {tecnologia}
                    </span>
                  )
                )}
              </div>
            )}
          </div>

          <div className="mt-10">
            {enlace ? (
              <a
                href={enlace}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 font-mono text-[8px] tracking-[0.15em] text-[#f35dce] transition hover:text-white"
              >
                VER PROYECTO
                <ArrowUpRight size={12} />
              </a>
            ) : (
              <span className="font-mono text-[8px] tracking-[0.15em] text-[#f35dce]">
                CASE STUDY ↗
              </span>
            )}
          </div>
        </div>

        {/* DASHBOARD DERECHO */}

        <DashboardAnimation />
      </div>
    </div>
  );
}

/* =========================================
   DASHBOARD ANIMADO
========================================= */

function DashboardAnimation() {
  const barras = [
    54, 78, 62, 84, 67, 74, 58, 49,
  ];

  return (
    <div className="relative flex min-h-[460px] items-center justify-center overflow-hidden bg-[#080b10] p-6 md:p-10">
      {/* GLOW */}

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(243,93,206,0.06),transparent_60%)]" />

      {/* VENTANA */}

      <div className="relative w-full max-w-[520px] rounded-[20px] border border-white/[0.08] bg-[#0d1118] p-5 shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
        {/* WINDOW HEADER */}

        <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
          <div className="flex gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[#f35dce]" />
            <span className="h-2 w-2 rounded-full bg-white/10" />
            <span className="h-2 w-2 rounded-full bg-white/10" />
          </div>

          <div className="h-1.5 w-14 rounded-full bg-white/10" />
        </div>

        {/* DASHBOARD */}

        <div className="mt-5 grid grid-cols-[38px_1fr] gap-5">
          {/* SIDEBAR */}

          <div className="space-y-3">
            <div className="h-8 rounded-md bg-[#f35dce]" />

            <div className="h-8 rounded-md bg-white/[0.04]" />
            <div className="h-8 rounded-md bg-white/[0.04]" />
            <div className="h-8 rounded-md bg-white/[0.04]" />
          </div>

          {/* MAIN */}

          <div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-white/70">
                  Dashboard
                </p>

                <p className="mt-1 font-mono text-[6px] text-white/15">
                  overview
                </p>
              </div>

              <motion.div
                className="h-6 w-16 rounded-md bg-[#f35dce]"
                animate={{
                  opacity: [0.65, 1, 0.65],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />
            </div>

            {/* STATS */}

            <div className="mt-5 grid grid-cols-3 gap-3">
              <DashboardStat
                label="CLIENTES"
                value="128"
              />

              <DashboardStat
                label="LEADS"
                value="46"
              />

              <DashboardStat
                label="EFICIENCIA"
                value="72%"
              />
            </div>

            {/* CHART */}

            <div className="mt-5 rounded-xl border border-white/[0.05] bg-white/[0.015] p-4">
              <div className="mb-5 flex items-center justify-between">
                <p className="font-mono text-[6px] text-white/20">
                  ACTIVITY
                </p>

                <motion.span
                  className="h-2 w-2 rounded-full bg-[#f35dce]"
                  animate={{
                    opacity: [1, 0.2, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                />
              </div>

              <div className="flex h-[100px] items-end gap-2">
                {barras.map(
                  (altura, index) => (
                    <motion.div
                      key={index}
                      className="flex-1 rounded-t-sm bg-[#f35dce]"
                      initial={{
                        height: "18%",
                      }}
                      animate={{
                        height: [
                          `${Math.max(
                            20,
                            altura - 20
                          )}%`,
                          `${altura}%`,
                          `${Math.max(
                            20,
                            altura - 10
                          )}%`,
                        ],
                      }}
                      transition={{
                        duration:
                          2.2 +
                          index * 0.12,
                        repeat: Infinity,
                        repeatType:
                          "reverse",
                        ease: "easeInOut",
                      }}
                    />
                  )
                )}
              </div>
            </div>

            {/* LÍNEAS */}

            <div className="mt-5 grid grid-cols-2 gap-8">
              <div className="space-y-2">
                <Line width="75%" />
                <Line width="95%" />
                <Line width="65%" />
              </div>

              <div className="space-y-2">
                <Line
                  width="80%"
                  accent
                />
                <Line width="60%" />
                <Line
                  width="70%"
                  accent
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardStat({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border border-white/[0.05] bg-white/[0.015] p-3">
      <p className="font-mono text-[5px] tracking-[0.1em] text-white/15">
        {label}
      </p>

      <p className="mt-2 text-sm font-semibold text-white/65">
        {value}
      </p>
    </div>
  );
}

function Line({
  width,
  accent = false,
}: {
  width: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`h-1 rounded-full ${
        accent
          ? "bg-[#f35dce]/55"
          : "bg-white/10"
      }`}
      style={{
        width,
      }}
    />
  );
}