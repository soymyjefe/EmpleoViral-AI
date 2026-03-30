"use client";

import { useState } from "react";
import CopyButton from "@/components/CopyButton";

interface Props {
  plataforma: "TikTok" | "Facebook";
  versionA: string;
  versionB: string;
  estrategia: string;
}

export default function SeccionDescripcion({
  plataforma,
  versionA,
  versionB,
  estrategia,
}: Props) {
  const [version, setVersion] = useState<"A" | "B">("A");

  const colorClass =
    plataforma === "TikTok"
      ? "bg-pink-50 border-pink-200 text-pink-700"
      : "bg-blue-50 border-blue-200 text-blue-700";

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setVersion("A")}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
              version === "A"
                ? "bg-white shadow-sm text-dark-800"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Version A — Conciso
          </button>
          <button
            onClick={() => setVersion("B")}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
              version === "B"
                ? "bg-white shadow-sm text-dark-800"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Version B — Detallado
          </button>
        </div>
      </div>

      <div className={`rounded-xl border p-5 ${colorClass.replace("text-", "").includes("pink") ? "bg-pink-50/50 border-pink-100" : "bg-blue-50/50 border-blue-100"}`}>
        <div className="flex items-center justify-between mb-3">
          <span className={`badge ${colorClass}`}>
            {plataforma}
          </span>
          <CopyButton text={version === "A" ? versionA : versionB} label="Copiar para pegar" />
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-100">
          <p className="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">
            {version === "A" ? versionA : versionB}
          </p>
        </div>
      </div>

      <details className="group">
        <summary className="cursor-pointer text-sm font-medium text-gray-600 hover:text-gray-800 flex items-center gap-2">
          <svg
            className="w-4 h-4 transition-transform group-open:rotate-90"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          Estrategia de Publicacion
        </summary>
        <div className="mt-3 bg-gray-50 rounded-lg p-4 text-sm text-gray-700 whitespace-pre-wrap">
          {estrategia}
        </div>
      </details>
    </div>
  );
}
