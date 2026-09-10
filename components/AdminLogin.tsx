"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { LockKeyhole, Mail, ArrowRight } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function AdminLogin() {
  const router = useRouter();

  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");

  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  /*
    Si el administrador ya inició sesión,
    lo mandamos directamente al dashboard.
  */
  useEffect(() => {
    const comprobarSesion = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        router.replace("/admin/dashboard");
      }
    };

    comprobarSesion();
  }, [router]);

  const iniciarSesion = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!correo.trim() || !contrasena) {
      setError("Ingresa correo y contraseña.");
      return;
    }

    try {
      setCargando(true);
      setError("");

      const { error } =
        await supabase.auth.signInWithPassword({
          email: correo.trim(),
          password: contrasena,
        });

      if (error) {
        console.error(error);

        setError(
          "Correo o contraseña incorrectos."
        );

        return;
      }

      router.replace("/admin/dashboard");
      router.refresh();
    } catch (error) {
      console.error(error);

      setError(
        "No fue posible iniciar sesión."
      );
    } finally {
      setCargando(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#07080a] px-5">

      {/* GRID */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-50
          [background-image:linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)]
          [background-size:42px_42px]
        "
      />

      {/* GLOW */}
      <div className="pointer-events-none absolute h-[500px] w-[500px] rounded-full bg-[#f35dce]/10 blur-[170px]" />

      <motion.div
        initial={{
          opacity: 0,
          y: 30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.65,
        }}
        className="relative z-10 w-full max-w-[440px]"
      >
        {/* Encabezado */}

        <div className="mb-8 text-center">
          <p className="font-mono text-[10px] tracking-[0.24em] text-[#f35dce]">
            KVR / ADMIN
          </p>

          <h1 className="mt-4 text-[42px] font-semibold tracking-[-0.055em]">
            Admin Access
          </h1>

          <p className="mt-3 text-sm text-white/35">
            Panel privado del portafolio.
          </p>
        </div>

        {/* CARD */}

        <div className="overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#0b0e12] shadow-[0_30px_100px_rgba(0,0,0,0.5)]">

          {/* Ventana */}

          <div className="flex h-12 items-center justify-between border-b border-white/[0.07] px-5">
            <div className="flex gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#f35dce]/60" />
            </div>

            <p className="font-mono text-[9px] text-white/20">
              secure-login.tsx
            </p>
          </div>

          <form
            onSubmit={iniciarSesion}
            className="space-y-6 p-7 md:p-9"
          >
            {/* CORREO */}

            <div>
              <label
                htmlFor="admin-email"
                className="font-mono text-[9px] tracking-[0.15em] text-white/30"
              >
                EMAIL
              </label>

              <div className="relative mt-2">
                <Mail
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20"
                />

                <input
                  id="admin-email"
                  type="email"
                  value={correo}
                  onChange={(event) =>
                    setCorreo(event.target.value)
                  }
                  placeholder="admin@email.com"
                  autoComplete="email"
                  disabled={cargando}
                  className="w-full rounded-xl border border-white/[0.08] bg-white/[0.02] py-3.5 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-white/15 focus:border-[#f35dce]/50"
                />
              </div>
            </div>

            {/* PASSWORD */}

            <div>
              <label
                htmlFor="admin-password"
                className="font-mono text-[9px] tracking-[0.15em] text-white/30"
              >
                PASSWORD
              </label>

              <div className="relative mt-2">
                <LockKeyhole
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20"
                />

                <input
                  id="admin-password"
                  type="password"
                  value={contrasena}
                  onChange={(event) =>
                    setContrasena(event.target.value)
                  }
                  placeholder="••••••••••"
                  autoComplete="current-password"
                  disabled={cargando}
                  className="w-full rounded-xl border border-white/[0.08] bg-white/[0.02] py-3.5 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-white/15 focus:border-[#f35dce]/50"
                />
              </div>
            </div>

            {/* ERROR */}

            {error && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 5,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className="rounded-xl border border-red-400/20 bg-red-400/5 px-4 py-3 text-center font-mono text-[9px] text-red-400"
              >
                {error}
              </motion.div>
            )}

            {/* BUTTON */}

            <motion.button
              whileHover={
                cargando
                  ? undefined
                  : { scale: 1.015 }
              }
              whileTap={
                cargando
                  ? undefined
                  : { scale: 0.985 }
              }
              disabled={cargando}
              type="submit"
              className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#f35dce] px-5 py-4 text-sm font-semibold text-[#07080a] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {cargando
                ? "AUTHENTICATING..."
                : "INICIAR SESIÓN"}

              {!cargando && (
                <ArrowRight size={16} />
              )}
            </motion.button>
          </form>
        </div>

        <p className="mt-6 text-center font-mono text-[8px] tracking-[0.16em] text-white/15">
          AUTHORIZED ACCESS ONLY
        </p>

      </motion.div>
    </main>
  );
}