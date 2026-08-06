"use client";

import { useLocale } from "next-intl";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { T } from "@/components/T";
import {
  ArrowRight,
  Compass,
  Sparkles,
  MapPin,
  Feather,
  Target,
  Layers,
  LayoutList,
} from "lucide-react";

export default function SobreNosotrosPage() {
  const locale = useLocale();

  return (
    <div className="flex min-h-screen flex-col bg-[#eee8dc] text-[#14263d] selection:bg-[#ff5f49]/25">
      <Header />

      <main className="flex-1 overflow-hidden">
        {/* 1. HERO Y ESENCIA */}
        <section className="relative pb-20 pt-36 lg:pb-28 lg:pt-44">
          {/* Retícula cartográfica */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.045]">
            <div className="absolute left-[10%] top-0 h-full w-px bg-[#14263d]" />
            <div className="absolute left-[35%] top-0 h-full w-px bg-[#14263d]" />
            <div className="absolute left-[60%] top-0 h-full w-px bg-[#14263d]" />
            <div className="absolute left-[85%] top-0 h-full w-px bg-[#14263d]" />

            <div className="absolute left-0 top-[28%] h-px w-full bg-[#14263d]" />
            <div className="absolute left-0 top-[68%] h-px w-full bg-[#14263d]" />
          </div>

          <div className="relative z-10 mx-auto max-w-screen-2xl px-6 lg:px-12">
            {/* Barra superior */}
            <div className="mb-10 flex items-center justify-between border-b border-[#14263d]/20 pb-5">
              <div className="flex items-center gap-4">
                <span className="h-2 w-2 bg-[#ff5f49]" />

                <span className="text-[9px] font-bold uppercase tracking-[0.34em] text-[#14263d]/50">
                  <T>Nuestra Firma</T>
                </span>
              </div>

              <span className="hidden font-mono text-[9px] uppercase tracking-[0.22em] text-[#14263d]/35 md:block">
                Mapira / Field Journal / 01
              </span>
            </div>

            <div className="grid items-stretch border border-[#14263d]/20 lg:grid-cols-[1.05fr_0.95fr]">
              {/* Narrativa */}
              <div className="relative flex flex-col justify-between bg-[#f4f0e7] px-6 py-10 sm:px-10 sm:py-14 lg:min-h-[720px] lg:px-12 lg:py-16">
                <div>
                  <div className="mb-10 flex items-center gap-4">
                    <Compass
                      className="h-5 w-5 text-[#ff5f49]"
                      strokeWidth={1.5}
                    />

                    <span className="font-mono text-[8px] uppercase tracking-[0.26em] text-[#14263d]/40">
                      Independent travel studio
                    </span>
                  </div>

                  <h1 className="max-w-4xl text-5xl font-black uppercase leading-[0.84] tracking-[-0.06em] text-[#14263d] sm:text-6xl md:text-7xl xl:text-8xl">
                    <T>Diseñamos viajes</T>

                    <span className="mt-2 block text-[#ff5f49]">
                      <T>con intención.</T>
                    </span>
                  </h1>

                  <div className="mt-10 max-w-xl border-l-2 border-[#ff5f49] pl-5 sm:pl-7">
                    <p className="text-base font-medium leading-relaxed text-[#14263d]/65 md:text-lg">
                      <T>
                        Cada expedición comienza con una intención clara:
                        celebrar, sorprender, desconectar o descubrir un destino
                        desde una perspectiva completamente personal.
                        Construimos rutas donde cultura, gastronomía y logística
                        se integran con precisión.
                      </T>
                    </p>
                  </div>
                </div>

                <div className="mt-14 grid border-l border-t border-[#14263d]/20 sm:grid-cols-2">
                  <div className="border-b border-r border-[#14263d]/20 p-6">
                    <div className="mb-6 flex items-center justify-between">
                      <p className="text-[8px] font-bold uppercase tracking-[0.28em] text-[#ff5f49]">
                        <T>El Enfoque</T>
                      </p>

                      <span className="font-mono text-[8px] text-[#14263d]/25">
                        01
                      </span>
                    </div>

                    <p className="text-sm font-bold leading-relaxed text-[#14263d]">
                      <T>
                        Destino, narrativa y ejecución impecable en una misma
                        pieza.
                      </T>
                    </p>
                  </div>

                  <div className="border-b border-r border-[#14263d]/20 p-6">
                    <div className="mb-6 flex items-center justify-between">
                      <p className="text-[8px] font-bold uppercase tracking-[0.28em] text-[#ff5f49]">
                        <T>El Objetivo</T>
                      </p>

                      <span className="font-mono text-[8px] text-[#14263d]/25">
                        02
                      </span>
                    </div>

                    <p className="text-sm font-bold leading-relaxed text-[#14263d]">
                      <T>
                        Que cada travesía respire al ritmo exacto de quien la
                        protagoniza.
                      </T>
                    </p>
                  </div>
                </div>
              </div>

              {/* Imagen editorial */}
              <div className="relative min-h-[520px] overflow-hidden bg-[#14263d] lg:min-h-[720px]">
                <img
                  src="https://images.pexels.com/photos/3889843/pexels-photo-3889843.jpeg"
                  alt="Filosofía de viaje de Mapira"
                  className="absolute inset-0 h-full w-full object-cover grayscale-[10%] transition-transform duration-1000 hover:scale-105 hover:grayscale-0"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#14263d]/85 via-[#14263d]/5 to-[#14263d]/20" />

                {/* Líneas técnicas */}
                <div className="pointer-events-none absolute inset-0 opacity-30">
                  <div className="absolute left-1/3 top-0 h-full w-px bg-white/30" />
                  <div className="absolute left-2/3 top-0 h-full w-px bg-white/30" />
                  <div className="absolute left-0 top-1/3 h-px w-full bg-white/30" />
                  <div className="absolute left-0 top-2/3 h-px w-full bg-white/30" />
                </div>

                <div className="absolute left-0 top-0 bg-[#ff5f49] px-5 py-4">
                  <span className="font-mono text-[8px] font-bold uppercase tracking-[0.24em] text-white">
                    Mapira Archive 001
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 border-t border-white/20 bg-[#14263d]/65 px-6 py-6 backdrop-blur-md sm:px-8">
                  <div className="mb-5 flex items-center justify-between">
                    <p className="text-2xl font-black uppercase tracking-[-0.03em] text-white">
                      Mapira
                    </p>

                    <MapPin
                      className="h-5 w-5 text-[#ff7561]"
                      strokeWidth={1.5}
                    />
                  </div>

                  <div className="flex flex-col gap-4 border-t border-white/15 pt-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-white/65">
                      <T>Reimaginando la exploración en México.</T>
                    </p>

                    <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/35">
                      19.4326° N · 99.1332° W
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. PILARES */}
        <section className="relative overflow-hidden bg-[#14263d] py-24 text-white lg:py-32">
          {/* Retícula oscura */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.08]">
            <div className="absolute left-[12%] top-0 h-full w-px bg-white" />
            <div className="absolute left-[38%] top-0 h-full w-px bg-white" />
            <div className="absolute left-[64%] top-0 h-full w-px bg-white" />
            <div className="absolute left-[88%] top-0 h-full w-px bg-white" />

            <div className="absolute left-0 top-[30%] h-px w-full bg-white" />
            <div className="absolute left-0 top-[70%] h-px w-full bg-white" />
          </div>

          <div className="pointer-events-none absolute -right-52 -top-44 h-[36rem] w-[36rem] rounded-full border border-white/10">
            <div className="absolute inset-20 rounded-full border border-white/10" />
            <div className="absolute inset-40 rounded-full border border-[#ff5f49]/25" />
          </div>

          <div className="relative z-10 mx-auto max-w-screen-2xl px-6 lg:px-12">
            <div className="mb-14 grid items-end gap-10 border-b border-white/20 pb-10 lg:grid-cols-[1fr_360px] lg:mb-20">
              <div>
                <p className="mb-5 font-mono text-[8px] font-bold uppercase tracking-[0.3em] text-[#ff7561]">
                  Design Principles / 03
                </p>

                <h2 className="max-w-4xl text-4xl font-black uppercase leading-[0.88] tracking-[-0.045em] text-white sm:text-5xl md:text-6xl lg:text-7xl">
                  <T>Tres pilares de la experiencia</T>
                </h2>
              </div>

              <p className="border-l-2 border-[#ff5f49] pl-5 text-sm font-medium leading-relaxed text-white/55 md:text-base">
                <T>
                  Así llevamos el estándar Mapira a cada expedición: una
                  experiencia clara, fluida y diseñada alrededor de las
                  necesidades reales de cada viajero.
                </T>
              </p>
            </div>

            <div className="grid border-l border-t border-white/15 md:grid-cols-3">
              {[
                {
                  icon: Target,
                  title: "Diseño con Intención",
                  desc: "Nada se integra por casualidad. Cada recorrido se diseña para celebrar, sorprender o desconectar en perfecta sintonía con tu visión.",
                },
                {
                  icon: MapPin,
                  title: "El Destino como Lienzo",
                  desc: "Evitamos fórmulas genéricas. Vinculamos tu viaje con la costa, la selva o la identidad cultural para que el entorno sea protagonista.",
                },
                {
                  icon: Layers,
                  title: "Logística Invisible",
                  desc: "Fechas, traslados, accesos y hospitalidad se coordinan cuidadosamente desde el inicio para que todo avance sin interrupciones.",
                },
              ].map((pillar, i) => (
                <article
                  key={i}
                  className="group relative min-h-[420px] border-b border-r border-white/15 bg-white/[0.025] p-7 transition-colors duration-300 hover:bg-white/[0.07] sm:p-9"
                >
                  <div className="mb-14 flex items-start justify-between">
                    <div className="flex h-14 w-14 items-center justify-center border border-[#ff6550] bg-[#ff5f49]/10 transition-all duration-300 group-hover:bg-[#ff5f49]">
                      <pillar.icon
                        className="h-5 w-5 text-[#ff7561] transition-colors group-hover:text-white"
                        strokeWidth={1.5}
                      />
                    </div>

                    <span className="font-mono text-[10px] text-white/25">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="max-w-xs text-2xl font-black uppercase leading-[0.95] tracking-[-0.025em] text-white md:text-3xl">
                    <T>{pillar.title}</T>
                  </h3>

                  <p className="mt-6 max-w-sm text-sm font-medium leading-relaxed text-white/55 md:text-base">
                    <T>{pillar.desc}</T>
                  </p>

                  <div className="absolute bottom-8 left-7 right-7 flex items-center gap-3 sm:left-9 sm:right-9">
                    <span className="h-px w-8 bg-[#ff5f49] transition-all duration-300 group-hover:w-14" />

                    <span className="text-[7px] font-bold uppercase tracking-[0.22em] text-white/30">
                      Mapira principle
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 3. EXPERIENCIAS COMPLETAS */}
        <section className="relative overflow-hidden bg-[#eee8dc] py-24 lg:py-32">
          <div className="pointer-events-none absolute inset-0 opacity-[0.045]">
            <div className="absolute left-[20%] top-0 h-full w-px bg-[#14263d]" />
            <div className="absolute left-[50%] top-0 h-full w-px bg-[#14263d]" />
            <div className="absolute left-[80%] top-0 h-full w-px bg-[#14263d]" />
          </div>

          <div className="relative z-10 mx-auto max-w-screen-2xl px-6 lg:px-12">
            <div className="grid border border-[#14263d]/20 lg:grid-cols-[0.92fr_1.08fr]">
              {/* Narrativa */}
              <div className="bg-[#f4f0e7] px-6 py-10 sm:px-10 sm:py-14 lg:px-12 lg:py-16">
                <div className="mb-10 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Sparkles
                      className="h-5 w-5 text-[#ff5f49]"
                      strokeWidth={1.5}
                    />

                    <span className="text-[8px] font-bold uppercase tracking-[0.28em] text-[#14263d]/45">
                      Full Journey Design
                    </span>
                  </div>

                  <span className="font-mono text-[8px] text-[#14263d]/25">
                    04
                  </span>
                </div>

                <h2 className="max-w-3xl text-4xl font-black uppercase leading-[0.9] tracking-[-0.045em] text-[#14263d] sm:text-5xl lg:text-6xl">
                  <T>Orquestamos experiencias</T>

                  <span className="mt-2 block text-[#ff5f49]">
                    <T>completas.</T>
                  </span>
                </h2>

                <p className="mt-8 max-w-xl text-base font-medium leading-relaxed text-[#14263d]/62 md:text-lg">
                  <T>
                    Mapira reúne accesos privados, gastronomía, fotografía,
                    detalles personalizados y traslados coordinados. Cada plan
                    del catálogo funciona como un punto de partida, nunca como
                    un límite definitivo.
                  </T>
                </p>

                <div className="mt-12 border-l border-t border-[#14263d]/20">
                  {[
                    {
                      title: "Diseño Emocional",
                      desc: "Definimos el ritmo, la atmósfera y la intención de cada momento para crear recuerdos duraderos, no simples agendas de viaje.",
                    },
                    {
                      title: "Concierge Dedicado",
                      desc: "Viajero, destino y anfitriones se coordinan mediante un acompañamiento humano que mantiene la experiencia fluida de principio a fin.",
                    },
                    {
                      title: "Curaduría Estética",
                      desc: "Cada espacio, perspectiva y detalle se elige bajo criterios claros de belleza visual, autenticidad y exclusividad.",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="group grid grid-cols-[64px_1fr] border-b border-r border-[#14263d]/20 sm:grid-cols-[80px_1fr]"
                    >
                      <div className="flex justify-center border-r border-[#14263d]/15 px-3 py-7">
                        <span className="font-mono text-[10px] font-bold text-[#ff5f49]">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>

                      <div className="px-5 py-7 transition-colors duration-300 group-hover:bg-[#ebe4d8] sm:px-7">
                        <h4 className="text-lg font-black uppercase tracking-[-0.015em] text-[#14263d]">
                          <T>{item.title}</T>
                        </h4>

                        <p className="mt-3 text-sm font-medium leading-relaxed text-[#14263d]/58">
                          <T>{item.desc}</T>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Archivo visual */}
              <div className="border-t border-[#14263d]/20 bg-[#14263d] lg:border-l lg:border-t-0">
                <div className="relative aspect-[16/11] overflow-hidden border-b border-white/15">
                  <img
                    src="https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg"
                    alt="Resort seleccionado por Mapira"
                    className="h-full w-full object-cover transition-transform duration-1000 hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#14263d]/75 via-transparent to-[#14263d]/15" />

                  <div className="absolute left-5 top-5 border border-white/30 bg-[#14263d]/35 px-4 py-3 backdrop-blur-md">
                    <span className="font-mono text-[8px] uppercase tracking-[0.22em] text-white/75">
                      Visual Archive / MX
                    </span>
                  </div>

                  <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                    <div>
                      <p className="mb-2 text-[8px] font-bold uppercase tracking-[0.25em] text-[#ff806d]">
                        Destination study
                      </p>

                      <p className="text-2xl font-black uppercase tracking-[-0.025em] text-white">
                        Hospitality Selection
                      </p>
                    </div>

                    <LayoutList
                      className="h-5 w-5 text-white/60"
                      strokeWidth={1.5}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2">
                  {/* Disciplinas */}
                  <div className="border-b border-white/15 p-7 md:border-b-0 md:border-r sm:p-8">
                    <div className="mb-7 flex items-center justify-between">
                      <p className="text-[8px] font-bold uppercase tracking-[0.28em] text-[#ff7561]">
                        <T>Disciplinas Creativas</T>
                      </p>

                      <span className="font-mono text-[8px] text-white/25">
                        LIST—01
                      </span>
                    </div>

                    <ul>
                      {[
                        "Retiros Privados",
                        "Alta Gastronomía",
                        "Hospitalidad VIP",
                        "Escapadas a Medida",
                        "Sorpresas Exclusivas",
                      ].map((area, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-4 border-b border-white/10 py-3 last:border-b-0"
                        >
                          <span className="h-1.5 w-1.5 bg-[#ff5f49]" />

                          <span className="text-xs font-bold uppercase tracking-[0.1em] text-white/70">
                            <T>{area}</T>
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Cobertura */}
                  <div className="relative overflow-hidden p-7 sm:p-8">
                    <div className="pointer-events-none absolute -bottom-20 -right-20 h-52 w-52 rounded-full border border-white/10">
                      <div className="absolute inset-10 rounded-full border border-[#ff5f49]/20" />
                    </div>

                    <div className="relative z-10">
                      <div className="mb-7 flex items-center justify-between">
                        <p className="text-[8px] font-bold uppercase tracking-[0.28em] text-[#ff7561]">
                          <T>Cobertura</T>
                        </p>

                        <span className="font-mono text-[8px] text-white/25">
                          GEO—02
                        </span>
                      </div>

                      <h4 className="text-3xl font-black uppercase tracking-[-0.035em] text-white">
                        <T>México</T>
                      </h4>

                      <p className="mt-5 text-sm font-medium leading-relaxed text-white/52">
                        <T>
                          Caribe, Bajío, costas del Pacífico y Pueblos Mágicos
                          elegidos mediante criterios rigurosos de servicio,
                          autenticidad y calidad.
                        </T>
                      </p>

                      <div className="mt-8 flex items-center gap-3">
                        <MapPin
                          className="h-4 w-4 text-[#ff7561]"
                          strokeWidth={1.5}
                        />

                        <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/30">
                          Selected territories
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. METODOLOGÍA */}
        <section className="relative overflow-hidden border-t border-[#14263d]/20 bg-[#f4f0e7] py-24 lg:py-32">
          <div className="pointer-events-none absolute -left-56 top-10 h-[34rem] w-[34rem] rounded-full border border-[#14263d]/10">
            <div className="absolute inset-20 rounded-full border border-[#14263d]/10" />
            <div className="absolute inset-40 rounded-full border border-[#ff5f49]/20" />
          </div>

          <div className="relative z-10 mx-auto max-w-screen-2xl px-6 lg:px-12">
            <div className="mb-14 grid items-end gap-10 border-b border-[#14263d]/20 pb-10 lg:grid-cols-[1fr_390px] lg:mb-20">
              <div>
                <div className="mb-6 flex items-center gap-4">
                  <Feather
                    className="h-5 w-5 text-[#ff5f49]"
                    strokeWidth={1.5}
                  />

                  <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#14263d]/50">
                    <T>Metodología</T>
                  </span>
                </div>

                <h2 className="max-w-4xl text-4xl font-black uppercase leading-[0.88] tracking-[-0.045em] text-[#14263d] sm:text-5xl md:text-6xl lg:text-7xl">
                  <T>De la idea a la reserva</T>
                </h2>
              </div>

              <p className="border-l-2 border-[#ff5f49] pl-5 text-sm font-medium leading-relaxed text-[#14263d]/58 md:text-base">
                <T>
                  Este es el proceso con el que transformamos una intención
                  inicial en una expedición definida, coherente y lista para
                  reservarse.
                </T>
              </p>
            </div>

            <div className="grid border-l border-t border-[#14263d]/20 lg:grid-cols-3">
              {[
                {
                  step: "01",
                  title: "Descubrimiento",
                  desc: "Identificamos el motivo del viaje, tu estilo personal y el destino deseado para comprender qué atmósfera representa mejor tu intención.",
                },
                {
                  step: "02",
                  title: "Arquitectura de Ruta",
                  desc: "Elegimos el punto de partida, ajustamos servicios especiales y definimos un ritmo de viaje consistente con el destino y tus prioridades.",
                },
                {
                  step: "03",
                  title: "Consolidación",
                  desc: "La reserva se confirma con disponibilidad real, comunicando claramente tiempos, alcance operativo y costos antes de cada autorización.",
                },
              ].map((phase, i) => (
                <article
                  key={i}
                  className="group relative min-h-[390px] border-b border-r border-[#14263d]/20 bg-[#eee8dc] p-7 transition-colors duration-300 hover:bg-[#14263d] sm:p-9"
                >
                  <div className="mb-16 flex items-start justify-between">
                    <span className="text-5xl font-black tracking-[-0.06em] text-[#14263d]/10 transition-colors duration-300 group-hover:text-white/10">
                      {phase.step}
                    </span>

                    <span className="h-3 w-3 border border-[#ff5f49] bg-[#ff5f49]/10 transition-colors group-hover:bg-[#ff5f49]" />
                  </div>

                  <h3 className="text-2xl font-black uppercase leading-[0.95] tracking-[-0.025em] text-[#14263d] transition-colors duration-300 group-hover:text-white md:text-3xl">
                    <T>{phase.title}</T>
                  </h3>

                  <p className="mt-6 text-sm font-medium leading-relaxed text-[#14263d]/58 transition-colors duration-300 group-hover:text-white/55 md:text-base">
                    <T>{phase.desc}</T>
                  </p>

                  <div className="absolute bottom-8 left-7 right-7 flex items-center gap-3 sm:left-9 sm:right-9">
                    <span className="h-px w-8 bg-[#ff5f49] transition-all duration-300 group-hover:w-14" />

                    <span className="text-[7px] font-bold uppercase tracking-[0.22em] text-[#14263d]/30 transition-colors group-hover:text-white/30">
                      Process stage
                    </span>
                  </div>
                </article>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-14 flex flex-col gap-6 border border-[#14263d]/20 bg-[#14263d] px-6 py-7 text-white sm:flex-row sm:items-center sm:justify-between sm:px-8">
              <div>
                <p className="mb-2 font-mono text-[8px] font-bold uppercase tracking-[0.28em] text-[#ff7561]">
                  Start your route
                </p>

                <p className="text-sm font-semibold text-white/65">
                  Comparte tus primeras coordenadas con nuestro equipo.
                </p>
              </div>

              <Link
                href={`/${locale}/cotizar`}
                className="group inline-flex h-16 w-full items-center justify-center border border-[#ff5f49] bg-[#ff5f49] px-8 text-[9px] font-bold uppercase tracking-[0.24em] text-white transition-all duration-300 hover:bg-white hover:text-[#14263d] sm:w-auto"
              >
                <T>Iniciar Diseño de Ruta</T>

                <ArrowRight className="ml-4 h-4 w-4 transition-transform duration-300 group-hover:translate-x-2" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}