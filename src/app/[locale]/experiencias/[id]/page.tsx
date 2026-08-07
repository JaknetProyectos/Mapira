"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/context/CartContext";
import { Experience } from "@/lib/types";
import { T } from "@/components/T";
import { useT } from "@/hooks/useT";
import { useLocale } from "next-intl";
import {
  Check,
  Minus,
  Plus,
  Loader2,
  MapPin,
  Clock,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function ExperienceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const locale = useLocale();
  const { addToCart } = useCart();
  const phDestino = useT("Ej. Oaxaca, Los Cabos, Tulum...");

  const [experience, setExperience] = useState<Experience | null>(null);
  const [loading, setLoading] = useState(true);

  const [selectedDate, setSelectedDate] = useState("");
  const [people, setPeople] = useState(1);
  const [customDestination, setCustomDestination] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    async function loadFullDetail() {
      if (!params.id) return;

      setLoading(true);

      try {
        const { data: activity } = await supabase
          .from("activities_mp")
          .select("*, categories:categories_mp(name, slug)")
          .eq("id", params.id)
          .single();

        if (activity) {
          setExperience(activity as Experience);
        }
      } catch (error) {
        console.error("Error loadFullDetail:", error);
      } finally {
        setLoading(false);
      }
    }

    loadFullDetail();
  }, [params.id]);

  const formatPrice = (price: number) => {
    const formatter = new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
      minimumFractionDigits: 0,
    });

    return `${formatter.format(price)} MXN`;
  };

  const isPersonalized = experience?.plan_type === "PERSONALIZADA";

  const handleAddToCart = () => {
    if (!experience || !selectedDate) return;
    if (isPersonalized && !customDestination.trim()) return;

    setIsAdding(true);

    const experienceToCart = isPersonalized
      ? {
          ...experience,
          destination: customDestination,
        }
      : experience;

    addToCart({
      activityId: experience.id,
      experience: experienceToCart,
      date: selectedDate,
      people: people,
      pricePerPerson: Number(experience.price),
    });

    setTimeout(() => {
      setIsAdding(false);
      router.push(`/${locale}/carrito`);
    }, 500);
  };

  const minDateStr = new Date(Date.now() + 86400000)
    .toISOString()
    .split("T")[0];

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#eee8dc]">
        <div className="relative flex h-24 w-24 items-center justify-center border border-[#14263d]/20">
          <div className="absolute inset-3 border border-[#14263d]/10" />

          <Loader2 className="relative z-10 h-8 w-8 animate-spin text-[#ff5f49]" />
        </div>
      </div>
    );
  }

  if (!experience) return null;

  const mainImage =
    experience.images?.length > 0
      ? experience.images[0]
      : "/placeholder.jpg";

  const renderWidgetForm = () => (
    <div className="sticky top-28 overflow-hidden border border-[#14263d]/20 bg-[#14263d] text-white shadow-[18px_18px_0_rgba(20,38,61,0.1)]">
      {/* Cabecera del panel */}
      <div className="relative overflow-hidden border-b border-white/15 px-6 py-7 lg:px-8">
        <div className="pointer-events-none absolute -right-20 -top-24 h-60 w-60 rounded-full border border-white/10">
          <div className="absolute inset-12 rounded-full border border-white/10" />
          <div className="absolute inset-24 rounded-full border border-[#ff5f49]/30" />
        </div>

        <div className="relative z-10">
          <div className="mb-7 flex items-center justify-between">
            <span className="font-mono text-[8px] font-bold uppercase tracking-[0.28em] text-[#ff7764]">
              Booking Manifest
            </span>

            <span className="font-mono text-[8px] text-white/30">
              MAP—{String(experience.id).padStart(2, "0")}
            </span>
          </div>

          <span className="mb-3 block text-[8px] font-bold uppercase tracking-[0.28em] text-white/35">
            <T>Valor de Inversión</T>
          </span>

          <div className="flex flex-wrap items-end gap-x-3 gap-y-1">
            <span className="break-words text-3xl font-black tracking-[-0.04em] text-white sm:text-4xl">
              {formatPrice(experience.price)}
            </span>

            <span className="pb-1 text-[8px] font-bold uppercase tracking-[0.2em] text-white/40">
              <T>p/p</T>
            </span>
          </div>
        </div>
      </div>

      {/* Controles */}
      <div className="px-6 py-8 lg:px-8">
        <div className="space-y-7">
          {isPersonalized && (
            <div className="animate-fade-in">
              <div className="mb-3 flex items-center justify-between">
                <label className="text-[8px] font-bold uppercase tracking-[0.24em] text-white/40">
                  <T>Destino Deseado</T>
                </label>

                <span className="font-mono text-[8px] text-[#ff7764]">
                  01A
                </span>
              </div>

              <Input
                type="text"
                name="customDestination"
                value={customDestination}
                onChange={(e) => setCustomDestination(e.target.value)}
                placeholder={phDestino}
                autoComplete="off"
                className="h-14 rounded-none border border-white/20 bg-white/[0.06] px-4 font-semibold text-white shadow-none placeholder:text-white/25 focus-visible:border-[#ff5f49] focus-visible:ring-0"
              />
            </div>
          )}

          <div>
            <div className="mb-3 flex items-center justify-between">
              <label className="text-[8px] font-bold uppercase tracking-[0.24em] text-white/40">
                <T>Fecha de Inicio</T>
              </label>

              <span className="font-mono text-[8px] text-[#ff7764]">
                {isPersonalized ? "01B" : "01A"}
              </span>
            </div>

            <Input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={minDateStr}
              className="h-14 rounded-none border border-white/20 bg-white/[0.06] px-4 font-semibold text-white shadow-none [color-scheme:dark] focus-visible:border-[#ff5f49] focus-visible:ring-0"
            />
          </div>

          <div>
            <div className="mb-3 flex items-center justify-between">
              <label className="text-[8px] font-bold uppercase tracking-[0.24em] text-white/40">
                <T>Viajeros</T>
              </label>

              <span className="font-mono text-[8px] text-[#ff7764]">
                {isPersonalized ? "01C" : "01B"}
              </span>
            </div>

            <div className="grid h-14 grid-cols-[54px_1fr_54px] border border-white/20 bg-white/[0.06]">
              <button
                className="flex items-center justify-center border-r border-white/15 text-white/65 transition-colors hover:bg-white hover:text-[#14263d]"
                onClick={() => setPeople(Math.max(1, people - 1))}
                aria-label="Restar viajero"
              >
                <Minus className="h-4 w-4" />
              </button>

              <span className="flex items-center justify-center font-mono text-lg font-black text-white">
                {String(people).padStart(2, "0")}
              </span>

              <button
                className="flex items-center justify-center border-l border-white/15 text-white/65 transition-colors hover:bg-[#ff5f49] hover:text-white"
                onClick={() => setPeople(people + 1)}
                aria-label="Agregar viajero"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <Button
          className="group mt-8 h-16 w-full rounded-none border border-[#ff5f49] bg-[#ff5f49] px-6 text-[9px] font-black uppercase tracking-[0.22em] text-white shadow-none transition-all duration-300 hover:bg-white hover:text-[#14263d] disabled:cursor-not-allowed disabled:opacity-40"
          onClick={handleAddToCart}
          disabled={
            !selectedDate ||
            isAdding ||
            (isPersonalized && !customDestination.trim())
          }
        >
          {isAdding && (
            <Loader2 className="mr-3 h-5 w-5 animate-spin" />
          )}

          {isAdding ? (
            <T>Integrando...</T>
          ) : (
            <T>Añadir al Carrito</T>
          )}

          {!isAdding && (
            <ArrowRight className="ml-3 h-4 w-4 transition-transform duration-300 group-hover:translate-x-2" />
          )}
        </Button>

        <div className="mt-8 flex items-center justify-between border-t border-white/15 pt-4">
          <span className="font-mono text-[7px] uppercase tracking-[0.22em] text-white/25">
            Mapira secure selection
          </span>

          <span className="h-2 w-2 rounded-full bg-[#ff5f49]" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen flex-col bg-[#eee8dc] text-[#14263d] selection:bg-[#ff5f49]/25">
      <Header />

      <main className="relative flex-1 overflow-hidden pb-24 pt-32 lg:pb-32 lg:pt-36">
        {/* Retícula de fondo */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.045]">
          <div className="absolute left-[10%] top-0 h-full w-px bg-[#14263d]" />
          <div className="absolute left-[35%] top-0 h-full w-px bg-[#14263d]" />
          <div className="absolute left-[60%] top-0 h-full w-px bg-[#14263d]" />
          <div className="absolute left-[85%] top-0 h-full w-px bg-[#14263d]" />

          <div className="absolute left-0 top-[18%] h-px w-full bg-[#14263d]" />
          <div className="absolute left-0 top-[48%] h-px w-full bg-[#14263d]" />
          <div className="absolute left-0 top-[78%] h-px w-full bg-[#14263d]" />
        </div>

        <div className="relative z-10 mx-auto max-w-screen-2xl px-6 lg:px-12">
          {/* Identificador superior */}
          <div className="mb-8 flex items-center justify-between border-b border-[#14263d]/20 pb-5">
            <div className="flex items-center gap-4">
              <span className="h-2 w-2 bg-[#ff5f49]" />

              <span className="text-[9px] font-bold uppercase tracking-[0.34em] text-[#14263d]/50">
                Experience Atlas
              </span>
            </div>

            <span className="hidden font-mono text-[9px] uppercase tracking-[0.22em] text-[#14263d]/35 md:block">
              Mapira / Route Detail
            </span>
          </div>

          <div className="grid items-start gap-10 xl:grid-cols-[minmax(0,1fr)_390px] xl:gap-12">
            {/* Contenido */}
            <div className="min-w-0">
              {/* Cabecera */}
              <section className="mb-10 border-b border-[#14263d]/20 pb-10">
                <div className="mb-6 flex flex-wrap items-center justify-between gap-5">
                  <div className="flex items-center gap-3">
                    <span className="h-px w-8 bg-[#ff5f49]" />

                    <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#ff5f49]">
                      <T>{experience.plan_type}</T>
                    </span>
                  </div>

                  <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-[#14263d]/30">
                    EXP—{String(experience.id).padStart(3, "0")}
                  </span>
                </div>

                <h1 className="max-w-5xl text-5xl font-black uppercase leading-[0.86] tracking-[-0.055em] text-[#14263d] sm:text-6xl md:text-7xl lg:text-8xl">
                  <T>{experience.title}</T>
                </h1>

                <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4 border-l-2 border-[#ff5f49] pl-5">
                  <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.1em] text-[#14263d]/55">
                    <MapPin
                      className="h-4 w-4 text-[#ff5f49]"
                      strokeWidth={1.6}
                    />

                    {isPersonalized && customDestination ? (
                      customDestination
                    ) : (
                      <T>{experience.destination}</T>
                    )}
                  </div>

                  {experience.logistics?.duracion_estimada && (
                    <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.1em] text-[#14263d]/55">
                      <Clock
                        className="h-4 w-4 text-[#ff5f49]"
                        strokeWidth={1.6}
                      />

                      <T>{experience.logistics.duracion_estimada}</T>
                    </div>
                  )}
                </div>
              </section>

              {/* Imagen principal */}
              <section className="relative overflow-hidden border border-[#14263d]/20 bg-[#d7cfc1]">
                <div className="relative aspect-[4/3] w-full overflow-hidden lg:aspect-[16/10]">
                  <img
                    src={mainImage}
                    alt={experience.title}
                    className="h-full w-full object-cover grayscale-[10%] transition-all duration-1000 hover:scale-105 hover:grayscale-0"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#14263d]/50 via-transparent to-transparent" />

                  <div className="absolute left-0 top-0 bg-[#ff5f49] px-4 py-3 font-mono text-[8px] font-bold uppercase tracking-[0.2em] text-white">
                    Selected Route
                  </div>

                  <div className="absolute bottom-5 right-5 border border-white/30 bg-[#14263d]/45 px-4 py-3 backdrop-blur-md">
                    <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/75">
                      MX / MAPIRA
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-[#14263d]/15 bg-[#e8e1d4] px-5 py-4">
                  <span className="font-mono text-[8px] uppercase tracking-[0.22em] text-[#14263d]/35">
                    Route documentation
                  </span>

                  <span className="font-mono text-[8px] uppercase tracking-[0.22em] text-[#ff5f49]">
                    Image 01
                  </span>
                </div>
              </section>

              {/* Widget móvil */}
              <div className="mt-10 w-full xl:hidden">
                {renderWidgetForm()}
              </div>

              {/* Descripción */}
              <section className="mt-12 grid border border-[#14263d]/20 bg-[#f4f0e7] md:grid-cols-[100px_minmax(0,1fr)]">
                <div className="border-b border-[#14263d]/15 px-6 py-6 md:border-b-0 md:border-r md:py-10">
                  <span className="font-mono text-sm font-bold text-[#ff5f49]">
                    01
                  </span>
                </div>

                <div className="px-6 py-8 sm:px-8 md:px-10 md:py-10">
                  <p className="whitespace-pre-wrap text-base font-medium leading-8 text-[#14263d]/70 md:text-lg md:leading-9">
                    <T>{experience.description}</T>
                  </p>
                </div>
              </section>

              {/* Ruta propuesta */}
              {experience.suggested_route &&
                experience.suggested_route.length > 0 && (
                  <section className="mt-12 border border-[#14263d]/20 bg-[#f4f0e7]">
                    <div className="flex items-center justify-between border-b border-[#14263d]/15 bg-[#e8e1d4] px-5 py-5 sm:px-7">
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center border border-[#14263d]/20">
                          <Sparkles
                            className="h-4 w-4 text-[#ff5f49]"
                            strokeWidth={1.6}
                          />
                        </div>

                        <h2 className="text-xl font-black uppercase tracking-[-0.02em] text-[#14263d] md:text-2xl">
                          <T>Ruta Propuesta</T>
                        </h2>
                      </div>

                      <span className="font-mono text-[8px] text-[#14263d]/30">
                        {String(
                          experience.suggested_route.length
                        ).padStart(2, "0")}{" "}
                        POINTS
                      </span>
                    </div>

                    <div>
                      {experience.suggested_route.map((step, i) => (
                        <div
                          key={i}
                          className="group grid grid-cols-[65px_minmax(0,1fr)] border-b border-[#14263d]/15 last:border-b-0 sm:grid-cols-[90px_minmax(0,1fr)]"
                        >
                          <div className="flex justify-center border-r border-[#14263d]/15 px-3 py-7">
                            <span className="font-mono text-[10px] font-bold text-[#ff5f49]">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                          </div>

                          <div className="px-5 py-7 transition-colors duration-300 group-hover:bg-[#ebe4d8] sm:px-8">
                            <p className="text-sm font-medium leading-relaxed text-[#14263d]/70 md:text-base">
                              <T>{step}</T>
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

              {/* Incluye y no incluye */}
              <section className="mt-12 grid border-l border-t border-[#14263d]/20 sm:grid-cols-2">
                {experience.included &&
                  experience.included.length > 0 && (
                    <div className="border-b border-r border-[#14263d]/20 bg-[#f4f0e7]">
                      <div className="border-b border-[#14263d]/15 bg-[#e8e1d4] px-6 py-5">
                        <h3 className="text-[9px] font-black uppercase tracking-[0.24em] text-[#14263d]">
                          <T>Privilegios Incluidos</T>
                        </h3>
                      </div>

                      <ul>
                        {experience.included.map((inc, i) => (
                          <li
                            key={i}
                            className="grid grid-cols-[46px_1fr] border-b border-[#14263d]/10 last:border-b-0"
                          >
                            <div className="flex justify-center border-r border-[#14263d]/10 px-2 py-5">
                              <Check
                                className="h-4 w-4 text-[#ff5f49]"
                                strokeWidth={1.7}
                              />
                            </div>

                            <span className="px-5 py-5 text-sm font-medium leading-relaxed text-[#14263d]/68">
                              <T>{inc}</T>
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                {experience.logistics?.no_incluye &&
                  experience.logistics.no_incluye.length > 0 && (
                    <div className="border-b border-r border-[#14263d]/20 bg-[#f4f0e7]">
                      <div className="border-b border-[#14263d]/15 bg-[#e8e1d4] px-6 py-5">
                        <h3 className="text-[9px] font-black uppercase tracking-[0.24em] text-[#14263d]">
                          <T>Consideraciones</T>
                        </h3>
                      </div>

                      <ul>
                        {experience.logistics.no_incluye.map(
                          (noInc, i) => (
                            <li
                              key={i}
                              className="grid grid-cols-[46px_1fr] border-b border-[#14263d]/10 last:border-b-0"
                            >
                              <div className="flex justify-center border-r border-[#14263d]/10 px-2 py-5">
                                <Minus
                                  className="h-4 w-4 text-[#14263d]/35"
                                  strokeWidth={1.7}
                                />
                              </div>

                              <span className="px-5 py-5 text-sm font-medium leading-relaxed text-[#14263d]/55">
                                <T>{noInc}</T>
                              </span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
              </section>
            </div>

            {/* Widget desktop */}
            <aside className="hidden w-full xl:block">
              {renderWidgetForm()}
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}