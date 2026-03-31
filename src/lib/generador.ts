import type {
  Secciones,
  Configuracion,
  SeccionNombreOferta,
  SeccionPromptsImagen,
  SeccionScriptsVideo,
  SeccionPromptsVideo,
  SeccionTextoEnPantalla,
  SeccionDescripcionTiktok,
  SeccionDescripcionFacebook,
  SeccionCumplimiento,
  SeccionFlujoProduccion,
} from "@/types";

// ─── Utilidad de aleatorización ───
function elegir<T>(opciones: T[]): T {
  return opciones[Math.floor(Math.random() * opciones.length)];
}

function mezclar<T>(arr: T[]): T[] {
  const copia = [...arr];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

// ─── Pools de variaciones ───
const HOOKS = {
  urgente: [
    (tema: string) => `¡Atención! Están buscando ${tema} y las vacantes se llenan rápido!`,
    (tema: string) => `¡Urgente! Necesitan ${tema} de inmediato — quedan pocas vacantes!`,
    (tema: string) => `¡Ojo! Están contratando ${tema} HOY — no dejes pasar esta oportunidad!`,
    (tema: string) => `¡Alerta de empleo! Buscan ${tema} con urgencia en tu zona!`,
    (tema: string) => `¡Esto es para ti! Hay vacantes de ${tema} que se agotan esta semana!`,
  ],
  profesional: [
    (tema: string) => `Si estás buscando empleo como ${tema}, te tenemos buenas noticias.`,
    (tema: string) => `Hay una oportunidad laboral como ${tema} que podría interesarte.`,
    (tema: string) => `Se abrieron nuevas vacantes de ${tema} con excelentes condiciones.`,
    (tema: string) => `¿Buscas trabajo como ${tema}? Mira lo que encontramos para ti.`,
    (tema: string) => `Nueva oportunidad: están solicitando ${tema} con buenos beneficios.`,
  ],
  casual: [
    (tema: string) => `¡Hey! Están buscando ${tema} y el trabajo se ve bastante bien!`,
    (tema: string) => `Mira esto: hay chamba de ${tema} disponible cerca de ti!`,
    (tema: string) => `¡Buenas noticias! Hay trabajo de ${tema} y no piden experiencia!`,
    (tema: string) => `¿Necesitas trabajo? Están pidiendo ${tema} y suena genial!`,
    (tema: string) => `Oye, encontré esto: buscan ${tema} y los beneficios están buenos!`,
  ],
};

const BENEFICIOS_SETS = [
  ["Salario competitivo", "Horario flexible", "Sin experiencia requerida"],
  ["Buen sueldo", "Turnos a tu medida", "Te capacitan desde cero"],
  ["Pago puntual quincenal", "Horarios que se adaptan a ti", "No piden experiencia"],
  ["Salario atractivo", "Flexibilidad de horario", "Capacitación incluida"],
  ["Sueldo competitivo", "Elige tu horario", "Prestaciones desde el día 1"],
];

const CTAS_TIKTOK = [
  "Más detalles desde nuestro perfil",
  "Visita nuestro perfil para toda la info",
  "Toda la información en nuestro perfil",
  "Entra a nuestro perfil para más detalles",
  "Checa nuestro perfil para conocer los requisitos",
];

const CTAS_FACEBOOK = [
  "Envíanos un mensaje para más información",
  "Contáctanos por mensaje directo",
  "Escríbenos un mensaje para conocer los detalles",
  "Mándanos un mensaje y te damos toda la info",
  "Envía un mensaje para recibir los requisitos completos",
];

const CIERRES_URGENCIA = [
  "Las vacantes se llenan rápido",
  "Las plazas son limitadas",
  "No dejes pasar esta oportunidad",
  "Quedan pocos lugares disponibles",
  "Las vacantes se agotan en días",
];

const THUMBNAIL_TITULOS = [
  "SE BUSCAN",
  "VACANTES ABIERTAS",
  "ESTÁN CONTRATANDO",
  "HAY TRABAJO",
  "SE NECESITAN",
];

const THUMBNAIL_BANNERS = [
  "VACANTES DISPONIBLES",
  "CONTRATACIÓN INMEDIATA",
  "APLICA AHORA",
  "PLAZAS ABIERTAS",
  "¡URGENTE!",
];

const POSTER_TITULOS_PREFIX = [
  "VACANTE:",
  "SE SOLICITA:",
  "OPORTUNIDAD LABORAL:",
  "EMPLEO DISPONIBLE:",
  "BUSCAMOS:",
];

const POSTER_BENEFICIOS = [
  { icono: "dinero", texto: "Salario Competitivo" },
  { icono: "dinero", texto: "Buen Sueldo" },
  { icono: "dinero", texto: "Pago Quincenal Puntual" },
  { icono: "reloj", texto: "Horario Flexible" },
  { icono: "reloj", texto: "Turnos Adaptables" },
  { icono: "reloj", texto: "Elige Tu Horario" },
  { icono: "ubicación", texto: "Múltiples Ubicaciones" },
  { icono: "ubicación", texto: "Cerca de Tu Zona" },
  { icono: "ubicación", texto: "Varios Establecimientos" },
  { icono: "capacitación", texto: "Capacitación Incluida" },
  { icono: "capacitación", texto: "Te Capacitan Desde Cero" },
  { icono: "prestaciones", texto: "Prestaciones de Ley" },
  { icono: "prestaciones", texto: "Prestaciones Desde el Día 1" },
];

const POSTER_CTA = [
  "MÁS INFORMACIÓN",
  "CONOCE LOS DETALLES",
  "VER REQUISITOS",
  "INFÓRMATE AQUÍ",
  "DESCUBRE MÁS",
];

const EMOJIS_TITULO = ["🔥", "⚡", "✅", "🚀", "💼", "📢", "🎯", "💰"];

const SUFIJOS = {
  urgente: [
    "Vacantes Disponibles HOY",
    "Contratación Inmediata",
    "Se Buscan Urgente",
    "Plazas Abiertas — ¡Aplica Ya!",
    "Vacantes que Se Agotan Rápido",
  ],
  profesional: [
    "Oportunidad Laboral",
    "Vacante Disponible",
    "Nueva Oportunidad",
    "Posición Abierta",
    "Oferta de Empleo",
  ],
  casual: [
    "Están Contratando",
    "Hay Trabajo",
    "Se Necesita Personal",
    "Hay Chamba Disponible",
    "Están Buscando Gente",
  ],
};

const HASHTAGS_POOL = [
  "#empleo", "#trabajo", "#vacantes", "#buscotrabajo", "#empleourgente",
  "#contratacioninmediata", "#trabajoenmexico", "#vacantesdisponibles",
  "#oportunidadlaboral", "#empleos2024", "#trabajosinexperiencia",
  "#recursoshumanos", "#bolsadetrabajo", "#chambadisponible",
  "#empleodisponible", "#trabajoya", "#buscochamba", "#ofertalaboral",
  "#empleonuevo", "#contratando",
];

// ─── Generador principal ───
export function generarPaqueteCompleto(
  tema: string,
  config: Configuracion
): Secciones {
  return {
    nombreOferta: generarNombreOferta(tema, config),
    promptsImagen: generarPromptsImagen(tema, config),
    scriptsVideo: generarScriptsVideo(tema, config),
    promptsVideo: generarPromptsVideo(tema, config),
    textoEnPantalla: generarTextoEnPantalla(tema, config),
    descripcionTiktok: generarDescripcionTiktok(tema, config),
    descripcionFacebook: generarDescripcionFacebook(tema, config),
    cumplimiento: generarCumplimiento(tema),
    flujoProduccion: generarFlujoProduccion(),
  };
}

function generarNombreOferta(
  tema: string,
  config: Configuracion
): SeccionNombreOferta {
  const temaCapitalizado = tema.charAt(0).toUpperCase() + tema.slice(1);
  const opciones = mezclar(SUFIJOS[config.tono]);
  const emojis = mezclar(EMOJIS_TITULO);

  return {
    principal: `${emojis[0]} ${temaCapitalizado} — ${opciones[0]}!`,
    variantes: [
      `${emojis[1]} ${temaCapitalizado} — ${opciones[1]}!`,
      `${emojis[2]} ${temaCapitalizado} — ${opciones[2]}!`,
      `${emojis[3]} ${opciones[3] || opciones[0]}: ${temaCapitalizado}!`,
    ],
  };
}

function generarPromptsImagen(
  tema: string,
  _config: Configuracion
): SeccionPromptsImagen {
  const thumbTitulo = elegir(THUMBNAIL_TITULOS);
  const thumbBanner = elegir(THUMBNAIL_BANNERS);
  const posterPrefix = elegir(POSTER_TITULOS_PREFIX);
  const posterCta = elegir(POSTER_CTA);

  // Elegir 3 beneficios de diferentes categorías para el póster
  const categorias = ["dinero", "reloj", "ubicación"];
  const beneficiosElegidos = categorias.map((cat) => {
    const opciones = POSTER_BENEFICIOS.filter((b) => b.icono === cat);
    return elegir(opciones);
  });

  return {
    prompts: [
      {
        titulo: "Prompt A — Fotografía Editorial",
        tipo: "editorial",
        prompt: `Fotografía editorial en formato vertical 9:16 de una persona latina de entre 25 y 35 años trabajando como ${tema} en un ambiente laboral auténtico. La persona viste uniforme profesional limpio y apropiado para el puesto, realiza su labor con expresión concentrada y satisfecha. El escenario es un espacio de trabajo real con elementos propios del oficio de ${tema}, iluminación golden hour cálida que entra por ventanales laterales creando un resplandor dorado sobre la escena. Composición con regla de tercios, sujeto en el tercio inferior derecho, tercio superior izquierdo completamente libre para superponer texto. Profundidad de campo moderada con fondo ligeramente desenfocado. Estilo de fotografía editorial para revista de negocios, colores cálidos saturados, resolución alta, aspecto profesional e inspirador.`,
      },
      {
        titulo: "Prompt B — Thumbnail con Texto",
        tipo: "thumbnail",
        prompt: `Imagen de alto impacto visual en formato vertical 9:16 diseñada como thumbnail viral. Fondo con fotografía de un ambiente de trabajo relacionado con ${tema}, tratada con overlay oscuro semitransparente al 60% para máximo contraste. En el centro superior, texto grande en tipografía bold sans-serif blanca con borde negro que dice "${thumbTitulo}" en mayúsculas. Debajo, en tipografía ligeramente menor pero igualmente bold, el texto "${tema.toUpperCase()}" en color amarillo brillante (#FFD700). En la parte inferior, un banner rojo con texto blanco "${thumbBanner}". Composición centrada, simétrica, diseñada para captar la atención en menos de 1 segundo. Estilo de diseño gráfico para redes sociales, colores vibrantes de alto contraste.`,
      },
      {
        titulo: "Prompt C — Póster Informativo",
        tipo: "poster",
        prompt: `Póster informativo profesional en formato vertical 9:16 con fondo de fotografía desenfocada (bokeh) de un ambiente laboral relacionado con ${tema}. Sobre el fondo desenfocado, un panel semitransparente blanco con bordes redondeados ocupa el 70% central de la imagen. En la parte superior del panel, título en tipografía bold negra: "${posterPrefix} ${tema.toUpperCase()}". Debajo del título, tres filas con íconos minimalistas a la izquierda y texto descriptivo en español: ícono de ${beneficiosElegidos[0].icono} + "${beneficiosElegidos[0].texto}", ícono de ${beneficiosElegidos[1].icono} + "${beneficiosElegidos[1].texto}", ícono de ${beneficiosElegidos[2].icono} + "${beneficiosElegidos[2].texto}". En la parte inferior del panel, botón con fondo naranja vibrante (#F97316) y texto blanco bold: "${posterCta}". Estilo de diseño limpio y corporativo, tipografía moderna, colores cálidos profesionales.`,
      },
    ],
  };
}

function generarScriptsVideo(
  tema: string,
  config: Configuracion
): SeccionScriptsVideo {
  const temaCapitalizado = tema.charAt(0).toUpperCase() + tema.slice(1);
  const ctaTiktok = elegir(CTAS_TIKTOK);
  const ctaFacebook = elegir(CTAS_FACEBOOK);
  const cta = config.plataforma === "facebook" ? ctaFacebook : ctaTiktok;
  const hook = elegir(HOOKS[config.tono])(temaCapitalizado);
  const beneficios = elegir(BENEFICIOS_SETS);
  const cierre = elegir(CIERRES_URGENCIA);

  const hookExtendido = elegir([
    `¡Esto te interesa! Varios establecimientos de tu zona están buscando ${temaCapitalizado} con urgencia! Y lo mejor es que no importa si no tienes experiencia, ellos te capacitan desde cero!`,
    `¡Escucha bien! Hay lugares cerca de ti que necesitan ${temaCapitalizado} ya! Lo mejor de todo es que no necesitas experiencia previa, te enseñan todo desde el primer día!`,
    `¡No te lo pierdas! Están solicitando ${temaCapitalizado} en varios puntos de tu ciudad! Y lo bueno es que aceptan sin experiencia y te dan capacitación completa!`,
    `¡Para de scrollear! Hay vacantes de ${temaCapitalizado} abriéndose en tu zona ahora mismo! No piden experiencia y te entrenan desde cero!`,
    `¡Atención buscadores de empleo! Se necesitan ${temaCapitalizado} urgentemente! La mejor parte: no importa si nunca has trabajado en esto, te preparan completamente!`,
  ]);

  const beneficiosExtendido = elegir([
    `Mira los beneficios: ${beneficios[0].toLowerCase()} que se paga puntual cada quincena, ${beneficios[1].toLowerCase()} para que acomodes tu vida personal, y prestaciones desde el primer día!`,
    `Los beneficios son increíbles: ${beneficios[0].toLowerCase()}, ${beneficios[1].toLowerCase()} que puedes elegir, y todas las prestaciones de ley desde que entras!`,
    `Te ofrecen: ${beneficios[0].toLowerCase()} con pago seguro, ${beneficios[1].toLowerCase()} para que te organices, y prestaciones completas desde el inicio!`,
    `Esto es lo que ofrecen: ${beneficios[0].toLowerCase()}, ${beneficios[1].toLowerCase()}, y además prestaciones de ley desde tu primer día de trabajo!`,
  ]);

  const cierreScript = elegir([
    `¡No dejes pasar esta oportunidad! ${cierre}. ¡${ctaTiktok}!`,
    `¡Muévete rápido! ${cierre}. ¡${ctaTiktok}!`,
    `¡Es ahora o nunca! ${cierre}. ¡${ctaTiktok}!`,
    `¡Aprovecha antes de que sea tarde! ${cierre}. ¡${ctaTiktok}!`,
  ]);

  return {
    versiones: [
      {
        titulo: "Versión A — Video Único (8 segundos)",
        descripcion:
          "Video compacto de 8 segundos con hook, oferta y CTA.",
        lineas: [
          {
            segundo: "0–2 seg",
            audio: hook,
            accionPantalla: `Close-up dinámico de persona trabajando como ${tema}. Texto animado: "${elegir(THUMBNAIL_TITULOS)} ${tema.toUpperCase()}"`,
          },
          {
            segundo: "2–5 seg",
            audio: `${beneficios[0]}, ${beneficios[1].toLowerCase()} y ${beneficios[2].toLowerCase()}!`,
            accionPantalla: `Transición a plano medio del ambiente laboral. Aparecen 3 íconos de beneficios con texto: ${beneficios[0].toLowerCase()}, ${beneficios[1].toLowerCase()}, ${beneficios[2].toLowerCase()}.`,
          },
          {
            segundo: "5–8 seg",
            audio: `¡${cta}! ${cierre}!`,
            accionPantalla: `Zoom out revelando el espacio completo. Banner CTA parpadeante: "${ctaTiktok.toUpperCase()}" con flecha animada.`,
          },
        ],
      },
      {
        titulo: "Versión B — Video Extendido (3×8 seg = 24 seg)",
        descripcion:
          "Video de 3 escenas de 8 segundos cada una para mayor impacto.",
        lineas: [
          {
            segundo: "Escena 1: 0–8 seg",
            audio: hookExtendido,
            accionPantalla: `Dolly forward hacia persona latina preparándose para trabajar. Texto grande: "URGENTE: ${elegir(THUMBNAIL_TITULOS)} ${tema.toUpperCase()}". Transición a plano medio mostrando el ambiente de trabajo real.`,
          },
          {
            segundo: "Escena 2: 8–16 seg",
            audio: beneficiosExtendido,
            accionPantalla: `Slow pan lateral por el espacio de trabajo. Aparecen 3 cards animadas: "${beneficios[0]}", "${beneficios[1]}", "Prestaciones de Ley". Cada card entra con slide-up.`,
          },
          {
            segundo: "Escena 3: 16–24 seg",
            audio: cierreScript,
            accionPantalla: `Close-up de persona sonriendo satisfecha en su trabajo. Banner final: "${ctaTiktok.toUpperCase()}" con animación de pulso. Logo y URL.`,
          },
        ],
      },
    ],
  };
}

function generarPromptsVideo(
  tema: string,
  _config: Configuracion
): SeccionPromptsVideo {
  const temaCapitalizado = tema.charAt(0).toUpperCase() + tema.slice(1);
  const hookTk = elegir(HOOKS.urgente)(temaCapitalizado);
  const beneficios = elegir(BENEFICIOS_SETS);
  const ctaTk = elegir(CTAS_TIKTOK);
  const ctaFb = elegir(CTAS_FACEBOOK);
  const cierre = elegir(CIERRES_URGENCIA);

  const edadTk = elegir([25, 26, 27, 28, 29, 30]);
  const edadFb = elegir([28, 29, 30, 31, 32, 33]);
  const cabelloTk = elegir(["cabello oscuro corto", "cabello negro ondulado", "cabello castaño corto"]);
  const cabelloFb = elegir(["cabello recogido", "cabello oscuro en coleta", "cabello castaño recogido"]);
  const movCamaraTk = elegir(["Dolly forward cinematográfico", "Push-in suave cinematográfico", "Steadicam avanzando"]);
  const movCamaraFb = elegir(["Tracking shot lateral cinematográfico", "Slow dolly lateral", "Steadicam lateral suave"]);
  const musicaTk = elegir(["beat urbano rítmico", "beat latino energético", "ritmo trap suave", "beat lo-fi dinámico"]);
  const musicaFb = elegir(["instrumental corporativo suave y motivacional", "piano ambiental inspirador", "instrumental acústico cálido", "música corporativa minimalista"]);

  return {
    prompts: [
      {
        titulo: "Versión A — TikTok (9:16)",
        plataforma: "TikTok",
        prompt: `${movCamaraTk} hacia una persona latina de ${edadTk} años, piel morena, ${cabelloTk}, vistiendo uniforme profesional limpio de ${tema}, que se prepara con determinación en su estación de trabajo. El escenario es un establecimiento real de ${tema} con iluminación cálida golden hour, equipos y herramientas del oficio visibles al fondo con bokeh suave. La cámara avanza suavemente mientras la persona realiza sus tareas con profesionalismo. Voiceover masculino joven en español latinoamericano, tono urgente y entusiasta: "${hookTk} ${beneficios[0]}, ${beneficios[1].toLowerCase()} y ${beneficios[2].toLowerCase()}! ¡${ctaTk}!" Audio ambiental sutil del entorno laboral de ${tema}. Música de fondo: ${musicaTk} a volumen bajo. Color grading cálido cinematográfico con tonos dorados. Duración exacta: 8 segundos, 24 FPS, 1080p, formato vertical 9:16.`,
      },
      {
        titulo: "Versión A — Facebook (16:9)",
        plataforma: "Facebook",
        prompt: `${movCamaraFb} por un establecimiento de ${tema}, mostrando a una persona latina de ${edadFb} años, ${cabelloFb}, uniforme profesional impecable, realizando sus labores con confianza y sonrisa sutil. El espacio está iluminado con luz cálida natural, ambiente profesional y acogedor. La cámara se desplaza suavemente revelando el entorno laboral completo. Voiceover femenino profesional en español latinoamericano, tono cálido y confiable: "¿Buscas empleo como ${temaCapitalizado}? Hay vacantes disponibles con ${beneficios[0].toLowerCase()} y ${beneficios[1].toLowerCase()}. ${ctaFb}." Audio ambiental del entorno de trabajo. Música de fondo: ${musicaFb}. Color grading cálido con tonos naturales. Duración exacta: 8 segundos, 24 FPS, 1080p, formato horizontal 16:9.`,
      },
      {
        titulo: "Versión B — Escena 1 TikTok (9:16)",
        plataforma: "TikTok",
        escena: 1,
        prompt: `Close-up dramático con transición a plano medio de una persona latina de ${edadTk} años, piel morena, ${cabelloTk}, uniforme de ${tema}, que levanta la vista hacia la cámara con expresión decidida mientras se prepara en su estación de trabajo. El establecimiento tiene iluminación golden hour cálida, herramientas y equipos del oficio visibles. Dolly back lento revelando el espacio completo. Voiceover masculino joven urgente en español latinoamericano: "${elegir([
          `¡Esto te interesa! Varios establecimientos de tu zona están buscando ${temaCapitalizado} con urgencia! Y lo mejor es que no importa si no tienes experiencia, ellos te capacitan desde cero!`,
          `¡Para de scrollear! Necesitan ${temaCapitalizado} en tu zona y las vacantes no van a durar! Lo mejor: aceptan sin experiencia y te entrenan!`,
          `¡Escucha bien! Hay lugares buscando ${temaCapitalizado} ahora mismo! No piden experiencia, te capacitan completamente desde el día uno!`,
        ])}" Sonido ambiental del entorno laboral. Beat urbano energético de fondo. Color grading dorado cinematográfico. 8 segundos, 24 FPS, 1080p, 9:16.`,
      },
      {
        titulo: "Versión B — Escena 2 TikTok (9:16)",
        plataforma: "TikTok",
        escena: 2,
        prompt: `Slow pan lateral cinematográfico por el interior de un establecimiento de ${tema}, mismo sujeto latino de ${edadTk} años del plano anterior (misma ropa, mismo ${cabelloTk}) ahora realizando sus tareas con fluidez y profesionalismo. La cámara revela diferentes áreas del espacio de trabajo mientras la persona interactúa con su entorno. Iluminación cálida constante. Voiceover masculino joven entusiasta: "${elegir([
          `Mira los beneficios: ${beneficios[0].toLowerCase()} que se paga puntual cada quincena, ${beneficios[1].toLowerCase()} para que acomodes tu vida personal, y prestaciones desde el primer día!`,
          `Los beneficios son geniales: ${beneficios[0].toLowerCase()}, ${beneficios[1].toLowerCase()}, y prestaciones de ley completas desde que empiezas!`,
          `Te ofrecen: ${beneficios[0].toLowerCase()} con pago seguro, ${beneficios[1].toLowerCase()}, y todas las prestaciones desde el día uno!`,
        ])}" Sonido ambiental del trabajo. ${elegir(["Beat urbano rítmico", "Beat latino suave", "Ritmo lo-fi dinámico"])}. Color grading cálido. 8 segundos, 24 FPS, 1080p, 9:16.`,
      },
      {
        titulo: "Versión B — Escena 3 TikTok (9:16)",
        plataforma: "TikTok",
        escena: 3,
        prompt: `Medium close-up del mismo sujeto latino de ${edadTk} años (misma ropa, mismo look) sonriendo con satisfacción al completar una tarea como ${tema}. La cámara se acerca suavemente en un push-in emocional. Iluminación cálida golden hour envolvente. El sujeto mira brevemente a cámara con expresión invitadora. Voiceover masculino joven con urgencia de cierre: "¡${elegir(["No dejes pasar esta oportunidad", "Muévete rápido", "Aprovecha ahora", "Es tu momento"])}! ${cierre}. ¡${ctaTk}!" Sonido ambiental suave. Beat urbano con crescendo final. Color grading dorado. 8 segundos, 24 FPS, 1080p, 9:16.`,
      },
      {
        titulo: "Versión B — Escena 1 Facebook (16:9)",
        plataforma: "Facebook",
        escena: 1,
        prompt: `Wide establishing shot de un establecimiento de ${tema}, con iluminación natural cálida. Una persona latina de ${edadFb} años, ${cabelloFb}, uniforme profesional, entra al encuadre y se ubica en su estación de trabajo con confianza. La cámara realiza un slow zoom-in suave. Voiceover femenino profesional en español latinoamericano: "${elegir([
          `Si estás buscando una oportunidad laboral como ${temaCapitalizado}, te tenemos buenas noticias. Hay establecimientos en tu zona con vacantes disponibles y no requieren experiencia previa.`,
          `Hay buenas noticias si buscas empleo como ${temaCapitalizado}. Varios lugares de tu zona están contratando y no necesitas experiencia para aplicar.`,
          `¿Te interesa trabajar como ${temaCapitalizado}? Se abrieron vacantes en tu zona con excelentes condiciones y sin requisito de experiencia.`,
        ])}" Sonido ambiental del entorno. ${elegir(["Música instrumental corporativa motivacional", "Piano ambiental inspirador", "Instrumental acústico cálido"])}. Color grading cálido natural. 8 segundos, 24 FPS, 1080p, 16:9.`,
      },
      {
        titulo: "Versión B — Escena 2 Facebook (16:9)",
        plataforma: "Facebook",
        escena: 2,
        prompt: `Tracking shot a nivel de hombro siguiendo a la misma persona latina de ${edadFb} años (mismo uniforme, ${cabelloFb}) mientras trabaja en sus tareas como ${tema}. El espacio es amplio, bien iluminado con luz cálida, ambiente profesional. La cámara captura la dinámica del trabajo. Voiceover femenino profesional: "${elegir([
          `Los beneficios incluyen ${beneficios[0].toLowerCase()} con pago quincenal puntual, ${beneficios[1].toLowerCase()} que se adaptan a tu disponibilidad, y prestaciones de ley desde tu primer día de trabajo.`,
          `Te ofrecen ${beneficios[0].toLowerCase()}, ${beneficios[1].toLowerCase()} para que organices tu tiempo, y prestaciones completas desde el inicio.`,
          `Entre los beneficios están: ${beneficios[0].toLowerCase()} garantizado, ${beneficios[1].toLowerCase()}, y todas las prestaciones de ley desde que comienzas.`,
        ])}" Audio ambiental suave. Instrumental corporativo continuo. Color grading cálido. 8 segundos, 24 FPS, 1080p, 16:9.`,
      },
      {
        titulo: "Versión B — Escena 3 Facebook (16:9)",
        plataforma: "Facebook",
        escena: 3,
        prompt: `Medium shot de la misma persona latina de ${edadFb} años (continuidad: mismo uniforme, ${cabelloFb}) terminando su jornada con satisfacción, organizando su espacio de trabajo de ${tema} con una sonrisa genuina. La cámara realiza un slow pull-back elegante revelando el establecimiento completo. Voiceover femenino profesional con tono de cierre: "${elegir([
          `No dejes pasar esta oportunidad. ${ctaFb}. ${cierre}.`,
          `Esta oportunidad no va a durar mucho. ${ctaFb}. ${cierre}.`,
          `Si te interesa, actúa rápido. ${ctaFb}. ${cierre}.`,
        ])}" Audio ambiental. Instrumental corporativo con resolución suave. Color grading cálido. 8 segundos, 24 FPS, 1080p, 16:9.`,
      },
      {
        titulo: "Versión C — Narrativo TikTok (9:16) — Sin Diálogo",
        plataforma: "TikTok",
        prompt: `Secuencia cinematográfica puramente visual sin diálogos ni voiceover. Una persona latina de ${edadTk} años, piel morena, ${cabelloTk}, uniforme profesional de ${tema}, realiza sus tareas laborales con destreza y concentración. La cámara alterna entre: close-up de las manos trabajando, plano medio del sujeto en acción, y wide shot del establecimiento completo. Los personajes NO hablan ni miran a cámara en ningún momento — todo es observacional, estilo documental. Sin voiceover. Audio únicamente ambiental: sonidos reales del entorno de trabajo de ${tema} (utensilios, máquinas, ambiente). Música de fondo: ${elegir(["beat lo-fi relajado y rítmico", "beat chill hop suave", "melodía lo-fi ambiental", "ritmo lo-fi instrumental"])} que transmite rutina y satisfacción laboral. Iluminación golden hour cálida, color grading cinematográfico dorado. Montaje fluido con transiciones suaves. Duración exacta: 8 segundos, 24 FPS, 1080p, formato vertical 9:16.`,
      },
      {
        titulo: "Versión C — Narrativo Facebook (16:9) — Sin Diálogo",
        plataforma: "Facebook",
        prompt: `Secuencia cinematográfica puramente visual sin diálogos ni voiceover. Una persona latina de ${edadFb} años, ${cabelloFb}, uniforme profesional impecable de ${tema}, realiza su jornada laboral con profesionalismo y calma. La cámara fluye como documental observacional: tracking shot siguiendo al sujeto mientras trabaja, insert shots de detalles del oficio, plano general del espacio laboral. Los personajes NO hablan ni interactúan con la cámara — todo es natural y espontáneo. Sin voiceover. Audio únicamente ambiental: sonidos auténticos del entorno de trabajo de ${tema}. Música de fondo: ${elegir(["instrumental suave y motivacional, estilo corporativo minimalista", "piano ambiental con cuerdas suaves", "instrumental acústico sereno y profesional", "melodía corporativa cálida y elegante"])}. Iluminación natural cálida, color grading con tonos naturales y acogedores. Montaje elegante y pausado. Duración exacta: 8 segundos, 24 FPS, 1080p, formato horizontal 16:9.`,
      },
    ],
  };
}

function generarTextoEnPantalla(
  tema: string,
  _config: Configuracion
): SeccionTextoEnPantalla {
  const temaUpper = tema.toUpperCase();
  const tituloThumb = elegir(THUMBNAIL_TITULOS);
  const ctaTkTexto = elegir(["MÁS INFO DESDE NUESTRO PERFIL ↗️", "DETALLES EN NUESTRO PERFIL ↗️", "VISITA NUESTRO PERFIL ↗️", "TODA LA INFO EN NUESTRO PERFIL ↗️"]);
  const ctaFbTexto = elegir(["CONTÁCTANOS POR MENSAJE ↓", "ENVÍANOS UN MENSAJE ↓", "ESCRÍBENOS POR MENSAJE ↓", "MÁNDANOS UN MENSAJE ↓"]);
  const beneficios = elegir(BENEFICIOS_SETS);

  return {
    tablas: [
      {
        titulo: "Versión A — TikTok",
        plataforma: "TikTok",
        lineas: [
          {
            segundo: "0–2 seg",
            texto: `${tituloThumb} ${temaUpper}`,
            estilo:
              "Bold blanco 48px, sombra negra, centro superior. Animación: scale-in rápido.",
          },
          {
            segundo: "2–4 seg",
            texto: `💰 ${beneficios[0]}\n⏰ ${beneficios[1]}`,
            estilo:
              "Blanco 32px, izquierda centro. Animación: slide-up secuencial.",
          },
          {
            segundo: "4–5 seg",
            texto: `📋 ${beneficios[2]}`,
            estilo:
              "Blanco 32px, izquierda centro. Animación: slide-up.",
          },
          {
            segundo: "5–8 seg",
            texto: ctaTkTexto,
            estilo:
              "Bold blanco 40px, fondo rojo (#EF4444), centro inferior. Animación: pulso suave.",
          },
        ],
      },
      {
        titulo: "Versión A — Facebook",
        plataforma: "Facebook",
        lineas: [
          {
            segundo: "0–2 seg",
            texto: `VACANTE: ${temaUpper}`,
            estilo:
              "Bold blanco 42px, sombra negra, centro superior. Animación: fade-in.",
          },
          {
            segundo: "2–5 seg",
            texto: `✓ ${beneficios[0]}  ✓ ${beneficios[1]}  ✓ Prestaciones`,
            estilo:
              "Blanco 28px, centro medio. Animación: typewriter.",
          },
          {
            segundo: "5–8 seg",
            texto: ctaFbTexto,
            estilo:
              "Bold blanco 36px, fondo naranja (#F97316), centro inferior. Animación: pulso.",
          },
        ],
      },
      {
        titulo: "Versión B — Escena 1 TikTok",
        plataforma: "TikTok",
        lineas: [
          {
            segundo: "0–3 seg",
            texto: `🔥 URGENTE: ${temaUpper}`,
            estilo:
              "Bold blanco 48px, sombra negra, centro. Animación: shake + scale.",
          },
          {
            segundo: "3–6 seg",
            texto: elegir(["Están contratando en tu zona", "Hay vacantes cerca de ti", "Están buscando gente en tu zona", "Contratación abierta en tu ciudad"]),
            estilo:
              "Blanco 32px, centro. Animación: fade-in.",
          },
          {
            segundo: "6–8 seg",
            texto: elegir(["¡SIN EXPERIENCIA! Te capacitan", "¡No piden experiencia! Te entrenan", "¡Aceptan sin experiencia!", "¡Te capacitan desde cero!"]),
            estilo:
              "Bold amarillo (#FFD700) 36px, centro. Animación: bounce.",
          },
        ],
      },
      {
        titulo: "Versión B — Escena 2 TikTok",
        plataforma: "TikTok",
        lineas: [
          {
            segundo: "0–3 seg",
            texto: `💰 ${beneficios[0]}\npago quincenal`,
            estilo:
              "Blanco 32px, izquierda. Card con fondo semi-transparente. Slide-in izquierda.",
          },
          {
            segundo: "3–5 seg",
            texto: `⏰ ${beneficios[1]}`,
            estilo:
              "Blanco 32px, centro. Card con fondo semi-transparente. Slide-in derecha.",
          },
          {
            segundo: "5–8 seg",
            texto: elegir(["📋 Prestaciones desde día 1", "📋 Prestaciones de ley completas", "📋 Beneficios desde el inicio"]),
            estilo:
              "Blanco 32px, derecha. Card con fondo semi-transparente. Slide-up.",
          },
        ],
      },
      {
        titulo: "Versión B — Escena 3 TikTok",
        plataforma: "TikTok",
        lineas: [
          {
            segundo: "0–3 seg",
            texto: elegir(["¡No dejes pasar esta oportunidad!", "¡Aprovecha ahora!", "¡Es tu momento!", "¡Muévete rápido!"]),
            estilo: "Bold blanco 36px, centro. Fade-in.",
          },
          {
            segundo: "3–6 seg",
            texto: elegir(["Las vacantes se llenan rápido", "Quedan pocos lugares", "Las plazas son limitadas", "Las vacantes se agotan pronto"]),
            estilo: "Blanco 28px con fondo rojo, centro. Slide-up.",
          },
          {
            segundo: "6–8 seg",
            texto: elegir(["MÁS DETALLES → NUESTRO PERFIL", "INFO COMPLETA → NUESTRO PERFIL", "VER MÁS → NUESTRO PERFIL", "TODA LA INFO → NUESTRO PERFIL"]),
            estilo:
              "Bold blanco 40px, fondo gradiente rojo-naranja, centro inferior. Pulso animado.",
          },
        ],
      },
      {
        titulo: "Versión B — Escena 1 Facebook",
        plataforma: "Facebook",
        lineas: [
          {
            segundo: "0–3 seg",
            texto: `${elegir(["OPORTUNIDAD LABORAL", "VACANTE DISPONIBLE", "EMPLEO DISPONIBLE"])}\n${temaUpper}`,
            estilo: "Bold blanco 40px, sombra, centro superior. Fade-in elegante.",
          },
          {
            segundo: "3–8 seg",
            texto: elegir([
              "Vacantes disponibles en tu zona\nSin experiencia requerida",
              "Están contratando cerca de ti\nNo necesitas experiencia",
              "Hay plazas abiertas en tu ciudad\nCapacitación incluida",
            ]),
            estilo: "Blanco 28px, centro. Animación suave fade.",
          },
        ],
      },
    ],
  };
}

function generarDescripcionTiktok(
  tema: string,
  _config: Configuracion
): SeccionDescripcionTiktok {
  const temaCapitalizado = tema.charAt(0).toUpperCase() + tema.slice(1);
  const temaHash = tema.toLowerCase().replace(/\s+/g, "");
  const ctaTk = elegir(CTAS_TIKTOK);
  const beneficios = elegir(BENEFICIOS_SETS);
  const cierre = elegir(CIERRES_URGENCIA);

  // Elegir hashtags aleatorios (10 del pool + el del tema)
  const hashtagsTema = `#${temaHash}`;
  const hashtagsAleatorios = mezclar(HASHTAGS_POOL).slice(0, 12);
  const hashtags = [hashtagsTema, ...hashtagsAleatorios].join(" ");

  const hookCorto = elegir(HOOKS.urgente)(temaCapitalizado);

  return {
    versionA: `🔥 ${hookCorto} ${beneficios[0]} + ${beneficios[1].toLowerCase()} + ${beneficios[2].toLowerCase()} 💰 ¡${ctaTk}! 👆 ¿Conoces a alguien que necesite trabajo? ¡Etiquétalo! 👇

${hashtags}`,
    versionB: `🔥 ¡VACANTES DE ${temaCapitalizado.toUpperCase()} — CONTRATACIÓN INMEDIATA!

✅ ${beneficios[0]} con pago quincenal
✅ ${beneficios[1]}
✅ Prestaciones de ley desde el día 1
✅ ${beneficios[2]}
✅ Capacitación incluida

⚡ ¡${cierre}! No pierdas esta oportunidad.

👆 ${ctaTk}.

¿Conoces a alguien que esté buscando trabajo? ¡Comparte este video! 🙌

${hashtags}`,
    estrategia: `📊 ESTRATEGIA DE PUBLICACIÓN TIKTOK:
• Horarios óptimos: ${elegir(["7-9 AM, 12-2 PM, 7-9 PM", "6-8 AM, 11-1 PM, 8-10 PM", "7-9 AM, 1-3 PM, 6-8 PM"])} (hora local).
• Responde TODOS los comentarios en las primeras 2 horas — el algoritmo premia la interacción.
• Comentario fijado sugerido: "👆 ${ctaTk}."
• Usa la función de Dueto/Stitch con otros videos de empleo para ampliar alcance.
• Publica 2-3 videos por día como mínimo para alimentar el algoritmo.`,
  };
}

function generarDescripcionFacebook(
  tema: string,
  _config: Configuracion
): SeccionDescripcionFacebook {
  const temaCapitalizado = tema.charAt(0).toUpperCase() + tema.slice(1);
  const temaHash = temaCapitalizado.replace(/\s+/g, "");
  const ctaFb = elegir(CTAS_FACEBOOK);
  const beneficios = elegir(BENEFICIOS_SETS);
  const cierre = elegir(CIERRES_URGENCIA);

  const hashtagsFb = `#Empleo #Trabajo #${temaHash} #Vacantes #OportunidadLaboral #BolsaDeTrabajo #ContrataciónInmediata #TrabajoEnMéxico`;

  return {
    versionA: `🔥 ¡Vacantes disponibles para ${temaCapitalizado}!

${beneficios[0]} + ${beneficios[1].toLowerCase()} + prestaciones de ley. ${beneficios[2]}.

📋 ${ctaFb}.

Comparte con quien necesite esta oportunidad 🙌

${hashtagsFb}`,
    versionB: `📢 VACANTE: ${temaCapitalizado.toUpperCase()} — CONTRATACIÓN INMEDIATA

📍 Ubicación: Varios establecimientos de tu zona

📌 Requisitos:
• Mayor de 18 años
• Disponibilidad de horario
• Actitud de servicio
• ${beneficios[2]}

💼 Beneficios:
• ${beneficios[0]} con pago quincenal puntual
• ${beneficios[1]}
• Prestaciones de ley desde el primer día
• Capacitación pagada
• Oportunidades de crecimiento

📋 ¿Interesado?
${ctaFb}.

⚠️ ${cierre}. Actúa lo antes posible.

📌 Disclaimer: Las vacantes son recopiladas de fuentes públicas de empleo.

Comparte esta publicación con alguien que esté buscando trabajo 🤝

${hashtagsFb} #EmpleoUrgente #SinExperiencia`,
    estrategia: `📊 ESTRATEGIA DE PUBLICACIÓN FACEBOOK:
• Horarios óptimos: ${elegir(["9-11 AM y 1-3 PM entre semana; domingos 10 AM-12 PM", "8-10 AM y 2-4 PM entre semana; sábados 9-11 AM", "10 AM-12 PM y 3-5 PM entre semana; domingos 11 AM-1 PM"])}.
• Comparte en grupos de empleo de la zona (mínimo 5 grupos por publicación).
• Responde comentarios con información adicional para aumentar alcance orgánico.
• Usa Facebook Stories para repostear el video con sticker de "${elegir(["Envíanos Mensaje", "Contáctanos", "Escríbenos"])}".
• Programa publicaciones con Meta Business Suite para consistencia.`,
  };
}

function generarCumplimiento(_tema: string): SeccionCumplimiento {
  return {
    items: [
      {
        plataforma: "Facebook",
        regla: "Sin promesas de ingresos específicos",
        cumple: true,
        nota: 'Se usa "salario competitivo" sin cifras inventadas.',
      },
      {
        plataforma: "Facebook",
        regla: "Sin cifras de salario inventadas",
        cumple: true,
      },
      {
        plataforma: "Facebook",
        regla: "Oferta presentada como oportunidad, no garantía",
        cumple: true,
      },
      {
        plataforma: "Facebook",
        regla: "Sin clickbait engañoso",
        cumple: true,
        nota: "Hook con afirmación directa, no pregunta engañosa.",
      },
      {
        plataforma: "Facebook",
        regla: "Sin solicitud de datos personales en el post",
        cumple: true,
      },
      {
        plataforma: "Facebook",
        regla: "Sin discriminación laboral (género, edad, raza)",
        cumple: true,
        nota: "No se especifican restricciones discriminatorias.",
      },
      {
        plataforma: "Facebook",
        regla: "Enlace verificable a landing page",
        cumple: true,
        nota: "Se dirige a sitio propio con AdSense.",
      },
      {
        plataforma: "TikTok",
        regla: "Sin esquemas piramidales o multinivel",
        cumple: true,
      },
      {
        plataforma: "TikTok",
        regla: "Información de empleo legítima",
        cumple: true,
      },
      {
        plataforma: "TikTok",
        regla: "Sin contenido engañoso o falso",
        cumple: true,
      },
      {
        plataforma: "TikTok",
        regla: "Sin engagement bait (pedir likes/follows por info)",
        cumple: true,
        nota: "Los CTAs dirigen al perfil, no piden interacción forzada.",
      },
      {
        plataforma: "TikTok",
        regla: "Urgencia sin manipulación emocional excesiva",
        cumple: true,
        nota: '"Las vacantes se llenan rápido" — urgencia real, no fabricada.',
      },
      {
        plataforma: "TikTok",
        regla: "Sin resultados garantizados",
        cumple: true,
      },
      {
        plataforma: "TikTok",
        regla: "Contenido apto para todas las edades",
        cumple: true,
        nota: "Se aclara que las vacantes son para mayores de 18.",
      },
      {
        plataforma: "AdSense",
        regla: "Contenido original generado por IA",
        cumple: true,
      },
      {
        plataforma: "AdSense",
        regla: "Descripción real del puesto de trabajo",
        cumple: true,
      },
      {
        plataforma: "AdSense",
        regla: "Landing page coherente con el contenido del video",
        cumple: true,
        nota: "Asegúrate de que tu landing page tenga la oferta correspondiente.",
      },
      {
        plataforma: "AdSense",
        regla: "Sin arbitraje de tráfico agresivo",
        cumple: true,
      },
    ],
    alertas: [
      '🚫 NUNCA menciones empresas específicas ni uses logos reales — riesgo legal y de suspensión.',
      '🚫 NUNCA inventes cifras de salario — usa siempre "salario competitivo" o "buen sueldo".',
      '🚫 NUNCA pidas datos personales (CURP, INE, RFC) en publicaciones o comentarios.',
      '🚫 NUNCA prometas contratación garantizada — presenta como oportunidad, no como hecho.',
      '🚫 NUNCA uses música con copyright — usa sonidos nativos de la plataforma o libres de derechos.',
      '⚠️ Siempre incluye disclaimer en Facebook: "Vacantes recopiladas de fuentes públicas de empleo."',
      '⚠️ No publiques el mismo contenido idéntico en más de 5 grupos de Facebook (detectan spam).',
      '⚠️ Las imágenes con texto para Facebook deben tener menos del 20% de texto visible.',
      '⚠️ Varía siempre el contenido entre publicaciones — el contenido repetido reduce alcance.',
      '💡 Consulta la guía completa en la sección "Políticas" del menú de navegación.',
    ],
  };
}

function generarFlujoProduccion(): SeccionFlujoProduccion {
  return {
    versionA: [
      { numero: 1, descripcion: "Copia el Prompt A de imagen y genera la fotografía editorial en Nanobanana (Gemini 2.5 Flash Image)." },
      { numero: 2, descripcion: "Descarga la imagen generada y súbela como 'ingrediente' de referencia en Veo 3.1." },
      { numero: 3, descripcion: "Copia el prompt de video TikTok (Versión A) y genera el video de 8 segundos en Veo 3.1." },
      { numero: 4, descripcion: "Copia el prompt de video Facebook (Versión A) y genera el video de 8 segundos en Veo 3.1." },
      { numero: 5, descripcion: "Descarga ambos videos y edita los textos en pantalla según las tablas de la Sección 5 usando tu editor de video." },
      { numero: 6, descripcion: "Copia la descripción de TikTok (Sección 6) y publica el video vertical. Copia la de Facebook (Sección 7) y publica el video horizontal." },
      { numero: 7, descripcion: "Monitorea métricas las primeras 24-48 horas: views, watch time, clics al enlace, CTR y comentarios." },
    ],
    versionB: [
      { numero: 1, descripcion: "Genera la imagen editorial en Nanobanana usando el Prompt A de imagen." },
      { numero: 2, descripcion: "Sube la imagen como ingrediente de referencia en Veo 3.1." },
      { numero: 3, descripcion: "Genera las 3 escenas TikTok (Versión B, Escenas 1-3) en Veo 3.1, una por una." },
      { numero: 4, descripcion: "Genera las 3 escenas Facebook (Versión B, Escenas 1-3) en Veo 3.1, una por una." },
      { numero: 5, descripcion: "Descarga los 6 clips generados." },
      { numero: 6, descripcion: "Une las 3 escenas TikTok en un solo video de 24 seg. Une las 3 escenas Facebook en otro video de 24 seg." },
      { numero: 7, descripcion: "Edita y superpón los textos en pantalla según las 6 tablas de la Sección 5." },
      { numero: 8, descripcion: "Agrega transiciones suaves entre escenas (corte directo o cross-dissolve de 0.3 seg)." },
      { numero: 9, descripcion: "Publica en TikTok con la descripción de la Sección 6 y en Facebook con la de la Sección 7." },
      { numero: 10, descripcion: "Monitorea métricas las primeras 48-72 horas y registra en la tabla comparativa." },
    ],
  };
}
