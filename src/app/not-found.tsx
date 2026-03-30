import Link from "next/link";

export default function NotFound() {
  return (
    <div className="text-center py-20">
      <p className="text-6xl mb-4">🔍</p>
      <h2 className="text-2xl font-bold text-dark-900 mb-2">
        Pagina no encontrada
      </h2>
      <p className="text-gray-500 mb-6">
        La pagina que buscas no existe.
      </p>
      <Link href="/" className="btn-primary">
        Volver al Inicio
      </Link>
    </div>
  );
}
