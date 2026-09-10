"use client";

import Image from "next/image";
import { motion } from "motion/react";

export default function Badge() {
  return (
    <div
      className="
        relative
        flex

        min-h-[450px]
        items-start
        justify-end

        sm:min-h-[520px]
        lg:min-h-[620px]
      "
    >
      {/* =========================================
          SISTEMA COMPLETO
          Se conserva en tamaño original
          y se escala completo en móvil/tablet
      ========================================= */}

      <motion.div
        initial={{
          opacity: 0,
          rotate: 9,
          x: 10,
        }}
        animate={{
          opacity: 1,

          rotate: [
            -7,
            6,
            -5,
            4,
            -3,
            2,
            -7,
          ],

          x: [
            -10,
            14,
            -9,
            11,
            -6,
            5,
            -10,
          ],
        }}
        transition={{
          opacity: {
            duration: 0.6,
          },

          rotate: {
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          },

          x: {
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
        className="
          absolute

          top-[5px]
          right-[-105px]

          w-[350px]

          origin-top-right

          scale-[0.68]

          sm:top-[0px]
          sm:right-[-60px]
          sm:scale-[0.80]

          md:right-[-25px]
          md:scale-[0.86]

          lg:-top-[215px]
          lg:right-0
          lg:scale-100
          lg:origin-top
        "
      >
        {/* =========================================
            LISTÓN
        ========================================= */}

        <motion.div
          initial={{
            height: 0,
          }}
          animate={{
            height: 230,
          }}
          transition={{
            duration: 1,
            ease: "easeOut",
          }}
          className="relative mx-auto w-[32px]"
        >
          {/* CUERPO LISTÓN */}

          <div
            className="
              absolute
              inset-0

              rounded-b-md

              border-x
              border-white/5

              bg-gradient-to-r
              from-[#101216]
              via-[#292d34]
              to-[#0d0f13]

              shadow-[0_15px_35px_rgba(0,0,0,0.5)]
            "
          />

          {/* LÍNEA CENTRAL */}

          <div
            className="
              absolute
              left-1/2
              top-0

              h-full
              w-[1px]

              -translate-x-1/2

              bg-white/5
            "
          />

          {/* REFLEJO */}

          <div
            className="
              absolute
              left-[7px]
              top-0

              h-full
              w-[2px]

              bg-gradient-to-b
              from-white/20
              via-white/5
              to-transparent
            "
          />
        </motion.div>

        {/* =========================================
            ARO
        ========================================= */}

        <div
          className="
            absolute
            left-1/2
            top-[214px]

            z-30

            h-[34px]
            w-[34px]

            -translate-x-1/2

            rounded-full

            border-[4px]
            border-[#747981]

            bg-[#080a0d]

            shadow-[0_5px_15px_rgba(0,0,0,0.7)]
          "
        />

        {/* =========================================
            BROCHE
        ========================================= */}

        <div
          className="
            absolute
            left-1/2
            top-[238px]

            z-30

            h-[46px]
            w-[70px]

            -translate-x-1/2

            rounded-xl

            border
            border-white/10

            bg-gradient-to-b
            from-[#252a31]
            to-[#101318]

            shadow-[0_10px_30px_rgba(0,0,0,0.7)]
          "
        >
          <div
            className="
              absolute
              left-1/2
              top-[11px]

              h-[12px]
              w-[28px]

              -translate-x-1/2

              rounded-full

              border
              border-white/10

              bg-[#080a0d]
            "
          />
        </div>

        {/* =========================================
            GAFETE
        ========================================= */}

        <motion.div
          animate={{
            y: [0, 3, 0, -2, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          whileHover={{
            scale: 1.04,
          }}
          className="
            relative
            z-20

            mx-auto
            mt-[42px]

            w-[330px]

            cursor-pointer
          "
        >
          <div
            className="
              overflow-hidden

              rounded-[30px]

              border
              border-white/10

              bg-[#0d1014]/95

              p-4

              shadow-[0_40px_120px_rgba(0,0,0,0.7)]

              backdrop-blur-xl
            "
          >
            {/* HEADER */}

            <div className="mb-4 flex items-center justify-between">
              <span className="font-mono text-[9px] tracking-[0.24em] text-white/40">
                DEVELOPER ACCESS
              </span>

              <span className="flex items-center gap-2 font-mono text-[9px] text-[#f35dce]">
                <span
                  className="
                    h-1.5
                    w-1.5
                    rounded-full
                    bg-[#f35dce]
                    shadow-[0_0_12px_#f35dce]
                  "
                />

                ACTIVE
              </span>
            </div>

            {/* FOTO */}

            <div
              className="
                relative

                aspect-[4/4.8]

                overflow-hidden

                rounded-[20px]

                bg-[#11151a]
              "
            >
              <Image
                src="/karla-profile.jpeg"
                alt="Karla Vanessa Rubio Segura"
                fill
                priority
                sizes="330px"
                className="object-cover object-[50%_25%]"
              />

              <div
                className="
                  absolute
                  inset-x-0
                  bottom-0

                  h-28

                  bg-gradient-to-t
                  from-black/80
                  via-black/30
                  to-transparent
                "
              />
            </div>

            {/* INFORMACIÓN */}

            <div className="pt-5">
              <p className="font-mono text-[10px] tracking-[0.2em] text-[#f35dce]">
                FULL STACK DEVELOPER
              </p>

              <h2
                className="
                  mt-2

                  text-[28px]
                  font-semibold

                  leading-[0.95]

                  tracking-[-0.04em]
                "
              >
                Karla Vanessa
                <br />
                Rubio Segura
              </h2>

              {/* AREA / STATUS */}

              <div
                className="
                  mt-6

                  grid
                  grid-cols-2

                  gap-4

                  border-t
                  border-white/10

                  pt-4
                "
              >
                <div>
                  <p className="font-mono text-[9px] tracking-[0.14em] text-white/35">
                    AREA
                  </p>

                  <p className="mt-1 text-xs leading-5 text-white/80">
                    Software
                    <br />
                    Development
                  </p>
                </div>

                <div>
                  <p className="font-mono text-[9px] tracking-[0.14em] text-white/35">
                    STATUS
                  </p>

                  <p className="mt-1 flex items-center gap-2 text-xs text-white/80">
                    <span
                      className="
                        h-2
                        w-2

                        rounded-full

                        bg-[#f35dce]

                        shadow-[0_0_12px_#f35dce]
                      "
                    />

                    Building
                  </p>
                </div>
              </div>

              {/* LANGUAGE / ID */}

              <div
                className="
                  mt-5

                  grid
                  grid-cols-2

                  gap-4

                  border-t
                  border-white/10

                  pt-4
                "
              >
                <div>
                  <p className="font-mono text-[9px] tracking-[0.14em] text-white/35">
                    LANGUAGE
                  </p>

                  <p className="mt-1 font-mono text-xs text-white/70">
                    ES / EN B2
                  </p>
                </div>

                <div>
                  <p className="font-mono text-[9px] tracking-[0.14em] text-white/35">
                    ID
                  </p>

                  <p className="mt-1 font-mono text-xs text-white/70">
                    KVR-DEV
                  </p>
                </div>
              </div>

              {/* ACCESS */}

              <div
                className="
                  mt-5

                  flex
                  items-end
                  justify-between

                  border-t
                  border-white/10

                  pt-4
                "
              >
                <div>
                  <p className="font-mono text-[9px] tracking-[0.14em] text-white/35">
                    ACCESS
                  </p>

                  <p className="mt-1 font-mono text-[10px] text-[#f35dce]">
                    VERIFIED ✓
                  </p>
                </div>

                <div className="font-mono text-lg tracking-[0.22em] text-white/20">
                  |||||||
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}