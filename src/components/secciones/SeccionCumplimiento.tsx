"use client";

import type { SeccionCumplimiento as SeccionCumplimientoType } from "@/types";

interface Props {
  data: SeccionCumplimientoType;
}

export default function SeccionCumplimiento({ data }: Props) {
  const plataformas = Array.from(new Set(data.items.map((i) => i.plataforma)));
  const todoCumple = data.items.every((i) => i.cumple);

  return (
    <div className="space-y-4">
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-lg ${
          todoCumple
            ? "bg-emerald-50 border border-emerald-200"
            : "bg-red-50 border border-red-200"
        }`}
      >
        <span className="text-2xl">{todoCumple ? "✅" : "⚠️"}</span>
        <div>
          <p
            className={`font-semibold text-sm ${
              todoCumple ? "text-emerald-700" : "text-red-700"
            }`}
          >
            {todoCumple
              ? "Todo el contenido cumple con las politicas"
              : "Se encontraron violaciones de politicas"}
          </p>
          <p className="text-xs text-gray-500">
            {data.items.filter((i) => i.cumple).length} de {data.items.length}{" "}
            reglas verificadas
          </p>
        </div>
      </div>

      {plataformas.map((plataforma) => {
        const items = data.items.filter((i) => i.plataforma === plataforma);
        return (
          <div key={plataforma} className="rounded-xl border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 px-5 py-3 border-b border-gray-200">
              <h4 className="font-semibold text-dark-800 text-sm">
                {plataforma}
              </h4>
            </div>
            <div className="divide-y divide-gray-100">
              {items.map((item, i) => (
                <div
                  key={i}
                  className="px-5 py-3 flex items-start gap-3 hover:bg-gray-50"
                >
                  <span
                    className={`text-sm mt-0.5 ${
                      item.cumple ? "text-emerald-500" : "text-red-500"
                    }`}
                  >
                    {item.cumple ? "✓" : "✗"}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm text-dark-800">{item.regla}</p>
                    {item.nota && (
                      <p className="text-xs text-gray-500 mt-0.5">
                        {item.nota}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {data.alertas.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
          <h4 className="font-semibold text-amber-800 text-sm mb-3 flex items-center gap-2">
            <span>⚠️</span> Precauciones
          </h4>
          <ul className="space-y-2">
            {data.alertas.map((alerta, i) => (
              <li
                key={i}
                className="text-sm text-amber-700 flex items-start gap-2"
              >
                <span className="text-amber-400 mt-1">-</span>
                {alerta}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
