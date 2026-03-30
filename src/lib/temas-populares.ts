export interface CategoriaEmpleo {
  nombre: string;
  icono: string;
  temas: string[];
}

export const CATEGORIAS: CategoriaEmpleo[] = [
  {
    nombre: "Restaurantes",
    icono: "🍳",
    temas: [
      "Auxiliar de cocina",
      "Mesero",
      "Barista",
      "Repartidor de comida",
      "Panadero",
      "Lavaplatos",
    ],
  },
  {
    nombre: "Seguridad",
    icono: "🛡️",
    temas: [
      "Guardia de seguridad",
      "Vigilante nocturno",
      "Oficial de seguridad privada",
      "Monitorista CCTV",
    ],
  },
  {
    nombre: "Retail",
    icono: "🛒",
    temas: [
      "Cajero de tienda",
      "Vendedor de piso",
      "Bodeguero",
      "Reponedor de mercancía",
    ],
  },
  {
    nombre: "Servicios",
    icono: "📞",
    temas: [
      "Recepcionista",
      "Agente de call center",
      "Atención al cliente",
      "Asistente administrativo",
    ],
  },
  {
    nombre: "Logística",
    icono: "🚛",
    temas: [
      "Repartidor por app",
      "Chofer de reparto",
      "Empacador",
      "Operador de montacargas",
    ],
  },
  {
    nombre: "Construcción",
    icono: "🏗️",
    temas: [
      "Ayudante de obra",
      "Electricista ayudante",
      "Pintor de casas",
      "Jardinero",
    ],
  },
  {
    nombre: "Limpieza",
    icono: "🧹",
    temas: [
      "Personal de limpieza",
      "Ama de llaves hotel",
      "Conserje",
      "Técnico de mantenimiento",
    ],
  },
];
