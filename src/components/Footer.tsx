"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";
import Link from "next/link";
import { T } from "@/components/T";

export function Footer() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [, startTransition] = useTransition();

  const handleLang = (lang: string) => {
    startTransition(() =>
      router.replace(
        pathname.replace(`/${locale}`, `/${lang}`) || `/${lang}`
      )
    );
  };

  return (
    <footer className="relative overflow-hidden bg-[#0d1b2b] text-white">
      {/* Retícula de fondo */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.07]">
        <div className="absolute left-[12%] top-0 h-full w-px bg-white" />
        <div className="absolute left-[38%] top-0 h-full w-px bg-white" />
        <div className="absolute left-[64%] top-0 h-full w-px bg-white" />
        <div className="absolute left-[88%] top-0 h-full w-px bg-white" />

        <div className="absolute left-0 top-[24%] h-px w-full bg-white" />
        <div className="absolute left-0 top-[58%] h-px w-full bg-white" />
        <div className="absolute left-0 top-[82%] h-px w-full bg-white" />
      </div>

      {/* Elemento circular cartográfico */}
      <div className="pointer-events-none absolute -bottom-64 -right-52 h-[38rem] w-[38rem] rounded-full border border-white/10">
        <div className="absolute inset-20 rounded-full border border-white/10" />
        <div className="absolute inset-40 rounded-full border border-[#ff6650]/25" />

        <span className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ff6650]" />
      </div>

      <div className="relative z-10 mx-auto max-w-screen-2xl px-6 pb-8 pt-16 lg:px-12 lg:pb-10 lg:pt-20">
        {/* Barra superior */}
        <div className="grid border border-white/15 lg:grid-cols-[1fr_auto]">
          {/* Navegación */}
          <nav className="border-b border-white/15 lg:border-b-0 lg:border-r">
            <ul className="grid sm:grid-cols-3">
              <li className="border-b border-white/15 sm:border-b-0 sm:border-r">
                <Link
                  href={`/${locale}/`}
                  className="group flex items-center justify-between px-5 py-5 transition-colors duration-300 hover:bg-white hover:text-[#0d1b2b]"
                >
                  <span className="text-[9px] font-bold uppercase tracking-[0.28em]">
                    <T>Inicio</T>
                  </span>

                  <span className="font-mono text-[9px] text-[#ff7865] transition-transform duration-300 group-hover:translate-x-1">
                    01 ↗
                  </span>
                </Link>
              </li>

              <li className="border-b border-white/15 sm:border-b-0 sm:border-r">
                <Link
                  href={`/${locale}/experiencias`}
                  className="group flex items-center justify-between px-5 py-5 transition-colors duration-300 hover:bg-white hover:text-[#0d1b2b]"
                >
                  <span className="text-[9px] font-bold uppercase tracking-[0.28em]">
                    <T>Catálogo</T>
                  </span>

                  <span className="font-mono text-[9px] text-[#ff7865] transition-transform duration-300 group-hover:translate-x-1">
                    02 ↗
                  </span>
                </Link>
              </li>

              <li>
                <Link
                  href={`/${locale}/#contacto`}
                  className="group flex items-center justify-between px-5 py-5 transition-colors duration-300 hover:bg-white hover:text-[#0d1b2b]"
                >
                  <span className="text-[9px] font-bold uppercase tracking-[0.28em]">
                    <T>Concierge</T>
                  </span>

                  <span className="font-mono text-[9px] text-[#ff7865] transition-transform duration-300 group-hover:translate-x-1">
                    03 ↗
                  </span>
                </Link>
              </li>
            </ul>
          </nav>

          {/* Selector de idioma */}
          <div className="flex items-center justify-between gap-7 px-5 py-5 lg:justify-start lg:px-8">
            <span className="text-[8px] font-bold uppercase tracking-[0.28em] text-white/35">
              <T>Idioma</T>
            </span>

            <div className="flex items-center gap-3">
              <button
                onClick={() => handleLang("es")}
                className={`relative px-2 py-1 font-mono text-[10px] font-bold transition-colors ${
                  locale === "es"
                    ? "bg-[#ff6650] text-white"
                    : "text-white/40 hover:text-white"
                }`}
              >
                ES
              </button>

              <span className="text-white/20">/</span>

              <button
                onClick={() => handleLang("en")}
                className={`relative px-2 py-1 font-mono text-[10px] font-bold transition-colors ${
                  locale === "en"
                    ? "bg-[#ff6650] text-white"
                    : "text-white/40 hover:text-white"
                }`}
              >
                EN
              </button>
            </div>
          </div>
        </div>

        {/* Wordmark principal */}
        <div className="relative border-x border-b border-white/15 px-4 py-14 sm:px-8 sm:py-16 lg:py-20">
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="h-2 w-2 bg-[#ff6650]" />

              <span className="font-mono text-[8px] uppercase tracking-[0.28em] text-white/35">
                Independent Travel Atlas
              </span>
            </div>

            <span className="hidden font-mono text-[8px] uppercase tracking-[0.24em] text-white/30 sm:block">
              México / 19.4326° N
            </span>
          </div>

          <h2 className="break-words text-[4.5rem] font-black uppercase leading-[0.72] tracking-[-0.08em] text-white sm:text-[7rem] md:text-[9rem] lg:text-[12rem] xl:text-[14rem]">
            Mapi
            <span className="text-[#ff6650]">ra</span>
          </h2>

          <div className="mt-8 flex flex-col gap-4 border-t border-white/15 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-lg text-sm font-medium leading-relaxed text-white/50">
              Diseñamos rutas personales para descubrir México desde nuevas
              coordenadas.
            </p>

            <a
              href="mailto:hola@mapira.mx"
              className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-white transition-colors hover:text-[#ff7865]"
            >
              hola@mapira.mx
            </a>
          </div>
        </div>

        {/* Información inferior */}
        <div className="grid border-x border-b border-white/15 md:grid-cols-2 xl:grid-cols-[1fr_1fr_1.15fr]">
          {/* Ubicación */}
          <div className="border-b border-white/15 p-6 md:border-r xl:border-b-0">
            <div className="mb-7 flex items-center justify-between">
              <p className="text-[8px] font-bold uppercase tracking-[0.3em] text-[#ff7865]">
                <T>Sede Central</T>
              </p>

              <span className="font-mono text-[8px] text-white/25">MX—01</span>
            </div>

            <p className="text-sm font-semibold leading-relaxed text-white/75">
              Ciudad de México, MX
            </p>

            <p className="mt-2 max-w-sm text-xs font-medium leading-relaxed text-white/40">
              Trazando nuevas maneras de explorar la esencia y diversidad de
              México.
            </p>
          </div>

          {/* Métodos de pago */}
<div className="border-b border-white/15 p-6 md:border-b-0 xl:border-r">
  <div className="mb-7 flex items-center justify-between">
    <p className="text-[8px] font-bold uppercase tracking-[0.3em] text-[#ff7865]">
      <T>Métodos Asegurados</T>
    </p>

    <span className="font-mono text-[8px] text-white/25">
      SEC—02
    </span>
  </div>

  <div className="flex flex-wrap items-center gap-3">
    {/* Visa */}
    <div className="flex h-14 min-w-[100px] items-center justify-center border border-white/15 bg-white px-5 transition-transform duration-300 hover:-translate-y-1">
      <svg
        viewBox="0 0 64 20"
        className="h-7 w-auto"
        aria-label="Visa"
        role="img"
      >
        <path
          fill="#1434CB"
          d="M25.5 19.6h-5.2L23.6.4h5.2l-3.3 19.2ZM44.4.9A13 13 0 0 0 39.7 0c-5.1 0-8.7 2.6-8.7 6.4 0 2.8 2.6 4.4 4.5 5.3 2 .9 2.7 1.5 2.7 2.3 0 1.2-1.6 1.8-3 1.8-2 0-3.1-.3-4.8-1l-.7-.3-.7 4.2c1.2.5 3.5 1 5.9 1 5.4 0 9-2.6 9-6.6 0-2.2-1.4-3.9-4.3-5.3-1.8-.9-2.9-1.4-2.9-2.3 0-.8.9-1.6 2.9-1.6a9 9 0 0 1 3.8.7l.5.2.5-3.9ZM57.8.4h-4c-1.2 0-2.2.4-2.7 1.6l-7.6 17.6h5.4l1.1-2.9h6.6l.6 2.9H62L57.8.4Zm-6.3 12.4 2.7-7.1 1.5 7.1h-4.2ZM16 .4 11 13.5l-.5-2.7C9.6 7.8 6.8 4.5 3.7 2.9l4.6 16.7h5.5L21.8.4H16Z"
        />
        <path
          fill="#F9A533"
          d="M6.7.4H-1.5l-.1.4C4.8 2.4 9 6.2 10.5 10.8L8.8 2C8.5.8 7.6.4 6.7.4Z"
        />
      </svg>
    </div>

    {/* Mastercard */}
    <div className="flex h-14 min-w-[100px] items-center justify-center border border-white/15 bg-white px-5 transition-transform duration-300 hover:-translate-y-1">
      <svg
        viewBox="0 0 60 38"
        className="h-8 w-auto"
        aria-label="Mastercard"
        role="img"
      >
        <circle cx="22" cy="19" r="15" fill="#EB001B" />
        <circle cx="38" cy="19" r="15" fill="#F79E1B" />
        <path
          fill="#FF5F00"
          d="M30 7.8A15 15 0 0 1 30 30.2a15 15 0 0 1 0-22.4Z"
        />
      </svg>
    </div>
  </div>

  <p className="mt-5 max-w-sm text-xs font-medium leading-relaxed text-white/40">
    Transacciones protegidas mediante cifrado de extremo a extremo.
  </p>
</div>

          {/* Legales */}
          <div className="p-6 md:col-span-2 xl:col-span-1">
            <div className="mb-7 flex items-center justify-between">
              <p className="text-[8px] font-bold uppercase tracking-[0.3em] text-[#ff7865]">
                Información legal
              </p>

              <span className="font-mono text-[8px] text-white/25">LEG—03</span>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-3">
              <Link
                href={`/${locale}/aviso-de-privacidad`}
                className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/55 transition-colors hover:text-white"
              >
                <T>Privacidad</T>
              </Link>

              <Link
                href={`/${locale}/terminos-y-condiciones`}
                className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/55 transition-colors hover:text-white"
              >
                <T>Términos</T>
              </Link>
            </div>

            <p className="mt-6 text-xs font-medium leading-relaxed text-white/35">
              © {new Date().getFullYear()} Mapira.{" "}
              <T>Todos los derechos reservados.</T>
            </p>
          </div>
        </div>

        {/* Barra de cierre */}
        <div className="flex flex-col gap-4 border-x border-b border-white/15 bg-white/[0.025] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-[#ff6650]" />

            <span className="font-mono text-[8px] uppercase tracking-[0.24em] text-white/30">
              Mapira Journey System
            </span>
          </div>

          <span className="font-mono text-[8px] uppercase tracking-[0.24em] text-white/25">
            MAPIRA.MX / MÉXICO
          </span>
        </div>
      </div>
    </footer>
  );
}