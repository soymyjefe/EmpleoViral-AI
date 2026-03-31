"use client";

import Link from "next/link";

const PROHIBIDO_FACEBOOK = [
  {
    categoria: "Contenido Engañoso",
    items: [
      "Prometer salarios específicos sin tener la oferta real verificada",
      'Usar frases como "Gana $5,000 semanales" o cifras inventadas',
      "Garantizar contratación inmediata sin respaldo de un empleador real",
      'Clickbait tipo "No vas a creer lo que pagan" o "Este trabajo cambiará tu vida"',
      "Inventar nombres de empresas o usar logos de empresas reales sin permiso",
      "Afirmar que las vacantes son exclusivas cuando son de fuentes públicas",
    ],
  },
  {
    categoria: "Solicitud de Datos Personales",
    items: [
      "Pedir CURP, INE, RFC o datos bancarios directamente en el post",
      "Solicitar que envíen CV con datos personales por comentario público",
      "Crear formularios que recopilen información sensible sin consentimiento",
      "Pedir fotos personales o documentos de identidad en comentarios",
    ],
  },
  {
    categoria: "Prácticas de Spam",
    items: [
      'Publicar el mismo contenido idéntico en múltiples grupos (Facebook lo detecta como spam)',
      "Usar más de 30 hashtags o hashtags irrelevantes",
      "Etiquetar masivamente a personas que no lo solicitaron",
      "Publicar más de 5 veces al día en el mismo grupo",
      "Usar bots o herramientas de automatización para publicar",
    ],
  },
  {
    categoria: "Discriminación en Empleo",
    items: [
      'Especificar género: "Solo hombres" o "Solo mujeres" (excepto donde la ley lo permita)',
      "Especificar edad exacta: \"Solo menores de 30 años\"",
      "Discriminar por apariencia física, religión o estado civil",
      'Usar lenguaje excluyente: "Buena presentación" (código para discriminación)',
      "Excluir personas con discapacidad sin justificación del puesto",
    ],
  },
  {
    categoria: "Contenido de Baja Calidad",
    items: [
      "Imágenes con demasiado texto (Facebook penaliza imágenes con más de 20% texto)",
      "Videos con audio distorsionado o música con copyright",
      "Contenido que se vea claramente generado por IA sin edición",
      "Capturas de pantalla de baja resolución como imagen principal",
    ],
  },
];

const PROHIBIDO_TIKTOK = [
  {
    categoria: "Contenido Engañoso y Estafas",
    items: [
      "Promover empleos que requieran pago inicial (señal de estafa)",
      "Ofrecer trabajos de \"empacador desde casa\" o esquemas piramidales",
      'Usar audio/video de otras personas sin permiso (especialmente caras)',
      "Prometer resultados garantizados de empleo",
      'Usar frases como "100% garantizado" o "Todos quedan contratados"',
      "Promover esquemas multinivel disfrazados de empleo",
    ],
  },
  {
    categoria: "Manipulación del Algoritmo",
    items: [
      'Pedir "likes" o "follows" a cambio de información del empleo',
      "Usar engagement bait: \"Comenta SI para recibir la info\"",
      "Ocultar información clave para forzar interacción",
      "Usar sonidos trending que no tengan relación con el contenido",
      "Comprar seguidores o usar bots de interacción",
    ],
  },
  {
    categoria: "Urgencia Fabricada",
    items: [
      '\"Solo quedan 2 vacantes\" cuando no tienes esa información',
      '\"Último día para aplicar\" sin fecha real de cierre',
      "Crear falsa escasez para presionar a la audiencia",
      "Usar temporizadores o cuentas regresivas falsas",
    ],
  },
  {
    categoria: "Contenido para Menores",
    items: [
      "Promover empleo para menores de edad (TikTok tiene audiencia joven)",
      "No aclarar que las vacantes son para mayores de 18 años",
      "Usar lenguaje que apele específicamente a adolescentes para empleo",
    ],
  },
  {
    categoria: "Propiedad Intelectual",
    items: [
      "Usar música con copyright sin licencia",
      "Usar imágenes o videos de bancos de stock sin licencia",
      "Copiar contenido de otros creadores de empleo",
      "Usar marcas o logos de empresas sin autorización",
    ],
  },
];

const MEJORES_PRACTICAS = [
  {
    titulo: "Transparencia",
    icono: "🔍",
    items: [
      'Siempre incluir disclaimer: "Vacantes recopiladas de fuentes públicas"',
      "Nunca inventar nombres de empresas o ubicaciones específicas",
      'Usar "Salario competitivo" en lugar de cifras cuando no tienes datos reales',
      "Aclarar que tu contenido es informativo, no una oferta directa de empleo",
      "Si monetizas con AdSense, no ocultes que el enlace lleva a tu sitio web",
    ],
  },
  {
    titulo: "Lenguaje Seguro",
    icono: "💬",
    items: [
      '"Hay vacantes disponibles" en vez de "Te garantizamos empleo"',
      '"Salario competitivo" en vez de "$X,XXX al mes"',
      '"No se requiere experiencia" en vez de "Cualquiera puede entrar"',
      '"Horarios flexibles" en vez de "Trabaja cuando quieras"',
      '"Oportunidad laboral" en vez de "Trabajo de tus sueños"',
      '"Visita nuestro perfil" en vez de "Aplica ahora" (si no eres el empleador)',
    ],
  },
  {
    titulo: "Imágenes y Video",
    icono: "🎬",
    items: [
      "Genera imágenes con IA en vez de usar fotos de personas reales",
      "Evita mostrar rostros reconocibles sin consentimiento",
      "No uses logos de empresas reales en tu contenido generado",
      "Las imágenes con texto deben tener menos de 20% texto (regla de Facebook)",
      "Usa música libre de copyright o los sonidos nativos de cada plataforma",
      "Si usas IA para generar video, agrégale edición humana para diferenciarte",
    ],
  },
  {
    titulo: "CTAs Correctos",
    icono: "👆",
    items: [
      'TikTok: Dirige al perfil ("Más info en nuestro perfil") — no puedes poner links en posts',
      'Facebook: Dirige al mensaje ("Envíanos un mensaje") o a tu landing page',
      "Nunca uses CTAs que sugieran que TÚ eres el empleador (a menos que lo seas)",
      "No prometas que al hacer clic van a obtener el empleo",
      "Evita CTAs agresivos como \"¡APLICA AHORA O PIERDE TU OPORTUNIDAD!\"",
    ],
  },
  {
    titulo: "Frecuencia y Distribución",
    icono: "📊",
    items: [
      "TikTok: 2-3 videos por día máximo con el mismo formato",
      "Facebook: No publiques el mismo post idéntico en más de 5 grupos",
      "Varía el contenido visual aunque el tema sea similar",
      "Alterna entre los diferentes estilos de video (A, B, C) por tema",
      "No republiques el mismo video — genera uno nuevo con variación",
    ],
  },
];

const PALABRAS_PROHIBIDAS = [
  { palabra: "Garantizado", alternativa: "Oportunidad disponible" },
  { palabra: "100% seguro", alternativa: "Condiciones atractivas" },
  { palabra: "Gana $X,XXX", alternativa: "Salario competitivo" },
  { palabra: "Trabajo fácil", alternativa: "Capacitación incluida" },
  { palabra: "Sin hacer nada", alternativa: "Horario flexible" },
  { palabra: "Dinero rápido", alternativa: "Pago puntual" },
  { palabra: "Aplica ahora", alternativa: "Más info en nuestro perfil" },
  { palabra: "Último día", alternativa: "Vacantes limitadas" },
  { palabra: "Solo quedan X", alternativa: "Hay vacantes disponibles" },
  { palabra: "Trabajo de tus sueños", alternativa: "Oportunidad laboral" },
  { palabra: "Te contratamos hoy", alternativa: "Contratación abierta" },
  { palabra: "Cualquiera puede", alternativa: "No se requiere experiencia" },
  { palabra: "Empresa reconocida", alternativa: "Establecimientos de tu zona" },
  { palabra: "Multinivel / MLM", alternativa: "NO usar — contenido prohibido" },
  { palabra: "Invierte y gana", alternativa: "NO usar — contenido prohibido" },
];

export default function PoliticasPage() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center pt-6">
        <h1 className="text-3xl font-extrabold text-purple-800 mb-2">
          Guía de Políticas y Cumplimiento
        </h1>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Contenido que debes evitar para cumplir con las políticas de Facebook,
          TikTok y AdSense. Sigue esta guía para mantener tus cuentas seguras.
        </p>
      </div>

      {/* Alerta principal */}
      <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <span className="text-3xl">🚨</span>
          <div>
            <h2 className="font-bold text-red-800 text-lg mb-1">
              Importante: Tu Cuenta Está en Riesgo Si...
            </h2>
            <ul className="space-y-1 text-sm text-red-700">
              <li>
                • Publicas contenido engañoso que promete empleo sin respaldo
                real
              </li>
              <li>
                • Usas spam o automatización agresiva para distribuir contenido
              </li>
              <li>• Recopilas datos personales sin consentimiento</li>
              <li>
                • Usas contenido con copyright (música, imágenes, logos de
                empresas)
              </li>
              <li>
                • Facebook puede suspender tu cuenta permanentemente por
                violaciones repetidas
              </li>
              <li>
                • TikTok puede shadowbanear tu cuenta haciendo que nadie vea tus
                videos
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Palabras a evitar */}
      <div className="section-card">
        <h2 className="text-xl font-bold text-dark-900 mb-4 flex items-center gap-2">
          <span>🚫</span> Palabras y Frases a Evitar
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-red-50">
                <th className="px-4 py-3 text-left font-semibold text-red-700 border-b border-red-200">
                  ❌ NO Usar
                </th>
                <th className="px-4 py-3 text-left font-semibold text-emerald-700 border-b border-red-200">
                  ✅ Usar En Su Lugar
                </th>
              </tr>
            </thead>
            <tbody>
              {PALABRAS_PROHIBIDAS.map((p, i) => (
                <tr
                  key={i}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="px-4 py-2.5 text-red-600 font-medium">
                    {p.palabra}
                  </td>
                  <td className="px-4 py-2.5 text-emerald-600">
                    {p.alternativa}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Facebook */}
      <div className="section-card">
        <h2 className="text-xl font-bold text-dark-900 mb-1 flex items-center gap-2">
          <span>📘</span> Contenido Prohibido en Facebook
        </h2>
        <p className="text-xs text-gray-500 mb-4">
          Violar estas reglas puede resultar en suspensión de cuenta o
          restricción de alcance
        </p>
        <div className="space-y-4">
          {PROHIBIDO_FACEBOOK.map((cat, i) => (
            <div
              key={i}
              className="rounded-lg border border-red-100 overflow-hidden"
            >
              <div className="bg-red-50 px-4 py-2.5 border-b border-red-100">
                <h3 className="font-semibold text-red-800 text-sm">
                  {cat.categoria}
                </h3>
              </div>
              <ul className="p-4 space-y-2">
                {cat.items.map((item, j) => (
                  <li
                    key={j}
                    className="text-sm text-gray-700 flex items-start gap-2"
                  >
                    <span className="text-red-400 mt-0.5 flex-shrink-0">
                      ✗
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* TikTok */}
      <div className="section-card">
        <h2 className="text-xl font-bold text-dark-900 mb-1 flex items-center gap-2">
          <span>🎵</span> Contenido Prohibido en TikTok
        </h2>
        <p className="text-xs text-gray-500 mb-4">
          TikTok puede hacer shadowban (reducir alcance sin avisarte) o
          suspender tu cuenta
        </p>
        <div className="space-y-4">
          {PROHIBIDO_TIKTOK.map((cat, i) => (
            <div
              key={i}
              className="rounded-lg border border-red-100 overflow-hidden"
            >
              <div className="bg-red-50 px-4 py-2.5 border-b border-red-100">
                <h3 className="font-semibold text-red-800 text-sm">
                  {cat.categoria}
                </h3>
              </div>
              <ul className="p-4 space-y-2">
                {cat.items.map((item, j) => (
                  <li
                    key={j}
                    className="text-sm text-gray-700 flex items-start gap-2"
                  >
                    <span className="text-red-400 mt-0.5 flex-shrink-0">
                      ✗
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Mejores prácticas */}
      <div className="section-card">
        <h2 className="text-xl font-bold text-dark-900 mb-4 flex items-center gap-2">
          <span>✅</span> Mejores Prácticas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {MEJORES_PRACTICAS.map((seccion, i) => (
            <div
              key={i}
              className="rounded-lg border border-emerald-100 overflow-hidden"
            >
              <div className="bg-emerald-50 px-4 py-2.5 border-b border-emerald-100 flex items-center gap-2">
                <span>{seccion.icono}</span>
                <h3 className="font-semibold text-emerald-800 text-sm">
                  {seccion.titulo}
                </h3>
              </div>
              <ul className="p-4 space-y-2">
                {seccion.items.map((item, j) => (
                  <li
                    key={j}
                    className="text-sm text-gray-700 flex items-start gap-2"
                  >
                    <span className="text-emerald-400 mt-0.5 flex-shrink-0">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* AdSense */}
      <div className="section-card">
        <h2 className="text-xl font-bold text-dark-900 mb-4 flex items-center gap-2">
          <span>💰</span> Reglas de AdSense para Landing Pages
        </h2>
        <div className="space-y-3">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <h3 className="font-semibold text-amber-800 text-sm mb-2">
              Si monetizas con AdSense, tu landing page debe:
            </h3>
            <ul className="space-y-1.5 text-sm text-amber-700">
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-0.5">•</span>
                Tener contenido original y útil sobre el empleo mencionado
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-0.5">•</span>
                Ser coherente con lo que prometiste en el video
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-0.5">•</span>
                No tener más anuncios que contenido (ratio 60/40 mínimo contenido/ads)
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-0.5">•</span>
                No redirigir automáticamente a otro sitio
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-0.5">•</span>
                Incluir página de Aviso Legal, Política de Privacidad y Contacto
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-0.5">•</span>
                No usar tráfico artificial (compra de clics o bots)
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center pb-8">
        <p className="text-xs text-gray-400 mb-4">
          Esta guía es informativa. Consulta las políticas oficiales de cada
          plataforma para información actualizada.
        </p>
        <div className="flex justify-center gap-4 text-sm">
          <a
            href="https://transparency.meta.com/es-la/policies/community-standards/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-500 hover:text-purple-600 underline"
          >
            Políticas de Facebook
          </a>
          <a
            href="https://www.tiktok.com/community-guidelines/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-500 hover:text-purple-600 underline"
          >
            Políticas de TikTok
          </a>
          <a
            href="https://support.google.com/adsense/answer/48182"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-500 hover:text-purple-600 underline"
          >
            Políticas de AdSense
          </a>
        </div>
      </div>
    </div>
  );
}
