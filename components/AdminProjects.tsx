"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  ArrowLeft,
  ExternalLink,
  Eye,
  EyeOff,
  FolderKanban,
  Pencil,
  Plus,
  RefreshCw,
  Star,
  StarOff,
  Trash2,
} from "lucide-react";

import { supabase } from "@/lib/supabase";

import ProjectForm, {
  ProyectoAdmin,
} from "@/components/ProjectForm";

export default function AdminProjects() {
  const router = useRouter();

  const [proyectos, setProyectos] =
    useState<ProyectoAdmin[]>([]);

  const [cargando, setCargando] =
    useState(true);

  const [
    mostrarFormulario,
    setMostrarFormulario,
  ] = useState(false);

  const [
    proyectoEditar,
    setProyectoEditar,
  ] = useState<ProyectoAdmin | null>(
    null
  );

  const [
    procesandoId,
    setProcesandoId,
  ] = useState<string | null>(null);

  /* =========================================
     CARGAR PROYECTOS
  ========================================= */

  const cargarProyectos =
    useCallback(async () => {
      try {
        setCargando(true);

        const { data, error } =
          await supabase
            .from("proyectos")
            .select("*")
            .order("orden", {
              ascending: true,
            })
            .order("fecha_creacion", {
              ascending: false,
            });

        if (error) {
          console.error(
            "Error cargando proyectos:",
            error
          );

          return;
        }

        setProyectos(data ?? []);
      } catch (error) {
        console.error(
          "Error inesperado:",
          error
        );
      } finally {
        setCargando(false);
      }
    }, []);

  /* =========================================
     SESIÓN
  ========================================= */

  useEffect(() => {
    const inicializar = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.replace("/admin");
        return;
      }

      await cargarProyectos();
    };

    inicializar();
  }, [router, cargarProyectos]);

  /* =========================================
     NUEVO
  ========================================= */

  const nuevoProyecto = () => {
    setProyectoEditar(null);
    setMostrarFormulario(true);
  };

  /* =========================================
     EDITAR
  ========================================= */

  const editarProyecto = (
    proyecto: ProyectoAdmin
  ) => {
    setProyectoEditar(proyecto);
    setMostrarFormulario(true);
  };

  /* =========================================
     PUBLICAR / OCULTAR
  ========================================= */

  const cambiarPublicacion = async (
    proyecto: ProyectoAdmin
  ) => {
    try {
      setProcesandoId(
        proyecto.pk_proyecto
      );

      const { error } = await supabase
        .from("proyectos")
        .update({
          publicado: !proyecto.publicado,
          fecha_actualizacion:
            new Date().toISOString(),
        })
        .eq(
          "pk_proyecto",
          proyecto.pk_proyecto
        );

      if (error) {
        console.error(
          "Error cambiando publicación:",
          error
        );
        return;
      }

      await cargarProyectos();
    } finally {
      setProcesandoId(null);
    }
  };

  /* =========================================
     DESTACAR
  ========================================= */

  const cambiarDestacado = async (
    proyecto: ProyectoAdmin
  ) => {
    try {
      setProcesandoId(
        proyecto.pk_proyecto
      );

      const { error } = await supabase
        .from("proyectos")
        .update({
          destacado: !proyecto.destacado,
          fecha_actualizacion:
            new Date().toISOString(),
        })
        .eq(
          "pk_proyecto",
          proyecto.pk_proyecto
        );

      if (error) {
        console.error(
          "Error cambiando destacado:",
          error
        );
        return;
      }

      await cargarProyectos();
    } finally {
      setProcesandoId(null);
    }
  };

  /* =========================================
     ELIMINAR
  ========================================= */

  const eliminarProyecto = async (
    proyecto: ProyectoAdmin
  ) => {
    const confirmar = window.confirm(
      `¿Seguro que quieres eliminar "${proyecto.titulo}"?\n\nEsta acción no se puede deshacer.`
    );

    if (!confirmar) {
      return;
    }

    try {
      setProcesandoId(
        proyecto.pk_proyecto
      );

      const { error } = await supabase
        .from("proyectos")
        .delete()
        .eq(
          "pk_proyecto",
          proyecto.pk_proyecto
        );

      if (error) {
        console.error(
          "Error eliminando proyecto:",
          error
        );
        return;
      }

      await cargarProyectos();
    } finally {
      setProcesandoId(null);
    }
  };

  /* =========================================
     ESTADÍSTICAS
  ========================================= */

  const publicados =
    proyectos.filter(
      (proyecto) => proyecto.publicado
    ).length;

  const destacados =
    proyectos.filter(
      (proyecto) => proyecto.destacado
    ).length;

  return (
    <main className="min-h-screen bg-[#07080a] text-white">
      {/* =====================================
          HEADER
      ===================================== */}

      <header className="sticky top-0 z-50 border-b border-white/[0.07] bg-[#07080a]/90 backdrop-blur-xl">
        <div className="container flex h-[72px] items-center justify-between">
          <div>
            <p className="font-mono text-[10px] tracking-[0.18em] text-[#f35dce]">
              KVR / ADMIN
            </p>

            <p className="mt-1 text-xs text-white/25">
              Portfolio Dashboard
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/dashboard"
              className="rounded-full border border-white/10 px-4 py-2 font-mono text-[9px] text-white/40 transition hover:border-[#f35dce]/30 hover:text-[#f35dce]"
            >
              MENSAJES
            </Link>

            <span className="rounded-full bg-[#f35dce] px-4 py-2 font-mono text-[9px] font-semibold text-[#07080a]">
              PROYECTOS
            </span>
          </div>
        </div>
      </header>

      {/* =====================================
          CONTENIDO
      ===================================== */}

      <div className="container py-14">
        <Link
          href="/admin/dashboard"
          className="inline-flex items-center gap-2 font-mono text-[9px] tracking-[0.12em] text-white/30 transition hover:text-[#f35dce]"
        >
          <ArrowLeft size={14} />
          DASHBOARD
        </Link>

        {/* ENCABEZADO */}

        <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-[10px] tracking-[0.18em] text-[#f35dce]">
              ADMIN / PROJECTS
            </p>

            <h1 className="mt-4 text-[48px] font-semibold tracking-[-0.055em]">
              Proyectos
              <span className="text-white/25">
                .
              </span>
            </h1>

            <p className="mt-3 max-w-[550px] text-sm leading-6 text-white/30">
              Crea, edita y administra los
              proyectos de tu portafolio.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={cargarProyectos}
              disabled={cargando}
              className="flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 font-mono text-[9px] text-white/40 transition hover:border-[#f35dce]/30 hover:text-[#f35dce] disabled:opacity-40"
            >
              <RefreshCw
                size={14}
                className={
                  cargando
                    ? "animate-spin"
                    : ""
                }
              />

              ACTUALIZAR
            </button>

            <button
              type="button"
              onClick={nuevoProyecto}
              className="flex items-center gap-2 rounded-full bg-[#f35dce] px-5 py-3 font-mono text-[9px] font-semibold text-[#07080a] transition hover:opacity-90"
            >
              <Plus size={15} />

              NUEVO PROYECTO
            </button>
          </div>
        </div>

        {/* ESTADÍSTICAS */}

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          <Stat
            title="TOTAL"
            value={proyectos.length}
          />

          <Stat
            title="PUBLICADOS"
            value={publicados}
          />

          <Stat
            title="DESTACADOS"
            value={destacados}
            active
          />
        </div>

        {/* LISTA */}

        <div className="mt-8 overflow-hidden rounded-[26px] border border-white/[0.07] bg-[#0b0e12]">
          <div className="flex items-center justify-between border-b border-white/[0.07] px-6 py-5">
            <div className="flex items-center gap-3">
              <FolderKanban
                size={17}
                className="text-[#f35dce]"
              />

              <p className="font-mono text-[9px] tracking-[0.15em] text-white/30">
                PROJECT_DATABASE
              </p>
            </div>

            <p className="font-mono text-[8px] text-white/15">
              {proyectos.length} RECORDS
            </p>
          </div>

          {cargando ? (
            <div className="flex min-h-[300px] items-center justify-center">
              <div className="text-center">
                <RefreshCw
                  size={20}
                  className="mx-auto animate-spin text-[#f35dce]"
                />

                <p className="mt-4 font-mono text-[9px] text-white/25">
                  LOADING_PROJECTS...
                </p>
              </div>
            </div>
          ) : proyectos.length === 0 ? (
            <div className="flex min-h-[330px] items-center justify-center p-8">
              <div className="text-center">
                <FolderKanban
                  size={32}
                  className="mx-auto text-white/10"
                />

                <p className="mt-5 font-mono text-[10px] text-white/25">
                  NO_PROJECTS_FOUND
                </p>

                <p className="mt-3 text-sm text-white/25">
                  Todavía no hay proyectos
                  registrados.
                </p>
              </div>
            </div>
          ) : (
            <div>
              {proyectos.map(
                (proyecto, index) => {
                  const procesando =
                    procesandoId ===
                    proyecto.pk_proyecto;

                  return (
                    <div
                      key={
                        proyecto.pk_proyecto
                      }
                      className="grid gap-6 border-b border-white/[0.05] p-6 last:border-0 xl:grid-cols-[60px_1fr_auto] xl:items-center"
                    >
                      {/* NÚMERO */}

                      <p className="font-mono text-[11px] text-[#f35dce]">
                        #
                        {String(
                          index + 1
                        ).padStart(2, "0")}
                      </p>

                      {/* INFO */}

                      <div>
                        <div className="flex flex-wrap items-center gap-3">
                          <h2 className="text-lg font-semibold">
                            {
                              proyecto.titulo
                            }
                          </h2>

                          {proyecto.destacado && (
                            <span className="rounded-full border border-[#f35dce]/20 bg-[#f35dce]/5 px-2.5 py-1 font-mono text-[7px] text-[#f35dce]">
                              FEATURED
                            </span>
                          )}

                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[7px] ${
                              proyecto.publicado
                                ? "border-white/10 text-white/35"
                                : "border-white/5 text-white/15"
                            }`}
                          >
                            {proyecto.publicado ? (
                              <Eye
                                size={10}
                              />
                            ) : (
                              <EyeOff
                                size={10}
                              />
                            )}

                            {proyecto.publicado
                              ? "PUBLICADO"
                              : "OCULTO"}
                          </span>
                        </div>

                        {proyecto.categoria && (
                          <p className="mt-2 font-mono text-[8px] uppercase tracking-[0.12em] text-white/20">
                            {
                              proyecto.categoria
                            }
                          </p>
                        )}

                        <p className="mt-3 max-w-[650px] text-xs leading-6 text-white/35">
                          {proyecto.resumen}
                        </p>

                        {proyecto
                          .tecnologias
                          .length > 0 && (
                          <div className="mt-4 flex flex-wrap gap-2">
                            {proyecto.tecnologias.map(
                              (
                                tecnologia
                              ) => (
                                <span
                                  key={
                                    tecnologia
                                  }
                                  className="rounded-full bg-white/[0.03] px-2.5 py-1 font-mono text-[7px] text-white/25"
                                >
                                  {
                                    tecnologia
                                  }
                                </span>
                              )
                            )}
                          </div>
                        )}

                        <div className="mt-4 flex flex-wrap gap-4 font-mono text-[8px] text-white/15">
                          {proyecto.anio && (
                            <span>
                              AÑO:{" "}
                              {
                                proyecto.anio
                              }
                            </span>
                          )}

                          <span>
                            ORDEN:{" "}
                            {
                              proyecto.orden
                            }
                          </span>
                        </div>
                      </div>

                      {/* ACCIONES */}

                      <div className="flex flex-wrap items-center gap-2 xl:justify-end">
                        {/* DEMO */}

                        {proyecto.url_demo && (
                          <a
                            href={
                              proyecto.url_demo
                            }
                            target="_blank"
                            rel="noreferrer"
                            title="Abrir demo"
                            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/30 transition hover:border-[#f35dce]/30 hover:text-[#f35dce]"
                          >
                            <ExternalLink
                              size={14}
                            />
                          </a>
                        )}

                        {/* GITHUB */}

                        {proyecto.url_repositorio && (
                          <a
                            href={
                              proyecto.url_repositorio
                            }
                            target="_blank"
                            rel="noreferrer"
                            className="flex h-10 items-center justify-center rounded-full border border-white/10 px-4 font-mono text-[8px] text-white/30 transition hover:border-[#f35dce]/30 hover:text-[#f35dce]"
                          >
                            GITHUB
                          </a>
                        )}

                        {/* EDITAR */}

                        <button
                          type="button"
                          title="Editar"
                          disabled={
                            procesando
                          }
                          onClick={() =>
                            editarProyecto(
                              proyecto
                            )
                          }
                          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/30 transition hover:border-[#f35dce]/30 hover:text-[#f35dce] disabled:opacity-30"
                        >
                          <Pencil
                            size={14}
                          />
                        </button>

                        {/* DESTACAR */}

                        <button
                          type="button"
                          title={
                            proyecto.destacado
                              ? "Quitar destacado"
                              : "Destacar"
                          }
                          disabled={
                            procesando
                          }
                          onClick={() =>
                            cambiarDestacado(
                              proyecto
                            )
                          }
                          className={`flex h-10 w-10 items-center justify-center rounded-full border transition disabled:opacity-30 ${
                            proyecto.destacado
                              ? "border-[#f35dce]/30 bg-[#f35dce]/5 text-[#f35dce]"
                              : "border-white/10 text-white/30 hover:border-[#f35dce]/30 hover:text-[#f35dce]"
                          }`}
                        >
                          {proyecto.destacado ? (
                            <Star
                              size={14}
                            />
                          ) : (
                            <StarOff
                              size={14}
                            />
                          )}
                        </button>

                        {/* PUBLICAR */}

                        <button
                          type="button"
                          title={
                            proyecto.publicado
                              ? "Ocultar"
                              : "Publicar"
                          }
                          disabled={
                            procesando
                          }
                          onClick={() =>
                            cambiarPublicacion(
                              proyecto
                            )
                          }
                          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/30 transition hover:border-[#f35dce]/30 hover:text-[#f35dce] disabled:opacity-30"
                        >
                          {proyecto.publicado ? (
                            <Eye
                              size={14}
                            />
                          ) : (
                            <EyeOff
                              size={14}
                            />
                          )}
                        </button>

                        {/* ELIMINAR */}

                        <button
                          type="button"
                          title="Eliminar"
                          disabled={
                            procesando
                          }
                          onClick={() =>
                            eliminarProyecto(
                              proyecto
                            )
                          }
                          className="flex h-10 w-10 items-center justify-center rounded-full border border-red-400/10 text-red-400/40 transition hover:border-red-400/30 hover:bg-red-400/5 hover:text-red-400 disabled:opacity-30"
                        >
                          {procesando ? (
                            <RefreshCw
                              size={14}
                              className="animate-spin"
                            />
                          ) : (
                            <Trash2
                              size={14}
                            />
                          )}
                        </button>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          )}
        </div>
      </div>

      {/* FORMULARIO */}

      {mostrarFormulario && (
        <ProjectForm
          proyecto={proyectoEditar}
          onClose={() => {
            setMostrarFormulario(false);
            setProyectoEditar(null);
          }}
          onSaved={cargarProyectos}
        />
      )}
    </main>
  );
}

/* =========================================
   STAT
========================================= */

function Stat({
  title,
  value,
  active = false,
}: {
  title: string;
  value: number;
  active?: boolean;
}) {
  return (
    <div
      className={`rounded-[22px] border bg-[#0b0e12] p-6 ${
        active
          ? "border-[#f35dce]/15"
          : "border-white/[0.07]"
      }`}
    >
      <p
        className={`text-[34px] font-semibold tracking-[-0.05em] ${
          active
            ? "text-[#f35dce]"
            : "text-white"
        }`}
      >
        {value}
      </p>

      <p className="mt-2 font-mono text-[8px] tracking-[0.15em] text-white/25">
        {title}
      </p>
    </div>
  );
}