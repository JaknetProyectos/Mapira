// Hero.tsx
"use client";

import { T } from "@/components/T";
import { MapPin, MoveDown } from "lucide-react";
import { useLocale } from "next-intl";

export function Hero() {
  const locale = useLocale();

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#14263d]">
      {/* Fondo fotográfico */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/3889843/pexels-photo-3889843.jpeg"
          alt="Costa natural rodeada de montañas"
          className="h-full w-full object-cover"
          style={{
            animation: "mapiraPan 28s infinite alternate ease-in-out",
          }}
        />

        {/* Tratamiento cromático */}
        <div className="absolute inset-0 bg-[#14263d]/35" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#14263d]/95 via-[#14263d]/55 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#14263d] via-transparent to-[#14263d]/40" />
      </div>

      {/* Retícula inspirada en mapas */}
      <div className="pointer-events-none absolute inset-0 z-[1] opacity-[0.12]">
        <div className="absolute left-[12%] top-0 h-full w-px bg-white" />
        <div className="absolute left-[38%] top-0 h-full w-px bg-white" />
        <div className="absolute left-[64%] top-0 h-full w-px bg-white" />
        <div className="absolute left-[88%] top-0 h-full w-px bg-white" />

        <div className="absolute left-0 top-[18%] h-px w-full bg-white" />
        <div className="absolute left-0 top-[47%] h-px w-full bg-white" />
        <div className="absolute left-0 top-[76%] h-px w-full bg-white" />
      </div>

      {/* Indicadores decorativos */}
      <div className="pointer-events-none absolute right-[-9rem] top-[15%] z-[2] hidden h-[30rem] w-[30rem] rounded-full border border-white/15 lg:block">
        <div className="absolute inset-[4rem] rounded-full border border-white/10" />
        <div className="absolute inset-[9rem] rounded-full border border-[#ff7058]/30" />

        <span className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ff5f49] shadow-[0_0_0_12px_rgba(255,95,73,0.12)]" />
      </div>

      <style jsx>{`
        @keyframes mapiraPan {
          0% {
            transform: scale(1.04) translate3d(0, 0, 0);
          }

          100% {
            transform: scale(1.11) translate3d(-1.5%, 1%, 0);
          }
        }
      `}</style>

      {/* Contenido */}
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-screen-2xl flex-col justify-end px-6 pb-10 pt-32 md:px-10 md:pb-14 lg:px-14 lg:pb-16">
        {/* Línea superior editorial */}
        <div className="mb-10 flex items-center justify-between border-b border-white/20 pb-4">
          <div className="flex items-center gap-4">
            <span className="h-2 w-2 bg-[#ff5f49]" />

            <span className="text-[9px] font-bold uppercase tracking-[0.34em] text-white/75 md:text-[10px]">
              <T>Retiros Exclusivos</T>
            </span>
          </div>

          <span className="hidden font-mono text-[9px] uppercase tracking-[0.2em] text-white/45 sm:block">
            Mapira / {locale.toUpperCase()} / Atlas 01
          </span>
        </div>

        <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-16">
          {/* Narrativa principal */}
          <div>
            <div className="mb-5 flex items-center gap-3 text-[#ff8a76]">
              <MapPin className="h-4 w-4" strokeWidth={1.6} />

              <span className="font-mono text-[9px] font-bold uppercase tracking-[0.26em]">
                19.4326° N · 99.1332° W
              </span>
            </div>

            <h1 className="max-w-5xl text-[4.5rem] font-black uppercase leading-[0.76] tracking-[-0.075em] text-white sm:text-[6.5rem] md:text-[8.5rem] lg:text-[10rem] xl:text-[12rem]">
              Mapira
             
            </h1>

            <div className="mt-8 grid max-w-3xl gap-5 border-l-2 border-[#ff5f49] pl-5 sm:grid-cols-[1fr_auto] sm:items-end md:pl-7">
              <p className="max-w-xl text-sm font-medium leading-relaxed text-white/75 sm:text-base md:text-lg">
                <T>
                  Una nueva forma de explorar lejos del turismo convencional.
                  Paisajes intactos, costas remotas y experiencias creadas para
                  volver a conectar.
                </T>
              </p>

              <span className="hidden font-mono text-[9px] uppercase leading-relaxed tracking-[0.2em] text-white/35 sm:block">
                Selected
                <br />
                routes
                <br />
                2026
              </span>
            </div>
          </div>

          {/* Ficha editorial lateral */}
          <div className="flex flex-col gap-6 lg:pb-3">
            <div className="border border-white/25 bg-[#14263d]/55 p-5 backdrop-blur-md md:p-6">
              <div className="mb-8 flex items-start justify-between">
                <div>
                  <p className="mb-2 text-[8px] font-bold uppercase tracking-[0.3em] text-[#ff8a76]">
                    Ruta destacada
                  </p>

                  <p className="text-lg font-black uppercase tracking-[0.05em] text-white">
                    Costa Pacífico
                  </p>
                </div>

                <span className="font-mono text-[10px] text-white/35">01</span>
              </div>

              <div className="grid grid-cols-2 gap-px bg-white/15">
                <div className="bg-[#14263d]/80 p-3">
                  <p className="mb-1 text-[7px] font-bold uppercase tracking-[0.2em] text-white/35">
                    Latitud
                  </p>

                  <p className="font-mono text-[10px] text-white/80">
                    16.8531° N
                  </p>
                </div>

                <div className="bg-[#14263d]/80 p-3">
                  <p className="mb-1 text-[7px] font-bold uppercase tracking-[0.2em] text-white/35">
                    Longitud
                  </p>

                  <p className="font-mono text-[10px] text-white/80">
                    99.8237° W
                  </p>
                </div>
              </div>
            </div>

            {/* Indicador de desplazamiento */}
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/55">
                <T>Descubre</T>
              </span>

              <div className="flex h-12 w-12 animate-bounce items-center justify-center border border-white/30 text-white transition-colors hover:border-[#ff7058] hover:text-[#ff7058]">
                <MoveDown className="h-4 w-4" strokeWidth={1.5} />
              </div>
            </div>
          </div>
        </div>

        {/* Pie del Hero */}
        <div className="mt-10 flex items-center justify-between border-t border-white/20 pt-4">
          <span className="font-mono text-[8px] uppercase tracking-[0.22em] text-white/35">
            Diseñado para explorar
          </span>

          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-white/30" />
            <span className="font-mono text-[8px] text-white/35">
              MAPIRA.MX
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}