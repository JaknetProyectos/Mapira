"use client";

import { T } from "@/components/T";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useLocale } from "next-intl";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const locale = useLocale();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error: dbError } = await supabase
        .from("contact_messages_mp")
        .insert([
          {
            full_name: formData.name,
            email: formData.email,
            phone: formData.phone,
            message: formData.message,
          },
        ]);

      if (dbError) throw dbError;

      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "CONTACT",
          ...formData,
          customerName: formData.name,
        }),
      });

      if (!response.ok) throw new Error("No se pudo enviar");

      alert(
        locale === "en"
          ? "Message sent successfully!"
          : "¡Mensaje enviado con éxito!"
      );

      setFormData({
        name: "",
        phone: "",
        email: "",
        message: "",
      });
    } catch (error) {
      alert(
        locale === "en"
          ? "There was an error sending your message."
          : "Hubo un error al enviar tu mensaje."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contacto"
      className="relative overflow-hidden bg-[#ede7db] py-24 text-[#14263d] lg:py-32"
    >
      {/* Retícula cartográfica de fondo */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.05]">
        <div className="absolute left-[10%] top-0 h-full w-px bg-[#14263d]" />
        <div className="absolute left-[35%] top-0 h-full w-px bg-[#14263d]" />
        <div className="absolute left-[60%] top-0 h-full w-px bg-[#14263d]" />
        <div className="absolute left-[85%] top-0 h-full w-px bg-[#14263d]" />

        <div className="absolute left-0 top-[25%] h-px w-full bg-[#14263d]" />
        <div className="absolute left-0 top-[50%] h-px w-full bg-[#14263d]" />
        <div className="absolute left-0 top-[75%] h-px w-full bg-[#14263d]" />
      </div>

      <div className="relative z-10 mx-auto max-w-screen-2xl px-6 lg:px-12">
        {/* Identificador superior */}
        <div className="mb-10 flex items-center justify-between border-b border-[#14263d]/20 pb-5">
          <div className="flex items-center gap-4">
            <span className="h-2 w-2 bg-[#ff5f49]" />

            <span className="text-[9px] font-bold uppercase tracking-[0.34em] text-[#14263d]/50">
              <T>Atención Privada</T>
            </span>
          </div>

          <span className="hidden font-mono text-[9px] uppercase tracking-[0.22em] text-[#14263d]/35 md:block">
            Mapira / Route Request / 05
          </span>
        </div>

        <div className="grid border border-[#14263d]/20 lg:grid-cols-[0.78fr_1.22fr]">
          {/* Panel de narrativa */}
          <div className="relative min-h-[600px] overflow-hidden bg-[#14263d] px-6 py-10 text-white sm:px-10 sm:py-14 lg:min-h-[780px] lg:px-12 lg:py-16">
            {/* Elementos de coordenadas */}
            <div className="pointer-events-none absolute -right-52 -top-32 h-[34rem] w-[34rem] rounded-full border border-white/10">
              <div className="absolute inset-16 rounded-full border border-white/10" />
              <div className="absolute inset-32 rounded-full border border-[#ff7058]/25" />

              <span className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ff5f49] shadow-[0_0_0_12px_rgba(255,95,73,0.12)]" />
            </div>

            <div className="pointer-events-none absolute bottom-[-2rem] left-[-1rem] text-[9rem] font-black uppercase leading-none tracking-[-0.09em] text-white/[0.025] sm:text-[12rem] lg:text-[15rem]">
              MX
            </div>

            <div className="relative z-10 flex h-full flex-col justify-between">
              <div>
                <div className="mb-10 flex items-center gap-3">
                  <span className="font-mono text-[8px] uppercase tracking-[0.25em] text-[#ff806e]">
                    19.4326° N
                  </span>

                  <span className="h-px w-8 bg-white/20" />

                  <span className="font-mono text-[8px] uppercase tracking-[0.25em] text-white/35">
                    99.1332° W
                  </span>
                </div>

                <h2 className="text-5xl font-black uppercase leading-[0.84] tracking-[-0.055em] sm:text-6xl lg:text-7xl xl:text-8xl">
                  <T>Inicia tu</T>

                  <span className="mt-2 block text-[#ff6550]">
                    <T>travesía.</T>
                  </span>
                </h2>

                <div className="mt-10 max-w-md border-l-2 border-[#ff5f49] pl-5">
                  <p className="text-base font-medium leading-relaxed text-white/68 md:text-lg">
                    <T>
                      Comparte las primeras coordenadas de tu viaje. Nuestro
                      equipo diseñará una propuesta inicial de ruta en menos de
                      24 horas.
                    </T>
                  </p>
                </div>
              </div>

              <div className="mt-16">
                <p className="mb-3 text-[8px] font-bold uppercase tracking-[0.3em] text-white/30">
                  Contacto directo
                </p>

                <a
                  href="mailto:hola@mapira.mx"
                  className="inline-block text-xl font-black tracking-[-0.02em] text-white transition-colors duration-300 hover:text-[#ff7058] sm:text-2xl"
                >
                  hola@mapira.mx
                </a>

                <div className="mt-8 grid grid-cols-2 gap-px bg-white/15">
                  <div className="bg-[#14263d] p-4">
                    <p className="mb-2 text-[7px] font-bold uppercase tracking-[0.24em] text-white/30">
                      Respuesta
                    </p>

                    <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/65">
                      Menos de 24 h
                    </p>
                  </div>

                  <div className="bg-[#14263d] p-4">
                    <p className="mb-2 text-[7px] font-bold uppercase tracking-[0.24em] text-white/30">
                      Servicio
                    </p>

                    <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/65">
                      Personalizado
                    </p>
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-between border-t border-white/15 pt-4">
                  <span className="font-mono text-[8px] uppercase tracking-[0.22em] text-white/30">
                    Route design office
                  </span>

                  <span className="h-2 w-2 rounded-full bg-[#ff5f49]" />
                </div>
              </div>
            </div>
          </div>

          {/* Panel del formulario */}
          <div className="bg-[#f4f0e7]">
            <div className="flex items-center justify-between border-b border-[#14263d]/20 px-6 py-5 sm:px-8 lg:px-10">
              <div>
                <p className="mb-1 text-[8px] font-bold uppercase tracking-[0.3em] text-[#ff5f49]">
                  Solicitud de ruta
                </p>

                <p className="text-sm font-black uppercase tracking-[0.1em] text-[#14263d]">
                  Primeras coordenadas
                </p>
              </div>

              <span className="font-mono text-[10px] text-[#14263d]/30">
                FORM / 01
              </span>
            </div>

            <form
              onSubmit={handleSubmit}
              className="px-6 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-14"
            >
              <div className="mb-10 flex items-start gap-4 border-b border-[#14263d]/15 pb-6">
                <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center border border-[#ff5f49] font-mono text-[8px] font-bold text-[#ff5f49]">
                  01
                </span>

                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.08em] text-[#14263d]">
                    Información del viajero
                  </p>

                  <p className="mt-1 text-xs font-medium leading-relaxed text-[#14263d]/50">
                    Completa tus datos para comenzar el diseño de la ruta.
                  </p>
                </div>
              </div>

              <div className="grid gap-x-8 gap-y-10 md:grid-cols-2">
                {/* Nombre */}
                <div className="group relative space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-[9px] font-bold uppercase tracking-[0.24em] text-[#14263d]/45 transition-colors group-focus-within:text-[#ff5f49]">
                      <T>Nombre</T>
                    </label>

                    <span className="font-mono text-[8px] text-[#14263d]/25">
                      01A
                    </span>
                  </div>

                  <Input
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        name: e.target.value,
                      })
                    }
                    placeholder={
                      locale === "en"
                        ? "Your full name"
                        : "Tu nombre completo"
                    }
                    required
                    className="h-14 rounded-none border-0 border-b border-[#14263d]/25 bg-transparent px-0 text-base font-semibold text-[#14263d] shadow-none transition-colors placeholder:text-[#14263d]/25 focus-visible:border-[#ff5f49] focus-visible:ring-0"
                  />
                </div>

                {/* Teléfono */}
                <div className="group relative space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-[9px] font-bold uppercase tracking-[0.24em] text-[#14263d]/45 transition-colors group-focus-within:text-[#ff5f49]">
                      <T>Teléfono</T>
                    </label>

                    <span className="font-mono text-[8px] text-[#14263d]/25">
                      01B
                    </span>
                  </div>

                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        phone: e.target.value,
                      })
                    }
                    placeholder={locale === "en" ? "+1" : "+52"}
                    required
                    className="h-14 rounded-none border-0 border-b border-[#14263d]/25 bg-transparent px-0 text-base font-semibold text-[#14263d] shadow-none transition-colors placeholder:text-[#14263d]/25 focus-visible:border-[#ff5f49] focus-visible:ring-0"
                  />
                </div>
              </div>

              {/* Correo */}
              <div className="group relative mt-10 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-[9px] font-bold uppercase tracking-[0.24em] text-[#14263d]/45 transition-colors group-focus-within:text-[#ff5f49]">
                    <T>Correo Electrónico</T>
                  </label>

                  <span className="font-mono text-[8px] text-[#14263d]/25">
                    02
                  </span>
                </div>

                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      email: e.target.value,
                    })
                  }
                  placeholder={
                    locale === "en"
                      ? "example@mail.com"
                      : "ejemplo@correo.com"
                  }
                  required
                  className="h-14 rounded-none border-0 border-b border-[#14263d]/25 bg-transparent px-0 text-base font-semibold text-[#14263d] shadow-none transition-colors placeholder:text-[#14263d]/25 focus-visible:border-[#ff5f49] focus-visible:ring-0"
                />
              </div>

              {/* Mensaje */}
              <div className="group relative mt-10 space-y-3">
                <div className="flex items-end justify-between">
                  <label className="text-[9px] font-bold uppercase tracking-[0.24em] text-[#14263d]/45 transition-colors group-focus-within:text-[#ff5f49]">
                    <T>Visión del Viaje</T>
                  </label>

                  <span className="font-mono text-[8px] text-[#14263d]/30">
                    {formData.message.length}/180
                  </span>
                </div>

                <Textarea
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      message: e.target.value,
                    })
                  }
                  placeholder={
                    locale === "en"
                      ? "Tell us about your dates, destinations or expectations..."
                      : "Cuéntanos tus fechas, destinos o expectativas..."
                  }
                  rows={4}
                  maxLength={180}
                  className="min-h-[130px] resize-none rounded-none border-0 border-b border-[#14263d]/25 bg-transparent px-0 py-4 text-base font-semibold leading-relaxed text-[#14263d] shadow-none transition-colors placeholder:text-[#14263d]/25 focus-visible:border-[#ff5f49] focus-visible:ring-0"
                />
              </div>

              {/* Botón */}
              <div className="mt-12 flex flex-col gap-5 border-t border-[#14263d]/15 pt-7 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="mb-1 text-[7px] font-bold uppercase tracking-[0.24em] text-[#14263d]/30">
                    Tiempo estimado de respuesta
                  </p>

                  <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#14263d]/55">
                    Dentro de las próximas 24 horas
                  </p>
                </div>

                <Button
                  type="submit"
                  disabled={!formData.name || isSubmitting}
                  className="group h-16 w-full rounded-none border border-[#14263d] bg-[#14263d] px-8 text-[9px] font-bold uppercase tracking-[0.24em] text-white shadow-none transition-all duration-300 hover:border-[#ff5f49] hover:bg-[#ff5f49] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                >
                  {isSubmitting ? (
                    <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                  ) : (
                    <T>Enviar Solicitud</T>
                  )}

                  {!isSubmitting && (
                    <ArrowRight className="ml-4 h-4 w-4 transition-transform duration-300 group-hover:translate-x-2" />
                  )}
                </Button>
              </div>
            </form>

            <div className="flex items-center justify-between border-t border-[#14263d]/20 bg-[#e8e1d4] px-6 py-4 sm:px-8 lg:px-10">
              <span className="font-mono text-[8px] uppercase tracking-[0.22em] text-[#14263d]/35">
                Información protegida
              </span>

              <span className="font-mono text-[8px] uppercase tracking-[0.22em] text-[#ff5f49]">
                Mapira.mx
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}