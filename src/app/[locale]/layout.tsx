import "../globals.css";
import { ClientBody } from "@/app/ClientBody";
import { ReactNode } from "react";
import type { Metadata } from "next";

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export const metadata: Metadata = {
  title: "Mapira | Agencia Boutique de Viajes",
  description:
    "Diseñamos itinerarios extraordinarios. Desde refugios ocultos entre la selva hasta estancias privadas junto al mar. Una forma de viajar sin complicaciones.",
};

export default async function RootLayout({
  children,
  params,
}: Props) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;

  return (
    <html lang={locale}>
      <ClientBody locale={locale}>{children}</ClientBody>
    </html>
  );
}