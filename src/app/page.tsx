"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { useAppStore } from "@/lib/store";
import { generarPaqueteCompleto } from "@/lib/generador";
import ConfigPanel from "@/components/ConfigPanel";
import GaleriaTemas from "@/components/GaleriaTemas";
import PaquetesRecientes from "@/components/PaquetesRecientes";
import GeneradorProgress from "@/components/GeneradorProgress";
import type { Paquete } from "@/types";

export default function HomePage() {
  const router = useRouter();
  const [tema, setTema] = useState("");
  const [showConfig, setShowConfig] = useState(false);
  const {
    configuracion,
    generando,
    progresoSeccion,
    setGenerando,
    setProgresoSeccion,
    agregarPaquete,
    setPaqueteActual,
    paquetes,
  } = useAppStore();

  const generarPaquete = useCallback(
    async (temaInput: string) => {
      const temaLimpio = temaInput.trim();
      if (!temaLimpio) return;

      setGenerando(true);
      setProgresoSeccion(0);

      // Simular generación progresiva
      for (let i = 0; i < 9; i++) {
        await new Promise((resolve) => setTimeout(resolve, 300 + Math.random() * 200));
        setProgresoSeccion(i + 1);
      }

      const secciones = generarPaqueteCompleto(temaLimpio, configuracion);

      const nuevoPaquete: Paquete = {
        id: uuidv4(),
        tema: temaLimpio,
        fechaCreacion: new Date().toISOString(),
        estado: "generado",
        configuracion: { ...configuracion },
        secciones,
      };

      agregarPaquete(nuevoPaquete);
      setPaqueteActual(nuevoPaquete);
      setGenerando(false);
      setProgresoSeccion(0);
      setTema("");

      router.push(`/paquete?id=${nuevoPaquete.id}`);
    },
    [configuracion, setGenerando, setProgresoSeccion, agregarPaquete, setPaqueteActual, router]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Detectar modo lote
    const temas = tema
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    if (temas.length > 1) {
      // Modo lote: generar el primero y luego los demas
      generarPaquete(temas[0]);
      // TODO: En la version con API, generar todos en paralelo
    } else {
      generarPaquete(tema);
    }
  };

  const paquetesHoy = paquetes.filter((p) => {
    const hoy = new Date().toDateString();
    return new Date(p.fechaCreacion).toDateString() === hoy;
  }).length;

  return (
    <>
      {generando && (
        <GeneradorProgress seccionActual={progresoSeccion} tema={tema} />
      )}

      <div className="space-y-10">
        {/* Hero + Input */}
        <section className="text-center pt-8 pb-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-dark-900 mb-3">
            Contenido Viral de Empleo
            <span className="text-brand-500"> en Minutos</span>
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-8">
            Escribe un tema de empleo y genera un paquete completo de 9
            secciones listo para TikTok y Facebook.
          </p>

          <form
            onSubmit={handleSubmit}
            className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-3"
          >
            <div className="relative flex-1">
              <input
                type="text"
                value={tema}
                onChange={(e) => setTema(e.target.value)}
                placeholder="Ej: Auxiliar de cocina en restaurante"
                className="input-field text-lg py-4 pr-12"
                disabled={generando}
              />
              <button
                type="button"
                onClick={() => setShowConfig(!showConfig)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Configuracion"
              >
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                  />
                </svg>
              </button>
            </div>
            <button
              type="submit"
              disabled={!tema.trim() || generando}
              className="btn-primary text-lg py-4 px-8 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {generando ? "Generando..." : "Generar Paquete"}
            </button>
          </form>

          <p className="text-xs text-gray-400 mt-3">
            Separa con comas para modo lote: "Mesero, Cajero, Repartidor"
            {paquetesHoy > 0 && (
              <span className="ml-2">
                · {paquetesHoy} paquete{paquetesHoy > 1 ? "s" : ""} hoy
              </span>
            )}
          </p>
        </section>

        {/* Config Panel (collapsible) */}
        {showConfig && (
          <div className="max-w-md mx-auto animate-slide-up">
            <ConfigPanel />
          </div>
        )}

        {/* Paquetes Recientes */}
        <PaquetesRecientes />

        {/* Galeria de Temas */}
        <GaleriaTemas onSelectTema={(t) => { setTema(t); generarPaquete(t); }} />
      </div>
    </>
  );
}
