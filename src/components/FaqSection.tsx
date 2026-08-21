"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { T } from "@/components/T";

const faqData = [
  {
    id: 1,
    number: "01",
    question: "¿Es posible adaptar el lugar o el estilo del evento?",
    answer:
      "Claro que sí. Aunque contamos con propuestas base, tu experiencia es moldeable en cuanto a ubicación, tipo de festejo, tamaño del grupo y detalles de producción.",
  },
  {
    id: 2,
    number: "02",
    question: "¿El transporte viene incluido en todas las rutas?",
    answer:
      "Depende del plan elegido. Ciertas rutas ya lo integran, mientras que otras lo ofrecen como un servicio adicional. Las especificaciones de cada tour te indicarán el alcance exacto.",
  },
  {
    id: 3,
    number: "03",
    question: "¿Cuál es el proceso para asegurar y confirmar una fecha?",
    answer:
      "Al cotizar nos indicas cuándo, dónde y cuántas personas asisten. Posteriormente, nosotros verificamos la disponibilidad de los espacios y la logística para darte la confirmación definitiva.",
  },
  {
    id: 4,
    number: "04",
    question: "¿Ofrecen planes románticos o para grupos grandes?",
    answer:
      "Por supuesto. Tenemos desde opciones individuales y románticas para parejas, hasta diseños a la medida para grupos grandes, aniversarios y celebraciones importantes.",
  },
];

export function FaqSection() {
  const [openId, setOpenId] = useState<number | null>(1);

  const toggleFaq = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section
      id="faq"
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

      <div className="relative z-10 mx-auto max-w-screen-2xl px-6 lg:px-12">
        {/* Cabecera editorial */}
        <div className="mb-14 border-b border-[#14263d]/20 pb-10 lg:mb-20">
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="h-2 w-2 bg-[#ff5f49]" />

              <span className="text-[9px] font-bold uppercase tracking-[0.34em] text-[#14263d]/55">
                <T>Información de Reserva</T>
              </span>
            </div>

            <span className="hidden font-mono text-[9px] uppercase tracking-[0.24em] text-[#14263d]/35 md:block">
              Mapira / FAQ 03
            </span>
          </div>

          <div className="grid items-end gap-8 lg:grid-cols-[1fr_360px]">
            <div>
              <p className="mb-3 font-mono text-[9px] uppercase tracking-[0.26em] text-[#ff5f49]">
                <T>Dudas Comunes</T>
              </p>

              <h2 className="max-w-4xl text-5xl font-black uppercase leading-[0.88] tracking-[-0.055em] text-[#14263d] sm:text-6xl md:text-7xl lg:text-8xl">
                <T>Preguntas</T>
                <span className="block text-[#ff5f49]">
                  <T>Frecuentes.</T>
                </span>
              </h2>
            </div>

            <div className="border-l-2 border-[#ff5f49] pl-5 lg:pb-2">
              <p className="text-sm font-medium leading-relaxed text-[#14263d]/65 md:text-base">
                <T>
                  Recopilamos las inquietudes principales sobre fechas,
                  logística y asistentes para que tu proceso de selección y
                  reserva sea totalmente transparente.
                </T>
              </p>
            </div>
          </div>
        </div>

        {/* Lista de acordeón */}
        <div className="mx-auto max-w-4xl border-t border-[#14263d]/20">
          {faqData.map((faq) => {
            const isOpen = openId === faq.id;

            return (
              <div
                key={faq.id}
                className="group border-b border-[#14263d]/20 transition-colors duration-300 hover:bg-[#e9e2d5]"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="flex w-full items-start justify-between gap-6 px-5 py-8 text-left md:items-center md:px-8"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-8">
                    <span
                      className={`font-mono text-[10px] font-bold transition-colors duration-300 ${
                        isOpen ? "text-[#ff5f49]" : "text-[#14263d]/35"
                      }`}
                    >
                      {faq.number}
                    </span>

                    <h3
                      className={`text-lg font-bold uppercase leading-snug tracking-tight transition-colors duration-300 md:text-xl lg:text-2xl ${
                        isOpen ? "text-[#ff5f49]" : "text-[#14263d]"
                      }`}
                    >
                      <T>{faq.question}</T>
                    </h3>
                  </div>

                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center border transition-all duration-300 ${
                      isOpen
                        ? "border-[#ff5f49] bg-[#ff5f49] text-white"
                        : "border-[#14263d]/20 text-[#14263d] group-hover:border-[#ff5f49]"
                    }`}
                  >
                    {isOpen ? (
                      <Minus className="h-4 w-4" />
                    ) : (
                      <Plus className="h-4 w-4" />
                    )}
                  </div>
                </button>

                <div
                  className={`grid transition-all duration-500 ease-in-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="pb-8 pl-5 pr-5 md:pl-[4.5rem] md:pr-24">
                      <p className="text-base font-medium leading-relaxed text-[#14263d]/70 md:text-lg">
                        <T>{faq.answer}</T>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
