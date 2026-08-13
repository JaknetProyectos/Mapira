"use client";

import { useLocale } from "next-intl";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { T } from "@/components/T";

// Reestructuramos el array para que coincida con la BD (Plan, Experiencia, Personalizada)
const categoryCards = [
  {
    id: 1,
    number: "01",
    title: "Planes Locales",
    description:
      "Recorridos gastronómicos y culturales de medio día en los rincones urbanos más vibrantes.",
    image:
      "https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg",
    tag: "Descubrimiento",
    slug: "plan",
  },
  {
    id: 2,
    number: "02",
    title: "Experiencias Premium",
    description:
      "Inmersión total. Accesos exclusivos a cenotes privados, beach clubs y menús de alta cocina.",
    image:
      "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg",
    tag: "High-End",
    slug: "experiencia", 
  },
  {
    id: 3,
    number: "03",
    title: "Rutas a la Medida",
    description:
      "Itinerarios 100% privados curados por nuestro equipo, adaptados a tus propios tiempos.",
    image:
      "https://images.pexels.com/photos/331107/pexels-photo-331107.jpeg",
    tag: "Personalizado",
    slug: "personalizada", 
  },
];

export function Experiences() {
  const locale = useLocale();

  return (
    <section
      id="experiencias"
      className="relative overflow-hidden bg-[#f2eee4] py-24 text-[#14263d] lg:py-32"
    >
      {/* Retícula cartográfica de fondo */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.055]">
        <div className="absolute left-[8%] top-0 h-full w-px bg-[#14263d]" />
        <div className="absolute left-[33%] top-0 h-full w-px bg-[#14263d]" />
        <div className="absolute left-[58%] top-0 h-full w-px bg-[#14263d]" />
        <div className="absolute left-[83%] top-0 h-full w-px bg-[#14263d]" />

        <div className="absolute left-0 top-[22%] h-px w-full bg-[#14263d]" />
        <div className="absolute left-0 top-[52%] h-px w-full bg-[#14263d]" />
        <div className="absolute left-0 top-[82%] h-px w-full bg-[#14263d]" />
      </div>

      {/* Marcador decorativo */}
      <div className="pointer-events-none absolute -right-40 top-12 hidden h-[30rem] w-[30rem] rounded-full border border-[#14263d]/10 lg:block">
        <div className="absolute inset-16 rounded-full border border-[#14263d]/10" />
        <div className="absolute inset-32 rounded-full border border-[#ff5f49]/20" />
      </div>

      <div className="relative z-10 mx-auto max-w-screen-2xl px-6 lg:px-12">
        {/* Cabecera editorial */}
        <div className="mb-14 border-b border-[#14263d]/20 pb-10 lg:mb-20">
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="h-2 w-2 bg-[#ff5f49]" />

              <span className="text-[9px] font-bold uppercase tracking-[0.34em] text-[#14263d]/55">
                <T>Líneas de Viaje</T>
              </span>
            </div>

            <span className="hidden font-mono text-[9px] uppercase tracking-[0.24em] text-[#14263d]/35 md:block">
              Mapira / Atlas 02
            </span>
          </div>

          <div className="grid items-end gap-8 lg:grid-cols-[1fr_360px]">
            <div>
              <p className="mb-3 font-mono text-[9px] uppercase tracking-[0.26em] text-[#ff5f49]">
                <T>Curaduría de rutas</T>
              </p>

              <h2 className="max-w-4xl text-5xl font-black uppercase leading-[0.88] tracking-[-0.055em] text-[#14263d] sm:text-6xl md:text-7xl lg:text-8xl">
                <T>Colección</T>
                <span className="block text-[#ff5f49]">
                  <T>Mapira.</T>
                </span>
              </h2>
            </div>

            <div className="border-l-2 border-[#ff5f49] pl-5 lg:pb-2">
              <p className="mb-6 text-sm font-medium leading-relaxed text-[#14263d]/65 md:text-base">
                <T>
                  Desde recorridos culinarios de unas horas hasta viajes
                  inmersivos frente al Caribe. Tú eliges la forma de explorar.
                </T>
              </p>

              <Link
                href={`/${locale}/experiencias`}
                className="group hidden items-center justify-between border-t border-[#14263d]/20 pt-4 text-[9px] font-bold uppercase tracking-[0.25em] text-[#14263d] transition-colors hover:text-[#ff5f49] md:flex"
              >
                <T>Ver todas las rutas</T>

                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>

        {/* Colección de categorías */}
        <div className="grid grid-cols-1 border-l border-t border-[#14263d]/20 lg:grid-cols-3">
          {categoryCards.map((cat) => (
            <Link
              key={cat.id}
              href={`/${locale}/experiencias?categoria=${cat.slug}`}
              className="group block border-b border-r border-[#14263d]/20"
            >
              <Card className="relative h-full overflow-hidden rounded-none border-0 bg-transparent shadow-none">
                {/* Cabecera de ficha */}
                <div className="flex items-center justify-between border-b border-[#14263d]/20 px-5 py-4">
                  <span className="font-mono text-[9px] font-bold uppercase tracking-[0.25em] text-[#ff5f49]">
                    <T>{cat.tag}</T>
                  </span>

                  <span className="font-mono text-[10px] font-bold text-[#14263d]/35">
                    {cat.number}
                  </span>
                </div>

                {/* Imagen */}
                <div className="relative h-[310px] overflow-hidden bg-[#d9d1c3] sm:h-[390px] lg:h-[430px]">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="absolute inset-0 h-full w-full object-cover grayscale-[15%] transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#14263d]/55 via-transparent to-transparent" />

                  {/* Coordenadas decorativas */}
                  <div className="absolute left-5 top-5 flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-[#ff5f49] shadow-[0_0_0_6px_rgba(255,95,73,0.2)]" />

                    <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/75">
                     <T>Ruta seleccionada</T>
                    </span>
                  </div>

                  <div className="absolute bottom-5 right-5 border border-white/30 bg-[#14263d]/45 px-3 py-2 backdrop-blur-md">
                    <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/75">
                      MX / {cat.number}
                    </span>
                  </div>
                </div>

                {/* Información */}
                <div className="relative min-h-[250px] bg-[#f2eee4] px-5 py-7 transition-colors duration-300 group-hover:bg-[#e9e2d5] md:px-7 md:py-8">
                  <div className="mb-6 flex items-start justify-between gap-6">
                    <h3 className="max-w-[260px] text-2xl font-black uppercase leading-[0.95] tracking-[-0.025em] text-[#14263d] md:text-3xl">
                      <T>{cat.title}</T>
                    </h3>

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#14263d]/20 text-[#14263d] transition-all duration-300 group-hover:border-[#ff5f49] group-hover:bg-[#ff5f49] group-hover:text-white">
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </div>
                  </div>

                  <p className="text-sm font-medium leading-relaxed text-[#14263d]/62">
                    <T>{cat.description}</T>
                  </p>

                  <div className="mt-8 flex items-center gap-3">
                    <span className="h-px w-8 bg-[#ff5f49]" />

                    <span className="text-[8px] font-bold uppercase tracking-[0.24em] text-[#14263d]/40">
                      <T>Explorar categoría</T>
                    </span>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* Enlace móvil */}
        <Link
          href={`/${locale}/experiencias`}
          className="mt-8 flex items-center justify-between border border-[#14263d]/25 px-5 py-5 text-[9px] font-bold uppercase tracking-[0.25em] text-[#14263d] transition-all duration-300 hover:border-[#ff5f49] hover:bg-[#ff5f49] hover:text-white md:hidden"
        >
          <T>Ver todas las rutas</T>

          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}