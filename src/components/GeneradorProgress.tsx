"use client";

import { NOMBRES_SECCIONES, type NombreSeccion } from "@/types";

interface GeneradorProgressProps {
  seccionActual: number;
  tema: string;
}

const secciones = Object.entries(NOMBRES_SECCIONES);

export default function GeneradorProgress({
  seccionActual,
  tema,
}: GeneradorProgressProps) {
  return (
    <div className="fixed inset-0 z-50 bg-dark-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 animate-fade-in">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-brand-500 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse-slow">
            <span className="text-3xl">⚡</span>
          </div>
          <h2 className="text-xl font-bold text-dark-900">
            Generando Paquete
          </h2>
          <p className="text-gray-500 mt-1">
            Tema: <span className="font-medium text-dark-700">{tema}</span>
          </p>
        </div>

        <div className="space-y-2">
          {secciones.map(([_key, nombre], index) => {
            const isCompleted = index < seccionActual;
            const isCurrent = index === seccionActual;

            return (
              <div
                key={nombre}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${
                  isCompleted
                    ? "bg-emerald-50"
                    : isCurrent
                    ? "bg-purple-50 border border-purple-200"
                    : "bg-gray-50"
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                    isCompleted
                      ? "bg-emerald-500 text-white"
                      : isCurrent
                      ? "bg-purple-500 text-white animate-pulse"
                      : "bg-gray-200 text-gray-400"
                  }`}
                >
                  {isCompleted ? "✓" : index + 1}
                </div>
                <span
                  className={`text-sm ${
                    isCompleted
                      ? "text-emerald-700 font-medium"
                      : isCurrent
                      ? "text-purple-700 font-medium"
                      : "text-gray-400"
                  }`}
                >
                  {nombre}
                </span>
                {isCurrent && (
                  <div className="ml-auto flex gap-1">
                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-6">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-purple-400 to-brand-500 h-2 rounded-full transition-all duration-500"
              style={{
                width: `${((seccionActual) / secciones.length) * 100}%`,
              }}
            />
          </div>
          <p className="text-xs text-gray-400 text-center mt-2">
            {seccionActual} de {secciones.length} secciones completadas
          </p>
        </div>
      </div>
    </div>
  );
}
