"use client";

import { useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { T } from "@/components/T";

export function Pricing() {
  const locale = useLocale();

  const benefits = [
    {
      title: "Cero paquetes prefabricados",
      description:
        "Diseño de ruta inteligente que se adapta exactamente al ritmo y los intereses que definas.",
    },
    {
      title: "Arquitectura de presupuesto",
      description:
        "Tú defines el rango. Nosotros maximizamos cada centavo para garantizar el estándar Mapira.",
    },
    {
      title: "Concierge Dedicado 24/7",
      description:
        "Un asesor experto monitoreando tu viaje en tiempo real, desde el despegue hasta el retorno.",
    },
    {
      title: "Transparencia Total",
      description:
        "Sin tarifas ocultas ni sorpresas en el destino. Todo debidamente estructurado desde el día uno.",
    },
  ];

  return (
    <section
      id="precios"
      className="relative overflow-hidden bg-[#eee8dc] py-24 text-[#14263d] lg:py-32"
    >
      {/* Retícula técnica de fondo */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.05]">
        <div className="absolute left-0 top-[25%] h-px w-full bg-[#14263d]" />
        <div className="absolute left-0 top-[50%] h-px w-full bg-[#14263d]" />
        <div className="absolute left-0 top-[75%] h-px w-full bg-[#14263d]" />

        <div className="absolute left-[20%] top-0 h-full w-px bg-[#14263d]" />
        <div className="absolute left-[50%] top-0 h-full w-px bg-[#14263d]" />
        <div className="absolute left-[80%] top-0 h-full w-px bg-[#14263d]" />
      </div>

      <div className="relative z-10 mx-auto max-w-screen-2xl px-6 lg:px-12">
        {/* Cabecera superior */}
        <div className="mb-10 flex items-center justify-between border-b border-[#14263d]/20 pb-5">
          <div className="flex items-center gap-4">
            <span className="h-2 w-2 bg-[#ff5f49]" />

            <span className="text-[9px] font-bold uppercase tracking-[0.34em] text-[#14263d]/50">
              <T>Método</T> <T>Mapira</T>
            </span>
          </div>

          <span className="hidden font-mono text-[9px] uppercase tracking-[0.22em] text-[#14263d]/35 md:block">
            Service Charter / 04
          </span>
        </div>

        <div className="grid border border-[#14263d]/20 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Manifiesto lateral */}
          <div className="relative overflow-hidden bg-[#14263d] px-6 py-10 text-white sm:px-10 sm:py-14 lg:min-h-[760px] lg:px-12 lg:py-16">
            {/* Círculos cartográficos */}
            <div className="pointer-events-none absolute -right-40 -top-28 h-[30rem] w-[30rem] rounded-full border border-white/10">
              <div className="absolute inset-16 rounded-full border border-white/10" />
              <div className="absolute inset-32 rounded-full border border-[#ff7058]/25" />
            </div>

            <div className="pointer-events-none absolute bottom-0 left-0 text-[9rem] font-black uppercase leading-none tracking-[-0.08em] text-white/[0.025] sm:text-[12rem] lg:-left-4 lg:text-[15rem]">
              M
            </div>

            <div className="relative z-10 flex h-full flex-col justify-between">
              <div>
                <div className="mb-10 flex items-center gap-3">
                  <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-[#ff7d6b]">
                    19.4326° N
                  </span>

                  <span className="h-px w-10 bg-white/20" />

                  <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-white/35">
                    99.1332° W
                  </span>
                </div>

                <h2 className="text-5xl font-black uppercase leading-[0.84] tracking-[-0.055em] sm:text-6xl lg:text-7xl xl:text-8xl">
                  <T>La Firma</T>

                  <span className="mt-2 block text-[#ff6550]">
                    <T>Mapira.</T>
                  </span>
                </h2>

                <div className="mt-10 border-l-2 border-[#ff6550] pl-5">
                  <p className="max-w-md text-base font-medium leading-relaxed text-white/68 md:text-lg">
                    <T>
                      Transformamos cada viaje en una ruta diseñada con
                      intención. No agrupamos destinos ni repetimos fórmulas;
                      coordinamos cada detalle para que tú solo tengas que
                      vivirlo.
                    </T>
                  </p>
                </div>
              </div>

              <div className="mt-12">
                <Button
                  asChild
                  className="group h-16 w-full rounded-none border border-[#ff6550] bg-[#ff6550] px-7 text-[9px] font-bold uppercase tracking-[0.24em] text-white shadow-none transition-all duration-300 hover:bg-[#eee8dc] hover:text-[#14263d] sm:w-auto"
                >
                  <Link href={`/${locale}/cotizar`}>
                    <T>Iniciar Diseño de Ruta</T>

                    <ArrowRight className="ml-4 h-4 w-4 transition-transform duration-300 group-hover:translate-x-2" />
                  </Link>
                </Button>

                <div className="mt-8 flex items-center justify-between border-t border-white/15 pt-4">
                  <span className="font-mono text-[8px] uppercase tracking-[0.22em] text-white/30">
                    Bespoke travel design
                  </span>

                  <span className="font-mono text-[8px] uppercase tracking-[0.22em] text-[#ff7d6b]">
                    Mapira.mx
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Ruta de beneficios */}
          <div className="bg-[#f4f0e7]">
            <div className="flex items-center justify-between border-b border-[#14263d]/20 px-6 py-5 sm:px-8">
              <div>
                <p className="mb-1 text-[8px] font-bold uppercase tracking-[0.3em] text-[#ff5f49]">
                  <T>Principios de servicio</T>
                </p>

                <p className="text-sm font-black uppercase tracking-[0.1em] text-[#14263d]">
                  <T>Nuestra forma de viajar</T>
                </p>
              </div>

              <span className="font-mono text-[10px] text-[#14263d]/30">
                01—04
              </span>
            </div>

            <div className="relative">
              {/* Línea de ruta */}
              <div className="pointer-events-none absolute bottom-0 left-[35px] top-0 w-px bg-[#14263d]/15 sm:left-[47px]" />

              {benefits.map((item, i) => (
                <div
                  key={i}
                  className="group relative grid grid-cols-[70px_1fr] border-b border-[#14263d]/15 last:border-b-0 sm:grid-cols-[94px_1fr]"
                >
                  {/* Marcador */}
                  <div className="relative flex justify-center px-3 py-9 sm:py-11">
                    <span className="relative z-10 flex h-7 w-7 items-center justify-center border border-[#14263d]/20 bg-[#f4f0e7] font-mono text-[8px] font-bold text-[#14263d]/40 transition-all duration-300 group-hover:border-[#ff5f49] group-hover:bg-[#ff5f49] group-hover:text-white">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Contenido */}
                  <div className="relative px-2 py-9 pr-6 sm:py-11 sm:pr-10">
                    <span className="absolute right-6 top-6 font-mono text-[8px] uppercase tracking-[0.2em] text-[#14263d]/20 sm:right-10">
                      Point {String(i + 1).padStart(2, "0")}
                    </span>

                    <h3 className="max-w-md pr-12 text-xl font-black uppercase leading-tight tracking-[-0.02em] text-[#14263d] transition-colors duration-300 group-hover:text-[#ff5f49] sm:text-2xl">
                      <T>{item.title}</T>
                    </h3>

                    <p className="mt-4 max-w-lg text-sm font-medium leading-relaxed text-[#14263d]/60 sm:text-base">
                      <T>{item.description}</T>
                    </p>

                    <div className="mt-7 flex items-center gap-3">
                      <span className="h-px w-8 bg-[#14263d]/20 transition-all duration-300 group-hover:w-14 group-hover:bg-[#ff5f49]" />

                      <span className="text-[7px] font-bold uppercase tracking-[0.24em] text-[#14263d]/30">
                        <T>Estándar Mapira</T>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between border-t border-[#14263d]/20 bg-[#e9e2d5] px-6 py-4 sm:px-8">
              <span className="font-mono text-[8px] uppercase tracking-[0.22em] text-[#14263d]/35">
                <T>Ruta diseñada individualmente</T>
              </span>

              <span className="h-2 w-2 rounded-full bg-[#ff5f49]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}