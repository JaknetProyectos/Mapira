"use client";

import { T } from "@/components/T";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

interface LegalPageProps {
  title: string;
  sections: {
    heading: string;
    content: string;
  }[];
}

export function LegalPage({ title, sections }: LegalPageProps) {
  return (
    <div className="flex min-h-screen flex-col bg-[#eee8dc] text-[#14263d]">
      <Header />

      <main className="relative flex-1 overflow-hidden pb-24 pt-36 md:pt-40 lg:pb-32">
        {/* Retícula cartográfica */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.045]">
          <div className="absolute left-[10%] top-0 h-full w-px bg-[#14263d]" />
          <div className="absolute left-[35%] top-0 h-full w-px bg-[#14263d]" />
          <div className="absolute left-[60%] top-0 h-full w-px bg-[#14263d]" />
          <div className="absolute left-[85%] top-0 h-full w-px bg-[#14263d]" />

          <div className="absolute left-0 top-[20%] h-px w-full bg-[#14263d]" />
          <div className="absolute left-0 top-[50%] h-px w-full bg-[#14263d]" />
          <div className="absolute left-0 top-[80%] h-px w-full bg-[#14263d]" />
        </div>

        {/* Círculo cartográfico decorativo */}
        <div className="pointer-events-none absolute -right-56 top-20 hidden h-[34rem] w-[34rem] rounded-full border border-[#14263d]/10 lg:block">
          <div className="absolute inset-20 rounded-full border border-[#14263d]/10" />
          <div className="absolute inset-40 rounded-full border border-[#ff5f49]/20" />

          <span className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ff5f49]" />
        </div>

        <div className="relative z-10 mx-auto max-w-screen-2xl px-6 lg:px-12">
          {/* Identificador superior */}
          <div className="mb-10 flex items-center justify-between border-b border-[#14263d]/20 pb-5">
            <div className="flex items-center gap-4">
              <span className="h-2 w-2 bg-[#ff5f49]" />

              <span className="text-[9px] font-bold uppercase tracking-[0.34em] text-[#14263d]/50">
                Expediente legal
              </span>
            </div>

            <span className="hidden font-mono text-[9px] uppercase tracking-[0.22em] text-[#14263d]/35 md:block">
              Mapira / Legal Document
            </span>
          </div>

          <div className="grid border border-[#14263d]/20 bg-[#f4f0e7] lg:grid-cols-[340px_minmax(0,1fr)] xl:grid-cols-[390px_minmax(0,1fr)]">
            {/* Panel izquierdo */}
            <aside className="relative overflow-hidden border-b border-[#14263d]/20 bg-[#14263d] text-white lg:sticky lg:top-28 lg:h-[calc(100vh-7rem)] lg:border-b-0 lg:border-r">
              {/* Decoración */}
              <div className="pointer-events-none absolute -left-36 -top-32 h-[28rem] w-[28rem] rounded-full border border-white/10">
                <div className="absolute inset-16 rounded-full border border-white/10" />
                <div className="absolute inset-32 rounded-full border border-[#ff7058]/25" />
              </div>

              <div className="pointer-events-none absolute -bottom-8 -left-3 text-[11rem] font-black uppercase leading-none tracking-[-0.09em] text-white/[0.025]">
                L
              </div>

              <div className="relative z-10 flex h-full flex-col px-6 py-9 sm:px-8 lg:px-9 lg:py-12">
                <div>
                  <div className="mb-8 flex items-center justify-between">
                    <span className="font-mono text-[8px] uppercase tracking-[0.24em] text-[#ff7d6b]">
                      Documento oficial
                    </span>

                    <span className="font-mono text-[8px] text-white/30">
                      LEG—01
                    </span>
                  </div>

                  <h1 className="max-w-sm text-4xl font-black uppercase leading-[0.9] tracking-[-0.045em] text-white sm:text-5xl lg:text-[3.4rem]">
                    <T>{title}</T>
                  </h1>

                  <div className="mt-8 flex items-center gap-3">
                    <span className="h-px w-10 bg-[#ff5f49]" />

                    <span className="font-mono text-[8px] uppercase tracking-[0.22em] text-white/35">
                      Mapira México
                    </span>
                  </div>
                </div>

                {/* Índice */}
                <div className="mt-12 hidden min-h-0 flex-1 overflow-y-auto border-t border-white/15 pt-7 lg:block">
                  <p className="mb-6 text-[8px] font-bold uppercase tracking-[0.3em] text-white/30">
                    <T>Contenido</T>
                  </p>

                  <div>
                    {sections.map((section, idx) => (
                      <div
                        key={idx}
                        className="group grid grid-cols-[34px_1fr] border-b border-white/10 py-4"
                      >
                        <span className="font-mono text-[8px] text-[#ff7d6b]">
                          {String(idx + 1).padStart(2, "0")}
                        </span>

                        <p className="line-clamp-1 cursor-pointer text-[10px] font-bold uppercase leading-relaxed tracking-[0.12em] text-white/45 transition-colors duration-300 group-hover:text-white">
                          <T>{section.heading}</T>
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-10 border-t border-white/15 pt-5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/30">
                      mapira.mx
                    </span>

                    <span className="h-2 w-2 rounded-full bg-[#ff5f49]" />
                  </div>
                </div>
              </div>
            </aside>

            {/* Contenido legal */}
            <div className="min-w-0">
              <div className="flex items-center justify-between border-b border-[#14263d]/20 px-6 py-5 sm:px-8 lg:px-10">
                <div>
                  <p className="mb-1 text-[8px] font-bold uppercase tracking-[0.3em] text-[#ff5f49]">
                    Información contractual
                  </p>

                  <p className="text-xs font-black uppercase tracking-[0.12em] text-[#14263d]">
                    Lectura del documento
                  </p>
                </div>

                <span className="font-mono text-[9px] text-[#14263d]/30">
                  {String(sections.length).padStart(2, "0")} SECCIONES
                </span>
              </div>

              <div>
                {sections.map((section, index) => (
                  <article
                    key={index}
                    className="group grid scroll-mt-32 border-b border-[#14263d]/15 last:border-b-0 md:grid-cols-[90px_minmax(0,1fr)] lg:grid-cols-[110px_minmax(0,1fr)]"
                  >
                    {/* Número */}
                    <div className="border-b border-[#14263d]/10 px-6 pb-0 pt-8 md:border-b-0 md:border-r md:px-5 md:py-12 lg:px-7">
                      <span className="font-mono text-sm font-bold text-[#ff5f49]">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span className="mt-3 hidden h-px w-7 bg-[#14263d]/20 transition-all duration-300 group-hover:w-10 group-hover:bg-[#ff5f49] md:block" />
                    </div>

                    {/* Texto */}
                    <div className="px-6 pb-10 pt-5 sm:px-8 md:px-9 md:py-12 lg:px-12 lg:py-14">
                      <div className="mb-7 flex items-start justify-between gap-8">
                        <h2 className="max-w-3xl text-2xl font-black uppercase leading-[1.05] tracking-[-0.025em] text-[#14263d] transition-colors duration-300 group-hover:text-[#ff5f49] md:text-3xl">
                          <T>{section.heading}</T>
                        </h2>

                        <span className="hidden font-mono text-[8px] uppercase tracking-[0.18em] text-[#14263d]/20 sm:block">
                          Article {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>

                      <p className="max-w-4xl whitespace-pre-line text-[15px] font-medium leading-8 text-[#14263d]/65 md:text-base md:leading-8">
                        <T>{section.content}</T>
                      </p>
                    </div>
                  </article>
                ))}
              </div>

              {/* Cierre del documento */}
              <div className="flex flex-col gap-5 border-t border-[#14263d]/20 bg-[#e8e1d4] px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
                <div className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-[#ff5f49]" />

                  <span className="font-mono text-[8px] uppercase tracking-[0.22em] text-[#14263d]/40">
                    Fin del documento
                  </span>
                </div>

                <span className="font-mono text-[8px] uppercase tracking-[0.22em] text-[#14263d]/35">
                  Mapira · Ciudad de México
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}