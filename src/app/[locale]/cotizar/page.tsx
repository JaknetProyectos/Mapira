"use client";

import { useLocale } from "next-intl";
import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { T } from "@/components/T";
import { useT } from "@/hooks/useT";
import {
  Loader2,
  ArrowRight,
  MapPin,
  Calendar,
  Users,
  Wallet,
  MessageSquare,
  User,
  Sparkles,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

const BUDGET_OPTIONS = [
  "Menos de $10,000 MXN",
  "$10,000 - $25,000 MXN",
  "$25,000 - $50,000 MXN",
  "$50,000 - $100,000 MXN",
  "Más de $100,000 MXN",
];

function TranslatedOption({ value }: { value: string }) {
  const translatedText = useT(value);

  return (
    <option value={value} className="font-medium text-[#14263d]">
      {translatedText}
    </option>
  );
}

export default function CotizarPage() {
  const locale = useLocale();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState({
    destination: "",
    startDate: "",
    travelers: 2,
    budget: "",
    requirements: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const phDestination = useT("Ej: Oaxaca, Riviera Maya...");
  const phRequirements = useT(
    "¿Qué expectativas o experiencias tienes en mente?"
  );
  const phFirstName = useT("Nombre");
  const phLastName = useT("Apellidos");
  const phEmail = useT("Correo electrónico");
  const phPhone = useT("Teléfono de contacto");
  const phSelectRange = useT("Selecciona un rango estimado");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid) return;

    setIsSubmitting(true);

    try {
      const customer_name =
        `${formData.firstName} ${formData.lastName}`.trim();

      const { error: dbError } = await supabase
        .from("custom_quotes_mp")
        .insert([
          {
            customer_name: customer_name,
            customer_email: formData.email,
            phone: formData.phone,
            destination: formData.destination,
            start_date: formData.startDate,
            pax_qty: formData.travelers,
            budget: formData.budget,
            special_requests: formData.requirements,
            status: "pending",
          },
        ]);

      if (dbError) throw dbError;

      await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "QUOTE",
          locale: locale,
          email: formData.email,
          customerName: formData.firstName,
          destination: formData.destination,
          budget: formData.budget,
          startDate: formData.startDate,
          travelers: formData.travelers,
          message:
            formData.requirements ||
            "Solicitud de itinerario personalizado.",
        }),
      });

      setShowSuccess(true);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Error desconocido";

      alert(`Hubo un error: ${message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid =
    formData.destination &&
    formData.startDate &&
    formData.email &&
    formData.firstName &&
    formData.phone;

  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);
  const minDateStr = minDate.toISOString().split("T")[0];

  const inputClass =
    "h-14 w-full rounded-none border-0 border-b border-[#14263d]/25 bg-transparent px-0 text-base font-semibold text-[#14263d] shadow-none transition-colors placeholder:text-[#14263d]/25 focus-visible:border-[#ff5f49] focus-visible:ring-0";

  const labelClass =
    "mb-3 flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.24em] text-[#14263d]/45 transition-colors group-focus-within:text-[#ff5f49]";

  if (showSuccess) {
    return (
      <div className="flex min-h-screen flex-col bg-[#eee8dc] selection:bg-[#ff5f49]/25">
        <Header />

        <main className="relative flex flex-1 items-center justify-center overflow-hidden px-6 pb-24 pt-40">
          {/* Retícula */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.05]">
            <div className="absolute left-[20%] top-0 h-full w-px bg-[#14263d]" />
            <div className="absolute left-[50%] top-0 h-full w-px bg-[#14263d]" />
            <div className="absolute left-[80%] top-0 h-full w-px bg-[#14263d]" />

            <div className="absolute left-0 top-[30%] h-px w-full bg-[#14263d]" />
            <div className="absolute left-0 top-[70%] h-px w-full bg-[#14263d]" />
          </div>

          <div className="relative z-10 grid w-full max-w-5xl border border-[#14263d]/20 bg-[#f4f0e7] lg:grid-cols-[0.72fr_1.28fr]">
            {/* Confirmación gráfica */}
            <div className="relative flex min-h-[320px] items-center justify-center overflow-hidden bg-[#14263d]">
              <div className="pointer-events-none absolute h-72 w-72 rounded-full border border-white/10">
                <div className="absolute inset-12 rounded-full border border-white/10" />
                <div className="absolute inset-24 rounded-full border border-[#ff5f49]/30" />
              </div>

              <div className="relative z-10 flex h-24 w-24 items-center justify-center border border-[#ff705d] bg-[#ff5f49]/10">
                <Sparkles
                  className="h-10 w-10 text-[#ff705d]"
                  strokeWidth={1.4}
                />
              </div>

              <span className="absolute bottom-7 left-7 font-mono text-[8px] uppercase tracking-[0.24em] text-white/30">
                Request / Received
              </span>
            </div>

            {/* Mensaje */}
            <div className="px-7 py-12 sm:px-12 lg:px-14 lg:py-16">
              <p className="mb-5 font-mono text-[8px] font-bold uppercase tracking-[0.3em] text-[#ff5f49]">
                Route Brief / Confirmed
              </p>

              <h1 className="text-4xl font-black uppercase leading-[0.9] tracking-[-0.04em] text-[#14263d] sm:text-5xl">
                <T>¡Visión Recibida!</T>
              </h1>

              <p className="mt-7 max-w-2xl text-base font-medium leading-relaxed text-[#14263d]/60 md:text-lg">
                <T>Hola</T>{" "}
                <strong className="font-black text-[#14263d]">
                  {formData.firstName}
                </strong>
                , <T>hemos enviado un correo a</T>{" "}
                <strong className="font-black text-[#14263d]">
                  {formData.email}
                </strong>{" "}
                <T>
                  confirmando tu solicitud. Nuestro equipo de diseño de rutas
                  ya está trabajando en tu itinerario.
                </T>
              </p>

              <Link
                href={`/${locale}/`}
                className="group mt-10 inline-flex h-16 w-full items-center justify-center border border-[#14263d] bg-[#14263d] px-8 text-[9px] font-bold uppercase tracking-[0.24em] text-white transition-all duration-300 hover:border-[#ff5f49] hover:bg-[#ff5f49] sm:w-auto"
              >
                <T>Volver al Inicio</T>

                <ArrowRight className="ml-4 h-4 w-4 transition-transform duration-300 group-hover:translate-x-2" />
              </Link>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

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

        {/* Círculos decorativos */}
        <div className="pointer-events-none absolute -right-60 top-16 hidden h-[38rem] w-[38rem] rounded-full border border-[#14263d]/10 xl:block">
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
                <T>Diseño de Ruta</T>
              </span>
            </div>

            <span className="hidden font-mono text-[9px] uppercase tracking-[0.22em] text-[#14263d]/35 md:block">
              Mapira / Expedition Brief
            </span>
          </div>

          {/* Cabecera editorial */}
          <section className="mb-12 grid items-end gap-10 border-b border-[#14263d]/20 pb-12 lg:grid-cols-[1fr_360px]">
            <div>
              <p className="mb-5 font-mono text-[9px] font-bold uppercase tracking-[0.27em] text-[#ff5f49]">
                <T>Itinerario personalizado</T>
              </p>

              <h1 className="max-w-5xl text-5xl font-black uppercase leading-[0.84] tracking-[-0.06em] text-[#14263d] sm:text-6xl md:text-7xl lg:text-8xl">
                <T>Crea tu viaje</T>

                <span className="mt-2 block text-[#ff5f49]">
                  <T>a la medida.</T>
                </span>
              </h1>
            </div>

            <div className="border-l-2 border-[#ff5f49] pl-5">
              <p className="text-sm font-medium leading-relaxed text-[#14263d]/60 md:text-base">
                <T>
                  Cuéntanos cómo imaginas tu viaje. Nuestros especialistas
                  diseñarán una ruta única en la que cada decisión responda a
                  tu estilo, sin paquetes repetidos ni procesos complicados.
                </T>
              </p>

              <div className="mt-6 flex items-center justify-between border-t border-[#14263d]/15 pt-4">
                <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-[#14263d]/35">
                  <T>Tiempo de respuesta</T>
                </span>

                <span className="font-mono text-[8px] font-bold uppercase tracking-[0.2em] text-[#ff5f49]">
                  &lt; 24 <T>Horas</T>
                </span>
              </div>
            </div>
          </section>

          <form
            onSubmit={handleSubmit}
            className="grid items-start gap-10 xl:grid-cols-[minmax(0,1fr)_390px] xl:gap-12"
          >
            {/* Contenido principal */}
            <div className="border-l border-t border-[#14263d]/20">
              {/* Proyección de la ruta */}
              <section className="border-b border-r border-[#14263d]/20 bg-[#f4f0e7]">
                <div className="flex items-center justify-between border-b border-[#14263d]/15 bg-[#e8e1d4] px-5 py-5 sm:px-7">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center border border-[#14263d]/20">
                      <MapPin
                        className="h-4 w-4 text-[#ff5f49]"
                        strokeWidth={1.6}
                      />
                    </div>

                    <div>
                      <p className="mb-1 font-mono text-[8px] uppercase tracking-[0.25em] text-[#ff5f49]">
                        <T>Etapa</T> 01
                      </p>

                      <h2 className="text-lg font-black uppercase tracking-[-0.01em] text-[#14263d] sm:text-xl">
                        <T>Proyección de la Ruta</T>
                      </h2>
                    </div>
                  </div>

                  <span className="font-mono text-[9px] text-[#14263d]/30">
                    <T>RUTA</T>-01
                  </span>
                </div>

                <div className="grid gap-x-10 gap-y-10 px-6 py-10 md:grid-cols-2 sm:px-8 lg:px-10 lg:py-12">
                  {/* Destino */}
                  <div className="group md:col-span-2">
                    <div className="flex items-center justify-between">
                      <label className={labelClass}>
                        <MapPin
                          className="h-3.5 w-3.5 text-[#ff5f49]"
                          strokeWidth={1.6}
                        />

                        <T>¿A dónde deseas viajar? *</T>
                      </label>

                      <span className="font-mono text-[8px] text-[#14263d]/25">
                        01A
                      </span>
                    </div>

                    <Input
                      value={formData.destination}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          destination: e.target.value,
                        })
                      }
                      placeholder={phDestination}
                      required
                      className={inputClass}
                    />
                  </div>

                  {/* Fecha */}
                  <div className="group">
                    <div className="flex items-center justify-between">
                      <label className={labelClass}>
                        <Calendar
                          className="h-3.5 w-3.5 text-[#ff5f49]"
                          strokeWidth={1.6}
                        />

                        <T>Fecha de Inicio *</T>
                      </label>

                      <span className="font-mono text-[8px] text-[#14263d]/25">
                        01B
                      </span>
                    </div>

                    <Input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          startDate: e.target.value,
                        })
                      }
                      min={minDateStr}
                      required
                      className={inputClass}
                    />
                  </div>

                  {/* Viajeros */}
                  <div className="group">
                    <div className="flex items-center justify-between">
                      <label className={labelClass}>
                        <Users
                          className="h-3.5 w-3.5 text-[#ff5f49]"
                          strokeWidth={1.6}
                        />

                        <T>Viajeros</T>
                      </label>

                      <span className="font-mono text-[8px] text-[#14263d]/25">
                        01C
                      </span>
                    </div>

                    <Input
                      type="number"
                      value={formData.travelers}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          travelers: parseInt(e.target.value) || 1,
                        })
                      }
                      min={1}
                      className={inputClass}
                    />
                  </div>

                  {/* Presupuesto */}
                  <div className="group md:col-span-2">
                    <div className="flex items-center justify-between">
                      <label className={labelClass}>
                        <Wallet
                          className="h-3.5 w-3.5 text-[#ff5f49]"
                          strokeWidth={1.6}
                        />

                        <T>Presupuesto Estimado</T>
                      </label>

                      <span className="font-mono text-[8px] text-[#14263d]/25">
                        01D
                      </span>
                    </div>

                    <select
                      value={formData.budget}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          budget: e.target.value,
                        })
                      }
                      className={`${inputClass} cursor-pointer appearance-none`}
                    >
                      <option
                        value=""
                        disabled
                        className="text-[#14263d]/30"
                      >
                        {phSelectRange}
                      </option>

                      {BUDGET_OPTIONS.map((o) => (
                        <TranslatedOption key={o} value={o} />
                      ))}
                    </select>
                  </div>

                  {/* Requerimientos */}
                  <div className="group mt-2 md:col-span-2">
                    <div className="flex items-center justify-between">
                      <label className={labelClass}>
                        <MessageSquare
                          className="h-3.5 w-3.5 text-[#ff5f49]"
                          strokeWidth={1.6}
                        />

                        <T>Requerimientos Especiales</T>
                      </label>

                      <span className="font-mono text-[8px] text-[#14263d]/25">
                        01E
                      </span>
                    </div>

                    <Textarea
                      value={formData.requirements}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          requirements: e.target.value,
                        })
                      }
                      placeholder={phRequirements}
                      rows={4}
                      className="min-h-[130px] w-full resize-none rounded-none border-0 border-b border-[#14263d]/25 bg-transparent px-0 py-4 text-base font-semibold leading-relaxed text-[#14263d] shadow-none transition-colors placeholder:text-[#14263d]/25 focus-visible:border-[#ff5f49] focus-visible:ring-0"
                    />
                  </div>
                </div>
              </section>

              {/* Datos del titular */}
              <section className="border-b border-r border-[#14263d]/20 bg-[#f4f0e7]">
                <div className="flex items-center justify-between border-b border-[#14263d]/15 bg-[#e8e1d4] px-5 py-5 sm:px-7">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center border border-[#14263d]/20">
                      <User
                        className="h-4 w-4 text-[#ff5f49]"
                        strokeWidth={1.6}
                      />
                    </div>

                    <div>
                      <p className="mb-1 font-mono text-[8px] uppercase tracking-[0.25em] text-[#ff5f49]">
                        <T>Etapa</T> 02
                      </p>

                      <h2 className="text-lg font-black uppercase tracking-[-0.01em] text-[#14263d] sm:text-xl">
                        <T>Datos del Titular</T>
                      </h2>
                    </div>
                  </div>

                  <span className="font-mono text-[9px] text-[#14263d]/30">
                    USER—02
                  </span>
                </div>

                <div className="grid gap-x-10 gap-y-10 px-6 py-10 md:grid-cols-2 sm:px-8 lg:px-10 lg:py-12">
                  <div className="group">
                    <Input
                      value={formData.firstName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          firstName: e.target.value,
                        })
                      }
                      placeholder={phFirstName}
                      required
                      className={inputClass}
                    />
                  </div>

                  <div className="group">
                    <Input
                      value={formData.lastName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          lastName: e.target.value,
                        })
                      }
                      placeholder={phLastName}
                      className={inputClass}
                    />
                  </div>

                  <div className="group">
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          email: e.target.value,
                        })
                      }
                      placeholder={phEmail}
                      required
                      className={inputClass}
                    />
                  </div>

                  <div className="group">
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          phone: e.target.value,
                        })
                      }
                      placeholder={phPhone}
                      required
                      className={inputClass}
                    />
                  </div>
                </div>
              </section>
            </div>

            {/* Panel lateral */}
            <aside className="xl:sticky xl:top-28">
              <div className="overflow-hidden border border-[#14263d]/20 bg-[#14263d] text-white shadow-[18px_18px_0_rgba(20,38,61,0.1)]">
                <div className="relative overflow-hidden border-b border-white/15 px-6 py-8">
                  <div className="pointer-events-none absolute -right-20 -top-24 h-60 w-60 rounded-full border border-white/10">
                    <div className="absolute inset-12 rounded-full border border-[#ff5f49]/25" />
                  </div>

                  <div className="relative z-10">
                    <div className="mb-6 flex items-center justify-between">
                      <span className="font-mono text-[8px] font-bold uppercase tracking-[0.28em] text-[#ff7561]">
                        <T>Solicitud de Ruta</T>
                      </span>

                      <span className="font-mono text-[8px] text-white/30">
                        <T>PASO</T>—03
                      </span>
                    </div>

                    <h3 className="max-w-[270px] text-3xl font-black uppercase leading-[0.9] tracking-[-0.035em]">
                      <T>Siguiente Paso</T>
                    </h3>
                  </div>
                </div>

                <div className="px-6 py-8">
                  <p className="text-sm font-medium leading-relaxed text-white/55">
                    <T>
                      Al enviar esta solicitud, nuestro equipo de diseño de
                      rutas se pondrá en contacto contigo en menos de 24 horas
                      con una propuesta preliminar adaptada a tus necesidades.
                    </T>
                  </p>

                  <div className="mt-8 grid grid-cols-2 gap-px bg-white/15">
                    <div className="bg-[#14263d] p-4">
                      <p className="mb-2 text-[7px] font-bold uppercase tracking-[0.22em] text-white/30">
                        <T>Respuesta</T>
                      </p>

                      <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/70">
                        &lt; 24 Horas
                      </p>
                    </div>

                    <div className="bg-[#14263d] p-4">
                      <p className="mb-2 text-[7px] font-bold uppercase tracking-[0.22em] text-white/30">
                        Diseño
                      </p>

                      <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/70">
                        Personalizado
                      </p>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={!isFormValid || isSubmitting}
                    className="group mt-8 flex h-16 w-full items-center justify-center gap-3 border border-[#ff5f49] bg-[#ff5f49] px-6 text-[9px] font-bold uppercase tracking-[0.23em] text-white transition-all duration-300 hover:bg-white hover:text-[#14263d] disabled:cursor-not-allowed disabled:opacity-45"
                  >
                    {isSubmitting && (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    )}

                    <span>
                      {isSubmitting ? (
                        <T>Enviando...</T>
                      ) : (
                        <T>Solicitar Diseño</T>
                      )}
                    </span>

                    {!isSubmitting && (
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-2" />
                    )}
                  </button>

                  <div className="mt-9 border-t border-white/15 pt-7">
                    <p className="mb-4 text-[8px] font-bold uppercase tracking-[0.24em] text-white/30">
                      <T>¿Ya tienes una propuesta?</T>
                    </p>

                    <Link
                      href={`/${locale}/pago-folio`}
                      className="group flex items-center justify-between border-b border-white/20 pb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:border-[#ff5f49] hover:text-[#ff7561]"
                    >
                      <T>Liquidar Folio Asignado</T>

                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-white/15 bg-white/[0.035] px-6 py-4">
                  <span className="font-mono text-[7px] uppercase tracking-[0.22em] text-white/30">
                    Mapira route studio
                  </span>

                  <span className="h-2 w-2 rounded-full bg-[#ff5f49]" />
                </div>
              </div>
            </aside>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}