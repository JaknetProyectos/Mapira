// app/[locale]/carrito/page.tsx
"use client";

import { T } from "@/components/T";
import { useLocale } from "next-intl";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import {
  Trash2,
  Minus,
  Plus,
  ShoppingBag,
  ArrowRight,
  Calendar,
  MapPin,
} from "lucide-react";

export default function CarritoPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const locale = useLocale();

  const formatPrice = (price: number) => {
    const formatter = new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
      minimumFractionDigits: 0,
    });

    return `${formatter.format(price)} MXN`;
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + "T00:00:00");

    return date.toLocaleDateString("es-MX", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#eee8dc] text-[#14263d] selection:bg-[#ff5f49]/25">
      <Header />

      <main className="relative flex-1 overflow-hidden pb-24 pt-32 lg:pb-32 lg:pt-36">
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

        {/* Coordenadas decorativas */}
        <div className="pointer-events-none absolute -right-56 top-20 hidden h-[34rem] w-[34rem] rounded-full border border-[#14263d]/10 xl:block">
          <div className="absolute inset-20 rounded-full border border-[#14263d]/10" />
          <div className="absolute inset-40 rounded-full border border-[#ff5f49]/20" />

          <span className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ff5f49]" />
        </div>

        <div className="relative z-10 mx-auto max-w-screen-2xl px-6 lg:px-12">
          {/* Identificador superior */}
          <div className="mb-8 flex items-center justify-between border-b border-[#14263d]/20 pb-5">
            <div className="flex items-center gap-4">
              <span className="h-2 w-2 bg-[#ff5f49]" />

              <span className="text-[9px] font-bold uppercase tracking-[0.34em] text-[#14263d]/50">
                <T>Tu Carrito</T>
              </span>
            </div>

            <span className="hidden font-mono text-[9px] uppercase tracking-[0.22em] text-[#14263d]/35 md:block">
              Mapira / Travel Manifest
            </span>
          </div>

          {/* Cabecera */}
          <div className="mb-12 grid items-end gap-8 border-b border-[#14263d]/20 pb-10 lg:grid-cols-[1fr_auto] lg:pb-12">
            <div>
              <p className="mb-4 font-mono text-[9px] font-bold uppercase tracking-[0.26em] text-[#ff5f49]">
                Expedición en preparación
              </p>

              <h1 className="max-w-5xl text-5xl font-black uppercase leading-[0.86] tracking-[-0.055em] text-[#14263d] sm:text-6xl md:text-7xl lg:text-8xl">
                <T>Selección</T>

                <span className="block text-[#ff5f49]">
                  <T>Actual.</T>
                </span>
              </h1>

              <div className="mt-7 flex items-center gap-4">
                <span className="h-px w-10 bg-[#14263d]/25" />

                <p className="text-sm font-semibold text-[#14263d]/55 md:text-base">
                  {cart.items.length}{" "}
                  {cart.items.length === 1 ? (
                    <T>experiencia</T>
                  ) : (
                    <T>experiencias</T>
                  )}{" "}
                  <T>en tu ruta.</T>
                </p>
              </div>
            </div>

            {cart.items.length > 0 && (
              <Button
                variant="ghost"
                onClick={clearCart}
                className="h-12 rounded-none border border-[#14263d]/20 bg-transparent px-5 text-[9px] font-bold uppercase tracking-[0.22em] text-[#14263d]/50 shadow-none transition-all hover:border-[#ff5f49] hover:bg-[#ff5f49] hover:text-white"
              >
                <Trash2 className="mr-3 h-4 w-4" />

                <T>Vaciar Carrito</T>
              </Button>
            )}
          </div>

          {cart.items.length === 0 ? (
            /* Estado vacío */
            <div className="grid min-h-[540px] border border-[#14263d]/20 bg-[#f4f0e7] lg:grid-cols-[0.8fr_1.2fr]">
              <div className="relative flex min-h-[280px] items-center justify-center overflow-hidden bg-[#14263d]">
                <div className="pointer-events-none absolute h-64 w-64 rounded-full border border-white/10">
                  <div className="absolute inset-12 rounded-full border border-white/10" />
                  <div className="absolute inset-24 rounded-full border border-[#ff5f49]/30" />
                </div>

                <div className="relative z-10 flex h-24 w-24 items-center justify-center border border-white/20">
                  <ShoppingBag
                    className="h-8 w-8 text-[#ff7662]"
                    strokeWidth={1.2}
                  />
                </div>
              </div>

              <div className="flex flex-col justify-center px-6 py-12 sm:px-10 lg:px-14">
                <p className="mb-5 font-mono text-[8px] font-bold uppercase tracking-[0.3em] text-[#ff5f49]">
                  Manifest / Empty
                </p>

                <h2 className="max-w-xl text-3xl font-black uppercase leading-[0.95] tracking-[-0.035em] text-[#14263d] sm:text-4xl lg:text-5xl">
                  <T>Tu ruta está en blanco</T>
                </h2>

                <p className="mt-6 max-w-lg text-sm font-medium leading-relaxed text-[#14263d]/60 md:text-base">
                  <T>
                    Explora nuestra colección y selecciona las experiencias que
                    definirán tu próximo viaje.
                  </T>
                </p>

                <Button
                  asChild
                  className="group mt-9 h-16 w-full rounded-none border border-[#14263d] bg-[#14263d] px-8 text-[9px] font-bold uppercase tracking-[0.24em] text-white shadow-none transition-all duration-300 hover:border-[#ff5f49] hover:bg-[#ff5f49] sm:w-fit"
                >
                  <Link href={`/${locale}/experiencias`}>
                    <T>Ir a la Colección</T>

                    <ArrowRight className="ml-4 h-4 w-4 transition-transform duration-300 group-hover:translate-x-2" />
                  </Link>
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid items-start gap-10 xl:grid-cols-[minmax(0,1fr)_390px] xl:gap-12">
              {/* Lista de experiencias */}
              <div className="border-l border-t border-[#14263d]/20">
                <div className="flex items-center justify-between border-b border-r border-[#14263d]/20 bg-[#e8e1d4] px-5 py-4 sm:px-6">
                  <span className="text-[8px] font-bold uppercase tracking-[0.3em] text-[#14263d]/45">
                    Registro de experiencias
                  </span>

                  <span className="font-mono text-[9px] text-[#ff5f49]">
                    {String(cart.items.length).padStart(2, "0")} ITEMS
                  </span>
                </div>

                {cart.items.map((item, index) => {
                  const itemImage =
                    item.experience.images &&
                    item.experience.images.length > 0
                      ? item.experience.images[0]
                      : "/placeholder.jpg";

                  return (
                    <article
                      key={`${item.activityId}-${item.date}`}
                      className="group border-b border-r border-[#14263d]/20 bg-[#f4f0e7] transition-colors duration-300 hover:bg-[#ebe4d8]"
                    >
                      <div className="grid sm:grid-cols-[210px_minmax(0,1fr)] lg:grid-cols-[240px_minmax(0,1fr)]">
                        {/* Imagen */}
                        <div className="relative min-h-[260px] overflow-hidden border-b border-[#14263d]/15 bg-[#d8d0c2] sm:min-h-[340px] sm:border-b-0 sm:border-r">
                          <img
                            src={itemImage}
                            alt={item.experience.title}
                            className="absolute inset-0 h-full w-full object-cover grayscale-[15%] transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                          />

                          <div className="absolute inset-0 bg-gradient-to-t from-[#14263d]/70 via-transparent to-[#14263d]/10" />

                          <span className="absolute left-0 top-0 bg-[#ff5f49] px-4 py-3 font-mono text-[9px] font-bold text-white">
                            {String(index + 1).padStart(2, "0")}
                          </span>

                          <div className="absolute bottom-5 left-5 right-5">
                            <p className="mb-2 text-[7px] font-bold uppercase tracking-[0.24em] text-white/55">
                              Destino
                            </p>

                            <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.1em] text-white">
                              <MapPin
                                className="h-3.5 w-3.5 text-[#ff7b68]"
                                strokeWidth={1.7}
                              />

                              {item.experience.destination}
                            </p>
                          </div>
                        </div>

                        {/* Información */}
                        <div className="flex min-w-0 flex-col">
                          <div className="flex items-start justify-between gap-5 border-b border-[#14263d]/15 px-5 py-5 sm:px-7">
                            <div>
                              <p className="mb-2 text-[7px] font-bold uppercase tracking-[0.26em] text-[#14263d]/35">
                                Categoría
                              </p>

                              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#ff5f49]">
                                <T>{item.experience.plan_type}</T>
                              </span>
                            </div>

                            <button
                              onClick={() =>
                                removeFromCart(item.activityId, item.date)
                              }
                              className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#14263d]/15 text-[#14263d]/35 transition-all duration-300 hover:border-[#ff5f49] hover:bg-[#ff5f49] hover:text-white"
                              aria-label="Eliminar experiencia"
                            >
                              <Trash2 className="h-4 w-4" strokeWidth={1.6} />
                            </button>
                          </div>

                          <div className="flex flex-1 flex-col px-5 py-7 sm:px-7 sm:py-8">
                            <h3 className="max-w-2xl text-2xl font-black uppercase leading-[0.95] tracking-[-0.03em] text-[#14263d] md:text-3xl">
                              <T>{item.experience.title}</T>
                            </h3>

                            <div className="mt-7 grid gap-px bg-[#14263d]/15 sm:grid-cols-2">
                              <div className="bg-[#f4f0e7] p-4 transition-colors group-hover:bg-[#ebe4d8]">
                                <p className="mb-2 text-[7px] font-bold uppercase tracking-[0.22em] text-[#14263d]/35">
                                  Fecha de salida
                                </p>

                                <span className="flex items-start gap-2 text-xs font-semibold capitalize leading-relaxed text-[#14263d]/65">
                                  <Calendar
                                    className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#ff5f49]"
                                    strokeWidth={1.7}
                                  />

                                  <T>{formatDate(item.date)}</T>
                                </span>
                              </div>

                              <div className="bg-[#f4f0e7] p-4 transition-colors group-hover:bg-[#ebe4d8]">
                                <p className="mb-2 text-[7px] font-bold uppercase tracking-[0.22em] text-[#14263d]/35">
                                  Precio unitario
                                </p>

                                <p className="font-mono text-xs font-bold text-[#14263d]/65">
                                  {formatPrice(item.pricePerPerson)}
                                </p>
                              </div>
                            </div>

                            <div className="mt-auto flex flex-col gap-6 border-t border-[#14263d]/15 pt-7 sm:flex-row sm:items-end sm:justify-between">
                              {/* Cantidad */}
                              <div>
                                <p className="mb-3 text-[7px] font-bold uppercase tracking-[0.24em] text-[#14263d]/35">
                                  Número de viajeros
                                </p>

                                <div className="inline-grid grid-cols-[44px_54px_44px] border border-[#14263d]/20">
                                  <button
                                    className="flex h-11 items-center justify-center border-r border-[#14263d]/20 text-[#14263d]/45 transition-colors hover:bg-[#14263d] hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                                    onClick={() =>
                                      updateQuantity(
                                        item.activityId,
                                        item.date,
                                        item.people - 1
                                      )
                                    }
                                    disabled={item.people <= 1}
                                    aria-label="Restar viajero"
                                  >
                                    <Minus className="h-4 w-4" />
                                  </button>

                                  <span className="flex h-11 items-center justify-center font-mono text-sm font-bold text-[#14263d]">
                                    {String(item.people).padStart(2, "0")}
                                  </span>

                                  <button
                                    className="flex h-11 items-center justify-center border-l border-[#14263d]/20 text-[#14263d]/45 transition-colors hover:bg-[#ff5f49] hover:text-white"
                                    onClick={() =>
                                      updateQuantity(
                                        item.activityId,
                                        item.date,
                                        item.people + 1
                                      )
                                    }
                                    aria-label="Agregar viajero"
                                  >
                                    <Plus className="h-4 w-4" />
                                  </button>
                                </div>
                              </div>

                              {/* Precio */}
                              <div className="sm:text-right">
                                <p className="mb-2 text-[7px] font-bold uppercase tracking-[0.24em] text-[#14263d]/35">
                                  Total de experiencia
                                </p>

                                <p className="text-xl font-black tracking-[-0.03em] text-[#14263d] md:text-2xl">
                                  {formatPrice(item.totalPrice)}
                                </p>

                                <p className="mt-1 text-[7px] font-bold uppercase tracking-[0.2em] text-[#14263d]/35">
                                  <T>IVA incluido</T>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>

              {/* Resumen */}
              <aside className="xl:sticky xl:top-28">
                <div className="overflow-hidden border border-[#14263d]/20 bg-[#14263d] text-white shadow-[18px_18px_0_rgba(20,38,61,0.1)]">
                  <div className="relative overflow-hidden border-b border-white/15 px-6 py-7">
                    <div className="pointer-events-none absolute -right-16 -top-20 h-52 w-52 rounded-full border border-white/10">
                      <div className="absolute inset-10 rounded-full border border-[#ff5f49]/25" />
                    </div>

                    <div className="relative z-10 flex items-start justify-between">
                      <div>
                        <p className="mb-3 font-mono text-[8px] font-bold uppercase tracking-[0.28em] text-[#ff7764]">
                          Travel manifest
                        </p>

                        <h2 className="max-w-[230px] text-2xl font-black uppercase leading-[0.95] tracking-[-0.025em]">
                          <T>Resumen del Carrito</T>
                        </h2>
                      </div>

                      <span className="font-mono text-[9px] text-white/30">
                        MX—01
                      </span>
                    </div>
                  </div>

                  <div className="px-6 py-7">
                    <div className="space-y-5">
                      <div className="flex items-center justify-between border-b border-white/10 pb-4">
                        <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/40">
                          <T>Subtotal</T>
                        </span>

                        <span className="font-mono text-xs font-bold text-white">
                          {formatPrice(cart.total)}
                        </span>
                      </div>

                      <div className="flex items-center justify-between border-b border-white/10 pb-4">
                        <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/40">
                          <T>IVA</T>
                        </span>

                        <span className="font-mono text-xs font-bold text-white">
                          <T>Incluido</T>
                        </span>
                      </div>

                      <div className="flex items-center justify-between border-b border-white/10 pb-4">
                        <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/40">
                          Experiencias
                        </span>

                        <span className="font-mono text-xs font-bold text-white">
                          {String(cart.items.length).padStart(2, "0")}
                        </span>
                      </div>
                    </div>

                    <div className="mt-8 border border-dashed border-white/20 p-5">
                      <p className="mb-3 text-[8px] font-bold uppercase tracking-[0.25em] text-white/35">
                        <T>Total a Pagar</T>
                      </p>

                      <span className="block break-words text-3xl font-black tracking-[-0.04em] text-[#ff705b]">
                        {formatPrice(cart.total)}
                      </span>
                    </div>

                    <Button
                      asChild
                      className="group mt-7 h-16 w-full rounded-none border border-[#ff5f49] bg-[#ff5f49] px-6 text-[9px] font-bold uppercase tracking-[0.24em] text-white shadow-none transition-all duration-300 hover:bg-white hover:text-[#14263d]"
                    >
                      <Link href={`/${locale}/checkout`}>
                        <T>Confirmar Ruta</T>

                        <ArrowRight className="ml-4 h-4 w-4 transition-transform duration-300 group-hover:translate-x-2" />
                      </Link>
                    </Button>
                  </div>

                  <div className="flex items-center justify-between border-t border-white/15 bg-white/[0.035] px-6 py-4">
                    <span className="font-mono text-[7px] uppercase tracking-[0.22em] text-white/30">
                      Mapira secure checkout
                    </span>

                    <span className="h-2 w-2 rounded-full bg-[#ff5f49]" />
                  </div>
                </div>
              </aside>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}