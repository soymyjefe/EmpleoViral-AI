"use client";

import CopyButton from "@/components/CopyButton";
import type { SeccionNombreOferta } from "@/types";

interface Props {
  data: SeccionNombreOferta;
}

export default function SeccionNombre({ data }: Props) {
  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-purple-50 to-purple-100/50 rounded-xl p-6 border border-purple-200">
        <p className="text-xs font-semibold text-purple-600 uppercase tracking-wider mb-2">
          Nombre Principal
        </p>
        <p className="text-2xl font-bold text-dark-900">{data.principal}</p>
        <div className="mt-3">
          <CopyButton text={data.principal} />
        </div>
      </div>

      <div>
        <p className="text-sm font-semibold text-gray-600 mb-3">
          Variantes A/B para Testing
        </p>
        <div className="space-y-2">
          {data.variantes.map((variante, i) => (
            <div
              key={i}
              className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3 border border-gray-100"
            >
              <span className="text-sm text-dark-800 font-medium">
                <span className="text-gray-400 mr-2">
                  Variante {String.fromCharCode(65 + i)}:
                </span>
                {variante}
              </span>
              <CopyButton text={variante} label="" className="!px-2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
