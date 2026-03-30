"use client";

import { useState } from "react";
import CopyButton from "@/components/CopyButton";
import type { SeccionPromptsVideo } from "@/types";

interface Props {
  data: SeccionPromptsVideo;
}

export default function SeccionPromptVideo({ data }: Props) {
  const [filtro, setFiltro] = useState<"todos" | "TikTok" | "Facebook">(
    "todos"
  );

  const promptsFiltrados =
    filtro === "todos"
      ? data.prompts
      : data.prompts.filter((p) => p.plataforma === filtro);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Prompts completos para Veo 3.1 (100-150 palabras cada uno).
        </p>
        <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
          {(["todos", "TikTok", "Facebook"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFiltro(f)}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-all capitalize ${
                filtro === f
                  ? "bg-white shadow-sm text-dark-800"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {promptsFiltrados.map((prompt, i) => (
          <div
            key={i}
            className="rounded-xl border border-gray-200 overflow-hidden"
          >
            <div className="bg-gray-50 px-5 py-3 flex items-center justify-between border-b border-gray-200">
              <div className="flex items-center gap-3">
                <span
                  className={`badge ${
                    prompt.plataforma === "TikTok"
                      ? "bg-pink-100 text-pink-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {prompt.plataforma}
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
              <div className="mt-3 flex gap-4 text-xs text-gray-400">
                <span>{prompt.prompt.split(/\s+/).length} palabras</span>
                <span>8 seg · 24 FPS · 1080p</span>
                <span>
                  {prompt.plataforma === "TikTok" ? "9:16" : "16:9"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-violet-50 border border-violet-200 rounded-lg p-4">
        <p className="text-xs font-semibold text-violet-700 uppercase mb-1">
          Reglas Veo 3.1
        </p>
        <ul className="text-xs text-violet-600 space-y-1">
          <li>- Duracion fija: 8 segundos por escena</li>
          <li>- Audio SIEMPRE incluido: voiceover + ambiental + musica</li>
          <li>- TikTok: voz masculina urgente / Facebook: voz femenina profesional</li>
          <li>- Imagen de Nanobanana como ingrediente de referencia</li>
        </ul>
      </div>
    </div>
  );
}
