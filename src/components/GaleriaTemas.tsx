"use client";

import { CATEGORIAS } from "@/lib/temas-populares";

interface GaleriaTemasProps {
  onSelectTema: (tema: string) => void;
}

export default function GaleriaTemas({ onSelectTema }: GaleriaTemasProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-dark-900">
          Temas Populares
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Toca cualquier tema para generar el paquete al instante
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {CATEGORIAS.map((categoria) => (
          <div key={categoria.nombre} className="section-card">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">{categoria.icono}</span>
              <h3 className="font-semibold text-dark-800">
                {categoria.nombre}
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {categoria.temas.map((tema) => (
                <button
                  key={tema}
                  onClick={() => onSelectTema(tema)}
                  className="px-3 py-1.5 bg-gray-50 hover:bg-purple-50 hover:text-purple-600 border border-gray-200 hover:border-purple-300 rounded-lg text-sm text-gray-700 transition-all"
                >
                  {tema}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
