"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { T } from "@/components/T";
import { useT } from "@/hooks/useT";
import { useCart } from "@/context/CartContext";
import {
  ArrowRight,
  FileText,
  User,
  Mail,
  Calendar,
  ShieldCheck,
} from "lucide-react";

export default function PagoFolioPage() {
  const router = useRouter();
  const locale = useLocale();
  const { addToCart } = useCart();

  // Estados
  const [monto, setMonto] = useState("");
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [folio, setFolio] = useState("");
  const [fecha, setFecha] = useState("");

  const btnConfirmar = useT("Añadir al Carrito");

  const handleMontoChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const val = e.target.value.replace(/[^0-9.]/g, "");
    setMonto(val);
  };

  const isFormValid =
    parseFloat(monto) > 0 &&
    nombre.trim().length > 0 &&
    email.includes("@") &&
    folio.trim().length > 0 &&
    fecha !== "";

  const handleConfirmarReserva = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid) return;

    const montoNumerico = parseFloat(monto);

    const customExperienceItem = {
      activityId: 0,
      experience: {
        id: 0,
        title: "Diseño de Ruta a la Medida",
        slug: "ruta-a-la-medida",
        plan_type: "Personalizada",
        destination: "Múltiples Destinos",
        price: montoNumerico,
        currency: "MXN",
        tax_included: true,
        description: `Pago asociado al folio de concierge: ${folio}`,
        suggested_route: [],
        included: [
          "Itinerario personalizado",
          "Gestión de Concierge",
          "Soporte 24/7",
        ],
        logistics: {},
        category_id: 0,
        images: [
          "https://images.pexels.com/photos/7709272/pexels-photo-7709272.jpeg",
        ],
      },
      date: fecha,
      people: 1,
      pricePerPerson: montoNumerico,
      totalPrice: montoNumerico,
    };

    addToCart(customExperienceItem);

    sessionStorage.setItem(
      "mapira_temp_contact",
      JSON.stringify({
        nombre,
        email,
        folio,
      })
    );

    router.push(`/${locale}/carrito`);
  };

  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);
  const minDateStr = minDate.toISOString().split("T")[0];

  const inputClass =
    "h-14 w-full rounded-none border-0 border-b border-[#14263d]/25 bg-transparent px-0 text-base font-semibold text-[#14263d] shadow-none transition-colors placeholder:text-[#14263d]/25 focus-visible:border-[#ff5f49] focus-visible:ring-0";

  const labelClass =
    "mb-3 block text-[9px] font-bold uppercase tracking-[0.24em] text-[#14263d]/45 transition-colors group-focus-within:text-[#ff5f49]";

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
        <div className="pointer-events-none absolute -right-56 top-16 hidden h-[36rem] w-[36rem] rounded-full border border-[#14263d]/10 xl:block">
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
                <T>Servicios Privados</T>
              </span>
            </div>

            <span className="hidden font-mono text-[9px] uppercase tracking-[0.22em] text-[#14263d]/35 md:block">
              Mapira / Folio Payment
            </span>
          </div>

          {/* Cabecera editorial */}
          <section className="mb-12 grid items-end gap-10 border-b border-[#14263d]/20 pb-12 lg:grid-cols-[1fr_380px]">
            <div>
              <p className="mb-5 font-mono text-[9px] font-bold uppercase tracking-[0.27em] text-[#ff5f49]">
                Private route settlement
              </p>

              <h1 className="max-w-5xl text-5xl font-black uppercase leading-[0.84] tracking-[-0.06em] text-[#14263d] sm:text-6xl md:text-7xl lg:text-8xl">
                <T>Liquidación de</T>

                <span className="mt-2 block text-[#ff5f49]">
                  <T>Folio.</T>
                </span>
              </h1>
            </div>

            <div className="border-l-2 border-[#ff5f49] pl-5">
              <p className="text-sm font-medium leading-relaxed text-[#14263d]/60 md:text-base">
                <T>
                  Procesamiento seguro para itinerarios a la medida y servicios
                  privados de Mapira. Ingresa los datos de tu folio asignado
                  para continuar al checkout.
                </T>
              </p>

              <div className="mt-6 flex items-center justify-between border-t border-[#14263d]/15 pt-4">
                <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-[#14263d]/35">
                  Payment status
                </span>

                <span className="font-mono text-[8px] font-bold uppercase tracking-[0.2em] text-[#ff5f49]">
                  Secure
                </span>
              </div>
            </div>
          </section>

          {/* Formulario */}
          <section className="grid border border-[#14263d]/20 bg-[#f4f0e7] lg:grid-cols-[320px_minmax(0,1fr)] xl:grid-cols-[370px_minmax(0,1fr)]">
            {/* Panel lateral */}
            <aside className="relative overflow-hidden bg-[#14263d] px-6 py-10 text-white sm:px-8 lg:min-h-[720px] lg:px-9 lg:py-12">
              <div className="pointer-events-none absolute -left-36 -top-36 h-[28rem] w-[28rem] rounded-full border border-white/10">
                <div className="absolute inset-16 rounded-full border border-white/10" />
                <div className="absolute inset-32 rounded-full border border-[#ff5f49]/25" />
              </div>

              <div className="pointer-events-none absolute -bottom-8 -left-3 text-[11rem] font-black uppercase leading-none tracking-[-0.09em] text-white/[0.025]">
                F
              </div>

              <div className="relative z-10 flex h-full flex-col justify-between">
                <div>
                  <div className="mb-10 flex items-center justify-between">
                    <span className="font-mono text-[8px] uppercase tracking-[0.24em] text-[#ff7561]">
                      Secure operation
                    </span>

                    <span className="font-mono text-[8px] text-white/30">
                      FOL—01
                    </span>
                  </div>

                  <div className="flex h-16 w-16 items-center justify-center border border-[#ff5f49] bg-[#ff5f49]/10">
                    <ShieldCheck
                      className="h-7 w-7 text-[#ff7561]"
                      strokeWidth={1.4}
                    />
                  </div>

                  <h2 className="mt-8 text-3xl font-black uppercase leading-[0.9] tracking-[-0.035em] text-white">
                    <T>Detalles de la Operación</T>
                  </h2>

                  <p className="mt-6 text-sm font-medium leading-relaxed text-white/55">
                    <T>
                      Tus datos están protegidos y encriptados de extremo a
                      extremo.
                    </T>
                  </p>
                </div>

                <div className="mt-14">
                  <div className="grid grid-cols-2 gap-px bg-white/15">
                    <div className="bg-[#14263d] p-4">
                      <p className="mb-2 text-[7px] font-bold uppercase tracking-[0.22em] text-white/30">
                        Moneda
                      </p>

                      <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/70">
                        MXN
                      </p>
                    </div>

                    <div className="bg-[#14263d] p-4">
                      <p className="mb-2 text-[7px] font-bold uppercase tracking-[0.22em] text-white/30">
                        Impuestos
                      </p>

                      <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/70">
                        IVA incluido
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 flex items-center justify-between border-t border-white/15 pt-4">
                    <span className="font-mono text-[7px] uppercase tracking-[0.22em] text-white/30">
                      Mapira payment desk
                    </span>

                    <span className="h-2 w-2 rounded-full bg-[#ff5f49]" />
                  </div>
                </div>
              </div>
            </aside>

            {/* Contenido del formulario */}
            <div>
              <div className="flex items-center justify-between border-b border-[#14263d]/20 bg-[#e8e1d4] px-6 py-5 sm:px-8 lg:px-10">
                <div>
                  <p className="mb-1 text-[8px] font-bold uppercase tracking-[0.3em] text-[#ff5f49]">
                    Folio asignado
                  </p>

                  <p className="text-sm font-black uppercase tracking-[0.1em] text-[#14263d]">
                    Registro de liquidación
                  </p>
                </div>

                <span className="font-mono text-[9px] text-[#14263d]/30">
                  FORM—01
                </span>
              </div>

              <form
                onSubmit={handleConfirmarReserva}
                className="px-6 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-14"
              >
                {/* Monto */}
                <div className="relative overflow-hidden bg-[#14263d] px-6 py-8 text-white sm:px-8 sm:py-10">
                  <div className="pointer-events-none absolute -right-16 -top-20 opacity-[0.035]">
                    <FileText className="h-64 w-64" />
                  </div>

                  <div className="relative z-10">
                    <div className="mb-8 flex items-center justify-between">
                      <label className="text-[8px] font-bold uppercase tracking-[0.27em] text-white/40">
                        <T>Valor de Inversión (MXN + IVA)</T>
                      </label>

                      <span className="font-mono text-[8px] text-[#ff7561]">
                        AMOUNT—01
                      </span>
                    </div>

                    <div className="flex items-end gap-4 border-b border-white/20 pb-4 transition-colors focus-within:border-[#ff5f49]">
                      <span className="pb-1 text-4xl font-light text-white/25 sm:text-5xl">
                        $
                      </span>

                      <Input
                        type="text"
                        value={monto}
                        onChange={handleMontoChange}
                        placeholder="0.00"
                        required
                        className="h-auto min-w-0 rounded-none border-0 bg-transparent p-0 text-4xl font-black tracking-[-0.055em] text-white shadow-none placeholder:text-white/15 focus-visible:ring-0 sm:text-5xl md:text-6xl"
                      />
                    </div>

                    <div className="mt-5 flex items-center justify-between">
                      <span className="font-mono text-[7px] uppercase tracking-[0.2em] text-white/30">
                        Mexican pesos
                      </span>

                      <span className="font-mono text-[7px] uppercase tracking-[0.2em] text-white/30">
                        Tax included
                      </span>
                    </div>
                  </div>
                </div>

                {/* Datos */}
                <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2">
                  {/* Nombre */}
                  <div className="group">
                    <div className="flex items-center justify-between">
                      <label className={labelClass}>
                        <T>Nombre del Titular</T>
                      </label>

                      <span className="font-mono text-[8px] text-[#14263d]/25">
                        02A
                      </span>
                    </div>

                    <div className="relative">
                      <User
                        className="absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-[#14263d]/30 transition-colors group-focus-within:text-[#ff5f49]"
                        strokeWidth={1.5}
                      />

                      <Input
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                        placeholder="Nombre completo"
                        className={`${inputClass} pl-7`}
                      />
                    </div>
                  </div>

                  {/* Correo */}
                  <div className="group">
                    <div className="flex items-center justify-between">
                      <label className={labelClass}>
                        <T>Correo de Contacto</T>
                      </label>

                      <span className="font-mono text-[8px] text-[#14263d]/25">
                        02B
                      </span>
                    </div>

                    <div className="relative">
                      <Mail
                        className="absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-[#14263d]/30 transition-colors group-focus-within:text-[#ff5f49]"
                        strokeWidth={1.5}
                      />

                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="correo@ejemplo.com"
                        className={`${inputClass} pl-7`}
                      />
                    </div>
                  </div>

                  {/* Folio */}
                  <div className="group">
                    <div className="flex items-center justify-between">
                      <label className={labelClass}>
                        <T>Folio Asignado</T>
                      </label>

                      <span className="font-mono text-[8px] text-[#14263d]/25">
                        02C
                      </span>
                    </div>

                    <div className="relative">
                      <FileText
                        className="absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-[#14263d]/30 transition-colors group-focus-within:text-[#ff5f49]"
                        strokeWidth={1.5}
                      />

                      <Input
                        type="text"
                        value={folio}
                        onChange={(e) =>
                          setFolio(e.target.value.toUpperCase())
                        }
                        required
                        placeholder="Ej: MAP-001"
                        className={`${inputClass} pl-7 uppercase tracking-[0.15em]`}
                      />
                    </div>
                  </div>

                  {/* Fecha */}
                  <div className="group">
                    <div className="flex items-center justify-between">
                      <label className={labelClass}>
                        <T>Fecha de Inicio de Ruta</T>
                      </label>

                      <span className="font-mono text-[8px] text-[#14263d]/25">
                        02D
                      </span>
                    </div>

                    <div className="relative">
                      <Calendar
                        className="absolute left-0 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-[#14263d]/30 transition-colors group-focus-within:text-[#ff5f49]"
                        strokeWidth={1.5}
                      />

                      <Input
                        type="date"
                        value={fecha}
                        min={minDateStr}
                        onChange={(e) => setFecha(e.target.value)}
                        required
                        className={`${inputClass} pl-7`}
                      />
                    </div>
                  </div>
                </div>

                {/* Confirmación */}
                <div className="mt-12 flex flex-col gap-6 border-t border-[#14263d]/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="mb-2 text-[7px] font-bold uppercase tracking-[0.23em] text-[#14263d]/30">
                      Siguiente etapa
                    </p>

                    <p className="max-w-sm text-xs font-medium leading-relaxed text-[#14263d]/50">
                      El folio se añadirá a tu carrito para continuar con la
                      autorización segura del pago.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={!isFormValid}
                    className="group flex h-16 w-full items-center justify-center gap-3 border border-[#14263d] bg-[#14263d] px-8 text-white transition-all duration-300 hover:border-[#ff5f49] hover:bg-[#ff5f49] disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
                  >
                    <span className="text-[9px] font-bold uppercase tracking-[0.23em]">
                      {btnConfirmar}
                    </span>

                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-2" />
                  </button>
                </div>
              </form>

              <div className="flex items-center justify-between border-t border-[#14263d]/20 bg-[#e8e1d4] px-6 py-4 sm:px-8 lg:px-10">
                <span className="font-mono text-[7px] uppercase tracking-[0.22em] text-[#14263d]/35">
                  Secure folio processing
                </span>

                <span className="font-mono text-[7px] uppercase tracking-[0.22em] text-[#ff5f49]">
                  Mapira.mx
                </span>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}