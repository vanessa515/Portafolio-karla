"use client";

import { FormEvent, useEffect, useState } from "react";
import { Save, X } from "lucide-react";
import { supabase } from "@/lib/supabase";

export type ProyectoAdmin = {
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
  fecha_creacion: string;
  fecha_actualizacion: string;
};

type ProjectFormProps = {
  proyecto?: ProyectoAdmin | null;
  onClose: () => void;
  onSaved: () => void | Promise<void>;
};

export default function ProjectForm({
  proyecto = null,
  onClose,
  onSaved,
}: ProjectFormProps) {
  const editando = Boolean(proyecto);

  const [titulo, setTitulo] = useState("");
  const [categoria, setCategoria] = useState("");
  const [anio, setAnio] = useState("");
  const [resumen, setResumen] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [problema, setProblema] = useState("");
  const [solucion, setSolucion] = useState("");
  const [rol, setRol] = useState("");
  const [tecnologias, setTecnologias] = useState("");
  const [urlDemo, setUrlDemo] = useState("");
  const [urlRepositorio, setUrlRepositorio] =
    useState("");
  const [orden, setOrden] = useState("0");
  const [destacado, setDestacado] = useState(false);
  const [publicado, setPublicado] = useState(true);

  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!proyecto) {
      return;
    }

    setTitulo(proyecto.titulo);
    setCategoria(proyecto.categoria ?? "");
    setAnio(
      proyecto.anio
        ? String(proyecto.anio)
        : ""
    );
    setResumen(proyecto.resumen);
    setDescripcion(proyecto.descripcion ?? "");
    setProblema(proyecto.problema ?? "");
    setSolucion(proyecto.solucion ?? "");
    setRol(proyecto.rol ?? "");
    setTecnologias(
      proyecto.tecnologias.join(", ")
    );
    setUrlDemo(proyecto.url_demo ?? "");
    setUrlRepositorio(
      proyecto.url_repositorio ?? ""
    );
    setOrden(String(proyecto.orden));
    setDestacado(proyecto.destacado);
    setPublicado(proyecto.publicado);
  }, [proyecto]);

  const generarSlug = (texto: string) => {
    return texto
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const guardarProyecto = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const tituloLimpio = titulo.trim();
    const resumenLimpio = resumen.trim();

    if (!tituloLimpio || !resumenLimpio) {
      setError(
        "El título y el resumen son obligatorios."
      );
      return;
    }

    try {
      setGuardando(true);
      setError("");

      const listaTecnologias = tecnologias
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

      const datosProyecto = {
        slug: generarSlug(tituloLimpio),
        titulo: tituloLimpio,
        categoria:
          categoria.trim() || null,
        resumen: resumenLimpio,
        descripcion:
          descripcion.trim() || null,
        problema:
          problema.trim() || null,
        solucion:
          solucion.trim() || null,
        rol: rol.trim() || null,
        tecnologias: listaTecnologias,
        anio: anio
          ? Number(anio)
          : null,
        url_demo:
          urlDemo.trim() || null,
        url_repositorio:
          urlRepositorio.trim() || null,
        destacado,
        publicado,
        orden: Number(orden) || 0,
        fecha_actualizacion:
          new Date().toISOString(),
      };

      if (editando && proyecto) {
        const { error: errorActualizar } =
          await supabase
            .from("proyectos")
            .update(datosProyecto)
            .eq(
              "pk_proyecto",
              proyecto.pk_proyecto
            );

        if (errorActualizar) {
          console.error(
            "Error actualizando proyecto:",
            errorActualizar
          );

          if (
            errorActualizar.code === "23505"
          ) {
            setError(
              "Ya existe otro proyecto con un título similar."
            );
          } else {
            setError(
              "No fue posible actualizar el proyecto."
            );
          }

          return;
        }
      } else {
        const { error: errorInsertar } =
          await supabase
            .from("proyectos")
            .insert([datosProyecto]);

        if (errorInsertar) {
          console.error(
            "Error creando proyecto:",
            errorInsertar
          );

          if (
            errorInsertar.code === "23505"
          ) {
            setError(
              "Ya existe un proyecto con un título similar."
            );
          } else {
            setError(
              "No fue posible guardar el proyecto."
            );
          }

          return;
        }
      }

      await onSaved();
      onClose();
    } catch (error) {
      console.error(
        "Error inesperado:",
        error
      );

      setError(
        "Ocurrió un error inesperado."
      );
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/80 px-4 py-10 backdrop-blur-sm">
      <div className="w-full max-w-[900px] overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#0b0e12] shadow-[0_40px_100px_rgba(0,0,0,0.55)]">
        {/* HEADER */}

        <div className="flex items-center justify-between border-b border-white/[0.07] px-6 py-5">
          <div>
            <p className="font-mono text-[9px] tracking-[0.18em] text-[#f35dce]">
              {editando
                ? "ADMIN / EDIT PROJECT"
                : "ADMIN / NEW PROJECT"}
            </p>

            <h2 className="mt-2 text-2xl font-semibold">
              {editando
                ? "Editar proyecto"
                : "Nuevo proyecto"}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={guardando}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/35 transition hover:border-[#f35dce]/30 hover:text-[#f35dce] disabled:opacity-40"
          >
            <X size={16} />
          </button>
        </div>

        {/* FORMULARIO */}

        <form
          onSubmit={guardarProyecto}
          className="space-y-8 p-6 md:p-8"
        >
          <div className="grid gap-5 md:grid-cols-2">
            <Campo
              label="TÍTULO"
              value={titulo}
              onChange={setTitulo}
              placeholder="CRM Ponchados México"
              disabled={guardando}
            />

            <Campo
              label="CATEGORÍA"
              value={categoria}
              onChange={setCategoria}
              placeholder="CRM / Desarrollo Web"
              disabled={guardando}
            />

            <Campo
              label="AÑO"
              value={anio}
              onChange={setAnio}
              placeholder="2026"
              type="number"
              disabled={guardando}
            />

            <Campo
              label="ROL"
              value={rol}
              onChange={setRol}
              placeholder="Full Stack Developer"
              disabled={guardando}
            />
          </div>

          <Area
            label="RESUMEN"
            value={resumen}
            onChange={setResumen}
            placeholder="Descripción corta del proyecto."
            disabled={guardando}
          />

          <Area
            label="DESCRIPCIÓN"
            value={descripcion}
            onChange={setDescripcion}
            placeholder="Descripción completa del proyecto."
            disabled={guardando}
          />

          <div className="grid gap-5 md:grid-cols-2">
            <Area
              label="PROBLEMA"
              value={problema}
              onChange={setProblema}
              placeholder="¿Qué problema resolvía?"
              disabled={guardando}
            />

            <Area
              label="SOLUCIÓN"
              value={solucion}
              onChange={setSolucion}
              placeholder="¿Cómo lo resolviste?"
              disabled={guardando}
            />
          </div>

          <Campo
            label="TECNOLOGÍAS"
            value={tecnologias}
            onChange={setTecnologias}
            placeholder="PHP, MySQL, JavaScript, HTML, CSS"
            disabled={guardando}
          />

          <p className="-mt-5 font-mono text-[8px] text-white/15">
            Separa cada tecnología con una coma.
          </p>

          <div className="grid gap-5 md:grid-cols-2">
            <Campo
              label="URL DEMO"
              value={urlDemo}
              onChange={setUrlDemo}
              placeholder="https://..."
              type="url"
              disabled={guardando}
            />

            <Campo
              label="URL REPOSITORIO"
              value={urlRepositorio}
              onChange={setUrlRepositorio}
              placeholder="https://github.com/..."
              type="url"
              disabled={guardando}
            />
          </div>

          <Campo
            label="ORDEN"
            value={orden}
            onChange={setOrden}
            placeholder="1"
            type="number"
            disabled={guardando}
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <Switch
              label="DESTACADO"
              description="Mostrar como proyecto principal."
              value={destacado}
              onChange={setDestacado}
              disabled={guardando}
            />

            <Switch
              label="PUBLICADO"
              description="Visible en el portafolio público."
              value={publicado}
              onChange={setPublicado}
              disabled={guardando}
            />
          </div>

          {error && (
            <div className="rounded-xl border border-red-400/20 bg-red-400/5 px-4 py-3 text-center font-mono text-[9px] text-red-400">
              {error}
            </div>
          )}

          <div className="flex flex-col-reverse gap-3 border-t border-white/[0.07] pt-6 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              disabled={guardando}
              className="rounded-full border border-white/10 px-5 py-3 font-mono text-[9px] text-white/40 transition hover:text-white disabled:opacity-40"
            >
              CANCELAR
            </button>

            <button
              type="submit"
              disabled={guardando}
              className="flex items-center justify-center gap-2 rounded-full bg-[#f35dce] px-6 py-3 font-mono text-[9px] font-semibold text-[#07080a] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Save size={14} />

              {guardando
                ? "GUARDANDO..."
                : editando
                  ? "GUARDAR CAMBIOS"
                  : "GUARDAR PROYECTO"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Campo({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  disabled = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
  disabled?: boolean;
}) {
  return (
    <div>
      <label className="font-mono text-[8px] tracking-[0.15em] text-white/25">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder={placeholder}
        disabled={disabled}
        className="mt-2 w-full rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-white/15 focus:border-[#f35dce]/40 disabled:cursor-not-allowed disabled:opacity-50"
      />
    </div>
  );
}

function Area({
  label,
  value,
  onChange,
  placeholder,
  disabled = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  disabled?: boolean;
}) {
  return (
    <div>
      <label className="font-mono text-[8px] tracking-[0.15em] text-white/25">
        {label}
      </label>

      <textarea
        rows={4}
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder={placeholder}
        disabled={disabled}
        className="mt-2 w-full resize-none rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-3.5 text-sm leading-6 text-white outline-none transition placeholder:text-white/15 focus:border-[#f35dce]/40 disabled:cursor-not-allowed disabled:opacity-50"
      />
    </div>
  );
}

function Switch({
  label,
  description,
  value,
  onChange,
  disabled = false,
}: {
  label: string;
  description: string;
  value: boolean;
  onChange: (value: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => onChange(!value)}
      className={`flex items-center justify-between rounded-[18px] border p-5 text-left transition disabled:cursor-not-allowed disabled:opacity-50 ${
        value
          ? "border-[#f35dce]/25 bg-[#f35dce]/[0.04]"
          : "border-white/[0.07] bg-white/[0.01]"
      }`}
    >
      <div>
        <p className="font-mono text-[9px] text-white/60">
          {label}
        </p>

        <p className="mt-2 text-xs text-white/25">
          {description}
        </p>
      </div>

      <div
        className={`relative h-6 w-11 rounded-full transition ${
          value
            ? "bg-[#f35dce]"
            : "bg-white/10"
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
            value
              ? "left-6"
              : "left-1"
          }`}
        />
      </div>
    </button>
  );
}