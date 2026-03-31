"use client";

import { useState } from "react";
import CopyButton from "@/components/CopyButton";
import type { SeccionFlujoProduccion } from "@/types";

interface Props {
  data: SeccionFlujoProduccion;
}

export default function SeccionFlujo({ data }: Props) {
  const [version, setVersion] = useState<"A" | "B">("A");
  const pasos = version === "A" ? data.versionA : data.versionB;

  const formatPasos = () =>
    pasos.map((p) => `${p.numero}. ${p.descripcion}`).join("\n");

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setVersion("A")}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
              version === "A"
                ? "bg-white shadow-sm text-dark-800"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Version A (7 pasos)
          </button>
          <button
            onClick={() => setVersion("B")}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
              version === "B"
                ? "bg-white shadow-sm text-dark-800"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Version B (10 pasos)
          </button>
        </div>
        <CopyButton text={formatPasos()} />
      </div>

      <div className="space-y-3">
        {pasos.map((paso) => (
          <div
            key={paso.numero}
            className="flex gap-4 items-start bg-gray-50 rounded-lg px-5 py-4 border border-gray-100 hover:border-purple-200 transition-colors"
          >
            <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
              {paso.numero}
            </div>
            <p className="text-sm text-dark-700 leading-relaxed pt-1">
              {paso.descripcion}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-gray-50 rounded-xl border border-gray-200 p-5">
        <h4 className="font-semibold text-dark-800 text-sm mb-3">
          Tabla de Metricas (llena post-publicacion)
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-3 py-2 text-left text-gray-600 font-semibold">
                  Metrica
                </th>
                <th className="px-3 py-2 text-center text-gray-600 font-semibold">
                  TikTok
                </th>
                <th className="px-3 py-2 text-center text-gray-600 font-semibold">
                  Facebook
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                "Views",
                "Watch Time promedio",
                "Clics al enlace",
                "CTR",
                "Compartidos",
                "Comentarios",
              ].map((metrica) => (
                <tr key={metrica} className="border-b border-gray-100">
                  <td className="px-3 py-2 text-gray-700">{metrica}</td>
                  <td className="px-3 py-2 text-center text-gray-400">
                    —
                  </td>
                  <td className="px-3 py-2 text-center text-gray-400">
                    —
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
