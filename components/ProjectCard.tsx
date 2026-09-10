"use client";

import {
  ArrowUpRight,
} from "lucide-react";

import type { ProyectoPublico } from "@/components/Projects";

type ProjectCardProps = {
  proyecto: ProyectoPublico;
  numero: number;
};

export default function ProjectCard({
  proyecto,
  numero,
}: ProjectCardProps) {
  if (!proyecto) {
    return null;
  }

  const tecnologias =
    Array.isArray(proyecto.tecnologias)
      ? proyecto.tecnologias
      : [];

  const enlace =
    proyecto.url_demo ??
    proyecto.url_repositorio;

  return (
    <article className="group relative min-h-[290px] overflow-hidden rounded-[22px] border border-white/[0.07] bg-[#0a0d12] p-7 transition-colors duration-300 hover:border-[#f35dce]/30">
      {/* HEADER */}

      <div className="flex items-center justify-between">
        <span className="font-mono text-[8px] text-[#f35dce]">
          {String(numero).padStart(
            2,
            "0"
          )}
        </span>

        {proyecto.anio && (
          <span className="font-mono text-[7px] text-white/15">
            {proyecto.anio}
          </span>
        )}
      </div>

      {/* CATEGORÍA */}

      <p className="mt-8 font-mono text-[7px] uppercase tracking-[0.16em] text-white/20">
        {proyecto.categoria ||
          "DESARROLLO WEB"}
      </p>

      {/* TÍTULO */}

      <h3 className="mt-4 text-[27px] font-semibold tracking-[-0.04em] text-white">
        {proyecto.titulo}
      </h3>

      {/* RESUMEN */}

      <p className="mt-4 max-w-[520px] text-xs leading-6 text-white/35">
        {proyecto.resumen}
      </p>

      {/* TECNOLOGÍAS */}

      {tecnologias.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {tecnologias
            .slice(0, 5)
            .map((tecnologia) => (
              <span
                key={tecnologia}
                className="rounded-full border border-white/[0.07] px-3 py-1 font-mono text-[6px] text-white/25"
              >
                {tecnologia}
              </span>
            ))}
        </div>
      )}

      {/* LINK */}

      <div className="mt-8">
        {enlace ? (
          <a
            href={enlace}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 font-mono text-[7px] tracking-[0.14em] text-white/30 transition hover:text-[#f35dce]"
          >
            VER PROYECTO
            <ArrowUpRight size={11} />
          </a>
        ) : (
          <span className="font-mono text-[7px] tracking-[0.14em] text-white/15">
            PROYECTO PRIVADO
          </span>
        )}
      </div>
    </article>
  );
}