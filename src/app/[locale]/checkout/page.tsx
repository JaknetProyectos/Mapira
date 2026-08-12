"use client";

import { useLocale } from "next-intl";
import { useState, Suspense, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/context/CartContext";
import {
  CheckCircle,
  Loader2,
  User,
  FileText,
  Lock,
  CreditCard,
  ShieldCheck,
} from "lucide-react";
import { T } from "@/components/T";
import { useT } from "@/hooks/useT";

function CheckoutContent() {
  const router = useRouter();
  const { cart, clearCart } = useCart();
  const finalTotal = cart.total;

  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [contactInfo, setContactInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [billingInfo, setBillingInfo] = useState({
    pais: "",
    direccion: "",
    localidad: "",
    estado: "",
    codigo_postal: "",
  });

  const [addNotes, setAddNotes] = useState(false);
  const [orderNotes, setOrderNotes] = useState("");

  const [cardInfo, setCardInfo] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });

  const locale = useLocale();

  useEffect(() => {
    const savedData = sessionStorage.getItem("mapira_temp_contact");

    if (savedData) {
      const { nombre, email, folio } = JSON.parse(savedData);

      setContactInfo((prev) => ({
        ...prev,
        firstName: nombre,
        email: email,
      }));

      setOrderNotes(`Pago referente al Folio: ${folio}`);
      setAddNotes(true);
      sessionStorage.removeItem("mapira_temp_contact");
    }
  }, []);

  const phNombre = useT("Nombre");
  const phApellidos = useT("Apellidos");
  const phEmail = useT("Email");
  const phTelefono = useT("Teléfono");
  const phPais = useT("País / Región");
  const phDireccion = useT("Dirección completa (Calle y número)");
  const phLocalidad = useT("Localidad / Ciudad");
  const phEstado = useT("Región / Estado");
  const phCP = useT("Código Postal");
  const phTarjeta = useT("Número de tarjeta");
  const phNombreTarjeta = useT("Nombre en la tarjeta");
  const phFecha = useT("MM/AA");
  const phCvv = useT("CVV");
  const textProcesando = useT("Procesando pago...");
  const textPagar = useT("Pagar");
  const phNotas = useT("Ej: Peticiones especiales, alergias, etc.");

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
    }).format(price);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          locale,
          contactInfo,
          billingInfo,
          orderNotes: addNotes ? orderNotes : null,
          cart,
          cardInfo,
          formattedTotal: formatPrice(finalTotal),
          manualFolioData: null,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Error procesando el pago");
      }

      setShowSuccess(true);
      clearCart();
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Error desconocido";

      alert(`Error al procesar el pago: ${errorMessage}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const isFormValid =
    contactInfo.firstName &&
    contactInfo.email &&
    contactInfo.phone &&
    billingInfo.pais &&
    billingInfo.direccion &&
    billingInfo.localidad &&
    billingInfo.estado &&
    billingInfo.codigo_postal &&
    cardInfo.number.length >= 15 &&
    cardInfo.name &&
    cardInfo.expiry.length === 5 &&
    cardInfo.cvv.length >= 3 &&
    cart.items.length > 0;

  const handleExpiryChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    let val = e.target.value.replace(/\D/g, "");

    if (val.length > 4) val = val.slice(0, 4);
    if (val.length > 2) {
      val = `${val.slice(0, 2)}/${val.slice(2)}`;
    }

    setCardInfo({
      ...cardInfo,
      expiry: val,
    });
  };

  const inputClass =
    "h-14 rounded-none border-0 border-b border-[#14263d]/25 bg-transparent px-0 text-base font-semibold text-[#14263d] shadow-none transition-colors placeholder:text-[#14263d]/25 focus-visible:border-[#ff5f49] focus-visible:ring-0";

  if (showSuccess) {
    return (
      <main className="relative flex flex-1 items-center justify-center overflow-hidden bg-[#eee8dc] px-6 pb-24 pt-40">
        {/* Retícula */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.05]">
          <div className="absolute left-[20%] top-0 h-full w-px bg-[#14263d]" />
          <div className="absolute left-[50%] top-0 h-full w-px bg-[#14263d]" />
          <div className="absolute left-[80%] top-0 h-full w-px bg-[#14263d]" />
          <div className="absolute left-0 top-[30%] h-px w-full bg-[#14263d]" />
          <div className="absolute left-0 top-[70%] h-px w-full bg-[#14263d]" />
        </div>

        <div className="relative z-10 grid w-full max-w-4xl border border-[#14263d]/20 bg-[#f4f0e7] lg:grid-cols-[0.72fr_1.28fr]">
          <div className="relative flex min-h-[300px] items-center justify-center overflow-hidden bg-[#14263d]">
            <div className="absolute h-64 w-64 rounded-full border border-white/10">
              <div className="absolute inset-12 rounded-full border border-white/10" />
              <div className="absolute inset-24 rounded-full border border-[#ff5f49]/30" />
            </div>

            <div className="relative z-10 flex h-24 w-24 items-center justify-center border border-[#ff705d] bg-[#ff5f49]/10">
              <CheckCircle
                className="h-11 w-11 text-[#ff705d]"
                strokeWidth={1.4}
              />
            </div>
          </div>

          <div className="px-7 py-12 sm:px-12 lg:px-14 lg:py-16">
            <p className="mb-5 font-mono text-[8px] font-bold uppercase tracking-[0.3em] text-[#ff5f49]">
              Payment / Approved
            </p>

            <h1 className="text-4xl font-black uppercase leading-[0.9] tracking-[-0.04em] text-[#14263d] sm:text-5xl">
              <T>¡Reserva Confirmada!</T>
            </h1>

            <p className="mt-7 max-w-xl text-base font-medium leading-relaxed text-[#14263d]/60">
              <T>
                Tu pago ha sido procesado exitosamente. Tu concierge se pondrá
                en contacto contigo a la brevedad.
              </T>
            </p>

            <Button
              asChild
              className="mt-10 h-16 w-full rounded-none border border-[#14263d] bg-[#14263d] px-8 text-[9px] font-bold uppercase tracking-[0.24em] text-white shadow-none transition-all hover:border-[#ff5f49] hover:bg-[#ff5f49] sm:w-auto"
            >
              <Link href={`/${locale}/`}>
                <T>Volver al Inicio</T>
              </Link>
            </Button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="relative flex-1 overflow-hidden bg-[#eee8dc] pb-24 pt-32 text-[#14263d] lg:pb-32 lg:pt-36">
      {/* Retícula de fondo */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.045]">
        <div className="absolute left-[10%] top-0 h-full w-px bg-[#14263d]" />
        <div className="absolute left-[35%] top-0 h-full w-px bg-[#14263d]" />
        <div className="absolute left-[60%] top-0 h-full w-px bg-[#14263d]" />
        <div className="absolute left-[85%] top-0 h-full w-px bg-[#14263d]" />

        <div className="absolute left-0 top-[20%] h-px w-full bg-[#14263d]" />
        <div className="absolute left-0 top-[50%] h-px w-full bg-[#14263d]" />
        <div className="absolute left-0 top-[80%] h-px w-full bg-[#14263d]" />
      </div>

      <div className="relative z-10 mx-auto max-w-screen-2xl px-6 lg:px-12">
        {/* Identificador */}
        <div className="mb-8 flex items-center justify-between border-b border-[#14263d]/20 pb-5">
          <div className="flex items-center gap-4">
            <span className="h-2 w-2 bg-[#ff5f49]" />

            <span className="text-[9px] font-bold uppercase tracking-[0.34em] text-[#14263d]/50">
              <T>Paso Final</T>
            </span>
          </div>

          <span className="hidden font-mono text-[9px] uppercase tracking-[0.22em] text-[#14263d]/35 md:block">
            Mapira / Secure Checkout
          </span>
        </div>

        {/* Cabecera */}
        <div className="mb-12 grid items-end gap-8 border-b border-[#14263d]/20 pb-10 lg:grid-cols-[1fr_320px]">
          <div>
            <p className="mb-4 font-mono text-[9px] font-bold uppercase tracking-[0.26em] text-[#ff5f49]">
              Confirmación de expedición
            </p>

            <h1 className="text-5xl font-black uppercase leading-[0.85] tracking-[-0.055em] text-[#14263d] sm:text-6xl md:text-7xl lg:text-8xl">
              <T>Checkout</T>
            </h1>
          </div>

          <div className="border-l-2 border-[#ff5f49] pl-5">
            <p className="text-sm font-medium leading-relaxed text-[#14263d]/55">
              Revisa tus datos, confirma las coordenadas de facturación y
              autoriza el pago de tu ruta.
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid items-start gap-10 xl:grid-cols-[minmax(0,1fr)_390px] xl:gap-12"
        >
          <div className="border-l border-t border-[#14263d]/20">
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
                      Etapa 01
                    </p>

                    <h2 className="text-lg font-black uppercase tracking-[-0.01em] text-[#14263d] sm:text-xl">
                      <T>Datos del Titular</T>
                    </h2>
                  </div>
                </div>

                <span className="font-mono text-[9px] text-[#14263d]/30">
                  ID—01
                </span>
              </div>

              <div className="grid gap-x-10 gap-y-9 px-6 py-10 sm:grid-cols-2 sm:px-8 lg:px-10">
                <Input
                  value={contactInfo.firstName}
                  onChange={(e) =>
                    setContactInfo({
                      ...contactInfo,
                      firstName: e.target.value,
                    })
                  }
                  placeholder={phNombre}
                  required
                  className={inputClass}
                />

                <Input
                  value={contactInfo.lastName}
                  onChange={(e) =>
                    setContactInfo({
                      ...contactInfo,
                      lastName: e.target.value,
                    })
                  }
                  placeholder={phApellidos}
                  className={inputClass}
                />

                <Input
                  type="email"
                  value={contactInfo.email}
                  onChange={(e) =>
                    setContactInfo({
                      ...contactInfo,
                      email: e.target.value,
                    })
                  }
                  placeholder={phEmail}
                  required
                  className={inputClass}
                />

                <Input
                  type="tel"
                  value={contactInfo.phone}
                  onChange={(e) =>
                    setContactInfo({
                      ...contactInfo,
                      phone: e.target.value,
                    })
                  }
                  placeholder={phTelefono}
                  required
                  className={inputClass}
                />
              </div>
            </section>

            {/* Facturación */}
            <section className="border-b border-r border-[#14263d]/20 bg-[#f4f0e7]">
              <div className="flex items-center justify-between border-b border-[#14263d]/15 bg-[#e8e1d4] px-5 py-5 sm:px-7">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center border border-[#14263d]/20">
                    <FileText
                      className="h-4 w-4 text-[#ff5f49]"
                      strokeWidth={1.6}
                    />
                  </div>

                  <div>
                    <p className="mb-1 font-mono text-[8px] uppercase tracking-[0.25em] text-[#ff5f49]">
                      Etapa 02
                    </p>

                    <h2 className="text-lg font-black uppercase tracking-[-0.01em] text-[#14263d] sm:text-xl">
                      <T>Dirección de Facturación</T>
                    </h2>
                  </div>
                </div>

                <span className="font-mono text-[9px] text-[#14263d]/30">
                  BILL—02
                </span>
              </div>

              <div className="px-6 py-10 sm:px-8 lg:px-10">
                <div className="grid gap-x-10 gap-y-9 sm:grid-cols-2">
                  <Input
                    placeholder={phPais}
                    required
                    value={billingInfo.pais}
                    onChange={(e) =>
                      setBillingInfo({
                        ...billingInfo,
                        pais: e.target.value,
                      })
                    }
                    className={`sm:col-span-2 ${inputClass}`}
                  />

                  <Input
                    placeholder={phDireccion}
                    required
                    value={billingInfo.direccion}
                    onChange={(e) =>
                      setBillingInfo({
                        ...billingInfo,
                        direccion: e.target.value,
                      })
                    }
                    className={`sm:col-span-2 ${inputClass}`}
                  />

                  <Input
                    placeholder={phLocalidad}
                    required
                    value={billingInfo.localidad}
                    onChange={(e) =>
                      setBillingInfo({
                        ...billingInfo,
                        localidad: e.target.value,
                      })
                    }
                    className={inputClass}
                  />

                  <Input
                    placeholder={phEstado}
                    required
                    value={billingInfo.estado}
                    onChange={(e) =>
                      setBillingInfo({
                        ...billingInfo,
                        estado: e.target.value,
                      })
                    }
                    className={inputClass}
                  />

                  <Input
                    placeholder={phCP}
                    required
                    value={billingInfo.codigo_postal}
                    onChange={(e) =>
                      setBillingInfo({
                        ...billingInfo,
                        codigo_postal: e.target.value,
                      })
                    }
                    className={inputClass}
                  />
                </div>

                <div className="mt-10 border-t border-[#14263d]/15 pt-7">
                  <label className="flex cursor-pointer items-center gap-4 text-sm font-bold text-[#14263d]">
                    <div className="relative flex items-center">
                      <input
                        type="checkbox"
                        checked={addNotes}
                        onChange={(e) => setAddNotes(e.target.checked)}
                        className="peer h-5 w-5 cursor-pointer appearance-none rounded-none border border-[#14263d]/30 transition-all checked:border-[#ff5f49] checked:bg-[#ff5f49]"
                      />

                      <CheckCircle className="pointer-events-none absolute left-1 h-3 w-3 text-white opacity-0 transition-opacity peer-checked:opacity-100" />
                    </div>

                    <T>Añadir indicaciones al concierge (Opcional)</T>
                  </label>

                  {addNotes && (
                    <div className="mt-6 animate-reveal">
                      <Textarea
                        placeholder={phNotas}
                        value={orderNotes}
                        onChange={(e) => setOrderNotes(e.target.value)}
                        className="min-h-[110px] resize-none rounded-none border-0 border-b border-[#14263d]/25 bg-transparent px-0 py-4 text-base font-semibold text-[#14263d] shadow-none transition-colors placeholder:text-[#14263d]/25 focus-visible:border-[#ff5f49] focus-visible:ring-0"
                      />
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* Método de pago */}
            <section className="relative overflow-hidden border-b border-r border-[#14263d]/20 bg-[#14263d] text-white">
              <div className="pointer-events-none absolute -right-44 -top-44 h-[28rem] w-[28rem] rounded-full border border-white/10">
                <div className="absolute inset-16 rounded-full border border-white/10" />
                <div className="absolute inset-32 rounded-full border border-[#ff5f49]/25" />
              </div>

              <div className="relative z-10 flex items-center justify-between border-b border-white/15 px-5 py-5 sm:px-7">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center border border-white/20">
                    <CreditCard
                      className="h-4 w-4 text-[#ff7561]"
                      strokeWidth={1.6}
                    />
                  </div>

                  <div>
                    <p className="mb-1 font-mono text-[8px] uppercase tracking-[0.25em] text-[#ff7561]">
                      Etapa 03
                    </p>

                    <h2 className="text-lg font-black uppercase tracking-[-0.01em] text-white sm:text-xl">
                      <T>Método </T><T>de Pago</T>
                    </h2>
                  </div>
                </div>

                <img
                  src="/logo-octano-2.png"
                  alt="Powered by Etomin"
                  className="h-7 max-w-[100px] object-contain"
                />
              </div>

              <div className="relative z-10 px-6 py-10 sm:px-8 lg:px-10">
                <div className="grid max-w-2xl gap-7">
                  <div>
                    <p className="mb-3 text-[8px] font-bold uppercase tracking-[0.24em] text-white/35">
                      Número de tarjeta
                    </p>

                    <Input
                      placeholder={phTarjeta}
                      required
                      maxLength={19}
                      value={cardInfo.number}
                      onChange={(e) =>
                        setCardInfo({
                          ...cardInfo,
                          number: e.target.value.replace(/\D/g, ""),
                        })
                      }
                      className="h-14 rounded-none border border-white/20 bg-white/[0.06] px-5 font-mono text-base tracking-[0.15em] text-white shadow-none placeholder:text-white/30 focus-visible:border-[#ff5f49] focus-visible:ring-0"
                    />
                  </div>

                  <div>
                    <p className="mb-3 text-[8px] font-bold uppercase tracking-[0.24em] text-white/35">
                      Titular de la tarjeta
                    </p>

                    <Input
                      placeholder={phNombreTarjeta}
                      required
                      value={cardInfo.name}
                      onChange={(e) =>
                        setCardInfo({
                          ...cardInfo,
                          name: e.target.value.toUpperCase(),
                        })
                      }
                      className="h-14 rounded-none border border-white/20 bg-white/[0.06] px-5 text-base font-bold uppercase tracking-[0.08em] text-white shadow-none placeholder:text-white/30 focus-visible:border-[#ff5f49] focus-visible:ring-0"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <p className="mb-3 text-[8px] font-bold uppercase tracking-[0.24em] text-white/35">
                        Vigencia
                      </p>

                      <Input
                        placeholder={phFecha}
                        required
                        maxLength={5}
                        value={cardInfo.expiry}
                        onChange={handleExpiryChange}
                        className="h-14 rounded-none border border-white/20 bg-white/[0.06] text-center font-mono text-base tracking-[0.15em] text-white shadow-none placeholder:text-white/30 focus-visible:border-[#ff5f49] focus-visible:ring-0"
                      />
                    </div>

                    <div>
                      <p className="mb-3 text-[8px] font-bold uppercase tracking-[0.24em] text-white/35">
                        Seguridad
                      </p>

                      <Input
                        placeholder={phCvv}
                        type="password"
                        required
                        maxLength={4}
                        value={cardInfo.cvv}
                        onChange={(e) =>
                          setCardInfo({
                            ...cardInfo,
                            cvv: e.target.value.replace(/\D/g, ""),
                          })
                        }
                        className="h-14 rounded-none border border-white/20 bg-white/[0.06] text-center font-mono text-base tracking-[0.2em] text-white shadow-none placeholder:text-white/30 focus-visible:border-[#ff5f49] focus-visible:ring-0"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-10 flex flex-col gap-6 border-t border-white/15 pt-7 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex max-w-sm items-center gap-4">
                    <ShieldCheck
                      className="h-8 w-8 shrink-0 text-[#ff7561]"
                      strokeWidth={1.5}
                    />

                    <p className="text-[9px] font-bold uppercase leading-relaxed tracking-[0.18em] text-white/45">
                      <T>
                        Tus datos están protegidos y encriptados de extremo a
                        extremo.
                      </T>
                    </p>
                  </div>

                  <img
                    src="/etomin_secbadge.svg"
                    alt="Etomin Secure"
                    className="h-11 w-fit opacity-75 mix-blend-screen"
                  />
                </div>
              </div>
            </section>
          </div>

          {/* Resumen lateral */}
          <aside className="xl:sticky xl:top-28">
            <div className="overflow-hidden border border-[#14263d]/20 bg-[#f4f0e7] shadow-[18px_18px_0_rgba(20,38,61,0.1)]">
              <div className="bg-[#14263d] px-6 py-7 text-white">
                <div className="mb-3 flex items-center justify-between">
                  <p className="font-mono text-[8px] font-bold uppercase tracking-[0.28em] text-[#ff7561]">
                    Final manifest
                  </p>

                  <span className="font-mono text-[8px] text-white/30">
                    MX—03
                  </span>
                </div>

                <h2 className="text-2xl font-black uppercase leading-[0.95] tracking-[-0.025em]">
                  <T>Resumen del Carrito</T>
                </h2>
              </div>

              <div>
                {cart.items.length === 0 ? (
                  <div className="px-6 py-8">
                    <p className="text-sm font-medium text-[#14263d]/50">
                      <T>Tu carrito está vacío.</T>
                    </p>
                  </div>
                ) : (
                  cart.items.map((item, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-[36px_1fr] border-b border-[#14263d]/15"
                    >
                      <div className="border-r border-[#14263d]/15 px-3 py-5">
                        <span className="font-mono text-[8px] text-[#ff5f49]">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>

                      <div className="px-5 py-5">
                        <div className="flex items-start justify-between gap-4">
                          <div className="min-w-0">
                            <p className="text-xs font-bold uppercase leading-relaxed tracking-[0.04em] text-[#14263d]">
                              <T>{item.experience.title}</T>
                            </p>

                            <p className="mt-2 text-[8px] font-bold uppercase tracking-[0.18em] text-[#14263d]/40">
                              x{item.people} <T>personas</T>
                            </p>
                          </div>

                          <span className="shrink-0 font-mono text-[10px] font-bold text-[#14263d]">
                            {formatPrice(item.totalPrice)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="border-t border-[#14263d]/20 bg-[#e8e1d4] px-6 py-7">
                <div className="mb-7 flex items-end justify-between gap-5">
                  <span className="text-[8px] font-black uppercase tracking-[0.24em] text-[#14263d]/40">
                    <T>Costo Total</T>
                  </span>

                  <div className="text-right">
                    <div className="text-2xl font-black tracking-[-0.035em] text-[#ff5f49] sm:text-3xl">
                      {formatPrice(finalTotal)}
                    </div>

                    <div className="mt-1 text-[7px] font-bold uppercase tracking-[0.2em] text-[#14263d]/35">
                      <T>IVA incluido</T>
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={!isFormValid || isProcessing}
                  className="group h-16 w-full rounded-none border border-[#14263d] bg-[#14263d] px-6 text-[9px] font-bold uppercase tracking-[0.22em] text-white shadow-none transition-all hover:border-[#ff5f49] hover:bg-[#ff5f49] disabled:cursor-not-allowed disabled:opacity-45"
                >
                  {isProcessing ? (
                    <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                  ) : (
                    <Lock className="mr-3 h-4 w-4" />
                  )}

                  {isProcessing ? (
                    textProcesando
                  ) : (
                    <T>Autorizar Pago</T>
                  )}
                </Button>
              </div>

              <div className="flex items-center justify-between border-t border-[#14263d]/15 px-6 py-4">
                <span className="font-mono text-[7px] uppercase tracking-[0.2em] text-[#14263d]/30">
                  Secure transaction
                </span>

                <span className="h-2 w-2 rounded-full bg-[#ff5f49]" />
              </div>
            </div>
          </aside>
        </form>
      </div>
    </main>
  );
}

export default function CheckoutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#eee8dc]">
      <Header />

      <Suspense
        fallback={
          <div className="flex flex-1 items-center justify-center bg-[#eee8dc] pt-32">
            <div className="flex h-20 w-20 items-center justify-center border border-[#14263d]/20">
              <Loader2 className="h-8 w-8 animate-spin text-[#ff5f49]" />
            </div>
          </div>
        }
      >
        <CheckoutContent />
      </Suspense>

      <Footer />
    </div>
  );
}