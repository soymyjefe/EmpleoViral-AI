"use client";

import CopyButton from "@/components/CopyButton";
import type { SeccionTextoEnPantalla } from "@/types";

interface Props {
  data: SeccionTextoEnPantalla;
}

export default function SeccionTexto({ data }: Props) {
  const formatTabla = (t: typeof data.tablas[0]) => {
    return t.lineas
      .map((l) => `[${l.segundo}] ${l.texto}\nEstilo: ${l.estilo}`)
      .join("\n\n");
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-500">
        Tablas de sincronizacion para superponer textos en el video.
      </p>

      {data.tablas.map((tabla, ti) => (
        <div
          key={ti}
          className="rounded-xl border border-gray-200 overflow-hidden"
        >
          <div className="bg-gray-50 px-5 py-3 flex items-center justify-between border-b border-gray-200">
            <div className="flex items-center gap-3">
              <span
                className={`badge ${
                  tabla.plataforma === "TikTok"
                    ? "bg-pink-100 text-pink-700"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                {tabla.plataforma}
              </span>
              <h4 className="font-semibold text-dark-800 text-sm">
                {tabla.titulo}
              </h4>
            </div>
            <CopyButton text={formatTabla(tabla)} />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-4 py-2.5 text-left font-semibold text-gray-600 w-28">
                    Segundo
                  </th>
                  <th className="px-4 py-2.5 text-left font-semibold text-gray-600">
                    Texto
                  </th>
                  <th className="px-4 py-2.5 text-left font-semibold text-gray-600 w-72">
                    Estilo
                  </th>
                </tr>
              </thead>
              <tbody>
                {tabla.lineas.map((linea, li) => (
                  <tr
                    key={li}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="px-4 py-3 font-mono text-xs text-purple-600 font-semibold whitespace-nowrap">
                      {linea.segundo}
                    </td>
                    <td className="px-4 py-3 font-medium text-dark-800 whitespace-pre-wrap">
                      {linea.texto}
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-500 italic">
                      {linea.estilo}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}
