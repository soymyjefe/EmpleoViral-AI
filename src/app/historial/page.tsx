"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAppStore } from "@/lib/store";

const ESTADO_CONFIG: Record<string, { label: string; class: string }> = {
  generando: { label: "Generando", class: "badge-warning" },
  generado: { label: "Generado", class: "badge-success" },
  imagenes_creadas: { label: "Imagenes", class: "badge-info" },
  videos_creados: { label: "Videos", class: "badge-info" },
  publicado: { label: "Publicado", class: "badge-success" },
};

export default function HistorialPage() {
  const { paquetes, eliminarPaquete } = useAppStore();
  const [filtro, setFiltro] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const paquetesFiltrados = filtro
    ? paquetes.filter((p) =>
        p.tema.toLowerCase().includes(filtro.toLowerCase())
      )
    : paquetes;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-dark-900">
            Historial de Paquetes
          </h1>
          <p className="text-sm text-gray-500">
            {paquetes.length} paquete{paquetes.length !== 1 ? "s" : ""} generado
            {paquetes.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Link href="/" className="btn-primary text-sm !py-2.5">
          + Nuevo Paquete
        </Link>
      </div>

      {paquetes.length > 0 && (
        <input
          type="text"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          placeholder="Buscar por tema..."
          className="input-field max-w-md"
        />
      )}

      {paquetesFiltrados.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-6xl mb-4">📭</p>
          <h2 className="text-xl font-bold text-dark-900 mb-2">
            {paquetes.length === 0
              ? "Sin paquetes generados"
              : "Sin resultados"}
          </h2>
          <p className="text-gray-500 mb-6">
            {paquetes.length === 0
              ? "Genera tu primer paquete de contenido viral."
              : "No se encontraron paquetes con ese filtro."}
          </p>
          {paquetes.length === 0 && (
            <Link href="/" className="btn-primary">
              Crear Primer Paquete
            </Link>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {paquetesFiltrados.map((paquete) => {
            const estado =
              ESTADO_CONFIG[paquete.estado] || ESTADO_CONFIG.generado;
            return (
              <div
                key={paquete.id}
                className="section-card flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 hover:border-brand-300 transition-all"
              >
                <Link
                  href={`/paquete?id=${paquete.id}`}
                  className="flex-1 min-w-0"
                >
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-semibold text-dark-800 hover:text-brand-600 transition-colors truncate">
                      {paquete.tema}
                    </h3>
                    <span className={estado.class}>{estado.label}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span>
                      {new Date(paquete.fechaCreacion).toLocaleDateString(
                        "es-MX",
                        {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </span>
                    <span>·</span>
                    <span className="capitalize">
                      {paquete.configuracion.tono}
                    </span>
                    <span>·</span>
                    <span className="capitalize">
                      {paquete.configuracion.plataforma}
                    </span>
                    <span>·</span>
                    <span>{paquete.configuracion.pais}</span>
                  </div>
                </Link>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Link
                    href={`/paquete?id=${paquete.id}`}
                    className="btn-ghost text-sm"
                  >
                    Ver
                  </Link>
                  <button
                    onClick={() => eliminarPaquete(paquete.id)}
                    className="btn-ghost text-sm text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
