"use client";

import { useEffect, useState } from "react";
import {
  Download,
  Menu,
  X,
} from "lucide-react";

const links = [
  {
    label: "SOBRE MÍ",
    href: "#sobre-mi",
  },
  {
    label: "PROYECTOS",
    href: "#proyectos",
  },
  {
    label: "EXPERIENCIA",
    href: "#experiencia",
  },
  {
    label: "CONTACTO",
    href: "#contacto",
  },
];

export default function Navbar() {
  const [menuAbierto, setMenuAbierto] =
    useState(false);

  const [scrolled, setScrolled] =
    useState(false);

  useEffect(() => {
    const revisarScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    revisarScroll();

    window.addEventListener(
      "scroll",
      revisarScroll
    );

    return () => {
      window.removeEventListener(
        "scroll",
        revisarScroll
      );
    };
  }, []);

  return (
    <>
      <header
        className={`fixed left-0 top-0 z-[80] w-full transition-all duration-300 ${
          scrolled
            ? "border-b border-white/[0.06] bg-[#07080a]/85 backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div className="container flex h-[72px] items-center justify-between">
          {/* LOGO */}

          <a
            href="#inicio"
            className="font-mono text-[10px] font-semibold tracking-[0.18em]"
          >
            <span className="text-white">
              KVR
            </span>

            <span className="text-[#f35dce]">
              /DEV
            </span>
          </a>

          {/* DESKTOP */}

          <nav className="hidden items-center gap-7 lg:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-mono text-[8px] tracking-[0.12em] text-white/35 transition hover:text-[#f35dce]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* DERECHA */}

          <div className="flex items-center gap-3">
            <a
              href="/CV-Karla-Vanessa-Rubio-Segura.pdf"
              download
              className="hidden items-center gap-2 rounded-full border border-white/10 px-4 py-2.5 font-mono text-[8px] tracking-[0.1em] text-white/40 transition hover:border-[#f35dce]/30 hover:text-[#f35dce] sm:flex"
            >
              <Download size={12} />
              CV
            </a>

            <a
              href="https://github.com/vanessa515"
              target="_blank"
              rel="noreferrer"
              className="hidden font-mono text-[8px] tracking-[0.1em] text-white/30 transition hover:text-[#f35dce] md:block"
            >
              GITHUB ↗
            </a>

            {/* MOBILE */}

            <button
              type="button"
              onClick={() =>
                setMenuAbierto(
                  !menuAbierto
                )
              }
              aria-label="Abrir menú"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/50 lg:hidden"
            >
              {menuAbierto ? (
                <X size={16} />
              ) : (
                <Menu size={16} />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* MENÚ MOBILE */}

      {menuAbierto && (
        <div className="fixed inset-0 z-[70] flex bg-[#07080a] px-6 pb-10 pt-[110px] lg:hidden">
          <div className="flex w-full flex-col">
            <p className="font-mono text-[8px] tracking-[0.18em] text-[#f35dce]">
              NAVIGATION
            </p>

            <nav className="mt-10 flex flex-col">
              {links.map(
                (link, index) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() =>
                      setMenuAbierto(
                        false
                      )
                    }
                    className="flex items-center justify-between border-b border-white/[0.07] py-6"
                  >
                    <span className="text-2xl font-semibold text-white">
                      {link.label}
                    </span>

                    <span className="font-mono text-[8px] text-[#f35dce]">
                      0{index + 1}
                    </span>
                  </a>
                )
              )}
            </nav>

            <div className="mt-auto grid gap-3 sm:grid-cols-2">
              <a
                href="/CV-Karla-Vanessa-Rubio-Segura.pdf"
                download
                className="flex items-center justify-center gap-2 rounded-full bg-[#f35dce] px-5 py-4 font-mono text-[9px] font-semibold text-[#07080a]"
              >
                <Download size={13} />
                DESCARGAR CV
              </a>

              <a
                href="https://github.com/vanessa515"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center rounded-full border border-white/10 px-5 py-4 font-mono text-[9px] text-white/40"
              >
                GITHUB ↗
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}