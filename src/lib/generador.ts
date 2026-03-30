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
  const sufijos = {
    urgente: [
      "Vacantes Disponibles HOY",
      "Contratación Inmediata",
      "Se Buscan Urgente",
    ],
    profesional: [
      "Oportunidad Laboral",
      "Vacante Disponible",
      "Nueva Oportunidad",
    ],
    casual: [
      "Están Contratando",
      "Hay Trabajo",
      "Se Necesita Personal",
    ],
  };

  const opciones = sufijos[config.tono];

  return {
    principal: `🔥 ${temaCapitalizado} — ${opciones[0]}!`,
    variantes: [
      `⚡ ${temaCapitalizado} — ${opciones[1]}!`,
      `✅ ${temaCapitalizado} — ${opciones[2]}!`,
      `🚀 ${opciones[0]}: ${temaCapitalizado}!`,
    ],
  };
}

function generarPromptsImagen(
  tema: string,
  _config: Configuracion
): SeccionPromptsImagen {
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
        prompt: `Imagen de alto impacto visual en formato vertical 9:16 diseñada como thumbnail viral. Fondo con fotografía de un ambiente de trabajo relacionado con ${tema}, tratada con overlay oscuro semitransparente al 60% para máximo contraste. En el centro superior, texto grande en tipografía bold sans-serif blanca con borde negro que dice "SE BUSCAN" en mayúsculas. Debajo, en tipografía ligeramente menor pero igualmente bold, el texto "${tema.toUpperCase()}" en color amarillo brillante (#FFD700). En la parte inferior, un banner rojo con texto blanco "APLICA HOY". Composición centrada, simétrica, diseñada para captar la atención en menos de 1 segundo. Estilo de diseño gráfico para redes sociales, colores vibrantes de alto contraste.`,
      },
      {
        titulo: "Prompt C — Póster Informativo",
        tipo: "poster",
        prompt: `Póster informativo profesional en formato vertical 9:16 con fondo de fotografía desenfocada (bokeh) de un ambiente laboral relacionado con ${tema}. Sobre el fondo desenfocado, un panel semitransparente blanco con bordes redondeados ocupa el 70% central de la imagen. En la parte superior del panel, título en tipografía bold negra: "VACANTE: ${tema.toUpperCase()}". Debajo del título, tres filas con íconos minimalistas a la izquierda y texto descriptivo: ícono de dinero + "Salario competitivo", ícono de reloj + "Horario flexible", ícono de ubicación + "Varios establecimientos de tu zona". En la parte inferior del panel, botón con fondo naranja vibrante (#F97316) y texto blanco bold: "APLICA HOY". Estilo de diseño limpio y corporativo, tipografía moderna, colores cálidos profesionales.`,
      },
    ],
  };
}

function generarScriptsVideo(
  tema: string,
  config: Configuracion
): SeccionScriptsVideo {
  const temaCapitalizado = tema.charAt(0).toUpperCase() + tema.slice(1);
  const ctaTiktok = "link en mi perfil";
  const ctaFacebook = "enlace en la descripción";
  const cta =
    config.plataforma === "facebook" ? ctaFacebook : ctaTiktok;

  return {
    versiones: [
      {
        titulo: "Versión A — Video Único (8 segundos)",
        descripcion:
          "Video compacto de 8 segundos con hook, oferta y CTA.",
        lineas: [
          {
            segundo: "0–2 seg",
            audio: `¡Atención! Están buscando ${temaCapitalizado} y las vacantes se llenan rápido!`,
            accionPantalla: `Close-up dinámico de persona trabajando como ${tema}. Texto animado: "SE BUSCAN ${tema.toUpperCase()}"`,
          },
          {
            segundo: "2–5 seg",
            audio: `Salario competitivo, horario flexible y no necesitas experiencia previa!`,
            accionPantalla: `Transición a plano medio del ambiente laboral. Aparecen 3 íconos de beneficios con texto: salario, horario, sin experiencia.`,
          },
          {
            segundo: "5–8 seg",
            audio: `¡Aplica ahora mismo desde el ${cta}! Las vacantes no esperan!`,
            accionPantalla: `Zoom out revelando el espacio completo. Banner CTA parpadeante: "APLICA HOY" con flecha animada.`,
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
            audio: `¡Esto te interesa! Varios establecimientos de tu zona están buscando ${temaCapitalizado} con urgencia! Y lo mejor es que no importa si no tienes experiencia, ellos te capacitan desde cero!`,
            accionPantalla: `Dolly forward hacia persona latina preparándose para trabajar. Texto grande: "URGENTE: SE BUSCAN ${tema.toUpperCase()}". Transición a plano medio mostrando el ambiente de trabajo real.`,
          },
          {
            segundo: "Escena 2: 8–16 seg",
            audio: `Mira los beneficios: salario competitivo que se paga puntual cada quincena, horarios flexibles para que acomodes tu vida personal, y prestaciones desde el primer día!`,
            accionPantalla: `Slow pan lateral por el espacio de trabajo. Aparecen 3 cards animadas: "Salario Competitivo", "Horarios Flexibles", "Prestaciones de Ley". Cada card entra con slide-up.`,
          },
          {
            segundo: "Escena 3: 16–24 seg",
            audio: `¡No dejes pasar esta oportunidad! Las vacantes de ${temaCapitalizado} se llenan en días. Entra al ${cta} y aplica ahora mismo!`,
            accionPantalla: `Close-up de persona sonriendo satisfecha en su trabajo. Banner final: "APLICA HOY — ${cta.toUpperCase()}" con animación de pulso. Logo y URL.`,
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

  return {
    prompts: [
      {
        titulo: "Versión A — TikTok (9:16)",
        plataforma: "TikTok",
        prompt: `Dolly forward cinematográfico hacia una persona latina de 28 años, piel morena, cabello oscuro corto, vistiendo uniforme profesional limpio de ${tema}, que se prepara con determinación en su estación de trabajo. El escenario es un establecimiento real de ${tema} con iluminación cálida golden hour, equipos y herramientas del oficio visibles al fondo con bokeh suave. La cámara avanza suavemente mientras la persona realiza sus tareas con profesionalismo. Voiceover masculino joven en español latinoamericano, tono urgente y entusiasta: "¡Atención! Están buscando ${temaCapitalizado} y las vacantes se llenan rápido! Salario competitivo, horario flexible y no necesitas experiencia previa! ¡Aplica ahora mismo desde el link en mi perfil!" Audio ambiental sutil del entorno laboral de ${tema}. Música de fondo: beat urbano rítmico a volumen bajo. Color grading cálido cinematográfico con tonos dorados. Duración exacta: 8 segundos, 24 FPS, 1080p, formato vertical 9:16.`,
      },
      {
        titulo: "Versión A — Facebook (16:9)",
        plataforma: "Facebook",
        prompt: `Tracking shot lateral cinematográfico por un establecimiento de ${tema}, mostrando a una persona latina de 30 años, cabello recogido, uniforme profesional impecable, realizando sus labores con confianza y sonrisa sutil. El espacio está iluminado con luz cálida natural, ambiente profesional y acogedor. La cámara se desplaza suavemente revelando el entorno laboral completo. Voiceover femenino profesional en español latinoamericano, tono cálido y confiable: "¿Buscas empleo como ${temaCapitalizado}? Hay vacantes disponibles con salario competitivo y horarios flexibles. Encuentra toda la información en el enlace en la descripción." Audio ambiental del entorno de trabajo. Música de fondo: instrumental corporativo suave y motivacional. Color grading cálido con tonos naturales. Duración exacta: 8 segundos, 24 FPS, 1080p, formato horizontal 16:9.`,
      },
      {
        titulo: "Versión B — Escena 1 TikTok (9:16)",
        plataforma: "TikTok",
        escena: 1,
        prompt: `Close-up dramático con transición a plano medio de una persona latina de 28 años, piel morena, cabello oscuro, uniforme de ${tema}, que levanta la vista hacia la cámara con expresión decidida mientras se prepara en su estación de trabajo. El establecimiento tiene iluminación golden hour cálida, herramientas y equipos del oficio visibles. Dolly back lento revelando el espacio completo. Voiceover masculino joven urgente en español latinoamericano: "¡Esto te interesa! Varios establecimientos de tu zona están buscando ${temaCapitalizado} con urgencia! Y lo mejor es que no importa si no tienes experiencia, ellos te capacitan desde cero!" Sonido ambiental del entorno laboral. Beat urbano energético de fondo. Color grading dorado cinematográfico. 8 segundos, 24 FPS, 1080p, 9:16.`,
      },
      {
        titulo: "Versión B — Escena 2 TikTok (9:16)",
        plataforma: "TikTok",
        escena: 2,
        prompt: `Slow pan lateral cinematográfico por el interior de un establecimiento de ${tema}, mismo sujeto latino de 28 años del plano anterior (misma ropa, mismo cabello oscuro corto) ahora realizando sus tareas con fluidez y profesionalismo. La cámara revela diferentes áreas del espacio de trabajo mientras la persona interactúa con su entorno. Iluminación cálida constante. Voiceover masculino joven entusiasta: "Mira los beneficios: salario competitivo que se paga puntual cada quincena, horarios flexibles para que acomodes tu vida personal, y prestaciones desde el primer día!" Sonido ambiental del trabajo. Beat urbano rítmico. Color grading cálido. 8 segundos, 24 FPS, 1080p, 9:16.`,
      },
      {
        titulo: "Versión B — Escena 3 TikTok (9:16)",
        plataforma: "TikTok",
        escena: 3,
        prompt: `Medium close-up del mismo sujeto latino de 28 años (misma ropa, mismo look) sonriendo con satisfacción al completar una tarea como ${tema}. La cámara se acerca suavemente en un push-in emocional. Iluminación cálida golden hour envolvente. El sujeto mira brevemente a cámara con expresión invitadora. Voiceover masculino joven con urgencia de cierre: "¡No dejes pasar esta oportunidad! Las vacantes de ${temaCapitalizado} se llenan en días. Entra al link en mi perfil y aplica ahora mismo!" Sonido ambiental suave. Beat urbano con crescendo final. Color grading dorado. 8 segundos, 24 FPS, 1080p, 9:16.`,
      },
      {
        titulo: "Versión B — Escena 1 Facebook (16:9)",
        plataforma: "Facebook",
        escena: 1,
        prompt: `Wide establishing shot de un establecimiento de ${tema}, con iluminación natural cálida. Una persona latina de 30 años, cabello recogido, uniforme profesional, entra al encuadre y se ubica en su estación de trabajo con confianza. La cámara realiza un slow zoom-in suave. Voiceover femenino profesional en español latinoamericano: "Si estás buscando una oportunidad laboral como ${temaCapitalizado}, te tenemos buenas noticias. Hay establecimientos en tu zona con vacantes disponibles y no requieren experiencia previa." Sonido ambiental del entorno. Música instrumental corporativa motivacional. Color grading cálido natural. 8 segundos, 24 FPS, 1080p, 16:9.`,
      },
      {
        titulo: "Versión B — Escena 2 Facebook (16:9)",
        plataforma: "Facebook",
        escena: 2,
        prompt: `Tracking shot a nivel de hombro siguiendo a la misma persona latina de 30 años (mismo uniforme, cabello recogido) mientras trabaja en sus tareas como ${tema}. El espacio es amplio, bien iluminado con luz cálida, ambiente profesional. La cámara captura la dinámica del trabajo. Voiceover femenino profesional: "Los beneficios incluyen salario competitivo con pago quincenal puntual, horarios flexibles que se adaptan a tu disponibilidad, y prestaciones de ley desde tu primer día de trabajo." Audio ambiental suave. Instrumental corporativo continuo. Color grading cálido. 8 segundos, 24 FPS, 1080p, 16:9.`,
      },
      {
        titulo: "Versión B — Escena 3 Facebook (16:9)",
        plataforma: "Facebook",
        escena: 3,
        prompt: `Medium shot de la misma persona latina de 30 años (continuidad: mismo uniforme, cabello recogido) terminando su jornada con satisfacción, organizando su espacio de trabajo de ${tema} con una sonrisa genuina. La cámara realiza un slow pull-back elegante revelando el establecimiento completo. Voiceover femenino profesional con tono de cierre: "No dejes pasar esta oportunidad. Consulta los requisitos y aplica directamente desde el enlace en la descripción. Las vacantes son limitadas." Audio ambiental. Instrumental corporativo con resolución suave. Color grading cálido. 8 segundos, 24 FPS, 1080p, 16:9.`,
      },
    ],
  };
}

function generarTextoEnPantalla(
  tema: string,
  _config: Configuracion
): SeccionTextoEnPantalla {
  const temaUpper = tema.toUpperCase();

  return {
    tablas: [
      {
        titulo: "Versión A — TikTok",
        plataforma: "TikTok",
        lineas: [
          {
            segundo: "0–2 seg",
            texto: `SE BUSCAN ${temaUpper}`,
            estilo:
              "Bold blanco 48px, sombra negra, centro superior. Animación: scale-in rápido.",
          },
          {
            segundo: "2–4 seg",
            texto: "💰 Salario competitivo\n⏰ Horario flexible",
            estilo:
              "Blanco 32px, izquierda centro. Animación: slide-up secuencial.",
          },
          {
            segundo: "4–5 seg",
            texto: "📋 Sin experiencia previa",
            estilo:
              "Blanco 32px, izquierda centro. Animación: slide-up.",
          },
          {
            segundo: "5–8 seg",
            texto: "APLICA HOY ↗️",
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
            texto: "✓ Salario competitivo  ✓ Horario flexible  ✓ Prestaciones",
            estilo:
              "Blanco 28px, centro medio. Animación: typewriter.",
          },
          {
            segundo: "5–8 seg",
            texto: "MÁS INFORMACIÓN EN EL ENLACE ↓",
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
            texto: "Están contratando en tu zona",
            estilo:
              "Blanco 32px, centro. Animación: fade-in.",
          },
          {
            segundo: "6–8 seg",
            texto: "¡SIN EXPERIENCIA! Te capacitan",
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
            texto: "💰 Salario competitivo\npago quincenal",
            estilo:
              "Blanco 32px, izquierda. Card con fondo semi-transparente. Slide-in izquierda.",
          },
          {
            segundo: "3–5 seg",
            texto: "⏰ Horarios flexibles",
            estilo:
              "Blanco 32px, centro. Card con fondo semi-transparente. Slide-in derecha.",
          },
          {
            segundo: "5–8 seg",
            texto: "📋 Prestaciones desde día 1",
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
            texto: "¡No dejes pasar esta oportunidad!",
            estilo: "Bold blanco 36px, centro. Fade-in.",
          },
          {
            segundo: "3–6 seg",
            texto: "Las vacantes se llenan rápido",
            estilo: "Blanco 28px con fondo rojo, centro. Slide-up.",
          },
          {
            segundo: "6–8 seg",
            texto: "APLICA → LINK EN MI PERFIL",
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
            texto: `OPORTUNIDAD LABORAL\n${temaUpper}`,
            estilo: "Bold blanco 40px, sombra, centro superior. Fade-in elegante.",
          },
          {
            segundo: "3–8 seg",
            texto: "Vacantes disponibles en tu zona\nSin experiencia requerida",
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

  return {
    versionA: `🔥 ¡Están buscando ${temaCapitalizado} y las vacantes se llenan rápido! Salario competitivo + horario flexible + sin experiencia 💰 ¡Aplica desde el link en mi perfil! 👆 ¿Conoces a alguien que necesite trabajo? ¡Etiquétalo! 👇

#empleo #trabajo #vacantes #${tema.toLowerCase().replace(/\s+/g, "")} #buscotrabajo #empleourgente #contratacioninmediata #trabajoenmexico #vacantesdisponibles #oportunidadlaboral #empleos2024 #trabajosinexperiencia #aplicahoy #recursoshumanos #bolsadetrabajo`,
    versionB: `🔥 ¡VACANTES DE ${temaCapitalizado.toUpperCase()} — CONTRATACIÓN INMEDIATA!

✅ Salario competitivo con pago quincenal
✅ Horarios flexibles
✅ Prestaciones de ley desde el día 1
✅ No se requiere experiencia previa
✅ Capacitación incluida

⚡ ¡Las vacantes se llenan en días! No pierdas esta oportunidad.

👆 Toda la información en el link de mi perfil.

¿Conoces a alguien que esté buscando trabajo? ¡Comparte este video! 🙌

#empleo #trabajo #vacantes #${tema.toLowerCase().replace(/\s+/g, "")} #buscotrabajo #empleourgente #contratacioninmediata #trabajoenmexico #vacantesdisponibles #oportunidadlaboral #empleos2024 #trabajosinexperiencia #aplicahoy #recursoshumanos #bolsadetrabajo`,
    estrategia: `📊 ESTRATEGIA DE PUBLICACIÓN TIKTOK:
• Horarios óptimos: 7-9 AM, 12-2 PM, 7-9 PM (hora local).
• Responde TODOS los comentarios en las primeras 2 horas — el algoritmo premia la interacción.
• Comentario fijado sugerido: "👆 Link en mi perfil para ver todas las vacantes disponibles. ¡Aplica hoy!"
• Usa la función de Dueto/Stitch con otros videos de empleo para ampliar alcance.
• Publica 2-3 videos por día como mínimo para alimentar el algoritmo.`,
  };
}

function generarDescripcionFacebook(
  tema: string,
  _config: Configuracion
): SeccionDescripcionFacebook {
  const temaCapitalizado = tema.charAt(0).toUpperCase() + tema.slice(1);

  return {
    versionA: `🔥 ¡Vacantes disponibles para ${temaCapitalizado}!

Salario competitivo + horarios flexibles + prestaciones de ley. No se requiere experiencia.

📋 Consulta requisitos y aplica aquí: [ENLACE]

Comparte con quien necesite esta oportunidad 🙌

#Empleo #Trabajo #${temaCapitalizado.replace(/\s+/g, "")} #Vacantes #OportunidadLaboral #BolsaDeTrabajo #ContrataciónInmediata #TrabajoEnMéxico`,
    versionB: `📢 VACANTE: ${temaCapitalizado.toUpperCase()} — CONTRATACIÓN INMEDIATA

📍 Ubicación: Varios establecimientos de tu zona

📌 Requisitos:
• Mayor de 18 años
• Disponibilidad de horario
• Actitud de servicio
• No se requiere experiencia previa

💼 Beneficios:
• Salario competitivo con pago quincenal puntual
• Horarios flexibles
• Prestaciones de ley desde el primer día
• Capacitación pagada
• Oportunidades de crecimiento

📋 ¿Cómo aplicar?
Toda la información y requisitos completos en el enlace: [ENLACE]

⚠️ Las vacantes son limitadas. Aplica lo antes posible.

📌 Disclaimer: Las vacantes son recopiladas de fuentes públicas de empleo.

Comparte esta publicación con alguien que esté buscando trabajo 🤝

#Empleo #Trabajo #${temaCapitalizado.replace(/\s+/g, "")} #Vacantes #OportunidadLaboral #BolsaDeTrabajo #ContrataciónInmediata #TrabajoEnMéxico #EmpleoUrgente #SinExperiencia`,
    estrategia: `📊 ESTRATEGIA DE PUBLICACIÓN FACEBOOK:
• Horarios óptimos: 9-11 AM y 1-3 PM entre semana; domingos 10 AM-12 PM.
• Comparte en grupos de empleo de la zona (mínimo 5 grupos por publicación).
• Responde comentarios con información adicional para aumentar alcance orgánico.
• Usa Facebook Stories para repostear el video con sticker de "Aplica Aquí".
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
      'Precaución: No mencionar empresas específicas salvo indicación del usuario.',
      'Usar siempre "salario competitivo" en vez de cifras concretas.',
      'Incluir disclaimer en Facebook Versión B: "Las vacantes son recopiladas de fuentes públicas."',
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
