"use client";

import CopyButton from "@/components/CopyButton";
import type { SeccionScriptsVideo } from "@/types";

interface Props {
  data: SeccionScriptsVideo;
}

export default function SeccionScript({ data }: Props) {
  const formatVersion = (v: typeof data.versiones[0]) => {
    return v.lineas
      .map((l) => `[${l.segundo}]\nAudio: ${l.audio}\nPantalla: ${l.accionPantalla}`)
      .join("\n\n");
  };

  return (
    <div className="space-y-6">
      <p className="text-sm text-gray-500">
        Scripts con timestamps segundo a segundo. Version A (8 seg) y Version B
        (24 seg).
      </p>

      {data.versiones.map((version, vi) => (
        <div key={vi} className="rounded-xl border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 px-5 py-3 flex items-center justify-between border-b border-gray-200">
            <div>
              <h4 className="font-semibold text-dark-800 text-sm">
                {version.titulo}
              </h4>
              <p className="text-xs text-gray-500">{version.descripcion}</p>
            </div>
            <CopyButton text={formatVersion(version)} />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-4 py-2.5 text-left font-semibold text-gray-600 w-32">
                    Segundo
                  </th>
                  <th className="px-4 py-2.5 text-left font-semibold text-gray-600">
                    Audio (Voiceover)
                  </th>
                  <th className="px-4 py-2.5 text-left font-semibold text-gray-600">
                    Accion en Pantalla
                  </th>
                </tr>
              </thead>
              <tbody>
                {version.lineas.map((linea, li) => (
                  <tr
                    key={li}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="px-4 py-3 font-mono text-xs text-brand-600 font-semibold whitespace-nowrap">
                      {linea.segundo}
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      {linea.audio}
                    </td>
                    <td className="px-4 py-3 text-gray-600 italic">
                      {linea.accionPantalla}
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
