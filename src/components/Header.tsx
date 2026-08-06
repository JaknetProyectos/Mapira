"use client";

import { T } from "@/components/T";
import { useLocale } from "next-intl";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";

const navLinks = [
  { href: "/", label: <T>Inicio</T> },
  { href: "/nosotros", label: <T>Nosotros</T> },
  { href: "/experiencias", label: <T>Catálogo</T> },
  { href: "/#contacto", label: <T>Contacto</T> },
];

export function Header() {
  const locale = useLocale();
  const pathname = usePathname();
  const [showMiniCart, setShowMiniCart] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { cart, getItemCount } = useCart();
  const itemCount = getItemCount();

  // 1. Detectar si estamos exactamente en la página de inicio
  const isHome = pathname === `/${locale}` || pathname === `/${locale}/`;

  // 2. Escuchar el evento de scroll para cambiar el diseño al bajar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 3. Lógica dinámica de estilos
  // El header solo es transparente si estamos en el Home Y no hemos hecho scroll
  const isTransparent = isHome && !isScrolled;

  const headerBg = isTransparent
    ? "bg-transparent"
    : "bg-[#f4f0e7]/95 border-b border-[#14263d]/15 shadow-[0_10px_40px_rgba(20,38,61,0.08)] backdrop-blur-xl";

  const paddingClass = isTransparent
    ? "py-6 md:py-7"
    : "py-3.5 md:py-4";

  const logoTextColor = isTransparent
    ? "text-white"
    : "text-[#14263d]";

  const linkTextColor = isTransparent
    ? "text-white/80 hover:text-white"
    : "text-[#14263d]/60 hover:text-[#14263d]";

  const underlineColor = isTransparent
    ? "bg-[#ff7058]"
    : "bg-[#ff5f49]";

  const iconColor = isTransparent
    ? "text-white hover:text-[#ff8a76]"
    : "text-[#14263d] hover:text-[#ff5f49]";

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 ease-out ${headerBg} ${paddingClass}`}
    >
      <div className="mx-auto flex max-w-screen-2xl items-center justify-between px-5 md:px-10 xl:px-14">
        {/* Identidad Mapira */}
        <Link
          href={`/${locale}/`}
          className="group relative z-50 flex items-center gap-3"
        >
          <div
            className={`relative flex h-10 w-10 items-center justify-center border transition-all duration-300 ${
              isTransparent
                ? "border-white/60 bg-white/5"
                : "border-[#14263d] bg-[#14263d]"
            }`}
          >
            <span
              className={`absolute h-px w-5 rotate-45 ${
                isTransparent ? "bg-white" : "bg-[#f4f0e7]"
              }`}
            />

            <span
              className={`absolute h-px w-5 -rotate-45 ${
                isTransparent ? "bg-white" : "bg-[#f4f0e7]"
              }`}
            />

            <span className="relative z-10 h-2 w-2 rounded-full bg-[#ff5f49]" />
          </div>

          <div className="flex flex-col">
            <span
              className={`text-xl font-black uppercase leading-none tracking-[0.18em] transition-colors duration-300 md:text-2xl ${logoTextColor}`}
            >
              Mapira
            </span>

            <span
              className={`mt-1 text-[7px] font-semibold uppercase tracking-[0.34em] transition-colors duration-300 ${
                isTransparent
                  ? "text-white/55"
                  : "text-[#14263d]/45"
              }`}
            >
              Travel Atlas
            </span>
          </div>
        </Link>

        {/* Navegación Desktop */}
        <nav className="hidden items-center lg:flex">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              href={`/${locale}${link.href}`}
              className={`group relative border-l px-7 py-2 text-[10px] font-bold uppercase tracking-[0.25em] transition-colors duration-300 xl:px-9 ${
                isTransparent
                  ? "border-white/20"
                  : "border-[#14263d]/15"
              } ${linkTextColor}`}
            >
              <span className="relative z-10">{link.label}</span>

              <span
                className={`absolute bottom-0 left-7 h-[2px] w-0 transition-all duration-300 group-hover:w-[calc(100%-3.5rem)] xl:left-9 xl:group-hover:w-[calc(100%-4.5rem)] ${underlineColor}`}
              />
            </Link>
          ))}
        </nav>

        {/* Carrito y menú móvil */}
        <div className="relative z-50 flex items-center gap-2">
          <div
            className="relative"
            onMouseEnter={() => setShowMiniCart(true)}
            onMouseLeave={() => setShowMiniCart(false)}
          >
            <Link
              href={`/${locale}/carrito`}
              className={`relative flex h-11 w-11 items-center justify-center border transition-all duration-300 ${
                isTransparent
                  ? "border-white/30 hover:border-white"
                  : "border-[#14263d]/20 hover:border-[#ff5f49]"
              } ${iconColor}`}
            >
              <ShoppingBag
                className="h-[19px] w-[19px]"
                strokeWidth={1.6}
              />

              {itemCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center bg-[#ff5f49] px-1 text-[9px] font-black text-white shadow-lg">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Mini carrito */}
            {showMiniCart && (
              <div className="absolute right-0 top-full z-50 mt-4 w-[22rem] border border-[#14263d]/15 bg-[#f4f0e7] shadow-[18px_20px_0_rgba(20,38,61,0.12)] animate-reveal">
                <div className="relative overflow-hidden border-b border-[#14263d]/15 px-6 py-5">
                  <div className="absolute right-0 top-0 h-full w-20 opacity-[0.08]">
                    <div className="absolute left-0 top-0 h-full w-px bg-[#14263d]" />
                    <div className="absolute left-5 top-0 h-full w-px bg-[#14263d]" />
                    <div className="absolute left-10 top-0 h-full w-px bg-[#14263d]" />
                    <div className="absolute left-15 top-0 h-full w-px bg-[#14263d]" />
                  </div>

                  <p className="mb-1 text-[8px] font-bold uppercase tracking-[0.3em] text-[#ff5f49]">
                    Expedición activa
                  </p>

                  <h3 className="text-sm font-black uppercase tracking-[0.16em] text-[#14263d]">
                    <T>Tu Dossier</T>
                  </h3>
                </div>

                {cart.items.length === 0 ? (
                  <div className="flex flex-col items-start gap-5 px-6 py-9">
                    <div className="flex h-14 w-14 items-center justify-center border border-[#14263d]/20 bg-[#ebe5d9]">
                      <ShoppingBag
                        className="h-6 w-6 text-[#14263d]/35"
                        strokeWidth={1.2}
                      />
                    </div>

                    <div>
                      <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.25em] text-[#14263d]/35">
                        Coordenadas pendientes
                      </p>

                      <p className="max-w-[220px] text-sm font-semibold leading-relaxed text-[#14263d]/65">
                        <T>Aún no hay rutas seleccionadas</T>
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="max-h-72 overflow-y-auto">
                      {cart.items.slice(0, 3).map((item, index) => {
                        const miniImage =
                          item.experience.images &&
                          item.experience.images.length > 0
                            ? item.experience.images[0]
                            : "/placeholder.jpg";

                        return (
                          <div
                            key={`${item.activityId}-${item.date}`}
                            className="group grid grid-cols-[76px_1fr] gap-4 border-b border-[#14263d]/10 p-4 transition-colors duration-300 hover:bg-[#ebe5d9]"
                          >
                            <div className="relative h-[76px] overflow-hidden bg-[#ded7ca]">
                              <img
                                src={miniImage}
                                className="h-full w-full object-cover grayscale-[20%] transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
                                alt={item.experience.title}
                              />

                              <span className="absolute left-0 top-0 bg-[#ff5f49] px-2 py-1 text-[7px] font-black tracking-[0.2em] text-white">
                                0{index + 1}
                              </span>
                            </div>

                            <div className="flex min-w-0 flex-col justify-center">
                              <h4 className="truncate text-[13px] font-black uppercase tracking-[0.04em] text-[#14263d] transition-colors group-hover:text-[#ff5f49]">
                                <T>{item.experience.title}</T>
                              </h4>

                              <p className="mb-2 mt-1 text-[8px] font-bold uppercase tracking-[0.18em] text-[#14263d]/45">
                                {item.people}p ·{" "}
                                <T>{item.experience.plan_type}</T>
                              </p>

                              <p className="font-mono text-sm font-bold text-[#14263d]">
                                {formatPrice(item.totalPrice)}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="bg-[#14263d] p-4">
                      <Link
                        href={`/${locale}/carrito`}
                        className="group flex w-full items-center justify-between border border-white/25 px-5 py-4 text-[9px] font-bold uppercase tracking-[0.25em] text-white transition-all duration-300 hover:border-[#ff7058] hover:bg-[#ff5f49]"
                      >
                        <T>Finalizar Reserva</T>

                        <span className="transition-transform duration-300 group-hover:translate-x-1">
                          →
                        </span>
                      </Link>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Botón móvil */}
          <button
            className={`flex h-11 w-11 items-center justify-center border transition-all duration-300 lg:hidden ${
              isTransparent
                ? "border-white/30 hover:border-white"
                : "border-[#14263d]/20 hover:border-[#ff5f49]"
            } ${iconColor}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" strokeWidth={1.6} />
            ) : (
              <Menu className="h-5 w-5" strokeWidth={1.6} />
            )}
          </button>
        </div>
      </div>

      {/* Menú móvil */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 overflow-hidden bg-[#14263d] animate-fade-in">
          <div className="absolute inset-0 opacity-[0.08]">
            <div className="absolute left-[15%] top-0 h-full w-px bg-white" />
            <div className="absolute left-[40%] top-0 h-full w-px bg-white" />
            <div className="absolute left-[65%] top-0 h-full w-px bg-white" />
            <div className="absolute left-[90%] top-0 h-full w-px bg-white" />

            <div className="absolute left-0 top-[20%] h-px w-full bg-white" />
            <div className="absolute left-0 top-[45%] h-px w-full bg-white" />
            <div className="absolute left-0 top-[70%] h-px w-full bg-white" />
          </div>

          <div className="absolute -right-20 top-20 h-72 w-72 rounded-full border border-[#ff7058]/25" />
          <div className="absolute -right-10 top-30 h-52 w-52 rounded-full border border-[#ff7058]/20" />
          <div className="absolute right-10 top-40 h-28 w-28 rounded-full border border-[#ff7058]/15" />

          <div className="relative z-10 flex h-full flex-col justify-between px-6 pb-8 pt-24">
            <div>
              <p className="mb-8 text-[9px] font-bold uppercase tracking-[0.35em] text-[#ff7058]">
                Navigation index
              </p>

              <nav className="flex flex-col">
                {navLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={`/${locale}${link.href}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="group flex items-center justify-between border-t border-white/15 py-6 text-white"
                  >
                    <div className="flex items-center gap-5">
                      <span className="font-mono text-[9px] text-white/35">
                        0{index + 1}
                      </span>

                      <span className="text-2xl font-black uppercase tracking-[0.08em] transition-colors duration-300 group-hover:text-[#ff7058]">
                        {link.label}
                      </span>
                    </div>

                    <span className="text-xl text-[#ff7058] transition-transform duration-300 group-hover:translate-x-1">
                      ↗
                    </span>
                  </Link>
                ))}

                <div className="border-t border-white/15" />
              </nav>
            </div>

            <div className="flex items-end justify-between">
              <div>
                <p className="mb-2 text-[8px] font-bold uppercase tracking-[0.3em] text-white/35">
                  Contacto
                </p>

                <p className="text-sm font-semibold text-white">
                  hola@mapira.mx
                </p>
              </div>

              <div className="text-right">
                <p className="font-mono text-[9px] leading-relaxed text-white/35">
                  19.4326° N
                  <br />
                  99.1332° W
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => setMobileMenuOpen(false)}
            className="absolute right-6 top-7 z-20 flex h-11 w-11 items-center justify-center border border-white/25 text-white transition-colors hover:border-[#ff7058] hover:text-[#ff7058]"
            aria-label="Cerrar menú"
          >
            <X className="h-5 w-5" strokeWidth={1.6} />
          </button>
        </div>
      )}
    </header>
  );
}