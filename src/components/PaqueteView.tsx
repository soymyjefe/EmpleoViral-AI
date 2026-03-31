"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useAppStore } from "@/lib/store";
import { NOMBRES_SECCIONES, type NombreSeccion } from "@/types";
import SeccionNombre from "@/components/secciones/SeccionNombre";
import SeccionPromptImagen from "@/components/secciones/SeccionPromptImagen";
import SeccionScript from "@/components/secciones/SeccionScript";
import SeccionPromptVideo from "@/components/secciones/SeccionPromptVideo";
import SeccionTexto from "@/components/secciones/SeccionTexto";
import SeccionDescripcion from "@/components/secciones/SeccionDescripcion";
import SeccionCumplimiento from "@/components/secciones/SeccionCumplimiento";
import SeccionFlujo from "@/components/secciones/SeccionFlujo";

const SECCIONES_ORDER: NombreSeccion[] = [
  "nombreOferta",
  "promptsImagen",
  "scriptsVideo",
  "promptsVideo",
  "textoEnPantalla",
  "descripcionTiktok",
  "descripcionFacebook",
  "cumplimiento",
  "flujoProduccion",
];

const SECCION_ICONS: Record<NombreSeccion, string> = {
  nombreOferta: "🏷️",
  promptsImagen: "🎨",
  scriptsVideo: "📝",
  promptsVideo: "🎬",
  textoEnPantalla: "💬",
  descripcionTiktok: "📱",
  descripcionFacebook: "📘",
  cumplimiento: "✅",
  flujoProduccion: "🔄",
};

export default function PaqueteView() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { paquetes, eliminarPaquete } = useAppStore();
  const id = searchParams.get("id");
  const [seccionActiva, setSeccionActiva] = useState<NombreSeccion>("nombreOferta");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const paquete = paquetes.find((p) => p.id === id);

  if (!paquete) {
    return (
      <div className="text-center py-20">
        <p className="text-6xl mb-4">📦</p>
        <h2 className="text-2xl font-bold text-dark-900 mb-2">
          Paquete no encontrado
        </h2>
        <p className="text-gray-500 mb-6">
          Este paquete no existe o fue eliminado.
        </p>
        <Link href="/" className="btn-primary">
          Volver al Inicio
        </Link>
      </div>
    );
  }

  const renderSeccion = () => {
    switch (seccionActiva) {
      case "nombreOferta":
        return <SeccionNombre data={paquete.secciones.nombreOferta} />;
      case "promptsImagen":
        return <SeccionPromptImagen data={paquete.secciones.promptsImagen} />;
      case "scriptsVideo":
        return <SeccionScript data={paquete.secciones.scriptsVideo} />;
      case "promptsVideo":
        return <SeccionPromptVideo data={paquete.secciones.promptsVideo} />;
      case "textoEnPantalla":
        return <SeccionTexto data={paquete.secciones.textoEnPantalla} />;
      case "descripcionTiktok":
        return (
          <SeccionDescripcion
            plataforma="TikTok"
            versionA={paquete.secciones.descripcionTiktok.versionA}
            versionB={paquete.secciones.descripcionTiktok.versionB}
            estrategia={paquete.secciones.descripcionTiktok.estrategia}
          />
        );
      case "descripcionFacebook":
        return (
          <SeccionDescripcion
            plataforma="Facebook"
            versionA={paquete.secciones.descripcionFacebook.versionA}
            versionB={paquete.secciones.descripcionFacebook.versionB}
            estrategia={paquete.secciones.descripcionFacebook.estrategia}
          />
        );
      case "cumplimiento":
        return <SeccionCumplimiento data={paquete.secciones.cumplimiento} />;
      case "flujoProduccion":
        return <SeccionFlujo data={paquete.secciones.flujoProduccion} />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
            <Link href="/" className="hover:text-purple-500">
              Inicio
            </Link>
            <span>/</span>
            <span>Paquete</span>
          </div>
          <h1 className="text-2xl font-bold text-dark-900">
            {paquete.tema}
          </h1>
          <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
            <span className="badge-success">
              {paquete.estado === "generado" ? "Generado" : paquete.estado}
            </span>
            <span>
              {new Date(paquete.fechaCreacion).toLocaleDateString("es-MX", {
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
            <span className="capitalize">{paquete.configuracion.tono}</span>
            <span className="capitalize">{paquete.configuracion.plataforma}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/" className="btn-outline text-sm !py-2">
            Nuevo Paquete
          </Link>
          <button
            onClick={() => {
              eliminarPaquete(paquete.id);
              router.push("/");
            }}
            className="btn-ghost text-sm !py-2 text-red-500 hover:text-red-700 hover:bg-red-50"
          >
            Eliminar
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar - Navegacion de Secciones */}
        <aside className="lg:w-72 flex-shrink-0">
          <div className="sticky top-24 space-y-1">
            {SECCIONES_ORDER.map((key) => (
              <button
                key={key}
                onClick={() => setSeccionActiva(key)}
                className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all flex items-center gap-3 ${
                  seccionActiva === key
                    ? "bg-purple-50 text-purple-700 border border-purple-200"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
                }`}
              >
                <span className="text-base">
                  {SECCION_ICONS[key]}
                </span>
                <span>{NOMBRES_SECCIONES[key]}</span>
              </button>
            ))}

            {/* Mini Cumplimiento Sidebar */}
            <div className="mt-4 bg-gray-50 rounded-xl p-4 border border-gray-200">
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Cumplimiento
              </h4>
              {["Facebook", "TikTok", "AdSense"].map((p) => {
                const items = paquete.secciones.cumplimiento.items.filter(
                  (i) => i.plataforma === p
                );
                const cumple = items.every((i) => i.cumple);
                return (
                  <div
                    key={p}
                    className="flex items-center justify-between py-1.5"
                  >
                    <span className="text-xs text-gray-600">{p}</span>
                    <span
                      className={`text-xs font-semibold ${
                        cumple ? "text-emerald-600" : "text-red-600"
                      }`}
                    >
                      {cumple ? "✓ OK" : "✗ Alerta"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Contenido Principal */}
        <div className="flex-1 min-w-0">
          <div className="section-card p-6 animate-fade-in" key={seccionActiva}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-dark-900 flex items-center gap-3">
                <span className="text-xl">
                  {SECCION_ICONS[seccionActiva]}
                </span>
                {NOMBRES_SECCIONES[seccionActiva]}
              </h2>
            </div>
            {renderSeccion()}
          </div>
        </div>
      </div>
    </div>
  );
}
