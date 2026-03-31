"use client";

import Link from "next/link";
import { useAppStore } from "@/lib/store";

const ESTADO_LABELS: Record<string, { label: string; class: string }> = {
  generando: { label: "Generando...", class: "badge-warning" },
  generado: { label: "Generado", class: "badge-success" },
  imagenes_creadas: { label: "Imagenes Listas", class: "badge-info" },
  videos_creados: { label: "Videos Listos", class: "badge-info" },
  publicado: { label: "Publicado", class: "badge-success" },
};

export default function PaquetesRecientes() {
  const { paquetes } = useAppStore();

  if (paquetes.length === 0) return null;

  const recientes = paquetes.slice(0, 6);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-dark-900">
          Paquetes Recientes
        </h2>
        {paquetes.length > 6 && (
          <Link
            href="/historial"
            className="text-sm text-purple-500 hover:text-purple-600 font-medium"
          >
            Ver todos ({paquetes.length})
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {recientes.map((paquete) => {
          const estado = ESTADO_LABELS[paquete.estado] || ESTADO_LABELS.generado;
          return (
            <Link
              key={paquete.id}
              href={`/paquete?id=${paquete.id}`}
              className="section-card hover:border-purple-300 transition-all group"
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-dark-800 group-hover:text-purple-600 transition-colors">
                  {paquete.tema}
                </h3>
                <span className={estado.class}>{estado.label}</span>
              </div>
              <p className="text-xs text-gray-400">
                {new Date(paquete.fechaCreacion).toLocaleDateString("es-MX", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
              <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
                <span className="capitalize">{paquete.configuracion.tono}</span>
                <span>·</span>
                <span className="capitalize">
                  {paquete.configuracion.plataforma}
                </span>
                <span>·</span>
                <span>{paquete.configuracion.pais}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
