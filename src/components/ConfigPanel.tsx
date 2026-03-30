"use client";

import { useAppStore } from "@/lib/store";

export default function ConfigPanel() {
  const { configuracion, setConfiguracion } = useAppStore();

  return (
    <div className="section-card space-y-4">
      <h3 className="font-semibold text-dark-800 text-sm uppercase tracking-wider">
        Configuracion
      </h3>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Pais / Region
        </label>
        <select
          value={configuracion.pais}
          onChange={(e) => setConfiguracion({ pais: e.target.value })}
          className="input-field text-sm"
        >
          <option value="México">Mexico</option>
          <option value="Estados Unidos">Estados Unidos</option>
          <option value="Colombia">Colombia</option>
          <option value="Argentina">Argentina</option>
          <option value="Chile">Chile</option>
          <option value="Perú">Peru</option>
          <option value="España">Espana</option>
          <option value="Ecuador">Ecuador</option>
          <option value="Venezuela">Venezuela</option>
          <option value="Guatemala">Guatemala</option>
          <option value="República Dominicana">Republica Dominicana</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Tono
        </label>
        <div className="grid grid-cols-3 gap-2">
          {(["urgente", "profesional", "casual"] as const).map((tono) => (
            <button
              key={tono}
              onClick={() => setConfiguracion({ tono })}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all capitalize ${
                configuracion.tono === tono
                  ? "bg-brand-500 text-white shadow-sm"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {tono}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Plataforma
        </label>
        <div className="grid grid-cols-3 gap-2">
          {(["tiktok", "facebook", "ambas"] as const).map((plataforma) => (
            <button
              key={plataforma}
              onClick={() => setConfiguracion({ plataforma })}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all capitalize ${
                configuracion.plataforma === plataforma
                  ? "bg-brand-500 text-white shadow-sm"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {plataforma}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
