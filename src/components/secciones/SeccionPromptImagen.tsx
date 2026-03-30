"use client";

import CopyButton from "@/components/CopyButton";
import type { SeccionPromptsImagen } from "@/types";

interface Props {
  data: SeccionPromptsImagen;
}

const TIPO_COLORS: Record<string, string> = {
  editorial: "bg-blue-50 border-blue-200 text-blue-700",
  thumbnail: "bg-purple-50 border-purple-200 text-purple-700",
  poster: "bg-emerald-50 border-emerald-200 text-emerald-700",
};

export default function SeccionPromptImagen({ data }: Props) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-500">
        3 prompts narrativos para Nanobanana (Gemini 2.5 Flash Image).
        Escritos como Director Creativo con estructura de 9 elementos.
      </p>

      {data.prompts.map((prompt, i) => (
        <div
          key={i}
          className="rounded-xl border border-gray-200 overflow-hidden"
        >
          <div className="bg-gray-50 px-5 py-3 flex items-center justify-between border-b border-gray-200">
            <div className="flex items-center gap-3">
              <span
                className={`badge ${
                  TIPO_COLORS[prompt.tipo] || "bg-gray-100 text-gray-700"
                }`}
              >
                {prompt.tipo}
              </span>
              <h4 className="font-semibold text-dark-800 text-sm">
                {prompt.titulo}
              </h4>
            </div>
            <CopyButton text={prompt.prompt} />
          </div>
          <div className="p-5">
            <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
              {prompt.prompt}
            </p>
          </div>
        </div>
      ))}

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <p className="text-xs font-semibold text-amber-700 uppercase mb-1">
          Reglas Aplicadas
        </p>
        <ul className="text-xs text-amber-600 space-y-1">
          <li>- Narrativos como Director Creativo (nunca listas de tags)</li>
          <li>- Estructura: tipo + sujeto + accion + ambiente + iluminacion + composicion + estilo + texto + formato</li>
          <li>- Personas latinas en contexto laboral real</li>
          <li>- Iluminacion calida y espacio para texto</li>
        </ul>
      </div>
    </div>
  );
}
