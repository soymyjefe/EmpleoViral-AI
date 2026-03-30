export interface Paquete {
  id: string;
  tema: string;
  fechaCreacion: string;
  estado: "generando" | "generado" | "imagenes_creadas" | "videos_creados" | "publicado";
  configuracion: Configuracion;
  secciones: Secciones;
}

export interface Configuracion {
  pais: string;
  tono: "urgente" | "profesional" | "casual";
  plataforma: "tiktok" | "facebook" | "ambas";
}

export interface Secciones {
  nombreOferta: SeccionNombreOferta;
  promptsImagen: SeccionPromptsImagen;
  scriptsVideo: SeccionScriptsVideo;
  promptsVideo: SeccionPromptsVideo;
  textoEnPantalla: SeccionTextoEnPantalla;
  descripcionTiktok: SeccionDescripcionTiktok;
  descripcionFacebook: SeccionDescripcionFacebook;
  cumplimiento: SeccionCumplimiento;
  flujoProduccion: SeccionFlujoProduccion;
}

export interface SeccionNombreOferta {
  principal: string;
  variantes: string[];
}

export interface PromptImagen {
  titulo: string;
  tipo: string;
  prompt: string;
}

export interface SeccionPromptsImagen {
  prompts: PromptImagen[];
}

export interface LineaScript {
  segundo: string;
  audio: string;
  accionPantalla: string;
}

export interface VersionScript {
  titulo: string;
  descripcion: string;
  lineas: LineaScript[];
}

export interface SeccionScriptsVideo {
  versiones: VersionScript[];
}

export interface PromptVideo {
  titulo: string;
  plataforma: "TikTok" | "Facebook";
  escena?: number;
  prompt: string;
}

export interface SeccionPromptsVideo {
  prompts: PromptVideo[];
}

export interface LineaTexto {
  segundo: string;
  texto: string;
  estilo: string;
}

export interface TablaTexto {
  titulo: string;
  plataforma: string;
  lineas: LineaTexto[];
}

export interface SeccionTextoEnPantalla {
  tablas: TablaTexto[];
}

export interface SeccionDescripcionTiktok {
  versionA: string;
  versionB: string;
  estrategia: string;
}

export interface SeccionDescripcionFacebook {
  versionA: string;
  versionB: string;
  estrategia: string;
}

export interface ItemCumplimiento {
  plataforma: string;
  regla: string;
  cumple: boolean;
  nota?: string;
}

export interface SeccionCumplimiento {
  items: ItemCumplimiento[];
  alertas: string[];
}

export interface PasoProduccion {
  numero: number;
  descripcion: string;
}

export interface SeccionFlujoProduccion {
  versionA: PasoProduccion[];
  versionB: PasoProduccion[];
}

export type NombreSeccion = keyof Secciones;

export const NOMBRES_SECCIONES: Record<NombreSeccion, string> = {
  nombreOferta: "1. Nombre de la Oferta",
  promptsImagen: "2. Prompts de Imagen",
  scriptsVideo: "3. Scripts del Video",
  promptsVideo: "4. Prompts de Video",
  textoEnPantalla: "5. Texto en Pantalla",
  descripcionTiktok: "6. Descripción TikTok",
  descripcionFacebook: "7. Descripción Facebook",
  cumplimiento: "8. Cumplimiento de Políticas",
  flujoProduccion: "9. Flujo de Producción",
};
