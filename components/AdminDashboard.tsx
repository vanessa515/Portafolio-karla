"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import { useRouter } from "next/navigation";
import { motion } from "motion/react";

import {
  LogOut,
  Mail,
  MailOpen,
  RefreshCw,
  ExternalLink,
  Inbox,
} from "lucide-react";

import { supabase } from "@/lib/supabase";

/* =========================================
   TIPOS
========================================= */

type Mensaje = {
  pk_mensaje_contacto: string;
  nombre: string;
  correo: string;
  mensaje: string;
  leido: boolean;
  fecha_creacion: string;
};

/* =========================================
   COMPONENTE PRINCIPAL
========================================= */

export default function AdminDashboard() {
  const router = useRouter();

  const [mensajes, setMensajes] =
    useState<Mensaje[]>([]);

  const [cargando, setCargando] =
    useState(true);

  const [
    mensajeSeleccionado,
    setMensajeSeleccionado,
  ] = useState<Mensaje | null>(null);

  /* =========================================
     CARGAR MENSAJES
  ========================================= */

  const cargarMensajes =
    useCallback(async () => {
      try {
        setCargando(true);

        const { data, error } =
          await supabase
            .from("mensajes_contacto")
            .select("*")
            .order("fecha_creacion", {
              ascending: false,
            });

        if (error) {
          console.error(
            "Error cargando mensajes:",
            error
          );

          return;
        }

        setMensajes(data ?? []);
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
     COMPROBAR SESIÓN
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

      await cargarMensajes();
    };

    inicializar();
  }, [router, cargarMensajes]);

  /* =========================================
     ABRIR MENSAJE
  ========================================= */

  const abrirMensaje = async (
    mensaje: Mensaje
  ) => {
    setMensajeSeleccionado(mensaje);

    /*
      Si ya está leído no necesitamos
      actualizar nuevamente Supabase.
    */

    if (mensaje.leido) {
      return;
    }

    const { error } = await supabase
      .from("mensajes_contacto")
      .update({
        leido: true,
      })
      .eq(
        "pk_mensaje_contacto",
        mensaje.pk_mensaje_contacto
      );

    if (error) {
      console.error(
        "Error marcando mensaje como leído:",
        error
      );

      return;
    }

    /*
      Actualizamos la interfaz sin tener
      que consultar nuevamente la BD.
    */

    setMensajes((actuales) =>
      actuales.map((item) =>
        item.pk_mensaje_contacto ===
        mensaje.pk_mensaje_contacto
          ? {
              ...item,
              leido: true,
            }
          : item
      )
    );

    setMensajeSeleccionado({
      ...mensaje,
      leido: true,
    });
  };

  /* =========================================
     CERRAR SESIÓN
  ========================================= */

  const cerrarSesion = async () => {
    const { error } =
      await supabase.auth.signOut();

    if (error) {
      console.error(
        "Error cerrando sesión:",
        error
      );

      return;
    }

    router.replace("/admin");
    router.refresh();
  };

  /* =========================================
     ESTADÍSTICAS
  ========================================= */

  const mensajesNuevos =
    mensajes.filter(
      (mensaje) => !mensaje.leido
    ).length;

  /* =========================================
     RENDER
  ========================================= */

  return (
    <main className="min-h-screen bg-[#07080a] text-white">
      {/* =====================================
          NAV
      ===================================== */}

      <header className="sticky top-0 z-50 border-b border-white/[0.07] bg-[#07080a]/85 backdrop-blur-xl">
        <div className="container flex h-[72px] items-center justify-between">
          <div>
            <p className="font-mono text-[10px] tracking-[0.18em] text-[#f35dce]">
              KVR / ADMIN
            </p>

            <p className="mt-1 text-xs text-white/25">
              Portfolio Dashboard
            </p>
          </div>

          <button
            type="button"
            onClick={cerrarSesion}
            className="flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 font-mono text-[9px] tracking-[0.12em] text-white/40 transition hover:border-[#f35dce]/30 hover:text-[#f35dce]"
          >
            <LogOut size={14} />

            CERRAR SESIÓN
          </button>
        </div>
      </header>

      {/* =====================================
          CONTENIDO
      ===================================== */}

      <div className="container py-14">
        {/* HEADER */}

        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-[10px] tracking-[0.18em] text-[#f35dce]">
              DASHBOARD / MESSAGES
            </p>

            <h1 className="mt-4 text-[48px] font-semibold tracking-[-0.055em]">
              Mensajes
              <span className="text-white/25">
                .
              </span>
            </h1>

            <p className="mt-3 max-w-[500px] text-sm leading-6 text-white/30">
              Mensajes recibidos desde el
              formulario de contacto de tu
              portafolio.
            </p>
          </div>

          {/* ACTUALIZAR */}

          <button
            type="button"
            onClick={cargarMensajes}
            disabled={cargando}
            className="flex items-center gap-2 self-start rounded-full border border-white/10 px-5 py-2.5 font-mono text-[9px] text-white/40 transition hover:border-[#f35dce]/30 hover:text-[#f35dce] disabled:cursor-not-allowed disabled:opacity-40 md:self-auto"
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
        </div>

        {/* =====================================
            ESTADÍSTICAS
        ===================================== */}

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          <Stat
            label="TOTAL MENSAJES"
            value={mensajes.length}
            icon={<Inbox size={18} />}
          />

          <Stat
            label="SIN LEER"
            value={mensajesNuevos}
            icon={<Mail size={18} />}
            active
          />
        </div>

        {/* =====================================
            MENSAJES
        ===================================== */}

        <div className="mt-8 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          {/* ================================
              LISTA
          ================================= */}

          <div className="overflow-hidden rounded-[24px] border border-white/[0.07] bg-[#0b0e12]">
            {/* HEADER LISTA */}

            <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-4">
              <p className="font-mono text-[9px] tracking-[0.15em] text-white/25">
                INBOX
              </p>

              {mensajesNuevos > 0 && (
                <span className="rounded-full bg-[#f35dce]/10 px-2.5 py-1 font-mono text-[8px] text-[#f35dce]">
                  {mensajesNuevos} NEW
                </span>
              )}
            </div>

            {/* CARGANDO */}

            {cargando ? (
              <div className="flex min-h-[350px] items-center justify-center p-10">
                <div className="text-center">
                  <RefreshCw
                    size={20}
                    className="mx-auto animate-spin text-[#f35dce]"
                  />

                  <p className="mt-4 font-mono text-[9px] tracking-[0.12em] text-white/25">
                    LOADING_MESSAGES...
                  </p>
                </div>
              </div>
            ) : mensajes.length === 0 ? (
              /* SIN MENSAJES */

              <div className="flex min-h-[350px] items-center justify-center p-10">
                <div className="text-center">
                  <Inbox
                    size={28}
                    className="mx-auto text-white/10"
                  />

                  <p className="mt-5 font-mono text-[9px] tracking-[0.12em] text-white/20">
                    NO_MESSAGES_FOUND
                  </p>

                  <p className="mt-3 text-xs text-white/20">
                    Todavía no tienes mensajes.
                  </p>
                </div>
              </div>
            ) : (
              /* LISTA */

              <div>
                {mensajes.map((mensaje) => {
                  const seleccionado =
                    mensajeSeleccionado
                      ?.pk_mensaje_contacto ===
                    mensaje.pk_mensaje_contacto;

                  return (
                    <button
                      type="button"
                      key={
                        mensaje.pk_mensaje_contacto
                      }
                      onClick={() =>
                        abrirMensaje(
                          mensaje
                        )
                      }
                      className={`group flex w-full gap-4 border-b border-white/[0.05] p-5 text-left transition last:border-0 ${
                        seleccionado
                          ? "bg-[#f35dce]/[0.04]"
                          : "hover:bg-white/[0.025]"
                      }`}
                    >
                      {/* ICONO */}

                      <div className="pt-1">
                        {mensaje.leido ? (
                          <MailOpen
                            size={17}
                            className="text-white/20"
                          />
                        ) : (
                          <Mail
                            size={17}
                            className="text-[#f35dce]"
                          />
                        )}
                      </div>

                      {/* INFORMACIÓN */}

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-4">
                          <p
                            className={`truncate text-sm ${
                              mensaje.leido
                                ? "text-white/45"
                                : "font-semibold text-white"
                            }`}
                          >
                            {mensaje.nombre}
                          </p>

                          {!mensaje.leido && (
                            <span className="h-2 w-2 shrink-0 rounded-full bg-[#f35dce] shadow-[0_0_10px_#f35dce]" />
                          )}
                        </div>

                        <p className="mt-1 truncate font-mono text-[9px] text-white/25">
                          {mensaje.correo}
                        </p>

                        <p className="mt-3 line-clamp-2 text-xs leading-5 text-white/30">
                          {mensaje.mensaje}
                        </p>

                        <p className="mt-3 font-mono text-[8px] text-white/15">
                          {new Date(
                            mensaje.fecha_creacion
                          ).toLocaleString(
                            "es-MX",
                            {
                              dateStyle:
                                "medium",
                              timeStyle:
                                "short",
                            }
                          )}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* ================================
              DETALLE DEL MENSAJE
          ================================= */}

          <div className="min-h-[500px] overflow-hidden rounded-[24px] border border-white/[0.07] bg-[#0b0e12]">
            {/* HEADER */}

            <div className="border-b border-white/[0.07] px-6 py-4">
              <p className="font-mono text-[9px] tracking-[0.15em] text-white/25">
                MESSAGE_VIEWER
              </p>
            </div>

            {/* SIN SELECCIONAR */}

            {!mensajeSeleccionado ? (
              <div className="flex min-h-[440px] items-center justify-center p-10">
                <div className="text-center">
                  <Mail
                    size={28}
                    className="mx-auto text-white/10"
                  />

                  <p className="mt-5 font-mono text-[10px] text-white/20">
                    SELECT_A_MESSAGE
                  </p>

                  <p className="mt-3 text-xs text-white/20">
                    Selecciona un mensaje para
                    visualizarlo.
                  </p>
                </div>
              </div>
            ) : (
              /* MENSAJE */

              <motion.div
                key={
                  mensajeSeleccionado.pk_mensaje_contacto
                }
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.25,
                }}
                className="p-7 md:p-9"
              >
                {/* REMITENTE */}

                <div className="flex flex-col gap-5 border-b border-white/[0.07] pb-7 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="font-mono text-[9px] tracking-[0.15em] text-[#f35dce]">
                      FROM
                    </p>

                    <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em]">
                      {
                        mensajeSeleccionado.nombre
                      }
                    </h2>

                    <p className="mt-2 text-sm text-white/35">
                      {
                        mensajeSeleccionado.correo
                      }
                    </p>
                  </div>

                  {/* RESPONDER */}

                  <a
                    href={`mailto:${mensajeSeleccionado.correo}`}
                    className="inline-flex items-center justify-center gap-2 self-start rounded-full bg-[#f35dce] px-5 py-2.5 text-xs font-semibold text-[#07080a] transition hover:opacity-90"
                  >
                    RESPONDER

                    <ExternalLink
                      size={14}
                    />
                  </a>
                </div>

                {/* CONTENIDO */}

                <div className="py-8">
                  <p className="font-mono text-[9px] tracking-[0.15em] text-white/20">
                    MESSAGE
                  </p>

                  <p className="mt-5 whitespace-pre-wrap break-words text-sm leading-8 text-white/55">
                    {
                      mensajeSeleccionado.mensaje
                    }
                  </p>
                </div>

                {/* FECHA */}

                <div className="border-t border-white/[0.07] pt-5">
                  <p className="font-mono text-[8px] tracking-[0.1em] text-white/20">
                    RECEIVED{" "}
                    {new Date(
                      mensajeSeleccionado.fecha_creacion
                    ).toLocaleString(
                      "es-MX",
                      {
                        dateStyle: "long",
                        timeStyle: "short",
                      }
                    )}
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

/* =========================================
   COMPONENTE DE ESTADÍSTICA
========================================= */

function Stat({
  label,
  value,
  icon,
  active = false,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
  active?: boolean;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className={`rounded-[22px] border bg-[#0b0e12] p-6 ${
        active
          ? "border-[#f35dce]/15"
          : "border-white/[0.07]"
      }`}
    >
      <div
        className={
          active
            ? "text-[#f35dce]"
            : "text-white/25"
        }
      >
        {icon}
      </div>

      <p className="mt-5 text-[36px] font-semibold tracking-[-0.05em]">
        {value}
      </p>

      <p className="mt-1 font-mono text-[8px] tracking-[0.15em] text-white/25">
        {label}
      </p>
    </motion.div>
  );
}