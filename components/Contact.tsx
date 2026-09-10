"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  Mail,
  Phone,
  GitBranch,
  MapPin,
  ArrowUpRight,
  Send,
} from "lucide-react";

import { supabase } from "@/lib/supabase";

export default function Contact() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [mensaje, setMensaje] = useState("");

  const [enviando, setEnviando] = useState(false);
  const [estado, setEstado] = useState("");
  const [tipoEstado, setTipoEstado] = useState<
    "success" | "error" | ""
  >("");

  const validarCorreo = (correo: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
  };

  const enviarMensaje = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const nombreLimpio = nombre.trim();
    const correoLimpio = correo.trim();
    const mensajeLimpio = mensaje.trim();

    if (
      nombreLimpio === "" ||
      correoLimpio === "" ||
      mensajeLimpio === ""
    ) {
      setTipoEstado("error");
      setEstado("Completa todos los campos.");
      return;
    }

    if (!validarCorreo(correoLimpio)) {
      setTipoEstado("error");
      setEstado("Ingresa un correo válido.");
      return;
    }

    try {
      setEnviando(true);
      setEstado("");
      setTipoEstado("");

      const { error } = await supabase
        .from("mensajes_contacto")
        .insert([
          {
            nombre: nombreLimpio,
            correo: correoLimpio,
            mensaje: mensajeLimpio,
          },
        ]);

      if (error) {
        console.error("Error Supabase:", error);

        setTipoEstado("error");
        setEstado(
          "No fue posible enviar el mensaje. Intenta nuevamente."
        );

        return;
      }

      setTipoEstado("success");
      setEstado("Mensaje enviado correctamente.");

      setNombre("");
      setCorreo("");
      setMensaje("");
    } catch (error) {
      console.error("Error:", error);

      setTipoEstado("error");
      setEstado(
        "Ocurrió un error al enviar el mensaje."
      );
    } finally {
      setEnviando(false);
    }
  };

  return (
    <section
      id="contacto"
      className="relative overflow-hidden border-t border-white/5 py-28 md:py-36"
    >
      {/* Glow */}
      <div className="pointer-events-none absolute -right-[220px] top-[15%] h-[520px] w-[520px] rounded-full bg-[#f35dce]/5 blur-[170px]" />

      <div className="container relative z-10">
        {/* ENCABEZADO */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.6,
          }}
          className="flex items-center gap-4"
        >
          <span className="font-mono text-xs text-[#f35dce]">
            05
          </span>

          <span className="h-[1px] w-10 bg-[#f35dce]" />

          <span className="font-mono text-xs tracking-[0.22em] text-white/40">
            CONTACTO
          </span>
        </motion.div>

        {/* TÍTULO */}

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.7,
          }}
          className="mt-12"
        >
          <h2 className="max-w-[900px] text-[48px] font-semibold leading-[0.95] tracking-[-0.055em] sm:text-[60px] lg:text-[76px]">
            Hablemos de tu
            <br />

            <span className="text-[#f35dce]">
              próximo proyecto.
            </span>
          </h2>

          <p className="mt-8 max-w-[620px] text-base leading-8 text-white/40">
            Estoy abierta a nuevas oportunidades, colaboraciones y proyectos
            donde pueda aportar experiencia en desarrollo de software,
            análisis de sistemas y soluciones digitales.
          </p>
        </motion.div>

        {/* CONTENIDO */}

        <div className="mt-20 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          {/* COLUMNA IZQUIERDA */}

          <div className="space-y-4">
            <ContactItem
              icon={<Mail size={20} />}
              title="Correo"
              value="rubiovanessa570@gmail.com"
              href="mailto:rubiovanessa570@gmail.com"
            />

            <ContactItem
              icon={<Phone size={20} />}
              title="Teléfono"
              value="664 568 7160"
              href="tel:+526645687160"
            />

            <ContactItem
              icon={
                <span className="font-mono text-[12px] font-bold">
                  in
                </span>
              }
              title="LinkedIn"
              value="Karla Vanessa Rubio Segura"
              href="https://www.linkedin.com/in/karla-vanessa-rubio-segura-109904272"
            />

            <ContactItem
              icon={<GitBranch size={20} />}
              title="GitHub"
              value="vanessa515"
              href="https://github.com/vanessa515"
            />

            <ContactItem
              icon={<MapPin size={20} />}
              title="Ubicación"
              value="Guadalajara, Jalisco"
            />

            {/* DISPONIBILIDAD */}

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
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
                delay: 0.15,
              }}
              className="mt-8 rounded-[24px] border border-[#f35dce]/15 bg-[#f35dce]/[0.025] p-6"
            >
              <div className="flex items-center gap-3">
                <motion.span
                  animate={{
                    opacity: [1, 0.4, 1],
                    scale: [1, 0.85, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="h-2.5 w-2.5 rounded-full bg-[#f35dce] shadow-[0_0_15px_#f35dce]"
                />

                <p className="font-mono text-[10px] tracking-[0.18em] text-[#f35dce]">
                  AVAILABLE
                </p>
              </div>

              <p className="mt-4 text-sm leading-7 text-white/45">
                Disponible para nuevas oportunidades profesionales,
                colaboraciones y proyectos de desarrollo.
              </p>
            </motion.div>
          </div>

          {/* FORMULARIO */}

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
              duration: 0.7,
            }}
            className="overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#0b0e12]"
          >
            {/* Header */}

            <div className="flex h-14 items-center justify-between border-b border-white/[0.07] px-6">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-white/10" />

                <span className="h-2.5 w-2.5 rounded-full bg-white/10" />

                <span className="h-2.5 w-2.5 rounded-full bg-[#f35dce]/60" />
              </div>

              <p className="font-mono text-[9px] tracking-[0.15em] text-white/25">
                new-message.tsx
              </p>
            </div>

            {/* Form */}

            <form
              className="space-y-6 p-7 md:p-9"
              onSubmit={enviarMensaje}
            >
              {/* NOMBRE */}

              <div>
                <label
                  htmlFor="nombre"
                  className="font-mono text-[9px] tracking-[0.15em] text-white/30"
                >
                  NOMBRE
                </label>

                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  value={nombre}
                  onChange={(event) =>
                    setNombre(event.target.value)
                  }
                  disabled={enviando}
                  placeholder="Tu nombre"
                  autoComplete="name"
                  className="mt-2 w-full rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#f35dce]/50 focus:bg-[#f35dce]/[0.02] disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>

              {/* CORREO */}

              <div>
                <label
                  htmlFor="correo"
                  className="font-mono text-[9px] tracking-[0.15em] text-white/30"
                >
                  CORREO
                </label>

                <input
                  id="correo"
                  name="correo"
                  type="email"
                  value={correo}
                  onChange={(event) =>
                    setCorreo(event.target.value)
                  }
                  disabled={enviando}
                  placeholder="tu@email.com"
                  autoComplete="email"
                  className="mt-2 w-full rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#f35dce]/50 focus:bg-[#f35dce]/[0.02] disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>

              {/* MENSAJE */}

              <div>
                <label
                  htmlFor="mensaje"
                  className="font-mono text-[9px] tracking-[0.15em] text-white/30"
                >
                  MENSAJE
                </label>

                <textarea
                  id="mensaje"
                  name="mensaje"
                  rows={6}
                  value={mensaje}
                  onChange={(event) =>
                    setMensaje(event.target.value)
                  }
                  disabled={enviando}
                  placeholder="Cuéntame sobre tu proyecto..."
                  className="mt-2 w-full resize-none rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#f35dce]/50 focus:bg-[#f35dce]/[0.02] disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>

              {/* BOTÓN */}

              <motion.button
                type="submit"
                disabled={enviando}
                whileHover={
                  enviando
                    ? undefined
                    : {
                        scale: 1.015,
                      }
                }
                whileTap={
                  enviando
                    ? undefined
                    : {
                        scale: 0.985,
                      }
                }
                className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#f35dce] px-5 py-4 text-sm font-semibold text-[#07080a] transition disabled:cursor-not-allowed disabled:opacity-50"
              >
                {enviando
                  ? "ENVIANDO..."
                  : "ENVIAR MENSAJE"}

                <Send size={16} />
              </motion.button>

              {/* ESTADO */}

              {estado && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 5,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  className={`rounded-xl border px-4 py-3 text-center font-mono text-[9px] ${
                    tipoEstado === "success"
                      ? "border-[#f35dce]/20 bg-[#f35dce]/5 text-[#f35dce]"
                      : "border-red-400/20 bg-red-400/5 text-red-400"
                  }`}
                >
                  {estado}
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>

        {/* FOOTER */}

        <motion.footer
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.8,
          }}
          className="mt-28 flex flex-col gap-5 border-t border-white/[0.07] pt-7 font-mono text-[9px] tracking-[0.12em] text-white/20 md:flex-row md:items-center md:justify-between"
        >
          <p>
            KARLA VANESSA RUBIO SEGURA

            <span className="mx-3 text-[#f35dce]">
              {"//"}
            </span>

            FULL STACK DEVELOPER
          </p>

          <div className="flex items-center gap-5">
            <a
              href="mailto:rubiovanessa570@gmail.com"
              className="transition hover:text-[#f35dce]"
            >
              EMAIL
            </a>

            <a
              href="https://github.com/vanessa515"
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-[#f35dce]"
            >
              GITHUB
            </a>

            <a
              href="https://www.linkedin.com/in/karla-vanessa-rubio-segura-109904272"
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-[#f35dce]"
            >
              LINKEDIN
            </a>
          </div>
        </motion.footer>
      </div>
    </section>
  );
}

/* =========================================
   CONTACT ITEM
========================================= */

function ContactItem({
  icon,
  title,
  value,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  href?: string;
}) {
  const content = (
    <>
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#f35dce]/15 bg-[#f35dce]/5 text-[#f35dce]">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="font-mono text-[9px] tracking-[0.15em] text-white/25">
          {title.toUpperCase()}
        </p>

        <p className="mt-1 truncate text-sm text-white/65 transition group-hover:text-white">
          {value}
        </p>
      </div>

      {href && (
        <ArrowUpRight
          size={16}
          className="text-white/20 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#f35dce]"
        />
      )}
    </>
  );

  if (href) {
    return (
      <motion.a
        initial={{
          opacity: 0,
          y: 20,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
        }}
        whileHover={{
          x: 5,
        }}
        href={href}
        target={
          href.startsWith("http")
            ? "_blank"
            : undefined
        }
        rel={
          href.startsWith("http")
            ? "noreferrer"
            : undefined
        }
        className="group flex items-center gap-4 rounded-[20px] border border-white/[0.07] bg-[#0b0e12] p-5 transition hover:border-[#f35dce]/25"
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      className="group flex items-center gap-4 rounded-[20px] border border-white/[0.07] bg-[#0b0e12] p-5"
    >
      {content}
    </motion.div>
  );
}