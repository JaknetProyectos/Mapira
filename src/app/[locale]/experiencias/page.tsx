"use client";

import { useLocale } from "next-intl";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase";
import {
  MapPin,
  Search,
  ArrowRight,
  Loader2,
  Compass,
} from "lucide-react";
import {
  Experience,
  SupabaseExperienceResponse,
} from "@/lib/types";
import { T } from "@/components/T";
import { useT } from "@/hooks/useT";
import { Card } from "@/components/ui/card";

function ExperienciasContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("categoria");
  const locale = useLocale();

  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [categories, setCategories] = useState<
    { id: number; name: string; slug: string }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    categoryParam
  );
  const [searchTerm, setSearchTerm] = useState("");

  const phSearch = useT("Buscar destino o experiencia...");

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      try {
        const { data: catData } = await supabase
          .from("categories_mp")
          .select("*");

        if (catData) {
          setCategories(catData);
        }

        const { data: actData, error: actError } = await supabase
          .from("activities_mp")
          .select(`
            id, title, slug, plan_type, destination, price, description, images, category_id,
            categories:categories_mp (id, name, slug)
          `);

        if (actError) {
          console.error("Error al cargar experiencias:", actError);
        }

        if (actData) {
          const mappedData: Experience[] = (
            actData as unknown as SupabaseExperienceResponse[]
          ).map((item) => ({
            id: item.id,
            title: item.title,
            slug: item.slug,
            plan_type: item.plan_type,
            destination: item.destination,
            price: item.price,
            currency: item.currency || "MXN",
            tax_included: item.tax_included !== false,
            description: item.description || "",
            images: item.images || [],
            category_id: item.category_id,
            categories: item.categories || undefined,
            suggested_route: [],
            included: [],
            logistics: {},
          }));

          setExperiences(mappedData);
        }
      } catch (error) {
        console.error("Error fetchData:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  const filteredExperiences = experiences.filter((exp) => {
    const matchesCategory =
      !selectedCategory ||
      exp.categories?.slug === selectedCategory;

    const matchesSearch =
      !searchTerm ||
      exp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exp.description
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      exp.destination
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const formatPrice = (price: number) => {
    const formatter = new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
      minimumFractionDigits: 0,
    });

    return `${formatter.format(price)} MXN`;
  };

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

  return (
    <div className="flex min-h-screen flex-col bg-[#eee8dc] text-[#14263d] selection:bg-[#ff5f49]/25">
      <Header />

      <main className="relative flex-1 overflow-hidden pt-32 lg:pt-36">
        {/* Retícula cartográfica */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.045]">
          <div className="absolute left-[10%] top-0 h-full w-px bg-[#14263d]" />
          <div className="absolute left-[35%] top-0 h-full w-px bg-[#14263d]" />
          <div className="absolute left-[60%] top-0 h-full w-px bg-[#14263d]" />
          <div className="absolute left-[85%] top-0 h-full w-px bg-[#14263d]" />

          <div className="absolute left-0 top-[18%] h-px w-full bg-[#14263d]" />
          <div className="absolute left-0 top-[48%] h-px w-full bg-[#14263d]" />
          <div className="absolute left-0 top-[78%] h-px w-full bg-[#14263d]" />
        </div>

        {/* Elemento cartográfico decorativo */}
        <div className="pointer-events-none absolute -right-60 top-8 hidden h-[38rem] w-[38rem] rounded-full border border-[#14263d]/10 xl:block">
          <div className="absolute inset-20 rounded-full border border-[#14263d]/10" />
          <div className="absolute inset-40 rounded-full border border-[#ff5f49]/20" />

          <span className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ff5f49]" />
        </div>

        <div className="relative z-10 mx-auto max-w-screen-2xl px-6 lg:px-12">
          {/* Identificador superior */}
          <div className="flex items-center justify-between border-b border-[#14263d]/20 pb-5">
            <div className="flex items-center gap-4">
              <span className="h-2 w-2 bg-[#ff5f49]" />

              <span className="text-[9px] font-bold uppercase tracking-[0.34em] text-[#14263d]/50">
                <T>Catálogo Oficial</T>
              </span>
            </div>

            <span className="hidden font-mono text-[9px] uppercase tracking-[0.22em] text-[#14263d]/35 md:block">
              Mapira / Route Directory
            </span>
          </div>

          {/* Cabecera editorial */}
          <section className="grid items-end gap-10 border-b border-[#14263d]/20 py-12 lg:grid-cols-[1fr_340px] lg:py-16">
            <div>
              <p className="mb-5 font-mono text-[9px] font-bold uppercase tracking-[0.27em] text-[#ff5f49]">
                Atlas de experiencias
              </p>

              <h1 className="max-w-5xl text-5xl font-black uppercase leading-[0.84] tracking-[-0.06em] text-[#14263d] sm:text-6xl md:text-7xl lg:text-8xl">
                <T>Encuentra tu</T>

                <span className="mt-2 block text-[#ff5f49]">
                  <T>horizonte.</T>
                </span>
              </h1>
            </div>

            <div className="border-l-2 border-[#ff5f49] pl-5">
              <p className="text-sm font-medium leading-relaxed text-[#14263d]/60 md:text-base">
                Explora nuestra selección de rutas, experiencias y planes
                diseñados para descubrir nuevas coordenadas.
              </p>

              <div className="mt-6 flex items-center justify-between border-t border-[#14263d]/15 pt-4">
                <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-[#14263d]/35">
                  Rutas disponibles
                </span>

                <span className="font-mono text-[9px] font-bold text-[#ff5f49]">
                  {String(experiences.length).padStart(2, "0")}
                </span>
              </div>
            </div>
          </section>

          {/* Filtros */}
          <section className="border-x border-b border-[#14263d]/20 bg-[#f4f0e7]">
            <div className="grid lg:grid-cols-[1fr_360px]">
              {/* Categorías */}
              <div className="border-b border-[#14263d]/20 lg:border-b-0 lg:border-r">
                <div className="flex items-center justify-between border-b border-[#14263d]/15 bg-[#e8e1d4] px-5 py-4">
                  <span className="text-[8px] font-bold uppercase tracking-[0.28em] text-[#14263d]/40">
                    Clasificación de rutas
                  </span>

                  <span className="font-mono text-[8px] text-[#14263d]/30">
                    FILTER—01
                  </span>
                </div>

                <div className="flex overflow-x-auto">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`relative min-w-fit border-r border-[#14263d]/15 px-5 py-5 text-[9px] font-bold uppercase tracking-[0.22em] transition-all duration-300 ${
                      !selectedCategory
                        ? "bg-[#14263d] text-white"
                        : "text-[#14263d]/45 hover:bg-[#e8e1d4] hover:text-[#14263d]"
                    }`}
                  >
                    <T>Ver Todo</T>

                    {!selectedCategory && (
                      <span className="absolute bottom-0 left-0 h-[3px] w-full bg-[#ff5f49]" />
                    )}
                  </button>

                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.slug)}
                      className={`relative min-w-fit border-r border-[#14263d]/15 px-5 py-5 text-[9px] font-bold uppercase tracking-[0.22em] transition-all duration-300 last:border-r-0 ${
                        selectedCategory === cat.slug
                          ? "bg-[#14263d] text-white"
                          : "text-[#14263d]/45 hover:bg-[#e8e1d4] hover:text-[#14263d]"
                      }`}
                    >
                      <T>{cat.name}</T>

                      {selectedCategory === cat.slug && (
                        <span className="absolute bottom-0 left-0 h-[3px] w-full bg-[#ff5f49]" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Buscador */}
              <div>
                <div className="flex items-center justify-between border-b border-[#14263d]/15 bg-[#e8e1d4] px-5 py-4">
                  <span className="text-[8px] font-bold uppercase tracking-[0.28em] text-[#14263d]/40">
                    Búsqueda
                  </span>

                  <span className="font-mono text-[8px] text-[#14263d]/30">
                    SEARCH—02
                  </span>
                </div>

                <div className="relative px-5 py-3">
                  <Search
                    className="absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#ff5f49]"
                    strokeWidth={1.6}
                  />

                  <Input
                    placeholder={phSearch}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="h-12 rounded-none border-0 bg-transparent pl-8 pr-0 text-sm font-semibold text-[#14263d] shadow-none placeholder:text-[#14263d]/30 focus-visible:ring-0"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Resultados */}
          <section className="pb-32 pt-12">
            <div className="mb-6 flex items-center justify-between border-b border-[#14263d]/20 pb-4">
              <span className="text-[8px] font-bold uppercase tracking-[0.28em] text-[#14263d]/40">
                Directorio de experiencias
              </span>

              <span className="font-mono text-[9px] text-[#ff5f49]">
                {String(filteredExperiences.length).padStart(2, "0")} RESULTS
              </span>
            </div>

            {filteredExperiences.length === 0 ? (
              <div className="grid min-h-[420px] border border-[#14263d]/20 bg-[#f4f0e7] md:grid-cols-[0.65fr_1.35fr]">
                <div className="relative flex min-h-[240px] items-center justify-center overflow-hidden bg-[#14263d]">
                  <div className="pointer-events-none absolute h-64 w-64 rounded-full border border-white/10">
                    <div className="absolute inset-12 rounded-full border border-white/10" />
                    <div className="absolute inset-24 rounded-full border border-[#ff5f49]/30" />
                  </div>

                  <Compass
                    className="relative z-10 h-12 w-12 text-[#ff705d]"
                    strokeWidth={1.2}
                  />
                </div>

                <div className="flex flex-col justify-center px-7 py-12 sm:px-12">
                  <p className="mb-4 font-mono text-[8px] font-bold uppercase tracking-[0.28em] text-[#ff5f49]">
                    Search / No Results
                  </p>

                  <h3 className="text-3xl font-black uppercase tracking-[-0.03em] text-[#14263d] md:text-4xl">
                    <T>Ruta no encontrada</T>
                  </h3>

                  <p className="mt-5 max-w-lg text-sm font-medium leading-relaxed text-[#14263d]/55 md:text-base">
                    <T>
                      Intenta ajustando los filtros o tu búsqueda.
                    </T>
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid border-l border-t border-[#14263d]/20 md:grid-cols-2 xl:grid-cols-3">
                {filteredExperiences.map((exp, index) => {
                  const thumbImage =
                    exp.images?.length > 0
                      ? exp.images[0]
                      : "/placeholder.jpg";

                  return (
                    <Link
                      key={exp.id}
                      href={`/${locale}/experiencias/${exp.id}`}
                      className="group block border-b border-r border-[#14263d]/20"
                    >
                      <Card className="h-full overflow-hidden rounded-none border-0 bg-[#f4f0e7] shadow-none">
                        {/* Cabecera de ficha */}
                        <div className="flex items-center justify-between border-b border-[#14263d]/15 px-5 py-4">
                          <span className="text-[8px] font-bold uppercase tracking-[0.24em] text-[#ff5f49]">
                            <T>{exp.plan_type}</T>
                          </span>

                          <span className="font-mono text-[9px] text-[#14263d]/30">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                        </div>

                        {/* Imagen */}
                        <div className="relative aspect-[4/5] overflow-hidden bg-[#d7cfc1]">
                          <Image
                            src={thumbImage}
                            alt={exp.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                            className="object-cover grayscale-[12%] transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                          />

                          <div className="absolute inset-0 bg-gradient-to-t from-[#14263d]/70 via-transparent to-[#14263d]/10" />

                          <div className="absolute left-5 top-5 flex items-center gap-3">
                            <span className="h-2 w-2 rounded-full bg-[#ff5f49] shadow-[0_0_0_6px_rgba(255,95,73,0.18)]" />

                            <span className="font-mono text-[7px] uppercase tracking-[0.2em] text-white/75">
                              Selected Route
                            </span>
                          </div>

                          <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-5">
                            <div className="min-w-0">
                              <p className="mb-2 flex items-center gap-2 text-[8px] font-bold uppercase tracking-[0.2em] text-[#ff8a77]">
                                <MapPin
                                  className="h-3 w-3"
                                  strokeWidth={1.8}
                                />

                                <T>{exp.destination}</T>
                              </p>

                              <h3 className="text-2xl font-black uppercase leading-[0.95] tracking-[-0.025em] text-white md:text-3xl">
                                <T>{exp.title}</T>
                              </h3>
                            </div>

                            <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-white/30 bg-[#14263d]/35 text-white backdrop-blur-md transition-all duration-300 group-hover:border-[#ff5f49] group-hover:bg-[#ff5f49]">
                              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                            </div>
                          </div>
                        </div>

                        {/* Información inferior */}
                        <div className="bg-[#f4f0e7] px-5 py-6 transition-colors duration-300 group-hover:bg-[#e8e1d4]">
                          <div className="flex items-end justify-between gap-5">
                            <div>
                              <p className="mb-2 text-[7px] font-bold uppercase tracking-[0.22em] text-[#14263d]/35">
                                Inversión individual
                              </p>

                              <span className="text-lg font-black tracking-[-0.025em] text-[#14263d]">
                                {formatPrice(exp.price)}
                              </span>
                            </div>

                            <span className="max-w-[100px] text-right text-[7px] font-bold uppercase leading-relaxed tracking-[0.17em] text-[#14263d]/35">
                              <T>por persona. IVA Incluido</T>
                            </span>
                          </div>

                          <div className="mt-6 flex items-center gap-3 border-t border-[#14263d]/15 pt-4">
                            <span className="h-px w-8 bg-[#ff5f49] transition-all duration-300 group-hover:w-14" />

                            <span className="text-[7px] font-bold uppercase tracking-[0.22em] text-[#14263d]/35">
                              Consultar experiencia
                            </span>
                          </div>
                        </div>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function ExperienciasPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#eee8dc]">
          <div className="relative flex h-24 w-24 items-center justify-center border border-[#14263d]/20">
            <div className="absolute inset-3 border border-[#14263d]/10" />

            <Loader2 className="relative z-10 h-8 w-8 animate-spin text-[#ff5f49]" />
          </div>
        </div>
      }
    >
      <ExperienciasContent />
    </Suspense>
  );
}