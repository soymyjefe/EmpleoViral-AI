"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Paquete, Configuracion } from "@/types";

interface AppState {
  paquetes: Paquete[];
  paqueteActual: Paquete | null;
  generando: boolean;
  progresoSeccion: number;
  configuracion: Configuracion;

  setConfiguracion: (config: Partial<Configuracion>) => void;
  setPaqueteActual: (paquete: Paquete | null) => void;
  agregarPaquete: (paquete: Paquete) => void;
  actualizarPaquete: (id: string, datos: Partial<Paquete>) => void;
  eliminarPaquete: (id: string) => void;
  setGenerando: (estado: boolean) => void;
  setProgresoSeccion: (seccion: number) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      paquetes: [],
      paqueteActual: null,
      generando: false,
      progresoSeccion: 0,
      configuracion: {
        pais: "México",
        tono: "urgente",
        plataforma: "ambas",
      },

      setConfiguracion: (config) =>
        set((state) => ({
          configuracion: { ...state.configuracion, ...config },
        })),

      setPaqueteActual: (paquete) => set({ paqueteActual: paquete }),

      agregarPaquete: (paquete) =>
        set((state) => ({
          paquetes: [paquete, ...state.paquetes],
        })),

      actualizarPaquete: (id, datos) =>
        set((state) => ({
          paquetes: state.paquetes.map((p) =>
            p.id === id ? { ...p, ...datos } : p
          ),
          paqueteActual:
            state.paqueteActual?.id === id
              ? { ...state.paqueteActual, ...datos }
              : state.paqueteActual,
        })),

      eliminarPaquete: (id) =>
        set((state) => ({
          paquetes: state.paquetes.filter((p) => p.id !== id),
          paqueteActual:
            state.paqueteActual?.id === id ? null : state.paqueteActual,
        })),

      setGenerando: (estado) => set({ generando: estado }),
      setProgresoSeccion: (seccion) => set({ progresoSeccion: seccion }),
    }),
    {
      name: "empleoviral-storage",
    }
  )
);
