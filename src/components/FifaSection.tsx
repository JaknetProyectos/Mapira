"use client";

import { useLocale } from "next-intl";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Trophy } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { FifaExp } from "@/lib/types";
import { T } from "@/components/T";

export function FifaSection() {
  const [fifaExps, setFifaExps] = useState<FifaExp[]>([]);
  const [activeExpId, setActiveExpId] = useState<number | null>(null);
  const locale = useLocale();

  useEffect(() => {
    async function loadFifaData() {
      // CAMBIO CLAVE: Apuntamos a la nueva tabla terminada en _mp
      const { data, error } = await supabase
        .from("fifa_experiences_mp")
        .select("*")
        .order("order_index", { ascending: true });

      if (error) {
        console.error("Error al cargar experiencias FIFA:", error);
      }

      if (data) {
        setFifaExps(data);

        if (data.length > 0) {
          setActiveExpId(data[0].id);
        }
      }
    }

    loadFifaData();
  }, []);

  const activeExp = fifaExps.find((exp) => exp.id === activeExpId);

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#101f33] py-24 text-white lg:py-32">
      {/* Fondos dinámicos */}
      {fifaExps.map((exp) => (
        <div
          key={exp.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            activeExpId === exp.id
              ? "z-0 opacity-100"
              : "-z-10 opacity-0"
          }`}
        >
          <img
            src={exp.image_url}
            alt={exp.title}
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-[#101f33]/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#101f33] via-[#101f33]/95 to-[#101f33]/25" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#101f33] via-transparent to-[#101f33]/70" />
        </div>
      ))}

      {/* Retícula cartográfica */}
      <div className="pointer-events-none absolute inset-0 z-[1] opacity-[0.09]">
        <div className="absolute left-[12%] top-0 h-full w-px bg-white" />
        <div className="absolute left-[37%] top-0 h-full w-px bg-white" />
        <div className="absolute left-[62%] top-0 h-full w-px bg-white" />
        <div className="absolute left-[87%] top-0 h-full w-px bg-white" />

        <div className="absolute left-0 top-[20%] h-px w-full bg-white" />
        <div className="absolute left-0 top-[50%] h-px w-full bg-white" />
        <div className="absolute left-0 top-[80%] h-px w-full bg-white" />
      </div>

      {/* Círculos de ubicación */}
      <div className="pointer-events-none absolute -right-44 top-20 z-[1] hidden h-[34rem] w-[34rem] rounded-full border border-white/10 lg:block">
        <div className="absolute inset-20 rounded-full border border-white/10" />
        <div className="absolute inset-40 rounded-full border border-[#ff6550]/30" />

        <span className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ff6550] shadow-[0_0_0_12px_rgba(255,101,80,0.12)]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-screen-2xl px-6 lg:px-12">
        {/* Encabezado */}
        <div className="mb-12 border-b border-white/20 pb-10 lg:mb-16">
          <div className="mb-8 flex items-center justify-between">
            <div className="inline-flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center border border-[#ff6550] bg-[#ff6550]/10">
                <Trophy
                  className="h-4 w-4 text-[#ff7d6b]"
                  strokeWidth={1.6}
                />
              </div>

              <div>
                <p className="mb-1 text-[8px] font-bold uppercase tracking-[0.32em] text-white/35">
                  Mapira Sports Atlas
                </p>

                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#ff7d6b]">
                  <T>Exclusividad Deportiva</T>
                </span>
              </div>
            </div>

            <span className="hidden font-mono text-[9px] uppercase tracking-[0.22em] text-white/35 md:block">
              Edition / FIFA / MX
            </span>
          </div>

          <div className="grid items-end gap-8 lg:grid-cols-[1fr_280px]">
            <h2 className="max-w-4xl text-5xl font-black uppercase leading-[0.88] tracking-[-0.055em] sm:text-6xl md:text-7xl lg:text-8xl">
              <T>El mundo mira.</T>

              <span className="block text-[#ff6550]">
                <T>Tú lo vives.</T>
              </span>
            </h2>

            <div className="border-l-2 border-[#ff6550] pl-5">
              <p className="font-mono text-[9px] uppercase leading-relaxed tracking-[0.22em] text-white/45">
                <T>Accesos seleccionados</T>
                <br />
                <T>Hospitalidad premium</T>
                <br />
                <T>Experiencias oficiales</T>
              </p>
            </div>
          </div>
        </div>

        {fifaExps.length > 0 && activeExp && (
          <div className="grid gap-8 xl:grid-cols-[310px_minmax(0,1fr)] xl:gap-12">
            {/* Navegación lateral */}
            <div className="border border-white/20 bg-[#101f33]/55 backdrop-blur-md">
              <div className="border-b border-white/20 px-5 py-4">
                <div className="flex items-center justify-between">
                  <span className="text-[8px] font-bold uppercase tracking-[0.3em] text-white/40">
                    <T>Selecciona experiencia</T>
                  </span>

                  <span className="font-mono text-[9px] text-[#ff7d6b]">
                    {String(fifaExps.length).padStart(2, "0")}
                  </span>
                </div>
              </div>

              <div className="flex overflow-x-auto xl:flex-col">
                {fifaExps.map((exp, index) => (
                  <button
                    key={exp.id}
                    onClick={() => setActiveExpId(exp.id)}
                    className={`group relative flex min-w-[230px] items-center gap-4 border-r border-white/15 px-5 py-5 text-left transition-all duration-300 last:border-r-0 xl:min-w-0 xl:border-b xl:border-r-0 xl:last:border-b-0 ${
                      activeExpId === exp.id
                        ? "bg-[#ff6550] text-white"
                        : "bg-transparent text-white/45 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <span
                      className={`font-mono text-[9px] transition-colors ${
                        activeExpId === exp.id
                          ? "text-white/70"
                          : "text-white/25"
                      }`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="text-[10px] font-bold uppercase leading-relaxed tracking-[0.18em]">
                      <T>{exp.title}</T>
                    </span>

                    {activeExpId === exp.id && (
                      <span className="absolute bottom-0 left-0 h-[3px] w-full bg-white xl:bottom-auto xl:left-0 xl:top-0 xl:h-full xl:w-[3px]" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Experiencia activa */}
            <div
              key={activeExp.id}
              className="animate-reveal border border-white/20 bg-[#101f33]/72 backdrop-blur-md"
            >
              <div className="grid lg:grid-cols-[minmax(0,1fr)_380px]">
                {/* Información principal */}
                <div className="border-b border-white/20 p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
                  <div className="mb-10 flex items-start justify-between gap-6">
                    <div>
                      <p className="mb-3 font-mono text-[8px] font-bold uppercase tracking-[0.3em] text-[#ff7d6b]">
                        <T>Experiencia seleccionada</T>
                      </p>

                      <h3 className="max-w-2xl text-3xl font-black uppercase leading-[0.95] tracking-[-0.025em] text-white md:text-4xl">
                        <T>{activeExp.subtitle}</T>
                      </h3>
                    </div>

                    <span className="hidden font-mono text-5xl font-bold text-white/5 sm:block">
                      FIFA
                    </span>
                  </div>

                  <p className="max-w-2xl text-base font-medium leading-relaxed text-white/70 md:text-lg">
                    <T>{activeExp.description}</T>
                  </p>

                  <div className="mt-10 flex flex-col gap-5 border-t border-white/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="mb-1 text-[7px] font-bold uppercase tracking-[0.3em] text-white/30">
                        <T>Solicitud personalizada</T>
                      </p>

                      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/60">
                        <T>Acceso sujeto a disponibilidad</T>
                      </p>
                    </div>

                    <Button
                      asChild
                      className="group h-14 rounded-none border border-[#ff6550] bg-[#ff6550] px-7 text-[9px] font-bold uppercase tracking-[0.24em] text-white shadow-none transition-all duration-300 hover:bg-white hover:text-[#101f33]"
                    >
                      <Link href={`/${locale}/cotizar`}>
                        <T>Reservar Acceso</T>

                        <ArrowRight className="ml-3 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </div>
                </div>

                {/* Beneficios */}
                <div className="bg-[#0c192a]/55">
                  <div className="flex items-center justify-between border-b border-white/15 px-6 py-5">
                    <span className="text-[8px] font-bold uppercase tracking-[0.3em] text-white/35">
                      <T>Acceso incluido</T>
                    </span>

                    <span className="font-mono text-[9px] text-[#ff7d6b]">
                      PASS / {String(activeExp.id).padStart(2, "0")}
                    </span>
                  </div>

                  <div>
                    {activeExp.items.map((item, i) => (
                      <div
                        key={i}
                        className="group grid grid-cols-[42px_1fr] border-b border-white/10 last:border-b-0"
                      >
                        <div className="flex items-start justify-center border-r border-white/10 px-2 py-5">
                          <span className="font-mono text-[9px] text-[#ff7d6b]">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                        </div>

                        <div className="px-5 py-5 transition-colors duration-300 group-hover:bg-white/5">
                          <span className="text-sm font-medium leading-relaxed text-white/75 transition-colors group-hover:text-white">
                            <T>{item}</T>
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Pie de pase */}
              <div className="flex flex-col gap-4 border-t border-dashed border-white/20 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-[#ff6550]" />

                  <span className="font-mono text-[8px] uppercase tracking-[0.22em] text-white/35">
                    Mapira Official Journey
                  </span>
                </div>

                <span className="font-mono text-[8px] uppercase tracking-[0.22em] text-white/30">
                  mapira.mx / sports
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}